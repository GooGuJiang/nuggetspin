import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

import { useSpring, animated } from '@react-spring/three'

export function Model({ onLoad,isLoop, ...props }) {
  const group = useRef()
  const { nodes, materials, scene } = useGLTF('/model.gltf')

  const { position } = useSpring({
    position: isLoop ? [0, 15, 0] : [0, 0, 0],
    config: { duration: 200 ,tension: 200, friction: 20 },
  })

  // Animate model
  useFrame((state, delta) => {
    if (isLoop) {
      setTimeout(() => {
        group.current.rotation.y += 0.01;
        group.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 4 + 15;
      }, 200);
    }
  });

  useEffect(() => {
    if (scene && onLoad) {
      onLoad()
    }
  }, [scene, onLoad])

  return (
    <>
      <animated.group
      ref={group}
      {...props}
      dispose={null}
      position={position}
    >
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
      </animated.group>
    </>
  )
}

useGLTF.preload('/model.gltf')
