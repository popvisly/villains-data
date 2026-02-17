'use client';

type EventName =
    | 'landing_page_view'
    | 'assessment_start'
    | 'assessment_complete'
    | 'paywall_view'
    | 'view_pricing'
    | 'pricing_plan_click'
    | 'checkout_started'
    | 'purchase_completed'
    | 'payment_success_view'
    | 'assessment_resume'
    | 'assessment_reset'
    | 'streaming_start'
    | 'streaming_token_first'
    | 'streaming_factor_first'
    | 'streaming_insight_first'
    | 'streaming_complete'
    | 'share_image_click'
    | 'share_link_click'
    | 'share_clicked'
    | 'attention_audit_start'
    | 'attention_audit_complete'
    | 'identity_generate_start'
    | 'identity_generate_complete'
    | 'artifact_link_added'
    | 'persona_toggle_click'
    | 'linkedin_copy_click'
    | 'playbook_template_copy'
    | 'playbook_pdf_export'
    | 'module_selected'
    | 'export_used'
    | 'example_viewed'
    | 'post_purchase_survey_submitted'
    | 'page_view_career_resilience'
    | 'cta_clicked_start_assessment'
    | 'cta_clicked_skip_briefing'
    | 'artifact_signed';

type EventProperties = Record<string, string | number | boolean | null>;

/**
 * Track an analytics event.
 * Currently logs to console. In production, this would send data to GA4, PostHog, or Supabase.
 */
import { logEvent } from '@/app/actions/analytics';

export function trackEvent(name: EventName, properties?: EventProperties) {
    // Log to console in dev
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] ${name}`, properties);
    }

    // Send to Supabase via Server Action
    // We fire and forget to not block the UI
    const url = typeof window !== 'undefined' ? window.location.href : undefined;
    logEvent(name, properties || {}, url).catch(err => console.error('Analytics error:', err));
}
