const axios = require('axios');

const BASE_URL = 'https://portal.op.xyz/api/v1';
const API_KEY = '5b08f274cddd190816bc78643b7e12b6';
const COMMUNITY_UUID = '880c067c-fce9-4ea9-b42b-f065bd5cf6d5';

async function inspect() {
    try {
        console.log("Fetching...");
        const res = await axios.get(`${BASE_URL}/badges`, { 
            headers: { 'X-Api-Key': API_KEY, 'x-community-id': COMMUNITY_UUID } 
        });
        
        console.log(`Status: ${res.status}`);
        console.log(`Content-Type: ${res.headers['content-type']}`);
        
        const data = res.data;
        console.log(`Type of data: ${typeof data}`);
        
        if (typeof data === 'string') {
            console.log("Preview:", data.substring(0, 500));
        } else {
            console.log("Keys:", Object.keys(data).slice(0, 10));
        }
        
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}

inspect();
