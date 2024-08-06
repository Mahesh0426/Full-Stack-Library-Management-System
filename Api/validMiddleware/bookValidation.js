import Joi from "joi";
import { buildErrorResponse } from "../utility/responseHelper.js";

const REQUIRED_STRING = Joi.string().required();

export const newBookValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      thumbnail: REQUIRED_STRING,
      title: REQUIRED_STRING,
      author: REQUIRED_STRING,
      publish_year: REQUIRED_STRING,
      isbn: REQUIRED_STRING,
      description: Joi.string().max(5000).required(),
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

// validation for update book
export const updateBookValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      id: REQUIRED_STRING,
      thumbnail: REQUIRED_STRING,
      title: REQUIRED_STRING,
      author: REQUIRED_STRING,
      publish_year: REQUIRED_STRING,
      isbn: REQUIRED_STRING,
      description: Joi.string().max(5000).required(),
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
