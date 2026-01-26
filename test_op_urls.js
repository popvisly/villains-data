const axios = require('axios');

const API_KEY = '5b08f274cddd190816bc78643b7e12b6';
const UUID = '880c067c-fce9-4ea9-b42b-f065bd5cf6d5';

const BASES = [
    'https://api.op.xyz/v1',
    'https://api.op.xyz/api/v1',
    'https://portal.op.xyz/api/v1',
    'https://portal.op.xyz/v1',
    'https://op.xyz/api/v1'
];

async function probe() {
    for (let base of BASES) {
        try {
            console.log(`Testing Base: ${base}`);
            const url = `${base}/communities/${UUID}`;
            const res = await axios.get(url, { headers: { 'X-Api-Key': API_KEY } });
            console.log(`✅ SUCCESS: ${base}`);
        } catch (e) {
            console.log(`❌ ${base} -> ${e.response?.status || e.message}`);
        }
    }
}

probe();
