import mongoose from "../db/mongodb";

const { Schema } = mongoose;

export interface ISimulator extends mongoose.Document {
  profile_id: mongoose.Types.ObjectId;
  dateRecorded: Date;
  cryptocurrency: string;
  euros: number;
  price: number;
  quantity: number;
}

const schema = new Schema(
  {
    profile_id: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: true,
      index: true,
    },
    dateRecorded: {
      type: Date,
      required: true,
    },
    cryptocurrency: {
      type: String,
      required: true,
    },
    euros: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISimulator>("Simulator", schema);
