import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FaPlay, FaPause } from "react-icons/fa";

import Button from "./Button";

// Updated navigation items to match the website sections
const navItems = ["RedPill", "LifeCookbook", "Newsletter", "Contact"];

const NavBar = () => {
  // Set audio playing to true by default
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(true);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    if (!audioInitialized) {
      setAudioInitialized(true);
    }
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Initialize audio on component mount and first user interaction
  useEffect(() => {
    // Try to initialize audio immediately
    if (!audioInitialized) {
      setAudioInitialized(true);
    }
    
    // Still need user interaction listeners for browsers that strictly enforce autoplay policies
    const handleFirstInteraction = () => {
      if (!audioElementRef.current?.played?.length) {
        // If audio hasn't started playing yet, try again after user interaction
        const playPromise = audioElementRef.current?.play();
        if (playPromise) {
          playPromise.catch(error => {
            console.log("Audio playback prevented by browser:", error);
          });
        }
        
        // Remove event listeners after successfully starting playback
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
      }
    };

    // Add event listeners for first user interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  // Manage audio playback
  useEffect(() => {
    if (!audioElementRef.current) return;
    
    if (isAudioPlaying) {
      const playPromise = audioElementRef.current.play();
      // Handle potential promise rejection due to browser autoplay policy
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio playback prevented by browser:", error);
        });
      }
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying, audioElementRef]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Schedule Button */}
          <div className="flex items-center gap-7">
            <div className="flex items-center">
              <span className="font-zentry text-2xl font-bold text-[#ff0c00]">Tensor<span className="text-[#ff0c00]">Boy</span></span>
            </div>

            <a href="#contact">
              <Button
              id="schedule-button"
              title="Schedule a Call"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-[#ff0c00] text-dark-100 md:flex hidden items-center justify-center gap-1 hover:bg-[#ff0c00]/80"
            />
            </a>
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-2"
              aria-label={isAudioPlaying ? "Pause music" : "Play music"}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/track.mp3"
                loop
                preload="auto"
              />
              <div className="flex items-center space-x-0.5 mr-2">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                      backgroundColor: "#ff0c00",
                    }}
                  />
                ))}
              </div>
              <span className="text-[#ff0c00]">
                {isAudioPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
              </span>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;