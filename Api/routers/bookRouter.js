import express from "express";
import {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../model/bookModel.js";

import { userAuth } from "../authMiddleware/authMiddleware.js";
import {
  newBookValidation,
  updateBookValidation,
} from "../validMiddleware/bookValidation.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

const bookRouter = express.Router();

// Public routes
// GET all books
bookRouter.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();

    books?.length
      ? buildSuccessResponse(res, books, "All Books")
      : buildErrorResponse(res, "No books available");
  } catch (error) {
    buildErrorResponse(res, "No books available");
  }
});

// GET book
bookRouter.get("/:_id", async (req, res) => {
  try {
    const book = await getBookById(req.params._id);

    book?._id
      ? buildSuccessResponse(res, book, "Book")
      : buildErrorResponse(res, "No book available");
  } catch (error) {
    buildErrorResponse(res, "No book available");
  }
});

// Private Routes
// Create a book
bookRouter.post("/", userAuth, newBookValidation, async (req, res) => {
  try {
    const user = req.userInfo; // coming from userAuth

    if (user.role !== "admin") {
      return buildErrorResponse(res, "Not Authorized to create a book");
    }

    // if the user is admin

    const book = await createBook(req.body);

    book?._id
      ? buildSuccessResponse(res, book, "Book created Successfully")
      : buildErrorResponse(res, "Unable to create a book");
  } catch (error) {
    if (error.code === 11000) {
      error.message =
        "There is another book that has similar ISBN. Plase change the isbn and try again";
    }
    buildErrorResponse(res, error.message);
  }
});

//update the book
bookRouter.patch("/", userAuth, updateBookValidation, async (req, res) => {
  try {
    const user = req.userInfo;
    if (user.role !== "admin") {
      return buildErrorResponse(res, "Not Authrized yo update a book");
    }

    // update book query
    const book = await updateBookById(req.body);

    book?._id
      ? buildSuccessResponse(res, book, "Book updated Successfully")
      : buildErrorResponse(res, "Unable to update a book");
  } catch (error) {
    if (error.code === 11000) {
      error.message =
        "There is another book that has similar ISBN. Plase change the isbn and try again";
    }
    buildErrorResponse(res, error.message);
  }
});

// delete a book from db
bookRouter.delete("/:id", userAuth, async (req, res) => {
  try {
    const user = req.userInfo;
    if (user.role !== "admin") {
      return buildErrorResponse(res, "Not Authorized to delete a book");
    }

    const { id } = req.params;

    // delete book query
    const book = await deleteBookById(id);

    book?._id
      ? buildSuccessResponse(res, book, "Book deleted Successfully")
      : buildErrorResponse(res, "Unable to delete the book");
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
});
export default bookRouter;
