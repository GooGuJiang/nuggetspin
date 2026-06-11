/*
鸡块...鸡块...欸嘿嘿....() => {
  const 鸡块: string = "鸡块";
  return 鸡块;
}
*/

import * as THREE from 'three'
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { ThreeElements, useFrame } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
  }
  materials: {
    material_0: THREE.MeshBasicMaterial
  }
}


export function Model(props: ThreeElements['group'] & { isLoop: boolean }) {
  const { nodes, materials } = useGLTF('/assets/model-transformed.glb') as unknown as GLTFResult
  const meshRef = useRef<THREE.Mesh>(null);
  const { isLoop } = props;

  useFrame(({ clock }) => {
    if (!isLoop || !meshRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    meshRef.current.rotation.y = (elapsed / 1.5) * Math.PI * 2;
    meshRef.current.position.y = 62.5 + Math.sin((elapsed / 0.98) * Math.PI * 2) * 7.5;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
      ref={meshRef}
      castShadow
      geometry={nodes.Object_2.geometry} 
      material={materials.material_0} 
      position={[0.953, 50.977, -5.217]} 
      rotation={[3.21, 0, 0.90]} 
      />
    </group>
  )
}

useGLTF.preload('/assets/model-transformed.glb')
