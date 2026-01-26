const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = "https://opensea.io/collection/villains-vault-s2";

async function debug() {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
        const content = await page.content();
        fs.writeFileSync('os_debug.html', content);
        console.log("📸 Saved os_debug.html");

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

debug();
