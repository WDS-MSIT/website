import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonicalPath = "", schema = null }) => {
    const siteTitle = "Maharaja Surajmal Institute of Technology (MSIT)";
    const fullTitle = (title && title !== "Home") ? `${title} | MSIT` : siteTitle;
    const baseUrl = "https://msit-website.netlify.app";
    
    // Ensure canonicalPath starts with / and doesn't end with /
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = canonicalPath === "" ? baseUrl : `${baseUrl}${cleanPath}`.replace(/\/+$/, "");

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="author" content="Maharaja Surajmal Institute of Technology" />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <link rel="canonical" href={canonicalUrl} />


            <link rel="alternate" hreflang="en-IN" href={canonicalUrl} />
            <link rel="alternate" hreflang="x-default" href={canonicalUrl} />

            {/* Open Graph tags (Facebook/LinkedIn) */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content="MSIT Delhi" />
            <meta property="og:image" content={`${baseUrl}/msit-logo.webp`} />

            {/* Twitter tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content="https://msit-website.netlify.app/msit-logo.webp" />

            {/* Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;


