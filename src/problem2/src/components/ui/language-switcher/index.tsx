import React, { useState } from 'react';
import { IconButton, Tooltip, Box, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (lang: 'en' | 'vi') => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  const isVietnamese = i18n.language === 'vi';
  const getToggleTooltip = () => {
    return `Switch to ${isVietnamese ? 'English' : 'Tiếng Việt'}`;
  };

  return (
    <Box className="fixed top-4 right-20 z-1000">
      <Tooltip title={getToggleTooltip()}>
        <IconButton 
          onClick={handleClick}
          className="bg-background border border-divider shadow-md hover:scale-105 active:scale-95"
        >
          <Box className="flex items-center justify-center">
            <Languages size={20} />
          </Box>
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem 
          onClick={() => handleLanguageSelect('en')}
          selected={i18n.language === 'en'}
        >
          <ListItemIcon>🇺🇸</ListItemIcon>
          <ListItemText>English</ListItemText>
        </MenuItem>
        <MenuItem 
          onClick={() => handleLanguageSelect('vi')}
          selected={i18n.language === 'vi'}
        >
          <ListItemIcon>🇻🇳</ListItemIcon>
          <ListItemText>Tiếng Việt</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
