#!/usr/bin/env node

/**
 * Test Result Analyzer
 * 
 * Analyzes test-results.json and provides actionable insights for prompt refinement.
 * Run after: node scripts/test-personas.js
 */

const fs = require('fs');
const path = require('path');

const RESULTS_FILE = path.join(__dirname, '..', 'test-results.json');

function analyzeResults() {
    if (!fs.existsSync(RESULTS_FILE)) {
        console.error('❌ No test results found. Run: node scripts/test-personas.js');
        process.exit(1);
    }

    const results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf-8'));

    console.log('\n📊 TEST RESULTS ANALYSIS\n');
    console.log('='.repeat(60));

    // Summary stats
    const total = results.length;
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;
    const passRate = ((passed / total) * 100).toFixed(1);

    console.log(`\n✅ Passed: ${passed}/${total} (${passRate}%)`);
    console.log(`❌ Failed: ${failed}/${total}`);

    // Definition of Done check
    const DOD_THRESHOLD = 16;
    const meetsDoD = passed >= DOD_THRESHOLD;
    console.log(`\n🎯 Definition of Done: ${meetsDoD ? '✅ MET' : '❌ NOT MET'} (need ${DOD_THRESHOLD}/20)`);

    // Risk range analysis
    console.log('\n📈 RISK RANGE ANALYSIS');
    console.log('-'.repeat(60));

    const highRisk = results.filter(r => r.persona.expectedRange === 'high');
    const mediumRisk = results.filter(r => r.persona.expectedRange === 'medium');
    const lowRisk = results.filter(r => r.persona.expectedRange === 'low');
    const students = results.filter(r => r.persona.expectedRange === 'student');

    console.log(`High Risk:   ${highRisk.filter(r => r.passed).length}/${highRisk.length} passed`);
    console.log(`Medium Risk: ${mediumRisk.filter(r => r.passed).length}/${mediumRisk.length} passed`);
    console.log(`Low Risk:    ${lowRisk.filter(r => r.passed).length}/${lowRisk.length} passed`);
    console.log(`Students:    ${students.filter(r => r.passed).length}/${students.length} passed`);

    // Common failure patterns
    console.log('\n🔍 FAILURE PATTERNS');
    console.log('-'.repeat(60));

    const failureReasons = {};
    results.filter(r => !r.passed).forEach(result => {
        result.failures.forEach(failure => {
            const key = failure.split(':')[0];
            failureReasons[key] = (failureReasons[key] || 0) + 1;
        });
    });

    if (Object.keys(failureReasons).length > 0) {
        Object.entries(failureReasons)
            .sort((a, b) => b[1] - a[1])
            .forEach(([reason, count]) => {
                console.log(`  ${reason}: ${count} failures`);
            });
    } else {
        console.log('  No failures! 🎉');
    }

    // Detailed failures
    const failedResults = results.filter(r => !r.passed);
    if (failedResults.length > 0) {
        console.log('\n❌ FAILED PERSONAS (detailed)');
        console.log('-'.repeat(60));

        failedResults.forEach(result => {
            console.log(`\n${result.persona.name} (${result.persona.expectedRange})`);
            console.log(`  Score: ${result.result.riskScore}/100`);
            result.failures.forEach(f => console.log(`  ❌ ${f}`));
        });
    }

    // Evidence quality check
    console.log('\n🔬 EVIDENCE QUALITY CHECK');
    console.log('-'.repeat(60));

    let emptyEvidence = 0;
    let emptyMitigation = 0;
    let genericMitigation = 0;

    results.forEach(result => {
        if (result.result?.factors) {
            result.result.factors.forEach(factor => {
                if (!factor.evidence || factor.evidence.trim().length < 20) {
                    emptyEvidence++;
                }
                if (!factor.mitigation || factor.mitigation.trim().length < 20) {
                    emptyMitigation++;
                }
                if (factor.mitigation?.toLowerCase().includes('learn more') ||
                    factor.mitigation?.toLowerCase().includes('stay updated')) {
                    genericMitigation++;
                }
            });
        }
    });

    console.log(`Empty/short evidence: ${emptyEvidence}`);
    console.log(`Empty/short mitigation: ${emptyMitigation}`);
    console.log(`Generic mitigation ("learn more"): ${genericMitigation}`);

    // Recommendations
    console.log('\n💡 RECOMMENDATIONS');
    console.log('-'.repeat(60));

    if (!meetsDoD) {
        console.log('\n⚠️  Does not meet Definition of Done threshold');
        console.log('   → Review failed personas and refine prompt');
    }

    if (emptyEvidence > 0) {
        console.log('\n⚠️  Some factors have empty/short evidence');
        console.log('   → Add stronger evidence constraints to prompt');
    }

    if (emptyMitigation > 0) {
        console.log('\n⚠️  Some factors have empty/short mitigation');
        console.log('   → Add mitigation formatting rules to prompt');
    }

    if (genericMitigation > 0) {
        console.log('\n⚠️  Generic mitigations detected ("learn more")');
        console.log('   → Add concrete task examples to prompt');
    }

    const highRiskFails = highRisk.filter(r => !r.passed).length;
    if (highRiskFails > 2) {
        console.log('\n⚠️  High-risk personas failing');
        console.log('   → Check if scores are too low (should be 65-85)');
    }

    const lowRiskFails = lowRisk.filter(r => !r.passed).length;
    if (lowRiskFails > 2) {
        console.log('\n⚠️  Low-risk personas failing');
        console.log('   → Check if scores are too high (should be 15-35)');
    }

    if (meetsDoD && emptyEvidence === 0 && emptyMitigation === 0 && genericMitigation === 0) {
        console.log('\n✅ All quality checks passed!');
        console.log('   → Ready to proceed to Phase 2');
    }

    console.log('\n' + '='.repeat(60) + '\n');
}

analyzeResults();
