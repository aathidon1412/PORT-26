import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Phone, Sparkles } from 'lucide-react';
import { COORDINATORS } from '../constants';
import { useTheme } from '../contexts/ThemeContext';

const CoordinatorsSection: React.FC = () => {
  const { theme, colors } = useTheme();

  const faculty = COORDINATORS.filter(c => c.type === 'faculty');
  const students = COORDINATORS.filter(c => c.type === 'student');

  return (
    <section className={`py-32 ${theme === 'light' ? 'bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50' : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'} relative overflow-hidden transition-colors duration-300`}>
      {/* Decorative Elements */}
      <div className={`absolute top-0 left-1/4 w-96 h-96 ${theme === 'light' ? 'bg-violet-500/5' : 'bg-violet-600/10'} rounded-full blur-[120px] pointer-events-none`} />
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${theme === 'light' ? 'bg-amber-400/5' : 'bg-amber-500/10'} rounded-full blur-[120px] pointer-events-none`} />

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
          <div className={`inline-flex items-center gap-2 px-4 py-2 ${theme === 'light' ? 'bg-slate-200/80 border-slate-300' : 'bg-white/5 border-white/10'} border rounded-full mb-6 transition-colors duration-300`}>
            <Sparkles className={`w-4 h-4 ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`} />
            <span className={`${theme === 'light' ? 'text-amber-700' : 'text-amber-400'} text-sm font-medium tracking-wide`}>Our Team</span>
          </div>
          <h2 className={`text-5xl md:text-6xl font-serif font-bold ${colors.textPrimary} mb-6 transition-colors duration-300`}>
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">Touch</span>
          </h2>
          <p className={`${colors.textTertiary} text-lg max-w-xl mx-auto leading-relaxed transition-colors duration-300`}>
            Have questions? Our dedicated coordinators are here to guide you through PORT 2026.
          </p>
        </motion.div>

        {/* Faculty Coordinators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-900/30">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-2xl font-serif font-bold ${colors.textPrimary} transition-colors duration-300`}>Faculty Coordinators</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {faculty.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group relative ${theme === 'light' ? 'bg-white/90 border-slate-200 hover:border-violet-300' : 'bg-white/5 border-white/10 hover:border-violet-500/30'} backdrop-blur-sm border rounded-2xl p-5 transition-all duration-300`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${theme === 'light' ? 'bg-violet-100 text-violet-700' : 'bg-violet-500/15 text-violet-400'} transition-colors duration-300`}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-bold ${colors.textPrimary} transition-colors duration-300`}>{member.name}</h4>
                    <p className={`text-sm ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Student Coordinators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/30">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-2xl font-serif font-bold ${colors.textPrimary} transition-colors duration-300`}>Student Coordinators</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {students.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative"
              >
                {/* Card Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

                <div className={`relative ${theme === 'light' ? 'bg-white/90 border-slate-200 hover:border-amber-300' : 'bg-white/5 border-white/10 hover:border-amber-500/30'} backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${theme === 'light' ? 'bg-amber-100 text-amber-700' : 'bg-amber-500/15 text-amber-400'} transition-colors duration-300`}>
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className={`text-lg font-bold ${colors.textPrimary} transition-colors duration-300`}>{member.name}</h4>
                        <p className={`text-sm ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>{member.role}</p>
                      </div>
                    </div>
                  </div>
                  {member.contact && (
                    <a href={`tel:${member.contact}`} className={`flex items-center gap-3 mt-4 pt-4 border-t ${colors.border} ${colors.textTertiary} ${theme === 'light' ? 'hover:text-slate-900' : 'hover:text-white'} transition-colors group/link`}>
                      <div className={`w-9 h-9 ${theme === 'light' ? 'bg-slate-100 group-hover/link:bg-violet-100' : 'bg-white/5 group-hover/link:bg-violet-600/20'} rounded-lg flex items-center justify-center transition-colors`}>
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{member.contact}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className={`${colors.textTertiary} text-sm transition-colors duration-300`}>
            Can't find what you're looking for? <br className="md:hidden" />
            <a href="mailto:contact@port2026.com" className={`${theme === 'light' ? 'text-amber-700 hover:text-amber-800' : 'text-amber-400 hover:text-amber-300'} md:ml-2 underline underline-offset-4`}>
              Send us an email
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CoordinatorsSection;
