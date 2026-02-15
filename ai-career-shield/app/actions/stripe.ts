'use server';

import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies, headers } from 'next/headers';
import crypto from 'crypto';
import { PRICE_EXECUTION_PACK_CENTS, PRICE_EXECUTIVE_LICENSE_CENTS } from '@/lib/constants';

const EP_COOKIE = 'aicp_ep';

export async function createCheckoutSession(assessmentId: string, tier: 'execution' | 'executive' = 'execution') {
    const origin = (await headers()).get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3015';

    const priceCents = tier === 'executive' ? PRICE_EXECUTIVE_LICENSE_CENTS : PRICE_EXECUTION_PACK_CENTS;
    const productName = tier === 'executive' ? 'AI Career Portal - Executive License' : 'AI Career Portal - Execution Pack';
    const productDesc = tier === 'executive'
        ? 'Full Roadmap + Assets + Matcher + Project Briefs + Interview Simulator. Includes 12 months of updates.'
        : 'Full Roadmap + Skill Gap Map + Smart Matcher + Career Assets. Includes 12 months of updates.';

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: productName,
                        description: productDesc,
                        images: ['https://placehold.co/600x400/png'],
                    },
                    unit_amount: priceCents,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${origin}/assessment/success?session_id={CHECKOUT_SESSION_ID}&assessmentId=${assessmentId}`,
        cancel_url: `${origin}/assessment`,
        metadata: {
            assessmentId,
            tier,
        },
    });

    if (!session.url) {
        throw new Error('Failed to create checkout session');
    }

    return { url: session.url };
}

export async function verifySession(sessionId: string) {


    try {
        // 1. Retrieve session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== 'paid') {
            return { success: false, error: 'Payment not completed' };
        }

        // 2. Record purchase in Supabase (idempotent)
        const assessmentId = session.metadata?.assessmentId || null;

        const { error: upsertError } = await supabaseAdmin.from('purchases').upsert(
            {
                stripe_session_id: session.id,
                amount_total: session.amount_total || 0,
                currency: session.currency || 'usd',
                status: session.status || 'unknown',
                customer_email: session.customer_details?.email || null,
                assessment_id: assessmentId,
                tier: session.metadata?.tier || 'execution', // Record the tier
            },
            { onConflict: 'stripe_session_id' }
        );

        if (upsertError) {
            console.error('Failed to record purchase:', upsertError);
        }

        // 3. Ensure an access_token exists for this purchase
        const { data: existing, error: selectError } = await supabaseAdmin
            .from('purchases')
            .select('access_token')
            .eq('stripe_session_id', session.id)
            .maybeSingle();

        if (selectError) {
            console.error('Failed to load purchase for token issuance:', selectError);
        }

        let accessToken = existing?.access_token || null;

        if (!accessToken) {
            accessToken = crypto.randomBytes(24).toString('hex');
            const { error: tokenError } = await supabaseAdmin
                .from('purchases')
                .update({ access_token: accessToken })
                .eq('stripe_session_id', session.id);

            if (tokenError) {
                console.error('Failed to persist access token:', tokenError);
            }
        }

        // 4. Set httpOnly cookie for persistent access (no-login v1)
        if (accessToken) {
            (await cookies()).set({
                name: EP_COOKIE,
                value: accessToken,
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                // 180 days
                maxAge: 60 * 60 * 24 * 180,
            });
        }

        return { success: true, email: session.customer_details?.email };
    } catch (err) {
        console.error('verifySession error:', err);
        return { success: false, error: 'Verification failed' };
    }
}

export async function hasExecutionPackAccess(requiredTier?: 'execution' | 'executive'): Promise<{ hasAccess: boolean; tier?: 'execution' | 'executive' }> {
    try {
        const token = (await cookies()).get(EP_COOKIE)?.value;
        if (!token) return { hasAccess: false };

        const query = supabaseAdmin
            .from('purchases')
            .select('id, tier')
            .eq('access_token', token)
            .limit(1);

        const { data, error } = await query;

        if (error) {
            console.error('Entitlement check failed:', error);
            return { hasAccess: false };
        }

        if (!data || data.length === 0) return { hasAccess: false };

        const purchase = data[0];
        const userTier = purchase.tier as 'execution' | 'executive' || 'execution';

        // If a specific tier is required, check it
        if (requiredTier === 'executive') {
            return { hasAccess: userTier === 'executive', tier: userTier };
        }

        return { hasAccess: true, tier: userTier };
    } catch (e) {
        // Fallback to free/locked state instead of throwing
        return { hasAccess: false };
    }
}

