import type { Request, Response } from "express";
import { User } from "./user.model.js";

// GET /users/admin/:email  -> { admin: boolean }
export const isAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    res.status(200).json({ admin: user?.role === "admin" });
  } catch (error) {
    res.status(500).json({ message: "Lookup failed", error: String(error) });
  }
};

// GET /users  (admin only) -> list of users
export const getAllUsers = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to load users", error: String(error) });
  }
};

// DELETE /users/:id  (admin only)
export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ deletedCount: 1 });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: String(error) });
  }
};

// PATCH /users/:id/role  (admin only) { role }
export const updateRole = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body ?? {};
    if (role !== "user" && role !== "admin") {
      res.status(400).json({ message: "role must be 'user' or 'admin'" });
      return;
    }
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update role", error: String(error) });
  }
};
