'use server';

import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { headers } from 'next/headers';

export async function createCheckoutSession(assessmentId: string) {
    const origin = (await headers()).get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Specific price ID or ad-hoc price data
    // For v1, we'll use ad-hoc price data to avoid needing a Product set up in Stripe Dashboard
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'AI Career Shield - Execution Pack',
                        description: 'Full 30/60/90 day plan, role adjacencies, and immediate action items.',
                        images: ['https://placehold.co/600x400/png'], // Placeholder image
                    },
                    unit_amount: 1900, // $19.00
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${origin}/assessment/success?session_id={CHECKOUT_SESSION_ID}&assessmentId=${assessmentId}`,
        cancel_url: `${origin}/assessment`,
        metadata: {
            assessmentId,
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

        // 2. Record purchase in Supabase (idempotent via stored procedure or unique constraints)
        // We used a unique index on stripe_session_id in the migration, so we can use upsert or ignore
        const { error } = await supabaseAdmin.from('purchases').upsert(
            {
                stripe_session_id: session.id,
                amount_total: session.amount_total || 0,
                currency: session.currency || 'usd',
                status: session.status || 'unknown',
                customer_email: session.customer_details?.email || null,
                assessment_id: session.metadata?.assessmentId || null,
            },
            { onConflict: 'stripe_session_id' }
        );

        if (error) {
            console.error('Failed to record purchase:', error);
            // We don't fail the user request here if we can't record it, as they already paid.
            // In a real app, we'd queue a retry or log a critical alert.
        }

        // 3. Set a "purchased" state
        // In a Server Action, we can set cookies.
        // For v1 simplicity, we'll return success and let the Client Component handle the cookie/state?
        // Actually, Server Actions can set cookies directly.

        // Check next.js docs: "You can read and set cookies in Server Actions"
        // We'll trust the "success" return to trigger a UI update or client-side cookie if needed, 
        // OR we can set a secure separate cookie here. 
        // Let's set a cookie for "purchased_execution_pack" = "true" (signed/encrypted ideally, but simple for now)

        // We'll delegate cookie logic to the route handler or middleware if we want full security.
        // For this prototype, success return is enough for the success page to show the content.
        // But we need persistent access when they go back to /assessment.

        // We will set a cookie via standard Next.js cookies API in the Page (Server Component) that calls this, 
        // or right here if this is called directly.
        // However, success page is usually a Page. 

        return { success: true, email: session.customer_details?.email };
    } catch (err) {
        console.error('verifySession error:', err);
        return { success: false, error: 'Verification failed' };
    }
}
