# North Shore Buzz — website code

Every NSB client website loads its CSS and scripts from here, one line per file.
Served by GitHub Pages at `https://northshorebuzz.github.io/<path>`.
Claude edits a file and pushes; sites update in about 1–10 minutes (hard refresh to see it).

Full rules: the "NSB Gold Standard — Building GHL Websites" doc.

## Layout

```
clients/<client>/        one folder per client (short, lowercase)
  brand.css              the client's look: colours, fonts, weights, builder IDs
  ...                    client-only scripts and page trials (dark.css, lightbox.js)
templates/<kind>/v<N>/   shared templates, versioned
  master.css             layout + components, brand tokens only
  listing-gallery.js     realtor listing gallery
nsb/                     NSB's own tools
  crm/                   NSB CRM sidebar styling
  brand/                 NSB Brand Hub
  quickfire/             Quickfire SMS icons
```

## Rules

- A client's look lives only in `clients/<client>/brand.css`.
- Templates never contain a client's colour, font or ID.
- Template versions are frozen once a client is on them: make breaking changes in a new `v<N+1>` folder, then move clients up one at a time (Tansy first).
- Small fixes may go into the current version, since every client on it gets them.
- Every file starts with a comment: what it is, its version, and the exact line that loads it.
- Nothing secret goes in here (it's public): no tokens, passwords or client data.
