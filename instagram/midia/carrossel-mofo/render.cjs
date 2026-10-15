const { createRequire } = require('module');
const req = createRequire('/opt/node-tools/node_modules/');
const { chromium } = req('playwright');
const fs = require('fs');
const path = require('path');

const REPO = '/home/user/achou-levou-flow';
const OUT = path.join(REPO, 'instagram/midia/carrossel-mofo');
fs.mkdirSync(OUT, { recursive: true });
const uri = (p, t = 'image/jpeg') => `data:${t};base64,` + fs.readFileSync(p).toString('base64');
const LEVIN = uri(path.join(REPO, 'instagram/levin/ref-rosto-sorrindo-2.jpg'));
const F = path.join(REPO, 'instagram/produtos/2026-10-15-lote-3/fotos');
const I = n => uri(path.join(F, `mofo-${n}.jpg`));
const font = w => `@font-face{font-family:'Poppins';font-weight:${w};src:url(${uri(path.join(REPO, `instagram/remotion/public/poppins-${w}.woff2`), 'font/woff2')}) format('woff2')}`;

const HANDLE = '@ach.oulevouofertas';
const T = 8;
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

const card = (n, pill, extra='') => page('orange', `${cnt(n)}
<div style="position:absolute;left:72px;right:72px;top:96px"><div class="tbox" style="font-size:50px;display:inline-block">${pill}</div></div>
<div class="pic" style="left:90px;top:250px;width:900px;height:900px;background-image:url(${extra})"></div>
${foot()}`);
const slides = [
  page('', `
<div style="position:absolute;inset:0;background:url(${LEVIN}) center 8%/cover"></div>
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.18) 0%,rgba(0,0,0,0) 22%,rgba(0,0,0,0) 55%,rgba(0,0,0,.55) 100%)"></div>
${cnt(1)}
<div style="position:absolute;left:72px;right:72px;bottom:130px">
  <div class="tbox" style="font-size:64px;display:inline-block">Armário com cheiro<br>de guardado? 😖</div><br>
  <div class="wbox" style="font-size:50px;font-weight:800;margin-top:22px;display:inline-block;color:#f37021">Achei uma solução baratinha 👉</div>
</div>${foot()}`),
  page('orange', `${cnt(2)}
<div style="position:absolute;left:72px;right:72px;top:96px"><div class="tbox" style="font-size:50px;display:inline-block">Anti-mofo que perfuma 🌸</div></div>
<div class="pic" style="left:90px;top:250px;width:900px;height:900px;background-image:url(${I('hero')})"></div>
<div class="price" style="right:50px;top:1040px"><small>Leve Brisa · a partir de</small>R$ 7,99</div>
${foot()}`),
  card(3, 'Ajuda a controlar a umidade 💧', I('umidade')),
  card(4, 'Deixa um perfume suave 🌸', I('perfume')),
  card(5, 'É só pendurar 🪝', I('pendure')),
  card(6, 'Roupas, sapatos e bolsas 👗👠', I('protege')),
  card(7, 'Kit de 1 a 12 unidades 📦', I('kit')),
  page('cream', `${cnt(8)}
<div style="position:absolute;left:72px;top:110px;width:250px;height:250px;border-radius:50%;border:8px solid #f37021;background:url(${LEVIN}) center 22%/190%;box-shadow:0 10px 30px rgba(0,0,0,.15)"></div>
<div style="position:absolute;left:360px;right:60px;top:130px;font-weight:800;font-size:60px;line-height:1.12;color:#f37021;letter-spacing:-1px">Quer o link? Eu te mando! 🧡</div>
<div style="position:absolute;left:72px;right:72px;top:500px">
  <div class="wbox" style="font-size:52px;font-weight:800;line-height:1.25;text-align:center">Comenta <span style="color:#f37021">QUERO</span> que eu te mando o link no direct 👇</div>
  <div class="tbox" style="font-size:44px;text-align:center;margin-top:40px">Leve Brisa anti-mofo · a partir de<br><span style="font-size:80px">R$ 7,99</span></div>
  <div style="font-weight:800;font-size:50px;margin-top:60px;text-align:center">📌 Salva pro dia de arrumar o armário</div>
  <div style="font-weight:600;font-size:28px;margin-top:36px;text-align:center;color:#7a6152">Preço visto em 15/10, pode mudar. O tempo de uso depende do ambiente.</div>
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
