import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import AnimatedTitle from "./AnimatedTitle";

const LoadingOverlay = () => {
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef(null);
  const pixelsRef = useRef(null);

  useEffect(() => {
    // Create pixel grid
    if (pixelsRef.current) {
      const pixelGrid = pixelsRef.current;
      pixelGrid.innerHTML = '';
      
      // Create 20x5 grid of pixels
      for (let i = 0; i < 100; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'loading-pixel';
        pixelGrid.appendChild(pixel);
      }
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 3;
        return next > 100 ? 100 : next;
      });
    }, 30);

    // After progress is done, animate out
    const timer = setTimeout(() => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = "none";
          }
        }
      });
    }, 3300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  // Update loading pixels based on progress
  useEffect(() => {
    if (pixelsRef.current) {
      const pixels = pixelsRef.current.children;
      const pixelsToFill = Math.floor((progress / 100) * pixels.length);
      
      for (let i = 0; i < pixels.length; i++) {
        if (i < pixelsToFill) {
          pixels[i].classList.add('active');
        } else {
          pixels[i].classList.remove('active');
        }
      }
    }
  }, [progress]);

  return (
    <div 
      ref={overlayRef} 
      className="loading-overlay"
    >
      <div className="loading-content">

        <span className="font-zentry text-4xl font-bold text-[#ff0c00] mb-8">
          Logging into...
        </span>

        <AnimatedTitle 
          title="TensorBoy" 
          containerClass="mb-8 !text-[#ff0c00] text-2xl"
        />
        
        
        
        <div className="loading-bar-container">
          <div ref={pixelsRef} className="loading-pixels-container"></div>
          <div className="loading-percentage font-robert-regular">
            {Math.floor(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;