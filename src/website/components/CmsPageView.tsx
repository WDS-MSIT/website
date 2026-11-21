import type { Page } from '@/payload-types';

import PageHero from './PageHero';
import SEO from './SEO';
import { CmsPageBlocks } from './CmsPageBlocks';

export const CmsPageView = ({ page }: { page: Page }) => (
    <main className="min-h-screen bg-white">
        <SEO
            title={page.title}
            description={page.summary || undefined}
            canonicalPath={`/${page.slug}`}
        />
        <PageHero
            title={page.title}
            description={page.summary || undefined}
            breadcrumbs={[{ label: page.title }]}
            heroImage="/campus-hero.webp"
            heroImageAlt={page.title}
        />
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            {page.content?.length ? <CmsPageBlocks blocks={page.content} /> : null}
        </section>
    </main>
);
