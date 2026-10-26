import express from "express";
import movieRouter from "../src/routes/movie.route.js"
import cinemaRouter from "../src/routes/cinema.route.js"
import hallRouter from "../src/routes/hall.route.js"
import seatRouter from "../src/routes/seat.route.js"
import showRouter from "../src/routes/show.route.js"
import userRouter from "../src/routes/user.route.js"
import authRouter from "../src/routes/auth.route.js"
import discountRouter from "../src/routes/discount.route.js"
import bookingRouter from "../src/routes/booking.route.js"
import paymentRouter from "../src/routes/payment.route.js"
import ticketRouter from "../src/routes/ticket.route.js"
import errorMiddleWare from "./middleware/error.middleware.js";
import cors from "cors";


const app=express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use("/api/movies", movieRouter);
app.use("/api/cinemas", cinemaRouter);
app.use("/api/halls", hallRouter);
app.use("/api/seats", seatRouter);
app.use("/api/shows",showRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/discount", discountRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/ticket", ticketRouter);
app.use(errorMiddleWare);


export default app;
