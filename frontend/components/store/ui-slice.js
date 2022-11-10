import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowModal(state) {
      state.showModal = true;
    },
    unsetShowModal(state) {
      state.showModal = false;
    },
  },
});

export const {setShowModal, unsetShowModal} = uiSlice.actions;
export default uiSlice.reducer;
