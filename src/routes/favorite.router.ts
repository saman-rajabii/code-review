import express from "express";
import { favoriteController } from "../controllers";
import { favoriteValidation } from "../validations";

export const router = express.Router();

router.get(
  "/",
  favoriteValidation.getFavoritesValidation,
  favoriteController.getFavorites
);

router.get(
  "/:profile_id",
  favoriteValidation.getFavoritesByProfileIdValidation,
  favoriteController.getFavoritesByProfileId
);

export default router;
