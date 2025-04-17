import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    role: z.enum(["ADMIN", "USER", "MODERATOR"], {
        message: "Role must be one of ADMIN, USER, or MODERATOR",
    }),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username must be less than 20 characters" }),
});
