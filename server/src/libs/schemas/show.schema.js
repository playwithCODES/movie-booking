import {z} from "zod";

const showSchema=z.object({
movieId:z.string({error:"Movie Id is needed"}),
cinemaId:z.string({error:"cinema Id is needed"}),
hallId:z.string({error:"hall Id is needed"}),
date:z.coerce.date(),
startTime:z.string(),
endTime:z.string(),
silverPrice: z.number().min(0),
goldPrice: z.number().min(0),
platinumPrice: z.number().min(0),
isActive: z.boolean().default(true)
});

const updateShowSchema=showSchema.partial();

export {showSchema, updateShowSchema};