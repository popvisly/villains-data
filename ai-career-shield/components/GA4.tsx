'use client';

import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

/**
 * Minimal GA4 loader.
 * - Disabled unless NEXT_PUBLIC_GA4_MEASUREMENT_ID is set.
 * - Uses "anonymize_ip" and disables ad personalization signals.
 * - Does not send PII.
 */
export function GA4() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            allow_ad_personalization_signals: false,
          });
        `}
      </Script>
    </>
  );
}
