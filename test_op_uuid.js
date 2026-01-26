const axios = require('axios');

const API_KEY = 'db0781dbc2dae636bae3bda1d6aaf436';
const COMMUNITY_UUID = '880c067c-fce9-4ea9-b42b-f065bd5cf6d5';
const BASE_URL = 'https://api.op.xyz/v1';

async function probe() {
    console.log(`🔎 Probing API with UUID: ${COMMUNITY_UUID}`);

    const endpoints = [
        { url: `${BASE_URL}/communities/${COMMUNITY_UUID}`, headers: { 'X-Api-Key': API_KEY } },
        { url: `${BASE_URL}/communities/${COMMUNITY_UUID}/badges`, headers: { 'X-Api-Key': API_KEY } },
        { url: `${BASE_URL}/badges`, headers: { 'X-Api-Key': API_KEY, 'x-community-id': COMMUNITY_UUID } },
        // Try Bearer token too
        { url: `${BASE_URL}/communities/${COMMUNITY_UUID}`, headers: { 'Authorization': `Bearer ${API_KEY}` } },
    ];

    for (let test of endpoints) {
        try {
            console.log(`\n👉 Testing: ${test.url}`);
            // console.log(`   Headers: ${JSON.stringify(test.headers)}`);
            const res = await axios.get(test.url, { headers: test.headers });
            console.log(`✅ SUCCESS (${res.status})`);
            
            // If badges, list them
            if (test.url.includes('badges')) {
                const data = res.data.badges || res.data.data || res.data;
                console.log(`   Items found: ${Array.isArray(data) ? data.length : '?'}`);
                if (Array.isArray(data)) {
                    data.forEach(b => console.log(`   - ${b.name}: ${b.mintedCount || b.supply}`));
                }
            } else {
                console.log(`   Keys: ${Object.keys(res.data).join(', ')}`);
            }
        } catch (e) {
            console.log(`❌ FAILED: ${e.message} (${e.response?.status})`);
        }
    }
}

probe();
