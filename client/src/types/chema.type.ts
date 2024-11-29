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
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const formArticleSchema = z.object({
  title: z.string().min(2, "Please fill the title"),
  description: z.string().optional(),
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

export const formUpdateArticleSchema = z.object({
  title: z.string().min(2, "Please fill the title"),
  description: z.string().optional(),
  content: z.string().optional(),
  categoryId: z.string().min(2, "Please choose a category"),
  status: z.string().min(2, "Please choose a status"),
  oldThumbnail: z.string().optional(),
  // thumbnail: z
  //   .any()
  //   .optional()
  //   .refine((files: any) => {
  //     if (files && files[0]?.size <= MAX_FILE_SIZE) {
  //       return `Max file size is 5MB.`;
  //     }
  //   })
  //   .refine((files: any) => {
  //     if (files.length > 0 && ACCEPTED_IMAGE_TYPES.includes(files[0].type)) {
  //       return ".jpg, .jpeg, .png and .webp files are accepted.";
  //     }
  //   }),
});

export const formResendMailSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Please fill email address")
});

export const formSocialLinkSchema = z.object({
  name: z.string().min(1, "Please fill name address"),
  url: z.string().url("Your social link is not valid").min(1, "Please fill social link"),
});