"use client";

import { useState } from "react";
import { useFormContext } from "../lib/useFormManager";
import { TextInput } from "./form/TextInput";
import { signInSchema } from "~/server/auth/authSchemas";
import type { z } from "zod";
import { signIn } from "~/server/auth/actions/signIn";
import { FormProvider } from "./form/FormProvider";
import { useUser } from "~/client/user";
import { useNotification } from "~/client/notification";
import { Button } from "~/components/ui";

type SignInFormValues = z.infer<typeof signInSchema>;

const initialValues: SignInFormValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refreshUser } = useUser();
  const { addNotification } = useNotification();

  async function onSubmit(data: SignInFormValues) {
    try {
      setIsSubmitting(true);

      const result = await signIn(data);

      if (result && !result.success) {
        addNotification("Login failed!", "error", 5000);
        return;
      }

      // Success - refresh user data and redirect
      await refreshUser();
      addNotification(
        `Login successful, Welcome ${result.data?.username}!`,
        "success",
        5000,
      );

      // Close modal if it's in a modal
      const modalElement = document.getElementById("modal-login");
      if (modalElement) {
        const bootstrapModal = (window as any).bootstrap?.Modal?.getInstance(
          modalElement,
        );
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      }
    } catch (error) {
      console.error("Login error:", error);
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
      schema={signInSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <LoginFormInner isSubmitting={isSubmitting} />
    </FormProvider>
  );
};

function LoginFormInner({ isSubmitting }: { isSubmitting: boolean }) {
  const { handleSubmit } = useFormContext<SignInFormValues>();

  return (
    <form onSubmit={handleSubmit} id="form-login">
      <TextInput name="email" label="eMail" />
      <TextInput name="password" label="Passwort" type="password" />
      <hr />
      <Button
        type="submit"
        variant="primary"
        className="btn-block"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Einloggen"}
      </Button>
    </form>
  );
}
