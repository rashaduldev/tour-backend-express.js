import { Server } from "http";

import mongoose from "mongoose";
import app from "./app.js";

let server:Server;

const startServer = async() => {
    try {
        await mongoose.connect("mongodb+srv://rashaduldev_db_user:rashaduldev_db_pass@cluster0.kezdou4.mongodb.net/tour-db?appName=Cluster0");
        console.log("Connected to MongoDB");

        server = app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}
startServer();