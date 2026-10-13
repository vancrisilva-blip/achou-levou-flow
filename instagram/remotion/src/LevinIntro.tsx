import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {DARK, Fade, KenBurns, ORANGE, Tag, pill, useIn, white} from './EntregaReel';

// Reel "Oi, eu sou a Levin" (12s, 1080x1920, 30fps): apresentação que acompanha o carrossel "Quem é a Levin".
// Assets em public/: levin2.jpg, levin-frente.jpg, levin-sorrindo.jpg, levin-varal.jpg
const fontFamily = 'Poppins';
const shade = 'linear-gradient(180deg,rgba(0,0,0,.25),transparent 22%,transparent 55%,rgba(0,0,0,.6))';

const Cena: React.FC<{dur: number; src: string; pos?: string; from?: number; to?: number; panY?: number; top?: number; children: React.ReactNode; outF?: number}> = ({dur, src, pos = '50% 22%', from = 1.04, to = 1.14, panY = -20, top = 1250, children, outF = 8}) => (
  <Fade dur={dur} outF={outF}>
    <KenBurns src={src} dur={dur} from={from} to={to} panY={panY} style={{objectPosition: pos}} />
    <AbsoluteFill style={{background: shade}} />
    <div style={{position: 'absolute', top, left: 50, right: 50, textAlign: 'center'}}>{children}</div>
    <Tag />
  </Fade>
);

const Linha1: React.FC = () => {
  const a = useIn(6, 11), b = useIn(20, 12);
  return (<>
    <div style={{...pill, fontSize: 80, transform: `scale(${a}) rotate(${(1 - a) * -6}deg)`}}>Oi! Eu sou a Levin 🧡</div><br />
    <div style={{...white, fontSize: 50, marginTop: 28, opacity: b, transform: `translateY(${(1 - b) * 40}px)`}}>sua garimpeira de achadinhos</div>
  </>);
};

const Linha2: React.FC = () => {
  const a = useIn(4, 12), b = useIn(16, 12), c = useIn(26, 12);
  return (<>
    <div style={{...white, fontSize: 60, opacity: a, transform: `translateY(${(1 - a) * 40}px)`}}>Eu procuro na</div><br />
    <div style={{display: 'flex', justifyContent: 'center', gap: 22, marginTop: 22}}>
      <div style={{...pill, fontSize: 70, transform: `scale(${b})`}}>Shopee</div>
      <div style={{...pill, fontSize: 70, background: '#FFE600', color: DARK, boxShadow: '0 9px 0 #C9B400', transform: `scale(${c})`}}>Mercado Livre</div>
    </div>
  </>);
};

const Check: React.FC<{d: number; t: string}> = ({d, t}) => {
  const a = useIn(d, 12);
  return <div style={{...white, fontSize: 56, margin: '10px 0', opacity: a, transform: `translateX(${(1 - a) * -80}px)`}}>✅ {t}</div>;
};
const Linha3: React.FC = () => (<>
  <Check d={4} t="confiro avaliação" />
  <Check d={14} t="comparo o preço" />
  <Check d={24} t="só indico o que vale" />
</>);

const Linha4: React.FC = () => {
  const f = useCurrentFrame();
  const a = useIn(4, 11), b = useIn(18, 12), c = useIn(30, 12);
  const pulse = f > 40 ? 1 + Math.max(0, Math.sin((f - 40) / 5)) * 0.05 : 1;
  return (<>
    <div style={{...pill, fontSize: 84, transform: `scale(${a * pulse})`}}>Me segue! 🔔</div><br />
    <div style={{...white, marginTop: 26, opacity: b, transform: `translateY(${(1 - b) * 40}px)`}}>achadinho bom todo dia</div><br />
    <div style={{marginTop: 30, fontWeight: 600, fontSize: 34, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,.7)', opacity: c}}>Sou uma personagem virtual (IA) 🤖</div>
  </>);
};

export const LevinIntro: React.FC = () => (
  <AbsoluteFill style={{fontFamily, background: ORANGE}}>
    <Sequence from={0} durationInFrames={96}><Cena dur={96} src="levin2.jpg" from={1.15} to={1.04} panY={10} top={1180}><Linha1 /></Cena></Sequence>
    <Sequence from={90} durationInFrames={90}><Cena dur={90} src="levin-frente.jpg" pos="50% 15%"><Linha2 /></Cena></Sequence>
    <Sequence from={174} durationInFrames={96}><Cena dur={96} src="levin-varal.jpg" pos="36% 10%" from={1.0} to={1.08} panY={0} top={1150}><Linha3 /></Cena></Sequence>
    <Sequence from={264} durationInFrames={96}><Cena dur={96} src="levin-sorrindo.jpg" outF={0} top={1180}><Linha4 /></Cena></Sequence>
  </AbsoluteFill>
);
