const axios = require('axios');
const fs = require('fs');

// Load Env
const envPath = '/Volumes/850EVO/VILLAINS AT LARGE/.env';
let API_KEY = '';
try {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
        if (line.startsWith('OPENPAGE_API_KEY=')) {
            API_KEY = line.split('=')[1].trim();
        }
    });
} catch (e) {
    console.error("Failed to load .env");
    process.exit(1);
}

const BASE_URL = 'https://portal.op.xyz/api/v1';
const COMMUNITY_SLUG = 'villains-at-large';
const COMMUNITY_UUID = '880c067c-fce9-4ea9-b42b-f065bd5cf6d5';

async function discover() {
    console.log(`🔎 STARTING DISCOVERY SCAN...`);
    console.log(`🔑 Key: ${API_KEY.substring(0, 4)}...`);

    const strategies = [
        {
            name: "Badges (X-Api-Key + UUID)",
            url: `${BASE_URL}/badges`,
            headers: { 'X-Api-Key': API_KEY, 'x-community-id': COMMUNITY_UUID }
        },
        {
            name: "Badges (X-Api-Key + Slug)",
            url: `${BASE_URL}/badges`,
            headers: { 'X-Api-Key': API_KEY, 'x-community-id': COMMUNITY_SLUG }
        },
        {
            name: "Badges (Bearer Token + UUID)",
            url: `${BASE_URL}/badges`,
            headers: { 'Authorization': `Bearer ${API_KEY}`, 'x-community-id': COMMUNITY_UUID }
        },
        {
            name: "Collections (X-Api-Key)",
            url: `${BASE_URL}/communities/${COMMUNITY_UUID}/collections`,
            headers: { 'X-Api-Key': API_KEY }
        },
        {
            name: "Mintables (X-Api-Key)",
            url: `${BASE_URL}/communities/${COMMUNITY_UUID}/mintables`,
            headers: { 'X-Api-Key': API_KEY }
        }
    ];

    let foundAny = false;

    for (const strat of strategies) {
        try {
            console.log(`\n👉 Testing: ${strat.name}`);
            const res = await axios.get(strat.url, { headers: strat.headers });
            console.log(`✅ SUCCESS (${res.status})`);
            
            const data = res.data.badges || res.data.data || res.data.collections || res.data;
            
            if (Array.isArray(data)) {
                console.log(`📦 Found ${data.length} items:`);
                data.forEach(item => {
                    const name = item.name || item.title || "Unnamed";
                    const id = item.id || item.uuid || "No ID";
                    const type = item.type || "Unknown Type";
                    console.log(`   - [${name}] (ID: ${id}) Type: ${type}`);
                });
                if (data.length > 0) foundAny = true;
            } else {
                console.log("   (Response is not an array, dumping keys):", Object.keys(data));
            }

        } catch (error) {
            console.log(`❌ FAILED: ${error.message} (${error.response?.status || 'No Status'})`);
            if (error.response?.data) {
                // console.log("   Response:", JSON.stringify(error.response.data));
            }
        }
    }

    if (!foundAny) {
        console.log("\n⚠️  SCAN COMPLETE. NO ITEMS RETURNED.");
    } else {
        console.log("\n✅ SCAN COMPLETE. ASSETS LOCATED.");
    }
}

discover();
