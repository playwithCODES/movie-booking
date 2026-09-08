import express from "express";
import healthRouter from "../src/routes/health.route.js"
import movieRouter from "../src/routes/movie.route.js"
import cinemaRouter from "../src/routes/cinema.route.js"
import hallRouter from "../src/routes/hall.route.js"
import seatRouter from "../src/routes/seat.route.js"
import errorMiddleWare from "./middleware/error.middleware.js";


const app=express();
app.use(express.json());
app.use("/api/health", healthRouter);
app.use("/api/movies", movieRouter);
app.use("/api/cinemas", cinemaRouter);
app.use("/api/halls", hallRouter);
app.use("/api/seats", seatRouter);
app.use(errorMiddleWare);


export default app;
