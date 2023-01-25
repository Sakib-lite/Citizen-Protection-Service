import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  policeStations: [],
  images: [],
};

const policeStationSlice = createSlice({
  name: 'policeStation',
  initialState,
  reducers: {
    setPoliceStations(state, action) {
      state.policeStations = action.payload;
    },

  },
});

export const { setPoliceStations} = policeStationSlice.actions;
export default policeStationSlice.reducer;
