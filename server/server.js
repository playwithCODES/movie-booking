import express from "express";
import config from "./src/config/config.js";
import app from "./src/app.js";

app.listen(config.port,()=>{
    console.log(`Cinema Booking API is running on the ${config.port}`);
} )

