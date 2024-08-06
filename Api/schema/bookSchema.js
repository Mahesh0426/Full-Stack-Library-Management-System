import mongoose from "mongoose";
import { rewiewSchemaForBooks } from "./reviewSchema.js";

const bookSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "available",
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publish_year: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    due_date: {
      type: Date,
      required: false,
    },
    reviews: {
      type: [rewiewSchemaForBooks],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("book", bookSchema);
