import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useSearchParams } from 'react-router-dom';
import qrImg from '../assets/imgs/krishnaprakash sir.jpeg';

const tabs = [
    {
        id: 'workshop',
        label: 'Workshop — Day 1',
        src: 'https://www.townscript.com/v2/widget/workshop-of-port-2026/booking',
    },
    {
        id: 'events',
        label: 'Events — Day 2',
        src: 'https://www.townscript.com/v2/widget/port-2026/booking',
    },
];

const Tickets: React.FC = () => {
    const [searchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabParam === 'events' ? 'events' : tabParam === 'workshop' ? 'workshop' : tabs[0].id);
    const activeSrc = tabs.find((t) => t.id === activeTab)!.src;
    const { theme, colors } = useTheme();

    useEffect(() => {
        if (tabParam === 'events' || tabParam === 'workshop') {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    return (
        <section className={`relative min-h-screen ${colors.bgPrimary} pt-32 pb-24 px-4 overflow-hidden transition-colors duration-300`}>
            <link
                rel="stylesheet"
                href="https://www.townscript.com/static/Bookingflow/css/ts-iframe.style.css"
            />

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
                className="relative flex flex-col md:flex-row items-center justify-center gap-8 mb-10"
            >
                {/* Text */}
                <div className="text-center md:text-right">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`text-xs uppercase tracking-[0.3em] ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'} mb-3`}
                    >
                        🎫 Secure Your Spot
                    </motion.p>
                    <h1 className={`text-4xl sm:text-5xl font-extrabold ${colors.textPrimary} mb-3 transition-colors duration-300`}>
                        Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Tickets</span>
                    </h1>
                    <p className={`${colors.textTertiary} text-sm max-w-md transition-colors duration-300`}>
                        Choose your experience below and book your pass for PORT'26
                    </p>
                </div>

                {/* QR Image */}
                <motion.img
                    src={qrImg}
                    alt="Registration QR Code"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`w-40 h-40 md:w-48 md:h-48 object-contain rounded-2xl border ${theme === 'light' ? 'border-slate-200 shadow-lg' : 'border-white/10 shadow-xl shadow-violet-900/20'}`}
                />
            </motion.div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative flex justify-center gap-3 mb-12"
            >
                <div className={`flex ${theme === 'light' ? 'bg-slate-200/80' : 'bg-slate-900/80'} backdrop-blur-sm p-1.5 rounded-full border ${colors.border} transition-colors duration-300`}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 z-10"
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="tab-bg"
                                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full shadow-lg shadow-violet-900/50"
                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                            )}
                            <span className={`relative z-10 ${activeTab === tab.id ? 'text-white' : `${colors.textTertiary} ${theme === 'light' ? 'hover:text-slate-900' : 'hover:text-slate-200'}`}`}>
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Iframe container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative max-w-5xl mx-auto"
            >
                {/* Animated spinning gradient border */}
                <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
                    <div
                        className="absolute inset-0 bg-[conic-gradient(from_0deg,#7c3aed,#4f46e5,#f59e0b,#7c3aed)] opacity-60"
                        style={{
                            animation: 'spin 6s linear infinite',
                        }}
                    />
                </div>

                {/* Glow */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-600/15 via-indigo-600/10 to-amber-500/10 blur-2xl" />

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative rounded-2xl overflow-hidden bg-white shadow-2xl shadow-violet-950/50"
                >
                    <iframe
                        id="ts-iframe"
                        src={activeSrc}
                        frameBorder="0"
                        height="800"
                        width="100%"
                        title="Townscript Booking"
                        style={{ display: 'block' }}
                    />
                </motion.div>
            </motion.div>

            {/* CSS for spinning animation */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg) scale(1.5); }
                    to   { transform: rotate(360deg) scale(1.5); }
                }
            `}</style>
        </section>
    );
};

export default Tickets;
