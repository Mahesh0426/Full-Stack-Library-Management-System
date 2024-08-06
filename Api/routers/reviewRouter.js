import express from "express";
import { userAuth } from "../authMiddleware/authMiddleware.js";
import {
  createReview,
  getManyReview,
  updateReview,
} from "../model/reviewModel.js";
import { updateBorrow } from "../model/borrowModal.js";
import { createBookReviews, updateBookReviews } from "../model/bookModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

const reviewRouter = express.Router();

// private routes
//Create a review
reviewRouter.post("/", userAuth, async (req, res) => {
  try {
    const review = await createReview(req.body);

    if (review?._id) {
      // update borrow to to set has_review: true
      const updatedBorrow = {
        id: review.borrow_id,
        has_review: true,
      };

      await updateBorrow(updatedBorrow);
      await createBookReviews(review);
    }

    review?._id
      ? buildSuccessResponse(res, review, "Thank you for the review.")
      : buildErrorResponse(res, "Something went wrong.");
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
});

//get all the reviews
reviewRouter.get("/", userAuth, async (req, res) => {
  try {
    if (req.userInfo.role !== "admin") {
      buildErrorResponse(res, "Not authorized");
      return;
    }

    const reviews = await getManyReview({});

    reviews?.length
      ? buildSuccessResponse(res, reviews, "Reviews")
      : buildErrorResponse(res, "No reviews available");
  } catch (error) {
    buildErrorResponse(res, "No reviews available");
  }
});

//update review
reviewRouter.patch("/:_id", userAuth, async (req, res) => {
  try {
    if (req.userInfo.role !== "admin") {
      buildErrorResponse(res, "Not authorized");
      return;
    }

    const { _id } = req.params;
    const { status } = req.body;

    const review = await updateReview({ _id }, { status });

    if (review?._id) {
      // update book with review inside reviews array
      const review = await updateBookReviews(review);
    }

    review?._id
      ? buildSuccessResponse(res, review, "Review updated.")
      : buildErrorResponse(res, "Something went wrong.");
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
});

//Public Route
//get all reviews
reviewRouter.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const reviews = await getManyReview({ book_id: _id });

    if (reviews && reviews.length > 0) {
      buildSuccessResponse(res, reviews, "Reviews fetched successfully");
    } else {
      buildErrorResponse(res, "No reviews available for this book.");
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    buildErrorResponse(res, "Error fetching reviews");
  }
});

export default reviewRouter;
