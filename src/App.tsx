import { motion, useScroll, useTransform } from 'motion/react';
import { Starfield } from './components/Starfield';
import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasClicked, setHasClicked] = useState(false);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleScreenClick = () => {
    if (!hasClicked) {
      setHasClicked(true);
      // Also unmute on first click if possible
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const { scrollYProgress } = useScroll();

  // Background movement: Video moves up, revealing Starfield below
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const starfieldY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  
  // Opacity for the "Chapter 1" vs "Grandma" text
  const chapter1Opacity = hasClicked ? 0 : 1;
  const grandmaOpacity = hasClicked ? 1 : 0;

  return (
    <div 
      className="relative h-[300vh] w-full bg-bg-deep selection:bg-black/10 overflow-x-hidden"
      onClick={handleScreenClick}
    >
      {/* Moving Background Layer */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 z-10 bg-white overflow-hidden"
      >
        {/* Artistic Video Layer */}
        <div className="absolute inset-0">
          <video 
            ref={videoRef}
            src="/demo1.mp4" 
            autoPlay 
            loop 
            muted
            playsInline 
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-110"
          />
          
          {/* Artistic Overlay: Center dark, edges white (Vignette) */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_0%,white_100%)] opacity-70" />
          
          {/* Darker center for text legibility */}
          <div className="absolute inset-0 pointer-events-none bg-black/20" />
          
          {/* Extra Ink Blotches for organic feel */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white blur-[120px] opacity-90" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-white blur-[150px] opacity-90" />
        </div>
      </motion.div>

      {/* Starfield Layer (Revealed as background moves up) */}
      <motion.div 
        style={{ y: starfieldY }}
        className="fixed inset-0 z-0"
      >
        <Starfield progress={scrollYProgress} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,4,8,0.8)_100%)]" />
      </motion.div>

      {/* Static Text Layer (Stays in middle) */}
      <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
        <div className="text-center px-6 max-w-4xl">
          {/* Chapter 1 Text */}
          <motion.div 
            animate={{ opacity: chapter1Opacity }}
            transition={{ duration: 1 }}
            className={hasClicked ? "hidden" : "block"}
          >
            <div className="text-[14px] uppercase font-bold opacity-80 mb-[12px] tracking-[0.3em] text-white">Segment 01</div>
            <h1 className="font-serif text-[64px] font-bold italic mb-[8px] leading-none text-white drop-shadow-lg">Chapter 1</h1>
            <p className="font-serif text-[18px] font-bold opacity-90 lowercase text-white drop-shadow-md">story preface</p>
            <div className="mt-12 h-px w-12 mx-auto bg-white/50" />
            <div className="mt-8 text-[12px] font-bold opacity-80 uppercase tracking-[0.2em] text-white animate-pulse">
              Click to Enter
            </div>
          </motion.div>

          {/* Grandma Text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: grandmaOpacity }}
            transition={{ duration: 1.5 }}
            className={!hasClicked ? "hidden" : "block"}
          >
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-[0.15em] leading-[1.8] drop-shadow-2xl">
              我的奶奶，<br/>
              是广东省和平县的客家人
            </h2>
            <div className="mt-12 flex flex-col items-center space-y-4">
              <div className="h-12 w-px bg-white/40" />
              <p className="text-white/80 text-[12px] font-bold uppercase tracking-[0.4em] animate-bounce">
                Scroll Down
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Audio Toggle Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); toggleAudio(); }}
        className="fixed bottom-8 right-8 z-50 p-3 bg-black/5 hover:bg-black/10 backdrop-blur-md rounded-full border border-black/10 transition-all duration-300 group"
        title={isMuted ? "开启声音" : "静音"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-black/40 group-hover:text-black transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-black/80 group-hover:scale-110 transition-all" />
        )}
      </button>
    </div>
  );
}
