import type { Department } from '@/payload-types';

import { PUBLISHED, useCmsResource, type CmsListResponse, type CmsResource } from './client';

export const useCmsDepartments = (): CmsResource<Department[]> =>
    useCmsResource<Department[]>(
        `departments?${PUBLISHED}&depth=1&limit=100&sort=sortOrder`,
        (json) => (json as CmsListResponse<Department>).docs,
        [],
    );
