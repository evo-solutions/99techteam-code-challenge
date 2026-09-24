import { combineReducers } from '@reduxjs/toolkit';
import swapReducer from './slices/swap.slice';
import tokensReducer from './slices/tokens.slice';

export const rootReducer = combineReducers({
  swap: swapReducer,
  tokens: tokensReducer,
});

