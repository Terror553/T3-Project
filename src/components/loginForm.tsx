"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import type { z } from "zod";
import { signIn } from "~/server/auth/actions/signIn";
import type { signInSchema } from "~/server/auth/authSchemas";

export const LoginForm = () => {
  const [error, setError] = useState<string>();
  const [email, setEMail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit() {
    if (typeof email === "undefined" || typeof password === "undefined") {
      setError("eMail and Password must be present!");
    } else {
      const error = await signIn({
        email: email,
        password,
      });
      setError(error.toString());
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {error && <p className="text-destructive">{error}</p>}
      <div className="form-group">
        <label className="form-label">eMail</label>
        <input
          className="form-control"
          type="email"
          name="email"
          onChange={(e) => setEMail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Passwort</label>
        <input
          className="form-control"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group d-flex">
        <a href="/reset-password" className="form-meta mt-0 ms-auto">
          Passwort Vergessen?
        </a>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn-block">
          Einloggen
        </button>
      </div>
    </form>
  );
};
