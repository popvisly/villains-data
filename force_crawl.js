const puppeteer = require('puppeteer');

const URL = "https://op.xyz/communities/villains-at-large";

async function forceFind() {
    console.log(`🔨 BRUTE FORCE SCAN: ${URL}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });

        // Get all HTML
        const html = await page.content();
        
        // Regex for URLs
        // looking for href="/mintables/..."
        const regex = /href="(\/mintables\/[^"]+)"/g;
        const matches = [...html.matchAll(regex)];
        
        const found = new Set();
        matches.forEach(m => found.add("https://op.xyz" + m[1]));
        
        console.log(`   📦 Found ${found.size} Mintable URLs in HTML source:`);
        found.forEach(url => console.log(`      - ${url}`));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

forceFind();
