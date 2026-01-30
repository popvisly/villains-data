// VILLAINS SOCIAL BOT (BIRD EDITION)
// Monitors inventory data and posts updates to X (Twitter) using 'bird' CLI

const { exec } = require('child_process');
const fs = require('fs');

// --- CONFIG ---
const DATA_FILE = '/Volumes/850EVO/VILLAINS AT LARGE/wave2_data.json';
const STATE_FILE = '/Volumes/850EVO/VILLAINS AT LARGE/social_state.json';

// --- UTILS ---
function loadJSON(path) {
    if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
    return null;
}

function saveJSON(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function sendTweet(text) {
    return new Promise((resolve, reject) => {
        // Escape quotes for shell safety
        const safeText = text.replace(/"/g, '\\"');
        const command = `bird tweet "${safeText}"`;
        
        console.log(`   🐦 EXEC: ${command}`);
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`   ❌ BIRD ERROR: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) console.error(`   ⚠️ BIRD STDERR: ${stderr}`);
            console.log(`   ✅ TWEET SENT: ${stdout.trim()}`);
            resolve(stdout);
        });
    });
}

// --- MAIN LOGIC ---
async function runSocialCheck() {
    console.log(`[${new Date().toISOString()}] 🤖 SOCIAL BOT: Scanning frequencies...`);

    const inventory = loadJSON(DATA_FILE);
    if (!inventory) {
        console.error("   ❌ ERROR: Could not read inventory data.");
        return;
    }

    let state = loadJSON(STATE_FILE) || { tweeted: [] };
    let newTweets = 0;

    for (const item of inventory) {
        // ID string to track unique events
        const eventID = `${item['Item Name']}_${item.Status}`;

        // RULE 1: ITEM GOES EXTINCT/ARCHIVED
        if ((item.Status === "EXTINCT" || item.Status === "ARCHIVED") && !state.tweeted.includes(eventID)) {
            
            const tweetText = `🚨 STATUS UPDATE: ARCHIVED\n\n` +
                `${item['Item Name']} has entered the Vault.\n` +
                `Supply Locked: ${item.minted} Units confirmed.\n\n` +
                `Check the live feed:\nhttps://villainsatlarge.com\n\n` +
                `#VillainsAtLarge #ApeChain #NFT`;

            try {
                console.log(`   🚀 QUEUING: ${item['Item Name']} is EXTINCT...`);
                await sendTweet(tweetText);
                state.tweeted.push(eventID);
                newTweets++;
                // Wait 10s between tweets to avoid spam limits
                await new Promise(r => setTimeout(r, 10000));
            } catch (e) {
                console.error("   ❌ TWEET FAILED");
            }
        }
    }

    if (newTweets > 0) {
        saveJSON(STATE_FILE, state);
        console.log(`   ✅ BATCH COMPLETE: ${newTweets} UPDATES.`);
    } else {
        console.log("   💤 No new events to report.");
    }
}

// Run immediately
runSocialCheck();
