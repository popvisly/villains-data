const axios = require('axios');

const API_KEY = '5b08f274cddd190816bc78643b7e12b6';
const COMMUNITY_SLUG = 'villains-at-large';
const COMMUNITY_UUID = '880c067c-fce9-4ea9-b42b-f065bd5cf6d5';
const BASE_URL = 'https://api.op.xyz/v1';

async function testNewKey() {
    console.log(`🔑 Testing NEW API Key: ${API_KEY.substring(0, 4)}...`);

    const tests = [
        // 1. Bearer Token (Badge Endpoint)
        { 
            name: 'Bearer Token (Badges)',
            url: 'https://api.op.xyz/v1/badges', 
            headers: { 'Authorization': `Bearer ${API_KEY}`, 'x-community-id': COMMUNITY_SLUG } 
        },
        // 2. Bearer Token (Community Endpoint)
        { 
            name: 'Bearer Token (Community)',
            url: `https://api.op.xyz/v1/communities/${COMMUNITY_SLUG}`, 
            headers: { 'Authorization': `Bearer ${API_KEY}` } 
        }
    ];

    for (const test of tests) {
        try {
            console.log(`\n👉 ${test.name}`);
            const res = await axios.get(test.url, { headers: test.headers });
            console.log(`✅ SUCCESS (${res.status})`);
            
            if (test.url.includes('badges')) {
                const data = res.data.badges || res.data.data || res.data;
                const count = Array.isArray(data) ? data.length : 'Unknown';
                console.log(`   Badge Count: ${count}`);
                if (Array.isArray(data) && data.length > 0) {
                     // Check for Overlord
                     const overlord = data.find(b => (b.name || '').includes('Overlord'));
                     if (overlord) {
                         console.log(`   🎯 FOUND OVERLORD: ${overlord.name} - Minted: ${overlord.minted || overlord.mintedCount}`);
                     } else {
                         console.log(`   ⚠️ Overlord not found in list. Top item: ${data[0].name}`);
                     }
                }
            } else {
                 console.log(`   Community Name: ${res.data.name}`);
            }
        } catch (e) {
            console.log(`❌ FAILED: ${e.message} (Status: ${e.response?.status})`);
            if (e.response?.status === 401) console.log("   -> Unauthorized (Key rejected)");
            if (e.response?.status === 404) console.log("   -> Not Found (Wrong ID/URL)");
        }
    }
}

testNewKey();
