const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = "https://op.xyz/collection/06d82dde-c9d9-48fd-878b-8b9ef3cbbeef";

async function scrape() {
    console.log(`🚀 Launching Scraper for ${URL}...`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        
        console.log("Navigating...");
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });

        console.log("Waiting for content...");
        // Wait for something significant to load
        try {
            await page.waitForSelector('body', { timeout: 10000 });
        } catch (e) {
            console.log("Timeout waiting for body, proceeding anyway...");
        }

        // Snapshot content for debugging
        const content = await page.content();
        fs.writeFileSync('op_debug.html', content);
        console.log("📸 Saved HTML snapshot to op_debug.html");

        // Extract "Overlord" info
        const data = await page.evaluate(() => {
            const results = [];
            // Look for any element containing "Overlord"
            const elements = document.querySelectorAll('*');
            for (let el of elements) {
                if (el.children.length === 0 && el.textContent.includes('Overlord')) {
                    // Found a leaf node with "Overlord"
                    // Walk up to find the container
                    let container = el.parentElement;
                    while (container && container.textContent.length < 200) {
                        results.push(container.innerText.replace(/\n/g, ' | '));
                        container = container.parentElement;
                        if (results.length > 5) break; // Limit recursion
                    }
                }
            }
            return [...new Set(results)]; // Dedup
        });

        console.log("\n🔎 Scraped Data (Raw):");
        data.forEach(line => console.log(line));

        // Try to find structured badge counts (assuming format "Name ... Minted: X")
        // Just print all text for now to analyze structure
        const bodyText = await page.evaluate(() => document.body.innerText);
        const relevantLines = bodyText.split('\n').filter(l => l.toLowerCase().includes('overlord') || l.match(/\d+/));
        
        console.log("\n📄 Relevant Text Lines:");
        relevantLines.slice(0, 20).forEach(l => console.log(l));

    } catch (error) {
        console.error("❌ Scrape Failed:", error.message);
    } finally {
        await browser.close();
    }
}

scrape();
