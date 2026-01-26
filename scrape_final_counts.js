const puppeteer = require('puppeteer');

const COLLECTIONS = [
    { name: "Villains at Large (Main)", url: "https://opensea.io/collection/villains-at-large-209174595" },
    { name: "Villains Vault S2", url: "https://opensea.io/collection/villains-vault-s2" },
    { name: "Character Cards (Series 1)", url: "https://opensea.io/collection/villains-at-large-character-cards-series-1" }
];

async function scrape() {
    console.log("🚀 Starting Inventory Audit...");
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        await page.setViewport({ width: 1920, height: 1080 });

        for (const col of COLLECTIONS) {
            console.log(`\n🔎 Auditing: ${col.name}`);
            try {
                await page.goto(col.url, { waitUntil: 'networkidle2', timeout: 30000 });
                
                // OpenSea usually has stats in a specific container
                // Look for "items" or similar text in the stats bar
                const stats = await page.evaluate(() => {
                    const stats = {};
                    // Find elements that look like stat blocks
                    // Usually: Label (Items) -> Value (100)
                    const elements = Array.from(document.querySelectorAll('div, span, p'));
                    
                    // Look for "items" label
                    const itemsLabel = elements.find(el => el.innerText && el.innerText.toLowerCase() === 'items');
                    if (itemsLabel) {
                        // Value is usually parent's next sibling or inside the same parent
                        // Let's look up a bit
                        const container = itemsLabel.closest('button') || itemsLabel.parentElement;
                        if (container) {
                            stats.items = container.innerText.replace(/\n/g, ' ').replace('items', '').trim();
                        }
                    }
                    
                    // Fallback: Dump all short text to find numbers
                    return stats;
                });

                // Better extraction: Select by test id or specific classes if known? 
                // OpenSea changes classes often. Let's try to get all text in the "header" area.
                const headerText = await page.evaluate(() => {
                    const header = document.querySelector('main');
                    return header ? header.innerText.split('\n').slice(0, 50) : [];
                });

                // Parse the stats from header text
                // Usually: "Items 1,234 Created ..."
                const itemsLine = headerText.find(l => l.includes('Items'));
                const itemsCount = headerText[headerText.indexOf('Items') - 1] || headerText[headerText.indexOf('Items') + 1]; // Depending on layout

                // Let's just dump the header text for analysis in the log, but try to regex the number
                // Look for pattern: number + "Items"
                // Actually, often it's: "Items\n1,234"
                
                let count = "Unknown";
                for (let i = 0; i < headerText.length; i++) {
                    if (headerText[i].toLowerCase() === 'items') {
                        // The number is likely above or below
                        if (headerText[i-1] && headerText[i-1].match(/[\d,KMB]+/)) count = headerText[i-1];
                        else if (headerText[i+1] && headerText[i+1].match(/[\d,KMB]+/)) count = headerText[i+1];
                        break;
                    }
                }

                console.log(`   ✅ URL: ${col.url}`);
                console.log(`   📊 Count: ${count}`);
                // console.log(`   (Raw context: ${headerText.slice(0, 10).join(' | ')})`);

            } catch (e) {
                console.log(`   ❌ Failed: ${e.message}`);
            }
        }

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

scrape();
