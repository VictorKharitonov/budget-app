import {configureStore, combineReducers} from "@reduxjs/toolkit";

import { transactionsSlice } from "./reducers/transactionsSlice";

const rootReducer = combineReducers({
  transactions: transactionsSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


