import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { WORKSHOPS } from '../constants';
import { useLocation } from 'react-router-dom';
import { WORKSHOPS_TOWNSCRIPT_URL } from '../constants';
import { useTheme } from '../contexts/ThemeContext';

const Workshops: React.FC = () => {
  const { theme, colors } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const raw = window.location.hash || location.hash || '';
    const parts = String(raw).split('#');
    const anchor = parts.length > 1 ? parts[parts.length - 1] : null;
    if (!anchor) return;
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, [location.key, location.pathname, location.hash]);
  
  return (
    <div className="min-h-screen pb-12">
      {/* Hero (match Events page header design) */}
      <div className={`${theme === 'light' ? 'bg-gradient-to-b from-slate-100 to-slate-50' : 'bg-gradient-to-b from-slate-900 to-slate-950'} py-16 border-b ${colors.border} transition-colors duration-300`}>
        <div className="max-w-8xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-6xl font-serif font-bold ${colors.textPrimary} mb-6 transition-colors duration-300`}
          >
            Master Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-300">Workshops</span>
          </motion.h1>
          <p className={`${colors.textTertiary} max-w-2xl mx-auto text-lg transition-colors duration-300`}>
            Learn from industry experts. Hands-on sessions designed to elevate your technical prowess and creative thinking.
          </p>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 mt-16 space-y-12">
        {WORKSHOPS.map((workshop, idx) => (
          <motion.div id={workshop.id}
            key={workshop.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`group relative ${theme === 'light' ? 'bg-white border-slate-200 hover:border-violet-400' : 'bg-slate-900 border-white/10 hover:border-violet-500/50'} rounded-3xl border overflow-hidden transition-all duration-300`}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full overflow-hidden">
                <img src={workshop.image} alt={workshop.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'light' ? 'from-white via-transparent' : 'from-slate-900 via-transparent'} to-transparent lg:bg-gradient-to-r lg:from-transparent ${theme === 'light' ? 'lg:to-white' : 'lg:to-slate-900'}`} />
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-medium border border-white/20">
                  {workshop.domain}
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-3xl font-serif font-bold ${colors.textPrimary} mb-2 transition-colors duration-300`}>{workshop.title}</h3>
                    <div className={`flex items-center ${colors.textTertiary} text-sm space-x-6 transition-colors duration-300`}>
                      <span className="flex items-center"><Calendar className={`w-4 h-4 mr-2 ${theme === 'light' ? 'text-amber-700' : 'text-amber-500'}`} /> {workshop.date}</span>
                      <span className="flex items-center"><Clock className={`w-4 h-4 mr-2 ${theme === 'light' ? 'text-amber-700' : 'text-amber-500'}`} /> {workshop.duration}</span>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className={`text-3xl font-bold ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>₹{workshop.price}</div>
                    <div className={`${colors.textTertiary} text-xs uppercase tracking-wide`}>Registration Fee</div>
                  </div>
                </div>

                {/* Instructor */}
                <div className={`flex items-center mb-8 p-4 ${theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/5'} rounded-xl border transition-colors duration-300`}>
                  <img src={workshop.instructor.image} alt={workshop.instructor.name} className="w-12 h-12 rounded-full border-2 border-violet-500 mr-4 object-cover" />
                  <div>
                    <div className={`${colors.textPrimary} font-bold transition-colors duration-300`}>{workshop.instructor.name}</div>
                    <div className={`${theme === 'light' ? 'text-violet-600' : 'text-violet-400'} text-sm`}>{workshop.instructor.role}</div>
                  </div>
                </div>

                <p className={`${colors.textSecondary} mb-8 leading-relaxed transition-colors duration-300`}>
                  {workshop.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {workshop.learnings.map((item, i) => (
                    <div key={i} className={`flex items-center ${colors.textTertiary} text-sm`}>
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className={`mt-auto flex flex-col sm:flex-row items-center justify-between gap-6 border-t ${colors.border} pt-8`}>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${theme === 'light' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    Spots Available
                  </div>
                  <a href={WORKSHOPS_TOWNSCRIPT_URL} target="_blank" rel="noopener noreferrer" className={`w-full sm:w-auto px-8 py-3 ${theme === 'light' ? 'bg-slate-900 hover:bg-amber-700' : 'bg-white hover:bg-amber-400'} ${theme === 'light' ? 'text-white' : 'text-slate-900'} font-bold rounded-lg transition-colors text-center`}>
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Workshops;
