"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import DashboardSection from "~/components/dashboard/DashboardSection";

type Configuration = {
  siteName: string;
  siteDescription: string;
  registrationEnabled: boolean;
  requireEmailVerification: boolean;
  privacyPolicy: string;
  termsOfService: string;
};

const INITIAL: Configuration = {
  siteName: "",
  siteDescription: "",
  registrationEnabled: true,
  requireEmailVerification: false,
  privacyPolicy: "",
  termsOfService: "",
};

export default function GeneralSettings() {
  const [configuration, setConfiguration] = useState(INITIAL);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetch("/api/dashboard/configuration")
      .then(async (response) => {
        if (!response.ok) throw new Error(`Configuration request failed (${response.status})`);
        setConfiguration((await response.json()) as Configuration);
      })
      .catch((error: unknown) => {
        console.error("Failed to load dashboard configuration", error);
        setStatus("Configuration could not be loaded.");
      })
      .finally(() => setLoading(false));
  }, []);

  async function save(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setStatus(null);
    const response = await fetch("/api/dashboard/configuration", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(configuration),
    });
    if (!response.ok) {
      setStatus("Configuration could not be saved.");
      return;
    }
    setConfiguration((await response.json()) as Configuration);
    setStatus("Configuration saved.");
  }

  return (
    <DashboardSection title="General settings" description="Manage the community identity, registration rules, and published policies.">
      {loading ? <p className="text-muted">Loading configuration...</p> : (
        <form onSubmit={(event) => void save(event)}>
          {status && <div className="alert alert-info">{status}</div>}
          <div className="mb-3"><label className="form-label" htmlFor="siteName">Site name</label><input id="siteName" className="form-control" value={configuration.siteName} onChange={(event) => setConfiguration({ ...configuration, siteName: event.target.value })} required maxLength={100} /></div>
          <div className="mb-3"><label className="form-label" htmlFor="siteDescription">Site description</label><textarea id="siteDescription" className="form-control" rows={3} value={configuration.siteDescription} onChange={(event) => setConfiguration({ ...configuration, siteDescription: event.target.value })} maxLength={10000} /></div>
          <div className="form-check mb-2"><input id="registrationEnabled" className="form-check-input" type="checkbox" checked={configuration.registrationEnabled} onChange={(event) => setConfiguration({ ...configuration, registrationEnabled: event.target.checked })} /><label className="form-check-label" htmlFor="registrationEnabled">Allow registration</label></div>
          <div className="form-check mb-3"><input id="requireEmailVerification" className="form-check-input" type="checkbox" checked={configuration.requireEmailVerification} onChange={(event) => setConfiguration({ ...configuration, requireEmailVerification: event.target.checked })} /><label className="form-check-label" htmlFor="requireEmailVerification">Require email verification</label></div>
          <div className="mb-3"><label className="form-label" htmlFor="privacyPolicy">Privacy policy</label><textarea id="privacyPolicy" className="form-control" rows={5} value={configuration.privacyPolicy} onChange={(event) => setConfiguration({ ...configuration, privacyPolicy: event.target.value })} maxLength={10000} /></div>
          <div className="mb-3"><label className="form-label" htmlFor="termsOfService">Terms of service</label><textarea id="termsOfService" className="form-control" rows={5} value={configuration.termsOfService} onChange={(event) => setConfiguration({ ...configuration, termsOfService: event.target.value })} maxLength={10000} /></div>
          <button className="btn btn-primary" type="submit">Save configuration</button>
        </form>
      )}
    </DashboardSection>
  );
}
