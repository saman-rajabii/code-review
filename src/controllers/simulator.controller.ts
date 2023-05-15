import { NextFunction, Request, Response } from "express";
import { profileService, simulatorService } from "../services";
import { MESSAGES, SORT_MODES, STATUS_CODES } from "../enums";
import { logger } from "../libs";

async function getSimulators(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { pageNumber, pageSize, sort } = request.query;

    const [simulators, count] = await simulatorService.getSimulators(
      Number(pageNumber),
      Number(pageSize),
      <SORT_MODES>sort
    );

    response.status(STATUS_CODES.SUCCESS).send({ data: { simulators, count } });
  } catch (error) {
    next(error);
  }
}

async function createSimulator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const simulator = request.body;

    const profile = await profileService.getProfileById(simulator.profile_id);

    if (!profile) {
      return response
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: MESSAGES.PROFILE_NOT_FOUND });
    }

    const res = await simulatorService.createSimulator(simulator);

    response.status(STATUS_CODES.SUCCESS).send({ data: res });
  } catch (error) {
    next(error);
  }
}

export default {
  getSimulators,
  createSimulator,
};
