import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Music, PenTool, MapPin } from 'lucide-react';
import { EVENTS, WORKSHOPS } from '../constants';

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
        <h3 className="ml-2 md:ml-3 text-base md:text-lg font-serif font-bold text-white tracking-wide">{title}</h3>
      </motion.div>

      {/* Track Line - Desktop & Mobile (Left Aligned on Mobile/Desktop for tightness) */}
      <div className={`absolute top-14 bottom-0 left-6 md:left-8 lg:left-10 w-px bg-gradient-to-b ${theme.line} to-transparent opacity-40`} />

      {/* Timeline Dots are rendered inside each card to keep alignment correct */}

      {/* Events */}
      <div className="space-y-3 md:space-y-4 relative z-10 flex-grow pr-2 md:pr-4">
        {events.map((evt, idx) => {
          let href = actionUrl ?? '#';
          const titleLower = evt.title.toLowerCase();
          const workshopMatch = WORKSHOPS.find(w => w.title.toLowerCase() === titleLower || w.title.toLowerCase().includes(titleLower) || titleLower.includes(w.title.toLowerCase()));
          if (workshopMatch) {
            href = `/#/workshops#${workshopMatch.id}`;
          } else {
            const eventMatch = EVENTS.find(e => e.title.toLowerCase() === titleLower || e.title.toLowerCase().includes(titleLower) || titleLower.includes(e.title.toLowerCase()));
            if (eventMatch) href = `/#/events#${eventMatch.id}`;
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

              <a href={href} className="block">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: delayBase + (idx * 0.15) }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative bg-slate-900/80 backdrop-blur-md border border-white/5 p-4 rounded-xl hover:border-opacity-50 transition-all duration-500 group overflow-hidden ${theme.glow} ml-12 md:ml-16 lg:ml-20`}
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                  {/* Hover Gradient Border Effect */}
                  <div className={`absolute inset-0 rounded-lg md:rounded-xl border border-transparent ${theme.border} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div className="flex flex-col relative z-10">
                    <div className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md ${theme.bg} ${theme.border} border mb-3 self-start`}>
                      <span className={`text-[10px] md:text-xs font-bold ${theme.text} tracking-wider`}>{evt.time}</span>
                    </div>
                    <h4 className="text-white font-bold text-sm md:text-base mb-2 group-hover:text-white transition-colors leading-tight">{evt.title}</h4>
                    <div className="text-slate-500 text-[10px] md:text-xs flex items-center">
                      <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1 opacity-70" /> {evt.desc}
                    </div>
                  </div>
                </motion.div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TimelineSection: React.FC = () => {
  const technicalTrack: TimelineItem[] = [
    { time: 'TBA', title: 'Think it. Link it', desc: 'TBA' },
    { time: 'TBA', title: 'AI FORGE', desc: 'TBA' },
    { time: 'TBA', title: 'Two Minds, One Code', desc: 'TBA' },
    { time: 'TBA', title: 'MINDSPRINT', desc: 'TBA' },
  ];
  const nonTechTrack: TimelineItem[] = [
    { time: 'TBA', title: 'GAME ON: FIFA SHOWDOWN', desc: 'TBA' },
    { time: 'TBA', title: 'Search for Shades', desc: 'TBA' },
    { time: 'TBA', title: 'Fun Fiesta', desc: 'TBA' },
    { time: 'TBA', title: 'Gen-Aurora', desc: 'TBA' },
  ];
  const workshopTrack: TimelineItem[] = [
    { time: '09:30 AM', title: 'Gen AI Masterclass', desc: 'Computer Lab 1' },
    { time: '12:00 PM', title: 'UI/UX Design Systems', desc: 'Design Studio' },
    { time: '02:30 PM', title: 'Cloud Architecture', desc: 'Computer Lab 2' },
  ];

  return (
    <section className="py-24 bg-slate-950 relative">
      {/* Background noise texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-amber-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4"
          >
            The Journey
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
          >
            Event Timeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
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
              className="flex items-center justify-center w-full"
            >
              <div className="inline-flex px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
                <span className="text-emerald-400 font-bold text-sm md:text-base tracking-wider">DAY 1</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-2 flex items-center justify-center w-full"
            >
              <div className="inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 border border-cyan-500/30 mx-auto">
                <span className="font-bold text-sm md:text-base tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">DAY 2</span>
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
                border: 'border-cyan-500/30',
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
            className="flex items-center justify-center"
          >
            <div className="inline-flex px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
              <span className="text-emerald-400 font-bold text-sm tracking-wider">DAY 1</span>
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
            className="flex items-center justify-center"
          >
            <div className="inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 border border-cyan-500/30">
              <span className="font-bold text-sm tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">DAY 2</span>
            </div>
          </motion.div>

          {/* Technical */}
          <TrackColumn
            title="Technical"
            icon={<Cpu />}
            theme={{
              text: 'text-cyan-400',
              bg: 'bg-cyan-500/10',
              border: 'border-cyan-500/30',
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
