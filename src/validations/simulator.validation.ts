import joi from "joi";
import { validate } from "express-validation";
import { SORT_MODES } from "../enums";

const getSimulatorValidation = validate(
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

const getSimulatorByProfileIdValidation = validate(
  {
    params: joi
      .object({
        profile_id: joi.string().required(),
      })
      .required(),
  },
  { keyByField: true }
);

const createSimulatorValidation = validate(
  {
    params: joi
      .object({
        profile_id: joi.string().required(),
      })
      .required(),
    body: joi.object({
      dateRecorded: joi.date(),
      cryptocurrency: joi.string(),
      euros: joi.number().positive(),
      price: joi.number().positive(),
      quantity: joi.number().positive(),
    }),
  },
  { keyByField: true }
);

export default {
  getSimulatorValidation,
  getSimulatorByProfileIdValidation,
  createSimulatorValidation,
};
