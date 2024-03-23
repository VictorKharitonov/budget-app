import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { envelopeInfoSlice, transactionsSlice, userInfoSlice } from './reducers';

const rootReducer = combineReducers({
  transactions: transactionsSlice.reducer,
  userInfo: userInfoSlice.reducer,
  envelopeInfo: envelopeInfoSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
