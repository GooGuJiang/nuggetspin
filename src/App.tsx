import { Canvas  } from '@react-three/fiber'
import { Stage, Html,Stars } from '@react-three/drei'
import { Helmet } from 'react-helmet'
//import { Pixelation,EffectComposer,BrightnessContrast,Noise} from '@react-three/postprocessing'
import { EffectComposer,Pixelation } from '@react-three/postprocessing'
import CountUp from 'react-countup';

import axios from 'axios';
import './App.css'
import { Model } from './Model/Model'
import { useEffect, useState,Suspense, useRef } from 'react'
import { Perf } from 'r3f-perf'
import { Howl } from 'howler';
import Sound from './Sound/Sound';
import { CameraControls } from './Camera/Camera'
import { useTranslation } from 'react-i18next';
import {  FaCirclePlay } from "react-icons/fa6";
import Loader from './Loader/Loader'

import { motion, useAnimation } from "framer-motion";

import ModSwitch from './Switch/Switch'

function getFontSize(value: number): string {
  const baseSize = 1.5;
  const decrement = 0.1;
  const length = value.toString().length;

  const steps = Math.floor((length - 1) / 2);

  const newSize = baseSize - (steps * decrement);

  return `${newSize}em`;
}


function App() {
  const [iSbutton, setButton] = useState(false);
  const [isLoop, setLoop] = useState(false);
  const [isOrbitControls, setOrbitControls] = useState(false);
  const [isDebug, setDebug] = useState(false);
  const [isSpace, setIsSpace] = useState(false);

  const [loaderComplete, setLoaderComplete] = useState(false);

  const [cameraPosition, setCameraPosition] = useState({x: 0, y: 2, z: 100});
  const [cameraTarget, setCameraTarget] = useState({x: 0, y: 0, z: 0});
  const [cameraDuration, setCameraDuration] = useState(0);
  const [cameraEasing, setCameraEasing] = useState('');

  const [soundPlay, setSoundPlay] = useState<Howl | null>(null);
  const [seekValue, setSeekValue] = useState<number>(0);
  const [AllkValue, setAllkValue] = useState<number>(0);

  const { t } = useTranslation();

  const [clickCount, setClickCount] = useState<number>(0);

  const controls = useAnimation();

  const bgColor = isSpace ? '#000' : '#fff';


  useEffect(() => {
    axios.get('https://api.nuggetspin.mov/total')
      .then(res => {
        setClickCount(res.data.total_clicks);
      })
      .catch(err => {
        console.error(err);
        setClickCount(0);
      });
  }, []);

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

  const handleClick = () => {
    axios.get('https://api.nuggetspin.mov/click', {
    })
    .catch(err => {
      console.error(err);
    });
    
    controls.start({
      scale: 0,
      opacity: 0,
      y: -500,
      transition: { duration: 0.5, ease: "easeInOut" },
    });    
  };
  

  return (
    <motion.div
    animate={{ backgroundColor: bgColor,
    }}
    transition={{ duration: 0.1, ease: "easeInOut" }}
    style={{ width: "100%", height: "100%" }}
    initial={{ backgroundColor: bgColor }}
  >
      <Helmet>
        <title>{t("title-main")}</title>
      </Helmet>
      <Sound
        src="/assets/music.mp3"
        volume={0.5}
        onDuration={setAllkValue}
        onSoundLoad={setSoundPlay}
      />
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <Suspense fallback={<Loader onComplete={() => setLoaderComplete(true)} />}>
        <EffectComposer >
          <Pixelation 
            granularity={2.8}
          />
        </EffectComposer>
          {isDebug && (
            <Perf
              position="bottom-right"
            />
          )}
          {!iSbutton && (
            <Html
              style={{
                width: '100vw',
              }}
              center
            >
              <motion.div animate={controls} className="flex justify-center items-center">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  style={{
                    top: "-180px",
                  }}
                  className="rotate-animation w-32 h-32 absolute transform -translate-y-1/2"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setTimeout(() => {
                      soundPlay!.play();
                      setLoop(true);
                    }, 2100);
                    setTimeout(() => {
                      setButton(true);
                    }, 510);
                    setOrbitControls(true);
                    setCameraPosition({ x: 0, y: 3, z: 10 });
                    setCameraDuration(2);
                    setCameraEasing("power3.inOut");
                    handleClick();
                  }}
                  className="bg-orange-500 text-white font-bold py-4 px-8 rounded-md"
                >
                  <div className="flex items-center">
                    <FaCirclePlay className="text-4xl mr-2" />
                    <span className="text-4xl">{t("start")}</span>
                  </div>
                </motion.button>
                <div
                  className="top-44 bg-orange-300 absolute transform -translate-y-1/2 rounded-md"
                  style={{
                    width: '200px',
                    height: '60px',
                  }}
                >
                  <p
                    className="text-center text-white font-bold"
                    style={{
                      marginTop: '2px',
                    }}
                  >
                    {t("clicks")}
                  </p>
                  <p
                    className="text-center text-2xl text-white font-bold"
                    style={{
                    }}
                  >{
                    loaderComplete ? (
                      <CountUp end={clickCount} delay={0.5} style={{ fontSize: getFontSize(clickCount) }} />
                    ) : (
                      <CountUp end={0} style={{ fontSize: '2em' }} />
                    )
                  }
                  </p>
                </div>
              </motion.div>
            </Html>
          )}
          <Stage
            adjustCamera={false}
            preset="rembrandt"
            intensity={0.5}
            environment={{
              path: "/assets/hdri/",
              files: ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
            }}
          >
            <Model scale={0.09} isLoop={isLoop} rotation={[0, -0.7, 0]} />
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
      <motion.div
        whileHover={{ scale: 1.2}}
        whileTap={{ scale: 0.8 }}
       className="fixed left-0 bottom-0 p-4 font-bold">
        <a className="text-orange-500 hover:text-orange-400 text-opacity-50" href="https://github.com/googujiang">
          {t("made")}
        </a>
      </motion.div>
      <ModSwitch 
        setIsSpace={setIsSpace}
      />
    </motion.div>
  )
}

export default App
