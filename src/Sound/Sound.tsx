import React, { useEffect } from 'react';
import { Howl } from 'howler';

interface SoundProps {
  src: string;
  volume?: number;
  onSoundLoad: (sound: Howl) => void;
  onDuration: (duration: number) => void;
  isPlaying?: (isPlaying: boolean) => void;
}

const Sound: React.FC<SoundProps> = ({ src, volume = 1, onSoundLoad , onDuration,isPlaying}) => {
  useEffect(() => {
  const newSound = new Howl({
    src: [src],
    volume,
    html5: true,
    loop: true,
  });

  newSound.once('load', () => {
    onSoundLoad(newSound);
    onDuration(newSound.duration());
  });

  newSound.on('play', () => {
    if (isPlaying) {
      isPlaying(true);
    }
  });

  newSound.on('end', () => {
    if (isPlaying) {
      isPlaying(false);
    }
  });

  return () => {
    newSound.unload();
  };
}, [isPlaying, onDuration, onSoundLoad, src, volume]);

  return null;
}

export default Sound;
