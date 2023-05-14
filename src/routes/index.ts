import { Router } from "express";

import favoriteRouter from "./favorite.router";
import profileRouter from "./profile.router";
import simulatorRouter from "./simulator.router";

const router = Router();

router.use("/favorite", favoriteRouter);
router.use("/profile", profileRouter);
router.use("/simulator", simulatorRouter);

export default router;
