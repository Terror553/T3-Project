"use client";

import { useEffect, useState } from "react";

type VerificationResponse = {
  forumId: number;
  verified: boolean;
  verifyCode: string | null;
};

export default function VerificationSettingsPage() {
  const [verification, setVerification] = useState<VerificationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadVerification(): Promise<void> {
    try {
      const response = await fetch("/api/profile/verification");
      if (!response.ok) throw new Error(`Failed to load verification (${response.status})`);
      setVerification((await response.json()) as VerificationResponse);
    } catch (loadError) {
      console.error("Failed to load account verification", loadError);
      setError("Verification status is currently unavailable.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadVerification();
  }, []);

  async function generateCode(): Promise<void> {
    try {
      setGenerating(true);
      setError(null);
      const response = await fetch("/api/profile/verification", { method: "POST" });
      if (!response.ok) throw new Error(`Failed to generate verification code (${response.status})`);
      setVerification((await response.json()) as VerificationResponse);
    } catch (generationError) {
      console.error("Failed to generate verification code", generationError);
      setError("Unable to generate a verification code.");
    } finally {
      setGenerating(false);
    }
  }

  if (loading) return <p>Loading verification...</p>;

  return (
    <main className="container py-4">
      <h1 className="h3">Minecraft account verification</h1>
      <p className="text-muted">
        Generate a one-time code, then enter it in-game to link your Minecraft account.
      </p>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="card">
        <div className="card-body">
          <div className="small text-muted">Forum account ID: {verification?.forumId ?? "—"}</div>
          <div className="mt-3">
            <span className={`badge ${verification?.verified ? "text-bg-success" : "text-bg-secondary"}`}>
              {verification?.verified ? "Code generated" : "Not linked"}
            </span>
          </div>
          {verification?.verifyCode && (
            <code className="d-block bg-light rounded p-3 mt-3">{verification.verifyCode}</code>
          )}
          <button type="button" className="btn btn-primary mt-3" onClick={() => void generateCode()} disabled={generating}>
            {generating ? "Generating..." : verification?.verifyCode ? "Generate new code" : "Generate verification code"}
          </button>
        </div>
      </div>
    </main>
  );
}
