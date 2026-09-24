import { UI_CONFIG } from '@/constants/ui.const';
import { parseAmount, isValidAmount } from '@/utils/token.utils';
import { SwapFormData } from './token.type';

const validationRules = {
  tokensSelected: (data: SwapFormData) => !data.fromToken || !data.toToken ? 'Both tokens must be selected' : null,
  differentTokens: (data: SwapFormData) => data.fromToken === data.toToken ? 'Cannot swap the same token' : null,
  validAmount: (data: SwapFormData) => !data.fromAmount || !isValidAmount(data.fromAmount) || parseAmount(data.fromAmount) <= 0 ? 'Invalid amount' : null,
};

// No real swap API — validate locally, then delay to mimic a network call.
export const simulateTokenSwap = async (data: SwapFormData) => {
  const error = Object.values(validationRules)
    .map(rule => rule(data))
    .find(error => error);

  if (error) throw new Error(error);

  await new Promise(resolve => setTimeout(resolve, UI_CONFIG.SWAP_DELAY));

  return {
    success: true,
    data,
    timestamp: Date.now(),
    transactionId: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
};

