'use client';

import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/StatCard';
import { Calendar, Users, Trophy, Award } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const StatsSection: React.FC = () => {
  const { colors } = useTheme();
  // Event date - updated to March 5, 2026
  const eventDate = '2026-03-05T09:00:00';

  return (
    <section className={`py-24 ${colors.bgPrimary} relative transition-colors duration-300`}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-800 to-transparent" />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          <StatCard
            label="Event Starts In"
            value=""
            icon={<Calendar className="w-6 h-6" />}
            delay={0}
            isCountdown={true}
            targetDate={eventDate}
          />
          <StatCard label="Day 1" value="4 Workshops" icon={<Users className="w-6 h-6" />} delay={0.1} />
          <StatCard label="Day 2" value="8 Events" icon={<Trophy className="w-6 h-6" />} delay={0.2} />
          <StatCard label="Prize Pool" value="₹ 25000" icon={<Award className="w-6 h-6" />} delay={0.3} />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
