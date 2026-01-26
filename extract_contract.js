const puppeteer = require('puppeteer');
const fs = require('fs');

const ADDR = "0x6a8f6e09622340be113acb34f5ec7c10839b4425";
const URL = `https://apescan.io/address/${ADDR}`;

async function debug() {
    console.log(`🚀 Debugging: ${URL}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Wait a bit for JS to render
        await new Promise(r => setTimeout(r, 5000));

        const content = await page.content();
        fs.writeFileSync('contract_debug.html', content);
        console.log("📸 Saved HTML to contract_debug.html");
        
        const title = await page.title();
        console.log(`Title: ${title}`);

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

debug();
