'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  delay: number;
  isCountdown?: boolean;
  targetDate?: string;
}

function AnimatedCounter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (latest) => setDisplayValue(latest));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [to, duration, count, rounded]);

  return <>{displayValue}</>;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, delay, isCountdown = false, targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isInView, setIsInView] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    if (isCountdown && targetDate) {
      const calculateTimeLeft = () => {
        const difference = new Date(targetDate).getTime() - new Date().getTime();
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer);
    }
  }, [isCountdown, targetDate]);

  const parseValue = (val: string) => {
    const num = parseInt(val.replace(/\D/g, ''));
    return isNaN(num) ? 0 : num;
  };

  // split value into leading non-digit prefix and trailing non-digit suffix
  const prefixMatch = value.match(/^(\D*)/);
  const suffixMatch = value.match(/(\D*)$/);
  const prefix = prefixMatch ? prefixMatch[0] : '';
  const suffix = suffixMatch ? suffixMatch[0] : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsInView(true)}
      transition={{
        delay,
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-300 overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent rounded-2xl"
      />

      {/* Shimmer effect on hover */}
      <motion.div
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: delay + 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          whileHover={{
            scale: 1.15,
            rotate: 5,
            transition: { duration: 0.3 }
          }}
          className="p-3 rounded-xl mb-4 bg-violet-900/30 text-violet-300"
        >
          {icon}
        </motion.div>

        {isCountdown && targetDate ? (
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex gap-2 text-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.3 }}
                className="flex flex-col"
              >
                <motion.span
                  whileHover={{ color: '#ffffff' }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl md:text-3xl font-serif font-bold text-white"
                >
                  {timeLeft.days}
                </motion.span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Days</span>
              </motion.div>
              <span className="text-3xl font-bold text-slate-600">:</span>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.4 }}
                className="flex flex-col"
              >
                <motion.span
                  whileHover={{ color: '#ffffff' }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl md:text-3xl font-serif font-bold text-white"
                >
                  {timeLeft.hours.toString().padStart(2, '0')}
                </motion.span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Hrs</span>
              </motion.div>
              <span className="text-3xl font-bold text-slate-600">:</span>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.5 }}
                className="flex flex-col"
              >
                <motion.span
                  whileHover={{ color: '#ffffff' }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl md:text-3xl font-serif font-bold text-white"
                >
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </motion.span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400">Min</span>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.h3
            className="text-3xl md:text-4xl font-serif font-bold mb-2 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3 }}
          >
            {isInView && value.match(/\d+/) ? (
              <>
                {prefix && <span className="mr-1 inline-block">{prefix}</span>}
                <AnimatedCounter from={0} to={parseValue(value)} duration={2} />
                {suffix && <span className="ml-1 inline-block">{suffix}</span>}
              </>
            ) : (
              value
            )}
          </motion.h3>
        )}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4 }}
          className="text-sm font-medium uppercase tracking-wider text-slate-400"
        >
          {label}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default StatCard;
