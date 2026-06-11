import './App.css'
import { useEffect, useState } from 'react'
import { Howl } from 'howler';
import Sound from './Sound/Sound';
import { useTranslation } from 'react-i18next';

import { motion, useAnimation } from "framer-motion";

import ModSwitch from './Switch/Switch'
import { NuggetScene } from './scene/NuggetScene'
import { FooterCredit } from './components/FooterCredit/FooterCredit'
import { useClickCounter } from './hooks/useClickCounter'
import {
  CAMERA_ACTIVE_POSITION,
  CAMERA_INITIAL_POSITION,
  CAMERA_INTRO_ANIMATION,
  CAMERA_TARGET,
} from './config/scene'


function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isLoop, setLoop] = useState(false);
  const [isOrbitControls, setOrbitControls] = useState(false);
  const [isDebug] = useState(false);
  const [isSpace, setIsSpace] = useState(false);

  const [loaderComplete, setLoaderComplete] = useState(false);

  const [cameraPosition, setCameraPosition] = useState(CAMERA_INITIAL_POSITION);
  const [cameraTarget] = useState(CAMERA_TARGET);
  const [cameraDuration, setCameraDuration] = useState(0);
  const [cameraEasing, setCameraEasing] = useState('');

  const [soundPlay, setSoundPlay] = useState<Howl | null>(null);
  const [AllkValue, setAllkValue] = useState<number>(0);

  const { t } = useTranslation();

  const { clickCount, recordClick } = useClickCounter();

  const controls = useAnimation();

  const bgColor = isSpace ? '#000' : '#fff';


  useEffect(() => {
    document.title = t("title-main");
  }, [t]);


  useEffect(() => {
    const interval = setInterval(() => {
      if (soundPlay) {
        if (soundPlay.playing()) {
          soundPlay.seek() as number;
        } else {
          soundPlay.seek(0);
        }
      }
    }, 1);
    return () => clearInterval(interval);
  }, [soundPlay, AllkValue]);

  const handleClick = () => {
    recordClick();
    
    controls.start({
      scale: 0,
      opacity: 0,
      y: -500,
      transition: { duration: 0.5, ease: "easeInOut" },
    });    
  };

  const handleStart = () => {
    setTimeout(() => {
      soundPlay?.play();
      setLoop(true);
    }, 2100);
    setTimeout(() => {
      setIsStarted(true);
    }, 510);
    setOrbitControls(true);
    setCameraPosition(CAMERA_ACTIVE_POSITION);
    setCameraDuration(CAMERA_INTRO_ANIMATION.duration);
    setCameraEasing(CAMERA_INTRO_ANIMATION.ease);
    handleClick();
  };
  

  return (
    <motion.div
    animate={{ backgroundColor: bgColor,
    }}
    transition={{ duration: 0.1, ease: "easeInOut" }}
    style={{ width: "100%", height: "100%" }}
    initial={{ backgroundColor: bgColor }}
  >
      <Sound
        src="/assets/music.mp3"
        volume={0.5}
        onDuration={setAllkValue}
        onSoundLoad={setSoundPlay}
      />
      <NuggetScene
        isStarted={isStarted}
        isLoop={isLoop}
        isDebug={isDebug}
        isSpace={isSpace}
        isOrbitControls={isOrbitControls}
        cameraPosition={cameraPosition}
        cameraTarget={cameraTarget}
        cameraDuration={cameraDuration}
        cameraEasing={cameraEasing}
        overlayControls={controls}
        clickCount={clickCount}
        loaderComplete={loaderComplete}
        startText={t("start")}
        clicksText={t("clicks")}
        onLoaderComplete={() => setLoaderComplete(true)}
        onStart={handleStart}
      />
      <FooterCredit label={t("made")} />
      <ModSwitch 
        setIsSpace={setIsSpace}
      />
    </motion.div>
  )
}

export default App
