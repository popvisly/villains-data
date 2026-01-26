const axios = require('axios');

// --- CONFIGURATION ---
// UPDATED: Trying the non-hyphenated name per your finding
const COMMUNITY_SLUG = 'VillainsAtLarge';

const API_BASE_URL = 'https://api.op.xyz/v1';
const API_KEY = '6f89af7906a771246607353ac125855c'; // Your New Key
const SIMVOLY_KEY = 's1a67f70493a279edb350c78ff4baaba2';

const REQUEST_DELAY = 5000;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runSync() {
    console.log(`--- Syncing Community: ${COMMUNITY_SLUG} ---`);
    console.log(`--- Time: ${new Date().toLocaleTimeString()} ---`);

    try {
        // STEP 1: Get the Community ID
        console.log(`[1/3] Looking up '${COMMUNITY_SLUG}'...`);

        // We try to get the specific community details
        const commResponse = await axios.get(`${API_BASE_URL}/communities/${COMMUNITY_SLUG}`, {
            headers: { 'X-Api-Key': API_KEY }
        });

        const communityID = commResponse.data.id;
        console.log(`[SUCCESS] Found Community ID: ${communityID}`);

        // STEP 2: Get the Collections
        console.log(`[2/3] Fetching Collections...`);
        let itemsToSync = [];

        try {
            const collectionsResponse = await axios.get(`${API_BASE_URL}/communities/${communityID}/collections`, {
                headers: { 'X-Api-Key': API_KEY }
            });
            itemsToSync = collectionsResponse.data.items || collectionsResponse.data || [];
        } catch (e) {
            console.log("...Collection list empty, checking tokens directly...");
        }

        if (itemsToSync.length === 0) {
            const tokenResponse = await axios.get(`${API_BASE_URL}/communities/${communityID}/tokens`, {
                headers: { 'X-Api-Key': API_KEY }
            });
            itemsToSync = tokenResponse.data.items || tokenResponse.data.tokens || [];
        }

        console.log(`[3/3] Found ${itemsToSync.length} items to sync.`);

        // STEP 3: Sync to Simvoly
        for (const item of itemsToSync) {
            const name = item.name || item.token_id || "Unknown Item";

            try {
                await axios.post('https://simvoly.com/api/v1/store/products/sync', {
                    product_id: item.external_id || item.id,
                    stock_level: item.available_quantity || item.supply || 1
                }, {
                    headers: { 'X-API-KEY': SIMVOLY_KEY }
                });

                console.log(`[SYNCED] ${name}`);
                await sleep(REQUEST_DELAY);

            } catch (err) {
                if (err.response && err.response.status === 429) {
                    const wait = parseInt(err.response.headers['retry-after']) || 30;
                    console.warn(`[PAUSE] Rate Limit. Waiting ${wait}s...`);
                    await sleep(wait * 1000);
                } else {
                    console.error(`[ERROR] Failed to sync ${name}: ${err.message}`);
                }
            }
        }

    } catch (err) {
        if (err.response && err.response.status === 404) {
            console.error(`[FATAL] 404 Error: The API could not find '${COMMUNITY_SLUG}'.`);
            console.error(`Diagnostic: If 'VillainsAtLarge' failed, try 'villainsatlarge' (all lowercase).`);
        } else {
            console.error(`[FATAL] Script Crash: ${err.message}`);
        }
    }

    console.log("--- Sync Complete ---");
}

runSync();