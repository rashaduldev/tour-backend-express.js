import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import type { IUser, IUserModel } from "./user.interface.js";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // `select: false` keeps the hash out of normal queries.
    password: { type: String, select: false },
    photo: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

// Hash the password whenever it is set/changed.
// Mongoose v9 async middleware returns a promise — no `next` callback.
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (
  candidate: string,
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

export const User = model<IUser, IUserModel>("User", userSchema);
