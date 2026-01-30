const puppeteer = require('puppeteer');

// Directly visiting the mintable URL we know exists to see how it links back or if there are related items
const SEED_URL = "https://op.xyz/mintables/cac0ef7a-448d-411c-8bdc-72ab3810aa7a"; // Voidcore

async function reverseMap() {
    console.log(`🔄 REVERSE MAPPING from: ${SEED_URL}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.goto(SEED_URL, { waitUntil: 'networkidle2' });
        
        // Look for "More from Villains at Large" or similar links
        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a'))
                .map(a => a.href)
                .filter(h => h.includes('/mintables/') || h.includes('/collection/'));
        });
        
        console.log(`   🔗 Found ${links.length} related links:`);
        [...new Set(links)].forEach(l => console.log(`      - ${l}`));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

reverseMap();
