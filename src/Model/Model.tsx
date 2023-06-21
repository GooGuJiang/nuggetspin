/*
鸡块...鸡块...欸嘿嘿....() => {
  const 鸡块: string = "鸡块";
  return 鸡块;
}
*/

import * as THREE from 'three'
import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

import { useAnimation } from 'framer-motion';
import { motion } from 'framer-motion-3d';

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
  }
  materials: {
    material_0: THREE.MeshBasicMaterial
  }
}


export function Model(props: JSX.IntrinsicElements['group'] & { isLoop: boolean }) {
  const { nodes, materials } = useGLTF('/model-transformed.glb') as GLTFResult
  const animation = useAnimation();
  const { isLoop } = props;

  useEffect(() => {
    if (isLoop) {
      animation.start({
        rotateY: [0, Math.PI * 2],
        y: [55, 70, 55],
        transition: {
          rotateY: { duration: 1.5, repeat: Infinity, ease: "linear" },
          y: { duration: 0.98, repeat: Infinity, ease: "easeInOut" },
        },
      });
    } else {
      animation.stop();
    }
  }, [isLoop]);

  return (
    <group {...props} dispose={null}>
      <motion.mesh
      animate={animation}
      geometry={nodes.Object_2.geometry} 
      material={materials.material_0} 
      position={[0.953, 50.977, -5.217]} 
      rotation={[3.21, 0, 0.90]} 
      />
    </group>
  )
}

useGLTF.preload('/model-transformed.glb')
