const { createRequire } = require('module');
const req = createRequire('/opt/node-tools/node_modules/');
const { chromium } = req('playwright');
const fs = require('fs'), path = require('path');
const REPO = '/home/user/achou-levou-flow';
const OUT = path.join(REPO, 'instagram/midia/carrossel-top5');
const SOUT = path.join(REPO, 'instagram/midia/story-top5');
const uri = (p, t = 'image/jpeg') => `data:${t};base64,` + fs.readFileSync(path.join(REPO, p)).toString('base64');
const LEVIN = uri('instagram/levin/ref-rosto-sorrindo-2.jpg');
const font = w => `@font-face{font-family:'Poppins';font-weight:${w};src:url(${uri(`instagram/remotion/public/poppins-${w}.woff2`, 'font/woff2')}) format('woff2')}`;
const P = [
  { n: 'Leve Brisa anti-mofo', p: 'R$ 7,99', pre: 'a partir de', prob: 'Armário com cheiro de guardado', img: uri('instagram/produtos/2026-10-15-lote-3/fotos/mofo-hero.jpg'), d: '15/10' },
  { n: 'Espremedor de alho e batata', p: 'R$ 11,49', pre: '', prob: 'Amassar alho na faca', img: uri('instagram/produtos/2026-10-13-lote-2/fotos/espremedor-uso.jpg'), d: '13/10' },
  { n: 'Limpa Tênis Eco Clean 500ml', p: 'R$ 14,99', pre: '', prob: 'Tênis branco encardido', img: uri('instagram/produtos/2026-10-13-lote-2/fotos/limpa-tenis-antes-depois.jpg'), d: '13/10' },
  { n: 'Escova 4 em 1 com detergente', p: 'R$ 29,59', pre: '', prob: 'Lavar panela engordurada', img: uri('instagram/produtos/2026-10-15-lote-3/fotos/escova-aperte-limpe.jpg'), d: '15/10' },
  { n: 'Tira-manchas percarbonato Calisul', p: 'R$ 39,90', pre: '', prob: 'Roupa branca amarelada', img: uri('instagram/remotion/public/percarbonato.jpg'), d: '12/10' },
];
const T = 7, HANDLE = '@ach.oulevouofertas';
const css = (w, h) => `${font(600)}${font(700)}${font(800)}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${w}px;height:${h}px;overflow:hidden}
body{font-family:'Poppins','Noto Color Emoji',sans-serif;color:#3a2418;position:relative}
.orange{background:linear-gradient(160deg,#ff8a3d 0%,#f37021 50%,#de5a12 100%)}.cream{background:#fff6ec}
.count{position:absolute;top:48px;right:60px;font-weight:700;font-size:30px;color:rgba(255,255,255,.9);text-shadow:0 2px 8px rgba(0,0,0,.3)}
.cream .count{color:#7a6152;text-shadow:none}
.foot{position:absolute;bottom:44px;left:72px;right:64px;display:flex;justify-content:space-between;font-weight:700;font-size:31px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.25)}
.cream .foot{color:#3a2418;text-shadow:none}
.tbox{background:#f37021;color:#fff;border-radius:28px;padding:22px 36px 26px;font-weight:800;line-height:1.12;box-shadow:0 8px 0 #c9520f}
.wbox{background:#fff;color:#3a2418;border-radius:28px;padding:22px 32px;font-weight:700;line-height:1.3;box-shadow:0 10px 30px rgba(0,0,0,.12)}
.pic{position:absolute;border-radius:36px;overflow:hidden;border:8px solid #fff;box-shadow:0 18px 44px rgba(0,0,0,.22);background:#fff center/cover no-repeat}
.price{position:absolute;background:#fff;color:#f37021;font-weight:800;font-size:76px;line-height:1;padding:22px 36px;border-radius:30px;box-shadow:0 10px 0 rgba(150,60,10,.35)}
.price small{display:block;font-size:28px;color:#7a6152;font-weight:700;margin-bottom:6px}
.num{position:absolute;left:60px;top:1040px;width:150px;height:150px;border-radius:50%;background:#3a2418;color:#fff;font-weight:800;font-size:84px;display:grid;place-items:center;border:8px solid #fff}`;
const page = (cls, inner, w = 1080, h = 1350) => `<!doctype html><html><head><meta charset="utf-8"><style>${css(w, h)}</style></head><body class="${cls}">${inner}</body></html>`;
const foot = last => `<div class="foot"><span>${HANDLE}</span>${last ? '' : '<span>arraste →</span>'}</div>`;
const cnt = n => `<div class="count">${n}/${T}</div>`;
const slides = [
  page('', `<div style="position:absolute;inset:0;background:url(${LEVIN}) center 8%/cover"></div>
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.18) 0%,rgba(0,0,0,0) 22%,rgba(0,0,0,0) 50%,rgba(0,0,0,.6) 100%)"></div>${cnt(1)}
<div style="position:absolute;left:72px;right:72px;bottom:130px">
<div class="tbox" style="font-size:62px;display:inline-block">5 problemas de casa<br>resolvidos com<br>menos de R$ 40 🏠</div><br>
<div class="wbox" style="font-size:46px;font-weight:800;margin-top:22px;display:inline-block;color:#f37021">Os achados da semana da Levin 👉</div></div>${foot()}`),
  ...P.map((x, i) => page('orange', `${cnt(i + 2)}
<div style="position:absolute;left:72px;right:72px;top:96px"><div class="tbox" style="font-size:46px;display:inline-block">😩 ${x.prob}?</div></div>
<div class="pic" style="left:90px;top:250px;width:900px;height:860px;background-image:url(${x.img})"></div>
<div class="num">${i + 1}</div>
<div class="price" style="right:50px;top:1020px"><small>${x.n}${x.pre ? ' · ' + x.pre : ''}</small>${x.p}</div>${foot()}`)),
  page('cream', `${cnt(7)}
<div style="position:absolute;left:72px;top:110px;width:250px;height:250px;border-radius:50%;border:8px solid #f37021;background:url(${LEVIN}) center 22%/190%;box-shadow:0 10px 30px rgba(0,0,0,.15)"></div>
<div style="position:absolute;left:360px;right:60px;top:130px;font-weight:800;font-size:60px;line-height:1.12;color:#f37021;letter-spacing:-1px">Qual desses você levaria? 🧡</div>
<div style="position:absolute;left:72px;right:72px;top:470px">
<div class="wbox" style="font-size:50px;font-weight:800;line-height:1.25;text-align:center">Comenta <span style="color:#f37021">QUERO</span> + o número (1 a 5) que eu te mando o link 👇</div>
<div style="font-weight:800;font-size:50px;margin-top:60px;text-align:center">📌 Salva pra consultar depois</div>
<div style="font-weight:600;font-size:28px;margin-top:40px;text-align:center;color:#7a6152">Preços vistos entre 12 e 15/10, podem mudar.</div></div>${foot(true)}`),
];
const story = page('orange', `<div style="position:absolute;left:70px;right:70px;top:150px">
<div class="tbox" style="font-size:66px;display:inline-block">5 achados<br>até R$ 40 🏠</div></div>
<div style="position:absolute;left:70px;right:70px;top:470px;display:grid;gap:22px">
${P.map((x, i) => `<div class="wbox" style="display:flex;align-items:center;gap:24px;padding:14px 20px"><div style="width:120px;height:120px;border-radius:20px;background:url(${x.img}) center/cover;flex:none"></div><div style="flex:1;font-size:34px;line-height:1.15">${i + 1}. ${x.n}</div><div style="font-weight:800;font-size:40px;color:#f37021;white-space:nowrap">${x.pre ? 'a partir de<br>' : ''}${x.p}</div></div>`).join('')}</div>
<div style="position:absolute;left:150px;right:150px;top:1480px;height:170px;border:6px dashed rgba(255,255,255,.95);border-radius:40px;display:grid;place-items:center;font-weight:800;font-size:58px;color:#fff">👆 Toca no link</div>
<div style="position:absolute;bottom:90px;left:0;right:0;text-align:center;font-weight:700;font-size:32px;color:#fff">${HANDLE} · preços vistos de 12 a 15/10</div>`, 1080, 1920);
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const shot = async (html, w, h, file) => { const p = await b.newPage({ viewport: { width: w, height: h } }); await p.setContent(html, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: file, type: 'jpeg', quality: 92 }); await p.close(); };
  for (let i = 0; i < slides.length; i++) await shot(slides[i], 1080, 1350, path.join(OUT, `slide-${i + 1}.jpg`));
  await shot(story, 1080, 1920, path.join(SOUT, 'story-oferta.jpg'));
  await b.close(); console.log('done');
})();
