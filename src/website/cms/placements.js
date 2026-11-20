import { PUBLISHED, safeUrl, useCms } from './client';

/*
 * CMS Placement Years for the Placements page: the year-wise report cards, and the highest and
 * average package figures from the latest year that has them. Placement rate and recruiter count
 * have no CMS field yet, so they stay as written in the page.
 */

const PATH = `placement-years?${PUBLISHED}&depth=1&limit=100&sort=-year`;

const reportUrl = (year) => {
    const doc = (year.evidenceDocuments || []).find((item) => item && typeof item === 'object');
    return safeUrl(doc?.url || doc?.legacyUrl) || safeUrl(year.legacyEvidence?.[0]?.url);
};

const lpa = (value) => (value >= 100 ? `₹${(value / 100).toFixed(value % 100 ? 1 : 0)} Cr` : `₹${value} LPA`);

// [{ year, link }] for every published year with a report, newest first.
export const useCmsPlacementRecords = (fallback) =>
    useCms(
        PATH,
        (json) => {
            const records = json.docs
                .map((year) => ({ year: String(year.year), link: reportUrl(year) }))
                .filter((record) => record.link);
            return records.length ? records : null;
        },
        fallback,
    );

// The website's key figures, with Highest and Average Package taken from the CMS when it has them.
export const useCmsPlacementFigures = (fallback) =>
    useCms(
        PATH,
        (json) => {
            const latest = json.docs.find((year) => year.highestPackageLpa != null || year.averagePackageLpa != null);
            if (!latest) return null;
            return fallback.map((figure) => {
                if (figure.label === 'Highest Package' && latest.highestPackageLpa != null) {
                    return { ...figure, value: lpa(latest.highestPackageLpa), note: `Batch of ${latest.year}` };
                }
                if (figure.label === 'Average Package' && latest.averagePackageLpa != null) {
                    return { ...figure, value: lpa(latest.averagePackageLpa), note: `Batch of ${latest.year}` };
                }
                return figure;
            });
        },
        fallback,
    );
