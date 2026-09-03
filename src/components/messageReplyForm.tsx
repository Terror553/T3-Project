"use client";

import { useState } from "react";
import { useFormContext } from "../lib/useFormManager";
import type { z } from "zod";
import { FormProvider } from "./form/FormProvider";
import { useNotification } from "~/client/notification";
import { Button } from "~/components/ui";
import { TextArea } from "./form/TextArea";
import { replyMessageSchema } from "~/lib/schemas/messagingSchemas";
import { useRouter } from "next/navigation";

type MessageReplyValues = z.infer<typeof replyMessageSchema>;

const initialValues: MessageReplyValues = {
  messageId: 0,
  message: "",
};

interface MessageReplyFormProps {
  id: number;
  onSubmitted?: () => void | Promise<void>;
}

export const MessageReplyForm = ({
  id,
  onSubmitted,
}: MessageReplyFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotification();
  const router = useRouter();

  async function onSubmit(data: MessageReplyValues) {
    try {
      setIsSubmitting(true);

      data.messageId = id;

      const response = await fetch(`/api/messages/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: data.message }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: { message?: string; code?: string };
      };

      if (!response.ok || !result.success) {
        addNotification(
          `Error creating message reply, ${result.error?.message ?? "Unknown error"} (${result.error?.code ?? "UNKNOWN"})`,
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
      router.refresh();
      await onSubmitted?.();
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
      schema={replyMessageSchema}
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
      <input name="messageId" value={id} readOnly hidden={true} />
      <hr />
      <Button
        type="submit"
        variant="primary"
        className="w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Am Posten.." : "Posten"}
      </Button>
    </form>
  );
}
