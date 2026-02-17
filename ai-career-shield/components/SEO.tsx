interface SEOProps {
    title?: string;
    description?: string;
    url?: string;
    canonical?: string;
    ogImage?: string;
}

export default function SEO({
    description = "Create a personalized Career Operating Plan with measurable outcomes, templates, and a tailored roadmap to grow your career or project.",
    url = "https://captori.com", // Updated default URL
}: { description?: string; url?: string }) {

    const siteName = "Captori";

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
