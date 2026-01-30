// ANTIGRAVITY V2.0 // VILLAINS AT LARGE
// STATUS: HARDCODED TARGETING (Anti-Ban Compliant)

const fs = require('fs');
const simpleGit = require('simple-git');
const git = simpleGit();

// 1. THE MASTER LIST (Edit this to add new items)
const TARGETS = [
    // VAULT ITEMS
    { name: "Wicked Wizardry", count: 20, max: 100, rarity: "EPIC" },
    { name: "Crystallised Bone Relic", count: 1, max: 10, rarity: "LEGENDARY" },

    // MOMENTS (New Strategy)
    { name: "Handling Fee (Moment)", count: 0, max: 0, rarity: "MOMENT" }
];

// 2. THE DATABASE GENERATOR
async function runProtocol() {
    console.log("🦾 ANTIGRAVITY V2 INITIALIZED...");

    // Create the clean JSON structure
    const payload = TARGETS.map(item => ({
        "Item Name": item.name,
        "Rarity": item.rarity,
        "Max Supply": item.max,
        "minted": item.count,
        "releaseDate": new Date().toISOString().split('T')[0]
    }));

    // 3. SAVE TO DISK
    fs.writeFileSync('wave2_data.json', JSON.stringify(payload, null, 2));
    console.log("✅ Database Rebuilt.");

    // 4. PUSH TO GITHUB
    try {
        console.log("🚀 Pushing to Bunker...");
        await git.add('./*');
        await git.commit('Antigravity V2 Update');
        await git.push('origin', 'main');
        console.log("✅ LIVE SIGNAL SENT.");
    } catch (e) {
        console.error("⚠️ PUSH ERROR:", e);
    }
}

runProtocol();