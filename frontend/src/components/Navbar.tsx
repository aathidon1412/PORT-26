import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Register', path: '/register' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
           <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-amber-400 rounded-lg flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
             <span className="text-white font-bold font-serif text-xl">L</span>
           </div>
           <span className="text-2xl font-serif font-bold text-white tracking-wide">
             PORT<span className="text-amber-400">.</span>
           </span>
        </Link>

        {/* Desktop Nav - Centered Links */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
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
          <Link to="/register">
             <button className="px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-full shadow-lg shadow-violet-900/50 hover:shadow-violet-900/80 hover:scale-105 transition-all duration-300 text-sm">
               Get Tickets
             </button>
          </Link>
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 text-base font-medium border-b border-white/5 ${location.pathname === link.path ? 'text-amber-400' : 'text-slate-300'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
