import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  fullName: string;
  email: string;
  salt: string;
  hash: string;
  role: string;
}

const UsersSchema = new mongoose.Schema<Users>({
  fullName: {
    type: String,
    required: [true, "Please set the user's full name."],
  },
  email: {
    type: String,
    required: [true, "Please set the user's email address."],
  },
  salt: {
    type: String,
    required: [true, "Please set a hash salt for password security."],
  },
  hash: {
    type: String,
    required: [true, "Please set the user's hashed password."],
  },
  role: {
    type: String,
    default: "user",
  },
});

export default mongoose.models.Users ||
  mongoose.model<Users>("Users", UsersSchema);
