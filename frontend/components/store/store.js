import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import complaintSlice from './complaintSlice';
import locationSlice from './locationSlice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice,
    location:locationSlice,
    auth:authSlice,
    complaint:complaintSlice
  },
});

export default store;
