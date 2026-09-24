import React, { useMemo } from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  Avatar,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TokenOption } from '@/services/token.type';

interface TokenSelectorProps {
  value: string;
  onChange: (value: string) => void;
  tokens: TokenOption[];
  label: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  excludeToken?: string;
  fromToken?: string;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  value,
  onChange,
  tokens,
  label,
  placeholder,
  disabled = false,
  error = '',
  excludeToken,
  fromToken,
}) => {
  const { t } = useTranslation();

  const filteredTokens = useMemo(() => {
    return tokens.filter(token => !excludeToken || token.currency !== excludeToken);
  }, [tokens, excludeToken]);

  const selectedToken = tokens.find(token => token.currency === value);
  const fromTokenData = fromToken ? tokens.find(token => token.currency === fromToken) : null;

  const calculateRate = (token: TokenOption) => {
    if (!fromTokenData || token.price <= 0 || fromTokenData.price <= 0) {
      return null;
    }
    return fromTokenData.price / token.price;
  };

  return (
    <Autocomplete
      value={selectedToken || null}
      onChange={(_, newValue) => onChange(newValue?.currency || '')}
      options={filteredTokens}
      getOptionLabel={(option) => option.currency}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder || t('swap.selectToken')}
          error={!!error}
          helperText={error}
          InputProps={{
            ...params.InputProps,
            startAdornment: selectedToken ? (
              <Box display="flex" alignItems="center" gap={1} sx={{ marginLeft: '8px' }}>
                <Avatar
                  src={selectedToken.iconUrl}
                  alt={selectedToken.currency}
                  sx={{ width: 24, height: 24, fontSize: 12 }}
                >
                  {selectedToken.currency.charAt(0)}
                </Avatar>
                {params.InputProps.startAdornment}
              </Box>
            ) : params.InputProps.startAdornment,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: '48px',
              backgroundColor: 'transparent',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'hsl(var(--border))',
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
      )}
      renderOption={(props, option) => {
        const rate = calculateRate(option);
        const isSelected = option.currency === value;
        return (
          <Box
            component="li"
            {...props}
            sx={{
              backgroundColor: isSelected ? 'hsl(var(--primary) / 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: isSelected
                  ? 'hsl(var(--primary) / 0.2)'
                  : 'hsl(var(--accent))',
              },
              borderLeft: isSelected ? '3px solid hsl(var(--primary))' : '3px solid transparent',
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Box display="flex" alignItems="center" gap={1.5}>
                <Avatar
                  src={option.iconUrl}
                  alt={option.currency}
                  sx={{ width: 36, height: 36, fontSize: 14 }}
                >
                  {option.currency.charAt(0)}
                </Avatar>
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={isSelected ? 'bold' : 'medium'}
                    color={isSelected ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'}
                  >
                    {option.currency}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ${option.price.toFixed(6)}
                  </Typography>
                </Box>
              </Box>
              {rate && (
                <Typography variant="caption" color="text.secondary">
                  1 {fromTokenData?.currency} ≈ {rate.toFixed(6)}
                </Typography>
              )}
            </Box>
          </Box>
        );
      }}
      noOptionsText={t('common.noResults')}
    />
  );
};

export default TokenSelector;
