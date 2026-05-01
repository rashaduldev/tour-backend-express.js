import express from "express";
import { router } from "./app/modules/routes/iindex.js";
const app = express();
app.use("/api/v1", router);
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the Tour booking Express server!",
    });
});
export default app;
//# sourceMappingURL=app.js.map