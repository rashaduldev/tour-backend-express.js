import { Router } from "express";
import { getAllUsers, isAdmin, updateRole } from "./user.controller.js";
import { requireAdmin, verifyToken } from "../../middlewares/auth.js";

const router = Router();

// Any authenticated user can check admin status (used by the frontend session).
router.get("/admin/:email", verifyToken, isAdmin);

// Admin-only user management.
router.get("/", verifyToken, requireAdmin, getAllUsers);
router.patch("/:id/role", verifyToken, requireAdmin, updateRole);

export const userRoutes = router;
