import express from "express";
import { favoriteController } from "../controllers";
import { favoriteValidation } from "../validations";

export const router = express.Router();

router.get(
  "/",
  favoriteValidation.getFavoritesValidation,
  favoriteController.getFavorites
);

export default router;
