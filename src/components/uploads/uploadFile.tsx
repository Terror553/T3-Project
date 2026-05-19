"use client";

import { useState } from "react";
import type { z } from "zod";
import { useNotification } from "~/client/notification";
import { Button } from "~/components/ui";
import { messageSchema } from "~/lib/schemas/messageSchema";
import { sendMessageReply } from "~/server/auth/actions/messageActions";
import { useRouter } from "next/navigation";
import { FormProvider } from "../form/FormProvider";
import { useFormContext } from "~/lib/useFormManager";
import { TextArea } from "../form/TextArea";

type MessageReplyValues = z.infer<typeof messageSchema>;

const initialValues: MessageReplyValues = {
  id: 0,
  message: "",
  recieverId: 0,
};
