"use client";

import { useFormContext } from "../lib/useFormManager";
import { TextInput } from "./form/TextInput";
import { loginSchema, type LoginFormValues } from "../lib/schemas/loginSchema";
import { signIn } from "~/server/auth/actions/signIn";
import { useState } from "react";
import { FormProvider } from "./form/FormProvider";
import { signInSchema } from "~/server/auth/authSchemas";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [error, setState] = useState<{ message: string; success: boolean }>();

  async function onSubmit(data: LoginFormValues) {
    const errorMsg = await signIn(data);
    if (errorMsg) {
      setState({ message: errorMsg, success: false });
    } else {
      setState({
        message: "Du wurdest erfolgreich eingeloggt!",
        success: true,
      });
    }
  }

  return (
    <>
      <FormProvider
        schema={signInSchema}
        initialValues={initialValues}
        onSubmit={(data) => onSubmit(data)} // Log the data on submit
      >
        {error && (
          <>
            <div
              className={`alert ${error.success ? "alert-success" : "alert-danger"}`}
            >
              {error.message}
            </div>
          </>
        )}
        <LoginFormInner />
      </FormProvider>
    </>
  );
};

function LoginFormInner() {
  const { handleSubmit } = useFormContext<LoginFormValues>();

  return (
    <>
      <form onSubmit={handleSubmit} id="form-login">
        <TextInput name="email" label="eMail" />
        <TextInput name="password" label="Passwort" type="password" />
        <hr />
        <button type="submit" className="btn btn-primary btn-block">
          Einloggen
        </button>
      </form>
    </>
  );
}
