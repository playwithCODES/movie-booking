import { z } from "zod";

const seatCategorySchema = z.object({
  basePrice: z.number({
    required_error: "Base Price is compulsory",
  }),
});

export { seatCategorySchema };