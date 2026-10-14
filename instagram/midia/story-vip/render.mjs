import { createRequire } from 'module';
const require = createRequire('/opt/node-tools/node_modules/');
const { chromium } = require('playwright');
import fs from 'fs';
// Story do Grupo VIP (1080x1920). Área "Toca no link" para o adesivo de link do WhatsApp no app.
const R='/home/user/achou-levou-flow/';
const levin='data:image/jpeg;base64,'+fs.readFileSync(R+'instagram/levin/ref-rosto-sorrindo-2.jpg').toString('base64');
const html=`<html><head><style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;800;900&display=swap');
*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;font-family:Poppins,sans-serif;background:#f5631c;color:#fff;position:relative;overflow:hidden}
.photo{position:absolute;left:0;right:0;top:0;height:1060px;background:url(${levin}) center 18%/cover}
.photo:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.15) 0%,transparent 30%,transparent 62%,#f5631c 100%)}
.tag{position:absolute;top:200px;left:0;right:0;text-align:center}
.tag span{display:inline-block;background:#25D366;color:#fff;font-weight:800;font-size:40px;padding:12px 34px;border-radius:999px;box-shadow:0 8px 20px rgba(0,0,0,.2)}
h1{position:absolute;top:930px;left:50px;right:50px;text-align:center;font-size:92px;line-height:1.02;font-weight:900;text-shadow:0 6px 18px rgba(0,0,0,.2)}
ul{position:absolute;top:1160px;left:110px;right:110px;list-style:none}
li{background:#fff;color:#3A2A20;font-weight:700;font-size:42px;border-radius:26px;padding:16px 28px;margin-bottom:18px;box-shadow:0 8px 20px rgba(0,0,0,.15)}
.link{position:absolute;left:0;right:0;top:1550px;text-align:center}
.link span{display:inline-block;border:6px dashed rgba(255,255,255,.95);border-radius:36px;padding:22px 50px;font-size:46px;font-weight:800}
.foot{position:absolute;left:0;right:0;bottom:110px;text-align:center;font-size:30px;font-weight:600;opacity:.95}
</style></head><body>
<div class="photo"></div>
<div class="tag"><span>💬 Grupo VIP no WhatsApp</span></div>
<h1>Entra no meu<br>Grupo VIP 🧡</h1>
<ul><li>🛒 Achadinhos do dia no seu zap</li><li>✅ Só o que a Levin aprovaria</li><li>🆓 Grátis, sai quando quiser</li></ul>
<div class="link"><span>👆 Toca no link e entra</span></div>
<div class="foot">@ach.oulevouofertas · Levin é personagem virtual</div>
</body></html>`;
const br=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await br.newPage({viewport:{width:1080,height:1920}});
await p.setContent(html,{waitUntil:'networkidle'});
await p.screenshot({path:R+'instagram/midia/story-vip/story-vip.jpg',type:'jpeg',quality:88});
await br.close();console.log('ok');
