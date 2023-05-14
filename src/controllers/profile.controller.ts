import { NextFunction, Request, Response } from "express";
import { profileService } from "../services";
import { SORT_MODES, STATUS_CODES } from "../enums";

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
    const { profile } = request.body;

    const res = await profileService.createProfile(profile);

    response.status(STATUS_CODES.SUCCESS).send({ data: res });
  } catch (error) {
    next(error);
  }
}

export default {
  getProfiles,
  createProfile,
};
