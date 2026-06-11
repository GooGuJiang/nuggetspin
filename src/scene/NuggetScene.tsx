import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, Stars, Stats } from '@react-three/drei';
import { EffectComposer, Pixelation } from '@react-three/postprocessing';
import { Model } from '../Model/Model';
import { CameraControls } from '../Camera/Camera';
import Loader from '../Loader/Loader';
import {
  NUGGET_MODEL_TRANSFORM,
  STAGE_ENVIRONMENT,
  STAGE_SHADOWS,
} from '../config/scene';
import type { AnimationControls } from 'framer-motion';
import { StartOverlay } from '../components/StartOverlay/StartOverlay';

interface Point {
  x: number;
  y: number;
  z: number;
}

interface NuggetSceneProps {
  isStarted: boolean;
  isLoop: boolean;
  isDebug: boolean;
  isSpace: boolean;
  isOrbitControls: boolean;
  cameraPosition: Point;
  cameraTarget: Point;
  cameraDuration: number;
  cameraEasing: string;
  overlayControls: AnimationControls;
  clickCount: number;
  loaderComplete: boolean;
  startText: string;
  clicksText: string;
  onLoaderComplete: () => void;
  onStart: () => void;
}

export function NuggetScene({
  isStarted,
  isLoop,
  isDebug,
  isSpace,
  isOrbitControls,
  cameraPosition,
  cameraTarget,
  cameraDuration,
  cameraEasing,
  overlayControls,
  clickCount,
  loaderComplete,
  startText,
  clicksText,
  onLoaderComplete,
  onStart,
}: NuggetSceneProps) {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
      <Suspense fallback={<Loader onComplete={onLoaderComplete} />}>
        <EffectComposer>
          <Pixelation granularity={2.8} />
        </EffectComposer>
        {isDebug && <Stats />}
        {!isStarted && (
          <StartOverlay
            controls={overlayControls}
            clickCount={clickCount}
            loaderComplete={loaderComplete}
            startText={startText}
            clicksText={clicksText}
            onStart={onStart}
          />
        )}
        <Stage
          adjustCamera={false}
          preset="rembrandt"
          intensity={0.5}
          shadows={STAGE_SHADOWS}
          environment={STAGE_ENVIRONMENT}
        >
          <Model
            scale={NUGGET_MODEL_TRANSFORM.scale}
            isLoop={isLoop}
            rotation={NUGGET_MODEL_TRANSFORM.rotation}
          />
          {isSpace && (
            <Stars
              radius={100}
              saturation={0}
              fade={true}
            />
          )}
        </Stage>
        <CameraControls
          position={cameraPosition}
          target={cameraTarget}
          duration={cameraDuration}
          ease={cameraEasing}
          isOrbitControls={isOrbitControls}
        />
      </Suspense>
    </Canvas>
  );
}
