const puppeteer = require('puppeteer');

const CONTRACTS = [
    { name: "Villains at Large (Main)", address: "0x6a8f6e09622340be113acb34f5ec7c10839b4425" },
    { name: "Villains Vault S2", address: "0x6ac74fb1dbd183ee8570c07882ff3773228e6247" },
    { name: "Character Cards (Series 1)", address: "0xd37f06379d8d926fcf6ed8f1b0bdd92fc35f677b" }
];

// Try the official ApeScan (ApeChain is often on Curtis or similar, but let's try apescan.io)
// Also try the caldera explorer if apescan fails.
const EXPLORERS = [
    "https://apescan.io/address",
    "https://apechain.calderaexplorer.xyz/address" 
];

async function scan() {
    console.log("🚀 Initializing Contract Scanner...");
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');

        for (const item of CONTRACTS) {
            console.log(`\n🔎 Scanning: ${item.name} [${item.address}]`);
            
            let found = false;
            for (const base of EXPLORERS) {
                if (found) break;
                const url = `${base}/${item.address}`;
                // console.log(`   Trying: ${url}`);
                
                try {
                    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
                    
                    // Check if page loaded valid content (look for "Contract" or "Token")
                    const title = await page.title();
                    const content = await page.content();
                    
                    if (content.includes("Total Supply") || content.includes("Token Tracker")) {
                        console.log(`   ✅ Loaded: ${base}`);
                        
                        // Scrape Total Supply
                        // Usually in a div with "Total Supply" label
                        const supply = await page.evaluate(() => {
                            const params = [
                                "Total Supply:",
                                "Max Total Supply:"
                            ];
                            for (let p of params) {
                                const els = Array.from(document.querySelectorAll('*'));
                                const label = els.find(e => e.innerText && e.innerText.includes(p));
                                if (label) {
                                    // Try to find the value in the next sibling or parent's text
                                    // Blockscout/Etherscan style
                                    return label.parentElement.innerText.split(p)[1]?.trim() || label.innerText;
                                }
                            }
                            return null;
                        });

                        // Scrape Holders?
                        
                        console.log(`   💰 SUPPLY: ${supply ? supply.replace(/\n/g, ' ') : "Not found in text"}`);
                        found = true;
                    } 
                } catch (e) {
                    // console.log(`   Skipping ${base}: ${e.message}`);
                }
            }
            
            if (!found) {
                console.log("   ❌ Could not locate contract details on known explorers.");
            }
        }

    } catch (e) {
        console.error("Global Error:", e);
    } finally {
        await browser.close();
    }
}

scan();
