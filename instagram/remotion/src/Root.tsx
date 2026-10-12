import React from 'react';
import {Composition} from 'remotion';
import {OmoReel} from './OmoReel';
export const RemotionRoot: React.FC = () => (
  <Composition id="OmoReel" component={OmoReel} durationInFrames={450} fps={30} width={1080} height={1920} />
);
