/**
 * Authority source for branding across the application.
 * This makes the "Brand Lock" phase trivial.
 */

export const APP_NAME = 'People Plan';
export const APP_TAGLINE = 'Plans for the AI era';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const BRAND_CONFIG = {
    name: APP_NAME,
    tagline: APP_TAGLINE,
    url: APP_URL,
    differentiator: 'Not interview prep. This is a build plan.',
    philosophy: 'Build signal. Then log off.',
    supportEmail: 'support@peopleplan.app',
    twitterHandle: '@peopleplan_app',
};

export const ROUTES = {
    HOME: '/',
    START: '/start',
    CAREER: '/assessment',
    ATTENTION: '/attention',
    IDENTITY: '#', // Coming soon
};
