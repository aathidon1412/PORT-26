import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Event } from '../types';

interface EventCardPreviewProps {
  event: Event;
}

const EventCardPreview: React.FC<EventCardPreviewProps> = ({ event }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
  >
    <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />

    <div className="absolute bottom-0 left-0 right-0 p-6">
      <div className="inline-block px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full mb-3 uppercase">
        {event.category}
      </div>
      <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-amber-400 transition-colors">
        {event.title}
      </h3>
      <div className="flex items-center text-slate-300 text-sm mb-4">
        <Calendar className="w-4 h-4 mr-2" />
        {event.date}
      </div>
      <Link to="/events" className="inline-flex items-center text-amber-400 font-medium text-sm group-hover:translate-x-2 transition-transform">
        View Details <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </div>
  </motion.div>
);

export default EventCardPreview;
