const puppeteer = require('puppeteer');

const COLLECTIONS = [
    { name: "Villains at Large (Main)", url: "https://opensea.io/collection/villains-at-large-209174595" },
    { name: "Villains Vault S2", url: "https://opensea.io/collection/villains-vault-s2" },
    { name: "Character Cards (Series 1)", url: "https://opensea.io/collection/villains-at-large-character-cards-series-1" }
];

async function audit() {
    console.log("🦾 STARTING INVENTORY AUDIT...");
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        
        for (const col of COLLECTIONS) {
            // console.log(`\n🔎 Scanning: ${col.name}`);
            try {
                await page.goto(col.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
                // Wait for potential hydration
                await new Promise(r => setTimeout(r, 2000));
                
                const content = await page.content();
                
                // Regex for JSON data: "totalSupply":123
                // There might be multiple, usually the first one or one inside "stats" is correct.
                // The structure seen was: "stats":{"uniqueItemCount":23,"__typename":"CollectionStats","totalSupply":23,
                
                const match = content.match(/"totalSupply":(\d+)/);
                const count = match ? match[1] : "ERR";
                
                // Double check with "items" label in UI just in case
                // const uiCount = ... (omitted for reliability of regex)

                console.log(`${col.name}: ${count}`);

            } catch (e) {
                console.log(`${col.name}: ERROR (${e.message})`);
            }
        }

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

audit();
