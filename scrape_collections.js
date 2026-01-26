const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = "https://op.xyz/communities/villains-at-large";

async function scrape() {
    console.log(`🚀 Launching Scraper for ${URL}...`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
    });
    
    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        await page.setViewport({ width: 1920, height: 1080 });
        
        console.log("Navigating...");
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });

        // Look for the "COLLECTIONS" button
        console.log("Searching for 'COLLECTIONS' tab...");
        
        // Try to find the button by text
        const collectionsBtn = await page.evaluateHandle(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            return buttons.find(b => b.innerText.includes('COLLECTIONS'));
        });

        if (collectionsBtn) {
            console.log("🖱️  Clicking 'COLLECTIONS'...");
            await collectionsBtn.click();
            
            // Wait for content to change/load
            await new Promise(r => setTimeout(r, 5000));
            
            console.log("📸 Snapshotting Collections view...");
            const content = await page.content();
            fs.writeFileSync('op_collections.html', content);
            
            // Extract Names
            const items = await page.evaluate(() => {
                // Look for common card patterns
                const cards = Array.from(document.querySelectorAll('a[href*="/collection/"]'));
                return cards.map(c => {
                    return {
                        text: c.innerText,
                        href: c.getAttribute('href')
                    };
                });
            });
            
            console.log(`📦 Found ${items.length} Collection links:`);
            items.forEach(i => console.log(`   - ${i.text.replace(/\n/g, ' ')} -> ${i.href}`));
            
        } else {
            console.error("❌ 'COLLECTIONS' button not found.");
        }

    } catch (error) {
        console.error("❌ Scrape Failed:", error.message);
    } finally {
        await browser.close();
    }
}

scrape();
