// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

const lightTheme = {
  mode: 'light',
  background: '#ffffff',
  text: '#000000',
  primary: '#a77cf2',
  card: '#f2f2f7',
  border: '#ccc',
};

const darkTheme = {
  mode: 'dark',
  background: '#000000',
  text: '#ffffff',
  primary: '#6e6ef8',
  card: '#1c1c1e',
  border: '#3a3a3c',
};

export type Theme = typeof lightTheme;

type ThemeContextType = {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};