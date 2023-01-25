import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  loading: false,
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
    setLoading(state) {
      state.loading = true;
    },
    unsetLoading(state) {
      state.loading = false;
    },
  },
});

export const {setShowModal, unsetShowModal,setLoading, unsetLoading} = uiSlice.actions;
export default uiSlice.reducer;
