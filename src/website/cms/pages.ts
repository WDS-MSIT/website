import type { Page } from '@/payload-types';

import { PUBLISHED, useCmsResource, type CmsListResponse, type CmsResource } from './client';

/**
 * One published CMS page by slug. `data` is null when the CMS answered but has no such page;
 * callers should treat that as a real 404 rather than falling back to the old page catalog.
 */
export const useCmsPage = (slug: string): CmsResource<Page | null> =>
    useCmsResource<Page | null>(
        slug
            ? `pages?${PUBLISHED}&where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`
            : null,
        (json) => (json as CmsListResponse<Page>).docs[0] || null,
        null,
    );
