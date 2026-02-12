// Native fetch is available in Node 18+

async function testRoleLibrary() {
    const input = {
        jobTitle: "Customer Support Representative",
        industry: "SaaS",
        skills: ["Zendesk", "Communication", "Troubleshooting", "Empathy", "Ticket Management", "Documentation"],
        yearsExperience: 3,
        audience: "professional",
        goal: "future_proof_role",
        enjoys: ["Operations/Process", "People/Management"]
    };

    try {
        console.log("Testing Role Library integration...");
        const response = await fetch('http://localhost:3000/api/assess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log("Risk Score:", result.riskScore);
        console.log("Role Adjacencies Count:", result.roleAdjacencies?.length);

        if (result.roleAdjacencies && result.roleAdjacencies.length > 0) {
            result.roleAdjacencies.forEach((adj, i) => {
                console.log(`\n[Role ${i + 1}]`);
                console.log("ID:", adj.roleId);
                console.log("Rationale:", adj.rationale);

                if (adj.detail) {
                    console.log("✅ Detail Hydrated:");
                    console.log("   Title:", adj.detail.title);
                    console.log("   Summary:", adj.detail.summary?.substring(0, 50) + "...");
                    console.log("   Tags:", adj.detail.tags?.join(", "));
                } else {
                    console.log("❌ Detail MISSING");
                }
            });
        } else {
            console.log("⚠️ No role adjacencies found.");
        }

    } catch (error) {
        console.error("Test failed:", error);
    }
}

testRoleLibrary();
