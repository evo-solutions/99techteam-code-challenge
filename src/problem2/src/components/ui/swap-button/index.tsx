import React from 'react';
import { Box, IconButton } from '@mui/material';
import { SwapHoriz as SwapIcon } from '@mui/icons-material';
import { useTheme } from '@/components/ui/theme';

interface SwapButtonProps {
  onSwap: () => void;
  disabled?: boolean;
}

export const SwapButton: React.FC<SwapButtonProps> = ({
  onSwap,
  disabled = false,
}) => {
  const { isDark } = useTheme();
  
  return (
    <Box className="flex justify-center !m-0">
      <IconButton
        onClick={onSwap}
        disabled={disabled}
        className={`transition-all duration-300 hover:scale-110 hover:rotate-180 ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}
        size="large"
        sx={{
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: isDark ? '#374151' : '#f3f4f6',
            transform: 'scale(1.1) rotate(180deg)',
            boxShadow: isDark
              ? '0 4px 12px rgba(0, 0, 0, 0.3)'
              : '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          '&:disabled': {
            opacity: 0.5,
            transform: 'none',
          },
        }}
      >
        <SwapIcon className={isDark ? 'text-gray-300' : 'text-gray-600'} />
      </IconButton>
    </Box>
  );
};

export default SwapButton;
