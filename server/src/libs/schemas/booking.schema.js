import {z} from "zod";

const bookingSchema=z.object({
    showId:z.string({error:"Show Id is needed"}),
    seatIds:z.array(z.string()),
})

const updateBookingSchema=bookingSchema.partial();
export {bookingSchema, updateBookingSchema};