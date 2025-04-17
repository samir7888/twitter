import { z } from "zod";

export const profileFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  bio: z.string().max(160, "Bio must be at most 160 characters").optional(),
  dob: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      "Date of birth must be a valid date"
    ),
  location: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{7,15}$/, "Phone number must be 7 to 15 digits"),
  countryCode: z
    .string()
    .regex(/^\+\d{1,4}$/, "Country code must be in the format +1, +91, etc."),
});
