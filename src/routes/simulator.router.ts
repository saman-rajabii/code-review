import express from "express";
import { simulatorValidation } from "../validations";
import { simulatorController } from "../controllers";

export const router = express.Router();

router.get(
  "/",
  simulatorValidation.getSimulatorValidation,
  simulatorController.getSimulators
);

router.get(
  "/:profile_id",
  simulatorValidation.getSimulatorByProfileIdValidation,
  simulatorController.getSimulatorByProfileId
);

router.post(
  "/:profile_id",
  simulatorValidation.createSimulatorValidation,
  simulatorController.createSimulator
);

export default router;
