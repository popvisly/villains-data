const puppeteer = require('puppeteer');

const URL = "https://op.xyz/mintables/cac0ef7a-448d-411c-8bdc-72ab3810aa7a";

async function checkMintable() {
    console.log(`🔎 Checking Mintable: ${URL}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });

        const text = await page.evaluate(() => document.body.innerText);
        
        // Look for "9 / 15" or "Minted: 9"
        console.log("--- Page Text Sample ---");
        const lines = text.split('\n').filter(l => l.trim().length > 0);
        lines.slice(0, 30).forEach(l => console.log(l));
        
        // specific check
        const match = text.match(/(\d+)\s*\/\s*(\d+)/);
        if (match) console.log(`\n🎯 Regex Match: ${match[0]} (Minted: ${match[1]}, Max: ${match[2]})`);

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

checkMintable();
