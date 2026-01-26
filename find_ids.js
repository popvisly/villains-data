const axios = require('axios');

// Confirmed Base URL from your docs
const API_BASE_URL = 'https://api.op.xyz/v1';
const API_KEY = '96a24c2ea87dcb01b1e217a16e88776f';

async function findMyCollections() {
    console.log("--- Pinging OpenPage to find your Collection IDs ---");

    try {
        // Try the 'Communities' endpoint first (per your docs)
        console.log("Attempting to fetch Communities list...");
        const response = await axios.get(`${API_BASE_URL}/communities`, {
            headers: { 'X-Api-Key': API_KEY }
        });

        const data = response.data.items || response.data;

        console.log("\n[SUCCESS] FOUND THE FOLLOWING:");
        console.log("---------------------------------------------------");
        if (Array.isArray(data)) {
            data.forEach(item => {
                console.log(`NAME: "${item.name}"`);
                console.log(`ID:   ${item.id}  <-- WE NEED THIS`);
                console.log(`SLUG: ${item.slug}`);
                console.log("---------------------------------------------------");
            });
        } else {
            console.log("Raw Data:", JSON.stringify(data, null, 2));
        }

    } catch (err) {
        console.error("\n[FAIL] Could not list communities.");
        if (err.response) {
            console.error(`Status: ${err.response.status}`);
            console.error(`Message: ${err.response.statusText}`);
        } else {
            console.error(err.message);
        }
    }
}

findMyCollections();