import express from "express";
import movieRouter from "../src/routes/movie.route.js"
import cinemaRouter from "../src/routes/cinema.route.js"
import hallRouter from "../src/routes/hall.route.js"
import seatRouter from "../src/routes/seat.route.js"
import showRouter from "../src/routes/show.route.js"
import userRouter from "../src/routes/user.route.js"
import authRouter from "../src/routes/auth.route.js"
import errorMiddleWare from "./middleware/error.middleware.js";


const app=express();
app.use(express.json());
app.use("/api/movies", movieRouter);
app.use("/api/cinemas", cinemaRouter);
app.use("/api/halls", hallRouter);
app.use("/api/seats", seatRouter);
app.use("/api/shows",showRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use(errorMiddleWare);


export default app;
