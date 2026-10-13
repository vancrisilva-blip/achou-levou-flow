"""Prévias v2 (estilo editorial premium). Reaproveita os dados de gerar.py.
Uso: python3 gerar_v2.py → sobrescreve <slug>.html."""
import html, pathlib
from gerar import EMPRESAS, D

# destaque: (palavra do título em itálico, número/termo grande do cartão, legenda do cartão)
EXTRA = {
 "je-suis-copa": ("Paris", "1997", "a tradição da Talento de Copa"),
 "vieira-representacoes": ("sua loja", "4 linhas", "cama, mesa, banho e limpeza"),
 "psicanalise-por-que": ("escutar", "Online", "e presencial em São Paulo"),
 "a-toda-zen-yoga": ("até você", "60+", "yoga adaptado em domicílio"),
 "dra-daniela-aidar": ("sua pele", "UNIFESP", "formação em dermatologia"),
 "italien-gelato": ("leve", "Leggero", "baixas calorias e pouco açúcar"),
 "alps-clinic": ("excelência", "Jardins", "São Paulo"),
 "fill-estetica": ("Transformação", "Laser", "e saúde capilar"),
 "bcx-odontologia": ("calma", "Sedação", "para quem tem medo de dentista"),
 "best-paws": ("pet feliz", "Vegano", "produtos naturais e dermatológicos"),
 "cameu-pet": ("amam pets", "Exclusivo", "acessórios com assinatura Ca'Meu"),
 "healthy-burguer": ("planeta", "Verde", "pela causa animal e ambiental"),
 "gengibre-arquitetura": ("fazem bem", "Interiores", "do projeto à obra"),
 "eduardo-vieira-fotografia": ("presença", "Nubank · Itaú · XP", "marcas que já confiaram"),
 "luiza-lara-nutricao": ("evidências", "Ciência", "nutrição esportiva e estética"),
 "mushin": ("cuidam", "Anvisa", "1ª marca com extrato de cogumelos aprovado"),
}
FONTES = [("Cormorant Garamond", "Inter"), ("Playfair Display", "DM Sans"), ("Fraunces", "Manrope")]

TPL = """<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{nome} · prévia Yaveh</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family={fsurl}:ital,wght@0,400;0,500;0,600;1,400;1,500&family={fbodyurl}:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root{{--bg:{bg};--ink:{ink};--acc:{acc};--soft:{soft};--serif:"{fs}",Georgia,serif;--sans:"{fbody}",system-ui,sans-serif}}
*{{box-sizing:border-box;margin:0;padding:0}}html{{-webkit-font-smoothing:antialiased}}
body{{font-family:var(--sans);font-weight:300;background:var(--bg);color:var(--ink);line-height:1.6;letter-spacing:.005em}}
a{{color:inherit;text-decoration:none}}.w{{max-width:1180px;margin:0 auto;padding:0 24px}}
.ser{{font-family:var(--serif);font-weight:400;letter-spacing:-.015em}}
.eyebrow{{font-size:11px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;opacity:.6}}
.demo{{background:var(--ink);color:var(--bg);text-align:center;font-size:10px;letter-spacing:.22em;text-transform:uppercase;padding:7px}}
nav{{display:flex;justify-content:space-between;align-items:center;padding:22px 0}}
.brand{{font-family:var(--serif);font-size:24px;letter-spacing:.01em}}
.links{{display:flex;gap:30px;font-size:13px;opacity:.75}}
.pill{{border:1px solid currentColor;border-radius:999px;padding:10px 20px;font-size:13px;font-weight:500}}
.hero{{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center;padding-block:56px 84px}}
h1{{font-size:clamp(44px,6.4vw,88px);line-height:.98;margin:22px 0 26px}}
h1 em{{font-style:italic;color:var(--acc)}}
.lead{{font-size:18px;max-width:30em;opacity:.78}}
.ctas{{display:flex;gap:14px;align-items:center;margin-top:34px;flex-wrap:wrap}}
.btn{{background:var(--ink);color:var(--bg);padding:16px 28px;border-radius:999px;font-weight:500;font-size:14px}}
.lnk{{font-size:14px;font-weight:500;border-bottom:1px solid currentColor;padding-bottom:2px}}
.art{{position:relative;aspect-ratio:4/5;border-radius:4px 180px 4px 4px;overflow:hidden;
 background:radial-gradient(120% 90% at 85% 10%,{c1} 0%,transparent 55%),radial-gradient(90% 80% at 10% 90%,{c2} 0%,transparent 60%),radial-gradient(70% 60% at 60% 60%,{c3} 0%,transparent 70%),var(--soft)}}
.art::after{{content:"";position:absolute;inset:0;opacity:.35;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}}
.art .ring{{position:absolute;border:1px solid rgba(255,255,255,.55);border-radius:50%}}
.card{{position:absolute;left:-28px;bottom:42px;background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(14px);padding:22px 26px;border-radius:2px;box-shadow:0 30px 60px -20px rgba(0,0,0,.25);max-width:260px;z-index:2}}
.card b{{display:block;font-family:var(--serif);font-weight:400;font-size:34px;line-height:1.05;color:var(--acc)}}.card span{{font-size:13px;opacity:.75}}
.artwrap{{position:relative}}
.strip{{border-top:1px solid color-mix(in srgb,var(--ink) 14%,transparent);border-bottom:1px solid color-mix(in srgb,var(--ink) 14%,transparent);padding:18px 0;overflow:hidden;white-space:nowrap}}
.strip span{{font-family:var(--serif);font-style:italic;font-size:22px;margin-right:46px;opacity:.85}}.strip i{{font-style:normal;color:var(--acc);margin-right:46px}}
section{{padding:96px 0}}
.head{{display:flex;justify-content:space-between;align-items:end;gap:24px;margin-bottom:46px}}
h2{{font-size:clamp(34px,4.4vw,58px);line-height:1.02}}h2 em{{font-style:italic;color:var(--acc)}}
.row{{display:grid;grid-template-columns:80px 1fr 1.2fr 40px;gap:24px;align-items:baseline;padding:28px 0;border-top:1px solid color-mix(in srgb,var(--ink) 14%,transparent)}}
.row:last-child{{border-bottom:1px solid color-mix(in srgb,var(--ink) 14%,transparent)}}
.row .n{{font-size:12px;letter-spacing:.2em;opacity:.5}}.row h3{{font-family:var(--serif);font-weight:400;font-size:28px}}.row p{{opacity:.7}}.row .ar{{text-align:right;opacity:.5}}
.quote{{background:var(--soft);}}
.quote blockquote{{font-family:var(--serif);font-size:clamp(28px,3.6vw,46px);line-height:1.18;max-width:20em;font-style:italic}}
.quote cite{{display:block;margin-top:24px;font-style:normal;font-size:12px;letter-spacing:.22em;text-transform:uppercase;opacity:.6}}
.dark{{background:var(--ink);color:var(--bg)}}
.grid2{{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:end}}
.dark .btn{{background:var(--bg);color:var(--ink)}}
.meta{{display:grid;gap:18px;font-size:15px}}.meta div{{border-top:1px solid rgba(255,255,255,.18);padding-top:14px;display:flex;justify-content:space-between;gap:18px}}.meta small{{opacity:.6;letter-spacing:.16em;text-transform:uppercase;font-size:11px}}
footer{{padding:28px 0;font-size:12px;opacity:.6;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}}
@media(max-width:820px){{.links{{display:none}}.hero{{grid-template-columns:1fr;gap:40px;padding-block:28px 64px}}.art{{aspect-ratio:5/4;border-radius:4px 120px 4px 4px}}.card{{left:16px;bottom:16px}}
section{{padding:68px 0}}.row{{grid-template-columns:44px 1fr;gap:10px 16px}}.row p{{grid-column:2}}.row .ar{{display:none}}.grid2{{grid-template-columns:1fr}}.head{{display:block}}.pill{{display:none}}}}
</style></head><body>
<div class="demo">Prévia exclusiva · Yaveh Sites Premium</div>
<div class="w"><nav><div class="brand">{nome}</div><div class="links"><a href="#s">{sec}</a><a href="#sobre">Sobre</a><a href="#contato">Contato</a></div><a class="pill" href="#contato">{cta}</a></nav></div>
<header class="w hero">
 <div><div class="eyebrow">{tag}</div><h1 class="ser">{h1html}</h1><p class="lead">{sub}</p>
 <div class="ctas"><a class="btn" href="#contato">{cta}</a><a class="lnk" href="#s">Conhecer {secl}</a></div></div>
 <div class="artwrap"><div class="art"><div class="ring" style="width:70%;aspect-ratio:1;right:-18%;top:-12%"></div><div class="ring" style="width:44%;aspect-ratio:1;left:12%;bottom:18%"></div></div>
 <div class="card"><b>{big}</b><span>{small}</span></div></div>
</header>
<div class="strip"><div class="w">{marquee}</div></div>
<section id="s"><div class="w"><div class="head"><h2 class="ser">{sec}<br><em>com cuidado.</em></h2><p class="eyebrow">{cidade}</p></div>{rows}</div></section>
<section class="quote" id="sobre"><div class="w"><blockquote>“Espaço para o depoimento de um cliente real, escolhido entre as avaliações do Google ou do Instagram.”</blockquote><cite>Cliente {nome}</cite></div></section>
<section class="dark" id="contato"><div class="w grid2"><div><div class="eyebrow">Contato</div><h2 class="ser" style="margin:18px 0 30px">Vamos <em style="color:inherit">conversar?</em></h2><a class="btn" href="#">{cta} pelo WhatsApp</a></div>
<div class="meta"><div><small>Onde</small><span>{cidade}</span></div><div><small>Horário</small><span>Horário de atendimento</span></div><div><small>Redes</small><span>Instagram · WhatsApp</span></div></div></div>
<div class="w"><footer><span>© {nome}</span><span>Prévia criada pela Yaveh Sites Premium · (21) 96429-1001</span></footer></div></section>
</body></html>
"""

def mix(hexa, f):  # clareia (f>0) uma cor hex
    r, g, b = (int(hexa[i:i+2], 16) for i in (1, 3, 5))
    return "#%02x%02x%02x" % tuple(int(c + (255 - c) * f) for c in (r, g, b))

if __name__ == "__main__":
    for i, e in enumerate(EMPRESAS):
        acc_word, big, small = EXTRA[e["slug"]]
        fs, fb = FONTES[i % 3]
        h1 = html.escape(e["h1"]).replace(html.escape(acc_word), f"<em>{html.escape(acc_word)}</em>", 1)
        h1g = e["hero"].split(",")
        v = {k: html.escape(x) if isinstance(x, str) else x for k, x in e.items()}
        v.update(h1html=h1, big=html.escape(big), small=html.escape(small), fs=fs, fbody=fb,
                 fsurl=fs.replace(" ", "+"), fbodyurl=fb.replace(" ", "+"), secl=html.escape(e["sec"].lower()),
                 c1=h1g[0], c2=h1g[-1], c3=mix(e["acc"], .45),
                 marquee="".join(f"<span>{html.escape(t)}</span><i>✦</i>" for t, _ in e["itens"] * 2),
                 rows="".join(f'<div class="row"><span class="n">0{j+1}</span><h3>{html.escape(t)}</h3><p>{html.escape(d)}</p><span class="ar">↗</span></div>' for j, (t, d) in enumerate(e["itens"])))
        if e["slug"] == "eduardo-vieira-fotografia":
            v["c3"] = "#8a6d1f"
        (D / f"{e['slug']}.html").write_text(TPL.format(**v), encoding="utf-8")
    print(len(EMPRESAS), "prévias v2")
