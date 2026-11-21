import type { ComponentType } from 'react';

/** A file attached to a CMS update, event or hard-coded article. */
export type NewsAttachment = {
    name?: string;
    size?: string;
    url: string;
};

/** A related link shown beside a news article or event. */
export type NewsLink = {
    name: string;
    url: string;
};

/** The shape the website's news lists and article page use. */
export type NewsItem = {
    id: string;
    label: string;
    category: string;
    color: string;
    title: string;
    summary: string;
    date: string;
    readTime: string;
    image: string;
    bgImage: string;
    link: string;
    richText: unknown | null;
    attachments: NewsAttachment[];
    links: NewsLink[];
};

/** One item in the Site Settings announcements ticker. */
export type Announcement = {
    title: string;
    url: string | null;
};

/** One row in the Faculty & Staff directory. */
export type FacultyMember = {
    id?: string;
    name: string;
    role?: string;
    dept?: string;
    email?: string;
    phone?: string;
    img?: string;
    bio?: string;
    qual?: string;
    qualifications?: string;
    experience?: string;
    goodAt?: string[];
    researchInterests?: string[];
    coursesTaught?: string[];
    otherWebsites?: Array<{ label?: string; url?: string; type?: string }>;
    linkedin?: string;
    github?: string;
    website?: string;
    personalWebsite?: string;
    googleScholar?: string;
    researchGate?: string;
    vidwanId?: string;
    scopusId?: string;
    orcidId?: string;
    mobile?: string;
    landline?: string;
    phoneStatus?: string;
    publications?: string;
    patents?: string;
    pdfLink?: string;
    [key: string]: unknown;
};

/** A year-wise placement report link. */
export type PlacementRecord = {
    year: string;
    link: string;
};

/** One figure in the placement key-figures strip. */
export type KeyFigure = {
    value: string;
    label: string;
    note?: string;
    url?: string;
    link?: string;
    [key: string]: unknown;
};

/** A Payload society document, kept permissive while the website's shape is wider. */
export type SocietyRecord = Record<string, any>;

/** The website's hard-coded society profile, overlaid with CMS fields. */
export type SocietyProfile = Record<string, any>;

/** One entry in the societies hub directory. */
export type SocietyListItem = {
    id: string;
    name: string;
    shortName?: string;
    category?: string;
    tagline?: string;
    description?: string;
    established?: string;
    members?: string;
    link: string;
    logo?: string;
    featured?: boolean;
    [key: string]: unknown;
};

/** Sidebar/hero statistic on a dynamic page. */
export type PageStat = {
    label: string;
    value: string;
    link?: string;
    url?: string;
    desc?: string;
};

/** One expandable highlight in a dynamic page sidebar. */
export type PageBulletPoint =
    | string
    | {
          label: string;
          detail?: string;
          url?: string;
          actionText?: string;
      };

/** One FAQ entry on a dynamic page. */
export type PageFaq = {
    q: string;
    a: string;
};

/** A hard-coded page entry in src/website/data/pagesData.ts. */
export type PageData = {
    title: string;
    subtitle?: string;
    seo_description?: string;
    category?: string;
    heroImage?: string;
    heroImageAlt?: string;
    content?: string;
    stats?: PageStat[];
    bulletPoints?: PageBulletPoint[];
    faqs?: PageFaq[];
    sidebarHtml?: string;
    layout?: 'full' | string;
    statsStrip?: boolean;
    component?: ComponentType;
    [key: string]: unknown;
};

/** A Payload list response with the parts the website reads. */
export type CmsListResponse<T = Record<string, unknown>> = {
    docs: T[];
    totalDocs?: number;
    [key: string]: unknown;
};
