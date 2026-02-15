
const puppeteer = require('puppeteer');

(async () => {
    console.log('Script started');
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        console.log('Browser launched');

        const page = await browser.newPage();
        console.log('Page created');

        await page.goto('http://localhost:3000/assessment', { waitUntil: 'domcontentloaded', timeout: 30000 });
        console.log('Navigated to URL');

        const content = await page.content();
        console.log('Content length:', content.length);
        console.log(content);

        await browser.close();
        console.log('Browser closed');
    } catch (err) {
        console.error('Error:', err);
    }
})();
