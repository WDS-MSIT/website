import type { PageData } from '../types';

import { aboutData } from './pages/aboutData';
import { admissionData } from './pages/admissionData';
import { academicData } from './pages/academicData';
import { campusLifeData } from './pages/campusLifeData';
import { placementData } from './pages/placementData';
import { quickLinksData } from './pages/quickLinksData';

/**
 * Single Source of Truth for all Dynamic Pages
 * Data is modularized by section for better maintainability.
 */
export const pagesData: Record<string, PageData> = {
    ...aboutData,
    ...admissionData,
    ...academicData,
    ...campusLifeData,
    ...placementData,
    ...quickLinksData,
};
