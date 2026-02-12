import fs from 'fs/promises';
import path from 'path';
import { Role } from '@/types/role';

const ROLES_DIR = path.join(process.cwd(), 'data/roles');

// Cache roles in memory to avoid reading FS on every request (Next.js server server-side)
let rolesCache: Role[] | null = null;

export async function loadAllRoles(): Promise<Role[]> {
    if (rolesCache) {
        return rolesCache;
    }

    try {
        const files = await fs.readdir(ROLES_DIR);
        const roleFiles = files.filter(f => f.endsWith('.json'));

        const roles = await Promise.all(
            roleFiles.map(async (file) => {
                const content = await fs.readFile(path.join(ROLES_DIR, file), 'utf-8');
                return JSON.parse(content) as Role;
            })
        );

        rolesCache = roles;
        return roles;
    } catch (error) {
        console.error("Failed to load roles:", error);
        return [];
    }
}

export async function getRoleById(id: string): Promise<Role | undefined> {
    const roles = await loadAllRoles();
    return roles.find(r => r.id === id);
}

import { AssessmentInput } from '@/types';

export async function findRelevantRoles(input: AssessmentInput): Promise<Role[]> {
    const roles = await loadAllRoles();

    // Normalize user inputs
    const normalizedSkills = input.skills.map(s => s.toLowerCase());
    const normalizedJob = input.jobTitle.toLowerCase();
    const normalizedInterests = (input.enjoys || []).map(i => i.toLowerCase());

    const scoredRoles = roles.map(role => {
        let score = 0;

        // 1. Skill overlap (Core skills)
        role.skills.core.forEach(skill => {
            const normSkill = skill.toLowerCase();
            if (normalizedSkills.some(us => normSkill.includes(us) || us.includes(normSkill))) {
                score += 10;
            }
        });

        // 2. Tag overlap (Tags vs Skills)
        role.tags.forEach(tag => {
            const normTag = tag.toLowerCase();
            if (normalizedSkills.some(us => us.includes(normTag))) {
                score += 5;
            }
        });

        // 3. Title/Summary overlap (Job Title vs Role Title/Summary)
        // Bonus for direct relevance or adjacency
        if (role.title.toLowerCase().includes(normalizedJob)) {
            score += 5;
        }

        // 4. "Enjoys" / Interest overlap (New in Phase 2.2)
        // Boost roles that match declared interests
        if (normalizedInterests.length > 0) {
            let interestMatch = 0;
            // Check tags
            role.tags.forEach(tag => {
                if (normalizedInterests.some(i => i.includes(tag) || tag.includes(i))) {
                    interestMatch += 1;
                }
            });
            // Check responsibilities area
            role.responsibilities.forEach(resp => {
                if (normalizedInterests.some(i => resp.area.toLowerCase().includes(i))) {
                    interestMatch += 1;
                }
            });
            score += (interestMatch * 5);
        }

        // 5. Goal / Audience Weighting (New in Phase 2.2)
        if (input.audience === 'student' || input.goal === 'choose_direction') {
            // For students/starters, favor roles with "Associate", "Analyst", "Coordinator" in title
            // OR roles that explicitly mention "entry" or "starter" in tags (if we had them)
            if (role.title.match(/Analyst|Coordinator|Specialist|Associate/i)) {
                score += 5;
            }
        }

        if (input.goal === 'future_proof_role') {
            // Favor roles with Strong "Why Future Ready" rationale length or count? 
            // For now, maybe just boost everything slightly to rely on skills more
        }

        return { role, score };
    });

    // Sort by score descending
    scoredRoles.sort((a, b) => b.score - a.score);

    // Return top 6
    return scoredRoles.slice(0, 6).map(r => r.role);
}

import { MarketSignalData } from '@/types';

export async function getMarketSignals(regionId: string = 'global'): Promise<MarketSignalData | null> {
    try {
        const filePath = path.join(process.cwd(), `data/market-signals/${regionId}.json`);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content) as MarketSignalData;
    } catch (error) {
        console.error(`Failed to load market signals for ${regionId}:`, error);
        return null;
    }
}

