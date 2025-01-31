import { z } from "zod";

export const UserSchema = z.object(
  {
    email: z
      .string({
        message: "Email must be a string",
        required_error: "Email must be provided",
      })
      .email({
        message: "Email must be a valid email address",
      }),
    first_name: z
      .string({
        message: "First name must be a string",
        required_error: "First name must be provided",
      }),
      last_name: z
      .string({
        message: "Last name must be a string",
        required_error: "Last name must be provided",
      }),
    password: z
      .string({
        message: "Password must be a string",
        required_error: "Password must be provided",
      })
      .min(8, { message: "Password must be at least 8 characters long" })
      // Check for uppercase letter
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter",
      })
      // Check for lowercase letter
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter",
      })
      // Check for a number
      .refine((password) => /\d/.test(password), {
        message: "Password must contain at least one number",
      })
      // Check for a special character
      .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
        message: "Password must contain at least one special character",
      }),
    // phone_number: z
    //   .string({
    //     message: "Phone Number must be a string",
    //     required_error: "Phone Number must be provided",
    //   })
    //   .startsWith("+254", { message: "Phone number must start with +254" }),
  },
  { message: "Please provide all required fields" }
);
