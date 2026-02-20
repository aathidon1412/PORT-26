'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import RegistrationForm from '@/components/RegistrationForm';
import { useSearchParams } from 'next/navigation';

const qrImg = '/assets/imgs/kpSir350qr.jpeg';
import { WORKSHOPS, PORT_PASS } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';

type TabType = 'workshops' | 'port-pass';

function TicketsContent() {
  const { theme, colors } = useTheme();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('workshops');
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
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
    // Prefer BroadcastChannel when available (client environments).
    if (typeof globalThis !== 'undefined' && (globalThis as any).BroadcastChannel) {
      try {
        const bc = new (globalThis as any).BroadcastChannel('registrations');
        bc.onmessage = () => { fetchCounts(); };
        return () => bc.close();
      } catch (e) {
        // ignore and fall back to storage events
      }
    }

    // fallback: listen to storage events
    const onStorage = (e: StorageEvent) => { if (e.key === 'registration:updated') fetchCounts(); };
    if (typeof globalThis !== 'undefined' && typeof (globalThis as any).addEventListener === 'function') {
      (globalThis as any).addEventListener('storage', onStorage);
      return () => (globalThis as any).removeEventListener('storage', onStorage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle URL parameters to set initial tab
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'port-pass') {
      setActiveTab('port-pass');
    } else if (tabParam === 'workshops') {
      setActiveTab('workshops');
    }
  }, [searchParams]);

  const handleWorkshopClick = (workshopId: string) => {
    setSelectedWorkshop(workshopId);
    setShowForm(true);
  };

  const handlePortPassClick = () => {
    setSelectedWorkshop('port-pass');
    setShowForm(true);
  };

  const getFormTitle = () => {
    if (selectedWorkshop === 'port-pass') {
      return PORT_PASS.title;
    }
    const workshop = WORKSHOPS.find((w) => w.id === selectedWorkshop);
    return workshop?.title || 'Registration';
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-linear-to-br from-slate-50 via-white to-slate-50' : 'bg-linear-to-br from-slate-950 via-slate-900 to-slate-950'} pt-32 pb-24 px-4 overflow-hidden transition-colors duration-300`}>
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute top-20 left-1/4 w-72 h-72 ${theme === 'light' ? 'bg-violet-500/10' : 'bg-violet-600/15'} rounded-full blur-[100px] animate-pulse`} />
        <div className={`absolute bottom-20 right-1/4 w-60 h-60 ${theme === 'light' ? 'bg-indigo-400/10' : 'bg-indigo-500/10'} rounded-full blur-[100px] animate-pulse`} style={{ animationDelay: '1s' }} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${theme === 'light' ? 'bg-amber-400/5' : 'bg-amber-500/5'} rounded-full blur-[120px]`} />
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col md:flex-row items-center justify-center gap-8 mb-12"
      >
        <div className="text-center md:text-right">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-xs uppercase tracking-[0.3em] ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'} mb-3`}
          >
            🎫 Secure Your Spot
          </motion.p>
          <h1 className={`text-4xl sm:text-5xl font-extrabold ${colors.textPrimary} mb-3 transition-colors`}>
            Get Your <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-400">Tickets</span>
          </h1>
          <p className={`${colors.textTertiary} text-sm max-w-md transition-colors duration-300`}>
            Choose workshops or the PORT Pass to access Day 2 events
          </p>
        </div>

        {/* QR Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`relative w-40 h-40 md:w-48 md:h-48 rounded-2xl border overflow-hidden ${theme === 'light' ? 'border-slate-200 shadow-lg' : 'border-white/10 shadow-xl shadow-violet-900/20'} transition-colors`}
        >
          <Image
            src={qrImg}
            alt="Registration QR Code"
            fill
            className="object-contain p-2"
          />
        </motion.div>
      </motion.div>

      {/* Tabs - Hidden when form is displayed */}
      {!showForm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex justify-center gap-3 mb-12"
        >
          <div className={`flex ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-white/10'} backdrop-blur-sm p-1.5 rounded-full border transition-colors duration-300`}>
            {[
              { id: 'workshops', label: 'Workshops — Day 1' },
              { id: 'port-pass', label: 'Event Pass — Day 2' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className="relative px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 z-10"
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-linear-to-r from-violet-600 to-indigo-600 rounded-full shadow-lg shadow-violet-900/50"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${activeTab === tab.id
                    ? 'text-white'
                    : `${colors.textTertiary} ${theme === 'light' ? 'hover:text-slate-900' : 'hover:text-slate-200'}`
                    }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Content Container */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl mx-auto"
      >
        {showForm && selectedWorkshop ? (
          <div className="space-y-6">
            {/* Back Button */}
            <button
              onClick={() => {
                setShowForm(false);
                setSelectedWorkshop(null);
              }}
              className={`flex items-center gap-2 ${colors.textSecondary} hover:${colors.textPrimary} transition-colors mb-4`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Selection
            </button>
            
            <RegistrationForm
              workshopId={selectedWorkshop}
              workshopName={getFormTitle()}
              onSuccess={() => {
                setShowForm(false);
                setSelectedWorkshop(null);
              }}
              onClose={() => {
                setShowForm(false);
                setSelectedWorkshop(null);
              }}
            />
          </div>
        ) : (
          <>
            {/* Workshops Tab */}
            {activeTab === 'workshops' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <h2 className={`text-2xl font-bold ${colors.textPrimary} mb-2 transition-colors`}>
                Master Class Workshops
              </h2>
              <p className={colors.textTertiary}>
                Choose a workshop and register to enhance your skills
              </p>
            </motion.div>

            <div className="grid gap-4">
              {WORKSHOPS.map((workshop, idx) => (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleWorkshopClick(workshop.id)}
                  className={`group cursor-pointer ${theme === 'light' ? 'bg-white border-slate-200 hover:border-violet-400' : 'bg-linear-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 border-white/10 hover:border-violet-500/50'} border rounded-xl p-6 transition-all duration-300 transform hover:scale-105`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className={`inline-block px-3 py-1 ${theme === 'light' ? 'bg-violet-100 text-violet-700' : 'bg-violet-600/30 text-violet-400'} text-xs font-semibold rounded-full mb-2 transition-colors`}>
                        {workshop.domain}
                      </div>
                      <h3 className={`text-xl font-bold ${colors.textPrimary} mb-2 transition-colors`}>
                        {workshop.title}
                      </h3>
                      <p className={`${colors.textTertiary} text-sm line-clamp-2`}>
                        {workshop.description}
                      </p>
                      <div className="text-sm text-slate-400 mt-2">
                        Remaining: {counts[workshop.id] === undefined ? 'Loading…' : Math.max(0, TOTAL_SEATS - counts[workshop.id])} / {TOTAL_SEATS}
                      </div>
                      <div className={`mt-3 flex flex-wrap gap-4 text-xs ${colors.textTertiary}`}>
                        <span>📅 {workshop.date}</span>
                        <span>⏱️ {workshop.duration}</span>
                        <span>👤 {workshop.instructor.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${theme === 'light' ? 'text-amber-600' : 'text-amber-400'} mb-1 transition-colors`}>
                        ₹{workshop.price}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWorkshopClick(workshop.id);
                        }}
                        className="mt-2 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Port Pass Tab */}
        {activeTab === 'port-pass' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <h2 className={`text-2xl font-bold ${colors.textPrimary} mb-2 transition-colors`}>Event Pass</h2>
              <p className={colors.textTertiary}>
                Get exclusive access to all Day 2 events
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`${theme === 'light' ? 'bg-linear-to-br from-violet-100 to-indigo-100 border-violet-300' : 'bg-linear-to-br from-violet-900/50 to-indigo-900/50 border-violet-500/30'} border rounded-2xl p-8 text-center transition-colors`}
            >
              <div className={`inline-block px-4 py-2 ${theme === 'light' ? 'bg-amber-200 text-amber-800' : 'bg-amber-500/30 text-amber-400'} text-sm font-semibold rounded-full mb-4 transition-colors`}>
                Exclusive Access
              </div>
              <h3 className={`text-3xl font-bold ${colors.textPrimary} mb-4 transition-colors`}>
                {PORT_PASS.title}
              </h3>
              <p className={`${colors.textSecondary} mb-6 max-w-xl mx-auto transition-colors`}>
                {PORT_PASS.description}
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className={`${theme === 'light' ? 'bg-white border border-slate-200' : 'bg-slate-800/50'} rounded-lg p-4 transition-colors`}>
                  <div className={`${colors.textTertiary} text-sm mb-2`}>Access Days</div>
                  <div className={`${colors.textPrimary} font-bold transition-colors`}>Full Day - 06-03-2026</div>
                </div>
                <div className={`${theme === 'light' ? 'bg-white border border-slate-200' : 'bg-slate-800/50'} rounded-lg p-4 transition-colors`}>
                  <div className={`${colors.textTertiary} text-sm mb-2`}>Events Included</div>
                  <div className={`${colors.textPrimary} font-bold transition-colors`}>All Day 2 Events</div>
                </div>
                <div className={`${theme === 'light' ? 'bg-white border border-slate-200' : 'bg-slate-800/50'} rounded-lg p-4 transition-colors`}>
                  <div className={`${colors.textTertiary} text-sm mb-2`}>Price</div>
                  <div className={`${theme === 'light' ? 'text-amber-600' : 'text-amber-400'} font-bold text-2xl transition-colors`}>
                    ₹{PORT_PASS.price}
                  </div>
                </div>
              </div>

              <button
                onClick={handlePortPassClick}
                className="bg-linear-to-r from-violet-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Register for Event Pass
              </button>
            </motion.div>
          </motion.div>
        )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function Tickets() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
    </div>}>
      <TicketsContent />
    </Suspense>
  );
}
