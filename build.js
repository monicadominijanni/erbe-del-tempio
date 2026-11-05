// Generatore del sito statico "Erbe del Tempio".
// Uso: node build.js  →  crea index.html, erbe/*.html, pagine legali, sitemap e robots.txt
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const GA_ID = ""; // inserire qui l'ID di misurazione G-XXXXXXX quando disponibile (vuoto = Analytics disattivato)
const SITE_URL = "https://monicadominijanni.github.io/erbe-del-tempio"; // da aggiornare con il dominio o l'URL GitHub Pages

// ---------- caricamento dati ----------
let erbe = [];
for (const f of fs.readdirSync(path.join(ROOT, "data")).filter(f => f.endsWith(".js")).sort()) {
  const code = fs.readFileSync(path.join(ROOT, "data", f), "utf8");
  const ctx = vm.createContext({});
  vm.runInContext(code, ctx);
  // le dichiarazioni "const" non diventano proprietà del contesto: le leggiamo per nome
  for (const m of code.matchAll(/const\s+(\w+)\s*=/g)) {
    const val = vm.runInContext(m[1], ctx);
    if (Array.isArray(val)) erbe.push(...val);
  }
}
const seen = new Set();
erbe = erbe.filter(e => (seen.has(e.slug) ? false : seen.add(e.slug)));
erbe = erbe.sort((a, b) => a.nome.localeCompare(b.nome, "it"));

// ---------- utilità ----------
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ensureDir = d => fs.mkdirSync(d, { recursive: true });
const write = (rel, content) => { ensureDir(path.dirname(path.join(ROOT, rel))); fs.writeFileSync(path.join(ROOT, rel), content, "utf8"); };
const descr = e => {
  const base = `${e.nome}${e.latino ? " (" + e.latino + ")" : ""}: uso tradizionale, proprietà e avvertenze. ${e.intro}`;
  return base.length > 158 ? base.slice(0, 155).replace(/\s+\S*$/, "") + "…" : base;
};
const initials = nome => nome.replace(/\(.*?\)/g, "").trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();

const CSS = `
:root{--verde:#2f5d3a;--verde-s:#4f7f5a;--verde-chiaro:#eef4ea;--oro:#b08d3c;--testo:#23261f;--muto:#5b6258;--sfondo:#fbfaf6;--bordo:#e2e0d4;--card:#ffffff;--ombra:0 2px 10px rgba(30,50,30,.08)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--verde:#9cc79f;--verde-s:#7fb085;--verde-chiaro:#1f2b21;--oro:#d8b766;--testo:#e9ebe4;--muto:#aab2a6;--sfondo:#151a16;--bordo:#2f3a31;--card:#1d241e;--ombra:0 2px 10px rgba(0,0,0,.4)}}
:root[data-theme="dark"]{--verde:#9cc79f;--verde-s:#7fb085;--verde-chiaro:#1f2b21;--oro:#d8b766;--testo:#e9ebe4;--muto:#aab2a6;--sfondo:#151a16;--bordo:#2f3a31;--card:#1d241e;--ombra:0 2px 10px rgba(0,0,0,.4)}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--sfondo);color:var(--testo);font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;line-height:1.6;font-size:16px}
a{color:var(--verde)}
img{max-width:100%;height:auto}
.wrap{max-width:1120px;margin:0 auto;padding:0 16px}
header.top{background:var(--verde);color:#fff}
header.top .wrap{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 16px;padding:14px 16px}
header.top a{color:#fff;text-decoration:none}
.brand{font-family:"Cormorant Garamond",Georgia,serif;font-size:1.35rem;font-weight:700;letter-spacing:.2px}
nav.main a{margin-left:14px;font-size:.95rem;opacity:.92}
nav.main a:hover{opacity:1;text-decoration:underline}
.hero{background:linear-gradient(180deg,var(--verde-chiaro),var(--sfondo));padding:46px 0 26px;text-align:center}
.hero h1{font-family:"Cormorant Garamond",Georgia,serif;font-size:2.3rem;margin:0 0 8px;color:var(--verde);line-height:1.2}
.hero p{margin:0 auto;max-width:640px;color:var(--muto)}
.searchbox{position:sticky;top:0;z-index:5;background:var(--sfondo);padding:14px 0 12px;border-bottom:1px solid var(--bordo)}
.searchbox input{width:100%;font:inherit;font-size:1.05rem;padding:13px 16px 13px 44px;border:1px solid var(--bordo);border-radius:999px;background:var(--card);color:var(--testo);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%235b6258' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cpath d='M20 20l-4-4'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:16px 50%}
.searchbox input:focus{outline:2px solid var(--verde-s);outline-offset:1px}
.count{font-size:.9rem;color:var(--muto);margin:8px 2px 0}
.grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));padding:22px 0 40px}
.card{background:var(--card);border:1px solid var(--bordo);border-radius:14px;box-shadow:var(--ombra);overflow:hidden;display:flex;flex-direction:column;transition:transform .15s}
.card:hover{transform:translateY(-2px)}
.card a.thumb{display:block;text-decoration:none}
.thumb-box{aspect-ratio:4/3;background:var(--verde-chiaro);display:flex;align-items:center;justify-content:center;color:var(--verde);font-family:"Cormorant Garamond",Georgia,serif;font-size:2rem;position:relative;overflow:hidden}
.thumb-box img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.card .body{padding:14px 16px 16px}
.card h2{font-size:1.1rem;margin:0 0 4px;color:var(--verde);font-family:"Cormorant Garamond",Georgia,serif}
.card .latino{font-style:italic;color:var(--muto);font-size:.85rem;margin:0 0 6px}
.card p{margin:0;font-size:.92rem;color:var(--testo)}
.empty{display:none;text-align:center;padding:40px 0;color:var(--muto)}
.crumbs{font-size:.9rem;color:var(--muto);padding:18px 0 0}
article.erba{max-width:800px;margin:0 auto;padding:10px 0 40px}
article.erba h1{font-family:"Cormorant Garamond",Georgia,serif;color:var(--verde);font-size:2rem;line-height:1.25;margin:8px 0 4px}
article.erba .latino{font-style:italic;color:var(--muto);margin:0 0 18px}
article.erba img.hero-img{width:100%;max-height:380px;object-fit:cover;border-radius:14px;border:1px solid var(--bordo);margin:6px 0 18px;background:var(--verde-chiaro)}
article.erba h2{font-family:"Cormorant Garamond",Georgia,serif;color:var(--verde);border-bottom:2px solid var(--oro);padding-bottom:4px;margin-top:30px;font-size:1.3rem}
article.erba ul{padding-left:20px}
article.erba li{margin:4px 0}
.note{background:var(--verde-chiaro);border-left:4px solid var(--verde);padding:14px 16px;border-radius:10px;margin:22px 0;font-size:.95rem}
.warn{background:#fff6e6;color:#4a3a10;border-left:4px solid var(--oro);padding:14px 16px;border-radius:10px;margin:22px 0;font-size:.95rem}
:root[data-theme="dark"] .warn,:root:not([data-theme="light"]) .warn{background:#2b2615;color:#eadcb0}
.buy{display:grid;gap:10px;margin:8px 0}
.buy a{display:block;padding:12px 14px;border:1px solid var(--bordo);border-radius:10px;background:var(--card);text-decoration:none;color:var(--testo)}
.buy a:hover{border-color:var(--verde)}
.buy small{color:var(--muto);display:block}
footer.site{background:var(--verde-chiaro);border-top:1px solid var(--bordo);margin-top:30px;padding:28px 0;font-size:.92rem;color:var(--muto)}
footer.site a{color:var(--verde)}
footer.site .wrap{display:flex;flex-wrap:wrap;gap:8px 20px;justify-content:space-between;align-items:center}
.legal{max-width:760px;margin:0 auto;padding:20px 0 40px}
.legal h1{color:var(--verde);font-family:"Cormorant Garamond",Georgia,serif}
.legal h2{color:var(--verde);font-size:1.2rem;margin-top:26px}
.placeholder{background:#fff3c4;color:#5a4a00;padding:0 4px;border-radius:4px}
.hero-small{padding:34px 0 20px}
.hero-home{position:relative;min-height:520px;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;background:linear-gradient(160deg,#2f5d3a 0%,#4f7f5a 55%,#b08d3c 140%);color:#fff}
.hero-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.45}
.hero-home .leaves{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.leaves i{position:absolute;top:-60px;width:26px;height:34px;background:rgba(255,255,255,.22);border-radius:0 70% 0 70%;animation-name:fall;animation-timing-function:linear;animation-iteration-count:infinite}
@keyframes fall{0%{transform:translate(0,0) rotate(0)}50%{transform:translate(30px,55vh) rotate(180deg)}100%{transform:translate(-20px,115vh) rotate(360deg)}}
.hero-text{position:relative;z-index:2;padding:40px 16px}
.hero-text .kicker{text-transform:uppercase;letter-spacing:.18em;font-size:.8rem;opacity:.9;margin:0 0 10px}
.hero-text h1{font-family:"Cormorant Garamond",Georgia,serif;font-size:3rem;margin:0 0 10px;line-height:1.1;color:#fff}
.hero-text .lead{font-size:1.2rem;margin:0 auto 26px;max-width:560px;opacity:.95}
.cta{display:inline-block;background:#fff;color:var(--verde);padding:13px 26px;border-radius:999px;text-decoration:none;font-weight:700;box-shadow:0 4px 14px rgba(0,0,0,.2)}
.cta:hover{transform:translateY(-1px)}
.cta-light{display:inline-block;color:var(--verde);font-weight:700;text-decoration:none;border-bottom:2px solid var(--oro);padding-bottom:2px}
.intro{padding:40px 16px 20px;max-width:900px}
.intro h2{font-family:"Cormorant Garamond",Georgia,serif;color:var(--verde);font-size:1.7rem;border:none;padding:0;margin:0 0 10px}
.intro p{font-size:1.05rem}
.features{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));margin:24px 0}
.feature{background:var(--card);border:1px solid var(--bordo);border-radius:14px;padding:18px;box-shadow:var(--ombra);display:flex;flex-direction:column;gap:6px}
.feature strong{color:var(--verde);font-family:"Cormorant Garamond",Georgia,serif;font-size:1.1rem}
.feature span{color:var(--muto);font-size:.95rem}
.center{text-align:center;margin-top:24px}
@media (prefers-reduced-motion:reduce){.leaves i{animation:none;opacity:.15}}
@media (max-width:600px){.hero-text h1{font-size:2.3rem}.hero-home{min-height:460px}}
@media (max-width:600px){.hero h1{font-size:1.8rem}nav.main a{margin-left:10px}article.erba h1{font-size:1.6rem}}
`;

const headerHtml = (rel = "") => `
<header class="top"><div class="wrap">
  <a class="brand" href="${rel}index.html">Erbe del Tempio</a>
  <nav class="main">
    <a href="${rel}index.html">Home</a>
    <a href="${rel}enciclopedia.html">Enciclopedia</a>
    <a href="${rel}chi-siamo.html">Chi siamo</a>
  </nav>
</div></header>`;

const footerHtml = (rel = "") => `
<footer class="site" id="contatti"><div class="wrap">
  <div>© ${new Date().getFullYear()} Erbe del Tempio</div>
  <div><a href="${rel}privacy.html">Privacy</a> · <a href="${rel}cookie.html">Cookie</a> · <a href="${rel}affiliazione.html">Dichiarazione di affiliazione</a> · <a href="#" id="ck-manage">Gestisci cookie</a> · <a href="mailto:monica.dominijanni@gmail.com">Scrivici</a></div>
</div></footer>`;

const cookieUi = `
<div id="cookie-banner" class="cookie-banner" hidden role="dialog" aria-label="Preferenze cookie">
  <p>Usiamo Google Analytics per capire in forma aggregata come viene usato il sito. Accetti i cookie analitici? <a href="${'__REL__'}cookie.html">Cookie policy</a></p>
  <div class="ck-actions">
    <button type="button" id="ck-reject" class="ck-btn ck-sec">Rifiuta</button>
    <button type="button" id="ck-accept" class="ck-btn">Accetta</button>
  </div>
</div>
<script>
(function(){
  var GA_ID = ${JSON.stringify(GA_ID)};
  function getC(){ try { return localStorage.getItem('cookie_consent'); } catch(e){ return null; } }
  function setC(v){ try { localStorage.setItem('cookie_consent', v); } catch(e){} }
  function loadGA(){
    if (!GA_ID || window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }
  var banner = document.getElementById('cookie-banner');
  var c = getC();
  if (c === 'accepted') loadGA();
  if (!c) banner.hidden = false;
  document.getElementById('ck-accept').onclick = function(){ setC('accepted'); loadGA(); banner.hidden = true; };
  document.getElementById('ck-reject').onclick = function(){ setC('rejected'); banner.hidden = true; };
  var m = document.getElementById('ck-manage');
  if (m) m.onclick = function(e){ e.preventDefault(); banner.hidden = false; };
})();
</script>
<style>
.cookie-banner{position:fixed;left:12px;right:12px;bottom:12px;max-width:720px;margin:0 auto;background:#fff;color:#23261f;border:1px solid #e2e0d4;border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,.18);padding:16px 18px;z-index:50;font-size:.95rem}
.cookie-banner[hidden]{display:none}
.cookie-banner p{margin:0 0 12px}
.cookie-banner a{color:#2f5d3a}
.ck-actions{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap}
.ck-btn{font:inherit;font-weight:700;padding:9px 18px;border-radius:999px;border:1px solid #2f5d3a;background:#2f5d3a;color:#fff;cursor:pointer}
.ck-btn.ck-sec{background:#fff;color:#2f5d3a}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .cookie-banner{background:#1d241e;color:#e9ebe4;border-color:#2f3a31}}
</style>`;

const page = ({ title, description, body, rel = "", canonical = "", ogImage = "" }) => `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index,follow">
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ""}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : ""}
<meta name="theme-color" content="#2f5d3a">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="${rel}style.css">
</head>
<body>
${headerHtml(rel)}
${body}
${footerHtml(rel)}
${cookieUi.replace("__REL__", rel)}
</body>
</html>`;

// ---------- foglio di stile ----------
write("style.css", CSS);

// ---------- home ----------
const cards = erbe.map(e => {
  const img = e.immagine ? `images/${e.immagine}` : "";
  const box = `<div class="thumb-box">${img ? `<img src="${img}" alt="${esc(e.nome)}" loading="lazy" onerror="this.remove()">` : ""}<span>${esc(initials(e.nome))}</span></div>`;
  return `<article class="card" data-search="${esc((e.nome + " " + (e.latino || "")).toLowerCase())}">
  <a class="thumb" href="erbe/${e.slug}.html" aria-label="${esc(e.nome)}">${box}</a>
  <div class="body">
    <h2><a href="erbe/${e.slug}.html" style="color:inherit;text-decoration:none">${esc(e.nome)}</a></h2>
    ${e.latino ? `<p class="latino">${esc(e.latino)}</p>` : ""}
    <p>${esc(e.intro.length > 120 ? e.intro.slice(0, 117).replace(/\s+\S*$/, "") + "…" : e.intro)}</p>
  </div>
</article>`;
}).join("\n");

const homeBody = `
<section class="hero hero-small">
  <div class="wrap">
    <h1>L'enciclopedia delle erbe</h1>
    <p>Cerca un'erba per nome: uso tradizionale, proprietà attribuite e avvertenze.</p>
  </div>
</section>
<div class="searchbox"><div class="wrap">
  <label for="q" class="sr">Cerca un'erba</label>
  <input id="q" type="search" placeholder="Cerca un'erba (es. camomilla, menta, valeriana)…" autocomplete="off">
  <p class="count" id="count" aria-live="polite">${erbe.length} erbe</p>
</div></div>
<main class="wrap" id="erbe">
  <div class="grid" id="grid">
${cards}
  </div>
  <p class="empty" id="empty">Nessuna erba trovata. Prova con un altro termine.</p>
</main>
<script>
(function(){
  var q=document.getElementById('q'), cards=[].slice.call(document.querySelectorAll('.card')),
      count=document.getElementById('count'), empty=document.getElementById('empty');
  function norm(s){return s.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();}
  function filter(){
    var t=norm(q.value.trim()), n=0;
    cards.forEach(function(c){
      var ok = !t || norm(c.getAttribute('data-search')).indexOf(t)!==-1;
      c.style.display = ok ? '' : 'none'; if(ok) n++;
    });
    count.textContent = n + (n===1?' erba':' erbe');
    empty.style.display = n ? 'none' : 'block';
  }
  q.addEventListener('input', filter);
  q.addEventListener('search', filter);
})();
</script>
<style>.sr{position:absolute;left:-9999px}</style>`;

write("enciclopedia.html", page({
  title: "Enciclopedia delle erbe – Erbe del Tempio",
  description: "Enciclopedia delle erbe: cerca per nome tra 90 schede con uso tradizionale, proprietà attribuite e avvertenze.",
  body: homeBody,
  canonical: SITE_URL + "/enciclopedia.html",
}));

const leaves = Array.from({ length: 12 }, (_, i) => `<i style="left:${(i * 8.3 + 3) % 100}%;animation-duration:${14 + (i % 5) * 3}s;animation-delay:-${i * 2.1}s;transform:scale(${0.7 + (i % 3) * 0.25})"></i>`).join("");
const homeLanding = `
<section class="hero-home">
  <div class="hero-media"><img src="images/hero.gif" alt="" onerror="this.remove()"></div>
  <div class="leaves" aria-hidden="true">${leaves}</div>
  <div class="wrap hero-text">
    <p class="kicker">Tradizione erboristica · erbe officinali</p>
    <h1>Erbe Magiche</h1>
    <p class="lead">Il potere segreto della natura per il tuo benessere.</p>
    <a class="cta" href="enciclopedia.html">Esplora le ${erbe.length} erbe</a>
  </div>
</section>
<main class="wrap intro">
  <h2>Benvenuto nel nostro erbario</h2>
  <p>Ogni scheda raccoglie in un unico posto la storia di una pianta, le proprietà che la tradizione le attribuisce, il suo uso tradizionale e le avvertenze da conoscere. Le informazioni hanno scopo divulgativo: per la salute consulta sempre il tuo medico.</p>
  <div class="features">
    <div class="feature"><strong>Uso tradizionale</strong><span>Come le erbe sono state impiegate nei secoli.</span></div>
    <div class="feature"><strong>Proprietà attribuite</strong><span>Cosa dice la tradizione e cosa è oggetto di studi.</span></div>
    <div class="feature"><strong>Avvertenze</strong><span>Controindicazioni, precauzioni e interazioni.</span></div>
  </div>
  <p class="center"><a class="cta-light" href="enciclopedia.html">Vai all'enciclopedia →</a></p>
</main>`;

write("index.html", page({
  title: "Erbe Magiche – Erbe del Tempio: uso tradizionale, proprietà e avvertenze",
  description: "Scopri le erbe officinali del Tempio: uso tradizionale, proprietà attribuite, avvertenze e controindicazioni. Sfoglia l'enciclopedia delle erbe.",
  body: homeLanding,
  canonical: SITE_URL + "/",
}));

// ---------- pagine erba ----------
for (const e of erbe) {
  const buy = e.prodotti && e.prodotti.length ? `
  <h2>Dove acquistare</h2>
  <p>Link a prodotti di un partner (programma di affiliazione):</p>
  <div class="buy">${e.prodotti.map(p => `<a href="${esc(p.link)}" target="_blank" rel="sponsored nofollow noopener">${esc(p.nome)}<small>Acquista sul sito partner ↗</small></a>`).join("")}</div>` : "";
  const img = e.immagine ? `<img class="hero-img" src="../images/${e.immagine}" alt="${esc(e.nome)}${e.latino ? " (" + esc(e.latino) + ")" : ""}" onerror="this.remove()">` : "";
  const body = `
<main class="wrap">
<div class="crumbs"><a href="../enciclopedia.html">Enciclopedia</a> › ${esc(e.nome)}</div>
<article class="erba">
  <h1>${esc(e.nome)}: uso tradizionale, proprietà e avvertenze</h1>
  ${e.latino ? `<p class="latino">${esc(e.latino)}</p>` : ""}
  ${img}
  <p>${esc(e.intro)}</p>
  <h2>Proprietà attribuite dalla tradizione</h2>
  <ul>${e.proprieta.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
  <h2>Uso tradizionale</h2>
  <p>${esc(e.usi)}</p>
  <h2>Avvertenze e controindicazioni</h2>
  <p>${esc(e.controindicazioni)}</p>
  <div class="warn"><strong>Avvertenza.</strong> Le informazioni di questa pagina hanno scopo divulgativo e non sostituiscono il parere del medico o di un professionista sanitario. Non usare le erbe per curare o sostituire una terapia. In gravidanza, allattamento, in presenza di patologie o di farmaci in corso, consulta il medico prima dell'uso.</div>
  ${buy}
  <p class="note">Le proprietà sono riportate come attribuzioni tradizionali o come oggetto di studi, senza valore di cura.</p>
  <p><a href="../enciclopedia.html">← Torna all'enciclopedia</a></p>
</article>
</main>`;
  write(`erbe/${e.slug}.html`, page({
    title: `${e.nome}: uso tradizionale, proprietà e avvertenze – Erbe del Tempio`,
    description: descr(e),
    body,
    rel: "../",
    canonical: `${SITE_URL}/erbe/${e.slug}.html`,
    ogImage: e.immagine ? `${SITE_URL}/images/${e.immagine}` : "",
  }));
}

// ---------- pagine statiche ----------
const legal = (title, inner) => page({
  title: title + " – Erbe del Tempio",
  description: title + " del sito Erbe del Tempio.",
  body: `<main class="wrap"><article class="legal"><h1>${title}</h1>${inner}</article></main>`,
});
const PH = t => `<span class="placeholder">[${t}]</span>`;

write("chi-siamo.html", page({
  title: "Chi siamo – Erbe del Tempio",
  description: "Chi siamo: la storia delle erbe officinali di Erbe del Tempio e come scegliamo i fornitori per ogni prodotto.",
  body: `<main class="wrap"><article class="legal chi">
    <h1>Chi siamo</h1>
    <p class="lead">Erbe del Tempio nasce dalla passione per le erbe officinali e dal desiderio di raccontarle in modo chiaro, con la storia, la tradizione e le avvertenze di ciascuna pianta.</p>

    <h2>Le erbe e la tradizione</h2>
    <p>Dalle civiltà antiche a oggi, le erbe hanno accompagnato l'uomo come alimento, come aroma e come pratica di cura. Molte delle conoscenze che raccontiamo nascono dalla tradizione erboristica e popolare, che ha tramandato per secoli usi e preparazioni. Oggi, accanto a quella tradizione, ci sono studi scientifici che indagano alcune di queste proprietà: dove è così, lo indichiamo.</p>
    <p>Il nostro approccio è divulgativo. Ogni scheda descrive ciò che la tradizione attribuisce a una pianta, ciò che è oggetto di studi e le precauzioni da rispettare. Non sostituiamo il parere di un medico o di un professionista sanitario.</p>

    <h2>Come scegliamo i fornitori</h2>
    <p>Per ogni erba selezioniamo i fornitori che riteniamo migliori, così chi ci legge trova prodotti di fiducia, pronti da provare con la stessa cura con cui abbiamo raccontato la pianta.</p>
    <p>Ogni proposta nasce da una scelta pensata: dalla qualità del prodotto al servizio di chi lo vende, perché la tradizione delle erbe merita il meglio anche nel momento dell'acquisto.</p>

    <h2>Trasparenza sui link di acquisto</h2>
    <p>Alcuni link del sito sono di affiliazione: se acquisti tramite questi link, riceviamo una commissione dal negozio partner, senza alcun costo aggiuntivo per te. Il prezzo e le condizioni di vendita restano quelli stabiliti dal negozio. Maggiori dettagli nella <a href="affiliazione.html">dichiarazione di affiliazione</a>.</p>

    <h2>Contatti</h2>
    <p>Per domande, segnalazioni o proposte scrivici a <a href="mailto:monica.dominijanni@gmail.com">Scrivici</a>.</p>
  </article></main>`,
}));

write("privacy.html", legal("Informativa privacy", `
<p>Questo sito non richiede registrazione e non raccoglie dati personali se non quelli inviati volontariamente via email.</p>
<h2>Titolare del trattamento</h2><p>Monica Dominijanni, ditta individuale, P.IVA 03918000120. Email: <a href="mailto:monica.dominijanni@gmail.com">monica.dominijanni@gmail.com</a>. PEC: <a href="mailto:monica.dominijanni@pec.it">monica.dominijanni@pec.it</a>.</p>
<h2>Dati trattati</h2><p>Dati di navigazione tecnici (indirizzo IP, data e ora di accesso, pagine visitate), necessari al funzionamento del sito, e i dati che scegli di inviarci via email.</p>
<h2>Cookie e strumenti di terze parti</h2><p>Per i dettagli sui cookie vedi la <a href="cookie.html">pagina cookie</a>.</p>
<h2>Diritti dell'interessato</h2><p>Puoi chiedere accesso, rettifica, cancellazione e opposizione scrivendo al titolare (artt. 15-22 GDPR).</p>
<p>Ultimo aggiornamento: 3 novembre 2026</p>`));

write("cookie.html", legal("Cookie policy", `
<p>La presente informativa spiega quali cookie e strumenti simili usa questo sito, perché li usa e come puoi gestire le tue scelte. Ultimo aggiornamento: 3 novembre 2026.</p>

<h2>Cosa sono i cookie</h2>
<p>I cookie sono piccoli file che il browser salva sul dispositivo quando visiti un sito. Servono a far funzionare il sito o a raccogliere informazioni sull'uso che se ne fa.</p>

<h2>Cookie usati da questo sito</h2>
<p><strong>Cookie tecnici.</strong> Il sito non imposta cookie tecnici propri. Il banner cookie salva nel browser solo la tua scelta (accettare o rifiutare), in una memoria locale, per non mostrartelo di nuovo. Questa memoria non contiene dati personali e non viene inviata ad alcun server.</p>
<p><strong>Cookie analitici di Google Analytics.</strong> Solo se acconsenti, il sito utilizza Google Analytics per capire in forma aggregata quante persone visitano il sito, quali pagine consultano e da dove arrivano. I cookie impostati sono:</p>
<ul>
  <li><strong>_ga</strong>: distingue i visitatori. Durata: 2 anni.</li>
  <li><strong>_ga_${PH("ID misurazione, es. G-XXXXXXX")}</strong>: mantiene lo stato della sessione. Durata: 2 anni.</li>
</ul>
<p>Gli indirizzi IP sono resi anonimi prima di essere elaborati. Non usiamo questi dati per profilarti né per mostrarti pubblicità personalizzata.</p>

<h2>Base giuridica</h2>
<p>I cookie analitici sono installati solo previo tuo consenso (art. 122 del Codice privacy e art. 6, par. 1, lett. a del GDPR). Puoi cambiare idea in qualsiasi momento.</p>

<h2>Come gestire le tue scelte</h2>
<ul>
  <li>Dal banner, al primo accesso, puoi accettare o rifiutare i cookie analitici.</li>
  <li>Puoi modificare la scelta in ogni momento cliccando su "Gestisci cookie" nel footer del sito.</li>
  <li>Puoi cancellare i cookie dalle impostazioni del browser.</li>
  <li>Puoi installare il componente di Google per disattivare Google Analytics su tutti i siti: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">tools.google.com/dlpage/gaoptout</a>.</li>
</ul>

<h2>Dati trasferiti a Google</h2>
<p>Google Analytics è fornito da Google Ireland Limited, ma i dati possono essere elaborati da Google LLC negli Stati Uniti. Il trasferimento avviene sulla base del Data Privacy Framework UE-USA e delle clausole contrattuali standard. Maggiori informazioni nella <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">privacy policy di Google</a>.</p>

<h2>Cookie di terze parti</h2>
<p>Il sito non include altri strumenti di terze parti che installino cookie. Se in futuro ne aggiungeremo, questa pagina verrà aggiornata e, quando richiesto, verrà chiesto il consenso.</p>

<h2>Contatti</h2>
<p>Per domande su questa informativa scrivi a <a href="mailto:monica.dominijanni@gmail.com">Scrivici</a>. Per i dati personali in generale, vedi la <a href="privacy.html">privacy policy</a>.</p>`));

write("affiliazione.html", legal("Dichiarazione di affiliazione", `
<p>Alcuni link presenti su questo sito sono link di affiliazione: se acquisti un prodotto tramite questi link, il sito può ricevere una commissione dal partner, senza alcun costo aggiuntivo per te.</p>
<p>Le erbe e i prodotti sono presentati a scopo informativo. Vendita, spedizione e assistenza sono gestite dai siti partner, e i prezzi sono quelli applicati da loro.</p>`));

// ---------- sitemap e robots ----------
const urls = [SITE_URL + "/", SITE_URL + "/enciclopedia.html", ...erbe.map(e => `${SITE_URL}/erbe/${e.slug}.html`), SITE_URL + "/chi-siamo.html", SITE_URL + "/privacy.html", SITE_URL + "/cookie.html", SITE_URL + "/affiliazione.html"];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`Generate ${erbe.length} schede erba + pagine di servizio.`);
