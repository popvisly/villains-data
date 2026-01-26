const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = "https://op.xyz/communities/villains-at-large";

async function clickMints() {
    console.log(`🖱️ CLICKING MINTS: ${URL}`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        
        await page.goto(URL, { waitUntil: 'networkidle2', timeout: 30000 });

        // Find the "Mints" container
        const clicked = await page.evaluate(async () => {
            const spans = Array.from(document.querySelectorAll('span'));
            const mintsLabel = spans.find(s => s.innerText.includes('Mints'));
            if (mintsLabel) {
                // Click the parent container
                const container = mintsLabel.closest('div[role="button"]') || mintsLabel.closest('div');
                if (container) {
                    container.click();
                    return true;
                }
            }
            return false;
        });

        if (clicked) {
            console.log("   ✅ Clicked 'Mints' section.");
            await new Promise(r => setTimeout(r, 5000));
            
            const content = await page.content();
            fs.writeFileSync('op_mints_view.html', content);
            
            // Check for targets
            const text = await page.evaluate(() => document.body.innerText);
            if (text.includes('Cursed') || text.includes('Wicked')) {
                console.log("   🎉 FOUND TARGETS!");
                console.log(text.match(/(Cursed Star|Wicked Wizardry|GRIM).*?(\d+)/g));
            } else {
                console.log("   ❌ Targets still not visible after click.");
            }
        } else {
            console.log("   ❌ Could not find clickable 'Mints' section.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}

clickMints();
