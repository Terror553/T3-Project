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

interface MessageReplyFormProps {
  id: number;
}

export const MessageReplyForm = ({ id }: MessageReplyFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotification();
  const router = useRouter();

  async function onSubmit(data: MessageReplyValues) {
    try {
      setIsSubmitting(true);

      data.id = id;
      initialValues.id = id;
      const result = await sendMessageReply(data);

      if (!result.success) {
        addNotification(
          `Error creating topic, ${result.error?.message} (${result.error?.code})`,
          "error",
          5000,
        );
        return;
      }

      if (result.error) {
        console.error(
          `An error occured: ${result.error.message} (${result.error.code})`,
          result.error,
        );
        addNotification(
          `An error occured: ${result.error.message} (${result.error.code})`,
          "error",
          5000,
        );
        return;
      }
      console.log("Message reply created with ID:", result.data);
      router.refresh();
      addNotification(`Message sent successfully!`, "success", 5000);
    } catch (error) {
      console.error("Message sending error:", error);
      addNotification(
        `Unexpected error occurred: ${error}`,
        "error",
        Math.random() * 10000,
      );
      return;
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  }

  return (
    <FormProvider
      schema={messageSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <MessageReplyInner isSubmitting={isSubmitting} id={id} />
    </FormProvider>
  );
};

function MessageReplyInner({
  isSubmitting,
  id,
}: {
  isSubmitting: boolean;
  id: number;
}) {
  const { handleSubmit } = useFormContext<MessageReplyValues>();

  return (
    <form onSubmit={handleSubmit} id="form-message-reply">
      <TextArea labelHidden={true} label="Message" name="message" />
      <input name="id" value={id} readOnly hidden={true} />
      <hr />
      <Button
        type="submit"
        variant="primary"
        className="btn-block"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Am Posten.." : "Posten"}
      </Button>
    </form>
  );
}
