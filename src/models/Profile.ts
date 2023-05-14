import mongoose from "../db/mongodb";

const { Schema } = mongoose;

export interface IProfile extends mongoose.Document {
  name: string;
  nickname: string;
  email: string;
  capital: number;
  divisa: string;
  prefered_cryptocurrency: string;
}

const schema = new Schema(
  {
    name: String,
    nickname: String,
    email: String,
    capital: Number,
    divisa: String,
    prefered_cryptocurrency: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProfile>("Profile", schema);
