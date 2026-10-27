# Societies

The `societies` collection holds the student societies and clubs listed on the legacy `/society` page. Records are imported as drafts and keep their source provenance so editors can review them before publishing.

## Source

- Page: <https://msit.in/society>
- Snapshot: `docs/references/snapshot/pages/society.html`
- Legacy path: `/society`

The seed parser reads the 17 tab panes in the snapshot and maps each pane's `id` to a society slug. It does not use `societiesData.js`.

## Fields

| Field | Purpose |
| --- | --- |
| `name`, `slug` | Display name and stable identifier. |
| `category` | Editorial classification: `cultural`, `technical`, or `academic`. |
| `overview` | Short listing summary. Imported summaries are verbatim excerpts from the source. |
| `description` | Full profile as rich text, preserving the page's paragraphs and lists. |
| `foundedOn`, `foundedYear` | Founding date or year, only when the source states it. |
| `facultyCoordinators` | Faculty names, roles, designations, and departments, with an optional `faculty` relationship. |
| `studentLeaders` | Student names, roles, sub-society units, departments, email, and phone. |
| `contact` | Society-level emails and phone, excluding addresses already attached to a person. |
| `links` | Source links classified as `website`, `social`, `document`, `form`, or `other`. |
| `logo`, `gallery` | Media fields reserved for reviewed uploads. The seed does not import images. |
| `sortOrder` | Source tab order. |
| `sourceUrl`, `sourceSnapshotFile`, `legacyPath` | Provenance and legacy URL mapping. |

Categories are editorial. The source page does not assign them. The current mapping is:

- `cultural`: NSS, Cerebrate, Mutants, Veda, Prakriti, Broadcast Society, U-Knighted
- `technical`: IEEE, NISP, E-Yantra, TechSoc, Geek Room, MLSA, ISTE, GDSC
- `academic`: NDLI Club, SPARK

`overview` is left blank for ISTE and SPARK because those panes contain only a document link or roster, not introductory prose.

## Relationships and missing values

Faculty coordinators are linked to `faculty` records by normalized exact name. Names that do not match exactly stay as text so editors can resolve them later:

- `Neeru Rathee` — the faculty collection has `Dr. Neeru Rathi`.
- `Anju Singh Dhillon` — no matching faculty record.
- `Reetu Verma` — no matching faculty record.

The seed does not invent founding dates, departments, links, or contact details. The Mutants sub-societies (OCTAVE, AARAMBH, UNITY, ASTITVA) stay inside the Mutants record as student-leader units rather than becoming separate societies.

## Seeding

```sh
corepack pnpm seed:societies
```

The standalone command runs with `NODE_ENV=production` so Payload uses committed migrations instead of a development schema push. The full seed also runs societies after faculty and facilities:

```sh
corepack pnpm seed
```

Both commands are idempotent. A record is skipped when its slug already exists; existing records are never overwritten. The command logs created, skipped, and failed counts. Missing or malformed panes are reported as warnings rather than aborting the whole import.

The seed does not upload source images. When a pane contains images, it logs their source URLs so an editor can review and upload them to `logo` or `gallery`.

## Verification

The parser and collection have unit coverage in `tests/societies.spec.ts`. To verify a database after seeding:

```sh
corepack pnpm test
corepack pnpm lint
corepack pnpm build
```

Expected database state: 17 `societies` records, all drafts, with unique slugs, unique `sortOrder` values, and provenance on every record. Re-running the seed should create zero records and leave 17 unchanged.

The migration is `src/migrations/20261027_153921_societies.ts`.
