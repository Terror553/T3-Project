"use client";

import { useEffect, useState, type FormEvent } from "react";
import DashboardSection from "~/components/dashboard/DashboardSection";

type PolicySettings = { privacyPolicy: string; termsOfService: string };

export default function Privacy() {
  const [settings, setSettings] = useState<PolicySettings>({
    privacyPolicy: "",
    termsOfService: "",
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/dashboard/configuration")
      .then(async (response) => {
        if (!response.ok)
          throw new Error(`Policy request failed (${response.status})`);
        const data = (await response.json()) as PolicySettings;
        setSettings({
          privacyPolicy: data.privacyPolicy,
          termsOfService: data.termsOfService,
        });
      })
      .catch((error: unknown) => {
        console.error("Failed to load policies", error);
        setStatus("Policy settings could not be loaded.");
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
      response.ok ? "Policies saved." : "Policy settings could not be saved.",
    );
  }

  return (
    <DashboardSection
      title="Privacy & terms"
      description="Edit the policies shown to community members."
    >
      {loading ? (
        <p className="alert alert-info" role="status">
          Loading policies...
        </p>
      ) : (
        <form onSubmit={(event) => void save(event)}>
          {status && (
            <div className="alert alert-info" role="status">
              {status}
            </div>
          )}
          <div className="mb-3">
            <label className="form-label" htmlFor="privacyPolicy">
              Privacy policy
            </label>
            <textarea
              id="privacyPolicy"
              className="form-control"
              rows={10}
              maxLength={10000}
              value={settings.privacyPolicy}
              onChange={(event) =>
                setSettings({ ...settings, privacyPolicy: event.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="termsOfService">
              Terms of service
            </label>
            <textarea
              id="termsOfService"
              className="form-control"
              rows={10}
              maxLength={10000}
              value={settings.termsOfService}
              onChange={(event) =>
                setSettings({ ...settings, termsOfService: event.target.value })
              }
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Save policies
          </button>
        </form>
      )}
    </DashboardSection>
  );
}
