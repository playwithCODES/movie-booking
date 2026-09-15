import {z} from "zod";

const paymentSchema=z.object({
    bookingId:z.string(),
    userId:z.string(),
    amount:z.number(),
    paymentMethod:z.string(),
    transactionId:z.string(),
   
})

export {paymentSchema};