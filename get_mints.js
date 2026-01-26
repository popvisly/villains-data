const fs = require('fs');
const puppeteer = require('puppeteer');
const axios = require('axios');

// --- CONFIGURATION ---
const COLLECTION_URL = "https://opensea.io/collection/villains-at-large";
const DATA_FILE = "./wave2_data.json";
const SIMVOLY_KEY = 's1a67f70493a279edb350c78ff4baaba2'; // Your Simvoly Key

async function checkItem(page, itemName) {
    // console.log(`\n🔎 Checking: "${itemName}"...`);
    const searchInputSelector = 'input[placeholder*="Search"]';

    try {
        await page.waitForSelector(searchInputSelector, { timeout: 10000 });

        // Clear input: Click 3 times + Backspace
        await page.click(searchInputSelector, { clickCount: 3 });
        await page.keyboard.press('Backspace');

        // Type new name
        await page.type(searchInputSelector, itemName, { delay: 50 });
        await page.keyboard.press('Enter');

        // Wait for Grid Refresh
        await new Promise(r => setTimeout(r, 4000));

        // Check "No items found"
        const isNoItems = await page.evaluate(() => {
            const allSpans = Array.from(document.querySelectorAll('span, div'));
            return allSpans.some(el => el.textContent.trim() === "No items found");
        });

        if (isNoItems) return 0;

        // Count items
        let count = await page.$$eval('div[role="grid"] article', els => els.length);
        if (count === 0) {
            count = await page.$$eval('article', els => els.length);
        }
        return count;

    } catch (e) {
        console.error(`[SCAPE ERROR] ${itemName}:`, e.message);
        return -1;
    }
}

async function syncToSimvoly(name, id, count) {
    if (!id) {
        console.log(`⚠️  [SKIP SYNC] ${name} (No 'simvoly_id' in JSON)`);
        return;
    }

    try {
        await axios.post('https://simvoly.com/api/v1/store/products/sync', {
            product_id: id,
            stock_level: count
        }, {
            headers: { 'X-API-KEY': SIMVOLY_KEY }
        });
        console.log(`🔄 [SYNCED] ${name} -> Stock: ${count}`);
    } catch (err) {
        console.error(`❌ [SYNC FAIL] ${name}: ${err.message}`);
    }
}

async function run() {
    const args = process.argv.slice(2);
    let targetItems = [];

    // --- DATA LOADING ---
    if (args.includes('--batch')) {
        console.log("📂 Batch Mode: Reading " + DATA_FILE);
        try {
            const raw = fs.readFileSync(DATA_FILE);
            const data = JSON.parse(raw);
            // We keep the whole object now, not just the name
            targetItems = data;
        } catch (e) {
            console.error("Failed to read data file:", e.message);
            process.exit(1);
        }
    } else if (args.length > 0) {
        // Single item test
        targetItems = [{ "Item Name": args[0], "simvoly_id": null }];
    }

    console.log(`🚀 Starting Auto-Sync for ${targetItems.length} items...`);

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
        });
        const page = await browser.newPage();

        // Stealth Settings
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        await page.setViewport({ width: 1920, height: 1080 });

        console.log("Navigating to OpenSea...");
        await page.goto(COLLECTION_URL, { waitUntil: 'networkidle2', timeout: 60000 });

        // --- MAIN LOOP ---
        for (const item of targetItems) {
            const name = item["Item Name"];
            const id = item["simvoly_id"]; // Look for this field

            if (!name) continue;

            const count = await checkItem(page, name);

            if (count >= 0) {
                console.log(`✅ [FOUND] ${name}: ${count}`);
                // TRIGGER SYNC
                await syncToSimvoly(name, id, count);
            } else {
                console.log(`❌ [ERROR] Could not scrape ${name}`);
            }

            // Random pause (2-5s) to look human
            const pause = Math.floor(Math.random() * 3000) + 2000;
            await new Promise(r => setTimeout(r, pause));
        }

    } catch (error) {
        console.error("Global Error:", error);
    } finally {
        if (browser) await browser.close();
        console.log("\n--- Cycle Complete ---");
    }
}

run();