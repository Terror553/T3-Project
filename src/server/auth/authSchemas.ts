import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUpSchema = z
  .object({
    username: z
      .string({ required_error: "Username must be provided" })
      .min(2, { message: "Username must be at least 2 characters" })
      .max(64, { message: "Username cant be longer than 64 characters" })
      .regex(/^[a-zA-Z0-9]*$/, {
        message: "Username can only contain letters or numbers.",
      }),
    email: z
      .string({ required_error: "Email must be provided" })
      .email({ message: "Email must be a valid email" }),
    password: z
      .string({ required_error: "Password must be provided" })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        {
          message:
            "Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.",
        },
      ),
    passwordConfirm: z
      .string({ required_error: "Password must be provided" })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        {
          message:
            "Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.",
        },
      ),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm != password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwowrd & Confirm Password must match",
        path: ["password"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwowrd & Confirm Password must match",
        path: ["passwordConfirm"],
      });
    }
  });
