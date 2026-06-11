import { Html } from '@react-three/drei';
import { motion, type AnimationControls } from 'framer-motion';
import { IoPlayCircle } from 'react-icons/io5';
import { getFontSize } from '../../utils/getFontSize';

interface StartOverlayProps {
  controls: AnimationControls;
  clickCount: number;
  loaderComplete: boolean;
  startText: string;
  clicksText: string;
  onStart: () => void;
}

export function StartOverlay({
  controls,
  clickCount,
  loaderComplete,
  startText,
  clicksText,
  onStart,
}: StartOverlayProps) {
  const visibleClickCount = loaderComplete ? clickCount : 0;

  return (
    <Html
      style={{
        width: '100vw',
      }}
      center
    >
      <motion.div animate={controls} className="flex justify-center items-center">
        <img
          src="/logo.svg"
          alt="Logo"
          style={{
            top: '-180px',
          }}
          className="rotate-animation w-32 h-32 absolute transform -translate-y-1/2"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onStart}
          className="bg-orange-500 text-white font-bold py-4 px-8 rounded-md"
        >
          <div className="flex items-center">
            <IoPlayCircle aria-hidden="true" className="text-4xl mr-2" />
            <span className="text-4xl">{startText}</span>
          </div>
        </motion.button>
        <div
          className="top-44 bg-orange-300 absolute transform -translate-y-1/2 rounded-md"
          style={{
            width: '200px',
            height: '60px',
          }}
        >
          <p
            className="text-center text-white font-bold"
            style={{
              marginTop: '2px',
            }}
          >
            {clicksText}
          </p>
          <p className="text-center text-2xl text-white font-bold">
            <span style={{ fontSize: getFontSize(visibleClickCount) }}>
              {visibleClickCount}
            </span>
          </p>
        </div>
      </motion.div>
    </Html>
  );
}
