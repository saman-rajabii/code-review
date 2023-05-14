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

const createSimulatorValidation = validate(
  {
    body: joi.object({
      profile_id: joi.string().required(),
      dateRecorded: joi.date().required(),
      cryptocurrency: joi.string().required(),
      euros: joi.number().positive().required(),
      price: joi.number().positive().required(),
      quantity: joi.number().positive().required(),
    }),
  },
  { keyByField: true }
);

export default {
  getSimulatorValidation,
  createSimulatorValidation,
};
