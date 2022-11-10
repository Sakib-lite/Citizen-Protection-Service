import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  complaints: [],
};

const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    setComplaint(state, action) {
      state.complaints = action.payload;
    },
  },
});

export const { setComplaint } = complaintSlice.actions;
export default complaintSlice.reducer;
