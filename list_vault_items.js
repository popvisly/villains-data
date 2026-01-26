const puppeteer = require('puppeteer');

const URL = "https://opensea.io/collection/villains-vault-s2";

async function listItems() {
    console.log(`📜 Listing Items from: ${URL}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        await page.setViewport({ width: 1920, height: 1080 });
        
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 3000));

        // Scrape item names
        const names = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('div[role="grid"] article')); // adjust selector if needed
            return items.map(el => el.innerText.split('\n')[0]); // simplified
        });
        
        // Better selector: Look for any text that looks like our targets
        const allText = await page.evaluate(() => document.body.innerText);
        
        const counts = {
            'Wicked Wizardry': (allText.match(/Wicked Wizardry/g) || []).length,
            'Cursed Star': (allText.match(/Cursed Star/g) || []).length,
            'Crystallised Bone Relic': (allText.match(/Crystallised/g) || []).length,
            'GRIM': (allText.match(/GRIM/g) || []).length
        };

        console.log("Counts found on first page:");
        console.log(counts);

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

listItems();
