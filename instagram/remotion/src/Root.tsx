import React from 'react';
import {Composition} from 'remotion';
import {OmoReel} from './OmoReel';
import {EntregaReel} from './EntregaReel';
import {Lote2Reel} from './Lote2Reel';
import {LevinIntro} from './LevinIntro';
import {ProdutoReel, espremedor, limpaTenis} from './ProdutoReel';
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="OmoReel" component={OmoReel} durationInFrames={450} fps={30} width={1080} height={1920} />
    <Composition id="Lote2Reel" component={Lote2Reel} durationInFrames={450} fps={30} width={1080} height={1920} />
    <Composition id="EntregaReel" component={EntregaReel} durationInFrames={450} fps={30} width={1080} height={1920} />
    <Composition id="LevinIntro" component={LevinIntro} durationInFrames={360} fps={30} width={1080} height={1920} />
    <Composition id="EspremedorReel" component={ProdutoReel} defaultProps={espremedor} durationInFrames={450} fps={30} width={1080} height={1920} />
    <Composition id="LimpaTenisReel" component={ProdutoReel} defaultProps={limpaTenis} durationInFrames={450} fps={30} width={1080} height={1920} />
  </>
);
