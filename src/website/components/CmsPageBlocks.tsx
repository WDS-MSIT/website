import { RichText } from '@payloadcms/richtext-lexical/react';
import { Link } from 'react-router-dom';

import type { Page } from '@/payload-types';

import { linkUrl, mediaUrl, safeUrl } from '../cms/client';

type Blocks = NonNullable<Page['content']>;

const safeBlocks = (blocks: Blocks) => blocks.filter((block) => Boolean(block && block.blockType));

const Callout = ({ block }: { block: Extract<Blocks[number], { blockType: 'callout' }> }) => {
    const tone =
        block.tone === 'important'
            ? 'border-rose-300 bg-rose-50 text-rose-950'
            : block.tone === 'information'
              ? 'border-sky-300 bg-sky-50 text-sky-950'
              : 'border-slate-200 bg-slate-50 text-slate-900';
    return (
        <section className={`rounded-2xl border p-6 sm:p-8 ${tone}`}>
            {block.heading ? <h2 className="mb-3 text-xl font-bold">{block.heading}</h2> : null}
            <div className="prose prose-sm sm:prose-base max-w-none">
                <RichText data={block.body as any} />
            </div>
        </section>
    );
};

const LinkList = ({ block }: { block: Extract<Blocks[number], { blockType: 'link-list' }> }) => (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        {block.heading ? <h2 className="mb-4 text-xl font-bold text-slate-900">{block.heading}</h2> : null}
        <ul className="divide-y divide-slate-100">
            {block.links.map((link, index) => {
                const url = linkUrl(link);
                if (!url) return null;
                const external = /^https?:\/\//i.test(url) || Boolean(link.openInNewTab);
                return (
                    <li key={link.id || `${url}-${index}`}>
                        {external ? (
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-4 py-3 text-sm font-semibold text-slate-700 hover:text-primary"
                            >
                                {link.label}
                                <span aria-hidden="true">↗</span>
                            </a>
                        ) : (
                            <Link
                                to={url}
                                className="flex items-center justify-between gap-4 py-3 text-sm font-semibold text-slate-700 hover:text-primary"
                            >
                                {link.label}
                                <span aria-hidden="true">→</span>
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    </section>
);

const DocumentList = ({ block }: { block: Extract<Blocks[number], { blockType: 'document-list' }> }) => {
    const documents = (block.documents || [])
        .filter((doc): doc is Exclude<typeof doc, number> => Boolean(doc) && typeof doc === 'object')
        .map((doc) => ({ label: doc.title, url: safeUrl(doc.url || doc.legacyUrl) }))
        .filter((doc): doc is { label: string; url: string } => Boolean(doc.url));
    const legacy = (block.legacyDocuments || [])
        .map((doc) => ({ label: doc.label, url: safeUrl(doc.url) }))
        .filter((doc): doc is { label: string; url: string } => Boolean(doc.url));
    const files = [...documents, ...legacy];

    if (!files.length) return null;

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            {block.heading ? <h2 className="mb-4 text-xl font-bold text-slate-900">{block.heading}</h2> : null}
            <ul className="space-y-3">
                {files.map((file) => (
                    <li key={`${file.label}-${file.url}`}>
                        <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-primary/30 hover:text-primary"
                        >
                            {file.label}
                            <span aria-hidden="true">↓</span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
};

const Media = ({ block }: { block: Extract<Blocks[number], { blockType: 'media' }> }) => {
    const src = mediaUrl(block.image) || safeUrl(block.legacyImageUrl);
    if (!src) return null;
    return (
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <img src={src} alt={block.caption || ''} className="w-full object-cover" />
            {block.caption ? (
                <figcaption className="px-4 py-3 text-xs font-medium text-slate-500">{block.caption}</figcaption>
            ) : null}
        </figure>
    );
};

const Table = ({ block }: { block: Extract<Blocks[number], { blockType: 'table' }> }) => (
    <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm text-slate-700">
            {block.caption ? (
                <caption className="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {block.caption}
                </caption>
            ) : null}
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600">
                <tr>
                    {block.columns.map((column, index) => (
                        <th key={column.id || `${column.heading}-${index}`} scope="col" className="px-4 py-3 font-bold">
                            {column.heading}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {block.rows.map((row, rowIndex) => (
                    <tr key={row.id || `row-${rowIndex}`}>
                        {block.columns.map((column, columnIndex) => (
                            <td key={`${column.id || column.heading}-${columnIndex}`} className="px-4 py-3">
                                {row.cells[columnIndex]?.value || null}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
);

const Embed = ({ block }: { block: Extract<Blocks[number], { blockType: 'embed' }> }) => {
    const url = safeUrl(block.url);
    if (!url) return null;
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <iframe
                src={url}
                title={block.title}
                className="h-[360px] w-full border-0 sm:h-[460px]"
                loading="lazy"
                allowFullScreen
            />
        </section>
    );
};

export const CmsPageBlocks = ({ blocks }: { blocks: Blocks }) => (
    <div className="space-y-8">
        {safeBlocks(blocks).map((block, index) => {
            const key = block.id || `${block.blockType}-${index}`;
            switch (block.blockType) {
                case 'rich-text':
                    return (
                        <section key={key} className="prose prose-sm sm:prose-lg max-w-none text-slate-700">
                            <RichText data={block.body as any} />
                        </section>
                    );
                case 'callout':
                    return <Callout block={block} key={key} />;
                case 'link-list':
                    return <LinkList block={block} key={key} />;
                case 'document-list':
                    return <DocumentList block={block} key={key} />;
                case 'media':
                    return <Media block={block} key={key} />;
                case 'table':
                    return <Table block={block} key={key} />;
                case 'embed':
                    return <Embed block={block} key={key} />;
                default:
                    return null;
            }
        })}
    </div>
);
