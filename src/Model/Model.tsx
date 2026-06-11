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
import {
  NUGGET_MESH_TRANSFORM,
  NUGGET_MODEL_PATH,
  NUGGET_MOTION,
} from '../config/scene'

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
  }
  materials: {
    material_0: THREE.MeshBasicMaterial
  }
}


export function Model(props: ThreeElements['group'] & { isLoop: boolean }) {
  const { nodes, materials } = useGLTF(NUGGET_MODEL_PATH) as unknown as GLTFResult
  const meshRef = useRef<THREE.Mesh>(null);
  const { isLoop } = props;

  useFrame((_, delta) => {
    if (!meshRef.current) {
      return;
    }

    if (!isLoop) {
      meshRef.current.position.y = THREE.MathUtils.damp(
        meshRef.current.position.y,
        NUGGET_MESH_TRANSFORM.position[1],
        NUGGET_MOTION.positionDamping,
        delta,
      );
      return;
    }

    const elapsed = performance.now() / 1000;
    const targetY = NUGGET_MOTION.floatBaseY
      + Math.sin((elapsed / NUGGET_MOTION.floatCycleSeconds) * Math.PI * 2) * NUGGET_MOTION.floatAmplitude;

    meshRef.current.rotation.y += NUGGET_MOTION.rotationSpeed * delta;
    meshRef.current.position.y = THREE.MathUtils.damp(
      meshRef.current.position.y,
      targetY,
      NUGGET_MOTION.positionDamping,
      delta,
    );
  });

  return (
    <group {...props} dispose={null}>
      <mesh
      ref={meshRef}
      castShadow
      geometry={nodes.Object_2.geometry} 
      material={materials.material_0} 
      position={NUGGET_MESH_TRANSFORM.position} 
      rotation={NUGGET_MESH_TRANSFORM.rotation} 
      />
    </group>
  )
}

useGLTF.preload(NUGGET_MODEL_PATH)
