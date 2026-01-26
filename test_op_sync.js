const axios = require('axios');
const fs = require('fs');
const path = require('path');

// --- LOAD ENV ---
// Since we are running in the same directory, relative path should work,
// but let's be safe and use the absolute path you confirmed earlier.
const envPath = '/Volumes/850EVO/VILLAINS AT LARGE/.env';
let API_KEY = '';
let API_BASE_URL = 'https://api.op.xyz/v1/badges';

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const val = parts.slice(1).join('=').trim();
            if (key === 'OPENPAGE_API_KEY') API_KEY = val;
            if (key === 'OPENPAGE_API_BASE_URL') API_BASE_URL = val;
        }
    });
} catch (e) {
    console.error("❌ Failed to read .env file:", e.message);
    process.exit(1);
}

if (!API_KEY) {
    console.error("❌ ERROR: OPENPAGE_API_KEY not found in .env");
    process.exit(1);
}

// --- CONFIGURATION ---
// The community ID for Villains at Large
const COMMUNITY_ID = 'villains-at-large'; 

async function fetchLiveBadges() {
    console.log(`🚀 Connecting to OpenPage API...`);
    console.log(`📍 Endpoint: ${API_BASE_URL}`);
    console.log(`🔑 Key: ${API_KEY.substring(0, 4)}... (redacted)`);

    try {
        const response = await axios.get(API_BASE_URL, {
            headers: {
                'X-Api-Key': API_KEY,
                'Content-Type': 'application/json',
                'x-community-id': COMMUNITY_ID
            }
        });

        const data = response.data;
        let badges = [];

        // Handle different possible API response structures
        if (Array.isArray(data)) {
            badges = data;
        } else if (data.badges && Array.isArray(data.badges)) {
            badges = data.badges;
        } else if (data.data && Array.isArray(data.data)) {
            badges = data.data;
        } else {
            console.error("⚠️  Unexpected API Response Structure:", JSON.stringify(data).substring(0, 200));
            return;
        }

        console.log(`✅ SUCCESS: Retrieved ${badges.length} badges.`);
        console.log("\n--- 🛡️ LIVE INVENTORY REPORT 🛡️ ---");
        
        // Filter for "Overlord" just to prove the point, then show top 5 others
        const overlords = badges.filter(b => (b.name || b.title).toLowerCase().includes('overlord'));
        
        if (overlords.length > 0) {
            console.log("\n💀 OVERLORDS:");
            overlords.forEach(b => {
                const name = b.name || b.title || "Unknown";
                const minted = b.minted || b.mintedCount || b.supply || 0;
                const total = b.maxSupply || b.total || "∞";
                console.log(`   - ${name}: ${minted} / ${total}`);
            });
        } else {
            console.log("\n💀 OVERLORDS: None found (Check search term?)");
        }

        console.log("\n📦 OTHER ASSETS (Sample):");
        badges.slice(0, 5).forEach(b => {
             const name = b.name || b.title || "Unknown";
             const minted = b.minted || b.mintedCount || b.supply || 0;
             console.log(`   - ${name}: ${minted}`);
        });

    } catch (error) {
        console.error(`❌ API REQUEST FAILED: ${error.message}`);
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Data: ${JSON.stringify(error.response.data)}`);
        }
    }
}

fetchLiveBadges();
