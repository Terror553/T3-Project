"use client";

import Link from "next/link";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { useNotification } from "~/client/notification";
import type { ForumMessage } from "~/server/types/forum";
import { useTheme } from "~/client/theme";
import { createMessageThreadSchema } from "~/lib/schemas/messagingSchemas";

const initialThreadValues = {
  receiverId: "",
  title: "",
  message: "",
};

export default function MessagesInbox() {
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const [formData, setFormData] = useState(initialThreadValues);
  const [loading, setLoading] = useState(true);
  const { showLoadingBar, hideLoadingBar } = useTheme();
  const { addNotification } = useNotification();

  const loadInbox = useCallback(async () => {
    try {
      showLoadingBar("messages");
      setLoading(true);
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error(`Failed fetching messages ${res.status}`);
      const data = (await res.json()) as ForumMessage[];
      setMessages(data || []);
    } catch (err) {
      console.error("Error loading messages", err);
      setMessages([]);
    } finally {
      setLoading(false);
      hideLoadingBar("messages");
    }
  }, [hideLoadingBar, showLoadingBar]);

  useEffect(() => {
    void loadInbox();
  }, [loadInbox]);

  async function handleCreateThread(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = createMessageThreadSchema.safeParse({
      receiverId: Number(formData.receiverId),
      title: formData.title,
      message: formData.message,
    });

    if (!parsed.success) {
      addNotification("Please provide receiver id, title and message.", "error", 4000);
      return;
    }

    try {
      setIsComposing(true);
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: { message?: string; code?: string };
      };

      if (!response.ok || !result.success) {
        addNotification(
          `Error creating thread, ${result.error?.message ?? "Unknown error"} (${result.error?.code ?? "UNKNOWN"})`,
          "error",
          5000,
        );
        return;
      }

      addNotification("Thread created successfully!", "success", 4000);
      setFormData(initialThreadValues);
      await loadInbox();
    } catch (error) {
      addNotification(`Unexpected error: ${String(error)}`, "error", 5000);
    } finally {
      setIsComposing(false);
    }
  }

  if (loading) return <p>Loading messages...</p>;

  return (
    <div>
      <h2>Inbox</h2>
      <div className="card mb-3">
        <div className="card-header">Neue Nachricht</div>
        <div className="card-body">
          <form onSubmit={handleCreateThread} id="form-message-thread-create">
            <div className="form-group">
              <label className="form-label" htmlFor="receiverId">
                Receiver ID
              </label>
              <input
                id="receiverId"
                name="receiverId"
                type="number"
                className="form-control"
                value={formData.receiverId}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    receiverId: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="threadTitle">
                Title
              </label>
              <input
                id="threadTitle"
                name="title"
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="threadMessage">
                Message
              </label>
              <textarea
                id="threadMessage"
                name="message"
                className="form-control"
                value={formData.message}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }
                required
              />
            </div>
            <hr />
            <button type="submit" className="btn btn-primary btn-block" disabled={isComposing}>
              {isComposing ? "Senden..." : "Thread erstellen"}
            </button>
          </form>
        </div>
      </div>
      {messages.length === 0 ? (
        <p>No messages</p>
      ) : (
        <ul className="list-group">
          {messages.map((m) => (
            <li key={m.id} className="list-group-item">
              <Link href={`/messages/${m.id}`}>
                <strong>{m.title}</strong> — {m.sender?.username ?? "Unknown"}
                <div className="small text-muted">{new Date(m.createdAt).toLocaleString()}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
