const API_KEY = 'db0781dbc2dae636bae3bda1d6aaf436';
const COLLECTIONS = [
    '06d82dde-c9d9-48fd-878b-8b9ef3cbbeef', // Main Villains
    '10299212-0e8c-44ce-a145-c94355791705', // Villains Vault
    'c75886ca-1179-42a8-82eb-4df28317321f'  // Character Cards
];

async function updateInventory() {
    console.log("Checking the Hydeout for new activity...");

    for (let id of COLLECTIONS) {
        try {
            console.log(`Fetching metadata for Collection: ${id}...`);
            const response = await fetch(`https://api.op.xyz/v1/collections/${id}/metadata`, {
                headers: { 'Authorization': `Bearer ${API_KEY}` }
            });

            console.log(`Status: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ SUCCESS: Collection ${id}`);
                console.log(`- Minted: ${data.minted_count}`);
                console.log(`- Supply: ${data.total_supply}`);
            } else {
                console.error(`❌ FAILED: ${response.status} ${response.statusText}`);
                const text = await response.text();
                console.error(`- Body: ${text}`);
            }

        } catch (error) {
            console.error("Error accessing the Archive:", error);
        }
    }
}

updateInventory();
