/* ============================================================
   TANSY SOLDS TABLE (Version 2)
   The sold-homes table on tansysverre.com/solds.
   Loaded by the Solds page's Custom Code element (pasted once, never changes):
     <div class="nsb-solds"></div>
     <script src="https://northshorebuzz.github.io/clients/tansy/solds.js" defer></script>

   To change the table, edit the HOMES list below and push.
   Each home: address and area. Every row shows the status "Sold".
   Rows show in this order.
   V2 (Nov 28, 2026): dates and View links removed.
   ============================================================ */
(function(){
  var HOMES = [
    { address: '#116A – 2020 London Lane',  area: 'Whistler' },
    { address: '#1 – 2219 Sapporo Drive',   area: 'Whistler' },
    { address: '#205 – 565 17th Street',    area: 'West Vancouver' },
    { address: '#210 – 3670 Banff Court',   area: 'North Vancouver' },
    { address: '711 Franklin Road',         area: 'Gibsons' },
    { address: '904 Huntingdon Crescent',   area: 'North Vancouver' },
    { address: '2575 Caledonia Avenue',     area: 'North Vancouver' },
    { address: '1942 Banbury Road',         area: 'North Vancouver' },
    { address: '4622 Cove Cliff Road',      area: 'North Vancouver' },
    { address: '542 N Dollarton Highway',   area: 'North Vancouver' },
    { address: '4493 Lakewood Court',       area: 'Whistler' },
    { address: '4527 Strathcona Road',      area: 'North Vancouver' },
    { address: '333 Sasamat Lane',          area: 'North Vancouver' }
  ];

  var CSS = [
    '.sold-table{max-width:1100px;margin:0 auto;font-family:\'Montserrat\',\'Helvetica Neue\',Arial,sans-serif}',
    '.sold-table table{width:100%;border-collapse:collapse}',
    '.sold-table th{font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--brand-muted,#4E7F89);text-align:left;padding:0 16px 14px;border-bottom:2px solid var(--brand-accent,#D9943B)}',
    '.sold-table td{padding:18px 16px;border-bottom:1px solid rgba(0,55,75,.12);vertical-align:middle}',
    '.sold-table tr:hover td{background:rgba(0,55,75,.04)}',
    '.sold-table .st-addr{font-size:18px;color:var(--brand-primary,#00374B);font-weight:450}',
    '.sold-table .st-area{font-size:15px;color:var(--brand-text,#2C4650)}',
    '.sold-table .st-when{font-size:13px;letter-spacing:.15em;text-transform:uppercase;color:var(--brand-accent,#D9943B);white-space:nowrap}',
    '@media(max-width:700px){',
    '.sold-table thead{display:none}',
    '.sold-table tr{display:grid;grid-template-columns:1fr auto;padding:16px 4px;border-bottom:1px solid rgba(0,55,75,.12)}',
    '.sold-table td{border:0;padding:2px 0}',
    '.sold-table .st-addr{grid-column:1 / -1;font-size:17px}',
    '}'
  ].join('\n');

  function el(tag, cls, text){ var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }

  function build(){
    var wrap = el('div', 'sold-table');
    var style = document.createElement('style'); style.textContent = CSS; wrap.appendChild(style);
    var table = el('table');
    var head = el('thead'), hr = el('tr');
    ['Home', 'Area', 'Status'].forEach(function(h){ hr.appendChild(el('th', '', h)); });
    head.appendChild(hr); table.appendChild(head);
    var body = el('tbody');
    HOMES.forEach(function(h){
      var tr = el('tr');
      tr.appendChild(el('td', 'st-addr', h.address));
      tr.appendChild(el('td', 'st-area', h.area));
      tr.appendChild(el('td', 'st-when', h.status));
      var go = el('td', 'st-go');
      if (h.url){
        var a = el('a', 'st-link', 'View →');
        a.href = h.url; a.target = '_blank'; a.rel = 'noopener';
        go.appendChild(a);
      } else {
        go.appendChild(el('span', 'st-none'));
      }
      tr.appendChild(go);
      body.appendChild(tr);
    });
    table.appendChild(body); wrap.appendChild(table);
    return wrap;
  }

  function init(){
    var spots = document.querySelectorAll('.nsb-solds:not([data-ready])');
    for (var i = 0; i < spots.length; i++){
      spots[i].setAttribute('data-ready', '1');
      spots[i].innerHTML = '';
      spots[i].appendChild(build());
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
