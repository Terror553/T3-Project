"use client";

import { useState } from "react";
import { useFormContext } from "../lib/useFormManager";
import { TextInput } from "./form/TextInput";
import type { z } from "zod";
import { FormProvider } from "./form/FormProvider";
import { useNotification } from "~/client/notification";
import { Button } from "~/components/ui";
import { redirect } from "next/navigation";
import { createTopicSchema } from "~/lib/schemas/createTopicSchema";
import { createTopic } from "~/server/forum/forum";
import { TextArea } from "./form/TextArea";

type TopicCreationValues = z.infer<typeof createTopicSchema>;

const initialValues: TopicCreationValues = {
  title: "",
  content: "",
  subcategory: 0,
};

export const TopicCreationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotification();

  async function onSubmit(data: TopicCreationValues) {
    try {
      setIsSubmitting(true);

      const result = await createTopic(data);

      if (result && !result.success) {
        addNotification(
          "Error creating topic, " +
            result.error?.message +
            " (" +
            result.error?.code +
            ")",
          "error",
          5000,
        );
        return;
      }

      // Success - refresh user data and redirect
      addNotification(`Topic created successfully!`, "success", 5000);
      redirect(`/forum/${result.data?.subcategory}/${result.data?.slug}`);
    } catch (error) {
      console.error("Topic creation error:", error);
      addNotification(
        "Unexpected error occurred",
        "error",
        Math.random() * 10000,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FormProvider
      schema={createTopicSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <TopicCreateInner isSubmitting={isSubmitting} />
    </FormProvider>
  );
};

function TopicCreateInner({ isSubmitting }: { isSubmitting: boolean }) {
  const { handleSubmit } = useFormContext<TopicCreationValues>();

  return (
    <form onSubmit={handleSubmit} id="form-topic-create">
      <TextInput name="title" label="Titel" />
      <TextArea label="Content" name="content" />
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
