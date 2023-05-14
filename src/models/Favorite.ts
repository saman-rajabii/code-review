import mongoose from "../db/mongodb";

const { Schema } = mongoose;

export interface IFavorite extends mongoose.Document {
  profile_id: mongoose.Types.ObjectId;
  name: string;
  favorites: string[];
}

const schema = new Schema(
  {
    profile_id: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      // required: true,
    },
    name: String,
    favorites: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFavorite>("Favorite", schema);
