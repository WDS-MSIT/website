'use client';

import { createContext, useContext } from 'react';

import type { SiteSetting } from '@/payload-types';

import { useCmsResource, type CmsResource } from './client';

/*
 * One Site Settings read for the whole public site. Header, Footer and SEO all consume this
 * context so identity, contact details, navigation and footer links come from the CMS.
 *
 * While loading, or if the CMS request fails, consumers use the design's built-in fallback.
 * Once the CMS answers, its values win even when a field is empty.
 */

const SiteSettingsContext = createContext<CmsResource<SiteSetting | null>>({
    data: null,
    status: 'loading',
});

export const SiteSettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const resource = useCmsResource<SiteSetting | null>(
        'globals/site-settings?depth=2',
        (json) => {
            if (!json || typeof json !== 'object' || !('instituteName' in json)) {
                throw new Error('Site Settings response is not a site-settings document');
            }
            return json as unknown as SiteSetting;
        },
        null,
    );

    return <SiteSettingsContext.Provider value={resource}>{children}</SiteSettingsContext.Provider>;
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
