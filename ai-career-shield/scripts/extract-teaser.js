const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/assessment');

    // The previous script already ran, but I need to extract the results. 
    // Since it's a dev server and might have state or I can just re-run the extraction part if I have the page open?
    // Actually, I'll just scrape the existing successful screenshot's page if I can, 
    // but the easiest is to just run a quick script that does the same form fill and then logs the text.

    // Refined extraction script
    await page.goto('http://localhost:3000/assessment', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));

    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const proBtn = buttons.find(b => b.innerText.includes('Professional'));
        if (proBtn) proBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    await page.type('input[placeholder*="Senior Product Manager"]', 'Senior Product Manager');
    await page.select('select', 'Technology');
    await page.type('input[type="number"]', '10');
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const goalBtn = buttons.find(b => b.innerText.includes('Strengthen my current path'));
        if (goalBtn) goalBtn.click();
    });

    const skills = ['stakeholder management', 'analytics', 'delivery'];
    for (const skill of skills) {
        await page.type('input[placeholder*="Type a skill"]', skill);
        await page.keyboard.press('Enter');
        await new Promise(r => setTimeout(r, 200));
    }

    const interests = ['Strategy', 'Operations/Process'];
    for (const interest of interests) {
        await page.evaluate((interestText) => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const btn = buttons.find(b => b.innerText.trim() === interestText);
            if (btn) btn.click();
        }, interest);
        await new Promise(r => setTimeout(r, 200));
    }

    await page.evaluate(() => {
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.click();
    });

    await page.waitForSelector('[data-testid="proofkit-teaser"]', { timeout: 90000 });

    const data = await page.evaluate(() => {
        const teaser = document.querySelector('[data-testid="proofkit-teaser"]');
        return {
            thesis: teaser.querySelector('section p').innerText,
            proof: teaser.querySelector('section.bg-slate-50 p').innerText,
            question: teaser.querySelector('section p.text-slate-900').innerText,
            bullets: Array.from(teaser.querySelectorAll('ul li')).map(li => li.innerText)
        };
    });

    console.log('--- EXTRACTED DATA ---');
    console.log(JSON.stringify(data, null, 2));

    await browser.close();
})();
