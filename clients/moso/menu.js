/* ============================================================
   MOSO BAMBOO CANADA — NAV / MEGA MENU (Version 1 on GitHub)
   Draws the whole site menu (desktop mega menu + mobile menu).
   Loaded by the menu's Custom Code element in the header global
   section (pasted once, never changes):
     <div id="moso-menu"></div>
     <script src="https://northshorebuzz.github.io/clients/moso/menu.js" defer></script>

   To change links, labels or images: edit MARKUP below and push.
   Menu images: the data-img / src URLs in MARKUP (menu image update skill).
   Styles: CSS below. Behaviour: the function at the bottom.
   V1 (Nov 28, 2026): copied word for word from the "MOSO Menu — Current"
   artifact (v25). That artifact is now a reference copy only.
   ============================================================ */
(function(){
  if (window.__mosoMenu) return;
  window.__mosoMenu = true;

  var FONT = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&display=swap';

  var CSS = `
  .moso-nav, .moso-nav * {
    box-sizing: border-box !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .moso-nav {
    --moso-primary: #009F4B;
    --moso-primary-hover: #007839;
    --moso-foreground: #000000;
    --moso-background: #ffffff;
    --moso-border: #e5e5e5;
    --moso-muted: #5a5a5a;
    --moso-muted-bg: #f5f5f5;

    font-family: "Montserrat", "Century Gothic", "Segoe UI", system-ui, -apple-system, sans-serif !important;
    background: var(--moso-background) !important;
    border-bottom: none !important;
    width: 100% !important;
    position: relative !important;
    z-index: 9999 !important;
    color: var(--moso-foreground) !important;
    line-height: 1.5 !important;
  }

  .moso-nav__inner {
    max-width: 1600px !important;
    margin: 0 auto !important;
    padding: 0 24px !important;
    position: relative !important;
  }
  @media (min-width: 1024px) {
    .moso-nav__inner {
      padding: 0 48px !important;
    }
  }

  .moso-nav__bar {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 14px 0 !important;
    gap: 24px !important;
  }

  .moso-logo {
    display: flex !important;
    align-items: center !important;
    text-decoration: none !important;
    flex-shrink: 0 !important;
  }
  .moso-logo img {
    height: 83px !important;
    width: auto !important;
    max-width: 100% !important;
    display: block !important;
    object-fit: contain !important;
    border: none !important;
  }
  @media (max-width: 640px) {
    .moso-logo img {
      height: 60px !important;
    }
  }

  .moso-desktop {
    display: none;
    flex-direction: column !important;
    align-items: flex-end !important;
    gap: 14px !important;
    flex-grow: 1 !important;
  }
  @media (min-width: 1024px) {
    .moso-desktop {
      display: flex !important;
    }
  }

  .moso-util {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    gap: 24px !important;
    font-size: 13px !important;
    color: rgba(0, 0, 0, 0.75) !important;
    width: 100% !important;
  }
  .moso-util a {
    color: rgba(0, 0, 0, 0.75) !important;
    text-decoration: none !important;
    font-weight: 400 !important;
    transition: color 0.15s ease !important;
    display: inline-flex !important;
    align-items: center !important;
  }
  .moso-util a:hover {
    color: var(--moso-primary) !important;
  }
  .moso-tagline {
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    color: var(--moso-primary) !important;
    letter-spacing: -0.01em !important;
  }
  .moso-phone {
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px !important;
    font-weight: 500 !important;
    color: var(--moso-foreground) !important;
  }
  .moso-phone:hover {
    color: var(--moso-primary-hover) !important;
  }
  .moso-phone svg {
    width: 14px !important;
    height: 14px !important;
    fill: currentColor !important;
  }

  .moso-mainnav {
    display: flex !important;
    align-items: center !important;
    gap: 36px !important;
    font-size: 18px !important;
    font-weight: 700 !important;
    letter-spacing: -0.01em !important;
  }
  @media (min-width: 1280px) {
    .moso-mainnav {
      gap: 44px !important;
    }
  }

  .moso-mainnav a.moso-simple,
  .moso-mainnav button.moso-trigger {
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px !important;
    background: none !important;
    border: none !important;
    cursor: pointer !important;
    font: inherit !important;
    color: var(--moso-foreground) !important;
    text-decoration: none !important;
    padding: 0 0 6px 0 !important;
    margin: 0 !important;
    border-bottom: 2px solid transparent !important;
    transition: color 0.15s ease, border-color 0.15s ease !important;
    white-space: nowrap !important;
  }
  .moso-mainnav a.moso-simple:hover,
  .moso-mainnav button.moso-trigger:hover {
    color: var(--moso-primary-hover) !important;
    border-bottom-color: var(--moso-primary-hover) !important;
  }
  .moso-mainnav button.moso-trigger.is-active,
  .moso-mainnav a.moso-simple.is-active {
    color: var(--moso-primary) !important;
    border-bottom-color: var(--moso-primary) !important;
  }
  .moso-chev {
    width: 15px !important;
    height: 15px !important;
    transition: transform 0.2s ease !important;
  }
  .moso-trigger.is-active .moso-chev {
    transform: rotate(180deg) !important;
  }

  .moso-panel {
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    top: 100% !important;
    width: 100% !important;
    background: #ffffff !important;
    border-top: none !important;
    border-bottom: 1px solid var(--moso-border) !important;
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.12) !important;
    display: none;
    z-index: 9500 !important;
  }
  .moso-panel.is-open {
    display: block !important;
    animation: mosoFade 0.18s ease !important;
  }
  @keyframes mosoFade {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: none; }
  }

  .moso-panel__inner {
    max-width: 1600px !important;
    margin: 0 auto !important;
    padding: 32px 48px !important;
  }
  @media (max-width: 640px) {
    .moso-panel__inner {
      padding: 24px !important;
    }
  }

  .moso-panel-flex {
    display: flex !important;
    align-items: flex-start !important;
    gap: 48px !important;
  }
  @media (min-width: 1280px) {
    .moso-panel-flex {
      gap: 64px !important;
    }
  }

  .moso-cols-group {
    display: flex !important;
    align-items: flex-start !important;
    gap: 60px !important;
  }
  @media (min-width: 1280px) {
    .moso-cols-group {
      gap: 80px !important;
    }
  }

  .moso-col-compact {
    min-width: 200px !important;
  }

  .moso-thumb {
    position: relative !important;
    overflow: hidden !important;
    border-radius: 6px 100px 6px 6px !important;
    aspect-ratio: 4 / 5 !important;
    border: 1px solid rgba(0, 0, 0, 0.06) !important;
    background: #f0f0f0 !important;
    min-height: 240px !important;
  }
  .moso-thumb img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
  }

  .moso-col ul {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  .moso-col ul li {
    margin: 0 0 14px 0 !important;
    list-style: none !important;
  }
  .moso-col ul li:last-child {
    margin-bottom: 0 !important;
  }
  .moso-col a:not(#nsb-boost):not(#nsb-boost2) {
    color: rgba(0, 0, 0, 0.9) !important;
    text-decoration: none !important;
    font-weight: 500 !important;
    font-size: 15px !important;
    line-height: 1.35 !important;
    transition: color 0.15s ease !important;
    display: inline-block !important;
  }
  .moso-col a:hover:not(#nsb-boost):not(#nsb-boost2) {
    color: var(--moso-primary) !important;
    text-decoration: underline !important;
  }

  .moso-col-title {
    font-size: 20px !important;
    font-weight: 700 !important;
    color: var(--moso-foreground) !important;
    margin: 0 0 16px 0 !important;
    line-height: 1.25 !important;
    letter-spacing: -0.01em !important;
    display: block !important;
  }
  .moso-col-desc {
    font-size: 14px !important;
    color: var(--moso-muted) !important;
    line-height: 1.6 !important;
    margin: 0 0 16px 0 !important;
    display: block !important;
  }

  .moso-mobile-actions {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
  }
  @media (min-width: 1024px) {
    .moso-mobile-actions {
      display: none !important;
    }
  }
  .moso-mobile-phone {
    display: inline-flex !important;
    align-items: center !important;
    color: var(--moso-primary) !important;
    text-decoration: none !important;
    padding: 8px !important;
  }
  .moso-mobile-phone svg {
    width: 20px !important;
    height: 20px !important;
    fill: currentColor !important;
  }
  .moso-mobile-toggle {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: none !important;
    border: none !important;
    cursor: pointer !important;
    color: var(--moso-foreground) !important;
    padding: 6px !important;
    font-size: 26px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
  }

  .moso-mobile-menu {
    display: none;
    border-top: 1px solid var(--moso-border) !important;
    padding: 20px 0 24px !important;
    background: #ffffff !important;
  }
  .moso-mobile-menu.is-open {
    display: block !important;
  }
  .moso-mobile-tagline {
    text-align: center !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    color: var(--moso-primary) !important;
    margin-bottom: 16px !important;
  }
  .moso-mobile-util {
    padding-bottom: 16px !important;
    margin-bottom: 16px !important;
    border-bottom: 1px solid var(--moso-border) !important;
    font-size: 13px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
  }
  .moso-mobile-util a {
    color: rgba(0, 0, 0, 0.75) !important;
    text-decoration: none !important;
  }
  .moso-mobile-util a:hover {
    color: var(--moso-primary) !important;
  }

  .moso-mobile-list .moso-item {
    margin-bottom: 16px !important;
  }
  .moso-mobile-list .moso-acc-btn {
    display: flex !important;
    width: 100% !important;
    justify-content: space-between !important;
    align-items: center !important;
    background: none !important;
    border: none !important;
    cursor: pointer !important;
    font: inherit !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    color: var(--moso-foreground) !important;
    padding: 8px 0 !important;
    text-align: left !important;
  }
  .moso-mobile-list .moso-acc-btn:hover {
    color: var(--moso-primary-hover) !important;
  }
  .moso-mobile-list .moso-acc-content {
    display: none;
    padding-left: 14px !important;
    margin-top: 8px !important;
    border-left: 2px solid rgba(0, 159, 75, 0.4) !important;
  }
  .moso-mobile-list .moso-acc-content.is-open {
    display: block !important;
  }
  .moso-mobile-list .moso-acc-content a {
    display: block !important;
    padding: 6px 0 !important;
    text-decoration: none !important;
    color: rgba(0, 0, 0, 0.85) !important;
    font-size: 14px !important;
  }
  .moso-mobile-list .moso-acc-content a:hover {
    color: var(--moso-primary-hover) !important;
  }
  .moso-mobile-list .moso-acc-content a.moso-featured {
    color: var(--moso-primary) !important;
    font-weight: 600 !important;
  }
  .moso-mobile-list a.moso-simple {
    display: block !important;
    text-decoration: none !important;
    color: var(--moso-foreground) !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    padding: 8px 0 !important;
  }
  .moso-mobile-list a.moso-simple:hover {
    color: var(--moso-primary-hover) !important;
  }
`;

  var MARKUP = `
<header class="moso-nav" id="mosoNav">
  <div class="moso-nav__inner">
    <div class="moso-nav__bar">
      <a class="moso-logo" href="/" aria-label="MOSO Bamboo home">
        <img
          src="https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6abffd53f30b488137b91c37.jpg"
          alt="MOSO Bamboo"
        />
      </a>

      <div class="moso-desktop">
        <div class="moso-util">
          <a href="/contact-us">Order a sample</a>
          <a class="moso-phone" href="tel:6049988884">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.21c.27-.27.35-.66.24-1.01A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>
            604-998-8884
          </a>
          <span class="moso-tagline">Naturally Beautiful Beyond Sustainable</span>
        </div>

        <nav class="moso-mainnav">
          <button class="moso-trigger" type="button" data-target="mosoPanelProducts">
            <span>Products</span>
            <svg class="moso-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          <a class="moso-simple" href="/architects">Architects</a>

          <a class="moso-simple" href="/projects-canada">Projects</a>

          <button class="moso-trigger" type="button" data-target="mosoPanelCanada">
            <span>Learn More</span>
            <svg class="moso-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          <a class="moso-simple" href="/find-moso">Find MOSO</a>
          <a class="moso-simple" href="/contact-us">Contact</a>
        </nav>
      </div>

      <div class="moso-mobile-actions">
        <a class="moso-mobile-phone" href="tel:6049988884" aria-label="Call MOSO Bamboo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.21c.27-.27.35-.66.24-1.01A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>
        </a>
        <button class="moso-mobile-toggle" id="mosoMobileToggle" type="button" aria-label="Toggle navigation">
          \u2261
        </button>
      </div>
    </div>

    <div class="moso-mobile-menu" id="mosoMobileMenu">
      <div class="moso-mobile-tagline">Naturally Beautiful Beyond Sustainable</div>
      <div class="moso-mobile-util">
        <a class="moso-phone" href="tel:6049988884" style="font-weight:600;color:var(--moso-primary);display:inline-flex;align-items:center;gap:6px;">
          <svg viewBox="0 0 24 24" aria-hidden="true" style="width:14px;height:14px;fill:currentColor;"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.21c.27-.27.35-.66.24-1.01A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>
          604-998-8884
        </a>
        <a href="/contact-us">Order a sample</a>
      </div>
      <div class="moso-mobile-list">
        <div class="moso-item">
          <button class="moso-acc-btn" type="button" data-acc="m-prod">Products <span>\u25be</span></button>
          <div class="moso-acc-content" id="m-prod">
            <a href="/decking">Decking</a>
            <a href="/terra-tiles">Tiles</a>
            <a href="/cladding-siding">Siding &amp; Cladding</a>
            <a href="/privacy-screens">Privacy Screens</a>
            <a href="/boards-beams">Boards &amp; Beams</a>
          </div>
        </div>

        <a class="moso-simple" href="/architects">Architects</a>

        <a class="moso-simple" href="/projects-canada">Projects</a>

        <div class="moso-item">
          <button class="moso-acc-btn" type="button" data-acc="m-canada">Learn More <span>\u25be</span></button>
          <div class="moso-acc-content" id="m-canada">
            <a href="/about-moso-canada">About MOSO Canada</a>
            <a href="/pdf/installation-maintenance-tips-217336">Installation &amp; Maintenance</a>
            <a href="/helpful-documents">Technical Documents</a>
          </div>
        </div>

        <a class="moso-simple" href="/find-moso">Find MOSO</a>
        <a class="moso-simple" href="/contact-us">Contact</a>
      </div>
    </div>
  </div>

  <div class="moso-panel" id="mosoPanelProducts">
    <div class="moso-panel__inner">
      <div class="moso-panel-flex">
        <div class="moso-thumb" style="width: 280px; flex-shrink: 0;">
          <img
            id="mosoProductImg"
            src="https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6aa894a703687f733ec00fae.jpg"
            alt="MOSO Bamboo Product Preview"
            style="transition: opacity 0.2s ease;"
          />
        </div>

        <div class="moso-cols-group">
          <div class="moso-col moso-col-compact">
            <div class="moso-col-title">MOSO Bamboo<br/>Products</div>
            <ul>
              <li>
                <a href="/decking" data-img="https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6aa894a703687f733ec00fae.jpg">Decking</a>
              </li>
              <li>
                <a href="/terra-tiles" data-img="https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6aa894a7908c778faa52cab1.jpg">Tiles</a>
              </li>
              <li>
                <a href="/cladding-siding" data-img="https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6aa894a79f5a41333a6369cd.jpg">Siding &amp; Cladding</a>
              </li>
            </ul>
          </div>

          <div class="moso-col moso-col-compact">
            <div class="moso-col-title" style="visibility:hidden;pointer-events:none;user-select:none;" aria-hidden="true">MOSO Bamboo<br/>Products</div>
            <ul>
              <li>
                <a href="/privacy-screens" data-img="https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6aad51a216266d0c3a71f84f.jpg">Privacy Screens</a>
              </li>
              <li>
                <a href="/boards-beams" data-img="https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6aa894a749f830e49b2b344f.jpg">Boards &amp; Beams</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="moso-panel" id="mosoPanelCanada">
    <div class="moso-panel__inner">
      <div class="moso-panel-flex">
        <div class="moso-thumb" style="width: 280px; flex-shrink: 0;">
          <img src="https://assets.cdn.filesafe.space/ygWJrQgN18T8KnmLmDHr/media/6aa89a6649f830e49b2ba2b9.jpg" alt="Learn More about MOSO" />
        </div>

        <div class="moso-cols-group">
          <div class="moso-col moso-col-compact">
            <div class="moso-col-title">Learn More</div>
            <ul>
              <li><a href="/about-moso-canada">About MOSO Canada</a></li>
              <li><a href="/pdf/installation-maintenance-tips-217336">Installation &amp; Maintenance</a></li>
              <li><a href="/helpful-documents">Technical Documents</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
`;

  function addFont(){
    if (document.querySelector('link[href="' + FONT + '"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = FONT;
    document.head.appendChild(l);
  }

  function mount(){
    var spot = document.getElementById('moso-menu');
    if (!spot) return;
    addFont();
    var st = document.createElement('style');
    st.id = 'moso-menu-css';
    st.textContent = CSS;
    document.head.appendChild(st);
    spot.innerHTML = MARKUP;
    behaviour();
  }

  /* ---------- behaviour (unchanged from the pasted embed) ---------- */
  function behaviour(){
(function(){
  var nav = document.getElementById('mosoNav');
  if(!nav) return;

  var triggers = nav.querySelectorAll('.moso-trigger');
  var panels = nav.querySelectorAll('.moso-panel');
  var closeTimeout = null;

  function closeAllPanels(){
    panels.forEach(function(p){ p.classList.remove('is-open'); });
    triggers.forEach(function(t){ t.classList.remove('is-active'); });
  }

  function openPanel(id, trigger){
    closeAllPanels();
    var panel = document.getElementById(id);
    if(panel && trigger){
      panel.classList.add('is-open');
      trigger.classList.add('is-active');
    }
  }

  triggers.forEach(function(btn){
    var targetId = btn.getAttribute('data-target');
    var panel = document.getElementById(targetId);

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var href = btn.getAttribute('data-href');
      if(href){ window.location.href = href; return; }
      var isCurrentlyOpen = btn.classList.contains('is-active');
      if(isCurrentlyOpen){ closeAllPanels(); }
      else { openPanel(targetId, btn); }
    });

    btn.addEventListener('mouseenter', function(){
      if(closeTimeout) clearTimeout(closeTimeout);
      openPanel(targetId, btn);
    });

    btn.addEventListener('mouseleave', function(){
      closeTimeout = setTimeout(function(){
        if(!btn.matches(':hover') && !(panel && panel.matches(':hover'))){
          closeAllPanels();
        }
      }, 160);
    });

    if(panel){
      panel.addEventListener('mouseenter', function(){
        if(closeTimeout) clearTimeout(closeTimeout);
      });
      panel.addEventListener('mouseleave', function(){
        closeTimeout = setTimeout(function(){
          if(!btn.matches(':hover') && !panel.matches(':hover')){
            closeAllPanels();
          }
        }, 160);
      });
    }
  });

  var productImg = document.getElementById('mosoProductImg');
  var productLinks = nav.querySelectorAll('#mosoPanelProducts a[data-img]');
  productLinks.forEach(function(link){
    link.addEventListener('mouseenter', function(){
      var newSrc = link.getAttribute('data-img');
      if(productImg && newSrc && productImg.getAttribute('src') !== newSrc){
        productImg.style.opacity = '0.4';
        setTimeout(function(){
          productImg.src = newSrc;
          productImg.style.opacity = '1';
        }, 80);
      }
    });
  });

  document.addEventListener('click', function(e){
    if(!nav.contains(e.target)){ closeAllPanels(); }
  });

  var mobileToggle = document.getElementById('mosoMobileToggle');
  var mobileMenu = document.getElementById('mosoMobileMenu');
  if(mobileToggle && mobileMenu){
    mobileToggle.addEventListener('click', function(){
      mobileMenu.classList.toggle('is-open');
      mobileToggle.textContent = mobileMenu.classList.contains('is-open') ? '\u2715' : '\u2261';
    });
  }

  nav.querySelectorAll('.moso-acc-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var accId = btn.getAttribute('data-acc');
      var content = document.getElementById(accId);
      if(content){ content.classList.toggle('is-open'); }
    });
  });
})();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
