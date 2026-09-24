import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SwapForm from '@/components/ui/swap-form';
import {
  fetchTokens,
  clearError as clearTokensError,
} from '@/lib/redux/slices/tokens.slice';
import {
  submitSwap,
  updateFormData,
  swapTokens,
  autoFillTokens,
  clearError as clearSwapError,
  clearSuccess as clearSwapSuccess,
} from '@/lib/redux/slices/swap.slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { SwapFormData } from '@/services/token.type';
import { Box, Typography, Alert, Button, Snackbar } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useTheme } from '@/components/ui/theme';
import { UI_CONFIG } from '@/constants/ui.const';

export const SwapTokenPage = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();

  const { tokens, loading: tokensLoading, error: tokensError } = useAppSelector(
    (state) => state.tokens
  );
  const { formData, isSubmitting, submitError, submitSuccess } = useAppSelector(
    (state) => state.swap
  );

  useEffect(() => {
    dispatch(fetchTokens());
  }, [dispatch]);

  useEffect(() => {
    if (tokens.length >= 2 && !formData.fromToken && !formData.toToken) {
      dispatch(autoFillTokens({
        firstToken: tokens[0].currency,
        secondToken: tokens[1].currency,
      }));
    }
  }, [tokens, formData.fromToken, formData.toToken, dispatch]);

  const clearFeedback = useCallback(() => {
    dispatch(clearSwapError());
    dispatch(clearSwapSuccess());
  }, [dispatch]);

  const handleTokenChange = useCallback((field: keyof SwapFormData, value: string) => {
    dispatch(updateFormData({ [field]: value }));
    clearFeedback();
  }, [dispatch, clearFeedback]);

  const handleAmountChange = useCallback((value: string) => {
    dispatch(updateFormData({ fromAmount: value }));
  }, [dispatch]);

  const handleSwapTokens = useCallback((receivedAmount: string) => {
    dispatch(swapTokens({ receivedAmount }));
    clearFeedback();
  }, [dispatch, clearFeedback]);

  const handleSubmit = useCallback(async (data: SwapFormData) => {
    try {
      await dispatch(submitSwap(data)).unwrap();
    } catch {
      // Error is stored in Redux and shown in the snackbar.
    }
  }, [dispatch]);

  const handleRetryTokens = useCallback(() => {
    dispatch(clearTokensError());
    dispatch(fetchTokens());
  }, [dispatch]);

  if (tokensLoading && tokens.length === 0) {
    return (
      <Box className="w-full min-h-screen flex flex-col items-center justify-center px-4">
        <Typography variant="h6" className="mb-4">
          {t('common.loading')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('common.loadingTokens')}
        </Typography>
      </Box>
    );
  }

  if (tokensError && tokens.length === 0) {
    return (
      <Box className="w-full min-h-screen flex flex-col items-center justify-center max-w-md mx-auto px-4">
        <Alert severity="error" className="w-full mb-4">
          <Typography variant="body2" className="mb-2">
            {t('errors.fetchTokens')}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={handleRetryTokens}
            startIcon={<RefreshIcon />}
          >
            {t('errors.retry')}
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      className="w-full min-h-screen flex items-center justify-center px-4 py-8"
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f0f4ff 100%)',
      }}
    >
      <SwapForm
        tokens={tokens}
        fromToken={formData.fromToken}
        toToken={formData.toToken}
        fromAmount={formData.fromAmount}
        isLoading={isSubmitting}
        onTokenChange={handleTokenChange}
        onAmountChange={handleAmountChange}
        onSwapTokens={handleSwapTokens}
        onSubmit={handleSubmit}
      />

      <Snackbar
        open={!!submitSuccess}
        autoHideDuration={UI_CONFIG.SUCCESS_MESSAGE_DURATION}
        onClose={() => dispatch(clearSwapSuccess())}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ mt: 2 }}
      >
        <Alert
          onClose={() => dispatch(clearSwapSuccess())}
          severity="success"
          sx={{ width: '100%' }}
        >
          {submitSuccess && t(submitSuccess)}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!submitError}
        autoHideDuration={UI_CONFIG.ERROR_MESSAGE_DURATION}
        onClose={() => dispatch(clearSwapError())}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ mt: 2 }}
      >
        <Alert
          onClose={() => dispatch(clearSwapError())}
          severity="error"
          sx={{ width: '100%' }}
        >
          {submitError}
        </Alert>
      </Snackbar>
    </Box>
  );
};
