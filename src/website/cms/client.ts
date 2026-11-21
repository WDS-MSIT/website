import { useEffect, useState } from 'react';

import type { CmsListResponse } from '../types';

/*
 * Reads content from this site's own CMS (Payload REST API at /api), so editors' changes in /admin
 * show on the website. Every hook starts with the website's built-in content and switches to CMS
 * content once it arrives; if the CMS is empty or unreachable, the built-in content stays.
 */

/** A Payload response; list endpoints add `docs`, globals do not. */
export type CmsResponse = Record<string, unknown>;

const requests = new Map<string, Promise<CmsResponse | null>>();

// Published records only, read as a visitor: no cookies, so an editor signed in to /admin sees
// what the public sees, not their drafts.
export const fetchCms = (path: string): Promise<CmsResponse | null> => {
    if (!requests.has(path)) {
        requests.set(
            path,
            fetch(`/api/${path}`, { credentials: 'omit' })
                .then((response) => (response.ok ? (response.json() as Promise<CmsResponse>) : null))
                .catch(() => null),
        );
    }
    return requests.get(path) as Promise<CmsResponse | null>;
};

export type CmsStatus = 'loading' | 'ready' | 'unavailable';

export type CmsResource<T> = {
    data: T;
    status: CmsStatus;
};

/**
 * CMS-authoritative read.
 *
 * `data` is the fallback only while loading or when the request fails. Once the CMS answers,
 * `data` is exactly what the CMS returned, including an empty array or object. This is the
 * difference between "the editor has not filled this in yet" and "the CMS is down".
 */
export const useCmsResource = <T,>(
    path: string | null,
    map: (json: CmsResponse) => T,
    fallback: T,
): CmsResource<T> => {
    const [resource, setResource] = useState<CmsResource<T>>({
        data: fallback,
        status: path ? 'loading' : 'ready',
    });

    useEffect(() => {
        if (!path) {
            setResource({ data: fallback, status: 'ready' });
            return undefined;
        }

        let live = true;
        setResource((current) => ({ data: current.data, status: 'loading' }));

        fetchCms(path).then((json) => {
            if (!live) return;
            if (!json) {
                setResource({ data: fallback, status: 'unavailable' });
                return;
            }
            try {
                setResource({ data: map(json), status: 'ready' });
            } catch {
                setResource({ data: fallback, status: 'unavailable' });
            }
        });

        return () => {
            live = false;
        };
        // `map` and `fallback` are fixed per call site; only the path decides what to load.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    return resource;
};

// `map` turns the CMS response into the website's shape; returning null keeps the fallback.
// Kept for the existing hooks while each area moves to `useCmsResource`.
export const useCms = <T,>(
    path: string | null,
    map: (json: CmsResponse) => T | null,
    fallback: T,
): T => {
    const [data, setData] = useState<T>(fallback);
    useEffect(() => {
        if (!path) return undefined;
        let live = true;
        fetchCms(path).then((json) => {
            if (!live || !json) return;
            const mapped = map(json);
            if (mapped != null) setData(mapped);
        });
        return () => {
            live = false;
        };
        // `map` and `fallback` are fixed per call site; only the path decides what to load.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);
    return data;
};

export const PUBLISHED = 'where[_status][equals]=published';

// "APR 10, 2026", the date style the website uses.
export const formatCmsDate = (iso: string | null | undefined): string =>
    iso
        ? new Date(iso)
              .toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                  timeZone: 'Asia/Kolkata',
              })
              .toUpperCase()
        : '';

// Only web, mail, phone and same-site links are followed.
export const safeUrl = (url: unknown): string | null =>
    typeof url === 'string' && /^(https?:\/\/|mailto:|tel:|\/(?!\/))/i.test(url) ? url : null;

export const mediaUrl = (media: unknown): string | null =>
    media && typeof media === 'object' ? safeUrl((media as { url?: unknown }).url) : null;

type CmsLink = {
    destinationType?: string;
    document?: unknown;
    externalUrl?: string | null;
    internalPath?: string | null;
    page?: unknown;
};

// Destination of a CMS link field group (destinationType + page / internalPath / externalUrl / document).
export const linkUrl = (link: CmsLink | null | undefined): string | null => {
    if (!link) return null;
    switch (link.destinationType) {
        case 'external-url':
            return safeUrl(link.externalUrl);
        case 'internal-path':
            return safeUrl(link.internalPath);
        case 'page': {
            const page = link.page;
            return page && typeof page === 'object' && typeof (page as { slug?: unknown }).slug === 'string'
                ? `/${(page as { slug: string }).slug}`
                : null;
        }
        case 'document': {
            const document = link.document;
            if (!document || typeof document !== 'object') return null;
            const doc = document as { legacyUrl?: unknown; url?: unknown };
            return safeUrl(doc.url || doc.legacyUrl);
        }
        default:
            return null;
    }
};

type RichTextNode = {
    children?: RichTextNode[];
    text?: string;
    type?: string;
};

// Plain text of a CMS rich text value, for summaries and search.
export const richTextToPlain = (value: unknown): string => {
    const parts: string[] = [];
    const walk = (node: RichTextNode | null | undefined) => {
        if (!node) return;
        if (typeof node.text === 'string') parts.push(node.text);
        (node.children || []).forEach(walk);
        if (node.type === 'paragraph' || node.type === 'heading') parts.push(' ');
    };
    walk((value as { root?: RichTextNode } | null | undefined)?.root);
    return parts.join('').replace(/\s+/g, ' ').trim();
};

export const normalizeName = (value: unknown): string =>
    (typeof value === 'string' ? value : '')
        .toLowerCase()
        .replace(/\b(prof|dr|mr|mrs|ms)\b\.?/g, '')
        .replace(/[^a-z]/g, '');

export type { CmsListResponse };
