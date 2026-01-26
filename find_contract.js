const axios = require('axios');

// We search for the specific slug you found on OpenSea
const OPENSEA_SLUG = 'villains-at-large-209174595';

async function findContract() {
    console.log(`--- Searching Reservoir Index for: ${OPENSEA_SLUG} ---`);

    try {
        // We ask Reservoir: "What is the contract address for this OpenSea collection?"
        const response = await axios.get(`https://api.reservoir.tools/collections/v5`, {
            params: {
                slug: OPENSEA_SLUG, // We use the OpenSea ID directly
                limit: 1
            },
            headers: { 'accept': '*/*' }
        });

        const collections = response.data.collections;

        if (collections && collections.length > 0) {
            const target = collections[0];
            console.log("\n[SUCCESS] COLLECTION IDENTIFIED!");
            console.log("---------------------------------------------------");
            console.log(`NAME:     ${target.name}`);
            console.log(`ID:       ${target.id}  <-- THIS IS THE GOLDEN TICKET`);
            console.log(`TOKEN:    ${target.tokenCount} items`);
            console.log("---------------------------------------------------");
            console.log(">> Copy the 'ID' (starts with 0x...) and I will give you the final script.");
        } else {
            console.log("\n[FAIL] Reservoir couldn't match the slug perfectly.");
            console.log("Trying a broader name search...");
            await searchByName();
        }

    } catch (err) {
        console.error(`[ERROR] Connection failed: ${err.message}`);
    }
}

async function searchByName() {
    try {
        const response = await axios.get(`https://api.reservoir.tools/collections/v5`, {
            params: { name: "Villains at Large", limit: 5 }
        });

        console.log("\n[RESULTS] Found these similar collections:");
        response.data.collections.forEach(c => {
            console.log(`- Name: ${c.name} | ID: ${c.id} | Items: ${c.tokenCount}`);
        });
    } catch (e) {
        console.log("Name search failed.");
    }
}

findContract();