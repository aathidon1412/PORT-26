import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EVENTS_TOWNSCRIPT_URL } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../images/Logo 3.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Register', path: '/register' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-slate-950 border-b border-white/10 py-4 shadow-lg">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
          <span className="text-2xl font-serif font-bold text-white tracking-wide">
            PORT <span className="text-amber-400">26'</span>
          </span>
        </Link>

        {/* Desktop Nav - Centered Links */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={scrollToTop}
                className={`relative text-sm uppercase tracking-widest font-medium hover:text-amber-400 transition-colors duration-300 ${location.pathname === link.path ? 'text-amber-400' : 'text-slate-300'}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Get Tickets Button - Right */}
        <div className="hidden md:block">
          <a href={EVENTS_TOWNSCRIPT_URL} target="_blank" rel="noopener noreferrer">
            <button className="px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-full shadow-lg shadow-violet-900/50 hover:shadow-violet-900/80 hover:scale-105 transition-all duration-300 text-sm">
              Get Tickets
            </button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? <X /> : <Menu />}
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
            className="md:hidden bg-slate-950 border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => {
                      setIsOpen(false);
                      scrollToTop();
                    }}
                    className={`block px-3 py-4 text-base font-medium hover:text-amber-400 transition-colors duration-300 ${index !== navLinks.length - 1 ? 'border-b border-white/5' : ''
                      } ${location.pathname === link.path ? 'text-amber-400' : 'text-slate-300'}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
