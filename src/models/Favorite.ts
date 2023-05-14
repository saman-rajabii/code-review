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
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFavorite>("Favorite", schema);
