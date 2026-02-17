import { Resend } from 'resend';

let _resend: Resend | null = null;

export function getResendClient(): Resend {
    if (_resend) return _resend;

    const key = process.env.RESEND_API_KEY;
    if (!key) {
        // Important: do not throw at module import time (breaks Next.js build step)
        // Only error when the email-sending code path is actually executed.
        throw new Error('RESEND_API_KEY is missing');
    }

    _resend = new Resend(key);
    return _resend;
}
