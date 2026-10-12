---
name: remotion
description: Criar e editar Reels animados da Levin (Instagram @ach.oulevouofertas) com Remotion. Use quando a dona pedir /remotion, um Reel animado, vídeo de produto ou animação de carrossel.
---

# /remotion: Reels da Levin com Remotion

1. **Leia primeiro** `.claude/skills/remotion-best-practices/SKILL.md` (skill oficial do Remotion, versão 4.0.535). Ela indica qual referência carregar: criar vídeo, markup, render, legendas.
2. **Parta do modelo pronto** em `instagram/remotion/` (`src/OmoReel.tsx`, `README.md`). São 4 cenas: Levin + gancho, produto, benefícios, CTA "Comenta QUERO". Para outro produto, copie a composição e troque os textos e a foto.
3. **Regras deste ambiente (nuvem):**
   - Renderize com o headless shell: `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`
   - Fontes **locais** (`@fontsource/poppins` + `@remotion/fonts`). O Google Fonts falha dentro do render
   - Aqui não existe navegador para mostrar o Studio para a dona. **Renderize o MP4 e mande o arquivo para ela aprovar** (a skill oficial diz para só renderizar quando pedido; nesta operação, mandar o vídeo É a pré-visualização)
   - Fixe as versões (`remotion@4.0.529` e companhia, como em `instagram/remotion/package.json`)
4. **Regras da marca:** visual da Levin em `instagram/levin/README.md`; cores `#F26B1D` (laranja) e `#FFF6EC` (creme); `@ach.oulevouofertas` no rodapé; nunca inventar preço (use "preço de DD/MM, pode mudar"); a legenda sempre leva o aviso de link de afiliado e "Levin é personagem virtual"; ative o rótulo de IA ao postar.
5. **Nunca publique** sem a dona dizer "publica". Salve o vídeo em `instagram/midia/<produto>/` e a legenda em `legenda.txt`.
