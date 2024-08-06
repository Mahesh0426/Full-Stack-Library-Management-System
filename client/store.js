import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import bookReducer from "./redux/bookSlice";
import borrowReducer from "./redux/borrowSlice";
import reviewReducer from "./redux/reviewSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    borrow: borrowReducer,
    review: reviewReducer,
  }
});
export default store;
