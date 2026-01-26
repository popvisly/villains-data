const puppeteer = require('puppeteer');
const fs = require('fs');

const VAULT_URL = "https://opensea.io/collection/villains-vault-s2";
const MAIN_URL = "https://opensea.io/collection/villains-at-large-209174595";
const CARDS_URL = "https://opensea.io/collection/villains-at-large-character-cards-series-1";
// Mintable Buckets
const MINTABLE_VOIDCORE = "https://op.xyz/mintables/cac0ef7a-448d-411c-8bdc-72ab3810aa7a";
const MINTABLE_JARBORKA = "https://op.xyz/mintables/bc610a4a-b139-4de6-9062-5c138ef1d4d4";
const MINTABLE_MIGNAT = "https://op.xyz/mintables/92715c05-5ed4-497d-910a-54b7eb8b591a";

const DATA_FILE = '/Volumes/850EVO/VILLAINS AT LARGE/wave2_data.json';

// Item Configuration: Name mapped to expected OpenSea string match
const EXCLUSIONS = ['GRIM (HYDEOUT)'];

const TARGETS = {
    // --- VAULT (Posters) ---
    'Wicked Wizardry': { type: 'Vault', match: 'Wicked Wizardry' },
    
    // --- MAIN (Artifacts, Pets, Wearables) ---
    'Cursed Star': { type: 'Main', match: 'Cursed Star' },
    'Crystallised Bone Relic': { type: 'Main', match: 'Crystallised' },
    // 'Mignat (Pup)': { type: 'Main', match: 'Mignat' }, // Moved to Mintable
    // 'Octerra (Juvenile)': { type: 'Main', match: 'Octerra' }, // PAUSED: Avoid Gen 1 false positives until Mintable Link drops
    'Gobela (Pup)': { type: 'Main', match: 'Gobela' },
    'Lyrak Zurk (Pup)': { type: 'Main', match: 'Lyrak' },
    'Evernight-Orb': { type: 'Main', match: 'Evernight' },
    'Cyron Chamber': { type: 'Main', match: 'Cyron' },
    'Brain Crystal': { type: 'Main', match: 'Brain Crystal' },
    'Heart of the Void': { type: 'Main', match: 'Heart of the Void' },
    
    // --- MINTABLES (Direct Scrape) ---
    'VOIDCORE Vessel': { type: 'Mintable', url: MINTABLE_VOIDCORE },
    'Jarborka (Pup)': { type: 'Mintable', url: MINTABLE_JARBORKA },
    'Mignat (Pup)': { type: 'Mintable', url: MINTABLE_MIGNAT },

    // --- CARDS (Collectors Cards) ---
    // Add known card names here if they differ, otherwise we scan for generics if needed
    // For now, we just ensure the scanner hits this URL for future items.
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
        console.log("   🔎 Scanning Bucket 1: Vault (Posters)...");
        await page.goto(VAULT_URL, { waitUntil: 'networkidle2', timeout: 45000 });
        const vaultText = await page.evaluate(() => document.body.innerText);
        
        // --- SCAN MAIN ---
        console.log("   🔎 Scanning Bucket 2: Main (Artifacts/Pets/Wearables)...");
        await page.goto(MAIN_URL, { waitUntil: 'networkidle2', timeout: 45000 });
        const mainText = await page.evaluate(() => document.body.innerText);

        // --- SCAN CARDS ---
        console.log("   🔎 Scanning Bucket 3: Cards...");
        await page.goto(CARDS_URL, { waitUntil: 'networkidle2', timeout: 45000 });
        const cardsText = await page.evaluate(() => document.body.innerText);

        // --- SCAN MINTABLES (Direct URLs) ---
        // Instead of a single "Voidcore" bucket, we iterate specific items
        for (const [name, config] of Object.entries(TARGETS)) {
            if (config.type !== 'Mintable') continue;
            
            console.log(`   🔎 Scanning Mintable: ${name}...`);
            await page.goto(config.url, { waitUntil: 'networkidle2', timeout: 30000 });
            const text = await page.evaluate(() => document.body.innerText);
            
            const match = text.match(/Minted:\s*(\d+)/i);
            const count = match ? parseInt(match[1]) : 0;
            console.log(`      - ${name}: ${count}`);
            liveCounts[name] = count;
        }

        // --- PROCESS OTHER COUNTS ---
        for (const [name, config] of Object.entries(TARGETS)) {
            if (EXCLUSIONS.includes(name)) continue;
            if (config.type === 'Mintable') continue; // Already processed

            let count = 0;
            let sourceText = "";
            if (config.type === 'Vault') sourceText = vaultText;
            else if (config.type === 'Main') sourceText = mainText;
            else if (config.type === 'Cards') sourceText = cardsText;
            
            // Fallback: If not found in primary bucket, scan others (Safety Net)
            const regex = new RegExp(config.match, 'gi');
            count = (sourceText.match(regex) || []).length;
            
            // SAFETY CHECK: If 0 in designated bucket, check the others
            if (count === 0) {
                const vaultCount = (vaultText.match(regex) || []).length;
                const mainCount = (mainText.match(regex) || []).length;
                const cardsCount = (cardsText.match(regex) || []).length;
                
                if (vaultCount > 0) { count = vaultCount; config.type = 'Vault (Auto-Corrected)'; }
                else if (mainCount > 0) { count = mainCount; config.type = 'Main (Auto-Corrected)'; }
                else if (cardsCount > 0) { count = cardsCount; config.type = 'Cards (Auto-Corrected)'; }
            }
            console.log(`      - ${name}: ${count} [${config.type}]`);
            liveCounts[name] = count;
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
            
            // --- GIT SYNC ---
            try {
                const { execSync } = require('child_process');
                console.log("   ☁️  Pushing to GitHub Bunker...");
                execSync('git add wave2_data.json', { cwd: '/Volumes/850EVO/VILLAINS AT LARGE/' });
                execSync('git commit -m "Auto-Update: Inventory Sync"', { cwd: '/Volumes/850EVO/VILLAINS AT LARGE/' });
                execSync('git push origin main', { cwd: '/Volumes/850EVO/VILLAINS AT LARGE/' });
                console.log("   🚀 SYNC COMPLETE. Data is live.");
            } catch (gitErr) {
                console.error("   ⚠️  GIT PUSH FAILED:", gitErr.message);
            }

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
