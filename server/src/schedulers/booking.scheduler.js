import cron from "node-cron";
import bookingService from "../services/booking.service.js";

cron.schedule("* * * * *", async () => {
  console.log("Checking expired bookings...");

  await bookingService.expireBookings();
});

