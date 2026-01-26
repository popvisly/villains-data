const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = "https://op.xyz/communities/villains-at-large";

async function deepDive() {
    console.log(`🤿 DEEP DIVE: ${URL}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });

        // 1. Extract __NEXT_DATA__
        console.log("   ...Extracting Next.js Data...");
        const nextData = await page.evaluate(() => {
            const el = document.getElementById('__NEXT_DATA__');
            return el ? JSON.parse(el.textContent) : null;
        });

        if (nextData) {
            fs.writeFileSync('next_data.json', JSON.stringify(nextData, null, 2));
            console.log("   ✅ Saved next_data.json");
            
            // Analyze for our targets
            const str = JSON.stringify(nextData);
            const targets = ['Cursed Star', 'Crystallised Bone Relic', 'Wicked Wizardry', 'GRIM'];
            
            console.log("\n   🔎 SEARCHING NEXT_DATA:");
            targets.forEach(t => {
                if (str.includes(t)) console.log(`      [FOUND] ${t} is in the data payload!`);
                else console.log(`      [MISSING] ${t}`);
            });
        } else {
            console.log("   ❌ __NEXT_DATA__ not found.");
        }

        // 2. Dump all text
        const text = await page.evaluate(() => document.body.innerText);
        fs.writeFileSync('page_text.txt', text);
        console.log("   ✅ Saved page_text.txt");

    } catch (e) {
        console.error("   ❌ ERROR:", e.message);
    } finally {
        await browser.close();
    }
}

deepDive();
