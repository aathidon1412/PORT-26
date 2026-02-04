import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import { Calendar, Users, Trophy, Award } from 'lucide-react';

const StatsSection: React.FC = () => {
  // Event date - adjust this to your actual event date
  const eventDate = '2026-03-15T09:00:00';

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-800 to-transparent" />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <StatCard 
            label="Event Starts In" 
            value="" 
            icon={<Calendar className="w-6 h-6" />} 
            delay={0}
            isCountdown={true}
            targetDate={eventDate}
          />
          <StatCard label="Participants" value="5000+" icon={<Users className="w-6 h-6" />} delay={0.1} />
          <StatCard label="Prize Pool" value="50000$" icon={<Trophy className="w-6 h-6" />} delay={0.2} />
          <StatCard label="Colleges" value="120+" icon={<Award className="w-6 h-6" />} delay={0.3} />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
