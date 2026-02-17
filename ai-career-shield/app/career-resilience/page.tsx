import { APP_NAME, APP_URL } from '@/lib/brand';
import type { Metadata } from 'next';
import CareerResilienceClient from './CareerResilienceClient';

export const metadata: Metadata = {
    title: 'Career Resilience Index - Calculate Your AI-Era Job Stability | Captori',
    description: 'Free 2-minute assessment shows how AI-resistant your role is. Get your Resilience Index score + strategic actions to build career leverage in the AI era.',
    keywords: ['career resilience', 'AI job security', 'career planning AI era'],
    openGraph: {
        title: 'Calculate Your Career Resilience Index',
        description: 'See how AI-resistant your role is in 2 minutes',
        url: `${APP_URL}/career-resilience`,
        siteName: APP_NAME,
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: `${APP_URL}/images/infographics/pm-resilience-spectrum.png`,
                width: 1080,
                height: 1350,
                alt: 'Career Resilience Index Assessment',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Calculate Your Career Resilience Index',
        description: 'See how AI-resistant your role is in 2 minutes',
        images: [`${APP_URL}/images/infographics/pm-resilience-spectrum.png`],
    },
};

export default function CareerResiliencePage() {
    return <CareerResilienceClient />;
}
