import AnimatedTitle from "./AnimatedTitle";

const Calendly = () => {
  return (
    <div id="contact" className="py-20 bg-dark-100">
      <div className="container mx-auto px-4 text-center">
        <div className="text-center mb-12">
          <p className="font-general text-sm uppercase md:text-[10px] text-[#ff0c00]">
            Let's Connect
          </p>
          
          <AnimatedTitle
            title="Book a c<b>a</b>ll <br /> Let's talk t<b>e</b>ch"
            containerClass="mt-5 !text-white text-center"
          />
          
          <p className="max-w-lg mx-auto mt-6 text-gray-400">
            Want to discuss a collaboration, ask about my projects, or just chat about AI and machine learning? 
            Schedule a 30-minute call with me.
          </p>
        </div>
        <a 
          href="https://calendly.com/sayantannandi13/30min" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block text-sm text-center bg-[#ff0c00]/100 text-white/100 px-6 py-3 rounded-md font-medium hover:bg-[#ff0c00] transition-colors duration-300 shadow-lg hover:shadow-blue-neon/20"
        >
          Schedule Call
        </a>
      </div>
    </div>
  );
};

export default Calendly;