import React from 'react';
import { motion } from 'framer-motion';
import { EVENTS_TOWNSCRIPT_URL } from '../constants';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Event } from '../types';
import { useTheme } from '../contexts/ThemeContext';

// Load any local images placed in src/assets/events named like <id>.jpg/png/webp
const localEventImages: Record<string, string> = (() => {
  const modules = import.meta.glob('../assets/events/*.{jpg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>;
  const map: Record<string, string> = {};
  Object.entries(modules).forEach(([path, url]) => {
    const file = path.split('/').pop() || path;
    const name = file.split('.').slice(0, -1).join('.');
    map[name] = url;
  });
  return map;
})();

interface EventCardPreviewProps {
  event: Event;
}

const EventCardPreview: React.FC<EventCardPreviewProps> = ({ event }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
    >
      <img src={localEventImages[event.id] ?? event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'light' ? 'from-white via-white/40' : 'from-slate-950 via-slate-950/40'} to-transparent opacity-90`} />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className={`inline-block px-3 py-1 ${theme === 'light' ? 'bg-amber-600 text-white' : 'bg-amber-500 text-slate-950'} text-xs font-bold rounded-full mb-3 uppercase`}>
          {event.category}
        </div>
        <h3 className={`text-2xl font-serif font-bold ${theme === 'light' ? 'text-slate-900 group-hover:text-amber-700' : 'text-white group-hover:text-amber-400'} mb-2 leading-tight transition-colors`}>
          {event.title}
        </h3>
        <div className={`flex items-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'} text-sm mb-4`}>
          <Calendar className="w-4 h-4 mr-2" />
          {event.date}
        </div>
        <a href={EVENTS_TOWNSCRIPT_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'} font-medium text-sm group-hover:translate-x-2 transition-transform`}>
          View Details <ArrowRight className="w-4 h-4 ml-2" />
        </a>
      </div>
    </motion.div>
  );
};

export default EventCardPreview;
