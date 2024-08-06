import bookSchema from "../schema/bookSchema.js";

//get all books which is available
export const getAllBooks = () => {
  return bookSchema.find();
};

// create a new book
export const createBook = (bookObj) => {
  return bookSchema(bookObj).save();
};

//update a book
export const updateBookById = (updatedBookObj) => {
  const { id } = updatedBookObj;
  return bookSchema.findByIdAndUpdate(id, updatedBookObj);
};

// delete a book
export const deleteBookById = (id) => {
  return bookSchema.findByIdAndDelete(id);
};

// find the book by its id
export const getBookById = (_id) => {
  return bookSchema.findById(_id);
};

// create book reviews
export const createBookReviews = (reviewObj) => {
  return bookSchema.findOneAndUpdate(
    { _id: reviewObj.book_id },
    { $push: { reviews: reviewObj } }
  );
};
// update book reviews
export const updateBookReviews = (reviewObj) => {
  return bookSchema.findOneAndUpdate(
    { _id: reviewObj.book_id, "reviews._id": reviewObj._id },
    { $set: { "reviews.$.status": reviewObj.status } },
    { new: true }
  );
};
