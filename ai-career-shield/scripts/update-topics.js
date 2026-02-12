const fs = require('fs');
const path = require('path');

const rolesDir = '/Volumes/850EVO/VILLAINS AT LARGE/ai-career-shield/data/roles';

const mappings = {
    'ai-production-strategist.json': ['ai-work', 'creative-production', 'skills-learning', 'leadership-collaboration'],
    'automation-analyst.json': ['ai-work', 'automation-ops', 'skills-learning'],
    'agent-orchestrator.json': ['ai-work', 'automation-ops', 'governance-safety', 'skills-learning'],
    'ai-governance-coordinator.json': ['ai-work', 'governance-safety', 'leadership-collaboration'],
    'prompt-systems-librarian.json': ['ai-work', 'skills-learning', 'automation-ops', 'leadership-collaboration'],
    'ai-enablement-specialist.json': ['ai-work', 'skills-learning', 'leadership-collaboration', 'governance-safety'],
    'data-steward.json': ['ai-work', 'governance-safety', 'skills-learning', 'automation-ops'],
    'customer-ops-lead.json': ['ai-work', 'automation-ops', 'skills-learning', 'leadership-collaboration']
};

Object.entries(mappings).forEach(([file, topics]) => {
    const filePath = path.join(rolesDir, file);
    if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        content.topics = topics;
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        console.log(`Updated ${file} with topics: ${topics.join(', ')}`);
    } else {
        console.warn(`File not found: ${filePath}`);
    }
});
