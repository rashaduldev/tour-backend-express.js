import type { Request, Response } from "express";
import { User } from "../user/user.model.js";
import { signToken } from "../../utils/jwt.js";
import type { IUser } from "../user/user.interface.js";

const toPublicUser = (user: IUser) => ({
  _id: String(user._id),
  name: user.name,
  email: user.email,
  photo: user.photo,
  role: user.role,
});

// POST /auth/register  { name, email, password, photo }
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, photo } = req.body ?? {};
    if (!name || !email || !password) {
      res.status(400).json({ message: "name, email and password are required" });
      return;
    }
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(409).json({ message: "Email already in use" });
      return;
    }
    const user = await User.create({ name, email, password, photo });
    const token = signToken({ email: user.email, role: user.role });
    res.status(201).json({ token, user: toPublicUser(user) });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: String(error) });
  }
};

// POST /auth/login  { email, password }
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      res.status(400).json({ message: "email and password are required" });
      return;
    }
    // password has select:false, so request it explicitly.
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const token = signToken({ email: user.email, role: user.role });
    res.status(200).json({ token, user: toPublicUser(user) });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: String(error) });
  }
};

// POST /auth/social  { email, name, photo }  — find-or-create for OAuth (Google)
export const social = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, photo } = req.body ?? {};
    if (!email) {
      res.status(400).json({ message: "email is required" });
      return;
    }
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name: name ?? email,
        photo,
        role: "user",
      });
    }
    const token = signToken({ email: user.email, role: user.role });
    res.status(200).json({ token, user: toPublicUser(user) });
  } catch (error) {
    res.status(500).json({ message: "Social login failed", error: String(error) });
  }
};
