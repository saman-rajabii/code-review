import { omit } from "lodash";
import { NextFunction, Request, Response } from "express";
import { favoriteService, profileService } from "../services";
import { MESSAGES, SORT_MODES, STATUS_CODES } from "../enums";
import { logger } from "../libs";

async function getFavorites(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { pageNumber, pageSize, sort } = request.query;

    const condition = omit(request.query, ["pageNumber", "pageSize", "sort"]);

    const [favorites, count] = await favoriteService.getFavorites(
      condition,
      Number(pageNumber),
      Number(pageSize),
      <SORT_MODES>sort
    );

    response.status(STATUS_CODES.SUCCESS).send({ data: { favorites, count } });
  } catch (error) {
    next(error);
  }
}

async function getFavoritesByProfileId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { profile_id } = request.params;

    const profile = await profileService.getProfileById(profile_id);

    logger.logInfo("getFavoritesByProfileId", profile_id);

    if (!profile) {
      response
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: MESSAGES.PROFILE_NOT_FOUND });
    }

    const favorites = await favoriteService.getFavoritesByProfileId(profile_id);

    response.status(STATUS_CODES.SUCCESS).send({ data: favorites });
  } catch (error) {
    next(error);
  }
}

export default {
  getFavorites,
  getFavoritesByProfileId,
};
