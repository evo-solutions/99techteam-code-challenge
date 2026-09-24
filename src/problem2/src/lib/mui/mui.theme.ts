import { createTheme } from '@mui/material/styles';

const CSS_VARS = {
  primary: 'hsl(var(--primary))',
  primaryForeground: 'hsl(var(--primary-foreground))',
  secondary: 'hsl(var(--secondary))',
  secondaryForeground: 'hsl(var(--secondary-foreground))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  card: 'hsl(var(--card))',
  cardForeground: 'hsl(var(--card-foreground))',
  muted: 'hsl(var(--muted))',
  mutedForeground: 'hsl(var(--muted-foreground))',
  accent: 'hsl(var(--accent))',
  accentForeground: 'hsl(var(--accent-foreground))',
  destructive: 'hsl(var(--destructive))',
  destructiveForeground: 'hsl(var(--destructive-foreground))',
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
} as const;

const TYPOGRAPHY = {
  fontFamily: ['Roboto', 'sans-serif'].join(','),
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
} as const;

export const createAppTheme = (isDark: boolean) => {
  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: { main: CSS_VARS.primary },
      secondary: { main: CSS_VARS.secondary },
      background: {
        default: CSS_VARS.background,
        paper: CSS_VARS.card,
      },
      text: {
        primary: CSS_VARS.foreground,
        secondary: CSS_VARS.mutedForeground,
      },
      divider: CSS_VARS.border,
      error: { main: CSS_VARS.destructive },
    },
    typography: TYPOGRAPHY,
    shape: {
      borderRadius: 8,
    },
  });
};

