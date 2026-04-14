import { motion } from 'motion/react';
import { Starfield } from './components/Starfield';

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg-deep selection:bg-white/20">
      {/* Background Starfield & Nebula */}
      <div className="absolute inset-0 z-0">
        <Starfield />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,var(--color-nebula-purple)_0%,transparent_40%),radial-gradient(circle_at_70%_60%,var(--color-nebula-blue)_0%,transparent_40%)]" />
      </div>

      {/* Content Overlay */}
      <main className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="text-center tracking-[0.2em] -translate-y-[20px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 2.5, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5 
            }}
          >
            <motion.div 
              className="text-[14px] uppercase font-light opacity-60 mb-[12px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 2, delay: 1 }}
            >
              Segment 01
            </motion.div>
            
            <motion.h1 
              className="font-serif text-[64px] font-[200] italic mb-[8px] leading-none text-white"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 3, delay: 1.5 }}
            >
              Chapter 1
            </motion.h1>

            <motion.p 
              className="font-serif text-[18px] font-light opacity-80 lowercase text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 2, delay: 2.5 }}
            >
              story preface
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Element */}
        <motion.div 
          className="absolute bottom-[40px] w-[60px] h-px bg-white/30"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 3.5 }}
        />

        {/* UI Hint */}
        <motion.div 
          className="absolute bottom-[30px] text-[10px] opacity-40 uppercase tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 4 }}
        >
          Move Cursor to Explore Horizon
        </motion.div>
      </main>

      {/* Vignette effect */}
      <div className="pointer-events-none fixed inset-0 z-20 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}
