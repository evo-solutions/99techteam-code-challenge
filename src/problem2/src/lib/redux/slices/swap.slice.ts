import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { SwapFormData } from '@/services/token.type';
import { simulateTokenSwap } from '@/services/swap.service';

const SLICE_NAME = 'swap' as const;

interface SwapState {
  formData: SwapFormData;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: string | null;
}

const initialState: SwapState = {
  formData: {
    fromToken: '',
    toToken: '',
    fromAmount: '',
    toAmount: '',
  },
  isSubmitting: false,
  submitError: null,
  submitSuccess: null,
};

export const submitSwap = createAsyncThunk(
  `${SLICE_NAME}/submitSwap`,
  async (data: SwapFormData, { rejectWithValue }) => {
    try {
      return await simulateTokenSwap(data);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Swap failed'
      );
    }
  }
);

const reducers = {
  updateFormData: (state: SwapState, action: PayloadAction<Partial<SwapFormData>>) => {
    state.formData = {
      ...state.formData,
      ...action.payload,
    };
  },
  clearError: (state: SwapState) => {
    state.submitError = null;
  },
  clearSuccess: (state: SwapState) => {
    state.submitSuccess = null;
  },
  swapTokens: (state: SwapState, action: PayloadAction<{ receivedAmount: string }>) => {
    const { fromToken, toToken } = state.formData;
    const receivedAmount = action.payload.receivedAmount;

    state.formData = {
      fromToken: toToken,
      toToken: fromToken,
      fromAmount: receivedAmount === '0' ? '' : receivedAmount,
      toAmount: '',
    };
  },
  autoFillTokens: (state: SwapState, action: PayloadAction<{ firstToken: string; secondToken: string }>) => {
    const { firstToken, secondToken } = action.payload;
    if (!state.formData.fromToken && !state.formData.toToken) {
      state.formData.fromToken = firstToken;
      state.formData.toToken = secondToken;
    }
  },
};

const extraReducers = (builder: ActionReducerMapBuilder<SwapState>) => {
  builder
    .addCase(submitSwap.pending, (state: SwapState) => {
      state.isSubmitting = true;
      state.submitError = null;
      state.submitSuccess = null;
    })
    .addCase(submitSwap.fulfilled, (state: SwapState) => {
      state.isSubmitting = false;
      state.submitSuccess = 'swap.swapSuccess';
    })
    .addCase(submitSwap.rejected, (state: SwapState, action) => {
      state.isSubmitting = false;
      state.submitError = action.payload as string;
      state.submitSuccess = null;
    });
};

const swapSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

export const {
  updateFormData,
  clearError,
  clearSuccess,
  swapTokens,
  autoFillTokens
} = swapSlice.actions;

export default swapSlice.reducer;
