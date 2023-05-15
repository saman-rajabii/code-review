import { NextFunction, Request, Response } from "express";
import { favoriteService, profileService, simulatorService } from "../services";
import { MESSAGES, SORT_MODES, STATUS_CODES } from "../enums";

async function getProfiles(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { pageNumber, pageSize, sort } = request.query;

    const [profiles, count] = await profileService.getProfiles(
      Number(pageNumber),
      Number(pageSize),
      <SORT_MODES>sort
    );

    response.status(STATUS_CODES.SUCCESS).send({ data: { profiles, count } });
  } catch (error) {
    next(error);
  }
}

async function createProfile(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const profile = request.body;

    const res = await profileService.createProfile(profile);

    response.status(STATUS_CODES.SUCCESS).send({ data: res });
  } catch (error) {
    next(error);
  }
}

async function getSimulators(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id } = request.params;

    const profile = await profileService.getProfileById(id);

    if (!profile) {
      return response
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: MESSAGES.PROFILE_NOT_FOUND });
    }

    const simulators = await simulatorService.getSimulatorsByProfileId(
      profile._id
    );

    response.status(STATUS_CODES.SUCCESS).send({ data: simulators });
  } catch (error) {
    next(error);
  }
}

async function getFavorites(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id } = request.params;

    const profile = await profileService.getProfileById(id);

    if (!profile) {
      return response
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: MESSAGES.PROFILE_NOT_FOUND });
    }

    const favorites = await favoriteService.getFavoritesByProfileId(
      profile._id
    );

    response.status(STATUS_CODES.SUCCESS).send({ data: favorites });
  } catch (error) {
    next(error);
  }
}

export default {
  getProfiles,
  createProfile,
  getSimulators,
  getFavorites,
};
