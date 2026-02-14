import React from 'react';
import { EVENTS_TOWNSCRIPT_URL, WORKSHOPS_TOWNSCRIPT_URL } from '../constants';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { theme, colors } = useTheme();

  return (
    <footer className={`${colors.bgPrimary} border-t ${colors.border} pt-16 pb-8 relative overflow-hidden transition-colors duration-300`}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute top-[-20%] right-[-10%] w-[500px] h-[500px] ${theme === 'light' ? 'bg-violet-500/5' : 'bg-violet-900/10'} rounded-full blur-[100px]`} />
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <span className={`text-2xl font-serif font-bold ${colors.textPrimary} tracking-wide transition-colors duration-300`}>
              PORT<span className={theme === 'light' ? 'text-amber-600' : 'text-amber-400'}>.</span>
            </span>
            <p className={`${colors.textTertiary} text-sm leading-relaxed transition-colors duration-300`}>
              Crafting extraordinary experiences where technology meets artistry. Join us for the grandest celebration of innovation.
            </p>
          </div>

          <div>
            <h4 className={`${colors.textPrimary} font-serif font-bold text-lg mb-6 transition-colors duration-300`}>Quick Links</h4>
            <ul className={`space-y-3 ${colors.textTertiary} text-sm`}>
              <li>
                <Link to="/events" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'} transition-colors duration-300`}>All Events</Link>
              </li>
              <li>
                <Link to="/workshops" className={`${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'} transition-colors duration-300`}>Workshops</Link>
              </li>
              <li>
                <Link to="/tickets" className={`${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'} transition-colors duration-300`}>Tickets</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`${colors.textPrimary} font-serif font-bold text-lg mb-6 transition-colors duration-300`}>Contact</h4>
            <ul className={`space-y-4 ${colors.textTertiary} text-sm`}>
              <a className={`flex items-start space-x-3 ${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'} transition-colors duration-300`} href="https://maps.app.goo.gl/PtBgsfmxoSJzoBa76?g_st=aw" target="_blank" rel="noopener noreferrer">
                <MapPin className={`w-5 h-5 ${theme === 'light' ? 'text-violet-600' : 'text-violet-500'} shrink-0`} />
                <span>Department of Information Technology,<br />Sona College of Technology,<br />Salem</span>
              </a>
              <li className="flex items-center space-x-3">
                <a href="https://www.instagram.com/sona_it_ads_page/" target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-3 ${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'} transition-colors duration-300`}>
                  <Instagram className={`w-5 h-5 ${theme === 'light' ? 'text-violet-600' : 'text-violet-500'} shrink-0`} />
                  <span>@sona_it_ads_page</span>
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className={`w-5 h-5 ${theme === 'light' ? 'text-violet-600' : 'text-violet-500'} shrink-0`} />
                <a href="mailto:port.it@sonatech.ac.in" className={`${theme === 'light' ? 'hover:text-amber-600' : 'hover:text-amber-400'} transition-colors duration-300`}>port.it@sonatech.ac.in</a>
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
