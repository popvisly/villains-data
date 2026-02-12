
const fs = require('fs');
// Native fetch in Node 18+

async function runDate() {
    console.log(`\n🔍 Manual Spot Check: 6 Specific Profiles\n`);

    const profiles = [
        {
            id: "high_risk_admin",
            input: {
                jobTitle: "Administrative Assistant",
                industry: "Corporate",
                skills: ["Data Entry", "Scheduling", "Email Management", "Microsoft Office", "Typing"],
                yearsExperience: 10,
                audience: "professional",
                goal: "future_proof_role",
                enjoys: ["Operations/Process", "People/Management"]
            }
        },
        {
            id: "creative_designer",
            input: {
                jobTitle: "Graphic Designer",
                industry: "Creative",
                skills: ["Photoshop", "Illustrator", "Branding", "Layout", "Typography"],
                yearsExperience: 5,
                audience: "professional",
                goal: "future_proof_role",
                enjoys: ["Visual Design", "Strategy"]
            }
        },
        {
            id: "trades_electrician",
            input: {
                jobTitle: "Electrician",
                industry: "Construction",
                skills: ["Wiring", "Blueprint Reading", "Safety Code", "Troubleshooting", "Manual Labor"],
                yearsExperience: 8,
                audience: "professional",
                goal: "future_proof_role",
                enjoys: ["Building", "Problem Solving"]
            }
        },
        {
            id: "student_undecided",
            input: {
                jobTitle: "Student",
                industry: "Education",
                skills: ["Research", "Writing", "Social Media", "Teamwork"],
                yearsExperience: 0,
                audience: "student",
                goal: "choose_direction",
                enjoys: ["People/Management", "Writing"]
            }
        },
        {
            id: "student_cs",
            input: {
                jobTitle: "CS Student",
                industry: "Technology",
                skills: ["Python", "Java", "Algorithms", "Git", "Math"],
                yearsExperience: 0,
                audience: "student",
                goal: "choose_direction",
                enjoys: ["Coding/Building", "Data Analysis"]
            }
        },
        {
            id: "mid_career_accountant",
            input: {
                jobTitle: "Senior Accountant",
                industry: "Finance",
                skills: ["Financial Reporting", "Excel", "Tax Compliance", "Auditing", "QuickBooks"],
                yearsExperience: 12,
                audience: "professional",
                goal: "plan_pivot",
                enjoys: ["Data Analysis", "Strategy"]
            }
        }
    ];

    for (const profile of profiles) {
        console.log(`\n---------------------------------------------------------`);
        console.log(`👤 Testing: ${profile.id} (${profile.input.jobTitle})`);

        try {
            const res = await fetch('http://localhost:3000/api/assess', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile.input)
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const result = await res.json();
            console.log(`   Risk Score: ${result.riskScore}`);

            if (result.roleAdjacencies && result.roleAdjacencies.length > 0) {
                console.log(`   Recommended Roles:`);
                result.roleAdjacencies.forEach(adj => {
                    const title = adj.detail ? adj.detail.title : adj.roleId;
                    console.log(`   👉 ${title} (ID: ${adj.roleId})`);
                    console.log(`      Rationale: ${adj.rationale}`);
                    console.log(`      Hydrated: ${!!adj.detail}`);
                });
            } else {
                console.log(`   ⚠️ No role adjacencies found.`);
            }

        } catch (err) {
            console.error(`   ❌ Failed: ${err.message}`);
        }
    }
}

runDate();
