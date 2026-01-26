const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = "https://op.xyz/communities/villains-at-large";

async function intercept() {
    console.log(`📡 INTERCEPTING TRAFFIC: ${URL}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');

    // Store responses
    const captured = [];

    page.on('response', async response => {
        const url = response.url();
        const type = response.request().resourceType();
        
        if (type === 'fetch' || type === 'xhr') {
            try {
                const text = await response.text();
                // Check if it's JSON
                if (text.startsWith('{') || text.startsWith('[')) {
                    if (text.includes('Cursed') || text.includes('Wicked') || text.includes('Minted')) {
                        console.log(`   🎯 HIT! Found keywords in: ${url}`);
                        captured.push({ url, data: JSON.parse(text) });
                    }
                }
            } catch (e) {
                // Ignore failed text parse
            }
        }
    });

    try {
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 45000 });
        
        // Click things to trigger fetches
        console.log("   ...Clicking tabs...");
        const buttons = await page.$$('button');
        for (const b of buttons) {
            try {
                const txt = await page.evaluate(el => el.innerText, b);
                if (txt.includes('COLLECTIONS') || txt.includes('MINTABLES')) {
                    console.log(`   🖱️ Clicking ${txt}`);
                    await b.click();
                    await new Promise(r => setTimeout(r, 2000));
                }
            } catch (e) {}
        }

        fs.writeFileSync('intercepted_data.json', JSON.stringify(captured, null, 2));
        console.log(`   ✅ Saved ${captured.length} intercepted payloads.`);

    } catch (e) {
        console.error("   ❌ ERROR:", e.message);
    } finally {
        await browser.close();
    }
}

intercept();
