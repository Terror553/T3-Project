"use client";

import { useState } from "react";
import { useFormContext } from "~/lib/useFormManager";
import type { z } from "zod";
import { FormProvider } from "./form/FormProvider";
import { useNotification } from "~/client/notification";
import { Button } from "~/components/ui";
import { TextArea } from "./form/TextArea";
import { createReplySchema } from "~/lib/schemas/topicSchemas";
import { createReply } from "~/server/forum/forum";
import { useRouter } from "next/navigation";

type ReplyValues = z.infer<typeof createReplySchema>;

const initialValues: ReplyValues = {
  content: "",
  topicId: null,
  slug: null,
};

interface TopicReplyFormProps {
  topicId: number;
}

export const TopicReplyForm = ({ topicId }: TopicReplyFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotification();
  const router = useRouter();

  async function onSubmit(data: ReplyValues) {
    try {
      setIsSubmitting(true);

      // Ensure topic id is set
      data.topicId = topicId;

      const result = await createReply(data);

      if (!result.success) {
        addNotification(
          `Error creating reply, ${result.error?.message} (${result.error?.code})`,
          "error",
          5000,
        );
        return;
      }

      addNotification(`Reply posted successfully!`, "success", 5000);
      router.refresh();
    } catch (error) {
      console.error("Reply creation error:", error);
      addNotification(`Unexpected error occurred: ${error}`, "error", 5000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FormProvider schema={createReplySchema} initialValues={initialValues} onSubmit={onSubmit}>
      <TopicReplyInner isSubmitting={isSubmitting} />
    </FormProvider>
  );
};

function TopicReplyInner({ isSubmitting }: { isSubmitting: boolean }) {
  const { handleSubmit } = useFormContext<ReplyValues>();

  return (
    <form onSubmit={handleSubmit} id="form-topic-reply">
      <TextArea labelHidden={true} label="Antwort" name="content" />
      <hr />
      <Button type="submit" variant="primary" className="btn-block" disabled={isSubmitting}>
        {isSubmitting ? "Am Posten.." : "Antworten"}
      </Button>
    </form>
  );
}
