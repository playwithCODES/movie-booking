import {z} from "zod";

const seatSchema=z.object({
    hallId:z.string({error:"Hall ID is needed"}),
    seatNumber:z.string(),
    row:z.string(),
    category:z.enum(["SILVER","GOLD", "PLATINUM"]),
    status:z.enum(["MAINTENANCE", "AVAILABLE","UNAVAILABLE"])
})

export {seatSchema};