import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export function Model({ onLoad,isLoop, ...props }) {
  const group = useRef()
  const { nodes, materials, scene } = useGLTF('/model.gltf')

  // Rotate and move up-down
  useFrame((state) => {
    if(isLoop){
    group.current.rotation.y += 0.04
    group.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 4 + 15
  }
  })

  useEffect(() => {
    if (scene && onLoad) {
      onLoad()
    }
  }, [scene, onLoad])

  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <group position={[1.09, 38.09, -5.14]} rotation={[0.66, 0.65, -2.27]}>
          <group position={[0.18, 0, -0.07]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_2.geometry}
              material={materials.material_0}
            />
          </group>
        </group>
      </group>
    </>
  )
}

useGLTF.preload('/model.gltf')
