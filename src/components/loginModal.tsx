"use client";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useTheme } from "~/client/theme";
import { signIn } from "~/server/auth/actions/signIn";
import type { signInSchema } from "~/server/auth/authSchemas";

export const LoginModal = () => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Add refs for the inputs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function onSubmit() {
    // Always read the latest value from the DOM (works with autofill)
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (!email || !password) {
      setError("eMail and Password must be present!");
      return;
    }

    const error = await signIn({ email, password });
    if (error) {
      setError(error);
    }

    const modalElement = document.getElementById("modal-login");
    if (modalElement && (window as any).bootstrap?.Modal) {
      const modalInstance =
        (window as any).bootstrap.Modal.getInstance(modalElement) ??
        new (window as any).bootstrap.Modal(modalElement);
      modalInstance.hide();
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    } else {
      console.warn(
        "Couldn't find Bootstrap 5 Modal instance to close the modal programmatically. Is Bootstrap JS loaded?",
      );
    }
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {error && <p className="text-destructive">{error}</p>}
        <div className="modal fade" id="modal-login">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title">Einloggen</div>
                <a href="#" className="close" data-bs-dismiss="modal">
                  <i className="fas fa-times"></i>
                </a>
              </div>
              <div className="modal-body">
                {error && <p className="text-destructive">{error}</p>}
                <div className="form-group">
                  <label className="form-label">eMail</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    ref={emailRef}
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Passwort</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    ref={passwordRef}
                    autoComplete="current-password"
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
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
