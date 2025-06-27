"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "../lib/useFormManager";
import { TextInput } from "./form/TextInput";
import { loginSchema, type LoginFormValues } from "../lib/schemas/loginSchema";
import { signIn } from "~/server/auth/actions/signIn";
import { FormProvider } from "./form/FormProvider";
import { signInSchema } from "~/server/auth/authSchemas";
import { useUser } from "~/client/user";
import { useNotification } from "~/client/notification";
import { Button } from "~/components/ui";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refreshUser } = useUser();
  const { addNotification } = useNotification();
  const router = useRouter();

  async function onSubmit(data: LoginFormValues) {
    try {
      setIsSubmitting(true);
      
      const result = await signIn(data);
      
      if (result && !result.success) {
        addNotification(result.error?.message || "Login failed", "error");
        return;
      }
      
      // Success - refresh user data and redirect
      await refreshUser();
      addNotification("Login successful", "success");
      
      // Close modal if it's in a modal
      const modalElement = document.getElementById("modal-login");
      if (modalElement) {
        const bootstrapModal = (window as any).bootstrap?.Modal?.getInstance(modalElement);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      }
      
      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      addNotification("An unexpected error occurred", "error");
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
  const { handleSubmit } = useFormContext<LoginFormValues>();

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