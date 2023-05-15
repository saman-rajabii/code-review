// @ts-nocheck
import joi from "joi";
import objectIdValidation from "joi-objectid";
import { validate } from "express-validation";
import { SORT_MODES } from "../enums";

joi.objectId = objectIdValidation(joi);

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
      profile_id: joi.objectId().required(),
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
