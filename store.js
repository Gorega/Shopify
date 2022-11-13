import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice';
import displayStatesSlice from './features/displayStatesSlice';
import filterSlice from './features/filterSlice';
import sliderSlice from './features/sliderSlice';

export const store = configureStore({
  reducer: {
      cart:cartSlice,
      slider:sliderSlice,
      display:displayStatesSlice,
      filter:filterSlice
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
}
)