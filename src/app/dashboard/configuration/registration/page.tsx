"use client";

import { useEffect, useState, type FormEvent } from "react";
import DashboardSection from "~/components/dashboard/DashboardSection";

type RegistrationSettings = {
  registrationEnabled: boolean;
  requireEmailVerification: boolean;
};

export default function Registration() {
  const [settings, setSettings] = useState<RegistrationSettings>({
    registrationEnabled: true,
    requireEmailVerification: false,
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/dashboard/configuration")
      .then(async (response) => {
        if (!response.ok)
          throw new Error(`Registration request failed (${response.status})`);
        const data = (await response.json()) as RegistrationSettings;
        setSettings({
          registrationEnabled: data.registrationEnabled,
          requireEmailVerification: data.requireEmailVerification,
        });
      })
      .catch((error: unknown) => {
        console.error("Failed to load registration settings", error);
        setStatus("Registration settings could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  async function save(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setStatus(null);
    const response = await fetch("/api/dashboard/configuration", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setStatus(
      response.ok
        ? "Registration settings saved."
        : "Registration settings could not be saved.",
    );
  }

  return (
    <DashboardSection
      title="Registration"
      description="Control whether new members can register and how their email is verified."
    >
      {loading ? (
        <p className="alert alert-info" role="status">
          Loading registration settings...
        </p>
      ) : (
        <form onSubmit={(event) => void save(event)}>
          {status && (
            <div className="alert alert-info" role="status">
              {status}
            </div>
          )}
          <div className="form-check form-switch mb-3">
            <input
              id="registrationEnabled"
              className="form-check-input"
              type="checkbox"
              checked={settings.registrationEnabled}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  registrationEnabled: event.target.checked,
                })
              }
            />
            <label className="form-check-label" htmlFor="registrationEnabled">
              Allow new registrations
            </label>
          </div>
          <div className="form-check form-switch mb-4">
            <input
              id="requireEmailVerification"
              className="form-check-input"
              type="checkbox"
              checked={settings.requireEmailVerification}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  requireEmailVerification: event.target.checked,
                })
              }
            />
            <label
              className="form-check-label"
              htmlFor="requireEmailVerification"
            >
              Require email verification
            </label>
          </div>
          <button className="btn btn-primary" type="submit">
            Save registration settings
          </button>
        </form>
      )}
    </DashboardSection>
  );
}
