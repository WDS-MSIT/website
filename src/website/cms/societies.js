import { mediaUrl, PUBLISHED, richTextToPlain, safeUrl, useCms } from './client';

/*
 * CMS Societies for the societies hub (/society) and each society page (/society-<name>).
 * Fields the CMS has (name, overview, description, founded year, category, logo, coordinators,
 * contact, links, gallery) replace the website's; everything else (tagline, vision, events, FAQ…)
 * stays from the website until the CMS gains those fields. Societies that exist only in the CMS
 * get a page too.
 */

// Website page id -> CMS slug, for societies both have under different names.
const WEBSITE_TO_CMS = {
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
const CMS_TO_WEBSITE = Object.fromEntries(Object.entries(WEBSITE_TO_CMS).map(([site, cms]) => [cms, site]));

export const societyPageId = (cmsSlug) => CMS_TO_WEBSITE[cmsSlug] || `society-${cmsSlug}`;

const CATEGORIES = {
    technical: 'Technical',
    academic: 'Academic & Research',
    cultural: 'Cultural & Arts',
    service: 'Social Responsibility',
};

const SOCIAL_HOSTS = { instagram: 'instagram.com', linkedin: 'linkedin.com', youtube: 'youtube.com', github: 'github.com' };

const foundedYear = (doc) => doc.foundedYear || (doc.foundedOn ? new Date(doc.foundedOn).getFullYear() : null);

// All published CMS societies keyed by website page id; undefined while loading, null if none.
export const useCmsSocieties = () =>
    useCms(
        `societies?${PUBLISHED}&depth=1&limit=200&sort=sortOrder`,
        (json) => (json.docs.length ? Object.fromEntries(json.docs.map((doc) => [societyPageId(doc.slug), doc])) : null),
        undefined,
    );

const listFields = (doc) => {
    const year = foundedYear(doc);
    const logo = mediaUrl(doc.logo);
    return {
        name: doc.name,
        ...(doc.overview ? { description: doc.overview } : {}),
        ...(year ? { established: String(year) } : {}),
        ...(CATEGORIES[doc.category] ? { category: CATEGORIES[doc.category] } : {}),
        ...(logo ? { logo } : {}),
    };
};

// The hub's list: website societies updated from the CMS, then CMS-only societies.
export const useCmsSocietyList = (fallback) => {
    const cms = useCmsSocieties();
    if (!cms) return fallback;
    const known = new Set();
    const merged = fallback.map((item) => {
        const doc = cms[item.id];
        if (!doc) return item;
        known.add(item.id);
        // Societies the website pointed at another page (no page of their own) now have one.
        return { ...item, ...listFields(doc), link: `/${item.id}` };
    });
    const extra = Object.entries(cms)
        .filter(([id]) => !known.has(id))
        .map(([id, doc]) => ({
            id,
            shortName: doc.name.slice(0, 2).toUpperCase(),
            category: 'Other',
            tagline: '',
            description: '',
            established: '',
            members: '',
            link: `/${id}`,
            ...listFields(doc),
        }));
    return [...merged, ...extra];
};

const toPerson = (member, role) =>
    member
        ? {
              name: member.name,
              role: member.role || role,
              designation: member.designation || member.role || role,
              department: member.department || member.unit || '',
              ...(member.person && typeof member.person === 'object' && mediaUrl(member.person.photo)
                  ? { image: mediaUrl(member.person.photo) }
                  : {}),
          }
        : undefined;

// A society page: the website's page (if any) with the CMS fields laid over it.
export const toSocietyDetail = (doc, base) => {
    if (!doc) return base;
    const id = societyPageId(doc.slug);
    const links = (doc.externalLinks || []).map((link) => ({ ...link, url: safeUrl(link.url) })).filter((link) => link.url);
    const socials = { ...(base?.socials || {}) };
    for (const [name, host] of Object.entries(SOCIAL_HOSTS)) {
        const match = links.find((link) => link.url.includes(host));
        if (match) socials[name] = match.url;
    }
    const email = doc.contact?.emails?.[0]?.email;
    if (email) socials.email = `mailto:${email}`;
    const website = links.find((link) => link.type === 'website' && !Object.values(SOCIAL_HOSTS).some((host) => link.url.includes(host)));
    const about = richTextToPlain(doc.description);
    const gallery = [
        ...(doc.gallery || []).map((item) => ({ title: item.caption || doc.name, category: 'society', image: mediaUrl(item.image) })),
        ...(doc.legacyImages || []).map((item) => ({ title: doc.name, category: 'society', image: safeUrl(item.url) })),
    ].filter((item) => item.image);
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
        ...(CATEGORIES[doc.category] ? { category: CATEGORIES[doc.category] } : { category: base?.category || 'Student Society' }),
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
            ...(base?.people || {}),
            ...(faculty ? { faculty: { ...base?.people?.faculty, ...faculty } } : {}),
            ...(student ? { student: { ...base?.people?.student, ...student } } : {}),
        },
    };
};
