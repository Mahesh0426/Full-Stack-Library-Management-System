import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  book: {},
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setBook: (state, action) => {
      state.book = action.payload;
    },
  },
});

const { reducer: bookReducer, actions } = bookSlice;

export const { setBooks, setBook } = actions;
export default bookReducer;
