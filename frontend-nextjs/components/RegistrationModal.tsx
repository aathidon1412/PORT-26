'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketTab?: 'events' | 'workshop';
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, ticketTab = 'events' }) => {
    const { theme, colors } = useTheme();
    const [accepted, setAccepted] = useState(false);
    const router = useRouter();

    const handleOk = () => {
        if (accepted) {
            // Note: The original query param logic might need adjustment if tickets route structure differs,
            // but assuming 'tickets?tab=...' works based on the existing Tickets page tab logic.
            // The Tickets page uses activeTab state, so we might need to handle query params there too if we want direct links.
            // For now, I'll keep the routing logic consistent with the request.
            router.push(`/tickets?tab=${ticketTab}`);
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
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                        className={`relative w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden ${theme === 'light'
                            ? 'bg-white border-slate-200'
                            : 'bg-slate-900 border-white/10'
                            }`}
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between px-6 py-4 border-b ${theme === 'light' ? 'border-slate-200' : 'border-white/10'
                            }`}>
                            <h2 className={`text-xl font-bold ${colors.textPrimary}`}>
                                Registration Instructions
                            </h2>
                            <button
                                onClick={handleClose}
                                className={`p-1.5 rounded-lg transition-colors ${theme === 'light'
                                    ? 'hover:bg-slate-100 text-slate-500'
                                    : 'hover:bg-white/10 text-slate-400'
                                    }`}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-5">
                            <ol className={`space-y-2.5 ${colors.textSecondary} text-sm leading-relaxed`}>
                                <li className="flex gap-2">
                                    <span className={`font-semibold ${colors.textPrimary} shrink-0`}>1.</span>
                                    <span>Review event details before registering.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className={`font-semibold ${colors.textPrimary} shrink-0`}>2.</span>
                                    <span>Registration fee is <strong className={colors.textPrimary}>₹350 per person</strong> for each day (Workshop & Events are charged separately).</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className={`font-semibold ${colors.textPrimary} shrink-0`}>3.</span>
                                    <span>Workshops subject to seat availability.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className={`font-semibold ${colors.textPrimary} shrink-0`}>4.</span>
                                    <span>Day 1: <strong className={colors.textPrimary}>One workshop per person</strong>.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className={`font-semibold shrink-0`}>5.</span>
                                    <span className="font-medium">Lunch and Refreshment will be provided</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className={`font-semibold ${colors.textPrimary} shrink-0`}>6.</span>
                                    <span>Day 2: <strong className={colors.textPrimary}>One registration for all events</strong>.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className={`font-semibold ${colors.textPrimary} shrink-0`}>7.</span>
                                    <span>Once payment is verified, the ticket for the corresponding event will be emailed to the email address you provided.</span>
                                </li>
                            </ol>

                            {/* Payment description */}
                            <div className={`mt-5 p-3.5 rounded-lg text-sm leading-relaxed ${theme === 'light' ? 'bg-amber-50 border border-amber-200 text-amber-900' : 'bg-amber-500/10 border border-amber-500/20 text-amber-300'}`}>
                                <strong>💳 Payment:</strong> Pay using the QR code displayed on the Townscript page. After payment, enter your <strong>Transaction ID</strong> and upload a <strong>transaction screenshot</strong> on the same page. Your ticket will be issued once the payment is verified.
                            </div>

                            {/* Terms checkbox */}
                            <label className={`flex items-center gap-2.5 mt-6 cursor-pointer select-none ${colors.textSecondary} text-sm`}>
                                <input
                                    type="checkbox"
                                    checked={accepted}
                                    onChange={(e) => setAccepted(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 accent-amber-500 cursor-pointer"
                                />
                                <span>I accept the terms and conditions <span className="text-red-500">*</span></span>
                            </label>
                        </div>

                        {/* Footer */}
                        <div className={`px-6 py-4 border-t ${theme === 'light' ? 'border-slate-200' : 'border-white/10'
                            }`}>
                            <button
                                onClick={handleOk}
                                disabled={!accepted}
                                className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${accepted
                                    ? theme === 'light'
                                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg'
                                        : 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-md hover:shadow-lg'
                                    : theme === 'light'
                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
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
