import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { TokenOption } from '@/services/token.type';
import { getTokens } from '@/services/token.service';

const SLICE_NAME = 'tokens' as const;

interface TokensState {
  tokens: TokenOption[];
  loading: boolean;
  error: string | null;
}

const initialState: TokensState = {
  tokens: [],
  loading: false,
  error: null,
};

export const fetchTokens = createAsyncThunk(
  `${SLICE_NAME}/fetchTokens`,
  async (_, { rejectWithValue }) => {
    try {
      return await getTokens();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch tokens'
      );
    }
  },
  {
    // Store is a singleton, so this also skips the extra StrictMode dispatch in dev.
    condition: (_, { getState }) => {
      const { tokens } = getState() as { tokens: TokensState };
      return !tokens.loading && tokens.tokens.length === 0;
    },
  }
);

const reducers = {
  clearError: (state: TokensState) => {
    state.error = null;
  },
};

const extraReducers = (builder: ActionReducerMapBuilder<TokensState>) => {
  builder
    .addCase(fetchTokens.pending, (state: TokensState) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTokens.fulfilled, (state: TokensState, action: PayloadAction<TokenOption[]>) => {
      state.loading = false;
      state.tokens = action.payload;
    })
    .addCase(fetchTokens.rejected, (state: TokensState, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};

const tokensSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

export const { clearError } = tokensSlice.actions;

export default tokensSlice.reducer;