
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
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const proBtn = buttons.find(b => b.innerText.includes('Professional'));
            if (proBtn) proBtn.click();
            else throw new Error('Professional button not found');
        });
        console.log('   Selected Professional persona');
        await delay(1000);

        // 3. Fill Jobs/Industry
        await page.type('input[placeholder*="Senior Product Manager"]', 'Senior Product Manager');
        await page.select('select', 'Technology');
        console.log('   Entered Job Title and Industry');

        // 4. Experience and Goal
        await page.type('input[type="number"]', '10');
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const goalBtn = buttons.find(b => b.innerText.includes('Strengthen my current path'));
            if (goalBtn) goalBtn.click();
        });
        console.log('   Entered Experience and Goal');

        // 5. Skills
        const skills = ['stakeholder management', 'analytics', 'delivery'];
        for (const skill of skills) {
            await page.type('input[placeholder*="Type a skill"]', skill);
            await page.keyboard.press('Enter');
            await delay(200);
        }
        console.log('   Added Skills');

        // 6. Interests
        const interests = ['Strategy', 'Operations/Process'];
        for (const interest of interests) {
            await page.evaluate((interestText) => {
                const buttons = Array.from(document.querySelectorAll('button'));
                const btn = buttons.find(b => b.innerText.trim() === interestText);
                if (btn) btn.click();
            }, interest);
            await delay(200);
        }
        console.log('   Selected Interests');

        // 7. Submit Form
        console.log('7. Submitting Assessment...');
        await page.evaluate(() => {
            const submitBtn = document.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.click();
            else throw new Error('Submit button not found');
        });

        // 7. Wait for Results and Specific Element
        console.log('7. Waiting for results generation (90s timeout)...');

        // We wait specifically for the Proof Kit Teaser via data-testid
        try {
            await page.waitForSelector('[data-testid="proofkit-teaser"]', { timeout: 90000 });
            console.log('   SUCCESS: Found [data-testid="proofkit-teaser"]');
        } catch (e) {
            console.error('   TIMEOUT: Did not find teaser with data-testid="proofkit-teaser".');
            // Dump content for debugging
            fs.writeFileSync('error_dump_puppeteer.html', await page.content());
            throw new Error('Verification failed: Teaser not found');
        }

        // 8. Extract and Log Results
        console.log('8. Extracting Teaser Content...');
        const data = await page.evaluate(() => {
            const teaser = document.querySelector('[data-testid="proofkit-teaser"]');
            if (!teaser) return null;

            // Refined extraction
            const thesis = teaser.querySelector('section p')?.innerText || 'Not found';
            const proofSection = teaser.querySelector('section.bg-slate-50');
            const proofLabel = proofSection?.querySelector('span.text-amber-600, span.text-emerald-600')?.innerText || 'Not found';
            const proofBullet = proofSection?.querySelector('p.text-slate-800')?.innerText || 'Not found';
            const interviewSection = teaser.querySelector('section:nth-of-type(3)');
            const questionText = interviewSection?.querySelector('p.text-slate-900')?.innerText || 'Not found';
            const answerBullets = Array.from(interviewSection?.querySelectorAll('ul li') || []).map(li => li.innerText);

            return {
                thesis,
                proof: `${proofLabel}: "${proofBullet}"`,
                question: questionText,
                bullets: answerBullets
            };
        });

        if (data) {
            console.log('\n--- FINAL TEASER EXCERPT ---');
            console.log(`Thesis: ${data.thesis}`);
            console.log(`Proof Point: ${data.proof}`);
            console.log(`Interview Q: ${data.question}`);
            console.log(`Bullets:\n${data.bullets.map(b => `  • ${b}`).join('\n')}`);
            console.log('----------------------------\n');
        }

        // 9. Take Screenshot
        const screenshotPath = path.join(__dirname, 'assessment_success.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`9. Screenshot saved to: ${screenshotPath}`);

    } catch (error) {
        console.error('\n❌ TEST FAILED:', error.message);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
