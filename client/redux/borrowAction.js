import { toast } from "react-toastify";
import { createBorrow, getBorrows, returnBorrow } from "../axios/borrowAxios";
import { getBookAction } from "./bookAction";
import { setBorrows } from "./borrowSlice";

// get user burrows
export const getBorrowsAction = () => async (dispatch) => {
  const result = await getBorrows();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setBorrows(result.data));
};

// create a borrow
export const createBorrowAction = (borrowObj) => async (dispatch) => {
  const result = await createBorrow(borrowObj);

  if (result?.status === "error") {
    return toast.error(result.message);
  }
  toast.success(result.message);

  // once a borrow is made, we get book details again
  dispatch(getBookAction(borrowObj.book_id));
};

// update a burrow
export const returnBorrowAction = (borrowId) => async (dispatch) => {
  const result = await returnBorrow(borrowId);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  // once a burrow is reutrned, we get book details again
  toast.success(result.message);
  dispatch(getBorrowsAction());
};
