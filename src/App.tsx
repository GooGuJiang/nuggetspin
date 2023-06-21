import { Canvas  } from '@react-three/fiber'
import { OrbitControls, Stage,Html } from '@react-three/drei'

import { Pixelation,EffectComposer,BrightnessContrast,Noise} from '@react-three/postprocessing'

import './App.css'

import { Model } from './Model/Model'

import { useEffect } from 'react'

import { useControls } from 'leva'

import { Perf } from 'r3f-perf'

function App() {
  const { isLoop,isPixelation } = useControls({ 
    isLoop: false,
    isPixelation: false
  })
  //TODO: 添加后期处理像素化开关

  return (
    <>
     <Canvas shadows dpr={[3, 3]} camera={{fov: 50,position:[100,60,200]}}>
     <Perf
        position="bottom-right"
     />
     <Html
      style={{
        width: '100vw',
      }}
     center>
      <div className="flex justify-center items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <h3>Click Me</h3>
        </button>
      </div>
     </Html>
     <Stage adjustCamera={false} preset="rembrandt" intensity={0.5}  environment={{
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

     <div className="fixed left-0 bottom-0 p-4 font-bold">
      <span className="text-orange-400 text-opacity-50">Made by </span>
      <a className="text-orange-500 hover:text-orange-400 text-opacity-50" href="https://ggj.moe/about">@咕谷酱</a>
    </div>

     <div className="fixed left-0 bottom-0 p-4 font-bold">
      <span className="text-orange-400 text-opacity-50">由 </span>
        <a className="text-orange-500 hover:text-orange-400 text-opacity-50" href="https://ggj.moe/about">@咕谷酱</a>
      <span className="text-orange-400 text-opacity-50"> 制作</span>
    </div>
    </>
  )
}

export default App
