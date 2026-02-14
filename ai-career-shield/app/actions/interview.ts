'use server';

import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

const EP_COOKIE = 'aicp_ep';
const ANON_COOKIE = 'aicp_anon';
const LIMIT_FREE = 3;
const LIMIT_PAID = 10;

interface InterviewAllowance {
    used: number;
    limit: number;
    remaining: number;
    isPaid: boolean;
    identityId: string; // access_token or anon_id
}

async function getIdentity() {
    const cookieStore = await cookies();
    const paidToken = cookieStore.get(EP_COOKIE)?.value;

    if (paidToken) {
        return { type: 'paid', id: paidToken };
    }

    let anonToken = cookieStore.get(ANON_COOKIE)?.value;
    if (!anonToken) {
        // Generate new anon token if missing, we'll set it later
        anonToken = crypto.randomBytes(16).toString('hex');
        // We can set it now or return it to be set. 
        // Server Actions can set cookies.
        cookieStore.set({
            name: ANON_COOKIE,
            value: anonToken,
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 365 // 1 year
        });
    }

    return { type: 'free', id: anonToken };
}

export async function getInterviewAllowance(): Promise<InterviewAllowance> {
    const { type, id } = await getIdentity();
    const isPaid = type === 'paid';
    const limit = isPaid ? LIMIT_PAID : LIMIT_FREE;

    // Query usage - construct query chain correctly
    let query = supabaseAdmin
        .from('interview_usage')
        .select('turns_used');

    if (isPaid) {
        query = query.eq('access_token', id);
    } else {
        query = query.eq('anon_id', id);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
        console.error('Error fetching interview usage:', error);
        return { used: 0, limit, remaining: limit, isPaid, identityId: id };
    }

    const used = data?.turns_used || 0;

    return {
        used,
        limit,
        remaining: Math.max(0, limit - used),
        isPaid,
        identityId: id
    };
}

export async function consumeInterviewTurn(): Promise<{ getAllowance: InterviewAllowance, success: boolean }> {
    const { type, id } = await getIdentity();
    const isPaid = type === 'paid';
    const limit = isPaid ? LIMIT_PAID : LIMIT_FREE;

    // 1. Get current usage
    let findQuery = supabaseAdmin
        .from('interview_usage')
        .select('*');

    if (isPaid) {
        findQuery = findQuery.eq('access_token', id);
    } else {
        findQuery = findQuery.eq('anon_id', id);
    }

    const { data: existing, error: findError } = await findQuery.maybeSingle();

    if (findError) {
        throw new Error('Database error checking limits');
    }

    const currentUsed = existing?.turns_used || 0;

    if (currentUsed >= limit) {
        throw new Error('Interview limit reached');
    }

    // 2. Increment
    const newUsage = currentUsed + 1;

    const payload: any = { turns_used: newUsage };
    // Explicitly handle conflict target
    const conflictTarget = isPaid ? 'access_token' : 'anon_id';

    if (isPaid) {
        payload.access_token = id;
    } else {
        payload.anon_id = id;
    }

    // We match on the unique index via onConflict
    const { error: upsertError } = await supabaseAdmin
        .from('interview_usage')
        .upsert(payload, { onConflict: conflictTarget });

    if (upsertError) {
        console.error('Error incrementing usage:', upsertError);
        throw new Error('Failed to track usage');
    }

    return {
        success: true,
        getAllowance: {
            used: newUsage,
            limit,
            remaining: limit - newUsage,
            isPaid,
            identityId: id
        }
    };
}
