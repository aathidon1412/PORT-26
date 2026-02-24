'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketTab?: 'port-pass' | 'workshops';
  workshopId?: string | null;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, ticketTab = 'workshops', workshopId }) => {
  const { colors } = useTheme();
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

  const handleOk = () => {
    if (accepted) {
      if (workshopId) {
        router.push(`/tickets?tab=${ticketTab}&workshopId=${workshopId}`);
      } else {
        router.push(`/tickets?tab=${ticketTab}`);
      }
      onClose();
      setAccepted(false);
    }
  };

  const handleClose = () => {
    onClose();
    setAccepted(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-9999 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border shadow-2xl bg-slate-900 border-white/10 flex flex-col"
            style={{ maxHeight: 'calc(100dvh - 2rem)' }}
          >
            {/* ── Sticky header ── */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 shrink-0">
              <h2 className={`text-lg font-bold ${colors.textPrimary}`}>Registration Instructions</h2>
              <button onClick={handleClose} className="p-1.5 rounded-lg transition-colors hover:bg-white/10 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="overflow-y-auto overscroll-contain px-5 py-4 flex-1 min-h-0">
              <ol className={`space-y-2 ${colors.textSecondary} text-xs leading-relaxed`}>
                {[
                  'Review event details before registering.',
                  <span key="2">Registration fee is <strong className={colors.textPrimary}>₹350 per person</strong> for each day (Workshop &amp; Events are charged separately).</span>,
                  'Workshops subject to seat availability.',
                  <span key="4">Day 1: <strong className={colors.textPrimary}>One workshop per person</strong>.</span>,
                  <span key="5" className="font-medium">Lunch and Refreshment will be provided.</span>,
                  <span key="6">Day 2: <strong className={colors.textPrimary}>One registration for all events</strong>.</span>,
                  'Once payment is verified, the ticket will be emailed to the address you provided.',
                  <span key="8">Account holder name in the screenshot must be{' '}<strong className={colors.textPrimary}>"RAJAGOPAL RAMARAO"</strong> and the <strong className={colors.textPrimary}>Transaction ID</strong> must match the screenshot.</span>,
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className={`font-semibold ${colors.textPrimary} shrink-0 tabular-nums`}>{i + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-4 p-3 rounded-lg text-xs leading-relaxed bg-amber-500/10 border border-amber-500/20 text-amber-300">
                <div className="flex items-center gap-1.5 mb-1">
                  <CreditCard className="w-3.5 h-3.5 shrink-0" />
                  <strong>Payment (UPI only):</strong>
                </div>
                Pay via UPI using the QR code on the registration page. Enter your <strong>Transaction ID</strong> and upload a <strong>payment screenshot</strong> showing the name <strong>RAJAGOPAL RAMARAO</strong>. Ticket will be emailed after verification.
              </div>

              <label className={`flex items-center gap-2.5 mt-4 cursor-pointer select-none ${colors.textSecondary} text-sm`}>
                <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="w-4 h-4 rounded border-slate-300 accent-amber-500 cursor-pointer" />
                <span>I accept the terms and conditions <span className="text-red-500">*</span></span>
              </label>
            </div>

            {/* ── Sticky footer ── */}
            <div className="px-5 py-3.5 border-t border-white/10 shrink-0">
              <button
                onClick={handleOk}
                disabled={!accepted}
                className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  accepted
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-md hover:shadow-lg'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                OK
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
