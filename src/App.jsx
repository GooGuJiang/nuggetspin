import React, { useRef, useState, useEffect, Suspense  } from 'react'
import { Canvas  } from '@react-three/fiber'
import { OrbitControls, Html ,CameraShake} from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Pixelation,EffectComposer,BrightnessContrast,Noise} from '@react-three/postprocessing'

import Sence from './Sence'
import Loader from './Loader'

//NextUI
import { Button } from "@nextui-org/react";


//i18n

import i18n from 'i18next';
import { initReactI18next,useTranslation  } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Helmet } from 'react-helmet';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // 默认语言
    detection: {
      order: ['navigator'], // 优先使用浏览器语言设置进行检测
    },
    backend: {
      // 配置语言资源的加载路径
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // 更多的配置选项...
  });


function App() {
  const ref = useRef()
  const [ready, setReady] = useState(false)
  const [isCilck, setIsCilck] = useState(false)
  const [loaded, setLoaded] = useState(false)

  
  const { t } = useTranslation();

  const [isdebug, setisdebug] = useState(false)

  const handleClick = () => {
    setReady(true)
    setIsCilck(true)
  }

  const handleLoaded = () => {
    setLoaded(true)
  }

  return (
    <>
    <Helmet>
        <title>{t('pageTitle')}</title>
    </Helmet>
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
    <EffectComposer>
          <Pixelation granularity={5} />
          <BrightnessContrast
          brightness={0} // brightness. min: -1, max: 1
          contrast={-0.1} // contrast: min -1, max: 1
        />
        <Noise opacity={0.02} />
    </EffectComposer>
      {isdebug && (<Perf />)}
      {loaded && (
        <Html center>
          <Button shadow color="warning"  flat style={{
            width: '100px',
            display: isCilck ? 'none' : 'block',
          }} onClick={handleClick}>{t('buttonText')}</Button>
        </Html>
      )}
      <Suspense fallback={<Loader />}>
        <Sence ready={ready} isLoop={isCilck} onLoad={handleLoaded} />
        <OrbitControls ref={ref} 
          //设置默认相机位置
          target={[0, 0, 0]}
          minDistance={120} 
          maxDistance={150}
          enablePan={false}
          //限制相机的上下旋转角度
          minPolarAngle={Math.PI /100}
          maxPolarAngle={Math.PI / 2}
          //限制相机的左右旋转角度
          minAzimuthAngle={0}
          maxAzimuthAngle={0}
          enabled={isCilck}
        />
      </Suspense>
    </Canvas>
    </>
  )
}

export default App
