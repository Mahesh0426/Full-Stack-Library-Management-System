import reviewSchema from "../schema/reviewSchema.js";

//Create
export const createReview = (reviewObj) => {
  return reviewSchema(reviewObj).save();
};
// return many review as an array
export const getManyReview = (filter) => {
  return reviewSchema.find(filter);
};
// update
export const updateReview = (filter, update) => {
  return reviewSchema.findOneAndUpdate(filter, update);
};
