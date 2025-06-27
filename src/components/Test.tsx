"use client";
import { useFormContext } from "../lib/useFormManager";
import { loginSchema, type LoginFormValues } from "../lib/schemas/loginSchema";
import { FormProvider } from "./form/FormProvider";
import { TextInput } from "./form/TextInput";
import { db } from "~/server/db";
import { useTheme } from "~/client/theme";
import { useEffect, useState } from "react";
import { getCategories } from "~/server/forum/forum";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export default function TestForm() {
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(data: LoginFormValues) {
    const [forumRes] = await Promise.all([fetch("/api/forum")]);
    if (!forumRes.ok) {
      setError(`User API Error ${forumRes.status}`);
      throw new Error(`User API Error ${forumRes.status}`);
    }
    const forumData = await forumRes.json();
    console.log("Submitted Data:", data);
    setError(null);
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <FormProvider
        schema={loginSchema}
        initialValues={initialValues}
        onSubmit={(data) => onSubmit(data)} // Log the data on submit
      >
        <LoginFormInner />
      </FormProvider>
    </div>
  );
}

// Separate the form to use the context
function LoginFormInner() {
  const { handleSubmit } = useFormContext<LoginFormValues>();

  return (
    <form onSubmit={handleSubmit}>
      <TextInput name="email" label="Email" />
      <TextInput name="password" label="Password" type="password" />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
