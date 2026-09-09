import { z } from "zod";

const userSchema = z.object({
    name: z.string({ error: "Name is required" })
        .min(2, "Name must be at least 2 characters"),

    email: z.email({ error: "Invalid email address" }),

    phone: z.string({ error: "Phone number is required" }),

    password: z.string({ error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),
});

const updateUserSchema = userSchema.partial();

export { userSchema, updateUserSchema };