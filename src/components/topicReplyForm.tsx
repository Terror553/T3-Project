"use client";

import { useEffect, useState } from "react";
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
  labelIds: [],
};

interface TopicReplyFormProps {
  topicId: number;
}

export const TopicReplyForm = ({ topicId }: TopicReplyFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [labels, setLabels] = useState<{ id: number; name: string; color: string }[]>([]);
  const { addNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    void fetch("/api/dashboard/forum/labels")
      .then(async (response) => response.ok ? setLabels((await response.json()) as { id: number; name: string; color: string }[]) : undefined)
      .catch((error: unknown) => console.error("Failed to load reply labels", error));
  });

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
      <TopicReplyInner isSubmitting={isSubmitting} labels={labels} />
    </FormProvider>
  );
};

function TopicReplyInner({ isSubmitting, labels }: { isSubmitting: boolean; labels: { id: number; name: string; color: string }[] }) {
  const { handleSubmit, values, setFieldValue } = useFormContext<ReplyValues>();

  return (
    <form onSubmit={handleSubmit} id="form-topic-reply">
      <TextArea labelHidden={true} label="Antwort" name="content" />
      {labels.length > 0 && (
        <div className="form-group">
          <label className="form-label" htmlFor="reply-labelIds">Labels</label>
          <select
            id="reply-labelIds"
            className="form-control"
            multiple
            value={(values.labelIds ?? []).map(String)}
            onChange={(event) => setFieldValue("labelIds", Array.from(event.target.selectedOptions, (option) => Number(option.value)))}
          >
            {labels.map((label) => <option key={label.id} value={label.id}>{label.name}</option>)}
          </select>
        </div>
      )}
      <hr />
      <Button type="submit" variant="primary" className="btn-block" disabled={isSubmitting}>
        {isSubmitting ? "Am Posten.." : "Antworten"}
      </Button>
    </form>
  );
}
