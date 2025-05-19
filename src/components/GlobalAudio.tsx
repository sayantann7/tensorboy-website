import { useRef, useEffect } from 'react';
import { useAudio } from './AudioController';

const GlobalAudio = () => {
  const audioRef = useRef(null);
  const { isPlaying, initialized } = useAudio();
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (initialized) {
      if (isPlaying) {
        // Try to play and handle potential browser autoplay restrictions
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio playback was prevented by browser:", error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, initialized]);
  
  return (
    <audio 
      ref={audioRef}
      src="/track.mp3"
      loop
      preload="auto"
      className="hidden"
    />
  );
};

export default GlobalAudio;