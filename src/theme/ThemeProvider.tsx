// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  primary: '#a77cf2',
  card: '#f2f2f7',
  border: '#ccc',
};

const darkTheme = {
  background: '#000000',
  text: '#ffffff',
  primary: '#6e6ef8',
  card: '#2c2c2e',
  border: '#3a3a3c',
};

type Theme = typeof lightTheme;

const ThemeContext = createContext<Theme>(lightTheme);

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};