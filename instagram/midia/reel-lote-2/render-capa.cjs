const { createRequire } = require('module');
const req = createRequire('/opt/node-tools/node_modules/');
const { chromium } = req('playwright');
const fs = require('fs');
const path = require('path');

const REPO = '/home/user/achou-levou-flow';
const OUT = path.join(REPO, 'instagram/midia/carrossel-lote-2');
const F = path.join(REPO, 'instagram/produtos/2026-10-13-lote-2/fotos');
fs.mkdirSync(OUT, { recursive: true });
const uri = (p, t = 'image/jpeg') => `data:${t};base64,` + fs.readFileSync(p).toString('base64');
const LEVIN = uri(path.join(REPO, 'instagram/levin/ref-rosto-sorrindo-2.jpg'));
const USO = uri(path.join(F, 'espremedor-uso.jpg'));
const PASSOS = uri(path.join(F, 'espremedor-passos.jpg'));
const DIF = uri(path.join(F, 'limpa-tenis-diferenca.jpg'));
const FRASCO = uri(path.join(F, 'limpa-tenis-frasco.jpg'));
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
  <div class="tbox" style="font-size:68px;display:inline-block">2 achadinhos que<br>resolvem sua semana&nbsp;🧡</div><br>
  <div class="wbox" style="font-size:54px;font-weight:800;margin-top:22px;display:inline-block;color:#f37021">até R$15 💸</div>
</div>${foot()}`),
  // 2 espremedor uso
  page('orange', `${cnt(2)}
<div class="title">Amassa alho sem sujar a mão 🧄</div>
<div class="pic" style="left:100px;top:330px;width:880px;height:830px;background-image:url(${USO});background-position:center 60%"></div>
<div class="price" style="right:60px;top:1060px"><small>Espremedor de alho</small>R$ 11,49</div>
${foot()}`),
  // 3 passos
  page('orange', `${cnt(3)}
<div class="title">Rola, amassa, lava. Pronto! ✨</div>
<div class="pic" style="left:100px;top:300px;width:880px;height:880px;background-image:url(${PASSOS})"></div>
${foot()}`),
  // 4 limpa tenis diferença
  page('orange', `${cnt(4)}
<div class="title">Tênis branco de novo 👟</div>
<div class="pic" style="left:130px;top:240px;width:820px;height:820px;background-image:url(${DIF})"></div>
<div class="price" style="left:50%;transform:translateX(-50%);top:1095px;text-align:center;white-space:nowrap"><small>Limpa Tênis 500ml</small>R$ 14,99</div>
${foot()}`),
  // 5 frasco + benefícios
  page('cream', `${cnt(5)}
<div class="title">O que diz a embalagem 🧴</div>
<div class="pic" style="left:72px;top:290px;width:440px;height:880px;background-image:url(${FRASCO});background-size:200%;background-position:center 55%"></div>
<div style="position:absolute;left:550px;right:60px;top:330px;display:flex;flex-direction:column;gap:30px">
  <div class="wbox" style="font-size:42px">✅ Limpeza profunda</div>
  <div class="wbox" style="font-size:42px">✅ Remove manchas difíceis</div>
  <div class="wbox" style="font-size:42px">✅ Rende várias aplicações</div>
  <div style="font-weight:800;font-size:58px;color:#f37021;margin-top:16px">R$ 14,99</div>
  <div style="font-weight:600;font-size:30px;color:#7a6152;line-height:1.3">Frasco de 500ml com borrifador</div>
</div>
${foot()}`),
  // 6 CTA
  page('cream', `${cnt(6)}
<div style="position:absolute;left:72px;top:110px;width:250px;height:250px;border-radius:50%;border:8px solid #f37021;background:url(${LEVIN}) center 22%/190%;box-shadow:0 10px 30px rgba(0,0,0,.15)"></div>
<div style="position:absolute;left:360px;right:60px;top:130px;font-weight:800;font-size:60px;line-height:1.12;color:#f37021;letter-spacing:-1px">Quer o link? Eu te mando! 🧡</div>
<div style="position:absolute;left:72px;right:72px;top:500px">
  <div class="wbox" style="font-size:48px;font-weight:800;line-height:1.25">Comenta <span style="color:#f37021">1</span> (alho) ou <span style="color:#f37021">2</span> (tênis) que eu te mando o link no direct 🧡</div>
  <div style="display:flex;gap:28px;margin-top:34px">
    <div class="tbox" style="flex:1;font-size:40px;text-align:center"><div style="font-size:84px">1</div>🧄 Espremedor<br>R$ 11,49</div>
    <div class="tbox" style="flex:1;font-size:40px;text-align:center"><div style="font-size:84px">2</div>👟 Limpa tênis<br>R$ 14,99</div>
  </div>
  <div style="font-weight:800;font-size:50px;margin-top:70px;text-align:center">📌 Salva pra não esquecer</div>
  <div style="font-weight:600;font-size:28px;margin-top:40px;text-align:center;color:#7a6152">Preços vistos em 13/10, podem mudar.</div>
</div>${foot(true)}`),
];


const capa = page('', `
<div style="position:absolute;inset:0;background:url(${LEVIN}) center 10%/cover"></div>
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,0) 40%,rgba(0,0,0,.55) 100%)"></div>
<div style="position:absolute;left:80px;right:80px;top:1080px">
  <div class="tbox" style="font-size:76px;display:inline-block">CHEGOU ENTREGA! 📦</div><br>
  <div class="wbox" style="font-size:54px;font-weight:800;margin-top:22px;display:inline-block">2 achadinhos <span style="color:#f37021">até R$15</span> 🧡</div>
</div>
<div style="position:absolute;top:1560px;width:100%;text-align:center;font-weight:700;font-size:38px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.5)">@ach.oulevouofertas</div>`).replace('height:1350px','height:1920px');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.setContent(capa, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(REPO, 'instagram/midia/reel-lote-2/capa.jpg'), type: 'jpeg', quality: 92 });
  await browser.close(); console.log('capa ok');
})();
