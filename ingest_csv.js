const fs = require('fs');
const csv = require('fs').readFileSync('/Volumes/850EVO/VILLAINS AT LARGE/Villains at Large — Deployment Tracker - WAVES.csv', 'utf8');
const jsonPath = '/Volumes/850EVO/VILLAINS AT LARGE/wave2_data.json';

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const items = [];
    let currentWave = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple CSV split (handling quoted strings with commas is harder, but let's try a regex or simple split first)
        // The CSV seems to have standard commas. 
        // Name is col 1 (index 1), Category col 2, Status col 3, Rarity col 6, Max Supply col 8
        
        // Handling quotes:
        const parts = [];
        let inQuote = false;
        let currentPart = '';
        for (let char of line) {
            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                parts.push(currentPart.trim());
                currentPart = '';
            } else {
                currentPart += char;
            }
        }
        parts.push(currentPart.trim());

        // Check for Wave Headers in first column
        if (parts[0] && parts[0].toLowerCase().includes('wave')) {
            currentWave = parts[0];
            continue;
        }

        const name = parts[1];
        if (!name || name === 'Name') continue; // Header or empty

        // Extract Max Supply (Column 8: "Final Minted / Max Supply" or just "Max Supply")
        let maxSupplyRaw = parts[8]; 
        let maxSupply = 0;
        let minted = 0;

        if (maxSupplyRaw) {
            if (maxSupplyRaw.includes('/')) {
                const [m, s] = maxSupplyRaw.split('/');
                minted = parseInt(m) || 0;
                maxSupply = parseInt(s) || 0;
            } else {
                maxSupply = parseInt(maxSupplyRaw) || 0;
            }
        }

        // Clean Name (remove " (Pup)" if it helps matching, or keep it. 
        // The JSON uses "(Pup)" for pets. The CSV has "Cyclor Pup" but "Stunlarrk".
        // Let's normalize later or mapping. For now, keep raw CSV name but try to match existing JSON conventions.
        
        let finalName = name;
        const category = parts[2];
        
        // Auto-append (Pup) if category is Exotic Pet and not present?
        if (category === 'Exotic Pet' && !finalName.includes('Pup') && !finalName.includes('Juvenile') && !finalName.includes('Adult')) {
             finalName += " (Pup)";
        }

        items.push({
            "Item Name": finalName,
            "Category": category,
            "Status": parts[3] || "Planned",
            "Rarity": parts[6] || "Common",
            "Max Supply": maxSupply,
            "minted": minted, // CSV might have manual counts (e.g. 10/25)
            "_wave": currentWave
        });
    }
    return items;
}

function updateJSON() {
    console.log("📂 Ingesting Deployment Tracker...");
    let existingData = [];
    try {
        existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (e) {
        console.log("   ⚠️ No existing JSON found, creating new.");
    }

    const newItems = parseCSV(csv);
    console.log(`   📊 Found ${newItems.length} items in CSV.`);

    let updatedCount = 0;
    let addedCount = 0;

    newItems.forEach(newItem => {
        // Try to find matching item in existing Data
        // Match logic: Exact Name OR Name without (Pup)
        let match = existingData.find(e => e['Item Name'] === newItem['Item Name']);
        
        // Special mapping for CSV "Stunlarrk" -> JSON "Stunlarrk (Pup)"
        if (!match && newItem['Item Name'] === 'Stunlarrk (Pup)') {
             // actually the logic above added (Pup) already
        }

        if (match) {
            // Update fields
            match['Status'] = newItem['Status'];
            match['Max Supply'] = newItem['Max Supply'];
            match['Rarity'] = newItem['Rarity'];
            
            // Only update minted if CSV has a specific "X/Y" value that looks real (non-zero) AND we trust CSV over scraper?
            // User said "I update it manually". So CSV might have good data.
            // BUT our scraper is live. Scraper > CSV for "minted".
            // However, for "Stunlarrk", CSV says "4/50". Scraper saw 4.
            // Let's trust Scraper for 'minted' usually, but if Scraper is 0 and CSV > 0, maybe use CSV?
            // Actually, let's just update Status/Max/Rarity/Category.
            
            if (newItem.minted > 0 && (!match.minted || match.minted === 0)) {
                match.minted = newItem.minted;
            }
            
            updatedCount++;
        } else {
            // Add new
            // Filter out "Archived" Wave 1 items if we only want Wave 2?
            // User said "Villains at Large _ Deployment Tracker.pdf" -> "Deployment Tracker - WAVES.csv"
            // The JSON is named "wave2_data.json".
            // Maybe we should only import Wave 2 items?
            // CSV has "Wave 2 - Planned".
            
            if (newItem._wave && newItem._wave.includes('Wave 2')) {
                // Ensure minted is preserved if new
                existingData.push({
                    "Item Name": newItem['Item Name'],
                    "Category": newItem['Category'],
                    "Status": newItem['Status'],
                    "Rarity": newItem['Rarity'],
                    "Max Supply": newItem['Max Supply'],
                    "minted": newItem.minted || 0
                });
                addedCount++;
                console.log(`   ➕ Added: ${newItem['Item Name']}`);
            } else if (newItem['Item Name'] === 'LAVABACK' || newItem['Item Name'] === 'Kikalin Meerat') {
                 // Add Titans/Extras regardless of wave if they look important
                 existingData.push({
                    "Item Name": newItem['Item Name'],
                    "Category": newItem['Category'],
                    "Status": newItem['Status'],
                    "Rarity": newItem['Rarity'],
                    "Max Supply": newItem['Max Supply'],
                    "minted": newItem.minted || 0
                });
                addedCount++;
                console.log(`   ➕ Added (Extra): ${newItem['Item Name']}`);
            }
        }
    });

    fs.writeFileSync(jsonPath, JSON.stringify(existingData, null, 2));
    console.log(`✅ Update Complete. Updated: ${updatedCount}, Added: ${addedCount}`);
}

updateJSON();
