'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Event } from '@/types';
import Link from 'next/link';
import ImageWithSkeleton from './ImageWithSkeleton';

interface EventCardPreviewProps {
  event: Event;
}

const EventCardPreview: React.FC<EventCardPreviewProps> = ({ event }) => {
  return (
    <Link href={`/events#${event.id}`} className="block">
      <motion.div
        whileHover={{ y: -10 }}
        className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
      >
        <ImageWithSkeleton
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          containerClassName="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-95" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className={`inline-block px-3 py-1 ${event.category === 'technical'
            ? 'bg-blue-500 text-slate-950'
            : 'bg-pink-500 text-white'
            } text-xs font-bold rounded-full mb-3 uppercase`}>
            {event.category}
          </div>
          <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-400 mb-2 leading-tight transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-slate-300 mb-4 line-clamp-2">
            {event.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-amber-400" />
              <span className="text-sm text-slate-400">
                {event.date}
              </span>
            </div>
            <ArrowRight size={20} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default EventCardPreview;
