import { aboutData } from './pages/aboutData.js';
import { admissionData } from './pages/admissionData.js';
import { academicData } from './pages/academicData.js';
import { campusLifeData } from './pages/campusLifeData.js';
import { placementData } from './pages/placementData.js';
import { quickLinksData } from './pages/quickLinksData.js';

/**
 * Single Source of Truth for all Dynamic Pages
 * Data is modularized by section for better maintainability.
 */
export const pagesData = {
    ...aboutData,
    ...admissionData,
    ...academicData,
    ...campusLifeData,
    ...placementData,
    ...quickLinksData
};
