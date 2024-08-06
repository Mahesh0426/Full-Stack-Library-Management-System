import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    book_name: {
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
    due_date: {
      type: Date,
      required: true,
    },
    return_date: {
      type: Date,
      required: false,
    },
    is_returned: {
      type: Boolean,
      default: false,
    },
    has_review: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// borrows
export default mongoose.model("borrow", borrowSchema);
