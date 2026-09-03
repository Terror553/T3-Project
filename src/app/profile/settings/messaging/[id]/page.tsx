"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ForumMessage } from "~/server/types/forum";
import { useTheme } from "~/client/theme";
import { MessageReplyForm } from "~/components/messageReplyForm";
import Link from "next/link";

export default function MessageThread() {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<ForumMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const { showLoadingBar, hideLoadingBar } = useTheme();

  const loadThread = useCallback(async () => {
    try {
      showLoadingBar("message-thread");
      setLoading(true);
      const res = await fetch(`/api/messages/${id}`);
      if (!res.ok) throw new Error(`Failed to load message ${res.status}`);
      const data = (await res.json()) as ForumMessage;
      setMessage(data || null);
    } catch (err) {
      console.error("Error loading message", err);
      setMessage(null);
    } finally {
      setLoading(false);
      hideLoadingBar("message-thread");
    }
  }, [id, hideLoadingBar, showLoadingBar]);

  useEffect(() => {
    if (id) void loadThread();
  }, [id, loadThread]);

  if (loading)
    return (
      <p className="alert alert-info" role="status">
        Loading thread...
      </p>
    );
  if (!message)
    return (
      <p className="alert alert-warning" role="alert">
        Message not found.
      </p>
    );

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Link
            href="/profile/settings/messaging"
            className="btn btn-link px-0"
          >
            &larr; Back to inbox
          </Link>
          <h2 className="mb-0">{message.title}</h2>
        </div>
        <span className="badge bg-secondary text-white">
          {message.messageReplies.length}{" "}
          {message.messageReplies.length === 1 ? "reply" : "replies"}
        </span>
      </div>
      <div className="card mb-3 border-primary">
        <div className="card-body">
          <div dangerouslySetInnerHTML={{ __html: message.message }} />
          <div className="small text-muted mt-3">
            From: {message.sender?.username ?? "Unknown"}
          </div>
        </div>
      </div>

      <h4 className="h5 mb-3">Replies</h4>
      {message.messageReplies.length === 0 ? (
        <p className="text-muted">
          No replies yet. Start the conversation below.
        </p>
      ) : (
        <div className="d-grid gap-2">
          {message.messageReplies.map((r) => (
            <div key={r.id} className="card">
              <div className="card-body">
                <div dangerouslySetInnerHTML={{ __html: r.message }} />
                <div className="small text-muted mt-2">
                  From: {r.sender?.username ?? "Unknown"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card mt-4">
        <div className="card-header">Reply to this conversation</div>
        <div className="card-body">
          <MessageReplyForm id={message.id} onSubmitted={loadThread} />
        </div>
      </div>
    </div>
  );
}
