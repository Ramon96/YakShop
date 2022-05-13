import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import yakshopReducer from '../features/yakshop/yakshopSlice';
import stockReducer from '../features/stock/stockSlice';
import daysReducer from '../features/days/daysSlice';
import resetReducer from '../features/reset/resetSlice';

export const store = configureStore({
  reducer: {
    yakshop: yakshopReducer,
    stock: stockReducer,
    days: daysReducer,
    reset: resetReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
