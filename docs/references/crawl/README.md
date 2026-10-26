# Public-site crawl

This crawl was run on 25 October 2026.

## Contents

- `crawl.mjs`: the crawler used for this run.
- `inventory.csv`: every discovered internal page or file URL.
- `inventory-external.csv`: discovered external URLs and their first source.
- `inventory-patterns.csv`: URLs grouped by path shape.
- `inventory-templates.csv`: repeated-section patterns. This run contains only
  the header and no detected templates.

## Run summary

| Item | Count |
| --- | ---: |
| Inventory rows | 1,654 |
| HTML pages | 45 |
| File URLs | 1,608 |
| PDF URLs | 1,554 |
| External URLs | 73 |
| Recorded errors | 1 |

The recorded error is the Cloudflare email-protection path. Of the file rows,
1,603 have no HTTP status because recognized file extensions are recorded
without being fetched.

## Suitable uses

- Migration coverage and reconciliation
- Legacy path and redirect discovery
- Document download queues
- External-service and outbound-link review
- Detecting URL naming and grouping patterns

## Not established by this crawl

- Whether each document still downloads successfully
- Whether a response has the correct MIME type
- File size, checksum, duplicates or document contents
- Image coverage from `src`, `srcset` or CSS backgrounds
- A restorable backup of the existing website

Before migration, extend or replace the crawler so every document and media URL
is fetched and recorded with status, final URL, MIME type, byte size, checksum,
and relevant response metadata.
