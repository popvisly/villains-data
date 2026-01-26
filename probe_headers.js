const axios = require('axios');

const BASE_URL = 'https://api.op.xyz/v1';
const API_KEY = '5b08f274cddd190816bc78643b7e12b6';
const UUID = '880c067c-fce9-4ea9-b42b-f065bd5cf6d5';

async function probe() {
    console.log("🕵️‍♀️ Probing Headers on api.op.xyz...");
    
    const configs = [
        { ep: '/communities', headers: { 'X-Api-Key': API_KEY } },
        { ep: '/communities', headers: { 'Authorization': API_KEY } },
        { ep: '/communities', headers: { 'Authorization': `Bearer ${API_KEY}` } },
        { ep: `/communities/${UUID}`, headers: { 'X-Api-Key': API_KEY } },
        
        // Try accessing badges without community header (maybe key implies it?)
        { ep: '/badges', headers: { 'X-Api-Key': API_KEY } },
        
        // Try different casing
        { ep: '/badges', headers: { 'x-api-key': API_KEY, 'x-community-id': UUID } },
        { ep: '/badges', headers: { 'X-API-KEY': API_KEY, 'X-COMMUNITY-ID': UUID } },
    ];

    for (let c of configs) {
        try {
            console.log(`\nTesting ${c.ep} with headers:`, Object.keys(c.headers));
            const res = await axios.get(BASE_URL + c.ep, { headers: c.headers });
            console.log(`✅ SUCCESS (${res.status})`);
            console.log("Keys:", Object.keys(res.data));
        } catch (e) {
            console.log(`❌ ${e.response?.status || e.message}`);
            if (e.response?.status === 401 || e.response?.status === 403) {
                 // console.log("   (Auth Error)");
            }
        }
    }
}

probe();
