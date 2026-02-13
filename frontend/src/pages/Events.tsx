import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Filter, Search, X, Users, Sparkles, Ticket } from 'lucide-react';
import { EVENTS } from '../constants';
import { Event } from '../types';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import RegistrationModal from '../components/RegistrationModal';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

// Load local images from src/assets/events if present (named by event id)
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

const Events: React.FC = () => {
  const { theme, colors } = useTheme();
  const location = useLocation();

  useEffect(() => {
    // location.hash for HashRouter can look like "#/events#eventId" or similar.
    const raw = window.location.hash || location.hash || '';
    const parts = String(raw).split('#');
    const anchor = parts.length > 1 ? parts[parts.length - 1] : null;
    if (!anchor) return;
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, [location.key, location.pathname, location.hash]);
  const [filter, setFilter] = useState<'all' | 'technical' | 'non-technical'>('all');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegModal, setShowRegModal] = useState(false);

  let filteredEvents = EVENTS.filter(event => {
    const matchesFilter = filter === 'all' || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || event.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // When viewing "All" ensure events are shown in alphabetical order
  if (filter === 'all') {
    filteredEvents = filteredEvents.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <div className={`${theme === 'light' ? 'bg-gradient-to-b from-slate-100 to-slate-50' : 'bg-gradient-to-b from-slate-900 to-slate-950'} pb-16 pt-24 border-b ${colors.border} transition-colors duration-300 relative overflow-hidden`}>
        {/* Animated Pricing Banner */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 text-white py-2">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 overflow-hidden">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="flex items-center gap-8 whitespace-nowrap font-bold text-sm md:text-base tracking-wider"
              >
                {/* Content Block 1 */}
                <span className="flex items-center gap-2"><Ticket className="w-4 h-4" /> ALL ACCESS PASS: ₹350 ONLY</span>
                <span className="flex items-center gap-2">• ATTEND EVERY EVENT</span>
                <span className="flex items-center gap-2">• ONE TICKET, LIMITLESS POSSIBILITIES</span>
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> REGISTER ONCE, ACCESS ALL</span>
                <span className="flex items-center gap-2">• ALL ACCESS PASS: ₹350 ONLY</span>
                <span className="flex items-center gap-2">• ATTEND EVERY EVENT</span>

                {/* Content Block 2 (Duplicate for seamless loop) */}
                <span className="flex items-center gap-2"><Ticket className="w-4 h-4" /> ALL ACCESS PASS: ₹350 ONLY</span>
                <span className="flex items-center gap-2">• ATTEND EVERY EVENT</span>
                <span className="flex items-center gap-2">• ONE TICKET, LIMITLESS POSSIBILITIES</span>
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> REGISTER ONCE, ACCESS ALL</span>
                <span className="flex items-center gap-2">• ALL ACCESS PASS: ₹350 ONLY</span>
                <span className="flex items-center gap-2">• ATTEND EVERY EVENT</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-8xl mx-auto px-4 text-center mt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${theme === 'light' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'} border animate-pulse`}
          >
            <Ticket className="w-4 h-4" />
            <span className="font-bold text-sm">All Access Pass: ₹350</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-6xl font-serif font-bold ${colors.textPrimary} mb-6 transition-colors duration-300`}
          >
            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-300">Schedule</span>
          </motion.h1>
          <p className={`${colors.textTertiary} max-w-2xl mx-auto text-lg transition-colors duration-300`}>
            Explore a diverse range of technical challenges and cultural spectacles. <br />
            <span className={`font-semibold ${theme === 'light' ? 'text-violet-700' : 'text-violet-400'}`}>Pay ₹350 and attend any event on the day!</span>
          </p>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 mt-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Tabs */}
          <div className={`flex p-1 ${theme === 'light' ? 'bg-slate-200' : 'bg-white/5'} rounded-xl border ${colors.border} transition-colors duration-300`}>
            {['all', 'technical', 'non-technical'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${filter === tab ? `${theme === 'light' ? 'bg-violet-500' : 'bg-violet-600'} text-white shadow-lg` : `${colors.textTertiary} ${theme === 'light' ? 'hover:text-slate-900' : 'hover:text-white'}`}`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${colors.textTertiary}`} />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full ${theme === 'light' ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-violet-500' : 'bg-slate-900 border-white/10 text-white placeholder-slate-500 focus:border-violet-500'} border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors`}
            />
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredEvents.map((event) => {
              return (
                <motion.div id={event.id}
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`${theme === 'light' ? 'bg-white border-slate-200 hover:border-violet-400' : 'bg-slate-900 border-white/5 hover:border-violet-500/30'} rounded-2xl border overflow-hidden transition-colors group flex flex-col h-full`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithSkeleton
                      src={localEventImages[event.id] ?? event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${event.category === 'technical' ? 'bg-blue-600/90 text-white' : 'bg-pink-600/90 text-white'}`}>
                        {event.type}
                      </span>
                    </div>
                    {event.status === 'filling-fast' && (
                      <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        Filling Fast
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="mb-4">
                      <h3 className={`text-xl font-serif font-bold ${colors.textPrimary} mb-2 ${theme === 'light' ? 'group-hover:text-amber-700' : 'group-hover:text-amber-400'} transition-colors`}>{event.title}</h3>
                      <p className={`${colors.textTertiary} text-sm leading-relaxed line-clamp-2`}>
                        {event.description}
                      </p>
                      {event.detailedDescription && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}
                          className={`mt-2 text-xs font-semibold tracking-wide ${theme === 'light' ? 'text-violet-600 hover:text-amber-700' : 'text-violet-500 hover:text-amber-300'} transition-colors`}
                        >
                          + Read more
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className={`flex items-center ${colors.textTertiary} text-sm`}>
                        <Calendar className={`w-4 h-4 mr-2 ${theme === 'light' ? 'text-violet-600' : 'text-violet-500'}`} />
                        {event.date} • {event.time}
                      </div>
                      <div className={`flex items-center ${colors.textTertiary} text-sm`}>
                        <MapPin className={`w-4 h-4 mr-2 ${theme === 'light' ? 'text-violet-600' : 'text-violet-500'}`} />
                        {event.venue}
                      </div>
                      {event.teamSize && (
                        <div className={`flex items-center ${colors.textTertiary} text-sm`}>
                          <Users className={`w-4 h-4 mr-2 ${theme === 'light' ? 'text-violet-600' : 'text-violet-500'}`} />
                          {event.teamSize}
                        </div>
                      )}
                      {/* Price removed as per request - Global Pass implemented */}
                    </div>

                    <div className="mt-auto">
                      {event.status === 'closed' ? (
                        <div className={`block w-full py-3 text-center rounded-xl font-medium transition-all duration-300 ${theme === 'light' ? 'bg-slate-200 text-slate-500' : 'bg-slate-800 text-slate-500'} cursor-not-allowed`}>
                          Registration Closed
                        </div>
                      ) : (
                        <button onClick={() => setShowRegModal(true)} className={`block w-full py-3 text-center rounded-xl font-medium transition-all duration-300 ${theme === 'light' ? 'bg-slate-100 hover:bg-violet-500 hover:text-white' : 'bg-white/5 hover:bg-violet-600 text-white'} hover:shadow-lg hover:shadow-violet-900/40`}>
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className={`inline-flex justify-center items-center w-16 h-16 rounded-full ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-900'} mb-4 transition-colors duration-300`}>
              <Filter className={`w-8 h-8 ${colors.textTertiary}`} />
            </div>
            <h3 className={`text-xl font-bold ${colors.textPrimary} mb-2 transition-colors duration-300`}>No events found</h3>
            <p className={`${colors.textTertiary} transition-colors duration-300`}>Try adjusting your filters or search query.</p>
            <button
              onClick={() => { setFilter('all'); setSearch(''); }}
              className={`mt-6 ${theme === 'light' ? 'text-amber-700 hover:underline' : 'text-amber-400 hover:underline'}`}
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border ${theme === 'light'
                ? 'bg-white border-slate-200 shadow-2xl'
                : 'bg-slate-900 border-white/10 shadow-2xl shadow-violet-500/10'
                }`}
            >
              {/* Sticky Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className={`sticky top-3 ml-auto mr-3 mt-3 z-20 p-2 rounded-full transition-colors ${theme === 'light' ? 'bg-slate-200/80 hover:bg-slate-300 text-slate-600' : 'bg-black/50 hover:bg-black/70 text-white'
                  } backdrop-blur-sm`}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 -mt-11">
                {/* Modal Image */}
                <div className="relative h-56 overflow-hidden rounded-t-2xl">
                  <ImageWithSkeleton
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${selectedEvent.category === 'technical' ? 'bg-blue-600/90 text-white' : 'bg-pink-600/90 text-white'
                      }`}>
                      {selectedEvent.type}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">{selectedEvent.title}</h2>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8">
                  {/* Short Description */}
                  <p className={`${colors.textTertiary} text-sm leading-relaxed mb-6`}>
                    {selectedEvent.description}
                  </p>

                  {/* Detailed Description */}
                  {selectedEvent.detailedDescription && (
                    <div className={`rounded-xl p-5 mb-6 ${theme === 'light' ? 'bg-slate-50 border border-slate-200' : 'bg-white/5 border border-white/10'}`}>
                      {selectedEvent.detailedDescription.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className={`${idx === 0 ? `font-medium ${colors.textPrimary}` : colors.textTertiary} text-sm leading-relaxed ${idx > 0 ? 'mt-3' : ''}`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Themes Section */}
                  {selectedEvent.themes && selectedEvent.themes.length > 0 && (
                    <div className="mb-6">
                      <h4 className={`text-lg font-serif font-bold ${colors.textPrimary} mb-3`}>Presentation Themes</h4>
                      <div className={`rounded-xl p-5 ${theme === 'light' ? 'bg-slate-50 border border-slate-200' : 'bg-white/5 border border-white/10'}`}>
                        <ul className="space-y-4">
                          {selectedEvent.themes.map((themeItem, idx) => {
                            // Extract domain from "Topic (Domain)" format
                            const match = themeItem.match(/^(.*?)\s*\((.*?)\)$/);
                            const topic = match ? match[1] : themeItem;
                            const domain = match ? match[2] : null;

                            // Get badge color based on domain
                            const getBadgeColor = (d: string) => {
                              const lower = d.toLowerCase();
                              // All domains should use blue theme now
                              if (lower.includes('ai') || lower.includes('ml') || lower.includes('software') || lower.includes('cyber')) {
                                return theme === 'light' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-blue-500/20 text-blue-300 border-blue-500/30';
                              }
                              return theme === 'light' ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-700 text-slate-300 border-slate-600';
                            };

                            return (
                              <li key={idx} className={`flex flex-col sm:flex-row sm:items-start justify-between gap-y-2 gap-x-4 ${colors.textTertiary} text-sm pb-3 border-b ${theme === 'light' ? 'border-slate-100' : 'border-white/5'} last:border-0 last:pb-0`}>
                                <div className="flex items-start gap-3">
                                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${theme === 'light' ? 'bg-violet-500' : 'bg-violet-400'}`} />
                                  <span className={`font-medium leading-relaxed ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>{topic}</span>
                                </div>
                                {domain && (
                                  <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${getBadgeColor(domain)} ml-auto sm:ml-0 self-start sm:self-center`}>
                                    {domain}
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Event Info Grid */}
                  <div className={`grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl ${theme === 'light' ? 'bg-violet-50 border border-violet-100' : 'bg-violet-500/5 border border-violet-500/20'}`}>
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-4 h-4 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
                      <div>
                        <p className={`text-xs ${colors.textTertiary}`}>Date</p>
                        <p className={`text-sm font-medium ${colors.textPrimary}`}>{selectedEvent.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
                      <div>
                        <p className={`text-xs ${colors.textTertiary}`}>Venue</p>
                        <p className={`text-sm font-medium ${colors.textPrimary}`}>{selectedEvent.venue}</p>
                      </div>
                    </div>
                    {selectedEvent.teamSize && (
                      <div className="flex items-center gap-2">
                        <Users className={`w-4 h-4 ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'}`} />
                        <div>
                          <p className={`text-xs ${colors.textTertiary}`}>Team Size</p>
                          <p className={`text-sm font-medium ${colors.textPrimary}`}>{selectedEvent.teamSize}</p>
                        </div>
                      </div>
                    )}
                    {/* Price removed from modal */}
                  </div>

                  {/* Register Button - matches card style */}
                  {selectedEvent.status === 'closed' ? (
                    <div className={`block w-full py-3 text-center rounded-xl font-medium transition-all duration-300 ${theme === 'light' ? 'bg-slate-200 text-slate-500' : 'bg-slate-800 text-slate-500'} cursor-not-allowed`}>
                      Registration Closed
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowRegModal(true)}
                      className={`block w-full py-3 text-center rounded-xl font-medium transition-all duration-300 ${theme === 'light' ? 'bg-slate-100 hover:bg-violet-500 hover:text-white' : 'bg-white/5 hover:bg-violet-600 text-white'
                        } hover:shadow-lg hover:shadow-violet-900/40`}
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <RegistrationModal
        isOpen={showRegModal}
        onClose={() => setShowRegModal(false)}
        ticketTab="events"
      />
    </div>
  );
};

export default Events;
