const fs = require('fs');
const DATA_FILE = '/Volumes/850EVO/VILLAINS AT LARGE/wave2_data.json';

try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    let data = JSON.parse(raw);
    
    // Filter out GRIM
    const initialLen = data.length;
    data = data.filter(item => item['Item Name'] !== 'GRIM (HYDEOUT)');
    
    if (data.length < initialLen) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        console.log(`✅ Removed GRIM (HYDEOUT) from database.`);
    } else {
        console.log(`⚠️ GRIM (HYDEOUT) not found in database.`);
    }
} catch (e) {
    console.error(`❌ Error: ${e.message}`);
}
