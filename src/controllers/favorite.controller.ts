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

    const [favorites, count] = await favoriteService.getFavorites(
      Number(pageNumber),
      Number(pageSize),
      <SORT_MODES>sort
    );

    response.status(STATUS_CODES.SUCCESS).send({ data: { favorites, count } });
  } catch (error) {
    next(error);
  }
}

export default {
  getFavorites,
};
