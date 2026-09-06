import express from "express";
import healthRouter from "../src/routes/health.route.js"


const app=express();
app.use(express.json());
app.use("/api/health", healthRouter);


export default app;
