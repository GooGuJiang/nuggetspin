import { Canvas  } from '@react-three/fiber'
import { Stage, Html } from '@react-three/drei'

//import { Pixelation,EffectComposer,BrightnessContrast,Noise} from '@react-three/postprocessing'

import './App.css'

import { Model } from './Model/Model'

import { useEffect, useState } from 'react'

import { Perf } from 'r3f-perf'

import { Howl } from 'howler';
import Sound from './Sound/Sound';
import { CameraControls } from './Camera/Camera'

import { useTranslation } from 'react-i18next';

import {  FaCirclePlay } from "react-icons/fa6";

function App() {
  const [iSbutton, setButton] = useState(false);
  const [isLoop, setLoop] = useState(false);
  const [isOrbitControls, setOrbitControls] = useState(false);

  const [isDebug, setDebug] = useState(false);

  const [cameraPosition, setCameraPosition] = useState({x: 0, y: 2, z: 100});
  const [cameraTarget, setCameraTarget] = useState({x: 0, y: 0, z: 0});
  const [cameraDuration, setCameraDuration] = useState(0);
  const [cameraEasing, setCameraEasing] = useState('');

  const [soundPlay, setSoundPlay] = useState<Howl | null>(null);
  const [seekValue, setSeekValue] = useState<number>(0);
  const [AllkValue, setAllkValue] = useState<number>(0);

  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (soundPlay) {
        if (soundPlay.playing()) {
          let seek = soundPlay.seek() as number;
          setSeekValue(seek);
        } else {
          setSeekValue(0);
        }
      }
    }, 1);
    return () => clearInterval(interval);
  }, [soundPlay, AllkValue]);

  return (
    <>
    <Sound src="/music.mp3" volume={0.4}
    onDuration={setAllkValue}
    onSoundLoad={setSoundPlay} 
    />
     <Canvas shadows dpr={[1, 2]} camera={{fov: 50}}>
     {isDebug && (<Perf
        position="bottom-right"
     />)}
     { !iSbutton && (<Html
      style={{
        width: '100vw',
      }}
     center>
      <div className="flex justify-center items-center">
        <button 
        onClick={() => {
          setTimeout(() => {
            soundPlay!.play();
            setLoop(true)
          }, 2100);
          setButton(true)
          setOrbitControls(true)
          setCameraPosition({x: 0, y: 3, z: 10})
          setCameraDuration(2)
          setCameraEasing("power3.inOut")
        }}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-8 rounded-md">
         <div className="flex items-center">
         <FaCirclePlay className="text-4xl  mr-2" />
          <span className="text-4xl">{t("start")}</span>
        </div>
        </button>
      </div>
     </Html>)}
     <Stage adjustCamera={false} preset="rembrandt" intensity={0.5}  environment={{
        path: "/hdri/",
        files: ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
      }}>
        <Model scale={0.09} isLoop={isLoop} rotation={[0,-0.7,0]} />
      </Stage>
        
        <CameraControls position={cameraPosition} target={cameraTarget} duration={cameraDuration} ease={cameraEasing} isOrbitControls={isOrbitControls}/>
     </Canvas>
     <div className="fixed left-0 bottom-0 p-4 font-bold">
      <span className="text-orange-400 text-opacity-50">{t("made-1")}</span>
        <a className="text-orange-500 hover:text-orange-400 text-opacity-50" href="https://github.com/googujiang">{t("made-2")}</a>
      <span className="text-orange-400 text-opacity-50">{t("made-3")}</span>
    </div>
    </>
  )
}

export default App
