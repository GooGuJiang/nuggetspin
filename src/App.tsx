import { Canvas  } from '@react-three/fiber'
import { OrbitControls, Plane,Stage,Environment } from '@react-three/drei'

import { Pixelation,EffectComposer,BrightnessContrast,Noise} from '@react-three/postprocessing'

import './App.css'

import { Model } from './Model/Model'

import { useEffect } from 'react'

import { useControls } from 'leva'

function App() {
  const { isLoop } = useControls({ isLoop: false })
  //TODO: 添加后期处理像素化开关

  return (
    <>
     <Canvas shadows dpr={[1, 2]} camera={{ fov: 50,position:[100,60,200]}}>
     <EffectComposer>
          {}
          <BrightnessContrast
          brightness={0} // brightness. min: -1, max: 1
          contrast={-0.1} // contrast: min -1, max: 1
        />
    </EffectComposer>
     <Stage adjustCamera={false} preset="rembrandt" intensity={1}  environment={{
        path: "/hdri/",
        files: ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
      }}>
        <Model isLoop={isLoop} rotation={[0,-0.7,0]} />
      </Stage>
        <OrbitControls
          //设置默认相机位置

          minDistance={120} 
          maxDistance={150}
          enablePan={false}
          //限制相机的上下旋转角度
          minPolarAngle={Math.PI /100}
          maxPolarAngle={Math.PI / 2}
          //限制相机的左右旋转角度
          minAzimuthAngle={0}
          maxAzimuthAngle={0}
        />
     </Canvas>
    </>
  )
}

export default App
