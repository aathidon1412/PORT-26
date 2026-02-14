import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Events from './pages/Events';
import Workshops from './pages/Workshops';

import Tickets from './pages/Tickets';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const AppContent: React.FC = () => {
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen ${colors.bgPrimary} ${colors.textPrimary} font-sans selection:bg-amber-500/30 selection:text-amber-200 transition-colors duration-300`}>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/workshops" element={<Workshops />} />

          <Route path="/tickets" element={<Tickets />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
