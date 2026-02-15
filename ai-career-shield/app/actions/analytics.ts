'use server';

import { supabaseAdmin } from '@/lib/supabase';

type EventName = string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventProperties = Record<string, any>;

export async function logEvent(name: EventName, properties: EventProperties = {}, url?: string) {
    try {
        // Note: We are using the admin client, so we bypass RLS.
        // We don't have automatic access to the user's session ID here without parsing cookies manually.
        // For this V1, we'll log the event without the strict user_id link unless passed in properties.

        // If properties has user_id, use it.
        const userId = properties.userId || properties.user_id || null;

        const { error } = await supabaseAdmin.from('analytics_events').insert({
            event_name: name,
            properties,
            url,
            user_id: userId,
        });

        if (error) {
            console.error('Error logging analytics event:', error);
        }
    } catch (err) {
        console.error('Failed to log analytics event:', err);
    }
}
