import express from "express";
import { router } from "./app/modules/routes/iindex.js";
import { globalErrorHandler } from "./app/middlewares/global.error.js";

const app = express();
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the Tour booking Express server!", 
    });
});

app.use(globalErrorHandler);

export default app;