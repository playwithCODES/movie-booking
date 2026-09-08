import {z} from "zod";
const hallSchema=z.object({
    name:z.string({error:"Hall name is required"}).min(1, "Hall name cannot be less than a single character"),
    cinemaId:z.string(),
    totalSeats:z.number({error:"SeatNumber is required"}).min(50, "Number of seats cannot be less than 50"),
    isActive: z.boolean().default(true),
    
})

export {hallSchema};