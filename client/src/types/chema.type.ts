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

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const formArticleSchema = z.object({
  title: z.string().min(2, "Please fill the title"),
  description: z.string().min(2, "Please fill the description"),
  content: z.string().optional(),
  categoryId: z.string().min(2, "Please choose a category"),
  thumbnail: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});
