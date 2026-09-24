import React, { useCallback, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import TokenInput from '@/components/ui/token-input';
import SwapButton from '@/components/ui/swap-button';
import { SwapFormData } from '@/services/token.type';
import { TokenOption } from '@/services/token.type';
import { calculateSwapAmount, isValidAmount } from '@/utils/token.utils';
import { UI_CONFIG } from '@/constants/ui.const';

interface SwapFormProps {
  tokens: TokenOption[];
  fromToken: string;
  toToken: string;
  fromAmount: string;
  isLoading: boolean;
  onTokenChange: (field: keyof SwapFormData, value: string) => void;
  onAmountChange: (value: string) => void;
  onSwapTokens: (receivedAmount: string) => void;
  onSubmit: (data: SwapFormData) => void;
}

export const SwapForm: React.FC<SwapFormProps> = ({
  tokens,
  fromToken,
  toToken,
  fromAmount,
  isLoading,
  onTokenChange,
  onAmountChange,
  onSwapTokens,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const fromTokenData = tokens.find(token => token.currency === fromToken);
  const toTokenData = tokens.find(token => token.currency === toToken);

  const exchangeInfo = useMemo(() => {
    if (!fromTokenData || !toTokenData || !fromAmount || parseFloat(fromAmount) <= 0) {
      return {
        rate: 0,
        toAmount: '0',
      };
    }

    const calculatedAmount = calculateSwapAmount(
      fromAmount,
      fromTokenData.price,
      toTokenData.price
    );

    return {
      rate: fromTokenData.price / toTokenData.price,
      toAmount: calculatedAmount.toFixed(UI_CONFIG.DECIMAL_PRECISION),
    };
  }, [fromTokenData, toTokenData, fromAmount]);

  const isFormValid = Boolean(
    fromToken &&
    toToken &&
    fromToken !== toToken &&
    fromAmount &&
    isValidAmount(fromAmount) &&
    parseFloat(fromAmount) > 0
  );

  const handleFromTokenChange = useCallback(
    (token: string) => onTokenChange('fromToken', token),
    [onTokenChange]
  );

  const handleToTokenChange = useCallback(
    (token: string) => onTokenChange('toToken', token),
    [onTokenChange]
  );

  const handleSwap = useCallback(
    () => onSwapTokens(exchangeInfo.toAmount),
    [onSwapTokens, exchangeInfo.toAmount]
  );

  return (
    <Box className="w-full max-w-md mx-auto">
      <Paper elevation={3} className="p-6 rounded-2xl">
        <Box className="text-center space-y-2 mb-6">
          <Typography variant="h4" fontWeight="bold">
            {t('swap.title')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('app.subtitle')}
          </Typography>
        </Box>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ fromToken, toToken, fromAmount, toAmount: exchangeInfo.toAmount });
          }}
          className="flex flex-col gap-4"
        >
          <TokenInput
            tokens={tokens}
            selectedToken={fromToken}
            amount={fromAmount}
            label={t('swap.fromLabel')}
            amountLabel={t('swap.amountFromLabel')}
            excludeToken={toToken}
            isLoading={isLoading}
            onTokenChange={handleFromTokenChange}
            onAmountChange={onAmountChange}
          />

          <SwapButton
            onSwap={handleSwap}
            disabled={isLoading || !fromToken || !toToken}
          />

          <TokenInput
            tokens={tokens}
            selectedToken={toToken}
            amount={exchangeInfo.toAmount}
            label={t('swap.toLabel')}
            amountLabel={t('swap.amountToLabel')}
            excludeToken={fromToken}
            isLoading={isLoading}
            readOnly
            onTokenChange={handleToTokenChange}
            fromToken={fromToken}
          />
          {exchangeInfo.rate > 0 && (
            <Box>
              <Typography variant="caption" color="text.primary" className="pt-5 text-center">
                {t('swap.rate')}: 1 {fromToken} ≈ {exchangeInfo.rate.toFixed(6)} {toToken}
              </Typography>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={!isFormValid || isLoading}
            sx={{
              '&:hover': {
                backgroundColor: 'primary.main',
              },
            }}
          >
            {isLoading ? (
              <Box className="flex items-center gap-2">
                <CircularProgress size={20} color="inherit" />
                {t('swap.submitting')}
              </Box>
            ) : (
              t('swap.submitButton')
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SwapForm;
