import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {loadFont} from '@remotion/fonts';
const fontFamily = 'Poppins';
for (const w of ['600','700','800']) loadFont({family: fontFamily, url: staticFile(`poppins-${w}.woff2`), weight: w});

const ORANGE = '#F26B1D', DARK = '#3A2A20', CREAM = '#FFF6EC';
const pill: React.CSSProperties = {display: 'inline-block', background: ORANGE, color: '#fff', fontWeight: 800, fontSize: 80, lineHeight: 1.1, padding: '24px 42px', borderRadius: 34, boxShadow: '0 9px 0 #C4500C'};
const white: React.CSSProperties = {display: 'inline-block', background: '#fff', color: DARK, fontWeight: 800, fontSize: 60, padding: '18px 34px', borderRadius: 26, boxShadow: '0 6px 20px rgba(0,0,0,.15)'};

const useIn = (delay = 0, damping = 12) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: {damping, mass: 0.8}});
};
const Fade: React.FC<{children: React.ReactNode; dur: number}> = ({children, dur}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 8, dur - 8, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};
const Zoom: React.FC<{src: string; dur: number}> = ({src, dur}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, dur], [1.02, 1.14]);
  return <AbsoluteFill style={{overflow: 'hidden'}}><Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${s})`}} /></AbsoluteFill>;
};
const Tag: React.FC<{dark?: boolean}> = ({dark}) => (
  <div style={{position: 'absolute', bottom: 110, width: '100%', textAlign: 'center', fontWeight: 700, fontSize: 40, color: dark ? DARK : '#fff', textShadow: dark ? 'none' : '0 2px 8px rgba(0,0,0,.7)'}}>@ach.oulevouofertas</div>
);

const Cena1: React.FC = () => {
  const a = useIn(4), b = useIn(22);
  return (<Fade dur={110}>
    <Zoom src="levin1.jpg" dur={110} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg,rgba(0,0,0,.25),transparent 35%,transparent 70%,rgba(0,0,0,.45))'}} />
    <div style={{position: 'absolute', top: 150, width: '100%', textAlign: 'center'}}>
      <div style={{...pill, transform: `scale(${a}) rotate(${(1 - a) * -8}deg)`}}>3 Omo por menos<br />de R$50?! 😱</div><br />
      <div style={{...white, marginTop: 26, opacity: b, transform: `translateY(${(1 - b) * 60}px)`}}>A Levin achou! 🧡</div>
    </div>
    <Tag />
  </Fade>);
};
const Cena2: React.FC = () => {
  const t = useIn(0), c = useIn(10, 10), bd = useIn(38, 6);
  const f = useCurrentFrame();
  const wob = Math.sin(f / 6) * 3;
  return (<Fade dur={110}>
    <AbsoluteFill style={{background: `linear-gradient(180deg,${CREAM},#FFE1C7)`}} />
    <div style={{position: 'absolute', top: 150, width: '100%', textAlign: 'center', opacity: t, transform: `translateY(${(1 - t) * -40}px)`}}>
      <div style={pill}>Kit 3 Omo Líquido</div><br />
      <div style={{...white, marginTop: 22}}>Ciclo Rápido · 750 ml cada</div>
    </div>
    <div style={{position: 'absolute', left: 80, right: 80, top: 560, height: 820, background: '#fff', borderRadius: 50, boxShadow: '0 20px 50px rgba(0,0,0,.18)', transform: `scale(${0.6 + 0.4 * c})`, opacity: c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Img src={staticFile('omo.jpg')} style={{width: '96%', objectFit: 'contain'}} />
    </div>
    <div style={{position: 'absolute', right: 90, top: 1330, ...pill, fontSize: 66, borderRadius: 999, transform: `scale(${bd}) rotate(${-6 + wob}deg)`}}>3 frascos!</div>
    <Tag dark />
  </Fade>);
};
const Beneficio: React.FC<{icon: string; text: string; delay: number}> = ({icon, text, delay}) => {
  const p = useIn(delay, 14);
  return (<div style={{display: 'flex', alignItems: 'center', gap: 26, background: '#fff', borderRadius: 30, padding: '26px 34px', margin: '18px 0', boxShadow: '0 6px 18px rgba(0,0,0,.12)', opacity: p, transform: `translateX(${(1 - p) * -500}px)`}}>
    <span style={{fontSize: 70}}>{icon}</span><span style={{fontSize: 54, fontWeight: 700, color: DARK}}>{text}</span>
  </div>);
};
const Cena3: React.FC = () => {
  const f = useCurrentFrame();
  const float = Math.sin(f / 10) * 10;
  return (<Fade dur={120}>
    <AbsoluteFill style={{background: `linear-gradient(180deg,#FF8A3D,${ORANGE} 60%,#D9530C)`}} />
    <div style={{position: 'absolute', left: 140, right: 140, top: 170, height: 620, background: '#fff', borderRadius: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateY(${float}px)`, boxShadow: '0 20px 50px rgba(0,0,0,.2)'}}>
      <Img src={staticFile('omo.jpg')} style={{width: '96%', objectFit: 'contain'}} />
    </div>
    <div style={{position: 'absolute', left: 70, right: 70, top: 860}}>
      <Beneficio icon="⏱️" text="Limpa em até 15 min" delay={8} />
      <Beneficio icon="🧺" text="Rende 14 lavagens cada" delay={22} />
      <Beneficio icon="🌸" text="Perfuma e cuida das cores" delay={36} />
      <div style={{color: '#fff', fontSize: 32, fontWeight: 600, textAlign: 'center', marginTop: 16, opacity: interpolate(f, [50, 65], [0, 0.85], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>Informações da embalagem do produto</div>
    </div>
    <Tag />
  </Fade>);
};
const Cena4: React.FC = () => {
  const f = useCurrentFrame();
  const v = useIn(4, 7), c = useIn(30, 10), w = useIn(42);
  const bounce = 1 + Math.max(0, Math.sin((f - 45) / 5)) * 0.06 * (f > 45 ? 1 : 0);
  return (<Fade dur={120}>
    <Zoom src="levin2.jpg" dur={120} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg,rgba(0,0,0,.2),transparent 30%,transparent 60%,rgba(0,0,0,.5))'}} />
    <div style={{position: 'absolute', top: 150, width: '100%', textAlign: 'center'}}>
      <div style={{...pill, transform: `scale(${v})`}}>Vale ou não vale?<br />VALE! ✨</div>
    </div>
    <div style={{position: 'absolute', bottom: 250, width: '100%', textAlign: 'center'}}>
      <div style={{...pill, fontSize: 84, transform: `scale(${c * bounce})`}}>Comenta QUERO 👇</div><br />
      <div style={{...white, marginTop: 24, opacity: w, transform: `translateY(${(1 - w) * 40}px)`}}>que a Levin te manda o link</div>
    </div>
    <Tag />
  </Fade>);
};

export const OmoReel: React.FC = () => (
  <AbsoluteFill style={{fontFamily, background: CREAM}}>
    <Sequence from={0} durationInFrames={110}><Cena1 /></Sequence>
    <Sequence from={105} durationInFrames={110}><Cena2 /></Sequence>
    <Sequence from={210} durationInFrames={120}><Cena3 /></Sequence>
    <Sequence from={330} durationInFrames={120}><Cena4 /></Sequence>
  </AbsoluteFill>
);
