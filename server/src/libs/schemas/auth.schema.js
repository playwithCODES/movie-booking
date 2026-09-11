import {z} from "zod";

const loginSchema=z.object({
     email: z.email("Invalid email address").optional(),

    phone: z.string().optional(),
   password:z.string().min(6,"Password must be at least 6 characters long")
}).refine(
    (data)=>data.email || data.phone,
    {
        message:"Email or Phone number is required",
        path:["email"],
    }
)

const forgotPasswordSchema=z.object({
    email:z.email("Invalid email address")
})

const resetPasswordQuerySchema=z.object({
    userId:z.string({error:"Please enter correct user Id"}),
    token:z.string({error:"Please enter correct token"}),
  
})

const resetPasswordBodySchema=z.object({
    password:z.string({error:"Please enter password"}).min(6, "Password must have at least 6 characters long")
})

export {loginSchema, forgotPasswordSchema, resetPasswordQuerySchema, resetPasswordBodySchema};