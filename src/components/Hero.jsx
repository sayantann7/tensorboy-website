import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { FaKaggle, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { useEffect, useRef } from "react";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Create refs for elements we want to animate
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const socialRef = useRef(null);
  const buttonRef = useRef(null);
  const backgroundHeadingRef = useRef(null);
  const heroContentRef = useRef(null);
  const perspectiveWrapperRef = useRef(null);
  const codeRainRef = useRef(null);

  // Social media links
  const socialLinks = [
    { icon: <FaKaggle />, href: "https://www.kaggle.com/tensorboy", label: "Kaggle" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/tensorboy", label: "LinkedIn" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/tensorboy", label: "Instagram" },
    { icon: <FaGithub />, href: "https://github.com/tensorboy", label: "GitHub" }
  ];

  // Generate matrix-like code rain effect
  useEffect(() => {
    if (!codeRainRef.current) return;

    const canvas = codeRainRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to use in the matrix code
    const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
    const fontSize = 16; // Increased from 14 to 16 for better visibility
    const columns = canvas.width / fontSize;
    
    // Array to track y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Drawing animation
    const draw = () => {
      // Semi-transparent black to fade characters
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Brighter blue-green text - changed from #00FFAA to #00FFCC
      ctx.fillStyle = "#ff0c00";
      ctx.font = `${fontSize}px monospace`;

      // Loop over each column
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // x = column * font-size, y = drop position * font-size
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Set a random character opacity with higher minimum for more visibility
        if (drops[i] * fontSize > 0) {
          ctx.globalAlpha = Math.random() * 0.5 + 0.5; // Increased from 0.3 to 0.5 minimum
        }
        
        // Reset position when reaching bottom or randomly for some drops
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y coordinate
        drops[i]++;
      }
      
      // Reset opacity
      ctx.globalAlpha = 1;
    };

    // Animation loop
    const interval = setInterval(draw, 35);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Track mouse movements for the perspective effect
  useEffect(() => {
    const wrapper = perspectiveWrapperRef.current;
    if (!wrapper) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = wrapper.getBoundingClientRect();
      
      // Calculate position relative to the center of the element
      const x = (clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      // Apply rotation based on mouse position
      gsap.to(wrapper, {
        rotationY: x * 8,
        rotationX: -y * 8,
        transformPerspective: 1000,
        ease: "power1.out",
        duration: 0.5,
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      // Reset to default state with a smooth transition
      gsap.to(wrapper, {
        rotationY: 0,
        rotationX: 0,
        ease: "elastic.out(1, 0.5)",
        duration: 1.5,
        overwrite: 'auto'
      });
    };

    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useGSAP(() => {
    // Hero entrance animation
    const tl = gsap.timeline();
    
    tl.from(headingRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    })
    .from(subTextRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.4")
    .from(socialRef.current.children, {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .from(buttonRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3");
    
    // MUCH MORE DRAMATIC SCROLL EFFECT - Massively increased rotation
    const scrollAngleEffect = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top", 
        scrub: 0.4, // Made scrub faster for more immediate response
      }
    });
    
    // EXTREME tilting on scroll - massively increased angles
    scrollAngleEffect.to(perspectiveWrapperRef.current, {
      rotationX: 45, // Increased from 45 to 80 degrees - MUCH more extreme
      rotationY: -35, // Increased from -35 to -60 degrees
      rotationZ: 0, // Added Z rotation for even more dramatic effect
      scale: 0.2, // Further reduced for more dramatic effect
      y: -100, // Increased vertical movement
      transformOrigin: "center center", 
      transformPerspective: 500, // Enhanced perspective
      ease: "power2.in", // Changed easing for more dramatic entry
    });
    
    // Make text elements respond differently to create depth
    scrollAngleEffect.to(headingRef.current, {
      y: 100,
      rotationX: -25,
      opacity: 0.7,
    }, 0);
    
    // Create additional movement for inner elements to enhance the 3D effect
    scrollAngleEffect.to(heroContentRef.current.querySelector('div'), {
      z: 150, // Push content forward in 3D space
      rotationX: -20, // Counter-rotation to main effect
    }, 0);
    
    // Floating background elements with more dramatic movement - INCREASED OPACITY
    gsap.to(backgroundHeadingRef.current, {
      y: 250,       // Massively increased movement
      x: 180,       // Massively increased movement
      scale: 1.5,   // Added scaling
      opacity: 0.4, // Increased from 0.05 to 0.4 for better visibility
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Floating animation for social icons
    gsap.to(socialRef.current.children, {
      y: -5,
      duration: 1.5,
      ease: "sine.inOut",
      stagger: 0.2,
      repeat: -1,
      yoyo: true
    });
  });

  return (
    <div ref={heroRef} className="relative h-dvh w-screen overflow-hidden bg-dark-200" data-speed="0.95">
      {/* Matrix code rain effect - increased opacity from 0.1 to 0.2 */}
      <canvas 
        ref={codeRainRef} 
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0"
      />

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-neon-green/10 blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-violet-neon/10 blur-[100px]"></div>
      </div>

      {/* Main hero content with perspective effect */}
      <div 
        ref={perspectiveWrapperRef} 
        className="relative z-20 w-full h-full transform-gpu"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        <div ref={heroContentRef} className="absolute left-0 top-0 z-40 size-full flex flex-col justify-center px-5 sm:px-10">
          <div className="transform-gpu" style={{ transform: "translateZ(100px)" }}>
            <h1 ref={headingRef} className="special-font hero-heading text-[#ff0c00] mb-6">
              hi, i am tensor<b>b</b>oy
            </h1>

            <div ref={subTextRef} className="mb-8 max-w-md font-robert-regular text-[#ff0c00]">
              <p className="text-xl mb-3">3x Kaggle Expert | 170K+ Followers | AI Enthusiast</p>
              <p className="opacity-80">Building crazy AI stuff and documenting the journey.</p>
              <p className="opacity-80">Just a tech guy who fucks around with code and builds mind-blowing things.</p>
            </div>

            <div ref={socialRef} className="flex space-x-4 mb-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff0c00] hover:text-[#ff0c00] transition-colors duration-300 text-xl hover:scale-125 transform"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <div ref={buttonRef}>
              <Button
  id="red-pill-button"
  title="Take the Red Pill"
  leftIcon={<TiLocationArrow />}
  containerClass="bg-[#ff0c00] flex-center gap-1 text-black hover:bg-[#ff0c00]/80 hover:scale-105 transform transition-all duration-300"
/>
            </div>
          </div>
        </div>

        {/* Background decorative text - improved visibility */}
        <div style={{ transform: "translateZ(-120px)" }} className="absolute right-0 bottom-0 opacity-90">
          <h1 
            ref={backgroundHeadingRef} 
            className="special-font hero-heading text-[#ff0c00] p-10"
            style={{ 
              fontWeight: "bold"
            }}
          >
            AI <b>E</b>XPERT
          </h1>
        </div>
        
        {/* Perspective grid for visual effect */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-px opacity-15 pointer-events-none">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-blue-neon/20"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;