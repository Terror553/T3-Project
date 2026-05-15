import { z } from "zod";

export const messageSchema = z.object({
  id: z.number().int(),
  recieverId: z.number().int(),
  message: z.string({
    required_error: "You must provide a Message.",
  }),
});
