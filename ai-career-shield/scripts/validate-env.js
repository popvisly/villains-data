#!/usr/bin/env node

/**
 * Environment Validator
 * 
 * Checks that all required environment variables and dependencies are set up correctly.
 * Run before testing to catch configuration issues early.
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 AI Career Shield - Environment Validator\n');
console.log('='.repeat(60));

let hasErrors = false;
let hasWarnings = false;

// Check .env.local exists
console.log('\n📄 Checking environment file...');
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local not found');
    console.log('   Create it with: cp .env.example .env.local');
    hasErrors = true;
} else {
    console.log('✅ .env.local exists');

    // Read and check required variables
    const envContent = fs.readFileSync(envPath, 'utf-8');

    console.log('\n🔑 Checking required environment variables...');

    // OpenAI (required for Phase 1)
    if (envContent.includes('OPENAI_API_KEY=sk-')) {
        console.log('✅ OPENAI_API_KEY is set');
    } else {
        console.log('❌ OPENAI_API_KEY is missing or invalid');
        console.log('   Get your key from: https://platform.openai.com/api-keys');
        hasErrors = true;
    }

    // Supabase (Phase 2)
    if (envContent.includes('NEXT_PUBLIC_SUPABASE_URL=')) {
        console.log('⚠️  NEXT_PUBLIC_SUPABASE_URL is set (Phase 2 feature)');
        hasWarnings = true;
    }

    // Stripe (Phase 2)
    if (envContent.includes('STRIPE_SECRET_KEY=')) {
        console.log('⚠️  STRIPE_SECRET_KEY is set (Phase 2 feature)');
        hasWarnings = true;
    }
}

// Check node_modules
console.log('\n📦 Checking dependencies...');
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.log('❌ node_modules not found');
    console.log('   Run: npm install');
    hasErrors = true;
} else {
    console.log('✅ Dependencies installed');
}

// Check test personas file
console.log('\n🧪 Checking test infrastructure...');
const personasPath = path.join(__dirname, '..', 'state_bench_personas.json');
if (!fs.existsSync(personasPath)) {
    console.log('❌ state_bench_personas.json not found');
    hasErrors = true;
} else {
    console.log('✅ Test personas file exists');

    try {
        const personas = JSON.parse(fs.readFileSync(personasPath, 'utf-8'));
        console.log(`   Found ${personas.length} test personas`);
    } catch (e) {
        console.log('❌ Test personas file is invalid JSON');
        hasErrors = true;
    }
}

// Check test scripts
const testScriptPath = path.join(__dirname, 'test-personas.js');
const analyzerPath = path.join(__dirname, 'analyze-results.js');

if (fs.existsSync(testScriptPath)) {
    console.log('✅ test-personas.js exists');
} else {
    console.log('❌ test-personas.js not found');
    hasErrors = true;
}

if (fs.existsSync(analyzerPath)) {
    console.log('✅ analyze-results.js exists');
} else {
    console.log('❌ analyze-results.js not found');
    hasErrors = true;
}

// Check documentation
console.log('\n📚 Checking documentation...');
const docs = [
    'BRAND_VOICE.md',
    'TESTING.md',
    'PHASE_2.md',
    'DEV_GUIDE.md'
];

docs.forEach(doc => {
    const docPath = path.join(__dirname, '..', doc);
    if (fs.existsSync(docPath)) {
        console.log(`✅ ${doc} exists`);
    } else {
        console.log(`⚠️  ${doc} not found (optional)`);
        hasWarnings = true;
    }
});

// Check if server is running
console.log('\n🌐 Checking development server...');
const http = require('http');

function checkServer(port) {
    return new Promise((resolve) => {
        const req = http.get(`http://localhost:${port}`, (res) => {
            resolve(true);
        });
        req.on('error', () => {
            resolve(false);
        });
        req.setTimeout(1000, () => {
            req.destroy();
            resolve(false);
        });
    });
}

(async () => {
    const port3001 = await checkServer(3001);
    const port3000 = await checkServer(3000);

    if (port3001) {
        console.log('✅ Development server running on port 3001');
    } else if (port3000) {
        console.log('✅ Development server running on port 3000');
    } else {
        console.log('⚠️  Development server not running');
        console.log('   Start with: npm run dev');
        hasWarnings = true;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📋 SUMMARY\n');

    if (!hasErrors && !hasWarnings) {
        console.log('✅ All checks passed! Ready to run tests.');
        console.log('\nNext steps:');
        console.log('  1. Ensure OpenAI account has credits');
        console.log('  2. Run: node scripts/test-personas.js');
        console.log('  3. Analyze: node scripts/analyze-results.js');
    } else if (hasErrors) {
        console.log('❌ Critical errors found. Fix these before testing:');
        console.log('   - Missing .env.local or OPENAI_API_KEY');
        console.log('   - Missing dependencies (run npm install)');
        console.log('   - Missing test files');
        process.exit(1);
    } else if (hasWarnings) {
        console.log('⚠️  Warnings found, but you can proceed with testing.');
        console.log('   - Some optional files missing');
        console.log('   - Development server not running (start with npm run dev)');
        console.log('   - Phase 2 env vars set (not needed yet)');
    }

    console.log('\n' + '='.repeat(60) + '\n');
})();
