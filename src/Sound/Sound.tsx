import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';

interface SoundProps {
  src: string;
  volume?: number;
  onSoundLoad: (sound: Howl) => void;
  onDuration: (duration: number) => void;
  isPlaying?: (isPlaying: boolean) => void;
}

const Sound: React.FC<SoundProps> = ({ src, volume = 1, onSoundLoad , onDuration,isPlaying}) => {
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [isPlayingState, setIsPlayingState] = useState(false);

  useEffect(() => {
  const newSound = new Howl({
    src: [src],
    volume,
    html5: true,
    loop: true,
  });

  newSound.once('load', () => {
    setSoundLoaded(true);
    onSoundLoad(newSound);
    onDuration(newSound.duration());
  });

  newSound.on('play', () => {
    setIsPlayingState(true);
    if (isPlaying) {
      isPlaying(true);
    }
  });

  newSound.on('end', () => {
    setIsPlayingState(false);
    if (isPlaying) {
      isPlaying(false);
    }
  });
}, [soundLoaded,isPlayingState]);

  return null;
}

export default Sound;
