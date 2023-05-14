import { SORT_MODES } from "../enums";
import { ISimulator, Simulator } from "../models";
async function getSimulators(
  pageNumber = 1,
  pageSize = 20,
  sort = SORT_MODES.DSC
): Promise<[Partial<ISimulator>[], number]> {
  const simulators = await Simulator.find()
    .lean()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ createdAt: sort == SORT_MODES.ASC ? 1 : -1 });
  const simulatorsCount = await Simulator.countDocuments();

  return [simulators, simulatorsCount];
}

async function getSimulatorsByProfileId(
  profile_id: string
): Promise<ISimulator[]> {
  return Simulator.find({ profile_id }).lean();
}

async function createSimulator(data: Partial<ISimulator>): Promise<ISimulator> {
  return Simulator.create(data);
}

export default {
  getSimulators,
  getSimulatorsByProfileId,
  createSimulator,
};
