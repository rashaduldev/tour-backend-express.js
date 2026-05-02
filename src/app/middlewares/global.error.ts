import type { NextFunction, Request, Response } from "express";
import { envConfig } from "../config/env.js";

export const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        status,
        message,
        error: err,
        stack: envConfig.nodeEnv === "development" ? err.stack : null
    });
}