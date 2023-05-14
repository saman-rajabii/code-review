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

async function getSimulatorByProfileId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { profile_id } = request.params;

    logger.logInfo("getSimulatorByProfileId", profile_id);

    const profile = await profileService.getProfileById(profile_id);

    if (!profile) {
      response
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: MESSAGES.PROFILE_NOT_FOUND });
    }

    const simulators = await simulatorService.getSimulatorsByProfileId(
      profile_id
    );

    response.status(STATUS_CODES.SUCCESS).send({ data: simulators });
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
    const { simulator } = request.body;

    logger.logInfo("createSimulator", simulator);

    const res = await simulatorService.createSimulator(simulator);

    response.status(STATUS_CODES.SUCCESS).send({ data: res });
  } catch (error) {
    next(error);
  }
}

export default {
  getSimulators,
  getSimulatorByProfileId,
  createSimulator,
};
