const puppeteer = require('puppeteer');

const TARGETS = [
    { name: "Main", contract: "0x6a8f6e09622340be113acb34f5ec7c10839b4425" },
    { name: "Vault", contract: "0x6ac74fb1dbd183ee8570c07882ff3773228e6247" },
    { name: "Cards", contract: "0xd37f06379d8d926fcf6ed8f1b0bdd92fc35f677b" }
];

async function find() {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        
        for (let t of TARGETS) {
            console.log(`\n🔎 Finding Collection for: ${t.name}`);
            // Try Token 1
            const url = `https://opensea.io/assets/ape_chain/${t.contract}/1`;
            // console.log(`   Visiting: ${url}`);
            
            try {
                await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
                await new Promise(r => setTimeout(r, 3000));
                
                // Look for Collection Link
                // Usually a link near the top with the collection name
                const collectionLink = await page.evaluate(() => {
                    // OpenSea structure varies, but usually:
                    // <a href="/collection/slug">Collection Name</a>
                    // It's often in a header or 'Collection' label
                    const links = Array.from(document.querySelectorAll('a[href*="/collection/"]'));
                    // Return the first one that isn't empty
                    return links.find(l => l.innerText.length > 0)?.href;
                });

                if (collectionLink) {
                    console.log(`   ✅ FOUND: ${collectionLink}`);
                } else {
                    console.log(`   ❌ Collection link not found on asset page.`);
                    // Fallback: Check title
                    const title = await page.title();
                    console.log(`   (Page Title: ${title})`);
                }
                
            } catch (e) {
                console.log(`   Error: ${e.message}`);
            }
        }
        
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

find();
