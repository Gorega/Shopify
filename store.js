import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice';

export const store = configureStore({
  reducer: {
      cart:cartSlice
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})