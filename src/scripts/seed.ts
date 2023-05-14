import mongoose from "../db/mongodb";
import { logger } from "../libs";
import { Profile } from "../models";
import { Simulator } from "../models";
import { Favorite } from "../models";

(async () => {
  logger.logInfo("start seeding");

  const profileId = "6093abb3dfd9da1deeae56f2";

  const profile = new Profile({
    _id: profileId,
    name: "Name",
    email: "Nickname",
    capital: 123,
    divisa: "Divisa",
    preferredCryptocurrency: "preferredCryptocurrency",
  });

  await profile.save();

  const simulator = new Simulator({
    profile_id: profileId,
    dateRecorded: new Date(),
    cryptocurrency: "cryptocurrency",
    euros: 2000,
    price: 1000,
    quantity: 100,
  });

  await simulator.save();

  const favorite = new Favorite({
    profile_id: profileId,
    name: `Favorite`,
    favorites: [`String1`, `String2`, `String3`],
  });
  await favorite.save();

  logger.logInfo("end seeding");

  mongoose.disconnect();
})();
