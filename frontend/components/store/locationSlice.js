import { createSlice } from '@reduxjs/toolkit';

const initialState = {
coordinates:[]
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state,action) {
     state.coordinates=[]
      state.coordinates.push(action.payload.lng)
      state.coordinates.push(action.payload.lat)
    }
  },
});

export const {setLocation} = locationSlice.actions;
export default locationSlice.reducer;
