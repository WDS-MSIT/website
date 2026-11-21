import type { Announcement, NewsAttachment, NewsItem } from '../types';
import {
    formatCmsDate,
    linkUrl,
    mediaUrl,
    PUBLISHED,
    richTextToPlain,
    safeUrl,
    useCms,
    useCmsResource,
    type CmsListResponse,
    type CmsResource,
} from './client';

/*
 * CMS Updates (news, notices, achievements) and Events, in the shape the website's news list and
 * news page use: { id, label, category, title, summary, date, readTime, image, link, ... }.
 * CMS items get ids "u-<slug>" (updates) and "e-<slug>" (events), so /news-event/<id> can tell
 * them apart from the website's built-in items.
 */

const DEFAULT_IMAGE = '/campus/main-academic-building.webp';

const UPDATE_LABELS: Record<string, { label: string; category: string; color: string }> = {
    news: { label: 'NEWS', category: 'News', color: 'border-blue-600' },
    notice: { label: 'NOTICES', category: 'Notices', color: 'border-sky-600' },
    achievement: { label: 'STORY', category: 'Stories', color: 'border-purple-600' },
};

const readTime = (text: string): string => `${Math.max(2, Math.round(text.split(' ').length / 200))} MIN READ`;

const firstWords = (text: string, max = 180): string =>
    text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, '')}…` : text;

type CmsDocument = {
    legacyUrl?: string;
    title?: string;
    url?: string;
};

type CmsLegacyDocument = {
    label?: string;
    url?: string;
};

const toAttachments = (
    documents: unknown[] = [],
    legacy: unknown[] = [],
): NewsAttachment[] => {
    const fromDocuments = documents
        .filter((doc): doc is CmsDocument => Boolean(doc) && typeof doc === 'object')
        .flatMap((doc): NewsAttachment[] => {
            const url = safeUrl(doc.url || doc.legacyUrl);
            return url ? [{ name: doc.title, size: 'PDF', url }] : [];
        });
    const fromLegacy = legacy
        .filter((doc): doc is CmsLegacyDocument => Boolean(doc) && typeof doc === 'object')
        .flatMap((doc): NewsAttachment[] => {
            const url = safeUrl(doc.url);
            return url ? [{ name: doc.label, size: 'PDF', url }] : [];
        });
    return [...fromDocuments, ...fromLegacy];
};

type CmsUpdate = {
    body?: unknown;
    excerpt?: string;
    externalLink?: string;
    legacyAttachments?: unknown[];
    publicationDate?: string;
    slug: string;
    thumbnail?: unknown;
    title: string;
    type?: string;
    attachments?: unknown[];
};

export const updateToNewsItem = (update: CmsUpdate): NewsItem => {
    const text = richTextToPlain(update.body);
    const kind = UPDATE_LABELS[update.type || 'news'] || UPDATE_LABELS.news;
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

type CmsEvent = {
    body?: unknown;
    gallery?: Array<{ image?: unknown }>;
    legacyImages?: Array<{ url?: string }>;
    legacyReports?: unknown[];
    registrationUrl?: string;
    reports?: unknown[];
    slug: string;
    startsAt?: string;
    summary?: string;
    title: string;
};

export const eventToNewsItem = (event: CmsEvent): NewsItem => {
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

// All published CMS updates and events, newest first, with an explicit load state.
export const useCmsNewsResource = (): CmsResource<NewsItem[]> => {
    const updates = useCmsResource<NewsItem[]>(
        `updates?${PUBLISHED}&depth=1&limit=${LIST_LIMIT}&sort=-publicationDate`,
        (json) => (json as CmsListResponse<CmsUpdate>).docs.map(updateToNewsItem),
        [],
    );
    const events = useCmsResource<NewsItem[]>(
        `events?${PUBLISHED}&depth=1&limit=${LIST_LIMIT}&sort=-startsAt`,
        (json) => (json as CmsListResponse<CmsEvent>).docs.map(eventToNewsItem),
        [],
    );
    const status =
        updates.status === 'unavailable' || events.status === 'unavailable'
            ? 'unavailable'
            : updates.status === 'loading' || events.status === 'loading'
              ? 'loading'
              : 'ready';
    return { data: [...updates.data, ...events.data], status };
};

export const useCmsNews = (): NewsItem[] => useCmsNewsResource().data;

export const isCmsNewsId = (id: unknown): boolean => /^[ue]-/.test(String(id || ''));

// One CMS update or event for /news-event/:id. undefined while loading, false if not found.
export const useCmsNewsItem = (id: string | undefined): NewsItem | false | undefined => {
    const isCms = isCmsNewsId(id);
    const slug = isCms ? encodeURIComponent(String(id).slice(2)) : '';
    const collection = String(id).startsWith('e-') ? 'events' : 'updates';
    return useCms<NewsItem | false | undefined>(
        isCms ? `${collection}?${PUBLISHED}&where[slug][equals]=${slug}&depth=1&limit=1` : null,
        (json) => {
            const doc = (json as CmsListResponse<CmsUpdate & CmsEvent>).docs[0];
            if (!doc) return false;
            return collection === 'events' ? eventToNewsItem(doc) : updateToNewsItem(doc);
        },
        undefined,
    );
};

type CmsSiteSettings = {
    announcements?: Array<{
        destinationType?: string;
        document?: unknown;
        externalUrl?: string;
        internalPath?: string;
        message?: string;
        page?: unknown;
    }>;
};

// Site Settings announcements as { title, url }; the design's list only while loading or on failure.
export const useCmsAnnouncements = (fallback: Announcement[]): Announcement[] =>
    useCmsResource<Announcement[]>(
        'globals/site-settings?depth=1',
        (json) =>
            ((json as CmsSiteSettings).announcements || [])
                .map((item) => ({ title: item.message || '', url: linkUrl(item) }))
                .filter((item) => item.title),
        fallback,
    ).data;
