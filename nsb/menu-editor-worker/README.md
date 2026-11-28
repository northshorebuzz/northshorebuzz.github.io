# NSB Menu Editor Worker

Reference copy of the Cloudflare Worker that saves client menus to this repo.
This file is NOT loaded by any site. The running copy lives in Cloudflare.

- Cloudflare account: buzz@nsbmarketing.ca
- Worker name: `nsb-menu-editor`
- Address: https://nsb-menu-editor.buzz-026.workers.dev
- Sites it can edit: `moso` → `clients/moso/menu.json` (change log: `clients/moso/menu-changes.md`)

Secrets live in Cloudflare only (Worker → Settings → Variables and Secrets), never here:
`GITHUB_TOKEN` (fine-grained, Contents read/write on this repo only) and `EDITORS` (one app key, `{"<key>":"app"}`; people pick their name in the app).

To change it: Claude edits `worker.js` here, pushes, and redeploys it to Cloudflare with the same code. Secrets are kept on redeploy.
