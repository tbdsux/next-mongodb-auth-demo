import mongoose from "mongoose";

export interface Tokens extends mongoose.Document {
  token: string;
  purpose: string; // forgot-password | confirm-account
  userId: string;
}

const TokensSchema = new mongoose.Schema<Tokens>({
  token: {
    type: String,
    required: [true, ""],
  },
  purpose: {
    type: String,
    required: [true, ""],
  },
  userId: {
    type: String,
    required: [true, ""],
  },
});

export default mongoose.models.Tokens ||
  mongoose.model<Tokens>("Tokens", TokensSchema);
