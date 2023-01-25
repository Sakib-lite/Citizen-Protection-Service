import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComment(state, action) {
      state.comments = action.payload;
    },
    addComment(state,action){
      state.comments.push(action.payload)
    },
    deleteComment(state){
        state.comments=[]
    }
  },
});

export const { setComment, addComment,deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
