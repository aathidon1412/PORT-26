import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../sections/HeroSection';
import StatsSection from '../sections/StatsSection';
import AboutSection from '../sections/AboutSection';
import TimelineSection from '../sections/TimelineSection';
import FeaturedEventsSection from '../sections/FeaturedEventsSection';
import CoordinatorsSection from '../sections/CoordinatorsSection';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <TimelineSection />
      <FeaturedEventsSection />
      <CoordinatorsSection />
    </>
  );
};

export default Home;
