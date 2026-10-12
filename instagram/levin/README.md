# Kit da Levin: aparência, movimento e voz

Material oficial enviado pela dona em 12/10/2026. **Todo conteúdo com a Levin parte destes arquivos.**

| Arquivo | Para que serve |
|---|---|
| `ref-frente-fundo-neutro.jpg` | **Referência principal do rosto.** Use como imagem de referência em toda geração de imagem ou vídeo |
| `ref-rosto-sorrindo.jpg` | Expressão padrão (sorriso aberto, luz quente, plantas) |
| `ref-com-produto-varal.jpg` | Modelo de post com produto (Levin segurando o item em uma sala aconchegante) |
| `ref-voz-e-movimento.mp4` / `ref-voz.mp3` | **Voz e jeito de falar** (6s). Base para clonar a voz |
| `ref-segurando-produto.mp4` | Movimento ao apresentar produto (3s, sem som) |
| `movimentos-quadro-a-quadro.jpg` | Expressões e gestos tirados do vídeo de voz |

## Aparência (nunca mudar)
- Mulher jovem brasileira, pele morena dourada, olhos castanhos, sobrancelhas marcadas
- Cabelo **preto, longo, ondulado**, repartido no meio, volumoso
- Roupa-assinatura: **cardigã ou suéter de tricô bege/creme** com blusa clara por baixo
- Cenários: sala ou cozinha aconchegante, luz quente de fim de tarde, plantas, quadros, abajur
- Estilo **foto realista**. Nada de desenho, 3D ou cartoon

**Prompt-base de imagem e vídeo** (sempre anexe `ref-frente-fundo-neutro.jpg` como referência):
> Young Brazilian woman, golden tan skin, brown eyes, long wavy black hair parted in the middle, beige knit cardigan over a cream top, warm cozy living room with plants, framed pictures and a lamp, soft golden-hour light, photorealistic, vertical 9:16, same person as the reference image

## Movimento e expressões (do vídeo de referência)
1. **Abertura:** olha direto para a câmera, sobrancelhas levantadas, boca em "Oh!" de surpresa (ótimo para os 2 primeiros segundos)
2. **Fala:** inclina levemente a cabeça para os lados e chega um pouco mais perto da câmera
3. **Empolgação:** olhos arregalados e sorriso enorme na hora do preço ou do veredito
4. **Aceno:** levanta a mão aberta e acena (saudação "Oi, eu sou a Levin!")
5. **Riso:** fecha os olhos sorrindo (reação a um achado bom)
6. **Com produto:** segura o item na altura do rosto, com a outra mão espalmada embaixo, inclinando a cabeça e sorrindo

**Prompt de movimento para vídeo:**
> She looks into the camera with raised eyebrows in surprise, then smiles widely, tilts her head while talking enthusiastically, leans slightly toward the camera, waves her open hand, laughs with eyes closed; natural handheld UGC style

## Voz
- Medição feita na referência: tom **médio** (frequência média de cerca de 180 Hz), **muito expressivo**, com subidas grandes de entonação na empolgação
- Jeito: amiga animada, fala rápida e calorosa, tom de conversa em português do Brasil, risinho no final das frases boas
- Na hora de gerar um vídeo com fala, descreva assim: *"warm, cheerful young Brazilian woman speaking Brazilian Portuguese, medium pitch, very expressive, fast friendly pace, like talking to a close friend"*

### Para usar a MESMA voz em todos os vídeos (clonagem)
Hoje a voz só existe nesta referência de 6s. Para repetir igual, a voz precisa ser clonada, e quem precisa fazer isso é a dona, porque o serviço pede login e a confirmação de que a voz pertence a ela:
1. **ElevenLabs** (é o que o vidIQ usa por trás): Voices > Add voice > Instant Voice Clone > enviar `ref-voz.mp3`. Melhor ainda com **1 a 2 minutos** de fala da Levin; 6s funciona, mas fica menos fiel. Dê o nome **Levin**.
2. Quando a voz clonada aparecer na conta conectada ao vidIQ, a equipe gera a narração de cada Reel com ela (`vidiq_voiceover_generate`) e junta com o vídeo.
3. **Alternativa no celular:** o CapCut tem recurso de clonar voz. Grave ou importe o áudio de referência e use o texto do roteiro.

Até a voz ser clonada, a equipe gera os vídeos com fala por um modelo que já cria o áudio junto, usando a descrição de voz acima. A voz fica parecida, mas não idêntica.

## Regras
- A Levin é gerada por IA: rótulo "Informações de IA" ativado e "Levin é personagem virtual" na legenda
- Não usar a voz ou o rosto de uma pessoa real sem autorização
- Os vídeos de referência têm marca d'água do Shopee Video (@crispv22). Não reposte esses arquivos no Instagram; use só como referência
