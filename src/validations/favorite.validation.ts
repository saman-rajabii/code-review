import joi from "joi";
import { validate } from "express-validation";
import { SORT_MODES } from "../enums";

const getFavoritesValidation = validate(
  {
    query: joi
      .object({
        page: joi.number().optional(),
        pageSize: joi.number().optional(),
        sort: joi
          .string()
          .optional()
          .valid(...Object.values(SORT_MODES))
          .insensitive(),
      })
      .optional(),
  },
  { keyByField: true }
);


export default { getFavoritesValidation };
