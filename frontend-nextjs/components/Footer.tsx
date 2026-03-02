'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Footer: React.FC = () => {
  const { colors } = useTheme();

  return (
    <footer className={`${colors.bgPrimary} border-t ${colors.border} pt-16 pb-8 relative overflow-hidden transition-colors duration-300`}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <span className={`text-2xl font-serif font-bold ${colors.textPrimary} tracking-wide transition-colors duration-300`}>
              PORT<span className="text-amber-400">2026</span>
            </span>
            <p className={`${colors.textTertiary} text-sm leading-relaxed transition-colors duration-300`}>
              Crafting extraordinary experiences where technology meets artistry. Join us for the grandest celebration of innovation.
            </p>
          </div>

          <div>
            <h4 className={`${colors.textPrimary} font-serif font-bold text-lg mb-6 transition-colors duration-300`}>Quick Links</h4>
            <ul className={`space-y-3 ${colors.textTertiary} text-sm`}>
              <li>
                <Link href="/events" className="hover:text-amber-400 transition-colors duration-300">All Events</Link>
              </li>
              <li>
                <Link href="/workshops" className="hover:text-amber-400 transition-colors duration-300">Workshops</Link>
              </li>
              <li>
                <Link href="/tickets" className="hover:text-amber-400 transition-colors duration-300">Tickets</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`${colors.textPrimary} font-serif font-bold text-lg mb-6 transition-colors duration-300`}>Contact</h4>
            <ul className={`space-y-4 ${colors.textTertiary} text-sm`}>
              <li>
                <a className="flex items-start space-x-3 hover:text-amber-400 transition-colors duration-300" href="https://maps.app.goo.gl/PtBgsfmxoSJzoBa76?g_st=aw" target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                  <span>Department of Information Technology,<br />Sona College of Technology,<br />Salem</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/sct__it?igsh=MTdxaWVxM252djE4NQ==" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-amber-400 transition-colors duration-300">
                  <Instagram className="w-5 h-5 text-violet-500 shrink-0" />
                  <span>@sct__it</span>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-violet-500 shrink-0" />
                <a href="mailto:port.it@sonatech.ac.in" className="hover:text-amber-400 transition-colors duration-300">port.it@sonatech.ac.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t ${colors.border} pt-8 flex flex-col items-center`}>
          <p className={`${colors.textTertiary} text-sm text-center`}>© 2026 PORT Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
