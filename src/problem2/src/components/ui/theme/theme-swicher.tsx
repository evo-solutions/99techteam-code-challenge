import React, { useEffect } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './theme.context';
import { useTranslation } from 'react-i18next';

export const ThemeSwitcher: React.FC = () => {
    const { setTheme, isDark, theme } = useTheme();
    const { t } = useTranslation();

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    const handleToggle = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    const getToggleTooltip = () => {
        return isDark ? t('theme.switchToLight') : t('theme.switchToDark');
    };

    const getIconRotation = () => {
        return isDark ? 'rotate(180deg)' : 'rotate(0deg)';
    };

    return (
        <Box className="fixed top-4 right-4 z-1000">
            <Tooltip title={getToggleTooltip()}>
                <IconButton
                    onClick={handleToggle}
                    className="bg-background border border-divider shadow-md hover:scale-105 active:scale-95"
                >
                    <Box
                        className="flex items-center justify-center transition-transform duration-200 transform"
                        style={{ transform: getIconRotation() }}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </Box>
                </IconButton>
            </Tooltip>
        </Box>
    );
};
