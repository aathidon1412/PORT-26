import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EVENTS_TOWNSCRIPT_URL } from '../constants';
import { ChevronDown } from 'lucide-react';
import Particles from '../components/Particles';
import RegistrationModal from '../components/RegistrationModal';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import logo from '../assets/imgs/logo.png';
import { useTheme } from '../contexts/ThemeContext';

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-20" style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* Parallax Background - lowest layer */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 pointer-events-none">
        <ImageWithSkeleton
          src="https://picsum.photos/seed/hero3/1920/1080"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-20"
          containerClassName="w-full h-full"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'light' ? 'from-white/30 via-white/70 to-white' : 'from-slate-950/30 via-slate-950/70 to-slate-950'}`} />
      </motion.div>

      {/* Particles Animation - above background */}
      <div className="absolute inset-0 z-[1]">
        <Particles
          particleCount={800}
          particleSpread={10}
          speed={0.1}
          particleColors={['#ffffff', '#aa99ff']}
          moveParticlesOnHover={true}
          particleHoverFactor={1}
          alphaParticles={true}
          particleBaseSize={150}
          sizeRandomness={1}
          cameraDistance={20}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 text-center mt-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="pb-10">
          <h2 className={`${theme === 'light' ? 'text-amber-700' : 'text-amber-400'} font-bold tracking-[0.2em] uppercase text-sm md:text-base underline underline-offset-4`}>
            March 5-6, 2026
          </h2>
          <h3 className={`${theme === 'light' ? 'text-amber-700' : 'text-amber-400'} font-bold tracking-[0.15em] uppercase text-sm md:text-base mt-2 underline underline-offset-4`}>
            Sona College of Technology
          </h3>
          <div className="flex justify-center -my-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-56 h-56 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem]"
            >
              <ImageWithSkeleton
                src={logo}
                alt="PORT 26' Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                containerClassName="w-full h-full"
              />
            </motion.div>
          </div>
          <p className={`${theme === 'light' ? 'text-slate-700' : 'text-slate-300'} text-base md:text-lg max-w-2xl mx-auto mb-6 font-light leading-relaxed`}>
            Where innovation meets excellence. Join us for the most prestigious technical and cultural symposium of the year.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setShowModal(true)} className={`w-full sm:w-auto px-6 py-3 ${theme === 'light' ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-amber-500 hover:bg-amber-400 text-slate-900'} text-lg font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transform hover:-translate-y-1`}>
              Register Now
            </button>
            <a href="/#/events" className={`w-full sm:w-auto px-6 py-3 bg-transparent border ${theme === 'light' ? 'border-slate-300 hover:border-slate-400 text-slate-900 hover:bg-slate-100' : 'border-white/20 hover:border-white/50 text-white hover:bg-white/5'} text-lg font-medium rounded-full transition-all duration-300 backdrop-blur-sm`}>
              Explore Events
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className={`absolute bottom-10 left-1/2 -translate-x-1/2 ${theme === 'light' ? 'text-slate-400' : 'text-white/50'}`}>
        <ChevronDown className="w-8 h-8" />
      </motion.div> */}

      <RegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        ticketTab="workshop"
      />
    </section>
  );
};

export default HeroSection;

