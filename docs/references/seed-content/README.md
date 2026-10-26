# Seed content sources

This folder contains structured content and media that can accelerate the
initial Payload import.

## Contents

- `data/`: JavaScript modules for people, departments/facilities, societies and
  grouped page content, plus one locally available NBA PDF.
- `media/`: faculty images, campus images, institutional marks, recruiter logos
  and other site media.
- `extra-logos/`: two additional MSIT logo files.

## How to use it

Treat these files as seed candidates, not as an already approved database
dump. Reconcile structured values with `../snapshot/`, retain only fields that
the Payload schema needs, and import records as drafts.

Before publication, review at least:

- Current employment, role and department for every person
- Identity and usage rights for photographs and logos
- Placeholder or search-result profile links
- Contact information
- Placement and accreditation claims
- Dates, figures and derived prose

The import pipeline should convert the JavaScript modules into neutral JSON
with stable source keys. Payload IDs and upload relationships should be created
during import rather than written back into these source files.
