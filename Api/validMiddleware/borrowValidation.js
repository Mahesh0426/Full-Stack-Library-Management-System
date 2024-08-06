import Joi from "joi";

const REQUIRED_STRING = Joi.string().required();

export const newBorrowValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      book_id: REQUIRED_STRING,
      book_name: REQUIRED_STRING,
      user_id: REQUIRED_STRING,
      user_name: REQUIRED_STRING,
      due_date: Joi.date().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return buildErrorResponse(res, error.message);
    }

    next();
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
};
