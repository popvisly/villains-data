const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = "https://op.xyz/communities/villains-at-large";

async function crawl() {
    console.log(`🕷️ COMMUNITY CRAWL INITIATED: ${URL}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });

        // 1. Click "MINTABLES" (if it exists)
        console.log("   ...Hunting for 'MINTABLES' tab...");
        const clicked = await page.evaluate(async () => {
            // Find button with text "MINTABLES"
            const buttons = Array.from(document.querySelectorAll('button, div[role="button"], a'));
            const tab = buttons.find(b => b.innerText && b.innerText.toUpperCase().includes('MINTABLES'));
            if (tab) {
                tab.click();
                return true;
            }
            return false;
        });

        if (clicked) {
            console.log("   ✅ Clicked 'MINTABLES'. Waiting for render...");
            await new Promise(r => setTimeout(r, 5000));
        } else {
            console.log("   ⚠️ 'MINTABLES' tab not found. Scanning current view...");
        }

        // 2. Scroll to bottom
        console.log("   ...Scrolling...");
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 200;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
        await new Promise(r => setTimeout(r, 2000));

        // 3. Extract Links
        console.log("   ...Extracting Item URLs...");
        const links = await page.evaluate(() => {
            const map = {};
            // Select all links
            const anchors = Array.from(document.querySelectorAll('a'));
            
            anchors.forEach(a => {
                const href = a.href;
                // We want mintables or collections
                if (href.includes('/mintables/') || href.includes('/collection/')) {
                    // Try to find the name. Usually inside the anchor or a sibling.
                    // Clean text: remove newlines, trim
                    let name = a.innerText.replace(/\n/g, ' ').trim();
                    
                    // Filter out generic text
                    if (!name || name.length < 3 || name.includes('View') || name.includes('Buy')) {
                        // Try looking at image alt text inside
                        const img = a.querySelector('img');
                        if (img && img.alt) name = img.alt;
                    }

                    if (name && name.length > 2) {
                        map[name] = href;
                    }
                }
            });
            return map;
        });

        console.log("   📊 FOUND LINKS:");
        for (const [name, link] of Object.entries(links)) {
            console.log(`      - [${name}] -> ${link}`);
        }

        // Save to file for the updater to read
        fs.writeFileSync('discovered_links.json', JSON.stringify(links, null, 2));

    } catch (e) {
        console.error("   ❌ CRAWL FAILED:", e.message);
    } finally {
        await browser.close();
    }
}

crawl();
