import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Instagram } from 'lucide-react';
import logo from '../assets/imgs/logo.png';
import logo1 from '../assets/imgs/logo1.jpeg';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, colors } = useTheme();

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
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 ${colors.bgPrimary} border-b ${colors.border} py-4 shadow-lg transition-colors duration-300`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
          <span className={`text-2xl font-serif font-bold ${colors.textPrimary} tracking-wide transition-colors duration-300`}>
            PORT <span className={theme === 'light' ? 'text-amber-600' : 'text-amber-400'}>26'</span>
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
                className={`relative text-sm uppercase tracking-widest font-medium transition-colors duration-300 ${location.pathname === link.path
                  ? theme === 'light' ? 'text-amber-600' : 'text-amber-400'
                  : `${colors.textSecondary} ${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'}`
                  }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div layoutId="underline" className={`absolute -bottom-1 left-0 right-0 h-0.5 ${theme === 'light' ? 'bg-amber-600' : 'bg-amber-400'}`} />
                )}
              </Link>
            ))}
            <a
              href={logo1}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative text-sm uppercase tracking-widest font-medium transition-colors duration-300 ${colors.textSecondary} ${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}
            >
              Brochure
            </a>
          </div>
        </div>

        {/* Instagram, Theme Toggle & Get Tickets - Right */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://www.instagram.com/sona_it_ads_page/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 ${colors.textSecondary} ${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'} transition-colors duration-300`}
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm font-medium">@sona_it_ads_page</span>
          </a>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${colors.bgSecondary} ${colors.textPrimary} hover:scale-110 transition-all duration-300 shadow-md`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <Link to="/tickets" onClick={scrollToTop}>
            <button className={`px-6 py-2 bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} text-white font-medium rounded-full shadow-lg ${theme === 'light' ? 'shadow-violet-500/50 hover:shadow-violet-500/80' : 'shadow-violet-900/50 hover:shadow-violet-900/80'} hover:scale-105 transition-all duration-300 text-sm`}>
              Get Tickets
            </button>
          </Link>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${colors.bgSecondary} ${colors.textPrimary} transition-all duration-300`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className={`${colors.textPrimary} p-2`}>
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
            className={`md:hidden ${colors.bgPrimary} border-b ${colors.border} overflow-hidden transition-colors duration-300`}
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
                <div className="flex items-center justify-start gap-3 px-3 py-2">
                  <Instagram className="w-5 h-5" />
                  <a href="https://www.instagram.com/sona_it_ads_page/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium">
                    @sona_it_ads_page
                  </a>
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
                    to={link.path}
                    onClick={() => {
                      setIsOpen(false);
                      scrollToTop();
                    }}
                    className={`block px-3 py-4 text-base font-medium transition-colors duration-300 border-b ${colors.border} ${location.pathname === link.path
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
              >
                <a
                  href={logo1}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 text-base font-medium transition-colors duration-300 border-b ${colors.border} ${colors.textSecondary} ${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'}`}
                >
                  Brochure
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                className="pt-2"
              >
                <Link
                  to="/tickets"
                  onClick={() => {
                    setIsOpen(false);
                    scrollToTop();
                  }}
                  className={`block w-full text-center px-3 py-3 rounded-xl font-bold text-sm bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} text-white shadow-lg`}
                >
                  Get Tickets
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
