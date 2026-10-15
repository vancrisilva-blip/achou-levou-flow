import { createRequire } from 'module';
const require = createRequire('/opt/node-tools/node_modules/');
const { chromium } = require('playwright');
import fs from 'fs';
const R='/home/user/achou-levou-flow/';
const b64=p=>'data:image/jpeg;base64,'+fs.readFileSync(R+p).toString('base64');
const levin=b64('instagram/levin/ref-rosto-sorrindo-2.jpg');
const css=`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;800;900&display=swap');
*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;font-family:Poppins,sans-serif;background:linear-gradient(170deg,#ff8a1f,#f2541b);color:#fff;position:relative;overflow:hidden}
.top{position:absolute;top:210px;left:0;right:0;text-align:center}
.tag{display:inline-block;background:#fff;color:#f2541b;font-weight:800;font-size:40px;padding:12px 34px;border-radius:999px}
h1{font-size:88px;line-height:1.02;font-weight:900;margin:28px 60px 0;text-shadow:0 6px 18px rgba(0,0,0,.18)}
.card{position:absolute;left:90px;right:90px;top:560px;height:720px;background:#fff;border-radius:48px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.25)}
.card img{width:100%;height:100%;object-fit:var(--fit,cover)}
.price{position:absolute;right:60px;top:1320px;background:#1f1f1f;color:#fff;font-weight:900;font-size:80px;padding:18px 40px;border-radius:30px;transform:rotate(-3deg);box-shadow:0 14px 30px rgba(0,0,0,.3)}
.levin{position:absolute;left:70px;top:1310px;width:190px;height:190px;border-radius:50%;border:8px solid #fff;background:url(${levin}) center 20%/cover}
.link{position:absolute;left:0;right:0;top:1520px;text-align:center}
.link span{display:inline-block;border:6px dashed rgba(255,255,255,.9);border-radius:36px;padding:22px 50px;font-size:44px;font-weight:800}
.foot{position:absolute;left:0;right:0;bottom:200px;text-align:center;font-size:30px;font-weight:500;opacity:.92}`;
const page=(tag,h1,img,price,pos)=>`<html><head><style>${css}</style></head><body>
<div class="top"><span class="tag">${tag}</span><h1>${h1}</h1></div>
<div class="card"><img src="${img}" style="object-position:${pos};--fit:${pos==='contain'?'contain':'cover'}"></div>
<div class="levin"></div><div class="price">${price}</div>
<div class="link"><span>👆 Toca no link</span></div>
<div class="foot">Preço visto em 12/10, pode mudar · 🔗 Link de afiliado</div></body></html>`;
const items=[
 ['story-oferta.jpg','🧺 Achadinho de lavanderia','Roupa branca de novo, sem cloro!',b64('instagram/remotion/public/percarbonato.jpg'),'R$ 39,90','contain'],
];
const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await br.newPage({viewport:{width:1080,height:1920}});
for(const [f,t,h,i,pr,pos] of items){await p.setContent(page(t,h,i,pr,pos),{waitUntil:'networkidle'});await p.screenshot({path:R+'instagram/midia/story-percarbonato/'+f,type:'jpeg',quality:88});}
await br.close();console.log('ok');
