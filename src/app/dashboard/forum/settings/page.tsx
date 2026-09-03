"use client";

import { useEffect, useState, type FormEvent } from "react";
import DashboardSection from "~/components/dashboard/DashboardSection";

type ForumSettings = {
  allowTopicCreation: boolean;
  allowReplies: boolean;
  requireModerationApproval: boolean;
};

const INITIAL: ForumSettings = {
  allowTopicCreation: true,
  allowReplies: true,
  requireModerationApproval: false,
};

export default function ForumSettings() {
  const [settings, setSettings] = useState(INITIAL);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/dashboard/configuration")
      .then(async (response) => {
        if (!response.ok)
          throw new Error(
            `Forum configuration request failed (${response.status})`,
          );
        const data = (await response.json()) as ForumSettings;
        setSettings({
          allowTopicCreation: data.allowTopicCreation,
          allowReplies: data.allowReplies,
          requireModerationApproval: data.requireModerationApproval,
        });
      })
      .catch((error: unknown) => {
        console.error("Failed to load forum settings", error);
        setStatus("Forum settings could not be loaded.");
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
    if (!response.ok) {
      setStatus("Forum settings could not be saved.");
      return;
    }
    setStatus("Forum settings saved.");
  }

  return (
    <DashboardSection
      title="Forum settings"
      description="Control how members create and participate in forum discussions."
    >
      {loading ? (
        <p className="alert alert-info" role="status">
          Loading forum settings...
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
              id="allowTopicCreation"
              className="form-check-input"
              type="checkbox"
              checked={settings.allowTopicCreation}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  allowTopicCreation: event.target.checked,
                })
              }
            />
            <label className="form-check-label" htmlFor="allowTopicCreation">
              Allow members to create topics
            </label>
          </div>
          <div className="form-check form-switch mb-3">
            <input
              id="allowReplies"
              className="form-check-input"
              type="checkbox"
              checked={settings.allowReplies}
              onChange={(event) =>
                setSettings({ ...settings, allowReplies: event.target.checked })
              }
            />
            <label className="form-check-label" htmlFor="allowReplies">
              Allow members to reply
            </label>
          </div>
          <div className="form-check form-switch mb-4">
            <input
              id="requireModerationApproval"
              className="form-check-input"
              type="checkbox"
              checked={settings.requireModerationApproval}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  requireModerationApproval: event.target.checked,
                })
              }
            />
            <label
              className="form-check-label"
              htmlFor="requireModerationApproval"
            >
              Require moderation approval for new content
            </label>
          </div>
          <button className="btn btn-primary" type="submit">
            Save forum settings
          </button>
        </form>
      )}
    </DashboardSection>
  );
}
