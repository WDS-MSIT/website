import { mediaUrl, normalizeName, PUBLISHED, safeUrl, useCms } from './client';

/*
 * CMS People for the Faculty & Staff directory. A CMS person whose name matches a website entry
 * updates its designation, email, phone, photo, biography and qualifications; the website keeps
 * what the CMS has no field for (research links, publications, expertise…). Faculty, leadership,
 * administration, governing body and placement staff that exist only in the CMS are added.
 */

const DEFAULT_PHOTO = '/faculty/default-avatar.webp';

// The directory's department tabs.
const deptFor = (person) => {
    const types = person.personTypes || [];
    const department = (person.departments || []).find((item) => item && typeof item === 'object');
    if (types.includes('governance')) return 'Governing Body';
    if (types.includes('placement-staff')) return 'Training & Placement Cell';
    if (department?.code) return department.code;
    if (department?.name === 'Applied Sciences') return 'Applied Sciences';
    if (types.includes('leadership') || types.includes('administration')) return 'Administration';
    return null;
};

const LISTED_TYPES = ['faculty', 'leadership', 'administration', 'governance', 'placement-staff'];

const cmsFields = (person) => {
    const photo = mediaUrl(person.photo) || safeUrl(person.legacyPhotoUrl);
    const qualifications = (person.qualifications || []).map((item) => item.qualification).filter(Boolean);
    return {
        ...(person.primaryDesignation ? { role: person.primaryDesignation } : {}),
        ...(person.email ? { email: person.email } : {}),
        ...(person.phone ? { phone: person.phone } : {}),
        ...(photo ? { img: photo } : {}),
        ...(person.biography ? { bio: person.biography } : {}),
        ...(qualifications.length ? { qual: qualifications.join(', ') } : {}),
    };
};

// Only the fields the directory uses, so the request stays small.
const SELECT = ['name', 'slug', 'primaryDesignation', 'email', 'phone', 'photo', 'legacyPhotoUrl', 'biography', 'qualifications', 'personTypes', 'departments']
    .map((field) => `select[${field}]=true`)
    .join('&');

export const useCmsFaculty = (fallback) =>
    useCms(
        `people?${PUBLISHED}&${SELECT}&depth=1&limit=1000&sort=sortOrder`,
        (json) => {
            if (!json.docs.length) return null;
            const byName = new Map(json.docs.map((person) => [normalizeName(person.name), person]));
            const matched = new Set();
            const merged = fallback.map((member) => {
                const person = byName.get(normalizeName(member.name));
                if (!person) return member;
                matched.add(person.id);
                return { ...member, ...cmsFields(person) };
            });
            const added = json.docs
                .filter((person) => !matched.has(person.id))
                .filter((person) => (person.personTypes || []).some((type) => LISTED_TYPES.includes(type)))
                .map((person) => ({ person, dept: deptFor(person) }))
                .filter(({ dept }) => dept)
                .map(({ person, dept }) => ({
                    id: `cms-${person.slug}`,
                    name: person.name,
                    role: person.primaryDesignation || 'Faculty',
                    dept,
                    img: DEFAULT_PHOTO,
                    bio: '',
                    goodAt: [],
                    researchInterests: [],
                    coursesTaught: [],
                    otherWebsites: [],
                    ...cmsFields(person),
                }));
            return [...merged, ...added];
        },
        fallback,
    );
