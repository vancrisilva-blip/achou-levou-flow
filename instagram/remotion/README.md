# Reels da Levin com Remotion

Modelo animado de Reel (15s, 1080x1920): 4 cenas com a Levin, o produto, os benefícios e o CTA "Comenta QUERO".

## Gerar um novo Reel
```bash
cd instagram/remotion
npm install
mkdir -p public
cp ../levin/ref-rosto-sorrindo.jpg public/levin1.jpg
cp ../levin/ref-frente-fundo-neutro.jpg public/levin2.jpg
cp <foto-do-produto>.jpg public/omo.jpg
for w in 600 700 800; do cp node_modules/@fontsource/poppins/files/poppins-latin-$w-normal.woff2 public/poppins-$w.woff2; done
npx remotion render src/index.ts OmoReel out/reel.mp4 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell --crf=20
```
Para outro produto, troque os textos em `src/OmoReel.tsx` (cenas 1 a 4) e a foto `public/omo.jpg`.

## Observações
- Use o **headless shell** do Chromium (o Chromium normal não abre no modo do Remotion)
- A fonte vem do pacote `@fontsource/poppins`, porque a internet do ambiente bloqueia o Google Fonts dentro do render
- O vídeo sai sem som: coloque um áudio em alta no app do Instagram
- O Remotion é gratuito para uso individual e para empresas pequenas

## Reel "Chegou entrega" (EntregaReel)
```bash
cp ../levin/ref-segurando-produto.mp4 public/levin-produto.mp4
cp ../levin/ref-voz-e-movimento.mp4 public/levin-voz.mp4
cp ../midia/omo/produto-omo-kit3.jpg public/omo.jpg
npx remotion render src/index.ts EntregaReel ../midia/reel-entrega/reel-entrega.mp4 \
  --browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell --crf=20
```
