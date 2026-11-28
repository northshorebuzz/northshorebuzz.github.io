/* ============================================================
   NSB MENU EDITOR WORKER (Version 3) — Cloudflare Worker
   The only thing that holds the GitHub key. Editor apps (MOSO
   Menu Editor in HighLevel AI Studio) talk to this, never to GitHub.

   Routes (site = "moso" for now):
     GET  /<site>/menu   -> current menu.json, fresh from GitHub (no Pages cache)
     POST /<site>/menu   -> checks the menu, commits it to GitHub
     GET  /<site>/editor -> the editor page (nsb/menu-editor/index.html,
                            read fresh from GitHub) with the app key
                            filled in. This URL is what goes in the
                            CRM sidebar. No key needed to open it.
   Every request needs:  Authorization: Bearer <editor key>
   POST body: { sha, note, menu }  — note ("what did you change?")
   is required. Each publish adds an entry to the site's change log
   (clients/<site>/menu-changes.md): who, when, the note, and an
   automatic list of exactly what changed. Newest first.

   Secrets (set in Cloudflare, never in code or GitHub):
     GITHUB_TOKEN  fine-grained token, Contents read/write on
                   northshorebuzz/northshorebuzz.github.io ONLY
     EDITORS       JSON {"<key>": "app"}  (or "<key>": "<name>")
                   "app" = the key built into the editor app. The
                   person picks their name in the app (sent as
                   "who"), which must be on the site's editor list
                   below. Swap the key here to lock the app out.
   V2 (Nov 28, 2026): one app key + pick-your-name, no passwords.
   V3 (Nov 28, 2026): serves the editor page itself (same address,
     so no CORS). Editor changes = push the HTML, no redeploy.
   Vars:
     ALLOWED_ORIGINS  comma list of editor app origins (CORS)
   ============================================================ */

const REPO = 'northshorebuzz/northshorebuzz.github.io';
const SITES = {
  moso: {
    path: 'clients/moso/menu.json', log: 'clients/moso/menu-changes.md', name: 'MOSO Bamboo Canada',
    editors: ['Buzz', 'Alicia', 'Emilio']   // names shown in the app's "Who's changing the menu?" list
  }
};
const MAX_BYTES = 50000;
const EDITOR_PAGE = 'nsb/menu-editor/index.html';

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
    const cors = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : (allowed[0] || ''),
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Vary': 'Origin'
    };
    const reply = (status, body) => new Response(JSON.stringify(body), {
      status, headers: { ...cors, 'Content-Type': 'application/json' }
    });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    const m = new URL(req.url).pathname.match(/^\/([a-z0-9-]+)\/(menu|editor)\/?$/);
    const site = m && SITES[m[1]];
    if (!site) return reply(404, { ok: false, error: 'Unknown route' });

    let editors = {};
    try { editors = JSON.parse(env.EDITORS || '{}'); } catch (e) {}

    const gh = (path, init = {}) => fetch(`https://api.github.com/repos/${REPO}/${path}`, {
      ...init,
      headers: {
        'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'nsb-menu-editor-worker',
        ...(init.headers || {})
      }
    });

    // The editor page, with this site's settings + the app key filled in
    if (m[2] === 'editor') {
      if (req.method !== 'GET') return reply(405, { ok: false, error: 'GET only' });
      const appKey = Object.keys(editors).find(k => editors[k] === 'app');
      const pg = await gh(`contents/${EDITOR_PAGE}?ref=main`, { headers: { 'Accept': 'application/vnd.github.raw' } });
      if (!pg.ok || !appKey) return new Response('Menu editor is not available right now.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      const cfg = JSON.stringify({ site: m[1], name: site.name, api: `/${m[1]}`, key: appKey }).replace(/</g, '\\u003c');
      const html = (await pg.text()).replace('</head>', `<script>window.NSB_MENU=${cfg};</script>\n</head>`);
      return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' } });
    }

    const key = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
    const keyName = key && editors[key];
    if (!keyName) return reply(401, { ok: false, error: 'Wrong or missing editor key' });

    // Current file (content + sha)
    const cur = await gh(`contents/${site.path}?ref=main`);
    if (!cur.ok) return reply(502, { ok: false, error: `GitHub read failed (${cur.status})` });
    const curJson = await cur.json();
    const curText = b64decode(curJson.content);

    if (req.method === 'GET') {
      return reply(200, { ok: true, sha: curJson.sha, editors: site.editors, menu: JSON.parse(curText) });
    }
    if (req.method !== 'POST') return reply(405, { ok: false, error: 'GET or POST only' });

    const raw = await req.text();
    if (raw.length > MAX_BYTES) return reply(413, { ok: false, error: 'Menu too big' });
    let body;
    try { body = JSON.parse(raw); } catch (e) { return reply(400, { ok: false, error: 'Not valid JSON' }); }

    // Who is publishing: picked in the app (app key), or the key's own name
    let who = keyName;
    if (keyName === 'app') {
      who = String(body.who || '').trim();
      if (!site.editors.includes(who)) return reply(422, { ok: false, error: "Pick who's changing the menu" });
    }

    // Stops two people overwriting each other: the app sends the sha it loaded.
    if (body.sha && body.sha !== curJson.sha) {
      return reply(409, { ok: false, error: 'Someone published since you opened the editor. Reload, then make your change again.' });
    }

    const menu = body.menu;
    const problems = check(menu);
    if (problems.length) return reply(422, { ok: false, error: 'Menu not saved', problems });

    const note = String(body.note || '').trim();
    if (note.length < 3) return reply(422, { ok: false, error: 'Add a short note: what did you change?' });

    const old = JSON.parse(curText);
    const changes = diff(old, menu);
    if (!changes.length) return reply(422, { ok: false, error: 'Nothing changed, so nothing to publish' });
    menu.version = (Number(old.version) || 0) + 1;
    menu.updated = new Date().toISOString().slice(0, 10);
    menu.updatedBy = who;
    const text = JSON.stringify(menu, null, 2) + '\n';

    const put = await gh(`contents/${site.path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Menu Editor: ${who} published menu v${menu.version} (${note.slice(0, 100)})`,
        content: b64encode(text),
        sha: curJson.sha,
        branch: 'main'
      })
    });
    if (!put.ok) return reply(502, { ok: false, error: `GitHub save failed (${put.status})` });
    const done = await put.json();

    // Change log entry (menu is already saved; a log hiccup doesn't undo it)
    let logged = true;
    try {
      const when = new Date().toLocaleString('en-CA', { timeZone: 'America/Vancouver', dateStyle: 'medium', timeStyle: 'short' }) + ' PT';
      const entry = `## v${menu.version} · ${when} · ${who}\n\n**Note:** ${note.replace(/\n+/g, ' ')}\n\n` +
        changes.map(c => `- ${c}`).join('\n') + `\n\n[See the exact change](${done.commit.html_url})\n\n`;
      const lg = await gh(`contents/${site.log}?ref=main`);
      let logText = '', logSha;
      if (lg.ok) { const j = await lg.json(); logText = b64decode(j.content); logSha = j.sha; }
      const head = `# ${site.name} — Menu change log\n\nEvery publish from the Menu Editor, newest first. Written by the NSB Menu Editor Worker.\n\n`;
      const rest = logText.startsWith('# ') ? logText.slice(logText.indexOf('\n## ') + 1 || logText.length) : logText;
      const lp = await gh(`contents/${site.log}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Menu change log: v${menu.version}`, content: b64encode(head + entry + (rest.startsWith('## ') ? rest : '')), sha: logSha, branch: 'main' })
      });
      logged = lp.ok;
    } catch (e) { logged = false; }

    return reply(200, { ok: true, version: menu.version, sha: done.content.sha, commit: done.commit.html_url, changes, logged });
  }
};

/* Guard rails: anything here blocks the publish with a plain message. */
function check(m) {
  const p = [];
  const isPath = s => typeof s === 'string' && (/^\/[^\s"<>]*$/.test(s) || /^https:\/\/[^\s"<>]+$/.test(s));
  const isImg = s => typeof s === 'string' && /^https:\/\/[^\s"<>]+$/.test(s);
  const txt = (s, max) => typeof s === 'string' && s.trim().length > 0 && s.length <= max;
  if (!m || typeof m !== 'object') return ['No menu sent'];
  if (!m.logo || !isImg(m.logo.src)) p.push('Logo image must be an https:// link');
  if (!m.phone || !/^\d{10,11}$/.test(String(m.phone.number || ''))) p.push('Phone number: 10 digits, numbers only');
  if (!Array.isArray(m.items) || m.items.length < 1) p.push('Menu needs at least one top item');
  if (Array.isArray(m.items) && m.items.length > 8) p.push('Max 8 top items (the bar runs out of room)');
  (m.utilityLinks || []).forEach((u, i) => {
    if (!txt(u.label, 40) || !isPath(u.href)) p.push(`Top-right link ${i + 1}: needs a label and a link`);
  });
  const ids = new Set();
  (m.items || []).forEach((it, i) => {
    const n = `Item ${i + 1} (${it && it.label || 'no label'})`;
    if (!txt(it.label, 30)) p.push(`${n}: label is empty or longer than 30 characters`);
    if (it.type === 'link') {
      if (!isPath(it.href)) p.push(`${n}: link must start with / or https://`);
    } else if (it.type === 'dropdown') {
      if (!/^[A-Za-z0-9]+$/.test(it.id || '') || ids.has(it.id)) p.push(`${n}: missing or duplicate id`);
      ids.add(it.id);
      if (!/^[a-z0-9-]+$/.test(it.mobileId || '')) p.push(`${n}: missing mobileId`);
      const pan = it.panel || {};
      if (!isImg(pan.image)) p.push(`${n}: panel image must be an https:// link`);
      if (!Array.isArray(pan.columns) || !pan.columns.length || pan.columns.length > 4) p.push(`${n}: needs 1 to 4 columns`);
      (pan.columns || []).forEach((col, c) => {
        if (!Array.isArray(col) || !col.length) p.push(`${n}: column ${c + 1} is empty`);
        (col || []).forEach((l, j) => {
          if (!txt(l.label, 40)) p.push(`${n}, column ${c + 1}, link ${j + 1}: label is empty or too long`);
          if (!isPath(l.href)) p.push(`${n}, column ${c + 1}, link ${j + 1}: link must start with / or https://`);
          if (l.image != null && l.image !== '' && !isImg(l.image)) p.push(`${n}, column ${c + 1}, link ${j + 1}: image must be an https:// link`);
        });
      });
    } else {
      p.push(`${n}: type must be link or dropdown`);
    }
  });
  return p;
}

/* Plain-English list of what changed between two menus. */
function diff(a, b) {
  const out = [];
  const q = s => `"${s}"`;
  if ((a.logo || {}).src !== (b.logo || {}).src) out.push('Logo image changed');
  if ((a.phone || {}).label !== (b.phone || {}).label || (a.phone || {}).number !== (b.phone || {}).number) out.push(`Phone: ${q((a.phone || {}).label)} → ${q((b.phone || {}).label)}`);
  if (a.tagline !== b.tagline) out.push(`Tagline: ${q(a.tagline)} → ${q(b.tagline)}`);
  const ul = x => (x.utilityLinks || []).map(u => `${u.label} (${u.href})`).join(', ');
  if (ul(a) !== ul(b)) out.push(`Top-right links: ${ul(a) || 'none'} → ${ul(b) || 'none'}`);
  const tops = x => (x.items || []).map(i => i.label);
  const ta = tops(a), tb = tops(b);
  tb.filter(l => !ta.includes(l)).forEach(l => out.push(`Added top item ${q(l)}`));
  ta.filter(l => !tb.includes(l)).forEach(l => out.push(`Removed top item ${q(l)}`));
  const same = ta.filter(l => tb.includes(l));
  if (same.join('|') !== tb.filter(l => ta.includes(l)).join('|')) out.push(`Top items reordered: ${tb.join(', ')}`);
  (b.items || []).forEach(ib => {
    const ia = (a.items || []).find(x => x.label === ib.label) || (a.items || []).find(x => ib.id && x.id === ib.id);
    if (!ia) return;
    const where = `${ib.label}`;
    if (ia.label !== ib.label) out.push(`Renamed top item ${q(ia.label)} → ${q(ib.label)}`);
    if (ia.type !== ib.type) out.push(`${where}: changed from ${ia.type} to ${ib.type}`);
    if (ib.type === 'link' && ia.type === 'link' && ia.href !== ib.href) out.push(`${where}: link ${ia.href} → ${ib.href}`);
    if (ib.type === 'dropdown' && ia.type === 'dropdown') {
      const pa = ia.panel || {}, pb = ib.panel || {};
      if (pa.title !== pb.title) out.push(`${where}: panel title changed`);
      if (pa.image !== pb.image) out.push(`${where}: panel opening image changed`);
      const flat = p => [].concat(...(p.columns || []));
      const la = flat(pa), lb = flat(pb);
      lb.forEach(l => {
        const o = la.find(x => x.href === l.href) || la.find(x => x.label === l.label);
        if (!o) return out.push(`${where}: added ${q(l.label)} (${l.href})`);
        if (o.label !== l.label) out.push(`${where}: renamed ${q(o.label)} → ${q(l.label)}`);
        if (o.href !== l.href) out.push(`${where}: ${q(l.label)} link ${o.href} → ${l.href}`);
        if ((o.image || '') !== (l.image || '')) out.push(`${where}: ${q(l.label)} hover image changed`);
      });
      la.forEach(l => { if (!lb.find(x => x.href === l.href) && !lb.find(x => x.label === l.label)) out.push(`${where}: removed ${q(l.label)}`); });
      const order = p => (p.columns || []).map(c => c.map(l => l.href).join(',')).join(' | ');
      if (!out.some(c => c.startsWith(where + ':')) && order(pa) !== order(pb)) out.push(`${where}: links reordered`);
    }
  });
  return out;
}

function b64decode(b64) {
  const bin = atob(b64.replace(/\n/g, ''));
  return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
}
function b64encode(text) {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  bytes.forEach(b => { bin += String.fromCharCode(b); });
  return btoa(bin);
}
