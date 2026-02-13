import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkMigration() {
    console.log('Checking if "purchases" table exists...');

    // Try to select 0 rows
    const { error } = await supabase.from('purchases').select('*').limit(0);

    if (error) {
        if (error.code === '42P01') { // undefined_table
            console.log('❌ Table "purchases" does NOT exist.');
            console.log('Please run the migration SQL in /supabase/migrations/002_purchases_table.sql');
        } else {
            console.error('❌ Unexpected error checking table:', error.message);
        }
    } else {
        console.log('✅ Table "purchases" exists and is accessible.');
    }
}

checkMigration();
