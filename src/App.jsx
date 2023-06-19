import React, { useRef, useState, useEffect, Suspense  } from 'react'
import { Canvas  } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Pixelation,EffectComposer,BrightnessContrast,Noise} from '@react-three/postprocessing'

import Sence from './Sence'
import Loader from './Loader'


function App() {
  const ref = useRef()
  const [ready, setReady] = useState(false)
  const [isCilck, setIsCilck] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const handleClick = () => {
    setReady(true)
    setIsCilck(true)
  }

  const handleLoaded = () => {
    setLoaded(true)
  }

  return (
    <>
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 50, position: [650,150, 500] }}>
    <EffectComposer>
          <Pixelation granularity={5} />
          <BrightnessContrast
          brightness={0} // brightness. min: -1, max: 1
          contrast={-0.1} // contrast: min -1, max: 1
        />
        <Noise opacity={0.02} />
    </EffectComposer>
      <Perf />
      {loaded && (
        <Html center>
          <button style={{
            width: '100px',
            display: isCilck ? 'none' : 'block',
          }} onClick={handleClick}>点击开始</button>
        </Html>
      )}
      <Suspense fallback={<Loader />}>
        <Sence ready={ready} isLoop={isCilck} onLoad={handleLoaded} />
        <OrbitControls ref={ref} 
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
