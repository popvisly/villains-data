/**
 * QA Simulation: Mission Control & Artifact Verification
 * 
 * Verifies that the Resilience Index logic and artifact generation 
 * follow the defined 'Decision-First' vision.
 */

import { assessResilience } from '../skills/resilience-index/scripts/triage';
import { generateProofCredential } from '../lib/verifiable-proof';

async function runSimulation() {
    console.log('--- Starting Mission Control QA Simulation ---');

    // Test Case 1: High-Stakes Strategic Task
    const strategicTask = "Negotiating Q3 budget allocation between technical debt reduction and regulatory compliance during a board review.";
    const strategicResult = assessResilience(strategicTask);

    console.log(`[TEST 1] Strategic Task: ${strategicResult.category}`);
    console.log(`[TEST 1] Resilience Score: ${strategicResult.resilienceScore}`);
    if (strategicResult.category !== 'STRATEGIC') {
        throw new Error('Test 1 Failed: Task should be classified as STRATEGIC');
    }

    // Test Case 2: Routine Automated Task
    const routineTask = "Entering line items from invoices into the standardized accounting template.";
    const routineResult = assessResilience(routineTask);

    console.log(`[TEST 2] Routine Task: ${routineResult.category}`);
    console.log(`[TEST 2] Resilience Score: ${routineResult.resilienceScore}`);
    if (routineResult.category !== 'ROUTINE') {
        throw new Error('Test 2 Failed: Task should be classified as ROUTINE');
    }

    // Test Case 3: Artifact Generation
    const proof = generateProofCredential('USER_001', 'Judgment', 'Budget Pivot Approved', {
        constraints: 'Regulatory deadline vs Debt',
        logic: 'Risk mitigation over feature speed'
    });

    console.log(`[TEST 3] Proof Artifact Generated: ${proof.proof.jws.startsWith('eyJ')}`);
    if (!proof.proof.jws.includes('mock_signature_captori')) {
        throw new Error('Test 3 Failed: Proof signature missing Captori identifier');
    }

    console.log('--- QA Simulation Completed Successfully ---');
}

runSimulation().catch(err => {
    console.error(err);
    process.exit(1);
});
