import { z } from "zod";

const cinemaSchema = z.object({
  name: z
    .string({ error: "Cinema name is required" })
    .min(1, "Cinema name cannot be less than a single character"),
  location: z
    .string({ error: "Location is needed " })
    .min(1, "Location name cannot be less than a single character"),

  address: z
    .string({ error: "Cinema detailed address is required" })
    .min(1, "Cinema address cannot be less than a character"),
  phone: z
    .string({ error: "Phone number cannot be empty" })
    .min(4, "Phone number cannot be less than 4 number")
    .max(10, "Phone number can't be greater then 10 characters"),
  isActive: z.boolean().default(true)
});

export { cinemaSchema };
