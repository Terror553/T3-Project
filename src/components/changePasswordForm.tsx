"use client";

import { useState } from "react";
import { useFormContext } from "../lib/useFormManager";
import { TextInput } from "./form/TextInput";
import { passwordChangeSchema } from "~/server/auth/authSchemas";
import type { z } from "zod";
import { FormProvider } from "./form/FormProvider";
import { useUser } from "~/client/user";
import { useNotification } from "~/client/notification";
import { Button } from "~/components/ui";
import { changePassword } from "~/server/auth/actions/changePassword";

type PasswordChangeValues = z.infer<typeof passwordChangeSchema>;

const initialValues: PasswordChangeValues = {
  currentPassword: "",
  password: "",
    passwordConfirm: "",
};

export const PasswordChangeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshUser } = useUser();
  const { addNotification } = useNotification();

  async function onSubmit(data: PasswordChangeValues) {
    try {
      setIsSubmitting(true);

      const result = await changePassword(data);

      if (result && !result.success) {
        setError("" + result.error?.message);
        return;
      }

      // Success - refresh user data and redirect
      await refreshUser();
      addNotification(
        `Password changed successfully!`,
        "success",
        5000,
      );

    } catch (error) {
      console.error("Password change error:", error);
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
      schema={passwordChangeSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
        <p className="alert alert-danger">{error}</p>
      <PasswordChangeFormInner isSubmitting={isSubmitting} />
    </FormProvider>
  );
};

function PasswordChangeFormInner({ isSubmitting }: { isSubmitting: boolean }) {
  const { handleSubmit } = useFormContext<PasswordChangeValues>();

  return (
    <form onSubmit={handleSubmit} id="form-password-change">
      <TextInput name="currentPassword" label="Aktuelles Passwort" type="password" />
      <TextInput name="password" label="Neues Passwort" type="password" />
      <TextInput name="passwordConfirm" label="Neues Passwort bestätigen" type="password" />
      <hr />
      <Button
        type="submit"
        variant="primary"
        className="btn-block"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Changing password..." : "Change Password"}
      </Button>
    </form>
  );
}
