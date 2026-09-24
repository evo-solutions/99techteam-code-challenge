import React, { ReactNode, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '@/lib/mui/mui.theme';
import { useTheme } from './theme.context';

interface CustomMuiThemeProviderProps {
  children: ReactNode;
}

export const CustomMuiThemeProvider: React.FC<CustomMuiThemeProviderProps> = ({ children }) => {
  const { isDark } = useTheme();
  const theme = useMemo(() => createAppTheme(isDark), [isDark]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
