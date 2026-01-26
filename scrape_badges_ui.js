const puppeteer = require('puppeteer');

const URL = "https://op.xyz/communities/villains-at-large";

async function scrapeBadges() {
    console.log(`🚀 Scraping Badges from UI...`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });

        // Scroll to bottom to trigger lazy loading
        console.log("Scrolling...");
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight){
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });

        // Extract any visible badge names
        const badges = await page.evaluate(() => {
            const items = [];
            // Look for elements that might be badges (usually in a grid)
            // Heuristic: look for text that looks like a name + a count
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                if (el.innerText && el.innerText.includes('Minted:')) {
                    items.push(el.innerText.replace(/\n/g, ' '));
                }
            });
            return items;
        });
        
        console.log(`📦 Found ${badges.length} potential badge elements.`);
        badges.forEach(b => console.log(`   - ${b}`));

    } catch (e) {
        console.error(e.message);
    } finally {
        await browser.close();
    }
}

scrapeBadges();
