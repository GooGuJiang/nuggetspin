import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useRef } from 'react';

const BASE_ROTATION_SPEED = 120;
const MAX_ROTATION_SPEED = 7200;
const POINTER_ACCELERATION = 90;
const POINTER_ENTER_BOOST = 1440;
const FRICTION = 0.992;

export function SpinnerLogo() {
  const rotation = useMotionValue(0);
  const speedRef = useRef(BASE_ROTATION_SPEED);
  const lastPointerXRef = useRef<number | null>(null);

  useAnimationFrame((_, delta) => {
    const seconds = delta / 1000;
    const nextRotation = rotation.get() + speedRef.current * seconds;

    rotation.set(nextRotation);

    const decayedSpeed = speedRef.current * FRICTION;

    if (Math.abs(decayedSpeed) < BASE_ROTATION_SPEED) {
      speedRef.current = BASE_ROTATION_SPEED;
      return;
    }

    speedRef.current = decayedSpeed;
  });

  return (
    <motion.img
      src="/logo.svg"
      alt="Logo"
      style={{
        top: '-180px',
        rotate: rotation,
      }}
      className="w-40 h-40 absolute transform -translate-y-1/2 cursor-pointer"
      onPointerEnter={(event) => {
        lastPointerXRef.current = event.clientX;
        speedRef.current += speedRef.current >= 0 ? POINTER_ENTER_BOOST : -POINTER_ENTER_BOOST;
      }}
      onPointerMove={(event) => {
        if (lastPointerXRef.current === null) {
          lastPointerXRef.current = event.clientX;
          return;
        }

        const directionDelta = event.clientX - lastPointerXRef.current;

        if (Math.abs(directionDelta) > 0.5) {
          const nextSpeed = speedRef.current + directionDelta * POINTER_ACCELERATION;
          speedRef.current = Math.max(-MAX_ROTATION_SPEED, Math.min(MAX_ROTATION_SPEED, nextSpeed));
        }

        lastPointerXRef.current = event.clientX;
      }}
      onPointerLeave={() => {
        lastPointerXRef.current = null;
      }}
      draggable={false}
    />
  );
}
