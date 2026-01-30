const puppeteer = require('puppeteer');

const URL = "https://op.xyz/mintables/e64ee666-6db1-45a5-99c7-434122dc19d2";

async function identify() {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const title = await page.evaluate(() => {
            const h1 = document.querySelector('h1');
            return h1 ? h1.innerText : document.title;
        });
        
        const minted = await page.evaluate(() => {
            return document.body.innerText.match(/Minted:\s*(\d+)/i)?.[1] || "Unknown";
        });

        console.log(`Title: ${title}`);
        console.log(`Minted: ${minted}`);

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

identify();
