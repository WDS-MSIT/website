/**
 * Deterministic slug generator for URLs, IDs, and search anchors.
 * Keeps a registry/counter if duplicate tracker is passed, or standalone.
 */

export function slugify(text) {
    if (!text || typeof text !== 'string') return '';
    return text
        .toLowerCase()
        .trim()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

/**
 * Creates a scoped slugifier that appends -2, -3 deterministically for duplicates.
 */
export function createSlugifier() {
    const counts = new Map();
    return function getUniqueSlug(text) {
        const base = slugify(text);
        if (!base) return '';
        const currentCount = counts.get(base) || 0;
        counts.set(base, currentCount + 1);
        if (currentCount === 0) {
            return base;
        }
        return `${base}-${currentCount + 1}`;
    };
}
