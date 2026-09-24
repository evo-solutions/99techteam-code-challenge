import React, { ReactNode } from 'react';
import { ThemeContext, useThemeLogic } from './theme.context';
import { CustomMuiThemeProvider } from './mui-theme.provider';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeValue = useThemeLogic();

  return (
    <ThemeContext.Provider value={themeValue}>
      <CustomMuiThemeProvider>
        {children}
      </CustomMuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { useTheme } from './theme.context';
export type { Theme, ThemeContextType } from './theme.context';
