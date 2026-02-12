#!/usr/bin/env node
/**
 * Test script to run all benchmark personas through the assessment
 * Usage: node scripts/test-personas.js
 */

const fs = require('fs');
const path = require('path');

// Load personas
const personasPath = path.join(__dirname, '../state_bench_personas.json');
const personas = JSON.parse(fs.readFileSync(personasPath, 'utf8'));

// Auto-detect port
let API_URL = null;

async function detectPort() {
    const ports = [3001, 3000];
    for (const port of ports) {
        try {
            const url = `http://localhost:${port}/api/assess`;

            // Prefer GET for detection (Next will 405 on GET if route exists and only POST is implemented).
            const res = await fetch(url);
            if ([200, 400, 405].includes(res.status)) {
                API_URL = url;
                console.log(`✓ Detected dev server on port ${port} (status ${res.status})\n`);
                return;
            }
        } catch (e) {
            // Port not responding, try next
        }
    }
    throw new Error('Dev server not found on port 3000 or 3001. Run: npm run dev');
}

console.log(`\n🧪 Testing ${personas.length} benchmark personas...\n`);

async function testPersona(persona) {
    const maxRetries = 3;
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(persona.input),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();

            // Sanity checks
            const passed = [];
            const failed = [];

            if (persona.sanity.expectedRange) {
                const [min, max] = persona.sanity.expectedRange;
                if (result.riskScore >= min && result.riskScore <= max) {
                    passed.push(`Risk score ${result.riskScore}% in range [${min}-${max}]`);
                } else {
                    failed.push(`Risk score ${result.riskScore}% outside range [${min}-${max}]`);
                }
            }

            if (persona.sanity.mustMention) {
                const fullText = JSON.stringify(result).toLowerCase();
                persona.sanity.mustMention.forEach(term => {
                    if (fullText.includes(term.toLowerCase())) {
                        passed.push(`Mentions "${term}"`);
                    } else {
                        failed.push(`Missing "${term}"`);
                    }
                });
            }

            // --- Structural Quality Assertions ---

            // 1. confidence is present
            if (result.confidence) {
                passed.push(`Structure: Confidence present (${result.confidence})`);
            } else {
                failed.push(`Structure: Missing confidence`);
            }

            // 2. factors.length is between 5 and 10
            if (result.factors && result.factors.length >= 5 && result.factors.length <= 10) {
                passed.push(`Structure: Factor count ${result.factors.length} in [5-10]`);
            } else {
                failed.push(`Structure: Factor count ${result.factors?.length ?? 0} outside [5-10]`);
            }

            // 3. every factor has evidence + mitigation[] (non-empty)
            if (result.factors) {
                result.factors.forEach((f, idx) => {
                    if (!f.evidence) failed.push(`Structure: Factor[${idx}] missing evidence`);
                    if (!f.mitigation || !Array.isArray(f.mitigation) || f.mitigation.length === 0) {
                        failed.push(`Structure: Factor[${idx}] missing/empty mitigation array`);
                    }
                });
            }

            // 4. roleAdjacencies.length >= 2
            if (result.roleAdjacencies && result.roleAdjacencies.length >= 2) {
                passed.push(`Structure: Role adjacencies count ${result.roleAdjacencies.length} >= 2`);
            } else {
                failed.push(`Structure: Role adjacencies count ${result.roleAdjacencies?.length ?? 0} < 2`);
            }

            // 5. plan30_60_90 contains all three windows and each has 3+ tasks
            const windows = ["30_days", "60_days", "90_days"];
            if (result.plan30_60_90) {
                windows.forEach(win => {
                    const p = result.plan30_60_90.find(item => item.window === win);
                    if (!p) {
                        failed.push(`Structure: Missing plan window "${win}"`);
                    } else if (!p.tasks || p.tasks.length < 3) {
                        failed.push(`Structure: Plan window "${win}" has < 3 tasks`);
                    } else {
                        passed.push(`Structure: Plan window "${win}" OK`);
                    }
                });
            } else {
                failed.push(`Structure: Missing plan30_60_90`);
            }

            return {
                persona: persona.label,
                result,
                passed,
                failed,
                success: failed.length === 0,
            };
        } catch (error) {
            lastError = error;
            // Only retry if meaningful error (e.g. network)
            console.log(`   ⚠️ Attempt ${attempt}/${maxRetries} failed: ${error.message}`);
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 2000 * attempt)); // Backoff
            }
        }
    }

    return {
        persona: persona.label,
        error: lastError ? lastError.message : 'Unknown error',
        success: false,
    };
}

async function runTests() {
    // Detect port first
    await detectPort();

    const results = [];

    for (const persona of personas) {
        process.stdout.write(`Testing: ${persona.label}... `);
        const result = await testPersona(persona);
        results.push(result);

        // Add delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (result.error) {
            console.log(`❌ ERROR: ${result.error}`);
        } else if (result.success) {
            console.log(`✅ PASS`);
        } else {
            console.log(`⚠️  FAIL (${result.failed.length} issues)`);
            result.failed.forEach(f => console.log(`   ❌ ${f}`));
        }
    }

    // Summary
    console.log(`\n${'='.repeat(60)}`);
    console.log('SUMMARY');
    console.log('='.repeat(60));

    const passed = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`✅ Passed: ${passed}/${results.length}`);
    console.log(`❌ Failed: ${failed}/${results.length}`);

    // Show failures
    if (failed > 0) {
        console.log(`\n${'='.repeat(60)}`);
        console.log('FAILURES');
        console.log('='.repeat(60));

        results.filter(r => !r.success).forEach(r => {
            console.log(`\n${r.persona}:`);
            if (r.error) {
                console.log(`  ERROR: ${r.error}`);
            } else {
                r.failed.forEach(f => console.log(`  ❌ ${f}`));
            }
        });
    }

    // Save detailed results
    const outputPath = path.join(__dirname, '../test-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\n📊 Detailed results saved to: ${outputPath}`);
}

runTests().catch(console.error);
