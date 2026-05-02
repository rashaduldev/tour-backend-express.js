import type { NextFunction, Request, Response } from "express";
import { userService } from "./user.service.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const user = await userService.createUser(req.body);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user
    })
    } catch (error) {
        next(error);
    }
}

export const userController = {
    createUser
}