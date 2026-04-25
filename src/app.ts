import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Tour booking Express server!", 
    });
});

export default app;

export function listen(arg0: number, arg1: () => void): import("node:http").Server<typeof import("node:http").IncomingMessage, typeof import("node:http").ServerResponse> {
    throw new Error("Function not implemented.");
}
