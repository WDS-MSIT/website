import { useEffect, useState } from 'react';

/*
 * Reads content from this site's own CMS (Payload REST API at /api), so editors' changes in /admin
 * show on the website. Every hook starts with the website's built-in content and switches to CMS
 * content once it arrives; if the CMS is empty or unreachable, the built-in content stays.
 */

const requests = new Map();

// Published records only, read as a visitor: no cookies, so an editor signed in to /admin sees
// what the public sees, not their drafts.
export const fetchCms = (path) => {
    if (!requests.has(path)) {
        requests.set(
            path,
            fetch(`/api/${path}`, { credentials: 'omit' })
                .then((response) => (response.ok ? response.json() : null))
                .catch(() => null),
        );
    }
    return requests.get(path);
};

// `map` turns the CMS response into the website's shape; returning null keeps the fallback.
export const useCms = (path, map, fallback) => {
    const [data, setData] = useState(fallback);
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
export const formatCmsDate = (iso) =>
    iso
        ? new Date(iso)
              .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'Asia/Kolkata' })
              .toUpperCase()
        : '';

// Only web, mail, phone and same-site links are followed.
export const safeUrl = (url) => (url && /^(https?:\/\/|mailto:|tel:|\/(?!\/))/i.test(url) ? url : null);

export const mediaUrl = (media) => safeUrl(media && typeof media === 'object' ? media.url : null);

// Destination of a CMS link field group (destinationType + page / internalPath / externalUrl / document).
export const linkUrl = (link) => {
    if (!link) return null;
    switch (link.destinationType) {
        case 'external-url':
            return safeUrl(link.externalUrl);
        case 'internal-path':
            return safeUrl(link.internalPath);
        case 'page':
            return link.page && typeof link.page === 'object' && link.page.slug ? `/${link.page.slug}` : null;
        case 'document':
            return link.document && typeof link.document === 'object'
                ? safeUrl(link.document.url || link.document.legacyUrl)
                : null;
        default:
            return null;
    }
};

// Plain text of a CMS rich text value, for summaries and search.
export const richTextToPlain = (value) => {
    const parts = [];
    const walk = (node) => {
        if (!node) return;
        if (typeof node.text === 'string') parts.push(node.text);
        (node.children || []).forEach(walk);
        if (node.type === 'paragraph' || node.type === 'heading') parts.push(' ');
    };
    walk(value?.root);
    return parts.join('').replace(/\s+/g, ' ').trim();
};

export const normalizeName = (value) =>
    (value || '')
        .toLowerCase()
        .replace(/\b(prof|dr|mr|mrs|ms)\b\.?/g, '')
        .replace(/[^a-z]/g, '');
