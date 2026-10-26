#!/usr/bin/env node
// Content-inventory crawler.
//
// Usage:
//   npm i cheerio
//   node crawl.mjs https://college.example.edu [--max 2000] [--delay 200] [--concurrency 4] [--out inventory]
//
// Outputs:
//   <out>.csv           every internal page/file found (url, depth, parent, status, title, h1, ...)
//   <out>-external.csv  every external link and the pages it was found on
//   <out>-patterns.csv  URLs grouped by shape, e.g. /cse/faculty/*  (the useful one)
//   <out>-templates.csv shapes that repeat across top-level sections, e.g. /{section}/faculty/*
//                       -> the number of sections is roughly your department count

import * as cheerio from 'cheerio';
import fs from 'node:fs';

// ---------- args ----------
const args = process.argv.slice(2);
const startArg = args.find((a, i) => !a.startsWith('--') && !(args[i - 1] || '').startsWith('--'));
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
if (!startArg) {
  console.error('Usage: node crawl.mjs <start-url> [--max 2000] [--delay 200] [--concurrency 4] [--out inventory]');
  process.exit(1);
}
const MAX = Number(opt('max', 2000));
const DELAY = Number(opt('delay', 200));
const CONC = Number(opt('concurrency', 4));
const OUT = opt('out', 'inventory');

const start = new URL(startArg);
const hostKey = (h) => h.toLowerCase().replace(/^www\./, '');
const ROOT = hostKey(start.hostname);
const FILE_EXT = /\.(pdf|docx?|xlsx?|pptx?|zip|rar|csv|txt|jpe?g|png|gif|webp|svg|mp4|mp3)$/i;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- state ----------
const seen = new Set();
const queue = [];
const rows = [];
const externals = new Map(); // url -> Set(pages it was found on)
let fetched = 0;
let active = 0;

function normalize(href, base) {
  let u;
  try {
    u = new URL(href, base);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(u.protocol)) return null; // skips mailto:, tel:, javascript:
  u.hash = '';
  if (u.pathname.length > 1) u.pathname = u.pathname.replace(/\/+$/, '');
  return u.href;
}

function enqueue(url, depth, parent) {
  if (seen.has(url)) return;
  seen.add(url);
  queue.push({ url, depth, parent });
}

function addExternal(url, foundOn) {
  if (!externals.has(url)) externals.set(url, new Set());
  externals.get(url).add(foundOn);
}

// ---------- sitemap seeding ----------
async function loadSitemap(url, level = 0) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'content-inventory-crawler/1.0' } });
    if (!res.ok) return 0;
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
    let n = 0;
    for (const loc of locs) {
      if (/\.xml(\.gz)?$/i.test(loc) && level < 2) {
        n += await loadSitemap(loc, level + 1); // sitemap index
      } else {
        const norm = normalize(loc, url);
        if (norm && hostKey(new URL(norm).hostname) === ROOT) {
          enqueue(norm, 0, 'sitemap');
          n++;
        }
      }
    }
    return n;
  } catch {
    return 0;
  }
}

// ---------- crawl one URL ----------
async function processItem({ url, depth, parent }) {
  const row = {
    url, depth, parent, kind: '', status: '', content_type: '',
    title: '', h1: '', out_links: 0, redirected_to: '',
  };
  rows.push(row);

  if (FILE_EXT.test(new URL(url).pathname)) {
    row.kind = 'file';
    return;
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: { 'user-agent': 'content-inventory-crawler/1.0', accept: 'text/html,*/*;q=0.5' },
    });
    row.status = res.status;
    row.content_type = (res.headers.get('content-type') || '').split(';')[0];

    const finalUrl = normalize(res.url, url) || url;
    if (finalUrl !== url) {
      row.redirected_to = finalUrl;
      seen.add(finalUrl);
    }
    if (hostKey(new URL(finalUrl).hostname) !== ROOT) {
      row.kind = 'redirect-external';
      addExternal(finalUrl, url);
      await res.body?.cancel();
      return;
    }
    if (!res.ok) {
      row.kind = 'error';
      await res.body?.cancel();
      return;
    }
    if (!row.content_type.includes('html')) {
      row.kind = 'file';
      await res.body?.cancel();
      return;
    }

    row.kind = 'page';
    const html = await res.text();
    const $ = cheerio.load(html);
    row.title = $('title').first().text().replace(/\s+/g, ' ').trim();
    row.h1 = $('h1').first().text().replace(/\s+/g, ' ').trim();

    $('a[href]').each((_, el) => {
      const link = normalize($(el).attr('href'), finalUrl);
      if (!link) return;
      row.out_links++;
      if (hostKey(new URL(link).hostname) === ROOT) enqueue(link, depth + 1, url);
      else addExternal(link, url);
    });
  } catch (err) {
    row.kind = 'error';
    row.status = err.name === 'AbortError' ? 'timeout' : `fetch-failed: ${err.cause?.code || err.message}`;
  } finally {
    clearTimeout(timer);
  }
}

async function worker() {
  while (true) {
    if (fetched >= MAX) return;
    const item = queue.shift();
    if (!item) {
      if (active === 0) return; // nothing queued, nobody working: done
      await sleep(50);
      continue;
    }
    active++;
    const n = ++fetched;
    try {
      await processItem(item);
    } finally {
      active--;
    }
    if (n % 25 === 0) console.error(`crawled ${n}, queued ${queue.length}`);
    await sleep(DELAY);
  }
}

// ---------- output ----------
const csvCell = (v) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const writeCsv = (file, headers, data) =>
  fs.writeFileSync(file, [headers.join(','), ...data.map((r) => headers.map((h) => csvCell(r[h])).join(','))].join('\n'));

// Group URLs by shape. A folder with 5+ children gets its last segment collapsed to *,
// and pure-number segments become #. So /cse/faculty/dr-rao -> /cse/faculty/*.
// If /cse/faculty qualified, /ece/faculty collapses too (even with 2 children),
// because it has the same shape: /{section}/faculty.
const parentOf = (p) => p.split('/').slice(0, -1).join('/');
const shapeOf = (p) => {
  const s = p.split('/');
  if (s.length >= 3) s[1] = '{section}';
  return s.join('/');
};

function patternRows(items) {
  const paths = items.map((r) => new URL(r.redirected_to || r.url).pathname);
  const siblings = new Map();
  for (const p of paths) siblings.set(parentOf(p), (siblings.get(parentOf(p)) || 0) + 1);
  const bigShapes = new Set();
  for (const [parent, n] of siblings) if (n >= 5 && parent.split('/').length >= 3) bigShapes.add(shapeOf(parent));

  const groups = new Map();
  items.forEach((r, i) => {
    const p = paths[i];
    const segs = p.split('/');
    const parent = parentOf(p);
    if (p !== '/' && (siblings.get(parent) >= 5 || bigShapes.has(shapeOf(parent)))) segs[segs.length - 1] = '*';
    const pattern = (segs.join('/').replace(/\/\d+(?=\/|$)/g, '/#') || '/') + (r.kind === 'file' ? '  [file]' : '');
    const g = groups.get(pattern) || { pattern, count: 0, example_url: r.url, example_title: r.title };
    g.count++;
    groups.set(pattern, g);
  });
  return [...groups.values()].sort((a, b) => b.count - a.count);
}

// Which patterns repeat across top-level sections (departments, cells, ...)?
// /cse/faculty/* + /ece/faculty/* -> /{section}/faculty/*  (2 sections)
// /cse/labs + /me/labs            -> /{section}/labs       (2 sections)
function templateRows(patternList) {
  const t = new Map();
  for (const g of patternList) {
    const isFile = g.pattern.endsWith('[file]');
    const base = g.pattern.replace(/\s+\[file\]$/, '');
    if (base.split('/').length < 3) continue;
    const key = shapeOf(base) + (isFile ? '  [file]' : '');
    const e = t.get(key) || { template: key, sections: new Set(), urls: 0 };
    e.sections.add(base.split('/')[1]);
    e.urls += g.count;
    t.set(key, e);
  }
  return [...t.values()]
    .filter((e) => e.sections.size >= 2)
    .map((e) => ({ template: e.template, sections: e.sections.size, urls: e.urls, section_names: [...e.sections].join('; ') }))
    .sort((a, b) => b.sections - a.sections || b.urls - a.urls);
}

// ---------- main ----------
const seeded = await loadSitemap(new URL('/sitemap.xml', start).href);
console.error(seeded ? `sitemap: seeded ${seeded} URLs` : 'sitemap: none found, crawling from links only');
enqueue(normalize(start.href, start.href), 0, '');

await Promise.all(Array.from({ length: CONC }, worker));

const internal = rows.filter((r) => r.kind === 'page' || r.kind === 'file');
writeCsv(`${OUT}.csv`, ['url', 'kind', 'status', 'content_type', 'title', 'h1', 'depth', 'parent', 'out_links', 'redirected_to'], rows);
writeCsv(
  `${OUT}-external.csv`,
  ['url', 'domain', 'times_linked', 'first_found_on'],
  [...externals].map(([url, pages]) => ({
    url, domain: new URL(url).hostname, times_linked: pages.size, first_found_on: [...pages][0],
  })).sort((a, b) => b.times_linked - a.times_linked),
);
const patterns = patternRows(internal);
writeCsv(`${OUT}-patterns.csv`, ['pattern', 'count', 'example_url', 'example_title'], patterns);
const templates = templateRows(patterns);
writeCsv(`${OUT}-templates.csv`, ['template', 'sections', 'urls', 'section_names'], templates);

const errors = rows.filter((r) => r.kind === 'error').length;
console.log(`\nDone. ${rows.length} URLs (${internal.filter((r) => r.kind === 'page').length} pages, ${internal.filter((r) => r.kind === 'file').length} files, ${errors} errors), ${externals.size} external links.`);
if (fetched >= MAX && queue.length) console.log(`Stopped at --max ${MAX}; ${queue.length} URLs were still queued. Raise --max to continue.`);
console.log('\nTop URL patterns:');
for (const g of patterns.slice(0, 30)) console.log(String(g.count).padStart(5), ' ', g.pattern);
if (templates.length) {
  console.log('\nPatterns repeated across sections (each is probably ONE content type):');
  for (const t of templates.slice(0, 20)) {
    const names = t.section_names.split('; ');
    const shown = names.slice(0, 8).join(', ') + (names.length > 8 ? `, +${names.length - 8} more` : '');
    console.log(String(t.urls).padStart(5), ' ', t.template, `  (${t.sections} sections: ${shown})`);
  }
}
console.log(`\nWrote ${OUT}.csv, ${OUT}-external.csv, ${OUT}-patterns.csv, ${OUT}-templates.csv`);
