import { formatCmsDate, linkUrl, mediaUrl, PUBLISHED, richTextToPlain, safeUrl, useCms } from './client';

/*
 * CMS Updates (news, notices, achievements) and Events, in the shape the website's news list and
 * news page use: { id, label, category, title, summary, date, readTime, image, link, ... }.
 * CMS items get ids "u-<slug>" (updates) and "e-<slug>" (events), so /news-event/<id> can tell
 * them apart from the website's built-in items.
 */

const DEFAULT_IMAGE = '/campus/main-academic-building.webp';

const UPDATE_LABELS = {
    news: { label: 'NEWS', category: 'News', color: 'border-blue-600' },
    notice: { label: 'NOTICES', category: 'Notices', color: 'border-sky-600' },
    achievement: { label: 'STORY', category: 'Stories', color: 'border-purple-600' },
};

const readTime = (text) => `${Math.max(2, Math.round(text.split(' ').length / 200))} MIN READ`;

const firstWords = (text, max = 180) => (text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text);

const toAttachments = (documents = [], legacy = []) => [
    ...documents
        .filter((doc) => doc && typeof doc === 'object')
        .map((doc) => ({ name: doc.title, size: 'PDF', url: safeUrl(doc.url || doc.legacyUrl) })),
    ...legacy.map((doc) => ({ name: doc.label, size: 'PDF', url: safeUrl(doc.url) })),
].filter((file) => file.url);

export const updateToNewsItem = (update) => {
    const text = richTextToPlain(update.body);
    const kind = UPDATE_LABELS[update.type] || UPDATE_LABELS.news;
    const id = `u-${update.slug}`;
    const external = safeUrl(update.externalLink);
    return {
        id,
        ...kind,
        title: update.title,
        summary: update.excerpt || firstWords(text) || update.title,
        date: formatCmsDate(update.publicationDate),
        readTime: readTime(text),
        image: mediaUrl(update.thumbnail) || DEFAULT_IMAGE,
        bgImage: mediaUrl(update.thumbnail) || DEFAULT_IMAGE,
        link: `/news-event/${id}`,
        richText: update.body || null,
        attachments: toAttachments(update.attachments, update.legacyAttachments),
        links: external ? [{ name: 'Read more', url: external }] : [],
    };
};

export const eventToNewsItem = (event) => {
    const text = richTextToPlain(event.body);
    const id = `e-${event.slug}`;
    const image =
        mediaUrl(event.gallery?.[0]?.image) || safeUrl(event.legacyImages?.[0]?.url) || DEFAULT_IMAGE;
    const registration = safeUrl(event.registrationUrl);
    return {
        id,
        label: 'EVENT',
        category: 'Events',
        color: 'border-emerald-500',
        title: event.title,
        summary: event.summary || firstWords(text) || event.title,
        date: formatCmsDate(event.startsAt),
        readTime: readTime(text || event.summary || ''),
        image,
        bgImage: image,
        link: `/news-event/${id}`,
        richText: event.body || null,
        attachments: toAttachments(event.reports, event.legacyReports),
        links: registration ? [{ name: 'Register / official event page', url: registration }] : [],
    };
};

const LIST_LIMIT = 100;

// All published CMS updates and events, newest first; null while loading or if the CMS has none.
export const useCmsNews = () => {
    const updates = useCms(
        `updates?${PUBLISHED}&depth=1&limit=${LIST_LIMIT}&sort=-publicationDate`,
        (json) => json.docs.map(updateToNewsItem),
        [],
    );
    const events = useCms(
        `events?${PUBLISHED}&depth=1&limit=${LIST_LIMIT}&sort=-startsAt`,
        (json) => json.docs.map(eventToNewsItem),
        [],
    );
    return [...updates, ...events];
};

export const isCmsNewsId = (id) => /^[ue]-/.test(String(id || ''));

// One CMS update or event for /news-event/:id. undefined while loading, false if not found.
export const useCmsNewsItem = (id) => {
    const isCms = isCmsNewsId(id);
    const slug = isCms ? encodeURIComponent(String(id).slice(2)) : '';
    const collection = String(id).startsWith('e-') ? 'events' : 'updates';
    return useCms(
        isCms ? `${collection}?${PUBLISHED}&where[slug][equals]=${slug}&depth=1&limit=1` : null,
        (json) => {
            const doc = json.docs[0];
            if (!doc) return false;
            return collection === 'events' ? eventToNewsItem(doc) : updateToNewsItem(doc);
        },
        undefined,
    );
};

// Site Settings announcements as { title, url }; the website's own list until the CMS answers.
export const useCmsAnnouncements = (fallback) =>
    useCms(
        'globals/site-settings?depth=1',
        (json) => {
            const items = (json.announcements || []).map((item) => ({ title: item.message, url: linkUrl(item) }));
            return items.length ? items : null;
        },
        fallback,
    );
