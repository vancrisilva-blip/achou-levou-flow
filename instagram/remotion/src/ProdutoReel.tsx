import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CreamBg, DARK, Fade, KenBurns, ORANGE, Tag, pill, useIn, white} from './EntregaReel';
import {ProdScene} from './Lote2Reel';

// Reel de 1 produto (15s, 1080x1920, 30fps): Levin + pergunta → produto + preço → como funciona → CTA "Comenta PALAVRA"
// Preço: só o informado pela dona, com a data (não alterar sem nova confirmação).
const fontFamily = 'Poppins';

export type ProdutoProps = {
  gancho: string[]; // pergunta da Levin (linhas)
  frase: string[]; // frase sobre o produto
  nome: string;
  preco: string;
  foto: string;
  fotoPos?: string;
  fotoDetalhe: string; // passo a passo / antes e depois
  detalheTitulo: string;
  pontos: string[]; // 3 benefícios curtos
  palavra: string; // palavra do CTA
  dataPreco: string; // ex.: 13/10
};

const br = (l: string[]) => l.map((t, i) => <React.Fragment key={i}>{i > 0 && <br />}{t}</React.Fragment>);

const CenaGancho: React.FC<{p: ProdutoProps}> = ({p}) => {
  const a = useIn(6, 11), b = useIn(26, 12);
  return (<Fade dur={96}>
    <KenBurns src="levin2.jpg" dur={96} from={1.14} to={1.04} panY={10} style={{objectPosition: '50% 20%'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg,rgba(0,0,0,.2),transparent 22%,transparent 55%,rgba(0,0,0,.6))'}} />
    <div style={{position: 'absolute', top: 1200, left: 50, right: 50, textAlign: 'center'}}>
      <div style={{...pill, fontSize: 72, transform: `scale(${a}) rotate(${(1 - a) * -6}deg)`}}>{br(p.gancho)}</div><br />
      <div style={{...white, marginTop: 26, opacity: b, transform: `translateY(${(1 - b) * 40}px)`}}>Achei a solução 👇</div>
    </div>
    <Tag />
  </Fade>);
};

const CenaDetalhe: React.FC<{p: ProdutoProps; dur: number}> = ({p, dur}) => {
  const f = useCurrentFrame();
  const t = useIn(2, 12), c = useIn(8, 13);
  return (<Fade dur={dur}>
    <CreamBg />
    <div style={{position: 'absolute', top: 170, width: '100%', textAlign: 'center', opacity: t, transform: `translateY(${(1 - t) * -40}px)`}}>
      <div style={{...pill, fontSize: 64}}>{p.detalheTitulo}</div>
    </div>
    <div style={{position: 'absolute', left: 115, top: 360, width: 850, height: 850, borderRadius: 44, overflow: 'hidden', border: '10px solid #fff', boxShadow: '0 20px 50px rgba(120,60,20,.28)', background: '#fff', opacity: c, transform: `scale(${0.85 + 0.15 * c})`}}>
      <Img src={staticFile(p.fotoDetalhe)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(f, [0, dur], [1, 1.08])})`}} />
    </div>
    <div style={{position: 'absolute', top: 1260, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
      {p.pontos.map((pt, i) => {
        const a = useIn(24 + i * 10, 12);
        return <div key={i} style={{...white, fontSize: 46, padding: '12px 30px', opacity: a, transform: `translateX(${(1 - a) * (i % 2 ? 80 : -80)}px)`}}>✅ {pt}</div>;
      })}
    </div>
    <Tag dark />
  </Fade>);
};

const CenaCTA: React.FC<{p: ProdutoProps; dur: number}> = ({p, dur}) => {
  const f = useCurrentFrame();
  const v = useIn(2, 12), c = useIn(12, 8), w = useIn(22, 12);
  const pulse = f > 36 ? 1 + Math.max(0, Math.sin((f - 36) / 5)) * 0.05 : 1;
  return (<Fade dur={dur} outF={0}>
    <KenBurns src="levin2.jpg" dur={dur} from={1.2} to={1.3} style={{filter: 'blur(30px) brightness(.75)'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg,rgba(242,107,29,.3),rgba(242,107,29,.6))'}} />
    <div style={{position: 'absolute', left: 190, width: 700, top: 200, height: 760, borderRadius: 48, overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 20px 50px rgba(0,0,0,.35)', transform: `scale(${0.85 + 0.15 * v})`, opacity: v}}>
      <KenBurns src="levin2.jpg" dur={dur} from={1.02} to={1.1} style={{objectPosition: '50% 18%'}} />
    </div>
    <div style={{position: 'absolute', top: 1010, left: 40, right: 40, textAlign: 'center'}}>
      <div style={{...white, fontSize: 50, opacity: c}}>Quer o link? Comenta</div><br />
      <div style={{...pill, fontSize: 110, marginTop: 22, transform: `scale(${c * pulse})`}}>{p.palavra}</div><br />
      <div style={{...white, fontSize: 46, marginTop: 26, opacity: w, transform: `translateY(${(1 - w) * 40}px)`}}>{p.nome} · {p.preco}</div>
    </div>
    <div style={{position: 'absolute', top: 1520, width: '100%', textAlign: 'center', fontWeight: 600, fontSize: 32, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,.5)', opacity: w}}>Preço visto em {p.dataPreco}. Pode mudar.</div>
    <div style={{position: 'absolute', top: 1590, width: '100%', textAlign: 'center', fontWeight: 800, fontSize: 48, color: '#fff', textShadow: '0 3px 10px rgba(0,0,0,.5)', opacity: w}}>@ach.oulevouofertas</div>
  </Fade>);
};

export const ProdutoReel: React.FC<ProdutoProps> = (p) => (
  <AbsoluteFill style={{fontFamily, background: '#FFF6EC', color: DARK}}>
    <Sequence from={0} durationInFrames={96}><CenaGancho p={p} /></Sequence>
    <Sequence from={90} durationInFrames={111}>
      <ProdScene dur={111} img={p.foto} pos={p.fotoPos} phrase={br(p.frase)} name={p.nome} price={p.preco} />
    </Sequence>
    <Sequence from={195} durationInFrames={150}><CenaDetalhe p={p} dur={150} /></Sequence>
    <Sequence from={339} durationInFrames={111}><CenaCTA p={p} dur={111} /></Sequence>
  </AbsoluteFill>
);

export const espremedor: ProdutoProps = {
  gancho: ['Odeia mão com', 'cheiro de alho? 🧄'],
  frase: ['Amassa alho sem', 'sujar a mão'],
  nome: 'Espremedor de alho', preco: 'R$ 11,49',
  foto: 'espremedor-uso.jpg', fotoPos: '50% 60%',
  fotoDetalhe: 'espremedor-passos.jpg', detalheTitulo: 'Como funciona 👇',
  pontos: ['rola e amassa', 'amassa batata também', 'lava rapidinho'],
  palavra: 'ALHO', dataPreco: '13/10',
};

export const limpaTenis: ProdutoProps = {
  gancho: ['Tênis branco', 'encardido? 👟'],
  frase: ['Tênis branco', 'de novo ✨'],
  nome: 'Limpa Tênis 500ml', preco: 'R$ 14,99',
  foto: 'limpa-diferenca.jpg',
  fotoDetalhe: 'limpa-tenis-antes-depois.jpg', detalheTitulo: 'Antes e depois 👀',
  pontos: ['remove manchas difíceis', 'espuma ativa', 'renova e clareia'],
  palavra: 'TÊNIS', dataPreco: '13/10',
};

export const escova: ProdutoProps = {
  gancho: ['Lavar panela sem', 'encostar na gordura? 🍳'],
  frase: ['Aperta e o', 'detergente sai'],
  nome: 'Escova 4 em 1', preco: 'R$ 29,59',
  foto: 'escova-aperte-limpe.jpg', fotoPos: '50% 50%',
  fotoDetalhe: 'escova-4-cabecas.jpg', detalheTitulo: 'Vem com 4 cabeças 🔄',
  pontos: ['detergente no cabo', 'esponja, cerdas e mais', 'ainda pendura'],
  palavra: 'ESCOVA', dataPreco: '15/10',
};
