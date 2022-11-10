import { createSlice } from '@reduxjs/toolkit';

const initialState = {
user:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails(state,action) {
   state.user=action.payload
    }
  },
});

export const {setUserDetails} = authSlice.actions;
export default authSlice.reducer;
