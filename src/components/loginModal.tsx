"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useTheme } from "~/client/theme";
import { signIn } from "~/server/auth/actions/signIn";
import type { signInSchema } from "~/server/auth/authSchemas";

export const LoginModal = () => {
  const [error, setError] = useState<string>();
  const [email, setEMail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
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
      setLoading(true);
      theme.showLoadingBar("loginLoading");
      const error = await signIn({
        email: email,
        password,
      });
      if (error) {
        setError(error.toString());
        theme.hideLoadingBar("loginLoading");
        setLoading(false);
      } else {
        theme.hideLoadingBar("loginLoading");
        setLoading(false);

        // --- Add code to hide the modal ---
        // Option 1: Using jQuery (if available globally, common with Bootstrap v4)
        // Ensure jQuery and Bootstrap JS are loaded
        if (typeof window !== "undefined" && (window as any).$) {
          (window as any).$("#modal-login").modal("hide");
        } else {
          // Option 2: Vanilla JS for Bootstrap 5 (if using BS5 JS)
          const modalElement = document.getElementById("modal-login");
          if (modalElement && (window as any).bootstrap?.Modal) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(
              modalElement,
            );
            modalInstance?.hide();
            // Ensure backdrop is removed if hide doesn't do it fully before redirect
            const backdrop = document.querySelector(".modal-backdrop");
            backdrop?.remove();
            document.body.classList.remove("modal-open");
            document.body.style.overflow = ""; // Restore body scroll
          } else {
            console.warn(
              "Couldn't find jQuery or Bootstrap 5 Modal instance to close the modal programmatically.",
            );
          }
        }

        redirect("/");
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
                  <div className="modal-title">Einloggen</div>
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
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={loading}
                    >
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
