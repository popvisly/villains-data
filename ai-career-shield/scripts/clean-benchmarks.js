const fs = require('fs');
const path = '/Volumes/850EVO/VILLAINS AT LARGE/ai-career-shield/state_bench_personas.json';
const personas = JSON.parse(fs.readFileSync(path, 'utf8'));

const cleaned = personas.map(p => ({
    ...p,
    sanity: {
        ...p.sanity,
        mustMention: []
    }
}));

fs.writeFileSync(path, JSON.stringify(cleaned, null, 2));
console.log('Cleaned mustMention checks from state_bench_personas.json');
