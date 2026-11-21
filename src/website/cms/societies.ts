import type { SocietyListItem, SocietyProfile, SocietyRecord } from '../types';
import {
    mediaUrl,
    PUBLISHED,
    richTextToPlain,
    safeUrl,
    useCms,
    type CmsListResponse,
} from './client';

/*
 * CMS Societies for the societies hub (/society) and each society page (/society-<name>).
 * Fields the CMS has (name, overview, description, founded year, category, logo, coordinators,
 * contact, links, gallery) replace the website's; everything else (tagline, vision, events, FAQ…)
 * stays from the website until the CMS gains those fields. Societies that exist only in the CMS
 * get a page too.
 */

// Website page id -> CMS slug, for societies both have under different names.
const WEBSITE_TO_CMS: Record<string, string> = {
    'society-geekroom': 'geek-room',
    'society-ieee': 'ieee',
    'society-ndli': 'ndli-club',
    'society-gdsc': 'gdsc',
    'society-eyantra': 'e-yantra',
    'society-mutants': 'mutants',
    'society-cerebrate': 'cerebrate',
    'society-nss': 'nss',
    'society-spark': 'spark',
};
const CMS_TO_WEBSITE: Record<string, string> = Object.fromEntries(
    Object.entries(WEBSITE_TO_CMS).map(([site, cms]) => [cms, site]),
);

export const societyPageId = (cmsSlug: string): string => CMS_TO_WEBSITE[cmsSlug] || `society-${cmsSlug}`;

const CATEGORIES: Record<string, string> = {
    technical: 'Technical',
    academic: 'Academic & Research',
    cultural: 'Cultural & Arts',
    service: 'Social Responsibility',
};

const SOCIAL_HOSTS: Record<string, string> = {
    instagram: 'instagram.com',
    linkedin: 'linkedin.com',
    youtube: 'youtube.com',
    github: 'github.com',
};

type CmsCoordinator = {
    department?: string;
    designation?: string;
    name: string;
    person?: { photo?: unknown } | number;
    role?: string;
    unit?: string;
};

type CmsExternalLink = {
    label?: string;
    type?: string;
    url: string;
};

type CmsSociety = {
    category?: string;
    contact?: {
        emails?: Array<{ email?: string }>;
        phone?: string;
    };
    description?: unknown;
    externalLinks?: CmsExternalLink[];
    facultyCoordinators?: CmsCoordinator[];
    foundedOn?: string;
    foundedYear?: number;
    gallery?: Array<{ caption?: string; image?: unknown }>;
    legacyImages?: Array<{ url?: string }>;
    logo?: unknown;
    name: string;
    overview?: string;
    slug: string;
    studentLeaders?: CmsCoordinator[];
};

const foundedYear = (doc: CmsSociety): number | null =>
    doc.foundedYear || (doc.foundedOn ? new Date(doc.foundedOn).getFullYear() : null);

// All published CMS societies keyed by website page id; undefined while loading, null if none.
export const useCmsSocieties = (): Record<string, CmsSociety> | null | undefined =>
    useCms<Record<string, CmsSociety> | null | undefined>(
        `societies?${PUBLISHED}&depth=1&limit=200&sort=sortOrder`,
        (json) => {
            const docs = (json as CmsListResponse<CmsSociety>).docs;
            return docs.length
                ? Object.fromEntries(docs.map((doc) => [societyPageId(doc.slug), doc]))
                : null;
        },
        undefined,
    );

const listFields = (doc: CmsSociety): Partial<SocietyListItem> => {
    const year = foundedYear(doc);
    const logo = mediaUrl(doc.logo);
    return {
        name: doc.name,
        ...(doc.overview ? { description: doc.overview } : {}),
        ...(year ? { established: String(year) } : {}),
        ...(doc.category && CATEGORIES[doc.category] ? { category: CATEGORIES[doc.category] } : {}),
        ...(logo ? { logo } : {}),
    };
};

// The hub's list: website societies updated from the CMS, then CMS-only societies.
export const useCmsSocietyList = (fallback: SocietyListItem[]): SocietyListItem[] => {
    const cms = useCmsSocieties();
    if (!cms) return fallback;
    const known = new Set<string>();
    const merged = fallback.map((item) => {
        const doc = cms[item.id];
        if (!doc) return item;
        known.add(item.id);
        // Societies the website pointed at another page (no page of their own) now have one.
        return { ...item, ...listFields(doc), link: `/${item.id}` };
    });
    const extra: SocietyListItem[] = Object.entries(cms)
        .filter(([id]) => !known.has(id))
        .map(([id, doc]) => {
            const { name: _name, ...fields } = listFields(doc);
            return {
                id,
                name: doc.name,
                shortName: doc.name.slice(0, 2).toUpperCase(),
                category: 'Other',
                tagline: '',
                description: '',
                established: '',
                members: '',
                link: `/${id}`,
                ...fields,
            };
        });
    return [...merged, ...extra];
};

const toPerson = (
    member: CmsCoordinator | undefined,
    role: string,
): {
    department: string;
    designation: string;
    image?: string;
    name: string;
    role: string;
} | undefined => {
    if (!member) return undefined;
    const photo = member.person && typeof member.person === 'object' ? mediaUrl(member.person.photo) : null;
    return {
        name: member.name,
        role: member.role || role,
        designation: member.designation || member.role || role,
        department: member.department || member.unit || '',
        ...(photo ? { image: photo } : {}),
    };
};

// A society page: the website's page (if any) with the CMS fields laid over it.
export const toSocietyDetail = (
    doc: CmsSociety | undefined,
    base: SocietyProfile | undefined,
): SocietyProfile => {
    if (!doc) return base || {};
    const id = societyPageId(doc.slug);
    const links = (doc.externalLinks || [])
        .map((link) => ({ ...link, url: safeUrl(link.url) }))
        .filter((link): link is CmsExternalLink & { url: string } => Boolean(link.url));
    const socials: Record<string, string> = { ...((base?.socials as Record<string, string>) || {}) };
    for (const [name, host] of Object.entries(SOCIAL_HOSTS)) {
        const match = links.find((link) => link.url.includes(host));
        if (match) socials[name] = match.url;
    }
    const email = doc.contact?.emails?.[0]?.email;
    if (email) socials.email = `mailto:${email}`;
    const website = links.find(
        (link) =>
            link.type === 'website' &&
            !Object.values(SOCIAL_HOSTS).some((host) => link.url.includes(host)),
    );
    const about = richTextToPlain(doc.description);
    const gallery = [
        ...(doc.gallery || []).map((item) => ({
            title: item.caption || doc.name,
            category: 'society',
            image: mediaUrl(item.image),
        })),
        ...(doc.legacyImages || []).map((item) => ({
            title: doc.name,
            category: 'society',
            image: safeUrl(item.url),
        })),
    ].filter((item): item is { category: string; image: string; title: string } => Boolean(item.image));
    const faculty = toPerson(doc.facultyCoordinators?.[0], 'Faculty Coordinator');
    const student = toPerson(doc.studentLeaders?.[0], 'Student Coordinator');
    const year = foundedYear(doc);
    const logo = mediaUrl(doc.logo);

    return {
        heroImage: '/campus-hero.webp',
        faqs: [],
        ...base,
        id,
        slug: id,
        name: doc.name,
        shortName: base?.shortName || doc.name,
        logoText: base?.logoText || doc.name.slice(0, 4).toUpperCase(),
        ...(doc.category && CATEGORIES[doc.category]
            ? { category: CATEGORIES[doc.category] }
            : { category: base?.category || 'Student Society' }),
        ...(year ? { established: String(year) } : {}),
        ...(logo ? { logo } : {}),
        ...(doc.overview ? { overview: doc.overview } : {}),
        ...(about ? { detailedAbout: about } : {}),
        ...(email ? { email } : {}),
        ...(doc.contact?.phone ? { phone: doc.contact.phone } : {}),
        ...(website ? { website: website.url } : {}),
        socials,
        gallery: gallery.length ? gallery : base?.gallery || [],
        people: {
            ...((base?.people as Record<string, unknown>) || {}),
            ...(faculty
                ? {
                      faculty: {
                          ...((base?.people as { faculty?: Record<string, unknown> })?.faculty || {}),
                          ...faculty,
                      },
                  }
                : {}),
            ...(student
                ? {
                      student: {
                          ...((base?.people as { student?: Record<string, unknown> })?.student || {}),
                          ...student,
                      },
                  }
                : {}),
        },
    };
};

export type { CmsSociety, SocietyRecord };
