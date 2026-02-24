'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { WORKSHOPS } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';
import RegistrationModal from '@/components/RegistrationModal';
import ImageWithSkeleton from '@/components/ImageWithSkeleton';

const Workshops: React.FC = () => {
  const { colors } = useTheme();
  const [showRegModal, setShowRegModal] = useState(false);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const TOTAL_SEATS = 120;

  const fetchCounts = async () => {
    try {
      const map: Record<string, number> = {};
      await Promise.all(WORKSHOPS.map(async (w) => {
        try {
          const res = await fetch(`/api/workshops/${w.id}?count=true`);
          if (!res.ok) return;
          const data = await res.json();
          if (data && typeof data.count === 'number') map[w.id] = data.count;
        } catch (e) { /* ignore */ }
      }));
      setCounts(map);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    fetchCounts();
    const t = setInterval(fetchCounts, 15000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Listen for registration updates via BroadcastChannel or storage event
    const onUpdate = () => fetchCounts();
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const bc = new BroadcastChannel('registrations');
      bc.onmessage = onUpdate;
      return () => bc.close();
    }
    const onStorage = (e: StorageEvent) => { if (e.key === 'registration:updated') onUpdate(); };
    if (typeof globalThis !== 'undefined' && typeof (globalThis as any).addEventListener === 'function') {
      (globalThis as any).addEventListener('storage', onStorage);
      (globalThis as any).addEventListener('registration:updated', onUpdate as EventListener);
      return () => {
        (globalThis as any).removeEventListener('storage', onStorage);
        (globalThis as any).removeEventListener('registration:updated', onUpdate as EventListener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen pb-12 mt-16">
      {/* Hero (match Events page header design) */}
      <div className={`bg-gradient-to-b from-slate-900 to-slate-950 py-16 border-b ${colors.border} transition-colors duration-300`}>
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
            className={`group relative bg-slate-900 border-white/10 hover:border-violet-500/50 rounded-3xl border overflow-hidden transition-all duration-300 scroll-mt-32`}
          >
            <div className="flex flex-col lg:flex-row">
              <div className="relative w-full h-72 lg:w-2/5 lg:h-auto overflow-hidden">
                <ImageWithSkeleton
                  src={workshop.image}
                  alt={workshop.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  containerClassName="absolute inset-0 w-full h-full"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900`} />
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
                      <span className="flex items-center"><Calendar className={`w-4 h-4 mr-2 text-amber-500`} /> {workshop.date}</span>
                      <span className="flex items-center"><Clock className={`w-4 h-4 mr-2 text-amber-500`} /> {workshop.duration}</span>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className={`text-3xl font-bold text-amber-400`}>₹{workshop.price}</div>
                    <div className={`${colors.textTertiary} text-xs uppercase tracking-wide`}>Registration Fee</div>
                  </div>
                </div>

                {/* Instructor */}
                <div className={`flex items-center mb-8 p-4 bg-white/5 border-white/5 rounded-xl border transition-colors duration-300`}>
                  <div className="w-12 h-12 rounded-full border-2 border-violet-500 mr-4 bg-slate-800 flex items-center justify-center text-sm font-medium text-slate-200">
                    {workshop.instructor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className={`${colors.textPrimary} font-bold transition-colors duration-300`}>{workshop.instructor.name}</div>
                    <div className={`text-violet-400 text-sm`}>{workshop.instructor.role}</div>
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
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20`}>
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    Spots Available
                    <span className="ml-3 text-sm text-slate-300">{counts[workshop.id] === undefined ? 'Loading…' : `${Math.max(0, TOTAL_SEATS - counts[workshop.id])} / ${TOTAL_SEATS} remaining`}</span>
                  </div>
                  <button onClick={() => {
                    setSelectedWorkshopId(workshop.id);
                    setShowRegModal(true);
                  }} className={`w-full sm:w-auto px-8 py-3 bg-white hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors text-center`}>
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <RegistrationModal
        isOpen={showRegModal}
        onClose={() => setShowRegModal(false)}
        ticketTab="workshops"
        workshopId={selectedWorkshopId}
      />

      <script suppressHydrationWarning>
        {`(function(){
          try{if('BroadcastChannel' in window){
            var bc=new BroadcastChannel('registrations');
            bc.onmessage=function(){window.dispatchEvent(new Event('registration:updated'))}
          } else { window.addEventListener('storage', function(e){ if(e.key==='registration:updated') window.dispatchEvent(new Event('registration:updated')) }) }
          }catch(e){}
        })()`}
      </script>
    </div>
  );
};

export default Workshops;
