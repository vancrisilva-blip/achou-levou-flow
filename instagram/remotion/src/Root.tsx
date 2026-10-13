import React from 'react';
import {Composition} from 'remotion';
import {OmoReel} from './OmoReel';
import {EntregaReel} from './EntregaReel';
import {Lote2Reel} from './Lote2Reel';
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="OmoReel" component={OmoReel} durationInFrames={450} fps={30} width={1080} height={1920} />
    <Composition id="Lote2Reel" component={Lote2Reel} durationInFrames={450} fps={30} width={1080} height={1920} />
    <Composition id="EntregaReel" component={EntregaReel} durationInFrames={450} fps={30} width={1080} height={1920} />
  </>
);
