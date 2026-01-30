/*
  Villains At Large — Live Atrium Loader
  One-time Simvoly embed:
    <div id="val-atrium"></div>
    <script src="https://popvisly.github.io/villains-data/val_atrium_loader.js" defer></script>

  This script:
  - injects the widget HTML
  - loads the CSS
  - fetches live inventory JSON from the Data Bunker
*/

(() => {
  const ROOT_ID = 'val-atrium';
  const CSS_URL = 'https://popvisly.github.io/villains-data/atrium_widget.css';
  const DATA_URL = 'https://popvisly.github.io/villains-data/wave2_data.json';

  function ensureCss() {
    const existing = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .some(l => l.href && l.href.includes('/atrium_widget.css'));
    if (existing) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS_URL;
    document.head.appendChild(link);
  }

  function ensureMarkup(root) {
    // Avoid double-inject.
    if (root.querySelector('#inventory-feed')) return;

    root.innerHTML = `
      <div class="atrium-widget">
        <div class="atrium-header">
          <h2>LIVE INVENTORY</h2>
          <div class="live-indicator">
            <span class="dot"></span> LIVE FEED
          </div>
        </div>
        <div id="inventory-feed" class="inventory-feed"></div>
      </div>
    `;
  }

  function safeText(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
    }[c]));
  }

  async function loadData() {
    const res = await fetch(`${DATA_URL}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Inventory fetch failed: ${res.status}`);
    return await res.json();
  }

  function renderItems(feed, items) {
    feed.innerHTML = '';

    (items || []).forEach(item => {
      const name = item['Item Name'] ?? item.name ?? '';
      const rarity = (item['Rarity'] ?? item.rarity ?? 'COMMON');
      const maxSupply = Number(item['Max Supply'] ?? item.supply_max ?? 0);
      const minted = Number(item.minted ?? item.supply_minted ?? 0);
      const releaseDateStr = item.releaseDate ?? null;

      // Status rules
      let isClosed = false;
      let statusText = 'LIVE';

      // Manual override
      if ((item['Status'] ?? item.status) === 'ARCHIVED') {
        isClosed = true;
        statusText = 'ARCHIVED';
      }

      // Sold out
      if (maxSupply > 0 && minted >= maxSupply) {
        isClosed = true;
        statusText = 'SOLD OUT';
      }

      // 7-day hard stop (only if we have a date)
      if (!isClosed && releaseDateStr) {
        const releaseDate = new Date(releaseDateStr);
        if (!Number.isNaN(releaseDate.getTime())) {
          const hardStop = new Date(releaseDate);
          hardStop.setDate(releaseDate.getDate() + 7);
          if (new Date() > hardStop) {
            isClosed = true;
            statusText = 'ARCHIVED';
          }
        }
      }

      const pctRaw = (maxSupply > 0) ? Math.floor((minted / maxSupply) * 100) : 0;
      const pct = Math.min(Math.max(pctRaw, 0), 100);

      const card = document.createElement('div');
      card.className = `inventory-item rarity-${String(rarity).toLowerCase()}`;
      if (isClosed) card.classList.add('item-closed');

      card.innerHTML = `
        <div class="rarity-frame"></div>
        ${isClosed ? `<div class="status-badge">${safeText(statusText)}</div>` : ''}
        <div class="item-header">
          <span class="item-name">${safeText(name)}</span>
          <span class="item-rarity">${safeText(rarity)}</span>
        </div>
        <div class="progress-wrap">
          <div class="progress-container">
            <div class="progress-bar" style="width: ${pct}%"></div>
          </div>
          <div class="stats">
            <span>${safeText(minted)} / ${safeText(maxSupply)} SECURED</span>
            <span>${safeText(pctRaw)}%</span>
          </div>
        </div>
      `;

      feed.appendChild(card);
    });
  }

  async function boot() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return; // Simvoly block removed or ID mismatch

    ensureCss();
    ensureMarkup(root);

    const feed = root.querySelector('#inventory-feed');
    if (!feed) return;

    try {
      const items = await loadData();
      renderItems(feed, items);
    } catch (e) {
      console.error(e);
      feed.innerHTML = '<div class="error">OFFLINE</div>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
