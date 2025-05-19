import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import RedPill from "./components/RedPill";
import Newsletter from "./components/Newsletter";
import Calendly from "./components/Calendly";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import LifeCookbook from "./components/LifeCookbook";
import LoadingOverlay from "./components/LoadingOverlay";
import { AudioProvider } from "./components/AudioController";
import GlobalAudio from "./components/GlobalAudio";

function App() {
  return (
    <AudioProvider>
      <main className="relative min-h-screen w-screen overflow-x-hidden bg-dark-100 text-white">
        <LoadingOverlay />
        <GlobalAudio />
        <ParticleBackground />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <NavBar />
            <Hero />
            <RedPill />
            <LifeCookbook />
            <Newsletter />
            <Calendly />
            <Footer />
          </div>
        </div>
      </main>
    </AudioProvider>
  );
}

export default App;