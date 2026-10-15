const { createRequire } = require('module');
const req = createRequire('/opt/node-tools/node_modules/');
const { chromium } = req('playwright');
const fs = require('fs');
const path = require('path');

const REPO = '/home/user/achou-levou-flow';
const OUT = path.join(REPO, 'instagram/midia/carrossel-percarbonato');
fs.mkdirSync(OUT, { recursive: true });
const uri = (p, t = 'image/jpeg') => `data:${t};base64,` + fs.readFileSync(p).toString('base64');
const LEVIN = uri(path.join(REPO, 'instagram/levin/ref-rosto-sorrindo-2.jpg'));
const VARAL = uri(path.join(REPO, 'instagram/remotion/public/levin-varal.jpg'));
const PACOTE = uri(path.join(REPO, 'instagram/remotion/public/percarbonato.jpg'));
const font = w => `@font-face{font-family:'Poppins';font-weight:${w};src:url(${uri(path.join(REPO, `instagram/remotion/public/poppins-${w}.woff2`), 'font/woff2')}) format('woff2')}`;

const HANDLE = '@ach.oulevouofertas';
const T = 6;
const css = `
${font(600)}${font(700)}${font(800)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:'Poppins','Noto Color Emoji',sans-serif;color:#3a2418;position:relative}
.orange{background:linear-gradient(160deg,#ff8a3d 0%,#f37021 50%,#de5a12 100%)}
.cream{background:#fff6ec}
.count{position:absolute;top:48px;right:60px;font-weight:700;font-size:30px;color:rgba(255,255,255,.9);text-shadow:0 2px 8px rgba(0,0,0,.3)}
.cream .count{color:#7a6152;text-shadow:none}
.foot{position:absolute;bottom:44px;left:72px;right:64px;display:flex;justify-content:space-between;font-weight:700;font-size:31px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.25)}
.cream .foot{color:#3a2418;text-shadow:none}
.tbox{background:#f37021;color:#fff;border-radius:28px;padding:22px 36px 26px;font-weight:800;line-height:1.12;box-shadow:0 8px 0 #c9520f}
.wbox{background:#fff;color:#3a2418;border-radius:28px;padding:22px 32px;font-weight:700;line-height:1.3;box-shadow:0 10px 30px rgba(0,0,0,.12)}
.title{position:absolute;left:72px;right:72px;top:100px;font-weight:800;color:#fff;font-size:70px;line-height:1.1;letter-spacing:-1px;text-shadow:0 3px 10px rgba(0,0,0,.15)}
.cream .title{color:#f37021;text-shadow:none}
.pic{position:absolute;border-radius:36px;overflow:hidden;border:8px solid #fff;box-shadow:0 18px 44px rgba(0,0,0,.22);background:#fff center/cover no-repeat}
.price{position:absolute;background:#fff;color:#f37021;font-weight:800;font-size:76px;line-height:1;padding:22px 36px;border-radius:30px;box-shadow:0 10px 0 rgba(150,60,10,.35)}
.price small{display:block;font-size:28px;color:#7a6152;font-weight:700;margin-bottom:6px}
`;
const page = (cls, inner) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body class="${cls}">${inner}</body></html>`;
const foot = last => `<div class="foot"><span>${HANDLE}</span>${last ? '' : '<span>arraste →</span>'}</div>`;
const cnt = n => `<div class="count">${n}/${T}</div>`;

const slides = [
  // 1 capa
  page('', `
<div style="position:absolute;inset:0;background:url(${LEVIN}) center 8%/cover"></div>
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.18) 0%,rgba(0,0,0,0) 22%,rgba(0,0,0,0) 55%,rgba(0,0,0,.55) 100%)"></div>
${cnt(1)}
<div style="position:absolute;left:72px;right:72px;bottom:130px">
  <div class="tbox" style="font-size:68px;display:inline-block">Roupa branca<br>amarelada? 😩</div><br>
  <div class="wbox" style="font-size:50px;font-weight:800;margin-top:22px;display:inline-block;color:#f37021">Arrasta que eu te conto 👉</div>
</div>${foot()}`),
  // 2 problema
  page('orange', `${cnt(2)}
<div class="title">Sabe aquela camiseta branca que ficou feia?</div>
<div class="pic" style="left:100px;top:360px;width:880px;height:620px;background-image:url(${VARAL});background-position:40% 20%"></div>
<div style="position:absolute;left:72px;right:72px;top:1020px;display:flex;gap:20px;flex-wrap:wrap;justify-content:center">
  <div class="wbox" style="font-size:40px">😩 amarelada</div><div class="wbox" style="font-size:40px">🩶 encardida</div><div class="wbox" style="font-size:40px">☕ manchada</div>
</div>
${foot()}`),
  // 3 produto
  page('orange', `${cnt(3)}
<div class="title">Tira-manchas SEM cloro</div>
<div class="pic" style="left:250px;top:250px;width:580px;height:860px;background-image:url(${PACOTE});background-position:center top"></div>
<div class="price" style="left:50%;transform:translateX(-50%);top:1070px;text-align:center;white-space:nowrap"><small>Percarbonato de sódio Calisul</small>R$ 39,90</div>
${foot()}`),
  // 4 embalagem
  page('cream', `${cnt(4)}
<div class="title">O que diz a embalagem 📦</div>
<div class="pic" style="left:72px;top:290px;width:440px;height:760px;background-image:url(${PACOTE});background-position:center top"></div>
<div style="position:absolute;left:550px;right:60px;top:300px;display:flex;flex-direction:column;gap:26px">
  <div class="wbox" style="font-size:40px">✅ Tira manchas</div>
  <div class="wbox" style="font-size:40px">✅ Renova os tecidos brancos</div>
  <div class="wbox" style="font-size:40px">✅ Sem cloro</div>
  <div class="wbox" style="font-size:40px">✅ Rende até 40 lavagens</div>
</div>
<div style="position:absolute;left:72px;right:72px;top:1110px;font-weight:600;font-size:30px;color:#7a6152;text-align:center">Tamanho família · 100% percarbonato de sódio</div>
${foot()}`),
  // 5 cuidados
  page('cream', `${cnt(5)}
<div class="title">Antes de usar 👀</div>
<div style="position:absolute;left:72px;right:72px;top:300px;display:flex;flex-direction:column;gap:34px">
  <div class="wbox" style="font-size:46px">📖 Leia o modo de uso do rótulo</div>
  <div class="wbox" style="font-size:46px">🧪 Teste numa parte escondida da roupa</div>
  <div class="wbox" style="font-size:46px">🚫 Não misture com outros produtos</div>
  <div class="wbox" style="font-size:46px">🧒 Guarde longe das crianças</div>
</div>
<div style="position:absolute;left:72px;right:72px;top:1080px;font-weight:800;font-size:46px;color:#f37021;text-align:center">Cuidado com a roupa = roupa durando mais 🧡</div>
${foot()}`),
  // 6 CTA
  page('cream', `${cnt(6)}
<div style="position:absolute;left:72px;top:110px;width:250px;height:250px;border-radius:50%;border:8px solid #f37021;background:url(${LEVIN}) center 22%/190%;box-shadow:0 10px 30px rgba(0,0,0,.15)"></div>
<div style="position:absolute;left:360px;right:60px;top:130px;font-weight:800;font-size:60px;line-height:1.12;color:#f37021;letter-spacing:-1px">Quer o link? Eu te mando! 🧡</div>
<div style="position:absolute;left:72px;right:72px;top:500px">
  <div class="wbox" style="font-size:52px;font-weight:800;line-height:1.25;text-align:center">Comenta <span style="color:#f37021">QUERO</span> que eu te mando o link no direct 👇</div>
  <div class="tbox" style="font-size:44px;text-align:center;margin-top:40px">Tira-manchas sem cloro<br><span style="font-size:80px">R$ 39,90</span></div>
  <div style="font-weight:800;font-size:50px;margin-top:60px;text-align:center">📌 Salva pro dia da faxina</div>
  <div style="font-weight:600;font-size:28px;margin-top:36px;text-align:center;color:#7a6152">Preço visto em 12/10, pode mudar.</div>
</div>${foot(true)}`),
];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (let i = 0; i < slides.length; i++) {
    const p = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
    await p.setContent(slides[i], { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(OUT, `slide-${i + 1}.jpg`), type: 'jpeg', quality: 92 });
    await p.close();
  }
  await browser.close();
  console.log('done');
})();
