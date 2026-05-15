"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "../lib/useFormManager";
import { TextInput } from "./form/TextInput";
import type { z } from "zod";
import { FormProvider } from "./form/FormProvider";
import { useNotification } from "~/client/notification";
import { Button } from "~/components/ui";
import { useRouter } from "next/navigation";
import { createTopicSchema } from "~/lib/schemas/topicSchemas";
import { createTopic, getCategories } from "~/server/forum/forum";
import { TextArea } from "./form/TextArea";
import { useTheme } from "~/client/theme";
import { Select } from "./form/Select";

type TopicCreationValues = z.infer<typeof createTopicSchema>;

const initialValues: TopicCreationValues = {
  title: "",
  content: "",
  subcategory: "",
};

export const TopicCreationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<
    { slug: string; name: string }[]
  >([]);
  const { showLoadingBar, hideLoadingBar } = useTheme();
  const { addNotification } = useNotification();
  const router = useRouter();

  async function onSubmit(data: TopicCreationValues) {
    try {
      setIsSubmitting(true);

      const result = await createTopic(data);

      if (!result.success) {
        addNotification(
          `Error creating topic, ${result.error?.message} (${result.error?.code})`,
          "error",
          5000,
        );
        return;
      }

      // Success - refresh user data and redirect
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
      addNotification(`Topic created successfully!`, "success", 5000);
      router.push("/forum/subcategory/" + data.subcategory);
    } catch (error) {
      console.error("Topic creation error:", error);
      addNotification(
        `Unexpected error occurred: ${error}`,
        "error",
        Math.random() * 10000,
      );
      return;
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        showLoadingBar("loadingCategories");
        const result = await getCategories();

        if (!result) {
          addNotification(`Failed to load categories.`, "error", 5000);
        }
        const subCategories = result.flatMap((cat) => cat.forum_subcategories);
        setCategories(subCategories);
      } catch (error) {
        console.error("Topic creation error:", error);
        addNotification(
          `Unexpected Error: ${error}`,
          "error",
          Math.random() * 10000,
        );
      } finally {
        hideLoadingBar("loadingCategories");
      }
    }

    void loadCategories();
  }, [hideLoadingBar, showLoadingBar, addNotification]);

  return (
    <FormProvider
      schema={createTopicSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <TopicCreateInner isSubmitting={isSubmitting} categories={categories} />
    </FormProvider>
  );
};

function TopicCreateInner({
  isSubmitting,
  categories,
}: {
  isSubmitting: boolean;
  categories: { slug: string; name: string }[];
}) {
  const { handleSubmit } = useFormContext<TopicCreationValues>();

  return (
    <form onSubmit={handleSubmit} id="form-topic-create">
      <TextInput name="title" label="Titel" />
      <TextArea label="Content" name="content" />
      <Select
        label="Kategorie"
        name="subcategory"
        type="int"
        options={categories.map((cat) => ({
          value: cat.slug,
          label: cat.name,
        }))}
      />
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
