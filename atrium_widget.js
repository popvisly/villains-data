document.addEventListener('DOMContentLoaded', () => {
    const feed = document.getElementById('inventory-feed');
    const DATA_URL = 'wave2_data.json';

    // Simulate "Live" current Date for logic testing
    // User metadata says current time is 2026-01-21
    const CURRENT_DATE = new Date('2026-01-21T15:00:00Z');

    async function loadData() {
        try {
            const response = await fetch(DATA_URL);
            const items = await response.json();
            renderItems(items);
        } catch (error) {
            console.error('Failed to load inventory:', error);
            feed.innerHTML = '<div class="error">OFFLINE</div>';
        }
    }

    function renderItems(items) {
        feed.innerHTML = '';

        items.forEach(item => {
            const name = item['Item Name'];
            const rarity = item['Rarity'];
            const maxSupply = item['Max Supply'];
            const minted = item['minted'] || 0;
            const releaseDateStr = item['releaseDate'];

            // Logic: 7-Day Hard Stop
            let isClosed = false;
            let statusText = 'LIVE';

            if (releaseDateStr) {
                const releaseDate = new Date(releaseDateStr);
                const hardStopDate = new Date(releaseDate);
                hardStopDate.setDate(releaseDate.getDate() + 7);

                if (CURRENT_DATE > hardStopDate) {
                    isClosed = true;
                    statusText = 'EXPIRED';
                }
            }

            // Logic: Sold Out
            const pct = Math.floor((minted / maxSupply) * 100);
            const displayPct = Math.min(pct, 100); // Visual clamp
            if (minted >= maxSupply) {
                isClosed = true;
                statusText = 'SOLD OUT';
            }

            // Create Card
            const card = document.createElement('div');
            card.className = `inventory-item rarity-${rarity.toLowerCase()}`;
            if (isClosed) card.classList.add('item-closed');

            // Determine Rarity Color for inline style (optional fallback)
            // CSS classes handle borders

            card.innerHTML = `
                <div class="rarity-frame"></div>
                ${isClosed ? `<div class="status-badge">${statusText}</div>` : ''}
                
                <div class="item-header">
                    <span class="item-name">${name}</span>
                    <span class="item-rarity">${rarity}</span>
                </div>
                
                <div class="progress-wrap">
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${displayPct}%"></div>
                    </div>
                    <div class="stats">
                        <span>${minted} / ${maxSupply} MINTED</span>
                        <span>${pct}%</span>
                    </div>
                </div>
            `;

            feed.appendChild(card);
        });
    }

    loadData();
});
