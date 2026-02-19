'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import RegistrationForm from '@/components/RegistrationForm';

const qrImg = '/assets/imgs/kpSir350qr.jpeg';
import { WORKSHOPS, PORT_PASS } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';

type TabType = 'workshops' | 'port-pass';

export default function Tickets() {
  const [activeTab, setActiveTab] = useState<TabType>('workshops');
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-24 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-600/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
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
            className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-3"
          >
            🎫 Secure Your Spot
          </motion.p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Tickets</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-md transition-colors duration-300">
            Choose workshops or the PORT Pass to access Day 2 events
          </p>
        </div>

        {/* QR Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl border overflow-hidden border-white/10 shadow-xl shadow-violet-900/20"
        >
          <Image
            src={qrImg}
            alt="Registration QR Code"
            fill
            className="object-contain p-2"
          />
        </motion.div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative flex justify-center gap-3 mb-12"
      >
        <div className="flex bg-slate-900/80 backdrop-blur-sm p-1.5 rounded-full border border-white/10 transition-colors duration-300">
          {[
            { id: 'workshops', label: 'Workshops — Day 1' },
            { id: 'port-pass', label: 'Port Pass — Day 2' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className="relative px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 z-10"
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-lg shadow-violet-900/50"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${activeTab === tab.id
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content Container */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl mx-auto"
      >
        {/* Workshops Tab */}
        {activeTab === 'workshops' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                Master Class Workshops
              </h2>
              <p className="text-slate-400">
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
                  className="group cursor-pointer bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 border border-white/10 hover:border-violet-500/50 rounded-xl p-6 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 bg-violet-600/30 text-violet-400 text-xs font-semibold rounded-full mb-2">
                        {workshop.domain}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {workshop.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-2">
                        {workshop.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                        <span>📅 {workshop.date}</span>
                        <span>⏱️ {workshop.duration}</span>
                        <span>👤 {workshop.instructor.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-400 mb-1">
                        ₹{workshop.price}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWorkshopClick(workshop.id);
                        }}
                        className="mt-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
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
              <h2 className="text-2xl font-bold text-white mb-2">PORT PASS</h2>
              <p className="text-slate-400">
                Get exclusive access to all Day 2 events
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-violet-900/50 to-indigo-900/50 border border-violet-500/30 rounded-2xl p-8 text-center"
            >
              <div className="inline-block px-4 py-2 bg-amber-500/30 text-amber-400 text-sm font-semibold rounded-full mb-4">
                Exclusive Access
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {PORT_PASS.title}
              </h3>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                {PORT_PASS.description}
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-2">Access Days</div>
                  <div className="text-white font-bold">Full Day - 06-03-2026</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-2">Events Included</div>
                  <div className="text-white font-bold">All Day 2 Events</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-2">Price</div>
                  <div className="text-amber-400 font-bold text-2xl">
                    ₹{PORT_PASS.price}
                  </div>
                </div>
              </div>

              <button
                onClick={handlePortPassClick}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Register for PORT Pass
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Registration Form Modal */}
      {showForm && selectedWorkshop && (
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
      )}
    </div>
  );
}
