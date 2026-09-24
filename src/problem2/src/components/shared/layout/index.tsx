import { ReactNode } from 'react';
import { ReduxProvider } from '@/lib/redux/provider';
import { ThemeProvider } from '@/components/ui/theme';
import { Box } from '@mui/material';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeSwitcher } from '@/components/ui/theme/theme-swicher';

const LayoutContent = ({ children }: { children: ReactNode }) => {
    return (
        <Box className="w-screen min-h-screen bg-background text-foreground">
            <LanguageSwitcher />
            <ThemeSwitcher />
            {children}
        </Box>
    );
};

export const SharedLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ReduxProvider>
            <ThemeProvider>
                <LayoutContent>
                    {children}
                </LayoutContent>
            </ThemeProvider>
        </ReduxProvider>
    );
}; 
