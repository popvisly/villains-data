const puppeteer = require('puppeteer');

const URL = "https://opensea.io/collection/villains-at-large-209174595";

async function listMain() {
    console.log(`📜 Listing Items from: ${URL}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
        const allText = await page.evaluate(() => document.body.innerText);
        
        const counts = {
            'GRIM': (allText.match(/GRIM/gi) || []).length,
            'Overlord': (allText.match(/Overlord/gi) || []).length
        };

        console.log("Counts found on first page:");
        console.log(counts);

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

listMain();
