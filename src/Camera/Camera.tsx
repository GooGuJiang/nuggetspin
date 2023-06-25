//Camera.tsx
import { OrbitControls,CameraShake  } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";


interface Point {
    x: number;
    y: number;
    z: number;
}

interface Props {
    position: Point;
    target: Point;
    duration: number; // new property for duration
    ease?: string;
    isOrbitControls?: boolean;
}

const CameraControls = ({ position, target, duration ,ease,isOrbitControls}: Props) => {
const {
    camera,
    gl: { domElement },
} = useThree();
const ref = useRef<any>(null);

camera.up = new Vector3(0, 1, 0);
function cameraAnimate(): void {
    if (ref.current) {
    gsap.timeline().to(camera.position, {
        duration: duration, // use the new property
        repeat: 0,
        x: position.x,
        y: position.y,
        z: position.z,
        ease: ease,
    });

    gsap.timeline().to(
        ref.current.target,
        {
        duration: duration, // use the new property
        repeat: 0,
        x: target.x,
        y: target.y,
        z: target.z,
        ease: ease,
        },
        "<"
    );
    }
}

useEffect(() => {
    cameraAnimate();
}, [target, position, duration]); // add duration to the dependency array

return (<>
<OrbitControls
    ref={ref}
    args={[camera, domElement]}
    panSpeed={1}
    minPolarAngle={Math.PI / 6} // 将最小极角设为30度
    maxPolarAngle={Math.PI / 2}
    minAzimuthAngle={0}
    maxAzimuthAngle={0}
    minDistance={10} 
        maxDistance={100}
    enablePan={false}
  enabled={isOrbitControls}
/>
    </>
);
};

export { CameraControls };
