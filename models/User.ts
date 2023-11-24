import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  fullName: string;
  email: string;
  hash: string;
  role: string;
  verified: boolean;
}

const UsersSchema = new mongoose.Schema<Users>({
  fullName: {
    type: String,
    required: [true, "Please set the user's full name."],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please set the user's email address."],
  },
  hash: {
    type: String,
    required: [true, "Please set the user's hashed password."],
  },
  role: {
    type: String,
    default: "user",
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Users ||
  mongoose.model<Users>("Users", UsersSchema);
