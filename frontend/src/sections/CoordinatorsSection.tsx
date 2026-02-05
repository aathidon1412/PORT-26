import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Calendar, Phone, Mail, Sparkles } from 'lucide-react';
import { COORDINATORS } from '../constants';

const CoordinatorsSection: React.FC = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium tracking-wide">Our Team</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">Touch</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Have questions? Our dedicated coordinators are here to guide you through PORT 2026.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COORDINATORS.map((coordinator, idx) => (
            <motion.div 
              key={coordinator.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full group-hover:border-white/20 transition-all duration-500">
                {/* Icon */}
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-900/30 group-hover:shadow-violet-900/50 group-hover:scale-110 transition-all duration-300">
                    {coordinator.type === 'faculty' && <Award className="w-7 h-7 text-white" />}
                    {coordinator.type === 'student' && <Users className="w-7 h-7 text-white" />}
                    {coordinator.type === 'college' && <Calendar className="w-7 h-7 text-white" />}
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-50 transition-colors">{coordinator.name}</h3>
                    <p className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium rounded-full">
                      {coordinator.role}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Contact Info */}
                  <div className="space-y-3 pt-2">
                    <a href={`tel:${coordinator.contact}`} className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group/link">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover/link:bg-violet-600/20 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{coordinator.contact}</span>
                    </a>
                    <a href={`mailto:${coordinator.email}`} className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group/link">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover/link:bg-violet-600/20 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{coordinator.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-slate-500 text-sm">
            Can't find what you're looking for? 
            <a href="mailto:contact@port2026.com" className="text-amber-400 hover:text-amber-300 ml-2 underline underline-offset-4">
              Send us an email
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CoordinatorsSection;
