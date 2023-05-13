import express from "express";
import { profileController } from "../controllers";
import { profileValidation } from "../validations";

export var router = express.Router();

router.get(
  "/",
  profileValidation.getProfilesValidation,
  profileController.getProfiles
);

router.post(
  "/",
  profileValidation.createProfileValidation,
  profileController.createProfile
);

export default router;
