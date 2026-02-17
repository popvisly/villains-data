/**
 * Authority source for branding across the application.
 * This makes the "Brand Lock" phase trivial.
 */

export const APP_NAME = 'Captori';
// Product descriptor (working title). Keep separate from brand name for flexibility.
export const APP_PRODUCT = 'Career Operating Plan';
export const APP_TAGLINE = 'Work, attention, identity, and capacity.';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://captori.com';

export const BRAND_CONFIG = {
    name: APP_NAME,
    product: APP_PRODUCT,
    tagline: APP_TAGLINE,
    url: APP_URL,
    differentiator: 'Not interview prep. This is a build plan.',
    philosophy: 'Build signal. Then log off.',
    supportEmail: 'support@captori.com',
    twitterHandle: '@captori_app',
};

export const ROUTES = {
    HOME: '/',
    START: '/start',
    CAREER: '/assessment',
    ATTENTION: '/attention',
    IDENTITY: '/identity',
    CAPACITY: '/capacity',
    PLAYBOOK: '/playbook',
};
