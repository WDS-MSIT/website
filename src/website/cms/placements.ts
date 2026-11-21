import type { KeyFigure, PlacementRecord } from '../types';
import { PUBLISHED, safeUrl, useCmsResource, type CmsListResponse } from './client';

/*
 * CMS Placement Years for the Placements page: the year-wise report cards, and the highest and
 * average package figures from the latest year that has them. Placement rate and recruiter count
 * have no CMS field yet, so they stay as written in the page.
 */

const PATH = `placement-years?${PUBLISHED}&depth=1&limit=100&sort=-year`;

type CmsEvidenceDocument = {
    legacyUrl?: string;
    url?: string;
};

type CmsPlacementYear = {
    averagePackageLpa?: number | null;
    evidenceDocuments?: Array<CmsEvidenceDocument | number>;
    highestPackageLpa?: number | null;
    legacyEvidence?: Array<{ url?: string }>;
    year: number;
};

const reportUrl = (year: CmsPlacementYear): string | null => {
    const doc = (year.evidenceDocuments || []).find(
        (item): item is CmsEvidenceDocument => Boolean(item) && typeof item === 'object',
    );
    return safeUrl(doc?.url || doc?.legacyUrl) || safeUrl(year.legacyEvidence?.[0]?.url);
};

const lpa = (value: number): string =>
    value >= 100 ? `₹${(value / 100).toFixed(value % 100 ? 1 : 0)} Cr` : `₹${value} LPA`;

// [{ year, link }] for every published year with a report, newest first.
export const useCmsPlacementRecords = (fallback: PlacementRecord[]): PlacementRecord[] =>
    useCmsResource<PlacementRecord[]>(
        PATH,
        (json) =>
            (json as CmsListResponse<CmsPlacementYear>).docs
                .map((year) => ({ year: String(year.year), link: reportUrl(year) }))
                .filter((record): record is PlacementRecord => Boolean(record.link)),
        fallback,
    ).data;

// The website's key figures, with Highest and Average Package taken from the CMS when it has them.
export const useCmsPlacementFigures = (fallback: KeyFigure[]): KeyFigure[] =>
    useCmsResource<KeyFigure[]>(
        PATH,
        (json) => {
            const latest = (json as CmsListResponse<CmsPlacementYear>).docs.find(
                (year) => year.highestPackageLpa != null || year.averagePackageLpa != null,
            );
            if (!latest) return [];
            const figures: KeyFigure[] = [];
            if (latest.highestPackageLpa != null) {
                figures.push({
                    value: lpa(latest.highestPackageLpa),
                    label: 'Highest Package',
                    note: `Batch of ${latest.year}`,
                });
            }
            if (latest.averagePackageLpa != null) {
                figures.push({
                    value: lpa(latest.averagePackageLpa),
                    label: 'Average Package',
                    note: `Batch of ${latest.year}`,
                });
            }
            return figures;
        },
        fallback,
    ).data;
