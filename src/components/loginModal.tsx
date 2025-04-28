"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { signIn } from "~/server/auth/actions/signIn";
import type { signInSchema } from "~/server/auth/authSchemas";

export const LoginModal = () => {
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
      if (error) {
        setError(error.toString());
      }
    }
  }

  return (
    <div>
      <>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <p className="text-destructive">{error}</p>}
          <div className="modal fade" id="modal-login">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-title"></div>
                  <a href="#" className="close" data-bs-dismiss="modal">
                    <i className="fas fa-times"></i>
                  </a>
                </div>

                <div className="modal-body">
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
                    <a
                      href="/reset-password"
                      className="form-meta mt-0 ms-auto"
                    >
                      Passwort Vergessen?
                    </a>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="form-group d-flex">
                    <a
                      href="/reset-password"
                      className="form-meta mt-0 ms-auto"
                    >
                      Passwort Vergessen?
                    </a>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary btn-block">
                      Einloggen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    </div>
  );
};
