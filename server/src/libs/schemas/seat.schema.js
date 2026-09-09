import {z} from "zod";

const seatSchema=z.object({
    hallId:z.string({error:"Hall ID is needed"}),
    seatNumber:z.string(),
    row:z.string(),
    category:z.enum(["SILVER","GOLD", "PLATINUM"]),
    status:z.enum(["MAINTENANCE", "AVAILABLE","UNAVAILABLE"])
})

const updateSeatSchema = seatSchema.partial();

export {seatSchema, updateSeatSchema};