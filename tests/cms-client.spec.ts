import { describe, expect, it } from 'vitest';

import { formatCmsDate, linkUrl, mediaUrl, richTextToPlain, safeUrl } from '@/website/cms/client';

describe('CMS link and media safety', () => {
    it('allows web, mail, phone and same-site links', () => {
        expect(safeUrl('https://msit.in/about')).toBe('https://msit.in/about');
        expect(safeUrl('mailto:hello@msit.in')).toBe('mailto:hello@msit.in');
        expect(safeUrl('tel:+911145037193')).toBe('tel:+911145037193');
        expect(safeUrl('/faculty')).toBe('/faculty');
    });

    it('rejects scripts and protocol-relative links', () => {
        expect(safeUrl('javascript:alert(1)')).toBeNull();
        expect(safeUrl('//evil.example')).toBeNull();
        expect(safeUrl(null)).toBeNull();
    });

    it('reads a media URL only from an object', () => {
        expect(mediaUrl({ url: '/media/photo.jpg' })).toBe('/media/photo.jpg');
        expect(mediaUrl('/media/photo.jpg')).toBeNull();
    });

    it('resolves every supported CMS link destination', () => {
        expect(linkUrl({ destinationType: 'page', page: { slug: 'about' } })).toBe('/about');
        expect(linkUrl({ destinationType: 'internal-path', internalPath: '/contact' })).toBe('/contact');
        expect(linkUrl({ destinationType: 'external-url', externalUrl: 'https://msit.in' })).toBe(
            'https://msit.in',
        );
        expect(
            linkUrl({ destinationType: 'document', document: { url: '/documents/report.pdf' } }),
        ).toBe('/documents/report.pdf');
        expect(linkUrl({ destinationType: 'external-url', externalUrl: 'javascript:alert(1)' })).toBeNull();
        expect(linkUrl(null)).toBeNull();
    });
});

describe('CMS formatting', () => {
    it('formats publication dates in the site style', () => {
        expect(formatCmsDate('2026-04-10T00:00:00.000Z')).toBe('APR 10, 2026');
        expect(formatCmsDate(null)).toBe('');
    });

    it('flattens Lexical rich text into plain text', () => {
        const value = {
            root: {
                children: [
                    { text: 'Hello', type: 'text' },
                    { type: 'paragraph' },
                    { text: 'world', type: 'text' },
                ],
            },
        };
        expect(richTextToPlain(value)).toBe('Hello world');
    });
});
