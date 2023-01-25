import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import complaintSlice from './complaintSlice';
import locationSlice from './locationSlice';
import uiSlice from './ui-slice';
import policeStationsSlice from './policeStationsSlice';
import commentSlice from './commentSlice';

const store = configureStore({
  reducer: {
    ui: uiSlice,
    location: locationSlice,
    auth: authSlice,
    complaint: complaintSlice,
    policeStations: policeStationsSlice,
    comments: commentSlice,
  },
});

export default store;
