import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  complaints: [],
  images: [],
};

const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    setComplaint(state, action) {
      state.complaints = action.payload;
    },
    addComplaint(state,action){
      state.complaints.push(action.payload)
    },
    setImages(state, action) {
      state.images = action.payload;
    },
    deleteImages(state, action) {
      state.images = [];
    },
  },
});

export const { setComplaint, addComplaint,setImages, deleteImages } = complaintSlice.actions;
export default complaintSlice.reducer;
