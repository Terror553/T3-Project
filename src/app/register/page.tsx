"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useNotification } from "~/client/notification";
import { signUp } from "~/server/auth/actions/signUp";
import type { signUpSchema } from "~/server/auth/authSchemas";

export default function RegisterPage() {
  const [error, setError] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [email, setEMail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const { addNotification } = useNotification();
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
      if (error.success) {
        addNotification("Registration successful! Please log in.", "success", 5000);
        window.location.href = `/`;
        return;
      }
      setError(error.error?.message || "An unknown error occurred");
    }
  }

  return (
    <div className="content">
      <div className="page-header mb-3"><h1 className="h3">Sign Up</h1></div>
      {error && <div className="alert alert-danger" role="alert"><strong>Please fix the following error:</strong> {error}</div>}
      <div className="card">
      <div className="card-header">Create account</div>
        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    onChange={(e) => setEMail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="username">Username</label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="passwordConfirm">Confirm password</label>
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
                    <label className="form-check-label" htmlFor="input-remember">Remember me</label>
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
                <a href="/login" className="btn btn-secondary btn-block">
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
