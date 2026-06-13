import { Router } from "express";
import { login, register, social } from "./auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/social", social);

export const authRoutes = router;
