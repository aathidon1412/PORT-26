import React from 'react';
import { EVENTS_TOWNSCRIPT_URL } from '../constants';
import { ArrowRight } from 'lucide-react';
import EventCardPreview from '../components/EventCardPreview';
import { EVENTS } from '../constants';

const FeaturedEventsSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="relative inline-block mb-2">
              <h2 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent drop-shadow-lg">
                Featured Events
              </h2>
            </div>
            <p className="text-slate-400 max-w-xl">Discover our flagship competitions designed to test your limits.</p>
          </div>
          <a href={EVENTS_TOWNSCRIPT_URL} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors">
            View All Events <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.slice(0, 3).map((event) => (
            <EventCardPreview key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a href={EVENTS_TOWNSCRIPT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium">
            View All Events <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;
