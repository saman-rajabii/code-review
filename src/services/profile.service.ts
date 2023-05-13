import { SORT_MODES } from "../enums";
import { Profile, IProfile } from "../models";
async function getProfiles(
  condition: any = {},
  pageNumber = 1,
  pageSize = 20,
  sort = SORT_MODES.DSC
): Promise<[Partial<IProfile>[], number]> {
  const profiles = await Profile.find(condition)
    .lean()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: sort == SORT_MODES.ASC ? 1 : -1 });
  const profilesCount = await Profile.countDocuments(condition);

  return [profiles, profilesCount];
}

async function getProfileById(id: string): Promise<IProfile> {
  return Profile.findById(id);
}

async function createProfile(data: Partial<IProfile>): Promise<IProfile> {
  const profile = Profile.findOne({
    $or: [{ email: data.email }, { nickname: data.nickname }],
  }).exec();

  if (!profile) {
    return Profile.create(data);
  }
  return profile;
}

export default {
  getProfiles,
  getProfileById,
  createProfile,
};
