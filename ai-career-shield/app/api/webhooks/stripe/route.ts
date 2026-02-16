import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { resend } from '@/lib/resend';
import { getEmailTemplates } from '@/lib/email-templates';
import { supabaseAdmin } from '@/lib/supabase';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    const body = await req.text();
    const sig = (await headers()).get('stripe-signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
    }

    // Handle successful purchase
    if (event.type === 'checkout.session.completed' || event.type === 'payment_intent.succeeded') {
        const session = event.data.object as any;
        const email = session.customer_details?.email || session.receipt_email;
        const planId = session.metadata?.planId;
        const tier = session.metadata?.tier || 'execution';
        const userName = session.customer_details?.name || 'there';

        if (email && planId) {
            // 1. Fetch Plan details for variables (Resilience score, top driver)
            const { data: plan } = await supabaseAdmin
                .from('plans') // Ensure this is the correct table name
                .select('resilience_score, top_driver')
                .eq('id', planId)
                .single();

            const templates = getEmailTemplates({
                userName,
                resilienceScore: plan?.resilience_score || 74,
                topDriver: plan?.top_driver || 'Strategic Judgment',
                planTier: tier,
            });

            try {
                // EMAIL 1: IMMEDIATE
                await resend.emails.send({
                    from: 'Captori <support@captori.com>',
                    to: email,
                    subject: templates.day0.subject,
                    html: templates.day0.html,
                });

                // EMAIL 2: DAY 7
                await resend.emails.send({
                    from: 'Captori <support@captori.com>',
                    to: email,
                    subject: templates.day7.subject,
                    html: templates.day7.html,
                    scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                });

                // EMAIL 3: DAY 30
                await resend.emails.send({
                    from: 'Captori <support@captori.com>',
                    to: email,
                    subject: templates.day30.subject,
                    html: templates.day30.html,
                    scheduledAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                });

                // EMAIL 4: DAY 90
                await resend.emails.send({
                    from: 'Captori <support@captori.com>',
                    to: email,
                    subject: templates.day90.subject,
                    html: templates.day90.html,
                    scheduledAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
                });

                console.log(`Email sequence triggered for ${email}`);
            } catch (error) {
                console.error('Failed to send/schedule emails:', error);
            }
        }
    }

    return NextResponse.json({ received: true });
}
