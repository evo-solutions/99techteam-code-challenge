import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TokenOption } from '@/services/token.type';
import TokenSelector from '@/components/ui/token-selector';
import { isValidAmount } from '@/utils/token.utils';

interface TokenInputProps {
  tokens: TokenOption[];
  selectedToken: string;
  amount: string;
  label: string;
  amountLabel: string;
  excludeToken?: string;
  isLoading?: boolean;
  readOnly?: boolean;
  tokenError?: string;
  amountError?: string;
  onTokenChange: (token: string) => void;
  onAmountChange?: (amount: string) => void;
  fromToken?: string;
}

export const TokenInput: React.FC<TokenInputProps> = ({
  tokens,
  selectedToken,
  amount,
  label,
  amountLabel,
  excludeToken,
  isLoading = false,
  readOnly = false,
  tokenError,
  amountError,
  onTokenChange,
  onAmountChange,
  fromToken,
}) => {
  const { t } = useTranslation();
  const [localAmountError, setLocalAmountError] = useState<string>('');

  const handleAmountChange = (value: string) => {
    if (readOnly || !onAmountChange) {
      return;
    }

    const cleanedValue = value.replace(/[^\d.-]/g, '');
    if (cleanedValue && !isValidAmount(cleanedValue)) {
      setLocalAmountError(t('validation.invalidAmount'));
    } else if (cleanedValue && parseFloat(cleanedValue) <= 0) {
      setLocalAmountError(t('validation.minAmount'));
    } else {
      setLocalAmountError('');
    }
    onAmountChange(cleanedValue);
  };

  const displayError = amountError || localAmountError;

  return (
    <Box className="space-y-4">
      <TokenSelector
        value={selectedToken}
        onChange={onTokenChange}
        tokens={tokens}
        label={label}
        placeholder={t('swap.selectToken')}
        excludeToken={excludeToken}
        error={tokenError}
        fromToken={fromToken}
      />

      <TextField
        fullWidth
        label={amountLabel}
        type="text"
        placeholder={t('swap.amountPlaceholder')}
        disabled={isLoading}
        InputProps={{ readOnly }}
        error={!!displayError}
        helperText={displayError}
        variant="outlined"
        size="small"
        value={amount}
        onChange={(e) => handleAmountChange(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: '48px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'hsl(var(--border))',
            borderRadius: '8px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'hsl(var(--border))',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'hsl(var(--ring))',
            borderWidth: '2px',
          },
        }}
      />
    </Box>
  );
};

export default TokenInput;
