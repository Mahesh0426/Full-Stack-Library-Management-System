import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  borrows: [],
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    setBorrows: (state, action) => {
      state.borrows = action.payload;
    },
  },
});
const { reducer: borrowReducer, actions } = borrowSlice;
export const { setBorrows } = actions;
export default borrowReducer;
