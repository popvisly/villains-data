const puppeteer = require('puppeteer');
const fs = require('fs');

const VAULT_URL = "https://opensea.io/collection/villains-vault-s2";
const MAIN_URL = "https://opensea.io/collection/villains-at-large-209174595";
const DATA_FILE = '/Volumes/850EVO/VILLAINS AT LARGE/wave2_data.json';

// Item Configuration: Name mapped to expected OpenSea string match
const TARGETS = {
    'Wicked Wizardry': { type: 'Vault', match: 'Wicked Wizardry' },
    'Cursed Star': { type: 'Vault', match: 'Cursed Star' },
    'Crystallised Bone Relic': { type: 'Vault', match: 'Crystallised' },
    'GRIM (HYDEOUT)': { type: 'Main', match: 'GRIM' },
    'Mignat (Pup)': { type: 'Vault', match: 'Mignat' }, // Assuming it might appear in Vault or we keep manual
    'Stunlarrk (Pup)': { type: 'Vault', match: 'Stunlarrk' },
    'Jarborka (Pup)': { type: 'Vault', match: 'Jarborka' }
};

async function runAntigravity() {
    console.log(`[${new Date().toISOString()}] 🦾 ACTIVATING ANTIGRAVITY PROTOCOL...`);
    
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const liveCounts = {};

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
        await page.setViewport({ width: 1920, height: 1080 });

        // --- SCAN VAULT ---
        console.log("   🔎 Scanning Vault...");
        await page.goto(VAULT_URL, { waitUntil: 'networkidle2', timeout: 45000 });
        const vaultText = await page.evaluate(() => document.body.innerText);
        
        // --- SCAN MAIN ---
        console.log("   🔎 Scanning Main Collection...");
        await page.goto(MAIN_URL, { waitUntil: 'networkidle2', timeout: 45000 });
        const mainText = await page.evaluate(() => document.body.innerText);

        // --- PROCESS COUNTS ---
        for (const [name, config] of Object.entries(TARGETS)) {
            const sourceText = config.type === 'Vault' ? vaultText : mainText;
            const regex = new RegExp(config.match, 'gi');
            const count = (sourceText.match(regex) || []).length;
            
            // Safety Check: If 0, and it's a known active item, we might have failed to load.
            // But for now we trust the scrape.
            liveCounts[name] = count;
            console.log(`      - ${name}: ${count}`);
        }

        // --- UPDATE JSON ---
        console.log("   💾 Updating Database...");
        let data = [];
        try {
            if (fs.existsSync(DATA_FILE)) {
                data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
            }
        } catch (e) {
            console.error("      ❌ Error reading DB:", e.message);
        }

        let changes = 0;
        
        // Update loops
        for (const [name, count] of Object.entries(liveCounts)) {
            const item = data.find(i => i['Item Name'] === name);
            if (item) {
                if (item.minted !== count) {
                    console.log(`      🔄 UPDATE: ${name} (${item.minted} -> ${count})`);
                    item.minted = count;
                    changes++;
                }
            } else {
                // New Item Auto-Entry (Basic defaults)
                console.log(`      ➕ NEW: ${name} (Count: ${count})`);
                data.push({
                    "Item Name": name,
                    "Category": "Auto-Detected",
                    "Status": "LIVE",
                    "Rarity": "Unknown",
                    "Max Supply": 50, // Default placeholder
                    "minted": count
                });
                changes++;
            }
        }

        if (changes > 0) {
            fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
            console.log(`   ✅ Database Updated (${changes} changes).`);
        } else {
            console.log("   ✅ Database Synced. No changes detected.");
        }

    } catch (e) {
        console.error("   ❌ ANTIGRAVITY FAILURE:", e.message);
    } finally {
        await browser.close();
    }
}

runAntigravity();
