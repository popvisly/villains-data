const fs = require('fs');
const path = require('path');

// --- THE SOURCE OF TRUTH (Scraped Data) ---
// In a full automation, we would run the scraper here.
// For now, we use the verified numbers we just found.
const LIVE_COUNTS = {
    'Wicked Wizardry': 20,
    'Cursed Star': 1,
    'Crystallised Bone Relic': 1,
    'GRIM (HYDEOUT)': 1,
    'Mignat (Pup)': 1 // Keeping existing data
};

// --- CONFIG ---
const DATA_FILE = '/Volumes/850EVO/VILLAINS AT LARGE/wave2_data.json';

// --- DEFAULTS FOR NEW ITEMS ---
const DEFAULTS = {
    'Wicked Wizardry': { Category: 'Poster', Rarity: 'Epic', MaxSupply: 50, Status: 'LIVE' },
    'Crystallised Bone Relic': { Category: 'Artifact', Rarity: 'Legendary', MaxSupply: 10, Status: 'LIVE' },
    'GRIM (HYDEOUT)': { Category: 'Character', Rarity: 'Mythic', MaxSupply: 1, Status: 'LIVE' }
};

function updateInventory() {
    console.log("🦾 STARTING ANTIGRAVITY INVENTORY UPDATE...");

    // 1. Read Data
    let data = [];
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        data = JSON.parse(raw);
    } catch (e) {
        console.error("❌ Failed to read wave2_data.json");
        return;
    }

    let changes = 0;

    // 2. Update Existing Items
    data.forEach(item => {
        const name = item['Item Name'];
        if (LIVE_COUNTS[name] !== undefined) {
            const current = item.minted || 0;
            if (current !== LIVE_COUNTS[name]) {
                console.log(`   🔄 Updating ${name}: ${current} -> ${LIVE_COUNTS[name]}`);
                item.minted = LIVE_COUNTS[name];
                changes++;
            }
        }
    });

    // 3. Add Missing Items
    for (const [name, count] of Object.entries(LIVE_COUNTS)) {
        const exists = data.find(i => i['Item Name'] === name);
        if (!exists && DEFAULTS[name]) {
            console.log(`   ➕ Adding New Item: ${name}`);
            data.push({
                "Item Name": name,
                "Category": DEFAULTS[name].Category,
                "Status": DEFAULTS[name].Status,
                "Rarity": DEFAULTS[name].Rarity,
                "Max Supply": DEFAULTS[name].MaxSupply,
                "minted": count
            });
            changes++;
        }
    }

    // 4. Save
    if (changes > 0) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        console.log(`✅ SUCCESS: Updated ${changes} items in wave2_data.json`);
    } else {
        console.log("✅ NO CHANGES NEEDED. Inventory is up to date.");
    }
}

updateInventory();
