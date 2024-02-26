import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      //   sparse: true,
    },
    password: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    expiryToken: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    loginType: {
      type: String,
      enum: ["reader", "writer", "publisher", "creators", "brands"],
      default: "writer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;