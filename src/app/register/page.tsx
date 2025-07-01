"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { signUp } from "~/server/auth/actions/signUp";
import type { signUpSchema } from "~/server/auth/authSchemas";

export default function RegisterPage() {
  const [error, setError] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [email, setEMail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit() {
    if (
      typeof email === "undefined" ||
      typeof password === "undefined" ||
      typeof username === "undefined" ||
      typeof passwordConfirm === "undefined"
    ) {
      setError("eMail, Username and Password must be present!");
    } else {
      const error = await signUp({
        username: username,
        email: email,
        password,
        passwordConfirm,
      });
      console.log({
        username: username,
        email: email,
        password,
        passwordConfirm,
      });
      console.log(error);
      setError(error.error?.message || "An unknown error occurred");
    }
  }

  return (
    <div className="content">
      <h2>Sign Up</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="card">
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <label className="form-label">Benutzername</label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
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
                <div className="form-group">
                  <label className="form-label">Passwort Bestätigen</label>
                  <input
                    className="form-control"
                    type="password"
                    name="passwordConfirm"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
                <div className="form-group d-flex">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="input-remember"
                      name="remember"
                      value="1"
                    />
                    <label className="form-check-label">Remember me</label>
                  </div>
                  <a href="/forgot_password" className="form-meta mt-0 ms-auto">
                    Forgot password?
                  </a>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign up
                  </button>
                </div>
              </form>
              <div>
                <div className="separator">Already registered?</div>
                <a href="/login" className="btn btn-success btn-block">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
