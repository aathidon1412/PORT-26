import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Music, PenTool } from 'lucide-react';
import { EVENTS, WORKSHOPS } from '../constants';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface TimelineItem {
  time: string;
  title: string;
  desc: string;
}

interface TrackColumnProps {
  title: string;
  icon: React.ReactNode;
  theme: {
    text: string;
    bg: string;
    border: string;
    glow: string;
    line: string;
    dotGlow: string;
    dotSolid: string;
  };
  events: TimelineItem[];
  delayBase: number;
  actionUrl?: string;
}

const TrackColumn: React.FC<TrackColumnProps> = ({ title, icon, theme, events, delayBase, actionUrl }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { theme: appTheme, colors } = useTheme();

  return (
    <div className="relative flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delayBase }}
        className="flex items-center justify-center mb-6 md:mb-8 z-10"
      >
        <div className={`p-2.5 md:p-3 rounded-xl border ${theme.border} ${theme.bg} backdrop-blur-md shadow-lg`}>
          {React.cloneElement(icon as React.ReactElement, { className: `w-4 h-4 md:w-5 md:h-5 ${theme.text}` })}
        </div>
        <h3 className={`ml-2 md:ml-3 text-base md:text-lg font-serif font-bold ${colors.textPrimary} tracking-wide transition-colors duration-300`}>{title}</h3>
      </motion.div>
      {title === 'Workshops' && (
        <div className="flex justify-center mb-4">
          <div className="inline-flex px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
            <span className="text-emerald-400 font-bold text-xs md:text-sm tracking-wider">09:00 AM - 05:00 PM</span>
          </div>
        </div>
      )}
      {title === 'Technical' && (
        <div className="flex justify-center mb-4">
          <div className="inline-flex px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 rounded-full">
            <span className="text-cyan-400 font-bold text-xs md:text-sm tracking-wider">10:00 AM - 01:00 PM</span>
          </div>
        </div>
      )}
      {title === 'Non-Technical' && (
        <div className="flex justify-center mb-4">
          <div className="inline-flex px-4 py-2 bg-fuchsia-500/20 border border-fuchsia-500/40 rounded-full">
            <span className="text-fuchsia-400 font-bold text-xs md:text-sm tracking-wider">02:00 PM - 05:00 PM</span>
          </div>
        </div>
      )}

      {/* Track Line - Desktop & Mobile (Left Aligned on Mobile/Desktop for tightness) */}
      <div className={`absolute top-28 bottom-0 left-6 md:left-8 lg:left-10 w-px bg-gradient-to-b ${theme.line} to-transparent opacity-40`} />

      {/* Timeline Dots are rendered inside each card to keep alignment correct */}

      {/* Events */}
      <div className="space-y-3 md:space-y-4 relative z-10 flex-grow pr-2 md:pr-4">
        {events.map((evt, idx) => {
          let href = actionUrl ?? '#';
          const titleLower = evt.title.toLowerCase();
          const workshopMatch = WORKSHOPS.find(w => w.title.toLowerCase() === titleLower || w.title.toLowerCase().includes(titleLower) || titleLower.includes(w.title.toLowerCase()));
          // Fallback fuzzy/token overlap matcher
          const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
          const getBestMatchByTokens = <T extends { title: string }>(items: T[], q: string): T | undefined => {
            const qTokens = normalize(q);
            if (qTokens.length === 0) return undefined;
            let best: { item?: T; score: number } = { item: undefined, score: 0 };
            for (const it of items) {
              const itTokens = normalize(it.title);
              const common = itTokens.filter(t => qTokens.includes(t));
              const score = common.length / Math.min(itTokens.length, qTokens.length);
              if (score > best.score) best = { item: it, score };
            }
            return best.score >= 0.5 ? best.item : undefined;
          };
          let workshopMatchFinal = workshopMatch;
          if (!workshopMatchFinal) workshopMatchFinal = getBestMatchByTokens(WORKSHOPS, evt.title);
          if (workshopMatchFinal) {
            href = `/workshops#${workshopMatchFinal.id}`;
          } else {
            const eventMatch = EVENTS.find(e => e.title.toLowerCase() === titleLower || e.title.toLowerCase().includes(titleLower) || titleLower.includes(e.title.toLowerCase()));
            let eventMatchFinal = eventMatch;
            if (!eventMatchFinal) eventMatchFinal = getBestMatchByTokens(EVENTS, evt.title as any);
            if (eventMatchFinal) href = `/events#${eventMatchFinal.id}`;
          }

          return (
            <div key={idx} className="relative">
              {/* Dot positioned on the vertical line, centered to the card */}
              <div className="absolute left-6 md:left-8 lg:left-10 -translate-x-1/2 z-20 top-1/2 -translate-y-1/2 pointer-events-none">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: hoveredIndex === idx ? [1, 1.8, 1.8] : 1,
                    opacity: hoveredIndex === idx ? [0.8, 0, 0] : 0
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hoveredIndex === idx ? Infinity : 0,
                    ease: 'easeOut'
                  }}
                  className={`absolute inset-0 w-5 h-5 -m-0.5 rounded-full ${theme.bg} ${theme.border} border`}
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: hoveredIndex === idx ? [1, 2, 2] : 1,
                    opacity: hoveredIndex === idx ? [0.5, 0, 0] : 0
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hoveredIndex === idx ? Infinity : 0,
                    ease: 'easeOut',
                    delay: 0.3
                  }}
                  className={`absolute inset-0 w-5 h-5 -m-0.5 rounded-full ${theme.bg}`}
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  animate={{ scale: hoveredIndex === idx ? 1.3 : 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: delayBase + (idx * 0.15), type: 'spring', stiffness: 300 }}
                  className={`relative w-4 h-4 rounded-full border-2 ${theme.border} transition-all duration-300 ${hoveredIndex === idx ? theme.dotSolid : theme.bg
                    }`}
                  style={{ boxShadow: hoveredIndex === idx ? theme.dotGlow : 'none' }}
                >
                  <motion.div animate={{ opacity: hoveredIndex === idx ? 1 : 0, scale: hoveredIndex === idx ? 1 : 0.5 }} className="absolute inset-1 rounded-full bg-white/80" />
                </motion.div>
              </div>

              <Link to={href} className="block" onClick={() => {
                const parts = String(href).split('#');
                const anchor = parts.length > 1 ? parts[1] : null;
                if (!anchor) return;
                // Try to scroll to anchor after a short delay to allow route change
                setTimeout(() => {
                  const el = document.getElementById(anchor);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 250);
              }}>
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: delayBase + (idx * 0.15) }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative ${appTheme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-900/80 border-white/5'} backdrop-blur-md border p-4 rounded-xl hover:border-opacity-50 transition-all duration-500 group overflow-hidden ${theme.glow} ml-12 md:ml-16 lg:ml-20`}
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                  {/* Hover Gradient Border Effect */}
                  <div className={`absolute inset-0 rounded-lg md:rounded-xl border border-transparent ${theme.border} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div className="flex flex-col relative z-10">
                    <h4 className={`${colors.textPrimary} font-bold text-sm md:text-base transition-colors leading-tight`}>{evt.title}</h4>
                  </div>
                </motion.div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TimelineSection: React.FC = () => {
  const { theme, colors } = useTheme();

  const technicalTrack: TimelineItem[] = [
    { time: '', title: 'THINK IT. LINK IT', desc: '' },
    { time: '', title: 'AI FORGE', desc: '' },
    { time: '', title: 'TWO MINDS, ONE CODE', desc: '' },
    { time: '', title: 'MINDSPRINT', desc: '' },
  ];
  const nonTechTrack: TimelineItem[] = [
    { time: '', title: 'GAME ON: FIFA SHOWDOWN', desc: '' },
    { time: '', title: 'SEARCH FOR SHADES', desc: '' },
    { time: '', title: 'FUN FIESTA', desc: '' },
    { time: '', title: 'GEN-AURORA', desc: '' },
  ];
  const workshopTrack: TimelineItem[] = [
    { time: '', title: 'HACKPROOFING THE FUTURE', desc: '' },
    { time: '', title: 'PROMPT TO PRODUCT', desc: '' },
    { time: '', title: 'FULL STACK FUSION', desc: '' },
    { time: '', title: 'LEARN HOW TO THINK, NOT TO CODE', desc: '' },
  ];

  return (
    <section className={`py-24 ${colors.bgPrimary} relative transition-colors duration-300`}>
      {/* Background noise texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`${theme === 'light' ? 'text-amber-700' : 'text-amber-400'} font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 transition-colors duration-300`}
          >
            The Journey
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold ${colors.textPrimary} mb-6 transition-colors duration-300`}
          >
            Event Timeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${colors.textTertiary} text-lg max-w-2xl mx-auto transition-colors duration-300`}
          >
            Two action-packed days of learning and competition. Curate your own experience from dawn till dusk.
          </motion.p>

        </div>

        {/* Desktop: Single-row layout with labels on top */}
        <div className="hidden md:block mb-12">
          <div className="grid grid-cols-3 items-center gap-4 mb-8 justify-items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center w-full mb-6"
            >
              <div className="inline-flex px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
                <span className="text-emerald-400 font-bold text-sm md:text-base tracking-wider">DAY 1 (05 March 2026) </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-2 flex flex-col items-center justify-center w-full mb-6"
            >
              <div className="inline-flex px-4 py-2 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 mx-auto">
                <span className="font-bold text-sm md:text-base tracking-wider bg-clip-text text-fuchsia-400 ">DAY 2 (06 March 2026)</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-8 lg:gap-10 relative">
            {/* Vertical divider between Day 1 and Day 2 */}
            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            <TrackColumn
              title="Workshops"
              icon={<PenTool />}
              theme={{
                text: 'text-emerald-400',
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/30',
                glow: 'hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.15)]',
                line: 'from-emerald-500/50',
                dotGlow: '0 0 25px 8px rgba(52,211,153,0.7), 0 0 50px 15px rgba(52,211,153,0.3)',
                dotSolid: 'bg-emerald-400'
              }}
              events={workshopTrack}
              delayBase={0}
            />

            <TrackColumn
              title="Technical"
              icon={<Cpu />}
              theme={{
                text: 'text-cyan-400',
                bg: 'bg-cyan-500/10',
                border: 'border-cyan-500/40',
                glow: 'hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)]',
                line: 'from-cyan-500/50',
                dotGlow: '0 0 25px 8px rgba(34,211,238,0.7), 0 0 50px 15px rgba(34,211,238,0.3)',
                dotSolid: 'bg-cyan-400'
              }}
              events={technicalTrack}
              delayBase={0.15}
            />

            <TrackColumn
              title="Non-Technical"
              icon={<Music />}
              theme={{
                text: 'text-fuchsia-400',
                bg: 'bg-fuchsia-500/10',
                border: 'border-fuchsia-500/30',
                glow: 'hover:shadow-[0_0_30px_-5px_rgba(232,121,249,0.15)]',
                line: 'from-fuchsia-500/50',
                dotGlow: '0 0 25px 8px rgba(232,121,249,0.7), 0 0 50px 15px rgba(232,121,249,0.3)',
                dotSolid: 'bg-fuchsia-400'
              }}
              events={nonTechTrack}
              delayBase={0.3}
            />
          </div>
        </div>

        {/* Mobile: Stack with Day 2 label after Workshops */}
        <div className="md:hidden mb-12 space-y-8">
          {/* Day 1 Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <div className="inline-flex px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
              <span className="text-emerald-400 font-bold text-sm tracking-wider">DAY 1 (05 March 2026) </span>
            </div>
          </motion.div>

          {/* Workshops */}
          <TrackColumn
            title="Workshops"
            icon={<PenTool />}
            theme={{
              text: 'text-emerald-400',
              bg: 'bg-emerald-500/10',
              border: 'border-emerald-500/30',
              glow: 'hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.15)]',
              line: 'from-emerald-500/50',
              dotGlow: '0 0 25px 8px rgba(52,211,153,0.7), 0 0 50px 15px rgba(52,211,153,0.3)',
              dotSolid: 'bg-emerald-400'
            }}
            events={workshopTrack}
            delayBase={0}
          />

          {/* Day 2 Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <div className="inline-flex px-4 py-2 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40">
              <span className="font-bold text-sm tracking-wider bg-clip-text text-fuchsia-400 bg-gradient-to-r from-cyan-400 to-purple-400">DAY 2 (06 March 2026)</span>
            </div>
          </motion.div>

          {/* Technical */}
          <TrackColumn
            title="Technical"
            icon={<Cpu />}
            theme={{
              text: 'text-cyan-400',
              bg: 'bg-cyan-500/10',
              border: 'border-cyan-500/40',
              glow: 'hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)]',
              line: 'from-cyan-500/50',
              dotGlow: '0 0 25px 8px rgba(34,211,238,0.7), 0 0 50px 15px rgba(34,211,238,0.3)',
              dotSolid: 'bg-cyan-400'
            }}
            events={technicalTrack}
            delayBase={0.15}
          />

          {/* Non-Technical */}
          <TrackColumn
            title="Non-Technical"
            icon={<Music />}
            theme={{
              text: 'text-fuchsia-400',
              bg: 'bg-fuchsia-500/10',
              border: 'border-fuchsia-500/30',
              glow: 'hover:shadow-[0_0_30px_-5px_rgba(232,121,249,0.15)]',
              line: 'from-fuchsia-500/50',
              dotGlow: '0 0 25px 8px rgba(232,121,249,0.7), 0 0 50px 15px rgba(232,121,249,0.3)',
              dotSolid: 'bg-fuchsia-400'
            }}
            events={nonTechTrack}
            delayBase={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
