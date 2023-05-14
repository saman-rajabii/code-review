import { Router } from "express";

import favoriteRouter from "./favorite.router";
import profileRouter from "./profile.router";
import simulatorRouter from "./simulator.router";

const router = Router();

router.use("/favorites", favoriteRouter);
router.use("/profiles", profileRouter);
router.use("/simulators", simulatorRouter);

export default router;
