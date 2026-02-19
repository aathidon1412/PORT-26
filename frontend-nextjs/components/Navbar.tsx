'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Instagram } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import RegistrationModal from './RegistrationModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, colors } = useTheme();

  const [activeHash, setActiveHash] = useState('');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Set initial hash
    setActiveHash(window.location.hash);

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Update hash on pathname change
  useEffect(() => {
    // Delay to ensure browser URL has updated after route change
    const timer = setTimeout(() => {
      setActiveHash(window.location.hash);
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Contact', path: '/#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLinkActive = (path: string) => {
    if (path === '/#contact') {
      return activeHash === '#contact';
    }
    return pathname === path && activeHash !== '#contact';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 ${colors.bgPrimary} border-b ${colors.border} py-4 shadow-lg transition-colors duration-300`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between relative">
        <Link href="/" className="flex items-center space-x-2 group">
          <Image
            src="/assets/imgs/logo.png"
            alt="Logo"
            width={56}
            height={56}
            className="w-10 h-10 lg:w-14 lg:h-14 object-contain transition-all duration-300"
          />
          <span className={`text-xl lg:text-2xl font-serif font-bold ${colors.textPrimary} tracking-wide transition-colors duration-300`}>
            PORT <span className={theme === 'light' ? 'text-amber-600' : 'text-amber-400'}>'26</span>
          </span>
        </Link>

        {/* Desktop Nav - Centered Links */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  if (link.name === 'Contact') {
                    e.preventDefault();
                    setActiveHash('#contact');
                    if (pathname !== '/') {
                      router.push('/#contact');
                      setTimeout(() => scrollToElement('contact'), 100);
                    } else {
                      window.history.pushState(null, '', '/#contact');
                      scrollToElement('contact');
                    }
                  } else {
                    setActiveHash('');
                    scrollToTop();
                  }
                }}
                className={`relative text-sm uppercase tracking-widest font-medium transition-colors duration-300 ${isLinkActive(link.path)
                  ? theme === 'light' ? 'text-amber-600' : 'text-amber-400'
                  : `${colors.textSecondary} ${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'}`
                  }`}
              >
                {link.name}
                {((pathname === link.path && !link.path.includes('#') && activeHash !== '#contact') || (link.name === 'Contact' && activeHash === '#contact')) && (
                  <motion.div layoutId="underline" className={`absolute -bottom-1 left-0 right-0 h-0.5 ${theme === 'light' ? 'bg-amber-600' : 'bg-amber-400'}`} />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Instagram, Theme Toggle & Get Tickets - Right */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="https://www.instagram.com/sona_it_ads_page/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 ${colors.textSecondary} ${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'} transition-colors duration-300`}
          >
            <Instagram className="w-5 h-5" />
          </a>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${colors.bgSecondary} ${colors.textPrimary} hover:scale-110 transition-all duration-300 shadow-md`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setShowRegistrationModal(true)}
            className={`px-6 py-2 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-full shadow-lg ${theme === 'light' ? 'shadow-violet-500/50 hover:shadow-violet-500/80' : 'shadow-violet-900/50 hover:shadow-violet-900/80'} hover:scale-105 transition-all duration-300 text-sm`}
          >
            Get Tickets
          </button>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${colors.bgSecondary} ${colors.textPrimary} transition-all duration-300`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className={`${colors.textPrimary} p-2`}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`lg:hidden ${colors.bgPrimary} border-b ${colors.border} overflow-hidden transition-colors duration-300`}
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <div className="flex items-center justify-start gap-3 px-3 py-2">
                <Instagram className="w-5 h-5" />
              </div>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.path}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (link.name === 'Contact') {
                        e.preventDefault();
                        setActiveHash('#contact');
                        if (pathname !== '/') {
                          router.push('/#contact');
                          setTimeout(() => scrollToElement('contact'), 100);
                        } else {
                          window.history.pushState(null, '', '/#contact');
                          scrollToElement('contact');
                        }
                      } else {
                        setActiveHash('');
                        scrollToTop();
                      }
                    }}
                    className={`block px-3 py-4 text-base font-medium transition-colors duration-300 border-b ${colors.border} ${isLinkActive(link.path)
                      ? theme === 'light' ? 'text-amber-600' : 'text-amber-400'
                      : `${colors.textSecondary} ${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'}`
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                className="pt-2"
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowRegistrationModal(true);
                  }}
                  className="block w-full text-center px-3 py-3 rounded-xl font-bold text-sm bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg"
                >
                  Get Tickets
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        ticketTab="workshops"
      />
    </nav>
  );
};

export default Navbar;
