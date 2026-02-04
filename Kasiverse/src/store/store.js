import { configureStore } from '@reduxjs/toolkit';
import storesReducer from './storeSlice';

const store = configureStore({
  reducer: {
    stores: storesReducer,
  },
});

export default store;
