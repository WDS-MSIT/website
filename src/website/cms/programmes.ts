import type { Programme } from '@/payload-types';

import { PUBLISHED, useCmsResource, type CmsListResponse, type CmsResource } from './client';

export const useCmsProgrammes = (): CmsResource<Programme[]> =>
    useCmsResource<Programme[]>(
        `programmes?${PUBLISHED}&depth=1&limit=100&sort=name`,
        (json) => (json as CmsListResponse<Programme>).docs,
        [],
    );
