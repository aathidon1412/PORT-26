'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  accentHover: string;
  border: string;
  gradientFrom: string;
  gradientTo: string;
  cardBg: string;
  cardBgHover: string;
  overlay: string;
}

interface ThemeContextType {
  colors: ThemeColors;
}

const darkThemeColors: ThemeColors = {
  bgPrimary: 'bg-slate-950',
  bgSecondary: 'bg-slate-900',
  bgTertiary: 'bg-slate-800',
  textPrimary: 'text-slate-50',
  textSecondary: 'text-slate-300',
  textTertiary: 'text-slate-400',
  accent: 'text-amber-400',
  accentHover: 'hover:text-amber-300',
  border: 'border-white/10',
  gradientFrom: 'from-violet-600',
  gradientTo: 'to-indigo-600',
  cardBg: 'bg-slate-900',
  cardBgHover: 'hover:bg-slate-800',
  overlay: 'bg-slate-950/60',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ colors: darkThemeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
