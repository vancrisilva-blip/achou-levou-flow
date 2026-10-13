import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/fonts';

// Reel "Chegou entrega da Levin!" (15s, 1080x1920, 30fps)
// Assets em public/: levin-sorrindo.jpg, levin-varal.jpg (recortada sem textos), omo.jpg, percarbonato.jpg, poppins-600/700/800.woff2
const fontFamily = 'Poppins';
for (const w of ['600', '700', '800']) loadFont({family: fontFamily, url: staticFile(`poppins-${w}.woff2`), weight: w});

const ORANGE = '#F26B1D', DARK = '#3A2A20', CREAM = '#FFF6EC';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const pill: React.CSSProperties = {display: 'inline-block', background: ORANGE, color: '#fff', fontWeight: 800, fontSize: 84, lineHeight: 1.1, padding: '24px 44px', borderRadius: 34, boxShadow: '0 9px 0 #C4500C'};
const white: React.CSSProperties = {display: 'inline-block', background: '#fff', color: DARK, fontWeight: 800, fontSize: 58, lineHeight: 1.15, padding: '18px 34px', borderRadius: 26, boxShadow: '0 6px 20px rgba(0,0,0,.15)'};

const useIn = (delay = 0, damping = 12, mass = 0.8) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: {damping, mass}});
};
const Fade: React.FC<{children: React.ReactNode; dur: number; inF?: number; outF?: number}> = ({children, dur, inF = 8, outF = 8}) => {
  const f = useCurrentFrame();
  const a = inF ? interpolate(f, [0, inF], [0, 1], clamp) : 1;
  const b = outF ? interpolate(f, [dur - outF, dur], [1, 0], clamp) : 1;
  const o = Math.min(a, b);
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};
const Tag: React.FC<{dark?: boolean}> = ({dark}) => (
  <div style={{position: 'absolute', top: 1610, width: '100%', textAlign: 'center', fontWeight: 700, fontSize: 40, color: dark ? DARK : '#fff', textShadow: dark ? 'none' : '0 2px 8px rgba(0,0,0,.7)'}}>@ach.oulevouofertas</div>
);
const CreamBg: React.FC = () => <AbsoluteFill style={{background: `radial-gradient(circle at 50% 40%, #FFFFFF 0%, ${CREAM} 45%, #FFD9B8 100%)`}} />;

// ---------- Caixa de papelão (CSS) ----------
const Box: React.FC<{w: number; open: number}> = ({w, open}) => {
  const h = w * 0.68, flapH = w * 0.2;
  const brown = 'linear-gradient(180deg,#D49A5C,#B97A3E)';
  const flap: React.CSSProperties = {position: 'absolute', top: -flapH, width: w / 2, height: flapH, background: 'linear-gradient(180deg,#E0AA6E,#C88A4C)', border: '4px solid #8E5A28', boxSizing: 'border-box'};
  return (
    <div style={{position: 'relative', width: w, height: h}}>
      {/* interior escuro quando abre */}
      <div style={{position: 'absolute', left: 8, right: 8, top: -flapH * 0.35, height: flapH * 0.6, background: '#5A3415', borderRadius: '50% 50% 0 0 / 100% 100% 0 0', opacity: open}} />
      <div style={{...flap, left: 0, borderRadius: '10px 0 0 0', transformOrigin: '0% 100%', transform: `rotate(${-125 * open}deg)`}} />
      <div style={{...flap, right: 0, borderRadius: '0 10px 0 0', transformOrigin: '100% 100%', transform: `rotate(${125 * open}deg)`}} />
      {/* fita na tampa fechada */}
      <div style={{position: 'absolute', top: -flapH, left: w / 2 - w * 0.06, width: w * 0.12, height: flapH, background: '#F2D08A', opacity: 1 - open, boxShadow: 'inset 0 0 0 3px rgba(150,100,40,.35)'}} />
      {/* corpo */}
      <div style={{position: 'absolute', inset: 0, background: brown, border: '5px solid #8E5A28', borderRadius: '0 0 16px 16px', boxShadow: '0 30px 40px -18px rgba(90,50,20,.45)', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: 0, bottom: 0, left: w / 2 - w * 0.06, width: w * 0.12, background: '#F2D08A', boxShadow: 'inset 0 0 0 3px rgba(150,100,40,.35)', height: h * 0.42}} />
        <div style={{position: 'absolute', bottom: h * 0.14, width: '100%', textAlign: 'center', fontWeight: 800, fontSize: w * 0.1, color: '#7A4A1E', letterSpacing: 2}}>LEVIN 🧡</div>
        <div style={{position: 'absolute', left: w * 0.07, top: h * 0.55, fontSize: w * 0.07, color: '#7A4A1E', opacity: 0.7}}>↑↑</div>
      </div>
    </div>
  );
};

// ---------- Cena 1: caixa cai e abre (0–2,5s) ----------
const Cena1: React.FC = () => {
  const f = useCurrentFrame();
  const drop = useIn(2, 7, 0.9);
  const y = interpolate(drop, [0, 1], [-1400, 0]);
  const squash = 1 + Math.max(0, Math.sin((f - 14) / 3)) * 0.06 * (f > 14 && f < 24 ? 1 : 0);
  const open = useIn(34, 11);
  const t = useIn(10, 10);
  const s = useIn(22, 12);
  const stars = [[-330, -260, '✨'], [300, -300, '⭐'], [-200, -430, '💛'], [240, -470, '✨']] as const;
  return (<Fade dur={81} inF={0}>
    <CreamBg />
    <div style={{position: 'absolute', top: 230, width: '100%', textAlign: 'center'}}>
      <div style={{...pill, fontSize: 100, transform: `scale(${t}) rotate(${(1 - t) * -10}deg)`}}>CHEGOU<br />ENTREGA! 📦</div><br />
      <div style={{...white, marginTop: 30, opacity: s, transform: `translateY(${(1 - s) * 50}px)`}}>Achadinhos novos da Levin</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 1060, display: 'flex', justifyContent: 'center'}}>
      <div style={{transform: `translateY(${y}px) scale(${1 + (squash - 1) * 0.6}, ${2 - squash})`, transformOrigin: '50% 100%'}}>
        <Box w={560} open={open} />
      </div>
      {stars.map(([x, sy, e], i) => {
        const p = interpolate(f, [40 + i * 3, 56 + i * 3], [0, 1], clamp);
        return <div key={i} style={{position: 'absolute', left: 540 + x * p - 40, top: 40 + sy * p, fontSize: 80, opacity: p * (1 - interpolate(f, [68, 80], [0, 1], clamp)), transform: `scale(${0.4 + p * 0.8})`}}>{e}</div>;
      })}
    </div>
    <Tag dark />
  </Fade>);
};

// ---------- Cena 2: Levin apresentando (2,5–5,5s) ----------
// Foto com movimento lento (zoom + pan + leve balanço)
const KenBurns: React.FC<{src: string; dur: number; from: number; to: number; panY?: number; style?: React.CSSProperties}> = ({src, dur, from, to, panY = 0, style}) => {
  const f = useCurrentFrame();
  const sc = interpolate(f, [0, dur], [from, to]);
  const y = interpolate(f, [0, dur], [0, panY]);
  const rot = Math.sin(f / 22) * 0.8;
  return <AbsoluteFill style={{overflow: 'hidden'}}><Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `translateY(${y}px) scale(${sc}) rotate(${rot}deg)`, ...style}} /></AbsoluteFill>;
};
const Cena2: React.FC = () => {
  const c = useIn(8, 12);
  return (<Fade dur={90}>
    <KenBurns src="levin-sorrindo.jpg" dur={90} from={1.04} to={1.16} panY={-30} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg,rgba(0,0,0,.25),transparent 25%,transparent 60%,rgba(0,0,0,.5))'}} />
    <div style={{position: 'absolute', top: 1300, width: '100%', textAlign: 'center'}}>
      <div style={{...pill, fontSize: 70, transform: `scale(${c})`}}>Olha o que chegou<br />pra você 👀</div>
    </div>
    <Tag />
  </Fade>);
};

// ---------- Cena 3: produtos saem da caixa (5,5–11s) ----------
type Prod = {name: string; price: string; img?: string; fit?: 'cover' | 'contain'; icon?: string};
const PRODS: Prod[] = [
  {name: 'Kit 3 Omo', price: 'R$ 48,20', img: 'omo.jpg'},
  {name: 'Percarbonato', price: 'R$ 39,90', img: 'percarbonato.jpg', fit: 'contain'},
  {name: 'Adesivos para os pés', price: 'R$ 12,99', icon: '🦶'},
];
const CARD_TOP = 400, CARD_H = 210, CARD_GAP = 36, BOX_TOP = 1230;
const Card: React.FC<{p: Prod; i: number; delay: number}> = ({p, i, delay}) => {
  const k = useIn(delay, 14, 0.9);
  const top = CARD_TOP + i * (CARD_H + CARD_GAP);
  const fromY = BOX_TOP + 40 - top;
  const ty = interpolate(k, [0, 1], [fromY, 0]);
  const arc = -Math.sin(Math.min(1, k) * Math.PI) * 60;
  return (
    <div style={{position: 'absolute', left: 90, width: 900, top, height: CARD_H, background: '#fff', borderRadius: 44, boxShadow: '0 16px 36px rgba(120,60,20,.22)', display: 'flex', alignItems: 'center', gap: 30, padding: '0 34px', boxSizing: 'border-box', opacity: interpolate(k, [0, 0.15], [0, 1], clamp), transform: `translateY(${ty + arc * (1 - k)}px) scale(${0.25 + 0.75 * k}) rotate(${(1 - k) * (i % 2 ? 14 : -14)}deg)`}}>
      <div style={{width: 160, height: 160, borderRadius: 30, background: '#FFF1E4', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        {p.img ? <Img src={staticFile(p.img)} style={{width: '100%', height: '100%', objectFit: p.fit ?? 'cover'}} /> : <span style={{fontSize: 96}}>{p.icon}</span>}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{fontWeight: 800, fontSize: p.name.length > 14 ? 46 : 56, color: DARK, lineHeight: 1.1}}>{p.name}</div>
        <div style={{fontWeight: 800, fontSize: 64, color: ORANGE, lineHeight: 1.15}}>{p.price}</div>
      </div>
    </div>
  );
};
const Cena3: React.FC = () => {
  const f = useCurrentFrame();
  const h = useIn(4, 12);
  const wiggle = (d: number) => (f > d - 6 && f < d + 6 ? Math.sin((f - d) * 1.6) * 4 : 0);
  return (<Fade dur={171}>
    <CreamBg />
    <div style={{position: 'absolute', zIndex: 5, top: 210, width: '100%', textAlign: 'center', opacity: h, transform: `translateY(${(1 - h) * -40}px)`}}>
      <div style={{...pill, fontSize: 66}}>Saiu da caixa! 🎉</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: BOX_TOP, display: 'flex', justifyContent: 'center'}}>
      <div style={{transform: `rotate(${wiggle(14) + wiggle(58) + wiggle(102)}deg)`}}><Box w={400} open={1} /></div>
    </div>
    {/* cada cartão sai da caixa, um por vez */}
    {PRODS.map((p, i) => <Card key={p.name} p={p} i={i} delay={14 + i * 44} />)}
    <div style={{position: 'absolute', top: 1555, width: '100%', textAlign: 'center', fontWeight: 600, fontSize: 32, color: DARK, opacity: interpolate(f, [20, 32], [0, 0.9], clamp)}}>
      Preços vistos em 12/10. Confira no link, podem mudar.
    </div>
    <Tag dark />
  </Fade>);
};

// ---------- Cena 4: Levin + CTA (11–15s) ----------
const Cena4: React.FC = () => {
  const f = useCurrentFrame();
  const v = useIn(2, 12), c = useIn(14, 8), w = useIn(26, 12);
  const pulse = f > 40 ? 1 + Math.max(0, Math.sin((f - 40) / 5)) * 0.05 : 1;
  return (<Fade dur={125} outF={0}>
    <KenBurns src="levin-varal.jpg" dur={125} from={1.2} to={1.3} style={{filter: 'blur(30px) brightness(.75)'}} />
    <AbsoluteFill style={{background: `linear-gradient(180deg,rgba(242,107,29,.25),rgba(242,107,29,.55))`}} />
    <div style={{position: 'absolute', left: 60, width: 960, top: 210, height: 860, borderRadius: 48, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 20px 50px rgba(0,0,0,.35)', transform: `scale(${0.85 + 0.15 * v})`, opacity: v}}>
      <KenBurns src="levin-varal.jpg" dur={125} from={1.05} to={1.17} panY={20} style={{objectPosition: '45% 30%'}} />
    </div>
    <div style={{position: 'absolute', top: 1140, width: '100%', textAlign: 'center'}}>
      <div style={{...pill, fontSize: 86, transform: `scale(${c * pulse})`}}>Comenta QUERO</div><br />
      <div style={{...white, fontSize: 52, marginTop: 26, opacity: w, transform: `translateY(${(1 - w) * 40}px)`}}>que eu te mando o link 🧡</div>
    </div>
    <div style={{position: 'absolute', top: 1560, width: '100%', textAlign: 'center', fontWeight: 800, fontSize: 52, color: '#fff', textShadow: '0 3px 10px rgba(0,0,0,.5)', opacity: w}}>@ach.oulevouofertas</div>
  </Fade>);
};

export const EntregaReel: React.FC = () => (
  <AbsoluteFill style={{fontFamily, background: CREAM}}>
    <Sequence from={0} durationInFrames={81}><Cena1 /></Sequence>
    <Sequence from={75} durationInFrames={90}><Cena2 /></Sequence>
    <Sequence from={159} durationInFrames={171}><Cena3 /></Sequence>
    <Sequence from={325} durationInFrames={125}><Cena4 /></Sequence>
  </AbsoluteFill>
);
