/* ============================================================
   MOSO BAMBOO CANADA — TECHNICAL DOCUMENTS LIBRARY (Version 1 on GitHub)
   The document library on moso-bamboo.ca/helpful-documents: shelves,
   audience filter, pencil-sketch cards, slide-in viewer, install guide
   stepper and clip calculator.
   Loaded by the page's Custom Code element (pasted once, never changes):
     <div id="moso-docs"></div>
     <script src="https://northshorebuzz.github.io/clients/moso/tech-docs.js" defer></script>

   To add or change a document: edit DOCS (and LOOK for its card art) in
   the code at the bottom and push. Shelves = SHELVES, guide pages = GUIDE.
   V1 (Nov 28, 2026): copied word for word from the "Technical Documents"
   artifact. That artifact is now a reference copy only.
   ============================================================ */
(function(){
  if (window.__mosoDocs) return;
  window.__mosoDocs = true;

  var FONT = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';

  var CSS = `
/* Layout: matches the live MOSO Canada site. Centred light headings, nav-style shelf tabs,
   a row of cream panels with leaf-cut corners holding pencil-sketch "PDF sheets",
   a footer-grey contact band. Tapping a document slides a detail sheet in from the right.
   Single light theme on purpose: it sits inside the white site as an iframe / code block. */
#mosoDocs{
  color-scheme: light;
  --ink:#000000;
  --text:#1f1f1f;
  --text-2:#4a4a4a;
  --mute:#767676;
  --green:#009F4B;
  --green-hover:#007839;
  --tab:#2F5A3B;        /* dark green tab on the PDF sheets */
  --line:#E5E5E5;
  --soft:#F4F4F4;       /* footer grey */
  --cream:#EEECE6;      /* card panel */
  --paper:#FBFAF7;      /* sketch sheet */
  --pencil:#3A3A3A;
  --shade:rgba(0,0,0,.35);
  --sans:"Montserrat","Century Gothic","Segoe UI",system-ui,-apple-system,sans-serif;
  --leaf:clamp(70px,9vw,120px);
}
#mosoDocs *{box-sizing:border-box}
#mosoDocs{background:#fff;color:var(--text);font-family:var(--sans);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
#mosoDocs .wrap{max-width:1280px;margin:0 auto;padding-inline:clamp(16px,3.5vw,48px);padding-block:0 48px}
/* hard-lock header/shelf spacing so the site's global typography CSS can't add gaps */
#mosoDocs header p,#mosoDocs header h1,#mosoDocs .shelf-head h2,#mosoDocs .shelf-head p{margin:0 !important;padding:0 !important}
#mosoDocs header h1{margin-top:6px !important}
#mosoDocs header .sub{margin-top:10px !important}
#mosoDocs .shelf-head p{margin-top:10px !important}
#mosoDocs button{font:inherit;color:inherit;cursor:pointer;background:none;border:0;padding:0}
#mosoDocs a{color:inherit}
#mosoDocs :focus-visible{outline:2px solid var(--green);outline-offset:3px}

/* ---------- Header ---------- */
#mosoDocs header{text-align:center;display:flex;flex-direction:column;align-items:center}
#mosoDocs .eyebrow{font-size:16px;color:var(--text-2);margin:0}
#mosoDocs h1{font-weight:400;font-size:clamp(36px,5vw,58px);line-height:1.12;letter-spacing:-.01em;color:var(--ink);margin:8px 0 0;text-wrap:balance}
#mosoDocs .sub{margin:12px 0 0;font-size:clamp(16px,1.7vw,19px);color:var(--text-2)}

/* ---------- Filters ---------- */
#mosoDocs .filters{margin-top:36px;display:flex;flex-direction:column;align-items:center;gap:22px}
#mosoDocs .aud{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
#mosoDocs .aud button{border:1px solid #D6D6D6;border-radius:999px;padding:10px 22px;font-weight:600;font-size:15px;transition:background .15s,border-color .15s,color .15s}
#mosoDocs .aud button:hover{border-color:var(--green);color:var(--green)}
#mosoDocs .aud button[aria-pressed="true"]{background:var(--green);border-color:var(--green);color:#fff;font-weight:700}
#mosoDocs .tabs{display:flex;gap:clamp(18px,2.6vw,40px);justify-content:safe center;overflow-x:auto;scrollbar-width:none;max-width:100%;padding:0 4px;border-bottom:1px solid var(--line);width:100%}
#mosoDocs .tabs::-webkit-scrollbar{display:none}
#mosoDocs .tabs button{flex:none;font-weight:700;font-size:16px;color:var(--ink);padding:6px 0 10px;border-bottom:2px solid transparent;margin-bottom:-1px;transition:color .15s,border-color .15s;white-space:nowrap}
#mosoDocs .tabs button sup{font-size:11px;font-weight:500;color:var(--mute);margin-left:3px}
#mosoDocs .tabs button:hover{color:var(--green-hover);border-bottom-color:var(--green-hover)}
#mosoDocs .tabs button[aria-selected="true"]{color:var(--green);border-bottom-color:var(--green)}

/* ---------- Shelf ---------- */
#mosoDocs .shelf-head{text-align:center;margin:44px auto 30px;max-width:62ch}
#mosoDocs .shelf-head h2{font-weight:400;font-size:clamp(26px,3vw,36px);line-height:1.2;margin:0;color:var(--ink)}
#mosoDocs .shelf-head p{margin:10px 0 0;color:var(--text-2)}

#mosoDocs .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,226px),1fr));gap:26px 24px}
#mosoDocs .doc{display:flex;flex-direction:column;gap:18px;text-align:center;min-width:0}
#mosoDocs .panel{background:var(--cream);aspect-ratio:4/5;max-width:100%;display:grid;place-items:center;overflow:hidden;transition:background .2s}
#mosoDocs .grid .doc:first-child .panel{border-top-left-radius:var(--leaf)}
#mosoDocs .grid .doc:last-child .panel{border-bottom-right-radius:var(--leaf)}
#mosoDocs .doc:hover .panel{background:#E7E4DC}

/* the sketch sheet */
#mosoDocs .sheetp{position:relative;width:84%;background:var(--paper);padding:13% 7% 6%;box-shadow:0 1px 2px rgba(0,0,0,.08),0 10px 18px -10px rgba(0,0,0,.28);transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s}
#mosoDocs .doc:hover .sheetp{transform:translateY(-6px);box-shadow:0 1px 2px rgba(0,0,0,.08),0 18px 28px -14px rgba(0,0,0,.35)}
#mosoDocs .sheetp .tabk{position:absolute;left:7%;top:6%;width:13%;height:5%;background:var(--tab)}
#mosoDocs .art{display:block;width:100%;height:auto;fill:none;stroke:var(--pencil);stroke-width:1.25;stroke-linecap:round;stroke-linejoin:round}
#mosoDocs .art text{stroke:none;fill:var(--pencil);font-family:var(--sans)}
#mosoDocs .plabel{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:6%;min-height:30px}
#mosoDocs .plabel span{font-weight:700;font-size:clamp(10.5px,1vw,12.5px);line-height:1.2;color:var(--ink);text-align:left}
#mosoDocs .badge{width:30px;height:30px;flex:none;display:block}

#mosoDocs .cap{display:flex;flex-direction:column;gap:4px;padding:0 6px}
#mosoDocs .cap .ct{font-size:19px;line-height:1.3;color:var(--ink);text-wrap:balance}
#mosoDocs .cap .ct::after{content:" \u203a";transition:margin .2s}
#mosoDocs .doc:hover .ct{color:var(--green)}
#mosoDocs .cap .cm{font-size:13px;color:var(--mute)}

#mosoDocs .empty{grid-column:1/-1;text-align:center;color:var(--text-2);padding:40px 0}
#mosoDocs .empty button{color:var(--green);font-weight:600;text-decoration:underline}

/* ---------- Contact band (footer grey) ---------- */
#mosoDocs .contact{margin-top:64px;background:var(--soft);padding:clamp(28px,4vw,48px) clamp(20px,4vw,48px);display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px}
#mosoDocs .contact h3{margin:0;font-weight:400;font-size:24px;line-height:1.25;color:var(--ink)}
#mosoDocs .contact p{margin:0 0 10px;color:var(--text-2);max-width:60ch}
#mosoDocs .fine{margin:16px auto 0;font-size:13px;color:var(--mute);max-width:90ch;text-align:center}

/* ---------- Detail sheet ---------- */
#mosoDocs .veil{position:fixed;inset:0;background:var(--shade);opacity:0;pointer-events:none;transition:opacity .3s;z-index:100000}
#mosoDocs .veil.on{opacity:1;pointer-events:auto}
#mosoDocs .sheet{position:fixed;top:0;right:0;bottom:0;width:min(1040px,100%);background:#fff;z-index:100001;transform:translateX(104%);transition:transform .4s cubic-bezier(.2,.8,.2,1);display:flex;flex-direction:column;box-shadow:-24px 0 60px -30px var(--shade)}
#mosoDocs .sheet.on{transform:none}
#mosoDocs .sheet-head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:calc(14px + env(safe-area-inset-top,0px)) 24px 14px;border-bottom:1px solid var(--line)}
#mosoDocs .back{font-size:15px;font-weight:700;display:flex;gap:6px;align-items:center;padding:6px 0}
#mosoDocs .back:hover{color:var(--green)}
#mosoDocs .back svg,#mosoDocs .nav-pair svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2}
#mosoDocs .nav-pair{display:flex;gap:8px}
#mosoDocs .nav-pair button{width:36px;height:36px;border:1px solid var(--line);border-radius:50%;display:grid;place-items:center}
#mosoDocs .nav-pair button:hover{border-color:var(--green);color:var(--green)}
#mosoDocs .sheet-body{flex:1;display:flex;flex-direction:column;min-height:0}
#mosoDocs .vhead{display:flex;align-items:center;justify-content:space-between;gap:16px 24px;flex-wrap:wrap;padding:18px 24px 16px}
#mosoDocs .vhead .ttl{min-width:0;flex:1 1 320px}
#mosoDocs .vhead .ttl h2{font-size:clamp(22px,2.6vw,28px)}
#mosoDocs .vhead .meta-line{margin-top:6px}
#mosoDocs .vtools{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
#mosoDocs .vtools .btn{padding:12px 26px;font-size:15px}
#mosoDocs .pager{display:flex;align-items:center;gap:8px;font-size:14px;color:var(--text-2);font-variant-numeric:tabular-nums}
#mosoDocs .pager button{width:34px;height:34px;border:1px solid #D6D6D6;border-radius:50%;font-weight:700}
#mosoDocs .pager button:hover:not(:disabled){border-color:var(--green);color:var(--green)}
#mosoDocs .pager button:disabled{opacity:.35;cursor:default}
#mosoDocs .frame{position:relative;flex:1;min-height:0;margin:0 24px calc(20px + env(safe-area-inset-bottom,0px));background:var(--cream);border-top-left-radius:var(--leaf);overflow:hidden}
#mosoDocs .frame .wait{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;text-align:center;color:var(--text-2)}
#mosoDocs .frame .wait .sheetp{width:min(46%,260px)}
#mosoDocs .frame .wait p{margin:0;max-width:40ch;font-size:15px}
#mosoDocs .frame .imgview{position:absolute;inset:0;overflow:auto;background:var(--cream);display:flex;justify-content:center;padding:20px}
#mosoDocs .frame .imgview img{max-width:100%;height:auto;align-self:flex-start;box-shadow:0 10px 24px -14px rgba(0,0,0,.35);background:#fff}
#mosoDocs .frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:transparent}
#mosoDocs .sb{padding:26px 28px 0;display:flex;flex-direction:column;gap:22px}
#mosoDocs .meta-line{font-size:14px;color:var(--mute)}
#mosoDocs .ttl{border-left:4px solid var(--green);padding-left:18px}
#mosoDocs .ttl h2{margin:0;font-weight:400;font-size:clamp(26px,3.4vw,34px);line-height:1.15;color:var(--ink);text-wrap:balance}
#mosoDocs .lede{margin:0;font-size:17px;color:var(--text-2);max-width:60ch}
#mosoDocs .figs{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:10px}
#mosoDocs .fig{background:var(--soft);padding:16px 14px 14px;min-width:0}
#mosoDocs .fig b{display:block;font-size:24px;font-weight:600;line-height:1.1;color:var(--ink);font-variant-numeric:tabular-nums}
#mosoDocs .fig small{display:block;margin-top:6px;font-size:12.5px;color:var(--text-2);line-height:1.35}
#mosoDocs .sec h5{margin:0 0 10px;font-size:18px;font-weight:600;color:var(--ink)}
#mosoDocs .facts{margin:0;padding:0;list-style:none}
#mosoDocs .facts li{padding:11px 0 11px 22px;border-top:1px solid var(--line);position:relative;font-size:15px;color:var(--text)}
#mosoDocs .facts li:last-child{border-bottom:1px solid var(--line)}
#mosoDocs .facts li::before{content:"";position:absolute;left:0;top:21px;width:10px;height:2px;background:var(--green)}
#mosoDocs .cta{display:flex;gap:10px;flex-wrap:wrap}
#mosoDocs .btn{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:14px 30px;font-weight:700;font-size:16px;text-decoration:none;background:var(--green);color:#fff;transition:background .15s}
#mosoDocs .btn:hover{background:var(--green-hover)}
#mosoDocs .related{display:flex;flex-direction:column}
#mosoDocs .related button{text-align:left;font-size:16px;padding:9px 0;border-bottom:1px solid var(--line)}
#mosoDocs .related button::after{content:" \u203a"}
#mosoDocs .related button:hover{color:var(--green)}
#mosoDocs .note{font-size:13px;color:var(--mute);margin:0}

/* compare */
#mosoDocs .cmp-switch{display:inline-flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
#mosoDocs .cmp-switch button{border:1px solid #D6D6D6;border-radius:999px;padding:8px 18px;font-size:14px;font-weight:600;display:flex;gap:8px;align-items:center}
#mosoDocs .cmp-switch button i{width:10px;height:10px;border-radius:50%}
#mosoDocs .cmp-switch button[aria-pressed="true"]{background:var(--green);border-color:var(--green);color:#fff}
#mosoDocs .cmp{display:grid;grid-template-columns:120px 1fr;border-top:1px solid var(--line)}
#mosoDocs .cmp div{padding:10px 0;border-bottom:1px solid var(--line);font-size:15px;min-width:0}
#mosoDocs .cmp div:nth-child(odd){font-weight:600;font-size:14px;color:var(--text-2)}

/* stepper */
#mosoDocs .steps{display:flex;gap:4px;margin-bottom:16px}
#mosoDocs .steps button{flex:1;height:5px;border-radius:3px;background:var(--line)}
#mosoDocs .steps button.done{background:#9BCDB2}
#mosoDocs .steps button.cur{background:var(--green)}
#mosoDocs .step-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px}
#mosoDocs .step-head h6{margin:0;font-size:20px;font-weight:600;color:var(--ink)}
#mosoDocs .step-head span{font-size:13px;color:var(--mute);white-space:nowrap;font-variant-numeric:tabular-nums}
#mosoDocs .step-nav{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:16px;flex-wrap:wrap}
#mosoDocs .step-nav button{border:1px solid #D6D6D6;border-radius:999px;padding:9px 20px;font-size:14px;font-weight:700}
#mosoDocs .step-nav button:hover:not(:disabled){border-color:var(--green);color:var(--green)}
#mosoDocs .step-nav button:disabled{opacity:.35;cursor:default}
#mosoDocs .step-nav a{font-size:14px;font-weight:600;color:var(--green);text-decoration:none}
#mosoDocs .step-nav a:hover{text-decoration:underline}

/* calculator */
#mosoDocs .calc{background:var(--soft);padding:18px;margin-top:16px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
#mosoDocs .calc label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600;color:var(--text-2)}
#mosoDocs .calc input,#mosoDocs .calc select{font:inherit;font-size:16px;padding:9px 12px;border:1px solid #D6D6D6;background:#fff;color:var(--ink);width:100%;border-radius:0}
#mosoDocs .calc output{grid-column:1/-1;border-top:1px solid #DDD;padding-top:12px;font-size:16px}
#mosoDocs .calc output b{font-size:24px;font-weight:600;color:var(--green);font-variant-numeric:tabular-nums}

@media (max-width:520px){
  #mosoDocs .calc{grid-template-columns:1fr}
    #mosoDocs .frame{margin:0 12px 12px}
    #mosoDocs .vhead{padding:14px 16px}
  #mosoDocs .sb{padding:22px 18px 0}
  #mosoDocs .cmp{grid-template-columns:96px 1fr}
}
@media (prefers-reduced-motion:reduce){#mosoDocs *{transition:none!important;animation:none!important}}
`;

  var MARKUP = `
<div id="mosoDocs">
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="5" stroke="#3A3A3A" stroke-width=".8"/>
    </pattern>
  </defs>
</svg>

<div class="wrap">
  <header>
    <p class="eyebrow">MOSO\u00ae Bamboo - Canada \ud83c\udde8\ud83c\udde6</p>
    <h1>Technical Documents</h1>
    <p class="sub">For Architects, Builders, and Homeowners</p>
  </header>

  <div class="filters">
    <div class="aud" role="group" aria-label="Show documents for">
      <button data-aud="all" aria-pressed="true">Everyone</button>
      <button data-aud="A" aria-pressed="false">Architects</button>
      <button data-aud="B" aria-pressed="false">Builders</button>
      <button data-aud="H" aria-pressed="false">Homeowners</button>
    </div>
    <div class="tabs" role="tablist" id="tabs"></div>
  </div>

  <div class="shelf-head"><h2 id="shelfTitle"></h2><p id="shelfText"></p></div>
  <div class="grid" id="grid"></div>

  <section class="contact" aria-label="Contact MOSO Bamboo Canada">
    <h3>Need something that isn't here?</h3>
    <p>Shop drawings, samples and project support come straight from MOSO Bamboo Canada.</p>
    <a class="btn btn-primary" href="/contact-us">Contact Us</a>
  </section>
  <p class="fine">Fire and wildfire code compliance is decided by the complete building assembly, not one product on its own. Final approval always rests with your local Authority Having Jurisdiction (AHJ).</p>
</div>

<div class="veil" id="veil"></div>
<aside class="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="sTitle" aria-hidden="true">
  <div class="sheet-head">
    <button class="back" id="close"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>Back to documents</button>
    <div class="nav-pair">
      <button id="prevDoc" aria-label="Previous document"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
      <button id="nextDoc" aria-label="Next document"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
    </div>
  </div>
  <div class="sheet-body" id="sBody"></div>
</aside>
</div>
`;

  function mount(){
    var spot = document.getElementById('moso-docs');
    if (!spot) return;
    if (!document.querySelector('link[href="' + FONT + '"]')) {
      var l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = FONT;
      document.head.appendChild(l);
    }
    var st = document.createElement('style');
    st.id = 'moso-docs-css';
    st.textContent = CSS;
    document.head.appendChild(st);
    spot.innerHTML = MARKUP;
    app();
  }

  /* ---------- the library (unchanged from the pasted embed) ---------- */
  function app(){
const D = id => /^https?:/.test(id) ? id : "https://drive.google.com/file/d/" + id + "/view";
const C = {};
const SHELVES = [
  {id:"all", name:"All documents", text:"Every guide, test report, spec and warranty in one place. Tap any document to open it."},
  {id:"product", name:"Products", text:"What MOSO Bamboo Outdoor is, the profiles available, and how Thermo and N-durance differ."},
  {id:"fire", name:"Fire & Code", text:"Third-party fire test reports and wildfire-code summaries for Canada (CAN/ULC) and the US (ASTM, California, Colorado)."},
  {id:"spec", name:"Specify", text:"Documents written for the specification set: CSI three-part spec, test data, and green-building credits."},
  {id:"install", name:"Install", text:"Planning, tools, fasteners and step-by-step decking installation, from the frame to the final board."},
  {id:"care", name:"Care & Warranty", text:"Cleaning, oiling, weathering, and what the 25-year warranty does and doesn't cover."},
  {id:"green", name:"Sustainability", text:"Carbon storage, harvesting, life-cycle data and certification support."},
  {id:"watch", name:"Videos", text:"Video walkthroughs from Kenny Bolduc, MOSO Bamboo Canada's design lead."}
];

const GUIDE = [
  {t:"Board types", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac13439c478ac5535a3986a.jpg", p:[
    "1\u00d7 square stock: 1\u00d74, 1\u00d76, 1\u00d78, 1\u00d712 (8 ft). Use for trim, fascia, drink rails and privacy screens.",
    "2\u00d7 square stock: 2\u00d72, 2\u00d74, 2\u00d76 (8 ft). Use for railing, balusters, pergolas and screens.",
    "Pro tip: MOSO siding makes a good ventilated deck skirt.",
    "Always check local building codes. Most municipalities require a permit for an exterior deck."]},
  {t:"Slope & ground clearance", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343e22bc27f58f3694c7.jpg", p:[
    "Build in a 1\u20132% slope so water runs off. Flat decks pool water, which causes staining and early surface fissures.",
    "Can sit as little as 4\" above permeable surfaces, as long as airflow and drainage are planned (sand and gravel under the frame).",
    "Close to wet ground, add a vapour barrier and slope the area so water drains away.",
    "Order finished-edge (1-groove) boards for perimeters and stair treads, in 6\" or 8\"."]},
  {t:"Joists & seams", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343ec478ac5535a3995a.jpg", p:[
    "No expansion gap needed at board ends, thanks to the end-match profile and the material's stability.",
    "New frame: joists at 12\", 18\" or 24\" OC, seam on joists. Do not seam off-joist at 18\" or 24\".",
    "16\" OC works too: run boards like flooring, seam off-joist, and float a clip on each side of every seam.",
    "Block the joists at least every 72\" so joist movement can't open the board ends.",
    "Angled or random layouts: 12\" OC. Confirm final spacing with an engineer or your building official."]},
  {t:"Storage & handling", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343c195f9172ed4a42bf.jpg", p:[
    "Keep boards in the original packaging, somewhere dry, ventilated and covered from sun and rain.",
    "Store flat, off the ground on a pallet or evenly spaced battens. Not against walls, nothing stacked on top.",
    "Lift boards off the stack; dragging scratches the face. Carry them on edge to limit bending.",
    "Wipe or blow off production dust before installing to prevent water streaking."]},
  {t:"Safety & required tools", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac13439c478ac5535a3985e.jpg", p:[
    "Cutting and sanding make very fine dust. Wear a dust mask and safety glasses.",
    "Required: drill, drill bits, chop saw, and a screw gun with a ratcheting torque setting.",
    "Avoid impact drivers. They snap the stainless screws.",
    "MSDS sheets for Thermo and N-durance are available from MOSO."]},
  {t:"Cutting, routing & sanding", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343bc478ac5535a398c2.jpg", p:[
    "Crosscut on a chop saw with a carbide-tipped fine-finish blade. Rip on a table saw with a true fence.",
    "Route or plane with high-speed steel or carbide cutters.",
    "Sand only with the grain, using a belt or square palm sander. Never an orbital sander.",
    "To copy the factory end bevel, use a 45\u00b0 chamfer bit in a trim router."]},
  {t:"Marking, sealing & gluing", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1344022bc27f58f3694f3.jpg", p:[
    "Works like wood: cut, route, plane, drill and chisel with normal woodworking tools.",
    "A red carpenter's pencil leaves the clearest mark. A metal file softens cut corners and sharp mitres.",
    "End-seal isn't required, but is worth it in very dry climates. Keep it off the face or the oil won't take.",
    "Titebond III wood glue for mitres and any other glued joint."]},
  {t:"Fasteners & plugs", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343ac478ac5535a3988a.jpg", p:[
    "MOSO Asymmetric Fasteners set a 1/4\" gap between boards. Boxes of 90 or 360.",
    "305 stainless as standard, 316 stainless for salt-water exposure.",
    "Want a tighter gap? Deckwise or Camo grooved-deck clips are compatible. Steel joists: Camo Wedgemetal clips.",
    "Starborn Pro-Plug screws and plugs for starter boards, perimeter boards and stair treads. N-durance plugs ship unfinished, so ask for touch-up oil."]},
  {t:"How many clips?", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac13441c478ac5535a399e3.jpg", calc:true, p:[
    "Use only the stainless decking screws supplied with the clips (4.5 \u00d7 30 mm).",
    "Steel framing: order SCREW-BX11-01, or any #6 trim-head self-tapping metal screw. Camo Edge-X clips give a 3/16\" gap."]},
  {t:"Which face goes up", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343ac478ac5535a398aa.jpg", p:[
    "Thermo is reversible: reeded on one side, smooth on the other. Mix them, e.g. reeded on stairs and edges, smooth in the field.",
    "N-durance Rain-Shed boards have a cambered top that always faces up. The groove running the length marks the underside.",
    "The camber sheds water and stretches time between maintenance. You barely feel it underfoot.",
    "Board section: 137 \u00d7 20 mm (3/4\")."]},
  {t:"Starting the deck", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343922bc27f58f3693bd.jpg", p:[
    "Deck boards are 6 ft long, so on 16\" OC framing the seams fall between joists. The structural T&G end-match handles that.",
    "Float a clip at each off-joist seam so the end-match can't shift as the frame shrinks and swells.",
    "Start at the wall and work out, or start at the edge board and work back. Plan to minimise ripping the last board.",
    "Face-fasten the starter and perimeter boards with Pro-Plug screws and plugs, 3\u20134 screws per board into the joists."]},
  {t:"Clipping the boards", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343fbbad531ac88b3b3e.jpg", p:[
    "Press the clip's hooked side into the groove of the board.",
    "On softwood framing, drive the screw straight into the joist, but don't fully tighten it yet.",
    "Slide the next board under the wavy side of the clips, then tighten the previous row.",
    "Low torque, slow speed: 12\u201320 N\u00b7m max. Test your torque setting before you start. No impact driver."]},
  {t:"Face screwing", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1344022bc27f58f3694fe.jpg", p:[
    "Only for perimeter boards, stair treads and custom work. Field boards go down with clips.",
    "For face-screwed decks, use 1\u00d76 square stock (SKU BX2-LU166-UF, 73\", no end-match) and space joists to suit.",
    "Not recommended for N-durance field decking because of its cambered face.",
    "Pre-drill at least 3/4\" from the edge at 80\u201390% of the screw diameter, with a countersink bit that has a stop. 305 stainless screws, 316 near salt water."]},
  {t:"Finishing & cleaning", f:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1344022bc27f58f369517.jpg", p:[
    "Give the underside real airflow, especially on low decks.",
    "Float a clip at every end-match joint. This applies to siding as well as decking.",
    "Thermo needs no finish. To oil it, wait 10\u201312 weeks after install. Messmer's MOSO Bamboo Oil deepens it to a darker chocolate.",
    "N-durance: clean with Woca Exterior Wood Cleaner, re-oil with Woca Exterior Wood Oil (or Messmer's) to bring back the amber.",
    "Treat it like Ipe: install, care and performance are similar."]}
];

const DOCS = [
 {id:"techbook", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343f195f9172ed4a4381.pdf", code:"Tech Book \u00b7 2026", c:C.thermo,
  kind:"Product guide", year:"2026", shelves:["product","green","spec"], aud:"ABH",
  title:"MOSO Canada Tech Book",
  blurb:"The full product story: profiles and sizes, performance data, fire ratings, install basics and BC projects.",
  stat:["4,900+","Janka hardness"],
  figs:[["Class A","ASTM E84 \u00b7 CAN/ULC S102"],["4,900+","Janka hardness (lbf)"],["Class 1","Biological durability, EN 350"],["1.66 t","CO\u2082 stored per m\u00b3"]],
  facts:[
   "Thermo is compressed bamboo strand, thermally modified at 392\u00b0F (200\u00b0C). Highest durability class under European standards.",
   "Decking: ENCORE DK6 (3/4 \u00d7 5-3/8 \u00d7 72\"), MAGNUS DK7 dual-sided, MAGNUS DK8 perimeter board (3/4 \u00d7 8 \u00d7 72\"), curved Contour DK6 / DK7, and 2\u00d72 deck tiles for pedestals.",
   "Trim (1\u00d74, 1\u00d76, 1\u00d78, 1\u00d712) and 2\u00d72, 2\u00d73, 2\u00d74, 2\u00d76 beams.",
   "Density \u00b171.79 lb/ft\u00b3. Width change +0.9% after 24 hours in water.",
   "Rated for rooftops: CAN/ULC S107 Class A.",
   "End-match boards let you seam off-joist, cutting waste. Installs up to 30% faster than traditional hardwood decks.",
   "Weathers like exotic hardwood, from new brown to a silvery patina over 12\u201318 months. Cleaning brings the colour back.",
   "Featured projects on Bowen Island, Gambier Island and the Cap U Fulmer Family Centre (LEED Gold, North Vancouver)."],
  rel:["compare","spec","green"]},

 {id:"compare", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343b22bc27f58f36943d.pdf", code:"Thermo vs N-durance", c:C.amber,
  kind:"Comparison sheet", year:"2026", shelves:["product","care"], aud:"ABH",
  title:"Thermo vs N-durance",
  blurb:"Side by side: how each is made, colour, board profile, and what maintenance it asks of you.",
  stat:["2","material lines compared"], compare:true,
  facts:[
   "Both lines carry the same 25-year warranty, but N-durance needs annual cleaning and re-oiling to keep it.",
   "Both use end-matched boards and hidden fasteners.",
   "The sheet shows decking and siding weathered at 6, 9, 12 and 18 months."],
  rel:["techbook","guide","warranty"]},

 {id:"spec", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac13439bbad531ac88b3a48.pdf", code:"Section 07 46 23", c:C.ink,
  kind:"3-part specification", year:"2026", shelves:["spec","product"], aud:"A",
  title:"Rainscreen Siding Specification",
  blurb:"CSI MasterFormat section 07 46 23 for Thermo and N-durance rainscreen siding, ready to edit into your spec book.",
  stat:["07 46 23","CSI section"],
  figs:[["\u00bd\"","Minimum air gap behind siding"],["91.1 psf","Uplift, ASTM E330"],["4,997","Janka, Thermo"],["5,819","Janka, N-durance"]],
  facts:[
   {k:"section", t:"Written to CSI MasterFormat / SectionFormat. Part 1 General, Part 2 Products, Part 3 Execution."},
   "Thermo profiles: 1\u00d76 Dutchlap BTH-CL168G-DL-UF, 1\u00d77 Dutchlap BTH-CL178G-DL-UF, 1\u00d76 double-fluted -FL2-UF, 1\u00d76 triple-fluted -FL3-UF.",
   "N-durance: 1\u00d76 Dutchlap BND-CL168G-DL-UF, pre-finished in Woca Exterior Oil (Teak).",
   "Install only with the MOSO Asymmetric clip on battens, with at least 1/2\" air gap behind. Clips in A2 (304) or 316 stainless.",
   "Thermo: density 71.79 lb/ft\u00b3, SRI 27 / 30 / 33, thermal emittance 0.81, solar reflectance 0.32.",
   "N-durance: ASTM E84 Class A, flame spread 10, smoke developed 140. No strength loss after freeze\u2013thaw.",
   "Contributes to LEED v4 credits. EPD to EN 15804. FSC\u00ae material on request.",
   "Submittals: three sample boards, test reports and maintenance data, all from design@moso-bamboo.ca."],
  rel:["fire-ca","sgs","green"]},

 {id:"fire-ca", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac13439195f9172ed4a4219.pdf", code:"WUI \u00b7 IWUIC", c:C.thermo,
  kind:"Fire compliance", year:"Jul 2026", shelves:["fire","spec"], aud:"AB",
  title:"Thermo Fire Performance: California WUI & IWUIC",
  blurb:"One-page summary of Thermo decking and siding fire results, with California State Fire Marshal listing numbers.",
  stat:["FSI 15","ASTM E84 Class A"],
  figs:[["Class A","ASTM E84, flame spread 15"],["9.7 ft","Max flame front, ASTM E2768"],["Class B","CSFM SFM 12-7A"],["~73 lb/ft\u00b3","Density"]],
  facts:[
   {k:"e84", t:"ASTM E84 Class A with a flame spread index of 15, reached through density and resin, not surface-applied retardants."},
   "ASTM E2768 extended-duration test passed, maximum flame front 9.7 ft.",
   "California SFM 12-7A Class B. ASTM E108 roof assembly testing supports rooftop decks.",
   "CSFM listings: Thermo Decking 8110-2278:0503, Thermo Siding 8140-2278:0504.",
   "Applications: siding and cladding, rainscreen fa\u00e7ades, decking, rooftop decks, soffits, screening.",
   "Issued July 27, 2026 by MOSO North America."],
  rel:["fire-co","sgs","qai-roof"]},

 {id:"fire-co", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343d7d735ea2a1fdbc4d.pdf", code:"CWRC Zones 1 & 2", c:C.thermo,
  kind:"Fire compliance", year:"2026", shelves:["fire"], aud:"AB",
  title:"Thermo Fire Performance: Colorado Wildfire Code",
  blurb:"How Thermo's test results support use in Colorado Wildfire Resiliency Code (CWRC) Zone 1 and Zone 2 projects.",
  stat:["Zone 1 + 2","CWRC WUI"],
  figs:[["Class A","ASTM E84, FSI 15"],["Pass","ASTM E2768"],["Class B","CSFM 12-7A"]],
  facts:[
   "Same tested results as the California summary: E84 Class A (FSI 15), E2768 pass with 9.7 ft max flame front, CSFM 12-7A Class B.",
   "Supports use in CWRC Zone 1 and Zone 2 wildland-urban interface areas when part of a code-compliant assembly.",
   "Uses: decking, exterior cladding, rainscreen, soffits, architectural screening and fa\u00e7ade features.",
   "Fire resistance comes from high density (1170 kg/m\u00b3) and a thermoset phenolic binder that forms an insulating char."],
  rel:["fire-ca","sgs"]},

 {id:"sgs", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac13439195f9172ed4a421a.pdf", code:"CAN/ULC-S102", c:C.ink,
  kind:"Lab test report \u00b7 SGS", year:"Oct 2024", pages:6, shelves:["fire","spec"], aud:"A",
  title:"Surface Burning Test, CAN/ULC-S102",
  blurb:"The Canadian surface-burning test on Thermo decking boards, run by SGS. The Canadian counterpart to ASTM E84.",
  stat:["FSR 15","Flame spread rating"],
  figs:[["15","Flame spread rating"],["35","Smoke developed class"],["59\u201366 s","Time to ignition"]],
  facts:[
   "Standard: CAN/ULC-S102:2018+R1:2019, surface burning characteristics of building materials.",
   "Sample: MOSO Bamboo Thermo decking, 1830 \u00d7 137 \u00d7 20 mm, conditioned at 23\u00b0C / 50% RH.",
   "Three specimens; all charred rather than flaming through.",
   "Report SDFS2409006795FF-01, issued October 28, 2024 by SGS-CSTC."],
  rel:["qai-roof","fire-ca"]},

 {id:"qai-roof", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343a7d735ea2a1fdbbf5.pdf", code:"CAN/ULC-S107", c:C.ink,
  kind:"Lab test report \u00b7 QAI", year:"Apr 2025", pages:9, shelves:["fire","spec"], aud:"AB",
  title:"Rooftop Fire Test, CAN/ULC-S107",
  blurb:"Thermo decking tested as a roof covering. This is the report behind using MOSO on rooftop decks in Canada.",
  stat:["Class A","Spread of flame"],
  figs:[["Class A","Spread of flame"],["1.5 ft","Max flame spread (8 ft allowed)"],["0 ft","Lateral spread"]],
  facts:[
   {k:"class", t:"Met Class A spread-of-flame requirements of CAN/ULC-S107-19 at a 1/4:12 slope."},
   "Two 40\" \u00d7 8 ft test decks on 2\u00d74 Douglas Fir framing at 16\" OC, installed per MOSO's guide.",
   "Flame stopped at 1.5 ft on both specimens, with no lateral spread, in a 10-minute test.",
   "Report QA-1487F-1, QAI Laboratories, April 30, 2025."],
  rel:["sgs","fire-ca","techbook"]},

 {id:"qai-siding", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343ac478ac5535a3989e.pdf", code:"Siding \u00b7 Lab report", c:C.ink,
  kind:"Lab test report", year:"2024", shelves:["fire"], aud:"A",
  title:"Fire Resistance Report: Bamboo Siding",
  blurb:"The 2024 third-party fire resistance report for MOSO Bamboo siding. Scanned original, best read in full.",
  stat:["2024","Siding report"],
  facts:[
   "Full lab report covering MOSO Bamboo siding fire resistance (2024).",
   "This is a scanned document, so open it to read the results and test set-up.",
   "For a one-page summary of siding fire results, see the California WUI & IWUIC sheet."],
  rel:["fire-ca","spec"]},

 {id:"guide", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac13439c478ac5535a3986a.jpg", code:"14 pages", c:C.green,
  kind:"Step-by-step guide", year:"Decking", shelves:["install"], aud:"BH", guide:true,
  title:"Decking Installation Guide",
  blurb:"Fourteen illustrated pages, from planning the frame to the last clip and the first clean.",
  stat:["14","illustrated pages"],
  rel:["install","compare","warranty"]},

 {id:"install", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac134417d735ea2a1fdbd11.pdf", code:"Install + Care", c:C.green,
  kind:"Field tips", year:"2026", shelves:["install","care"], aud:"BH",
  title:"Installation & Maintenance Tips",
  blurb:"MOSO Canada's short field sheet: blades, pre-drilling, plugs, cleaning, de-icing and optional oiling.",
  stat:["2%","framing slope"],
  figs:[["2%","Framing slope"],["4\"","Clearance over permeable ground"],["60T","ATB carbide blade"],["80\u201390%","Pre-drill of screw diameter"]],
  facts:[
   "Wear gloves, a mask and goggles. Bamboo this hard throws hot dust when drilled or cut.",
   "Use a medium-torque drill driver, never an impact drill. Cool the bit in soapy water between holes.",
   "End-match lets boards float up to 8\" past a joist on each side.",
   "Sand with 120-grit on a square palm sander, with the fibre. Fill small gaps with bamboo sawdust and wood glue.",
   {k:"clean", t:"Clean with water, or baking soda and vinegar, and a stiff natural brush. Avoid high-pressure washing."},
   "Dark tannin marks around standing water in the first weeks are normal and brush off.",
   "De-ice with calcium or magnesium chloride, not salt.",
   "Oiling is optional. Messmer's or Sikkens recommended."],
  rel:["guide","warranty","compare"]},

 {id:"warranty", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac134407d735ea2a1fdbcd9.pdf", code:"25-year limited", c:C.green,
  kind:"Warranty", year:"2026", shelves:["care"], aud:"ABH",
  title:"25-Year Limited Warranty",
  blurb:"What's covered (rot, decay, insects), what isn't, and how a claim works.",
  stat:["25 yrs","from purchase"],
  figs:[["25 yrs","From original purchase"],["3","Covered: rot, decay, insects"]],
  facts:[
   {k:"cover", t:"Covers structural damage from rot, decay or insect infestation for 25 years from the original purchase."},
   "Remedy: MOSO supplies replacement material or refunds that portion of the price. Labour and reinstallation aren't covered.",
   "Not covered: normal weathering and colour change, checking and cupping within wood norms, finish fading, wear and tear.",
   "Not covered: ground contact or submerged use, improper spacing or installation, unsuitable sealants or stains.",
   "Mould growing on dust and pollen isn't covered, so keep the surface clean.",
   "Report visible defects before installing. Defects that could have been seen beforehand can't be claimed after."],
  rel:["install","compare"]},

 {id:"green", file:"https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6ac1343a22bc27f58f369408.pdf", code:"LCA \u00b7 EPD \u00b7 LEED", c:C.green,
  kind:"Sustainability brochure", year:"2026", shelves:["green","spec"], aud:"AH",
  title:"MOSO Mastering Green",
  blurb:"The life-cycle story: growth, production, use and end of life, with green-building credit tables.",
  stat:["5 yrs","to harvest"],
  figs:[["~1 m","Growth per day"],["4\u20135 yrs","Stem age at harvest"],["20\u201325%","Mature stems cut each year"],["EN 15804","EPD standard"]],
  facts:[
   "Moso is a giant grass. Harvesting mature stems leaves the forest standing, so there's no deforestation.",
   "Standard solid MOSO products are FSC\u00ae certified; plants are ISO 9001 and ISO 14001 certified.",
   "LCA with TU Delft; EPD published 2016, updated 2022. Production emissions are below carbon stored in growth (N-durance excluded).",
   "Credit tables for LEED v4, BREEAM and WELL, plus Green Star, HQE and DGNB support.",
   "End of life: reuse first, then chipboard, then biomass energy.",
   "References include CityLife Milan (Zaha Hadid, LEED Gold) and Bengaluru airport (LEED Platinum)."],
  rel:["techbook","spec"]},

 {id:"vid-tiles", file:"1BKHdm9GhmV1P4edLbJywx2BrX8-NeDXQ", code:"Video \u00b7 MP4", c:C.amber,
  kind:"Video", year:"Terra Tiles", shelves:["watch","install"], aud:"BH",
  title:"Terra Tiles Explained",
  blurb:"Kenny Bolduc walks through MOSO Terra deck tiles, the pedestal-mounted system for balconies and rooftops.",
  stat:["Video","Kenny Bolduc"],
  facts:["Deck tiles are 1-1/2 \u00d7 23-7/8 \u00d7 23-7/8\" and install on pedestals (from the Tech Book).","Large file, so it opens in Google Drive to stream."],
  rel:["qai-roof","techbook"]},

 {id:"vid-beams", file:"1vUB6LzLdUIR7-RtDqJbxMMmGf_fBI9XJ", code:"Video \u00b7 MP4", c:C.amber,
  kind:"Video", year:"Beams", shelves:["watch","product"], aud:"AB",
  title:"Strength of MOSO Frame Beams",
  blurb:"Kenny Bolduc on the strength of MOSO Bamboo framing beams.",
  stat:["Video","Kenny Bolduc"],
  facts:["Beams come in 2\u00d72, 2\u00d73, 2\u00d74 and 2\u00d76 sections (from the Tech Book).","The spec lists Thermo beams as non-structural, so confirm structural use with your engineer.","Opens in Google Drive to stream."],
  rel:["techbook","spec"]}
];

const CMP = {
  thermo:{name:"Thermo", c:"#3B2A1F", rows:[
    ["Made by","Thermal modification at 392\u00b0F, removing sugars and moisture"],
    ["Colour","Rich chocolate brown"],
    ["Profile","Reversible: smooth face or reeded face for grip"],
    ["Finish","Unfinished; oil optional"],
    ["Upkeep","No annual maintenance. Annual clean with Messmer's recommended"],
    ["Weathering","To silvery grey, like exotic hardwoods"],
    ["Fire","ASTM E84 Class A, FSI 15"]]},
  nd:{name:"N-durance", c:"#B57A3C", rows:[
    ["Made by","Steam-pressure treatment at 284\u00b0F"],
    ["Colour","Warm amber / caramel"],
    ["Profile","Rain-Shed: slightly cambered top that sheds water"],
    ["Finish","Pre-oiled with WOCA Exterior Oil (Teak)"],
    ["Upkeep","Annual clean and re-oil to keep the colour and the warranty"],
    ["Weathering","Can spot like other hardwoods if not maintained"],
    ["Fire","ASTM E84 Class A, FSI 10 (siding spec)"]]}
};


/* ---------- pencil-sketch art (viewBox 0 0 240 150) ---------- */
const rng=(a,b,s)=>{const o=[];for(let v=a;v<=b;v+=s)o.push(v);return o};
const T=(x,y,t,sz=8,anchor="middle",extra="")=>`<text x="${x}" y="${y}" font-size="${sz}" text-anchor="${anchor}" ${extra}>${t}</text>`;
const ground=(y=124)=>`<path d="M16 ${y}H224"/><path stroke-width=".8" d="${rng(22,218,9).map(x=>`M${x} ${y}l-5 6`).join("")}"/>`;

const ART={
  fire:()=>`${ground()}
    <rect x="44" y="64" width="64" height="60"/><rect x="108" y="34" width="34" height="90"/><rect x="142" y="58" width="64" height="66"/>
    <path d="M44 84H108M44 104H108M142 80H206M142 102H206"/>
    <path stroke-width=".8" d="${rng(54,100,11).map(x=>`M${x} 64V124`).join("")}${rng(152,198,11).map(x=>`M${x} 58V124`).join("")}${rng(116,134,9).map(x=>`M${x} 34V124`).join("")}${rng(48,118,14).map(y=>`M108 ${y}H142`).join("")}"/>
    <path d="M218 34V124M214 34h8M214 124h8"/><path stroke-width=".7" stroke-dasharray="2 3" d="M142 34H214"/>`,
  roof:()=>`${ground()}
    <rect x="36" y="78" width="168" height="46"/><path d="M36 100H204"/>
    <path stroke-width=".8" d="${rng(48,192,12).map(x=>`M${x} 78V124`).join("")}"/>
    <rect x="40" y="62" width="160" height="6" fill="url(#hatch)"/>
    <path d="${rng(50,190,28).map(x=>`M${x} 68V78M${x-4} 78h8`).join("")}"/>
    <path d="M168 62V30M146 38L168 26L190 38Z"/><path d="M60 62v-12h18v12M58 50h22"/>`,
  spec:()=>`<path fill="url(#hatch)" d="M34 42H196V49H203V57H196V64H34V57H41V49H34Z"/>
    <path d="M34 28H196M34 24v8M196 24v8"/>${T(115,22,'5-3/8"')}
    <path d="M214 42V64M210 42h8M210 64h8"/>${T(222,56,'3/4"',8,"start")}
    ${[86,100,114].map(y=>`<rect x="38" y="${y-3}" width="5" height="5" fill="#2F5A3B" stroke="none"/><path d="M50 ${y}H${108-((y/7)%3)*8}"/>`).join("")}
    ${[86,100,114].map(y=>`<rect x="128" y="${y-3}" width="5" height="5" fill="#2F5A3B" stroke="none"/><path d="M140 ${y}H${200-((y/14)%2)*14}"/>`).join("")}`,
  compare:()=>`<circle cx="70" cy="30" r="7" fill="#3B2A1F" stroke="none"/><circle cx="170" cy="30" r="7" fill="#B57A3C" stroke="none"/>
    <path fill="url(#hatch)" d="M30 86V58${rng(30,106,6).map(x=>`Q${x+3} 53 ${x+6} 58`).join("")}V86Z"/>
    <path fill="url(#hatch)" d="M134 86V62Q170 48 206 62V86H175V82H165V86Z"/>
    ${T(70,106,"THERMO",8.5,"middle",'letter-spacing="1.5"')}${T(170,106,"N-DURANCE",8.5,"middle",'letter-spacing="1.5"')}
    ${T(70,120,"reeded / smooth",7)}${T(170,120,"rain-shed camber",7)}<path stroke-width=".8" d="M120 44V126"/>`,
  book:()=>`<path d="M36 34L118 44V126L36 116Z"/><path d="M118 44L200 34V116L118 126Z"/>
    <path stroke-width=".8" d="${[56,66,76,86,96].map((y,i)=>`M46 ${y-2+i*.6}L${104-i*4} ${y+5}`).join("")}"/>
    <path fill="url(#hatch)" d="M130 52L188 46V82L130 88Z"/>
    <path d="M130 98L186 92M130 106L170 102"/>
    <path d="M58 38q-4 -18 10 -26q2 16 -10 26zM58 38q4-12 10-26"/>`,
  guide:()=>`<path d="M30 126V44L112 126Z"/><path d="M44 112V78L78 112Z"/>
    <path stroke-width=".8" d="${rng(36,104,8).map(x=>`M${x} 126v-5`).join("")}"/>
    <g transform="rotate(-7 160 70)"><rect x="108" y="40" width="98" height="58"/>
      <path stroke-width=".8" d="M118 88Q150 50 196 58M118 78H170M150 50V96"/>
      <ellipse cx="206" cy="69" rx="7" ry="29" fill="#FBFAF7"/><ellipse cx="206" cy="69" rx="2.5" ry="10"/></g>
    <path fill="#FBFAF7" d="M92 132L188 112L191 119L95 139Z"/><path d="M188 112L202 113L191 119"/><path d="M98 133l-4 1 1 5"/>`,
  tools:()=>`<rect x="34" y="98" width="172" height="26" fill="url(#hatch)"/>
    <path d="M38 72H112V79H116V85H112V92H38Z"/><path d="M202 72H128V79H124V85H128V92H202Z"/>
    <path stroke-width="1.8" d="M116 82H124M117 77V88M123 77V88"/>
    <path d="M120 40V98M114 40H126"/><path stroke-width=".8" d="${rng(46,94,6).map(y=>`M117 ${y}l6 3`).join("")}"/>
    <path d="M112 30H128M112 26v8M128 26v8"/>${T(120,22,'1/4" gap',7.5)}
    ${T(74,140,"BOARD",7,"middle",'letter-spacing="1"')}${T(166,140,"JOIST BELOW",7,"middle",'letter-spacing="1"')}`,
  warranty:()=>`<path d="M58 22H130L150 42V128H58Z"/><path d="M130 22V42H150"/>
    <path stroke-width=".8" d="${[52,62,72,82,92,102].map((y,i)=>`M70 ${y}H${[138,126,140,118,134,110][i]}`).join("")}"/>
    <path fill="#FBFAF7" d="M162 66C174 62 182 58 188 52C194 58 202 62 214 66V88C214 106 202 118 188 124C174 118 162 106 162 88Z"/>
    <path stroke="#009F4B" stroke-width="3" d="M176 88L185 97L201 79"/>`,
  green:()=>`${ground(132)}
    ${[[98,18],[116,10],[134,26]].map(([x,t])=>`<rect x="${x}" y="${t}" width="10" height="${132-t}" rx="2"/><path stroke-width=".9" d="${rng(t+16,124,17).map(y=>`M${x-1} ${y}h12`).join("")}"/>`).join("")}
    ${[[108,40,1],[108,68,1],[126,30,1],[144,54,1],[98,50,-1],[98,86,-1],[116,60,-1],[134,40,-1]].map(([x,y,d])=>`<path d="M${x} ${y}q${d*16} -14 ${d*36} -6q${-d*18} 8 ${-d*36} 6z"/>`).join("")}`,
  video:()=>`<rect x="46" y="22" width="148" height="88" rx="4"/><path d="M110 110V122M86 124H154"/>
    <circle cx="120" cy="66" r="20"/><path fill="#3A3A3A" d="M114 55L132 66L114 77Z"/>
    <path stroke-width=".8" d="M56 100H184"/><circle cx="96" cy="100" r="2.5" fill="#009F4B" stroke="none"/>`
};

/* small badges beside the sheet label, like the Class A / 25 / CO2 marks on the site's PDF cards */
const BADGE={
  fire:t=>`<svg class="badge" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19.5" fill="#111"/>
    <path d="M20 6c4 5 6 8 5 12c2-1 3-3 3-5c3 4 3 9 0 12c-3 3-11 3-14 0c-3-3-2-7 1-10c0 2 1 3 2 4c-1-5 0-9 3-13z" fill="none" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M20 17c2 3 3 5 1 8c-1 1-3 1-4 0c-1-2 0-4 1-5c0 1 1 2 1 2c0-2 0-3 1-5z" fill="#fff"/>
    ${t?`<text x="20" y="34" font-size="5.6" font-weight="700" text-anchor="middle" fill="#fff" font-family="Montserrat,sans-serif">${t}</text>`:""}</svg>`,
  warranty:()=>`<svg class="badge" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19.5" fill="#1E2A20"/><circle cx="20" cy="20" r="15" fill="none" stroke="#009F4B" stroke-width="1"/>
    <text x="20" y="25" font-size="13" font-weight="700" text-anchor="middle" fill="#3FBF6E" font-family="Montserrat,sans-serif">25</text>
    <text x="20" y="32.5" font-size="4" font-weight="600" text-anchor="middle" fill="#fff" letter-spacing=".6" font-family="Montserrat,sans-serif">YEARS</text></svg>`,
  co2:()=>`<svg class="badge" viewBox="0 0 44 36" style="width:36px" aria-hidden="true"><path d="M10 30a8 8 0 0 1-1-16a10 10 0 0 1 19-4a8 8 0 0 1 8 10a6 6 0 0 1-2 10z" fill="#2B2B2B"/>
    <text x="21" y="25" font-size="8.5" text-anchor="middle" fill="#fff" font-family="Montserrat,sans-serif">CO\u2082</text>
    <rect x="30" y="3" width="9" height="7" rx="1" fill="#009F4B"/><path d="M32 3V1.5a2.5 2.5 0 0 1 5 0V3" fill="none" stroke="#009F4B" stroke-width="1.3"/></svg>`
};

const LOOK={
  techbook:{art:"book",label:"2026 Tech Book"},
  compare:{art:"compare",label:"Thermo vs N-durance"},
  spec:{art:"spec",label:"Product Specs & Technical Data"},
  "fire-ca":{art:"fire",label:"California WUI & IWUIC",badge:["fire","Class A"]},
  "fire-co":{art:"fire",label:"Colorado Wildfire Code",badge:["fire","Class A"]},
  sgs:{art:"fire",label:"CAN/ULC-S102 Surface Burning",badge:["fire","FSR 15"]},
  "qai-roof":{art:"roof",label:"CAN/ULC-S107 Rooftops",badge:["fire","Class A"]},
  "qai-siding":{art:"fire",label:"Siding Fire Report",badge:["fire",""]},
  guide:{art:"guide",label:"Installation & Design Guidance"},
  install:{art:"tools",label:"Install & Care Tips"},
  warranty:{art:"warranty",label:"Product Warranty Information",badge:["warranty"]},
  green:{art:"green",label:"Enormous Carbon Storage",badge:["co2"]},
  "vid-tiles":{art:"video",label:"Terra Tiles Explained"},
  "vid-beams":{art:"video",label:"Strength of MOSO Beams"}
};

function paper(d,i){
  const L=LOOK[d.id], b=L.badge?BADGE[L.badge[0]](L.badge[1]):"";
  return `<div class="sheetp"><span class="tabk"></span>
    <svg class="art" viewBox="0 0 240 150" aria-hidden="true">${ART[L.art]()}</svg>
    <div class="plabel">${b}<span>${esc(L.label)}</span></div></div>`;
}

/* ---------- state ---------- */
let aud="all", shelf="all", openId=null, page=0, cmpSide="thermo", lastFocus=null;
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
const byId=id=>DOCS.find(d=>d.id===id);
const txt=f=>typeof f==="string"?f:f.t;
const AUD={A:"Architects",B:"Builders",H:"Homeowners"};
const forAud=d=>aud==="all"||d.aud.includes(aud);

function visible(){ return DOCS.filter(d=>forAud(d)&&(shelf==="all"||d.shelves.includes(shelf))); }

function renderTabs(){
  $("#tabs").innerHTML=SHELVES.map(s=>{
    const n=DOCS.filter(d=>forAud(d)&&(s.id==="all"||d.shelves.includes(s.id))).length;
    return `<button role="tab" aria-selected="${s.id===shelf}" data-shelf="${s.id}">${s.name}<sup>${n}</sup></button>`;
  }).join("");
}

function card(d,i){
  return `<button class="doc" data-open="${d.id}">
    <div class="panel">${paper(d,i)}</div>
    <div class="cap"><span class="ct">${esc(d.title)}</span><span class="cm">${esc(d.kind)} \u00b7 ${esc(d.year)}</span></div></button>`;
}

function render(){
  const s=SHELVES.find(x=>x.id===shelf);
  $("#shelfTitle").textContent=s.id==="all"?"All Documents":s.name;
  $("#shelfText").textContent=s.text;
  const v=visible();
  $("#grid").innerHTML=v.length?v.map(card).join(""):`<div class="empty">Nothing on this shelf for ${AUD[aud]} yet. <button data-aud-reset>Show all documents</button></div>`;
  renderTabs();
}

/* ---------- sheet ---------- */
function compareHTML(){
  const s=CMP[cmpSide];
  return `<div class="sec"><h5>Compare the two</h5>
    <div class="cmp-switch" role="group" aria-label="Choose material">
      ${Object.entries(CMP).map(([k,v])=>`<button data-cmp="${k}" aria-pressed="${k===cmpSide}"><i style="background:${v.c}"></i>${v.name}</button>`).join("")}
    </div>
    <div class="cmp">${s.rows.map(r=>`<div>${esc(r[0])}</div><div>${esc(r[1])}</div>`).join("")}</div></div>`;
}

function calcHTML(){
  return `<form class="calc" id="calc" onsubmit="return false">
    <label for="cArea">Deck area (sq ft)<input id="cArea" type="number" min="1" value="300" inputmode="numeric"></label>
    <label for="cJoist">Joist spacing<select id="cJoist"><option value="0">12" OC</option><option value="1" selected>16" OC</option><option value="2">18" OC</option><option value="3">24" OC</option></select></label>
    <label for="cWidth">Board width<select id="cWidth"><option value="w6" selected>6" (5-3/8")</option><option value="w4">4"</option></select></label>
    <output id="cOut" for="cArea cJoist cWidth"></output></form>`;
}
const COVER={w6:{b360:[180,200,228,308],b90:[45,50,57,77]},w4:{b360:[140,160,188,268],b90:[35,40,47,67]}};
function runCalc(){
  const a=parseFloat($("#cArea").value)||0, j=+$("#cJoist").value, c=COVER[$("#cWidth").value];
  const big=Math.floor(a/c.b360[j]), small=Math.ceil((a-big*c.b360[j])/c.b90[j]), allSmall=Math.ceil(a/c.b90[j]);
  let mix;
  if(small>=4) mix=`<b>${big+1}</b> box${big+1>1?"es":""} of 360`;
  else if(big===0) mix=`<b>${small}</b> box${small!==1?"es":""} of 90`;
  else mix=`<b>${big}</b> \u00d7 360 + <b>${small}</b> \u00d7 90`;
  $("#cOut").innerHTML=a>0?`${mix}<br><span style="color:var(--mute);font-size:14px">Or ${allSmall} boxes of 90. One 360 box covers ${c.b360[j]} sq ft at this spacing.</span>`:"Enter your deck area.";
}

function guideHTML(){
  const g=GUIDE[page];
  return `<div class="sec"><h5>Walk through the guide</h5>
    <div class="steps">${GUIDE.map((x,i)=>`<button aria-label="Page ${i+1}: ${esc(x.t)}" data-page="${i}" class="${i<page?"done":i===page?"cur":""}"></button>`).join("")}</div>
    <div class="step-head"><h6>${esc(g.t)}</h6><span>Page ${page+1} of ${GUIDE.length}</span></div>
    <ul class="facts" style="margin-top:12px">${g.p.map(p=>`<li>${esc(p)}</li>`).join("")}</ul>
    ${g.calc?calcHTML():""}
    <div class="step-nav">
      <button data-step="-1" ${page===0?"disabled":""}>\u2039 Previous</button>
      <a href="${D(g.f)}" target="_blank" rel="noopener">See the illustrated page \u203a</a>
      <button data-step="1" ${page===GUIDE.length-1?"disabled":""}>Next \u203a</button>
    </div></div>`;
}

const isImg=f=>/\.(jpe?g|png|webp)$/i.test(f);
const PREV=f=>/^https?:/.test(f)?f+(isImg(f)?"":"#view=FitH"):"https://drive.google.com/file/d/"+f+"/preview";
const OPEN=f=>D(f);
function sheetHTML(d){
  const who=d.aud.split("").map(a=>AUD[a]).join(", ");
  const f=d.guide?GUIDE[page].f:d.file;
  const label=d.kind==="Video"?"Watch in a new tab \u203a":d.guide?"Open this page \u203a":"Open the PDF \u203a";
  const pager=d.guide?`<div class="pager"><button data-step="-1" aria-label="Previous page" ${page===0?"disabled":""}>\u2039</button><span>Page ${page+1} of ${GUIDE.length}</span><button data-step="1" aria-label="Next page" ${page===GUIDE.length-1?"disabled":""}>\u203a</button></div>`:"";
  return `<div class="vhead">
    <div class="ttl"><h2 id="sTitle">${esc(d.guide?d.title+": "+GUIDE[page].t:d.title)}</h2>
      <div class="meta-line">${esc(d.kind)} \u00b7 ${esc(d.year)}${d.pages?` \u00b7 ${d.pages} pages`:""} \u00b7 For ${who}</div></div>
    <div class="vtools">${pager}<a class="btn" href="${OPEN(f)}" target="_blank" rel="noopener">${label}</a></div>
  </div>
  <div class="frame">
    <div class="wait">${paper(d,0)}<p>Loading the document. If it doesn't appear, use the green button to open it in a new tab.</p></div>
    ${isImg(f)?`<div class="imgview"><img src="${PREV(f)}" alt="${esc(GUIDE[page]?GUIDE[page].t:d.title)}"></div>`:`<iframe src="${PREV(f)}" title="${esc(d.title)}" allow="autoplay" loading="lazy"></iframe>`}
  </div>`;
}

function openDoc(id,opts={}){
  const d=byId(id); if(!d) return;
  const fresh=!openId, same=openId===id;
  if(fresh) lastFocus=document.activeElement;
  if(d.guide) page=opts.page!=null?opts.page:(same?page:0);
  openId=id;
  $("#sBody").innerHTML=sheetHTML(d);
  $("#sheet").classList.add("on"); $("#veil").classList.add("on");
  $("#sheet").setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
  if(fresh) setTimeout(()=>$("#close").focus({preventScroll:true}),50);
  try{history.replaceState(null,"","#"+id)}catch(e){}
}
function closeDoc(){
  openId=null;
  $("#sheet").classList.remove("on"); $("#veil").classList.remove("on");
  $("#sheet").setAttribute("aria-hidden","true");
  document.body.style.overflow="";
  try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}
  if(lastFocus) lastFocus.focus({preventScroll:true});
}
function stepDoc(dir){
  const list=visible().length?visible():DOCS;
  let i=list.findIndex(d=>d.id===openId); if(i<0) i=0;
  openDoc(list[(i+dir+list.length)%list.length].id);
}

/* ---------- events ---------- */
document.addEventListener("click",e=>{
  const t=e.target.closest("button,[data-open]"); if(!t) return;
  if(t.dataset.open){openDoc(t.dataset.open);return}
  if(t.dataset.aud){aud=t.dataset.aud;document.querySelectorAll("[data-aud]").forEach(b=>b.setAttribute("aria-pressed",b===t));render();return}
  if(t.hasAttribute("data-aud-reset")){document.querySelector('[data-aud="all"]').click();return}
  if(t.dataset.shelf){shelf=t.dataset.shelf;render();try{localStorage.setItem("mosoShelf",shelf)}catch(err){}return}
  if(t.dataset.cmp){cmpSide=t.dataset.cmp;openDoc("compare");return}
  if(t.dataset.step){page=Math.max(0,Math.min(GUIDE.length-1,page+ +t.dataset.step));openDoc("guide",{page});return}
  if(t.dataset.page!=null && openId==="guide"){page=+t.dataset.page;openDoc("guide",{page});return}
  if(t.dataset.copy){
    const v=t.dataset.copy, done=()=>{t.textContent="Copied";setTimeout(()=>t.textContent="Copy",1400)};
    try{navigator.clipboard.writeText(v).then(done,()=>selectSib(t))}catch(err){selectSib(t)}
  }
});
function selectSib(btn){const s=btn.previousElementSibling;const r=document.createRange();r.selectNodeContents(s);const sel=getSelection();sel.removeAllRanges();sel.addRange(r);btn.textContent="Press Ctrl/\u2318 C"}
$("#close").onclick=closeDoc; $("#veil").onclick=closeDoc;
$("#prevDoc").onclick=()=>stepDoc(-1); $("#nextDoc").onclick=()=>stepDoc(1);
document.addEventListener("input",e=>{if(e.target.closest("#calc")) runCalc()});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"&&openId){closeDoc();return}
  if(openId==="guide"&&(e.key==="ArrowRight"||e.key==="ArrowLeft")&&!e.target.closest("input,select")){page=Math.max(0,Math.min(GUIDE.length-1,page+(e.key==="ArrowRight"?1:-1)));openDoc("guide",{page})}
});

/* restore + deep link (#fire, #install, or a document id like #warranty) */
try{const s=localStorage.getItem("mosoShelf"); if(s&&SHELVES.some(x=>x.id===s)) shelf=s}catch(e){}
const h=location.hash.slice(1);
if(SHELVES.some(x=>x.id===h)) shelf=h;
render();
if(byId(h)) openDoc(h);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
