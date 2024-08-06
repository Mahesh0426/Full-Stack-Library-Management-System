import { getAuthHeader } from "./axiosHelper";
import axios from "axios";

const BOOK_API_URL = "http://localhost:8000/api/book";
// public route
export const getBooks = () => {
  const response = axios
    .get(BOOK_API_URL)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
  return response;
};

// private route use getauthHelper middle for access token from db
export const createBook = (bookObj) => {
  const response = axios
    .post(BOOK_API_URL, bookObj, getAuthHeader())
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
  return response;
};

// private route for updating boook
export const updateBook = (bookObj) => {
  const response = axios
    .patch(BOOK_API_URL, bookObj, getAuthHeader())
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
  return response;
};

// delete  book from db
export const deleteBook = (bookId) => {
  const response = axios
    .delete(`${BOOK_API_URL}/${bookId}`, getAuthHeader())
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
  return response;
};

//to get  particular book from db
export const getBook = (_id) => {
  const response = axios
    .get(`${BOOK_API_URL}/${_id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return response;
};
