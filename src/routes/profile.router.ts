import express from "express";
import { profileController } from "../controllers";
import { profileValidation } from "../validations";

export const router = express.Router();

router.get(
  "/",
  profileValidation.getProfilesValidation,
  profileController.getProfiles
);

router.get(
  "/:id/simulators",
  profileValidation.getProfileValidation,
  profileController.getSimulators
);

router.get(
  "/:id/favorites",
  profileValidation.getProfileValidation,
  profileController.getFavorites
);

router.post(
  "/",
  profileValidation.createProfileValidation,
  profileController.createProfile
);

export default router;
