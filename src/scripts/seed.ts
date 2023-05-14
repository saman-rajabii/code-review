import mongoose from "../db/mongodb";
import { logger } from "../libs";
import { Profile } from "../models";
import { Simulator } from "../models";
import { Favorite } from "../models";

(async () => {
  logger.logInfo("start seeding");

  const profile = new Profile({
    name: "String",
    email: "String",
    capital: 123,
    divisa: "String",
    prefered_cryptocurrency: "String",
  });
  await profile.save();

  const query = { _id: "6093abb3dfd9da1deeae56f2" };
  const idProfile = await Profile.findOne(query).then((e) => {
    return e?._id;
  });

  const simulator = new Simulator({
    profile_id: idProfile,
    name: `String`,
    start_date: `01/05/2021`,
    check_date: `01/05/2021`,
    cryptocurrency: `String`,
    divisa: `String`,
    Crypto_price_start: `123`,
    Crypto_price_check: `123`,
  });
  await simulator.save();

  const favorite = new Favorite({
    profile_id: idProfile,
    name: `String`,
    favorites: [`String1`, `String2`, `String3`],
  });
  await favorite.save();

  logger.logInfo("end seeding");

  mongoose.disconnect();
})();
