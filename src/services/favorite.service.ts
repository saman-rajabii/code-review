import { SORT_MODES } from "../enums";
import { Favorite, IFavorite } from "../models";
async function getFavorites(
  pageNumber = 1,
  pageSize = 20,
  sort = SORT_MODES.DSC
): Promise<[Partial<IFavorite>[], number]> {
  const favorites = await Favorite.find()
    .lean()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: sort == SORT_MODES.ASC ? 1 : -1 });
  const favoritesCount = await Favorite.countDocuments();

  return [favorites, favoritesCount];
}

async function getFavoritesByProfileId(
  profile_id: string
): Promise<IFavorite[]> {
  return Favorite.find({ profile_id }).lean();
}

export default {
  getFavorites,
  getFavoritesByProfileId,
};
