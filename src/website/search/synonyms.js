/**
 * Query-time synonym expansions for MSIT search.
 * Only maps to terms and concepts that exist in the site content.
 */

export const synonyms = {
    library: ["central library", "books", "reading room", "ndli"],
    libary: ["library", "central library", "books"],
    ground: ["sports", "grounds", "athletic", "football", "cricket", "basketball", "volleyball", "badminton", "athletics", "sphurti"],
    playground: ["ground", "sports", "football", "cricket", "basketball", "volleyball", "badminton", "athletics", "sphurti"],
    field: ["ground", "sports", "football", "cricket", "athletics"],
    sports: ["ground", "football", "cricket", "basketball", "volleyball", "badminton", "athletics", "sphurti"],
    games: ["sports", "ground", "badminton", "table tennis", "chess"],
    football: ["sports", "ground", "athletic"],
    cricket: ["sports", "ground", "nets", "athletic"],
    basketball: ["sports", "court", "arena", "outdoor"],
    volleyball: ["sports", "court", "arena"],
    badminton: ["sports", "court", "outdoor"],
    canteen: ["cafeteria", "food", "mess", "kiosk", "dining"],
    cafeteria: ["canteen", "food", "snacks"],
    mess: ["hostel", "canteen", "dining"],
    hod: ["head of department", "head of the department"],
    cse: ["computer science", "computer science and engineering"],
    it: ["information technology"],
    ece: ["electronics communication", "electronics and communication engineering"],
    eee: ["electrical electronics", "electrical and electronics engineering"],
    fee: ["fees", "fee payment", "tuition", "online fee"],
    fees: ["fee", "fee payment", "tuition", "online fee"],
    tuition: ["fee", "fees", "payment"],
    principal: ["director"],
    director: ["principal", "fromdesk"],
    hostel: ["accommodation", "residential", "boys hostel", "girls hostel"],
    accommodation: ["hostel", "residential"],
    placement: ["placements", "recruit", "jobs", "salary", "companies"],
    plcement: ["placements", "jobs", "recruit"],
    nirf: ["mandatory disclosures", "ranking"],
    naac: ["mandatory disclosures", "accreditation"],
    "anti ragging": ["antiragging", "ragging", "discipline"],
    antiragging: ["anti ragging", "ragging", "discipline"]
};

/**
 * Expands a query string using synonyms.
 */
export function expandQuery(query) {
    if (!query || typeof query !== 'string') return '';
    const cleanQuery = query.toLowerCase().trim();
    const terms = cleanQuery.split(/[\s-]+/).filter(Boolean);
    const expansions = new Set([cleanQuery, ...terms]);

    // Check multi-word phrase
    if (synonyms[cleanQuery]) {
        synonyms[cleanQuery].forEach(s => expansions.add(s));
    }

    // Check individual terms
    terms.forEach(term => {
        if (synonyms[term]) {
            synonyms[term].forEach(s => expansions.add(s));
        }
    });

    return Array.from(expansions).join(' ');
}
