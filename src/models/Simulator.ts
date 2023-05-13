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
      // required: true,
    },
    dateRecorded: Date,
    cryptocurrency: String,
    euros: Number,
    price: Number,
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISimulator>("Simulator", schema);
