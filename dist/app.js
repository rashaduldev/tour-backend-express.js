import express from "express";
const app = express();
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Tour booking Express server!",
    });
});
export default app;
//# sourceMappingURL=app.js.map