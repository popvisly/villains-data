const fs = require('fs');

// function to parse .env file linearly
function loadEnvConfig() {
    try {
        const envPath = '/Volumes/850EVO/VILLAINS AT LARGE/.env';
        if (!fs.existsSync(envPath)) return {};

        const content = fs.readFileSync(envPath, 'utf8');
        const config = {};

        content.split('\n').forEach(line => {
            line = line.trim();
            if (!line || line.startsWith('#')) return;

            // simple split by first =
            const idx = line.indexOf('=');
            if (idx === -1) return;

            const key = line.substring(0, idx).trim();
            let value = line.substring(idx + 1).trim();

            // remove inline comments if any (simple heuristic)
            if (value.includes(' #')) {
                value = value.split(' #')[0].trim();
            }

            config[key] = value;
        });
        return config;
    } catch (e) {
        console.error('Failed to load .env:', e);
        return {};
    }
}

const config = loadEnvConfig();
const API_BASE_URL = config.OPENPAGE_API_BASE_URL || 'YOUR_API_URL_HERE';
const API_KEY = config.OPENPAGE_API_KEY || 'YOUR_API_KEY_HERE';
const WAVE2_DATA_PATH = '/Users/minimac/.gemini/antigravity/brain/b25ea985-04e4-4228-9e31-4effbe20ce4c/wave2_data.json';

async function main() {
    console.log('--- Villains at Large: Wave 2 Inventory Check ---');

    // 1. Load Wave 2 Data
    let wave2Data;
    try {
        const rawData = fs.readFileSync(WAVE2_DATA_PATH, 'utf8');
        wave2Data = JSON.parse(rawData);
        console.log(`Loaded ${wave2Data.length} items from Schedule.`);
    } catch (error) {
        console.error('Error loading Wave 2 data:', error.message);
        process.exit(1);
    }

    // 2. Fetch Badges (Root Endpoint + Header)
    const url = API_BASE_URL;
    console.log(`\nFetching live inventory from: ${url}`);

    const headers = {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
        'x-community-id': 'villains-at-large'
    };

    let apiItems = [];
    try {
        const response = await fetch(url, { headers });

        if (response.status === 401) {
            console.error('\n❌  ACCESS DENIED (401)');
            console.error('   Key rejected. If you rotated the key, please update the .env file.');
            process.exit(1);
        }

        if (!response.ok) {
            console.error(`Status ${response.status}: ${response.statusText}`);
            const text = await response.text();
            console.error('Response:', text);
            process.exit(1);
        }

        const json = await response.json();

        // Handle badge list structure
        if (json.badges) apiItems = json.badges;
        else if (Array.isArray(json)) apiItems = json;
        else if (json.data && Array.isArray(json.data)) apiItems = json.data;
        else apiItems = [json];

        console.log(`Successfully fetched ${apiItems.length} items.\n`);

    } catch (error) {
        console.error('Failed to fetch from API:', error.message);
        process.exit(1);
    }

    // 3. Audit Comparison (Minted vs Max)
    console.log('--- Inventory Audit (Stunlarrk & Jarborka) ---');
    console.log('| Item Name | Sheet Max | Live Minted | Status |');
    console.log('|---|---|---|---|');

    const keyItems = ['Stunlarrk', 'Jarborka'];

    for (const key of keyItems) {
        // Find sheet entry
        const sheetEntry = wave2Data.find(w => w['Item Name'].includes(key));
        const sheetMax = sheetEntry ? parseInt(sheetEntry['Max Supply']) : 0;
        const sheetName = sheetEntry ? sheetEntry['Item Name'] : key;

        // Find API entry
        const apiItem = apiItems.find(i => {
            const apiName = (i.name || i.title || '').toLowerCase();
            return apiName.includes(key.toLowerCase());
        });

        if (!apiItem) {
            console.log(`| ${sheetName} | ${sheetMax} | Not Found | ❌ Missing |`);
            continue;
        }

        const minted = parseInt(apiItem.minted || apiItem.mintedCount || apiItem.count || apiItem.supply || 0);

        // Check: Is Minted > Max?
        let status = '✅ OK';
        if (minted > sheetMax) {
            status = `⚠️ OVER MINT (+${minted - sheetMax})`;
        } else if (minted === sheetMax) {
            status = '✅ Exact';
        } else {
            status = `✅ Under (${minted})`; // Actually this is fine too, usually
        }

        console.log(`| ${sheetName} | ${sheetMax} | ${minted} | ${status} |`);
    }

    console.log('\n--- End of Audit ---');
}

main();
