import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["quiz-taker", "quiz-creator"],
    default: "quiz-taker",
  },
});
export const User = mongoose.model("User", userSchema);
