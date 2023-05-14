import mongoose from "../db/mongodb";

const { Schema } = mongoose;

export interface IFavorite extends mongoose.Document {
  profile_id: mongoose.Types.ObjectId;
  name: string;
  favorite1: string;
  favorite2: string;
  favorite3: string;
}

const schema = new Schema(
  {
    profile_id: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      // required: true,
    },
    name: String,
    favorite1: String,
    favorite2: String,
    favorite3: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFavorite>("Favorite", schema);
