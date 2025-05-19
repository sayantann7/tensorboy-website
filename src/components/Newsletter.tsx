import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { FaRocket } from "react-icons/fa";
import { useState, useRef } from "react";
import { gsap } from "gsap";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const rocketRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    // Animation for rocket
    gsap.to(rocketRef.current, {
      y: -100,
      x: 50,
      opacity: 0,
      rotate: 45,
      duration: 1,
      onComplete: () => {
        setSubmitted(true);
        setEmail("");
      }
    });
  };

  return (
    <div id="newsletter" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-dark-200 py-24 text-white sm:overflow-hidden">
        <div className="hidden sm:block absolute top-0 right-10 w-64 h-64">
          <div className="absolute transform rotate-45 w-full h-full bg-gradient-to-br from-[#ff0c00]/30 to-transparent rounded-full blur-xl"></div>
        </div>
        
        <div className="hidden sm:block absolute bottom-0 left-10 w-48 h-48">
          <div className="absolute transform w-full h-full bg-gradient-to-tr from-[#ff0c00]/20 to-transparent rounded-full blur-xl"></div>
        </div>

        <div className="flex flex-col items-center text-center px-4">
          <p className="mb-6 font-general text-[10px] uppercase text-[#ff0c00]">
            Join the 55K+ Community
          </p>

          <AnimatedTitle
            title="Get <b>a</b>i tips & <br /> plug-and-play <b>c</b>ode"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <p className="max-w-lg mt-6 mb-8 text-gray-400">
            Subscribe to receive AI tutorials, ready-to-use code snippets, and updates on my latest projects. 
            No spam, just valuable tech insights delivered to your inbox.
          </p>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg bg-dark-300 border border-[#ff0c00]/50 focus:border-[#ff0c00] focus:outline-none text-white"
                required
              />
              <Button 
                title="Subscribe" 
                containerClass="cursor-pointer bg-[#ff0c00]"
                rightIcon={<FaRocket ref={rocketRef} />} 
              />
            </form>
          ) : (
            <div className="bg-dark-300/50 border border-neon-green/30 rounded-lg p-6 max-w-md">
              <h3 className="text-[#ff0c00] text-xl mb-2">🎉 You're in!</h3>
              <p className="text-gray-300">
                Check your inbox to confirm your subscription. Can't wait to share some awesome AI content with you!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;