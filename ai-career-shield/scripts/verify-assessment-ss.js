
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Utility delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    console.log('Starting Assessment Flow Verification...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    try {
        console.log('1. Navigating to /assessment...');
        await page.goto('http://localhost:3000/assessment', { waitUntil: 'domcontentloaded' });

        // Wait for hydration/render
        await delay(2000);

        // 2. Select "Professional" Persona
        // Look for the button containing the text "Professional"
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const proBtn = buttons.find(b => b.innerText.includes('Professional'));
            if (proBtn) proBtn.click();
            else throw new Error('Professional button not found');
        });
        console.log('   Selected Professional persona');
        await delay(500);

        // 3. Fill Job Title
        // Use the placeholder that appears for professional persona
        await page.type('input[placeholder*="Senior Product Manager"]', 'Senior Product Manager');
        console.log('   Entered Job Title');

        // 4. Select Industry
        await page.select('select', 'Technology');
        console.log('   Selected Industry');

        // 5. Add Skill
        await page.type('input[placeholder*="Type a skill"]', 'Product Strategy');
        await page.keyboard.press('Enter');
        console.log('   Added Skill');
        await delay(500);

        // 6. Submit Form
        console.log('6. Submitting Assessment...');
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const submitBtn = buttons.find(b => b.innerText.includes('Run Strategic Audit'));
            if (submitBtn) submitBtn.click();
            else throw new Error('Submit button not found');
        });

        // 7. Wait for Results and Specific Element
        console.log('7. Waiting for results generation (60s timeout)...');

        // We wait specifically for the Proof Kit Teaser text
        // "Free Preview: Proof Kit (Excerpt)"
        try {
            await page.waitForFunction(
                () => document.body.innerText.includes('Free Preview: Proof Kit (Excerpt)'),
                { timeout: 60000 }
            );
            console.log('   SUCCESS: Found "Free Preview: Proof Kit (Excerpt)"');
        } catch (e) {
            console.error('   TIMEOUT: Did not find "Free Preview" text.');
            // Dump content for debugging
            fs.writeFileSync('error_dump_puppeteer.html', await page.content());
            throw new Error('Verification failed: Free Preview text not found');
        }

        // 8. Take Screenshot
        const screenshotPath = path.join(__dirname, 'assessment_success.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`8. Screenshot saved to: ${screenshotPath}`);

    } catch (error) {
        console.error('\n❌ TEST FAILED:', error.message);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
