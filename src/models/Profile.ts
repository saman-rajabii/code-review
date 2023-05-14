import mongoose from "../db/mongodb";

const { Schema } = mongoose;

export interface IProfile extends mongoose.Document {
  name: string;
  nickname: string;
  email: string;
  capital: number;
  divisa: string;
  preferredCryptocurrency: string;
}

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    capital: {
      type: Number,
      required: true,
    },
    divisa: {
      type: String,
      required: true,
    },
    preferredCryptocurrency: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProfile>("Profile", schema);
