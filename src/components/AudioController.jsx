import { useEffect, createContext, useState, useContext } from 'react';

// Create a context for audio state
export const AudioContext = createContext({
  isPlaying: false,
  initialized: false,
  toggleAudio: () => {},
  initializeAudio: () => {},
});

// Provider component
export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
  const toggleAudio = () => {
    if (!initialized) {
      setInitialized(true);
    }
    setIsPlaying(prev => !prev);
  };
  
  const initializeAudio = () => {
    if (!initialized) {
      setInitialized(true);
      setIsPlaying(true);
    }
  };
  
  const value = {
    isPlaying,
    initialized,
    toggleAudio,
    initializeAudio,
  };
  
  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

// Hook to use the audio context
export const useAudio = () => {
  return useContext(AudioContext);
};

// Component to handle initialization logic
const AudioController = () => {
  const { initializeAudio } = useAudio();
  
  useEffect(() => {
    // Try to initialize audio on first page load with user interaction
    const handleUserInteraction = () => {
      initializeAudio();
      
      // Clean up event listeners
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
    
    // Add event listeners for user interactions
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [initializeAudio]);
  
  return null; // This component doesn't render anything
};

export default AudioController;