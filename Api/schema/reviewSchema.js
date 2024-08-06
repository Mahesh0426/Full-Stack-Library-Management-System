import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "unapproved",
    },
    borrow_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    book_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    book_title: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

export const rewiewSchemaForBooks = reviewSchema;
export default mongoose.model("review", reviewSchema); // reviews
