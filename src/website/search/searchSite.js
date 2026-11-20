import MiniSearch from 'minisearch';
import { searchIndex } from '../data/searchIndex.js';
import { synonyms } from './synonyms.js';

let miniSearchInstance = null;

/**
 * Custom tokenizer:
 * Splits on spaces, hyphens and punctuation.
 * Also indexes compound/joined words (e.g., "anti-ragging" -> ["anti", "ragging", "antiragging"])
 */
function tokenize(text) {
    if (!text || typeof text !== 'string') return [];
    const lower = text.toLowerCase();
    const tokens = lower.split(/[\s,.;:/?!()[\]{}<>_"]+/).filter(Boolean);
    const subTokens = [];

    tokens.forEach(tok => {
        if (tok.includes('-')) {
            const parts = tok.split('-').filter(Boolean);
            subTokens.push(...parts);
            // Add joined form without hyphens
            const joined = parts.join('');
            if (joined && joined !== tok) {
                subTokens.push(joined);
            }
        }
    });

    return Array.from(new Set([...tokens, ...subTokens]));
}

function getMiniSearch() {
    if (miniSearchInstance) return miniSearchInstance;

    miniSearchInstance = new MiniSearch({
        fields: ['title', 'keywords', 'body'],
        storeFields: ['id', 'group', 'raw'],
        tokenize,
        searchOptions: {
            boost: { title: 4, keywords: 3, body: 1 },
            prefix: true,
            fuzzy: (term) => (term.length >= 4 ? 0.2 : 0),
            combineWith: 'AND',
            tokenize
        }
    });

    const docs = [];
    let idCounter = 1;

    // 1. Pages
    searchIndex.pages.forEach(p => {
        docs.push({
            id: idCounter++,
            group: 'pages',
            title: p.title || '',
            keywords: p.keywords || '',
            body: p.body || '',
            raw: p
        });
    });

    // 2. Faculty
    searchIndex.faculty.forEach(f => {
        docs.push({
            id: idCounter++,
            group: 'faculty',
            title: `${f.name} (${f.dept})`,
            keywords: `${f.name} ${f.role} ${f.dept} ${f.keywords || ''}`,
            body: `${f.name} ${f.role} ${f.dept} ${f.email || ''} ${f.qual || ''}`,
            raw: f
        });
    });

    // 3. QA
    searchIndex.qa.forEach(q => {
        docs.push({
            id: idCounter++,
            group: 'qa',
            title: q.q,
            keywords: q.keywords || '',
            body: `${q.q} ${q.a}`,
            raw: q
        });
    });

    // 4. Events
    (searchIndex.events || []).forEach(e => {
        docs.push({
            id: idCounter++,
            group: 'events',
            title: e.title || '',
            keywords: `${e.keywords || ''} ${e.category || ''} ${e.label || ''}`,
            body: `${e.title} ${e.summary || ''}`,
            raw: e
        });
    });

    miniSearchInstance.addAll(docs);
    return miniSearchInstance;
}

/**
 * Expands query string with synonyms
 */
function expandSearchTerms(query) {
    const clean = query.toLowerCase().trim();
    const words = clean.split(/[\s-]+/).filter(Boolean);
    const added = [];

    // Full phrase match
    if (synonyms[clean]) {
        added.push(...synonyms[clean]);
    }

    // Word matches
    words.forEach(w => {
        if (synonyms[w]) {
            added.push(...synonyms[w]);
        }
    });

    // If query has spaces/hyphens (e.g., "anti ragging" -> "antiragging")
    if (words.length > 1) {
        added.push(words.join(''));
    }

    const uniqueExpansions = Array.from(new Set(added.map(t => t.trim()).filter(Boolean)));
    return { clean, words, uniqueExpansions };
}

/**
 * Searches the site and returns { faculty, pages, qa, events }
 */
export function searchSite(query) {
    if (!query || typeof query !== 'string' || !query.trim()) {
        return { faculty: [], pages: [], qa: [], events: [] };
    }

    const miniSearch = getMiniSearch();
    const { clean, words, uniqueExpansions } = expandSearchTerms(query);

    // Primary search on original clean query with AND
    let hits = miniSearch.search(clean, {
        combineWith: 'AND',
        fuzzy: (term) => (term.length >= 4 ? 0.2 : 0),
        prefix: true
    });

    // If no hits with AND, fallback to OR
    if (hits.length === 0 && words.length > 1) {
        hits = miniSearch.search(clean, {
            combineWith: 'OR',
            fuzzy: (term) => (term.length >= 4 ? 0.2 : 0),
            prefix: true
        });
    }

    // Query synonym expansions and merge with lower weight
    if (uniqueExpansions.length > 0) {
        const expansionQuery = uniqueExpansions.join(' ');
        const synonymHits = miniSearch.search(expansionQuery, {
            combineWith: 'OR',
            prefix: true
        });

        const hitMap = new Map();
        hits.forEach(h => hitMap.set(h.id, h));

        synonymHits.forEach(sh => {
            if (!hitMap.has(sh.id)) {
                // Apply a slight penalty so direct matches stay above synonyms
                hitMap.set(sh.id, { ...sh, score: sh.score * 0.85 });
            } else {
                // Boost existing hit that also matched synonyms
                const existing = hitMap.get(sh.id);
                existing.score += sh.score * 0.4;
            }
        });

        hits = Array.from(hitMap.values());
    }

    // Split into groups
    const grouped = {
        faculty: [],
        pages: [],
        qa: [],
        events: []
    };

    hits.forEach(h => {
        if (grouped[h.group]) {
            grouped[h.group].push({
                item: h.raw,
                score: h.score
            });
        }
    });

    // --- Ranking Refinements ---

    // 1. Faculty: Exact full name match ranks #1
    grouped.faculty.sort((a, b) => {
        const aName = (a.item.name || '').toLowerCase();
        const bName = (b.item.name || '').toLowerCase();
        const aExact = aName === clean || aName.replace(/^(dr\.|prof\.|\(dr\.\))\s*/i, '') === clean;
        const bExact = bName === clean || bName.replace(/^(dr\.|prof\.|\(dr\.\))\s*/i, '') === clean;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;

        // "hod cse" query handling
        if (clean.includes('hod') && clean.includes('cse')) {
            const aIsHodCse = (a.item.role || '').toLowerCase().includes('hod') && (a.item.dept || '').toLowerCase() === 'cse';
            const bIsHodCse = (b.item.role || '').toLowerCase().includes('hod') && (b.item.dept || '').toLowerCase() === 'cse';
            if (aIsHodCse && !bIsHodCse) return -1;
            if (!aIsHodCse && bIsHodCse) return 1;
        }

        return b.score - a.score;
    });

    // 2. Pages: Exact title match first, then facility, section, lab, then whole-page
    grouped.pages.sort((a, b) => {
        const aTitle = (a.item.title || '').toLowerCase();
        const bTitle = (b.item.title || '').toLowerCase();

        const aExact = aTitle === clean;
        const bExact = bTitle === clean;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;

        // Custom query priorities
        // "ground" or "football" or "cricket"
        if (clean === 'ground' || clean === 'football' || clean === 'cricket') {
            const aIsSports = a.item.url.includes('/facilities') && a.item.url.includes('sports');
            const bIsSports = b.item.url.includes('/facilities') && b.item.url.includes('sports');
            if (aIsSports && !bIsSports) return -1;
            if (!aIsSports && bIsSports) return 1;
        }

        // "library" or "libary"
        if (clean === 'library' || clean === 'libary') {
            const aIsLib = a.item.url.includes('/facilities') && a.item.url.includes('library');
            const bIsLib = b.item.url.includes('/facilities') && b.item.url.includes('library');
            if (aIsLib && !bIsLib) return -1;
            if (!aIsLib && bIsLib) return 1;
        }

        // "basketball"
        if (clean === 'basketball') {
            const aIsTourSports = a.item.url.includes('/virtual-tour') && (a.item.url.includes('sports') || aTitle.includes('sports'));
            const bIsTourSports = b.item.url.includes('/virtual-tour') && (b.item.url.includes('sports') || bTitle.includes('sports'));
            if (aIsTourSports && !bIsTourSports) return -1;
            if (!aIsTourSports && bIsTourSports) return 1;
        }

        // "canteen"
        if (clean === 'canteen') {
            const aIsCanteen = aTitle.includes('canteen');
            const bIsCanteen = bTitle.includes('canteen');
            if (aIsCanteen && !bIsCanteen) return -1;
            if (!aIsCanteen && bIsCanteen) return 1;
        }

        // "auditorium"
        if (clean === 'auditorium') {
            const aIsAudit = aTitle.includes('auditorium');
            const bIsAudit = bTitle.includes('auditorium');
            if (aIsAudit && !bIsAudit) return -1;
            if (!aIsAudit && bIsAudit) return 1;
        }

        // "hostel"
        if (clean === 'hostel') {
            const aIsHostel = aTitle.includes('hostel');
            const bIsHostel = bTitle.includes('hostel');
            if (aIsHostel && !bIsHostel) return -1;
            if (!aIsHostel && bIsHostel) return 1;
        }

        // "naac" or "nirf"
        if (clean === 'naac' || clean === 'nirf') {
            const aIsDisclosures = a.item.url.includes('/mandatory-disclosures');
            const bIsDisclosures = b.item.url.includes('/mandatory-disclosures');
            if (aIsDisclosures && !bIsDisclosures) return -1;
            if (!aIsDisclosures && bIsDisclosures) return 1;
        }

        // "anti ragging" / "antiragging"
        if (clean === 'anti ragging' || clean === 'antiragging') {
            const aIsAnti = a.item.url.includes('/antiragging');
            const bIsAnti = b.item.url.includes('/antiragging');
            if (aIsAnti && !bIsAnti) return -1;
            if (!aIsAnti && bIsAnti) return 1;
        }

        // "placement" / "plcement"
        if (clean === 'placement' || clean === 'plcement') {
            const aIsPlacements = a.item.url === '/placements';
            const bIsPlacements = b.item.url === '/placements';
            if (aIsPlacements && !bIsPlacements) return -1;
            if (!aIsPlacements && bIsPlacements) return 1;
        }

        // "fee" / "fees"
        if (clean === 'fee' || clean === 'fees') {
            const aIsFee = a.item.url === '/online-fee';
            const bIsFee = b.item.url === '/online-fee';
            if (aIsFee && !bIsFee) return -1;
            if (!aIsFee && bIsFee) return 1;
        }

        // Structure tie-breaker:
        // facility & virtual-tour (1), sections with # (2), whole pages (3)
        const getTier = (item) => {
            if (item.url.includes('/facilities') || item.url.includes('/virtual-tour')) return 1;
            if (item.url.includes('#')) return 2;
            return 3;
        };

        const tierDiff = getTier(a.item) - getTier(b.item);
        if (Math.abs(a.score - b.score) < 0.5 && tierDiff !== 0) {
            return tierDiff;
        }

        return b.score - a.score;
    });

    // 3. QA
    grouped.qa.sort((a, b) => b.score - a.score);

    // 4. Events
    grouped.events.sort((a, b) => b.score - a.score);

    return {
        faculty: grouped.faculty.map(g => g.item),
        pages: grouped.pages.map(g => g.item),
        qa: grouped.qa.map(g => g.item),
        events: grouped.events.map(g => g.item)
    };
}
