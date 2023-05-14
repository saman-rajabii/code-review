import joi from "joi";
import { validate } from "express-validation";
import { SORT_MODES } from "../enums";

const getProfilesValidation = validate(
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

const createProfileValidation = validate(
  {
    body: joi
      .object({
        email: joi.string().required(),
        name: joi.string().required(),
        nickname: joi.string().required(),
        capital: joi.number().required(),
        divisa: joi.string().required(),
        preferredCryptocurrency: joi.string().required(),
      })
      .required(),
  },
  { keyByField: true }
);

const getProfileValidation = validate(
  {
    params: joi
      .object({
        id: joi.string().required(),
      })
      .required(),
  },
  { keyByField: true }
);

export default {
  getProfilesValidation,
  createProfileValidation,
  getProfileValidation,
};
