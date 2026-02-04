import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <span className="text-2xl font-serif font-bold text-white tracking-wide">
             PORT<span className="text-amber-400">.</span>
            </span>
            <p className="text-slate-400 text-sm leading-relaxed">
              Crafting extraordinary experiences where technology meets artistry. Join us for the grandest celebration of innovation.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/events" className="hover:text-amber-400 transition-colors">All Events</Link></li>
              <li><Link to="/workshops" className="hover:text-amber-400 transition-colors">Workshops</Link></li>
              <li><Link to="/register" className="hover:text-amber-400 transition-colors">Register</Link></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Sponsorship</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-violet-500 shrink-0" />
                <span>University Campus, Grand Hall,<br />Tech City, NY 10012</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-violet-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-violet-500 shrink-0" />
                <span>hello@PORT.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© 2026 PORT Events. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
