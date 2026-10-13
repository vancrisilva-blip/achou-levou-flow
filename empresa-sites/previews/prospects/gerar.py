"""Gera as prévias de site (HTML) para cada prospect da Yaveh.
Uso: python3 gerar.py  → cria <slug>.html nesta pasta."""
import html, pathlib

D = pathlib.Path(__file__).parent

# serif: fonte dos títulos; bg/ink/acc/soft: cores; hero: gradiente da imagem de destaque
EMPRESAS = [
 dict(slug="je-suis-copa", nome="Je Suis Copa", tag="Lanchonete carioca · bistrô parisiense", emoji="🥐",
      h1="Copacabana com um toque de Paris.", sub="Sucos, lanches e pratos de bistrô num espaço aconchegante. A tradição da Talento de Copa desde 1997, agora com sotaque francês.",
      cta="Reservar pelo WhatsApp", sec="Cardápio", itens=[("Sucos naturais","A tradição da casa desde 1997"),("Lanches","O clássico da lanchonete carioca"),("Pratos de bistrô","O toque francês do novo conceito"),("Cafés e doces","Para a tarde em Copacabana")],
      bg="#fbf7f1", ink="#1f2a44", acc="#c8102e", soft="#eadfcf", hero="#1f2a44,#c8102e", cidade="Copacabana · Rio de Janeiro"),
 dict(slug="vieira-representacoes", nome="Vieira Representações", tag="Cama, mesa, banho, limpeza e tecidos profissionais", emoji="🛏️",
      h1="As melhores marcas de cama, mesa e banho para a sua loja.", sub="Representação comercial para lojistas, hotéis e lavanderias. Veja o catálogo e peça sua tabela pelo WhatsApp.",
      cta="Pedir tabela de preços", sec="Linhas que representamos", itens=[("Cama","Jogos de lençol, edredons e travesseiros"),("Mesa","Toalhas, jogos americanos e guardanapos"),("Banho","Toalhas e roupões"),("Limpeza e lavanderia","Linha profissional e tecidos técnicos")],
      bg="#f6f8fb", ink="#14304d", acc="#2f7dd1", soft="#dbe6f3", hero="#14304d,#2f7dd1", cidade="Rio de Janeiro"),
 dict(slug="psicanalise-por-que", nome="Psicanálise, por quê?", tag="Clínica de psicologia e psicanálise · Michelle Venturini", emoji="🌿",
      h1="Um espaço para escutar o que você sente.", sub="Psicologia clínica e psicanálise, com atendimento presencial em São Paulo e online. Formação pela PUC, com especialização em psico-oncologia e psicossomática.",
      cta="Agendar uma conversa", sec="Atendimento", itens=[("Psicoterapia individual","Adultos, presencial ou online"),("Psico-oncologia","Acompanhamento de pacientes e familiares"),("Psicossomática","Quando o corpo fala o que a mente sente"),("Como funciona","Sessões semanais, horário combinado")],
      bg="#f7f6f2", ink="#2f3b32", acc="#6b8f71", soft="#e3e7dc", hero="#6b8f71,#2f3b32", cidade="São Paulo · e online"),
 dict(slug="a-toda-zen-yoga", nome="A.Toda Zen Yoga", tag="Yoga corporativo, online e em domicílio", emoji="🧘",
      h1="Bem-estar que vai até você: na empresa ou em casa.", sub="Aulas de yoga para empresas, workshops de respiração, reiki e yoga adaptado em domicílio para 60+ e pessoas com mobilidade reduzida.",
      cta="Pedir proposta", sec="Programas", itens=[("Yoga corporativo","No escritório ou online para equipes"),("Workshops","Respiração, meditação e reiki"),("Yoga adaptado em casa","60+, cadeirantes e pós-tratamento"),("Retiros e Dias de Bem-Estar","Programas sob medida")],
      bg="#fbf8f3", ink="#3a2e4d", acc="#d08c3c", soft="#efe3d2", hero="#d08c3c,#3a2e4d", cidade="São Paulo"),
 dict(slug="dra-daniela-aidar", nome="Dra. Daniela Aidar", tag="Dermatologia estética, clínica e cirúrgica", emoji="✨",
      h1="Cuidado com a sua pele, com atendimento humanizado.", sub="Dermatologista formada pela UNIFESP. Atendimento em dermatologia estética, clínica e cirúrgica na zona sul de São Paulo.",
      cta="Agendar consulta", sec="Áreas de atuação", itens=[("Dermatologia clínica","Acne, manchas, queda de cabelo"),("Dermatologia estética","Tratamentos para rejuvenescimento"),("Dermatologia cirúrgica","Pequenas cirurgias de pele"),("Avaliação","Consulta personalizada")],
      bg="#fbf7f6", ink="#3d2b2b", acc="#b07a6e", soft="#efe0dc", hero="#e6c3b8,#b07a6e", cidade="Zona sul · São Paulo"),
 dict(slug="italien-gelato", nome="Italien Gelato", tag="Gelato leggero · ingredientes italianos e brasileiros", emoji="🍨",
      h1="Só leve com você o que for leve.", sub="Gelatos com baixas calorias, pouca gordura e pouco açúcar, com waffle belga e caldas de outro planeta.",
      cta="Pedir delivery", sec="Sabores", itens=[("Gelatos leggeros","Sabores italianos e brasileiros"),("Waffle belga","O biscoito que acompanha"),("Caldas","De outro planeta"),("Unidades","Encontre a mais perto de você")],
      bg="#f4f7fb", ink="#2a2550", acc="#ff6f91", soft="#e3e3f6", hero="#8ec5fc,#e0c3fc", cidade="São Paulo"),
 dict(slug="alps-clinic", nome="Alps Clinic", tag="Clínica médica de especialidades · Jardins", emoji="🏔️",
      h1="Medicina de especialidades com padrão de excelência.", sub="Clínica de alto padrão nos Jardins, com atendimento personalizado e corpo clínico especializado.",
      cta="Agendar consulta", sec="Especialidades", itens=[("Especialidades médicas","Corpo clínico especializado"),("Check-up","Avaliação completa"),("Estrutura","Conforto e tecnologia nos Jardins"),("Atendimento","Particular e personalizado")],
      bg="#f5f7f8", ink="#13262f", acc="#3a7d8c", soft="#dde8eb", hero="#13262f,#3a7d8c", cidade="Jardins · São Paulo"),
 dict(slug="fill-estetica", nome="Fill Estética", tag="Saúde capilar, injetáveis e laser", emoji="💎",
      h1="Transformação com protocolos exclusivos.", sub="Tratamento e transplante capilar, injetáveis e depilação a laser, com acompanhamento da equipe de especialistas.",
      cta="Agendar avaliação", sec="Tratamentos", itens=[("Tratamento capilar","Protocolos para queda e fortalecimento"),("Transplante capilar","Avaliação com especialista"),("Injetáveis","Harmonização com segurança"),("Depilação a laser","Resultados duradouros")],
      bg="#faf7fb", ink="#2d1f3d", acc="#9b5de5", soft="#ebe0f5", hero="#2d1f3d,#9b5de5", cidade="São Paulo"),
 dict(slug="bcx-odontologia", nome="BCX Odontologia", tag="Implantes, próteses e tratamento com sedação", emoji="😁",
      h1="Medo de dentista? Aqui você é tratado com calma.", sub="Especialistas em pacientes com medo, com tratamento sob sedação médica. Implantes, próteses, periodontia, canal e reabilitação oral.",
      cta="Agendar avaliação", sec="Tratamentos", itens=[("Sedação","Tratamento tranquilo para quem tem medo"),("Implante dentário","Reabilitação oral completa"),("Próteses","Sorriso de volta com conforto"),("Canal e periodontia","Cuidado da raiz à gengiva")],
      bg="#f4f9fa", ink="#0f2f3a", acc="#14a3b8", soft="#d9eef1", hero="#0f2f3a,#14a3b8", cidade="São Paulo"),
 dict(slug="best-paws", nome="Best Paws SkinCare", tag="Pet shop · banho dermatológico", emoji="🐾",
      h1="Pele saudável, pet feliz.", sub="Referência em banho dermatológico para tratar e prevenir dermatites. Produtos naturais, veganos e terapias como cromoterapia e aromaterapia.",
      cta="Agendar banho", sec="Serviços", itens=[("Banho dermatológico","Para pets com dermatite e coceira"),("Banho e tosa","Com produtos naturais e veganos"),("Terapias","Cromo, aroma e musicoterapia"),("Loja","Produtos dermatológicos pet")],
      bg="#f6fbf7", ink="#1e3a2b", acc="#2fa66a", soft="#dcefe3", hero="#a8e6cf,#2fa66a", cidade="São Paulo"),
 dict(slug="cameu-pet", nome="Ca'Meu Pet Boutique", tag="Acessórios exclusivos para pets", emoji="🐶",
      h1="Para os que amam pets.", sub="Produtos exclusivos e de alta qualidade para o bem-estar, o conforto e a segurança do seu companheiro peludo.",
      cta="Ver a loja", sec="Coleções", itens=[("Caminhas","Conforto para o descanso"),("Coleiras e guias","Segurança no passeio"),("Acessórios","Exclusivos Ca'Meu"),("Presentes","Para quem ama pets")],
      bg="#fdf8f4", ink="#3b2a20", acc="#e07a3f", soft="#f3e2d4", hero="#f6d5b8,#e07a3f", cidade="São Paulo · entrega para todo o Brasil"),
 dict(slug="healthy-burguer", nome="Healthy Burguer", tag="Hambúrguer saudável e sustentável", emoji="🍔",
      h1="O hambúrguer que cuida de você e do planeta.", sub="Lanches saudáveis, com respeito ao meio ambiente e à causa animal. Peça pelo WhatsApp ou venha nos visitar.",
      cta="Fazer pedido", sec="Cardápio", itens=[("Burgers","Saudáveis e saborosos"),("Opções vegetais","Para todos os estilos de vida"),("Acompanhamentos","Leves e crocantes"),("Bebidas","Naturais")],
      bg="#f8faf3", ink="#24331a", acc="#7cb342", soft="#e4eed6", hero="#24331a,#7cb342", cidade="São Paulo"),
 dict(slug="gengibre-arquitetura", nome="Gengibre Arquitetura", tag="Arquitetura de interiores", emoji="🏡",
      h1="Espaços que fazem bem para quem vive neles.", sub="Projetos de arquitetura de interiores que unem bem-estar, qualidade de vida e funcionalidade.",
      cta="Pedir orçamento", sec="Serviços", itens=[("Projeto de interiores","Do conceito ao detalhamento"),("Consultoria","Orientação para o seu espaço"),("Acompanhamento de obra","Gerenciamento até a entrega"),("Portfólio","Projetos e obras realizadas")],
      bg="#faf7f2", ink="#3a2f25", acc="#c27c3a", soft="#ede3d5", hero="#e8d5b7,#c27c3a", cidade="São Paulo"),
 dict(slug="eduardo-vieira-fotografia", nome="Eduardo Vieira", tag="Fotografia · retratos", emoji="📷",
      h1="Retratos que revelam presença.", sub="Fotografia com foco na identidade e na naturalidade de quem está diante da câmera. Para pessoas e para empresas.",
      cta="Pedir orçamento", sec="Trabalhos", itens=[("Retratos","Pessoais e profissionais"),("Corporativo","Para empresas e equipes"),("Projetos autorais","Como o Olhos Luzios"),("Clientes","Marcas que confiam no trabalho")],
      bg="#111111", ink="#f2f2f2", acc="#d4af37", soft="#2a2a2a", hero="#2a2a2a,#555555", cidade="São Paulo"),
 dict(slug="luiza-lara-nutricao", nome="Luiza Lara Nutrição", tag="Nutrição esportiva e estética", emoji="🥗",
      h1="Nutrição baseada em evidências para o seu objetivo.", sub="Performance, composição corporal, emagrecimento e hipertrofia, com uma abordagem completa da sua saúde.",
      cta="Agendar consulta", sec="Como posso te ajudar", itens=[("Performance","Para quem treina e compete"),("Emagrecimento","Com saúde e sem terrorismo"),("Hipertrofia","Plano para ganho de massa"),("Consulta","Presencial no Rio ou online")],
      bg="#f7fbf8", ink="#183a2e", acc="#20a36b", soft="#dcf0e5", hero="#183a2e,#20a36b", cidade="Rio de Janeiro · e online"),
 dict(slug="mushin", nome="Mushin", tag="Suplementos funcionais de cogumelos", emoji="🍄",
      h1="Cogumelos que cuidam de você.", sub="A primeira marca do Brasil com suplementos de extrato de cogumelos aprovados pela Anvisa. Imunidade, foco e bem-estar com sabor.",
      cta="Comprar agora", sec="Produtos", itens=[("Imunidade","Cogumelos para o dia a dia"),("Foco mental","Para a mente em forma"),("Bem-estar","Autocuidado com sabor"),("Comunidade","Aprenda sobre os cogumelos")],
      bg="#fbf8f2", ink="#2b2a1f", acc="#b5651d", soft="#efe5d3", hero="#2b2a1f,#b5651d", cidade="São Paulo · entrega para todo o Brasil"),
]

TPL = """<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{nome} · prévia Yaveh</title>
<style>
:root{{--bg:{bg};--ink:{ink};--acc:{acc};--soft:{soft}}}
*{{box-sizing:border-box;margin:0}}body{{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:var(--bg);color:var(--ink);line-height:1.55}}
.s{{font-family:Georgia,"Times New Roman",serif}}.w{{max-width:1040px;margin:0 auto;padding:0 20px}}
.demo{{background:#111;color:#fff;text-align:center;font-size:12px;padding:6px}}.demo b{{color:#d4af37}}
header{{padding:18px 0;border-bottom:1px solid var(--soft)}}.nav{{display:flex;justify-content:space-between;align-items:center;gap:12px}}
.logo{{font-size:22px;font-weight:700}}.logo small{{display:block;font:500 11px system-ui;letter-spacing:.12em;text-transform:uppercase;opacity:.65}}
.btn{{display:inline-block;background:var(--acc);color:#fff;text-decoration:none;padding:13px 22px;border-radius:999px;font-weight:700;white-space:nowrap}}
.hero{{padding-block:48px;display:grid;gap:28px;grid-template-columns:1.1fr .9fr;align-items:center}}
h1{{font-size:clamp(30px,5vw,50px);line-height:1.1}}.hero p{{opacity:.8;font-size:17px;margin:14px 0 22px}}
.ph{{aspect-ratio:4/5;border-radius:28px;background:linear-gradient(135deg,{hero});display:flex;align-items:center;justify-content:center;font-size:96px;box-shadow:0 20px 40px rgba(0,0,0,.12)}}
section{{padding:40px 0}}h2{{font-size:30px;margin-bottom:18px}}
.g{{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(210px,1fr))}}
.c{{background:color-mix(in srgb,var(--bg) 70%,#fff);border:1px solid var(--soft);border-radius:18px;padding:20px}}.c h3{{font-size:18px;margin-bottom:4px}}.c p{{opacity:.75;font-size:15px}}
.map{{border-radius:18px;background:var(--soft);min-height:180px;display:flex;align-items:center;justify-content:center;opacity:.8}}
footer{{padding:24px 0;border-top:1px solid var(--soft);font-size:13px;opacity:.7}}
.wa{{position:fixed;right:16px;bottom:16px;background:#25d366;color:#fff;text-decoration:none;font-weight:800;padding:14px 18px;border-radius:999px;box-shadow:0 8px 22px rgba(0,0,0,.25)}}
@media(max-width:720px){{.hero{{grid-template-columns:1fr;padding-block:28px}}.ph{{aspect-ratio:16/10;font-size:72px}}.nav .btn{{display:none}}}}
</style></head><body>
<div class="demo">Prévia criada pela <b>Yaveh Sites Premium</b> para {nome}</div>
<header><div class="w nav"><div class="logo s">{nome}<small>{tag}</small></div><a class="btn" href="#contato">{cta}</a></div></header>
<main>
<div class="w hero"><div><h1 class="s">{h1}</h1><p>{sub}</p><a class="btn" href="#contato">💬 {cta}</a></div><div class="ph">{emoji}</div></div>
<section><div class="w"><h2 class="s">{sec}</h2><div class="g">{cards}</div></div></section>
<section><div class="w"><h2 class="s">O que dizem nossos clientes</h2><div class="g">
<div class="c"><p>⭐⭐⭐⭐⭐<br>Espaço para depoimentos reais dos seus clientes (Google ou Instagram).</p></div>
<div class="c"><p>⭐⭐⭐⭐⭐<br>Avaliações aumentam a confiança de quem visita o site pela primeira vez.</p></div>
</div></div></section>
<section id="contato"><div class="w"><h2 class="s">Fale com a gente</h2><div class="g">
<div class="c"><h3>Onde estamos</h3><p>{cidade}</p><h3 style="margin-top:12px">Horário</h3><p>Horário de atendimento aqui</p></div>
<div class="map">📍 Mapa do Google aqui</div></div></div></section>
</main>
<footer><div class="w">{nome} · prévia de site feita pela Yaveh Sites Premium · (21) 96429-1001</div></footer>
<a class="wa" href="#contato">💬 WhatsApp</a>
</body></html>
"""

if __name__ == "__main__":
    for e in EMPRESAS:
        esc = {k: html.escape(v) if isinstance(v, str) else v for k, v in e.items()}
        esc["hero"] = e["hero"]
        esc["cards"] = "".join(f'<div class="c"><h3>{html.escape(t)}</h3><p>{html.escape(d)}</p></div>' for t, d in e["itens"])
        (D / f"{e['slug']}.html").write_text(TPL.format(**esc), encoding="utf-8")
    print(len(EMPRESAS), "prévias geradas")
