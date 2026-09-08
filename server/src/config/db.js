import mongoose from "mongoose";
import config from "./config.js";
import dns from "dns";

dns.setServers(["8.8.8.8"]);

async function connectDB(){
    try {
        await mongoose.connect(config.mongodb_url);
        console.log("Mongodb connection is successful");

    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
        
    }
}

export default connectDB;
