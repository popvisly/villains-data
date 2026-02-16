interface SEOProps {
    title?: string;
    description?: string;
    url?: string;
    canonical?: string;
    ogImage?: string;
}

export default function SEO({
    description = "Stay valuable in the AI-era with a definitive execution sequence and strategic resilience roadmap.",
    url = "https://villains-data.vercel.app", // Added default for url
}: { description?: string; url?: string }) {

    const siteName = "AI Career Portal";

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": siteName,
        "description": description,
        "url": url, // Using the destructured url prop
        "applicationCategory": "CareerService",
        "operatingSystem": "All",
        "author": {
            "@type": "Organization",
            "name": "Villains At Large"
        },
        "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
}
