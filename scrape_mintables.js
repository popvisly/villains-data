const puppeteer = require('puppeteer');

const URL = "https://op.xyz/communities/villains-at-large";
const TARGETS = [
    'Cursed Star',
    'Crystallised Bone Relic',
    'Wicked Wizardry',
    'GRIM (HYDEOUT)'
];

async function mission() {
    console.log(`🦾 EXECUTING TARGETED SCRAPE: ${URL}`);
    
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        await page.setViewport({ width: 1920, height: 2000 }); // Tall viewport

        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
        
        // 1. Scroll to trigger any "Community Mintables" lazy load
        console.log("   ...Scrolling to reveal targets...");
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 300;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight * 1.5) { // Scroll a bit past just in case
                        clearInterval(timer);
                        resolve();
                    }
                }, 200);
            });
        });
        
        // Wait for potential render
        await new Promise(r => setTimeout(r, 3000));

        // 2. Extract Data
        const results = await page.evaluate((targetNames) => {
            const found = {};
            const allText = document.body.innerText; // Get full visible text
            
            // Debug: return chunks of text to see structure
            // return { debug: allText }; 

            // Strategy A: Look for the name, then find the "Minted:" number nearby in DOM
            // This is more robust than regex on huge text
            
            targetNames.forEach(name => {
                found[name] = "NOT FOUND";
                
                // Find all elements containing the name
                const xpath = `//*[contains(text(), "${name}")]`;
                const iterator = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                
                for (let i = 0; i < iterator.snapshotLength; i++) {
                    const el = iterator.snapshotItem(i);
                    // Walk up to a container (card)
                    let card = el.parentElement;
                    let attempts = 0;
                    while (card && attempts < 6) {
                        if (card.innerText.includes('Minted')) {
                            // Found the card! Now extract the number.
                            // Expected format: "Minted: 2 / 100" or similar
                            const match = card.innerText.match(/Minted:\s*([\d,]+)/i);
                            if (match) {
                                found[name] = match[1];
                                return; // Done with this target
                            }
                            // Fallback: Just look for a number near "Minted"
                            const mintLabel = Array.from(card.querySelectorAll('*')).find(e => e.innerText && e.innerText.includes('Minted'));
                            if (mintLabel) {
                                // Number might be in the label or sibling
                                const txt = mintLabel.innerText;
                                const num = txt.replace(/\D/g, '');
                                if (num) { 
                                    found[name] = num;
                                    return;
                                }
                            }
                        }
                        card = card.parentElement;
                        attempts++;
                    }
                }
            });
            return found;
        }, TARGETS);

        console.log("\n📊 REPORT:");
        for (const [name, count] of Object.entries(results)) {
            console.log(`   - ${name}: ${count}`);
        }

    } catch (e) {
        console.error("   ❌ SCRAPE FAILED:", e.message);
    } finally {
        await browser.close();
    }
}

mission();
