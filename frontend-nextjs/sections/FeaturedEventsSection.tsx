'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import EventCardPreview from '@/components/EventCardPreview';
import { EVENTS } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

const FeaturedEventsSection: React.FC = () => {
  const { colors } = useTheme();

  return (
    <section className="py-24 bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="relative inline-block mb-2">
              <h2 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-lg">
                Featured Events
              </h2>
            </div>
            <p className={`${colors.textTertiary} max-w-xl transition-colors duration-300`}>Discover our flagship competitions designed to test your limits.</p>
          </div>
          <Link href="/events" className="hidden md:flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors">
            View All Events <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.slice(0, 3).map((event) => (
            <EventCardPreview key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/events" className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium">
            View All Events <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;
