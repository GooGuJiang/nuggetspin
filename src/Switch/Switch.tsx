import React from 'react';
import { motion } from "framer-motion";
import { useState } from 'react';
import { BsSunFill } from 'react-icons/bs';
import { IoPlanet } from 'react-icons/io5';

interface Props {
  setIsSpace: (isSpace: boolean) => void;
}

const Switch: React.FC<Props> = ({ setIsSpace }) => {
  const [isSpace, setIsSpaceLocal] = useState(false);

  const handleClick = () => {
    setIsSpaceLocal(!isSpace);
    setIsSpace(!isSpace);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.2}}
      whileTap={{ scale: 0.8, rotate: -90 }}
      onClick={handleClick}
      className="text-3xl fixed bottom-4 text-orange-400 hover:text-orange-500  right-4 z-50">
      {isSpace ? <IoPlanet aria-hidden="true" /> : <BsSunFill aria-hidden="true" />}
    </motion.div>
  );
}

export default Switch;
