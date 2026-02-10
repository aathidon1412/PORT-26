import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WORKSHOPS } from '../constants';

const Workshops: React.FC = () => {
  return (
    <div className="min-h-screen pb-12">
      {/* Hero */}
      <div className="relative bg-slate-900 py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-violet-900/20 to-transparent" />
        <div className="max-w-8xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h4 className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-4">Skill Development</h4>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Master Class <br />Workshops</h1>
            <p className="text-slate-400 text-lg">
              Learn from industry experts. Hands-on sessions designed to elevate your technical prowess and creative thinking.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 mt-16 space-y-12">
        {WORKSHOPS.map((workshop, idx) => (
          <motion.div
            key={workshop.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-slate-900 rounded-3xl border border-white/10 overflow-hidden hover:border-violet-500/50 transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full overflow-hidden">
                <img src={workshop.image} alt={workshop.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-medium border border-white/20">
                  {workshop.domain}
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-2">{workshop.title}</h3>
                    <div className="flex items-center text-slate-400 text-sm space-x-6">
                      <span className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-amber-500" /> {workshop.date}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-amber-500" /> {workshop.duration}</span>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-3xl font-bold text-amber-400">${workshop.price}</div>
                    <div className="text-slate-500 text-xs uppercase tracking-wide">Registration Fee</div>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center mb-8 p-4 bg-white/5 rounded-xl border border-white/5">
                  <img src={workshop.instructor.image} alt={workshop.instructor.name} className="w-12 h-12 rounded-full border-2 border-violet-500 mr-4" />
                  <div>
                    <div className="text-white font-bold">{workshop.instructor.name}</div>
                    <div className="text-violet-400 text-sm">{workshop.instructor.role}</div>
                  </div>
                </div>

                <p className="text-slate-300 mb-8 leading-relaxed">
                  {workshop.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {workshop.learnings.map((item, i) => (
                    <div key={i} className="flex items-center text-slate-400 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
                  <div className="w-full sm:w-auto">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Seats Filled</span>
                      <span>{workshop.spotsFilled} / {workshop.spotsTotal}</span>
                    </div>
                    <div className="w-full sm:w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-600 to-amber-500"
                        style={{ width: `${(workshop.spotsFilled / workshop.spotsTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                  <Link to="/register" className="w-full sm:w-auto px-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors text-center">
                    Register Now
                  </Link>
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
