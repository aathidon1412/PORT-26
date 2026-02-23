'use client';

import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  };

  if (!visible) return null;

  return (
    <button
      aria-label="Back to top"
      onClick={handleClick}
      className="fixed right-6 bottom-6 z-50 w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-900 flex items-center justify-center shadow-lg transition-all transform hover:-translate-y-1"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTop;
