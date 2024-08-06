import borrowSchema from "../schema/borrowSchema.js";

// create borrow
export const createBorrow = (borrowObj) => {
  return borrowSchema(borrowObj).save();
};

// return borrow based on filters | role
export const getManyBorrows = (filter) => {
  return borrowSchema.find(filter);
};

//update the borrow
export const updateBorrow = (updatedBorrow) => {
  const { id } = updatedBorrow;
  return borrowSchema.findByIdAndUpdate(id, updatedBorrow);
};
