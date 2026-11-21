'use client';

import type { Homepage } from '@/payload-types';

import { useCmsResource, type CmsResource } from './client';

/*
 * The Homepage global: hero highlights, update sections and the campus tour.
 * While loading or on a failed request, Home uses its built-in design fallback.
 * Once the CMS answers, the global is the source of truth, including empty arrays.
 */
export const useCmsHomepage = (): CmsResource<Homepage | null> =>
    useCmsResource<Homepage | null>(
        'globals/homepage?depth=2',
        (json) => {
            if (!json || typeof json !== 'object' || !('heading' in json)) {
                throw new Error('Homepage response is not a homepage document');
            }
            return json as unknown as Homepage;
        },
        null,
    );
