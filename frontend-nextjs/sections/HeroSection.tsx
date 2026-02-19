'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles from '../components/Particles';
import RegistrationModal from '../components/RegistrationModal';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import Image from 'next/image';
import { useTheme } from '../contexts/ThemeContext';

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="mt-16 relative flex items-center justify-center overflow-hidden pt-20" style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* Parallax Background - lowest layer */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 pointer-events-none">
        <ImageWithSkeleton
          src="https://picsum.photos/seed/hero3/1920/1080"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-50"
          containerClassName="w-full h-full"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'light' ? 'from-white/30 via-white/70 to-white' : 'from-slate-950/30 via-slate-950/70 to-slate-950'}`} />
      </motion.div>

      {/* Particles Animation - above background */}
      <div className="absolute inset-0 z-[1]">
        <Particles
          particleCount={150}
          speed={0.3}
          particleColors={['#ffffff', '#e2e8f0']}
          moveParticlesOnHover={false}
          alphaParticles={true}
          particleBaseSize={1.5}
          sizeRandomness={1}
          showConnections={false}
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
          <div className="flex justify-center -my-4 md:-my-8 lg:-my-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-84 h-84 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem]"
            >
              <Image
                src="/assets/imgs/logo.png"
                alt="PORT 26' Logo"
                width={512}
                height={512}
                priority
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]"
              />
            </motion.div>
          </div>
          <p className={`${theme === 'light' ? 'text-slate-700' : 'text-slate-300'} text-base md:text-lg max-w-2xl mx-auto mb-6 mt-0 md:-mt-4 lg:-mt-6 font-light leading-relaxed`}>
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

