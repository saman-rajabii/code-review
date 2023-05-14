import { Request, Response } from "express";
import { ValidationError } from "express-validation";
import { MESSAGES, STATUS_CODES } from "../enums";

export default (error: Error, request: Request, response: Response) => {
  if (error instanceof ValidationError) {
    return response.status(STATUS_CODES.BAD_REQUEST).send({
      message: error.message,
      error: error.details,
    });
  }

  return response.status(STATUS_CODES.INTERNAL_ERROR).send({
    message: MESSAGES.UNKNOWN_ERROR,
    error: error,
  });
};
