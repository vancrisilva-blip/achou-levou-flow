import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Box, Cena1, CreamBg, DARK, Fade, KenBurns, ORANGE, Tag, clamp, pill, useIn, white} from './EntregaReel';

// Reel "Lote 2" (15s, 1080x1920, 30fps): caixa → Levin → espremedor → limpa tênis → CTA "Comenta 1 ou 2"
// Assets em public/: levin2.jpg (ref-rosto-sorrindo-2), espremedor-uso.jpg, limpa-diferenca.jpg, poppins-*.woff2
// Preços informados pela dona em 13/10/2026 (não alterar sem nova confirmação).
const fontFamily = 'Poppins';

// ---------- Levin (ref-rosto-sorrindo-2) ----------
const CenaLevin: React.FC = () => {
  const c = useIn(8, 12);
  return (<Fade dur={90}>
    <KenBurns src="levin2.jpg" dur={90} from={1.03} to={1.13} panY={-24} style={{objectPosition: '50% 20%'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg,rgba(0,0,0,.2),transparent 22%,transparent 58%,rgba(0,0,0,.55))'}} />
    <div style={{position: 'absolute', top: 1330, width: '100%', textAlign: 'center'}}>
      <div style={{...pill, fontSize: 76, transform: `scale(${c})`}}>Olha o que chegou 👀</div>
    </div>
    <Tag />
  </Fade>);
};

// ---------- Produto saindo da caixa ----------
const BOX_TOP = 1180, CARD_TOP = 450, CARD = 800;
export const ProdScene: React.FC<{dur: number; img: string; pos?: string; phrase: React.ReactNode; name: string; price: string}> = ({dur, img, pos = 'center', phrase, name, price}) => {
  const f = useCurrentFrame();
  const h = useIn(2, 12);
  const k = useIn(10, 13, 0.9);
  const p = useIn(36, 9);
  const boxOut = interpolate(f, [18, 32], [1, 0], clamp);
  const ty = interpolate(k, [0, 1], [BOX_TOP - CARD_TOP - 200, 0]);
  const wiggle = f > 4 && f < 16 ? Math.sin((f - 4) * 1.6) * 4 : 0;
  return (<Fade dur={dur}>
    <CreamBg />
    <div style={{position: 'absolute', top: 210, left: 60, right: 60, textAlign: 'center', opacity: h, transform: `translateY(${(1 - h) * -40}px)`}}>
      <div style={{...pill, fontSize: 64}}>{phrase}</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: BOX_TOP, display: 'flex', justifyContent: 'center', opacity: boxOut, transform: `translateY(${(1 - boxOut) * 120}px)`}}>
      <div style={{transform: `rotate(${wiggle}deg)`}}><Box w={420} open={1} /></div>
    </div>
    <div style={{position: 'absolute', left: (1080 - CARD) / 2, top: CARD_TOP, width: CARD, height: CARD, borderRadius: 48, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 20px 50px rgba(120,60,20,.28)', background: '#fff', opacity: interpolate(k, [0, 0.12], [0, 1], clamp), transform: `translateY(${ty}px) scale(${0.2 + 0.8 * k}) rotate(${(1 - k) * -12}deg)`}}>
      <Img src={staticFile(img)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${interpolate(f, [0, dur], [1.0, 1.08])})`}} />
    </div>
    <div style={{position: 'absolute', top: 1290, width: '100%', textAlign: 'center'}}>
      <div style={{display: 'inline-block', background: '#fff', borderRadius: 34, padding: '16px 46px 22px', boxShadow: `0 10px 0 ${ORANGE}`, transform: `scale(${p}) rotate(${(1 - p) * 8}deg)`}}>
        <div style={{fontWeight: 700, fontSize: 38, color: DARK}}>{name}</div>
        <div style={{fontWeight: 800, fontSize: 112, lineHeight: 1, color: ORANGE}}>{price}</div>
      </div>
    </div>
    <Tag dark />
  </Fade>);
};

// ---------- CTA ----------
const CenaCTA: React.FC = () => {
  const f = useCurrentFrame();
  const v = useIn(2, 12), c = useIn(12, 8), w = useIn(22, 12);
  const pulse = f > 36 ? 1 + Math.max(0, Math.sin((f - 36) / 5)) * 0.05 : 1;
  return (<Fade dur={87} outF={0}>
    <KenBurns src="levin2.jpg" dur={87} from={1.2} to={1.3} style={{filter: 'blur(30px) brightness(.75)'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg,rgba(242,107,29,.3),rgba(242,107,29,.6))'}} />
    <div style={{position: 'absolute', left: 190, width: 700, top: 220, height: 760, borderRadius: 48, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 20px 50px rgba(0,0,0,.35)', transform: `scale(${0.85 + 0.15 * v})`, opacity: v}}>
      <KenBurns src="levin2.jpg" dur={87} from={1.02} to={1.1} style={{objectPosition: '50% 18%'}} />
    </div>
    <div style={{position: 'absolute', top: 1030, left: 50, right: 50, textAlign: 'center'}}>
      <div style={{...pill, fontSize: 80, transform: `scale(${c * pulse})`}}>Comenta 1 ou 2</div><br />
      <div style={{...white, fontSize: 54, marginTop: 26, opacity: w, transform: `translateY(${(1 - w) * 40}px)`}}>que eu te mando o link 🧡</div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 24, marginTop: 30, opacity: w}}>
        <div style={{...white, fontSize: 40, padding: '12px 26px'}}>1 🧄 alho</div>
        <div style={{...white, fontSize: 40, padding: '12px 26px'}}>2 👟 tênis</div>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1500, width: '100%', textAlign: 'center', fontWeight: 600, fontSize: 32, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,.5)', opacity: w}}>Preços vistos em 13/10. Podem mudar.</div>
    <div style={{position: 'absolute', top: 1570, width: '100%', textAlign: 'center', fontWeight: 800, fontSize: 48, color: '#fff', textShadow: '0 3px 10px rgba(0,0,0,.5)', opacity: w}}>@ach.oulevouofertas</div>
  </Fade>);
};

export const Lote2Reel: React.FC = () => (
  <AbsoluteFill style={{fontFamily, background: '#FFF6EC'}}>
    <Sequence from={0} durationInFrames={81}><Cena1 /></Sequence>
    <Sequence from={75} durationInFrames={90}><CenaLevin /></Sequence>
    <Sequence from={159} durationInFrames={111}>
      <ProdScene dur={111} img="espremedor-uso.jpg" pos="50% 60%" phrase={<>Amassa alho sem<br />sujar a mão 🧄</>} name="Espremedor de alho" price="R$ 11,49" />
    </Sequence>
    <Sequence from={264} durationInFrames={105}>
      <ProdScene dur={105} img="limpa-diferenca.jpg" phrase={<>Tênis branco<br />de novo 👟</>} name="Limpa Tênis 500ml" price="R$ 14,99" />
    </Sequence>
    <Sequence from={363} durationInFrames={87}><CenaCTA /></Sequence>
  </AbsoluteFill>
);
