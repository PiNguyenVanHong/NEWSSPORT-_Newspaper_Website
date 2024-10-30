import * as z from "zod";

export const formLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

export const formSignUpSchema = z
  .object({
    firstName: z.string().min(2, "First name musbe at least 2 characters"),
    lastName: z.string().min(2, "Last name musbe at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
    termsAccepted: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const formVerifySchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
