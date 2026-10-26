# Working public-site snapshot

## Contents

- `pages/`: saved HTML responses from `https://msit.in`.
- `urls-to-scrape.txt`: the URL seed list used for the snapshot work.
- `assets/`: locally captured image assets referenced by the saved pages after
  the asset downloader has completed.
- `assets.csv`: source URL, download state and page usage for each discovered
  asset. Successful downloads also receive a local path, content type and
  checksum.
- `download-assets.ps1`: rerunnable asset-capture script.

Most interior pages were captured on 23 September 2026. `pages/index.html` was
captured from the live homepage on 26 October 2026.

## Known coverage details

- `sih.html` is the site's 404 response for `/sih`, not a content page.
- `achievement-3.html` represents the live route `/achievement/3/`; the
  filename was flattened for storage.
- `urls-to-scrape.txt` includes `/scholarships`, but no matching HTML page is
  present.

A live spot-check on 26 October 2026 confirmed:

- `/achievement/3` redirects to and renders at `/achievement/3/`.
- `/sih` returns the MSIT 404 page.
- `/scholarships` returns the MSIT 404 page.
- The live Scholarships navigation item points directly to
  `/media/navigations/scholarships.pdf`.
- The homepage is stored as `pages/index.html`.

## Usage rules

- Treat the HTML as immutable raw evidence.
- Preserve the source filename and source URL on extracted records.
- Remove repeated header, sidebar and footer markup during extraction.
- Do not infer dates solely from file ordering or filenames.
- Decode Cloudflare-protected email markup carefully and verify addresses.
- Keep the legacy path even when the new site uses a different canonical slug.
