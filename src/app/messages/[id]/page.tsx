"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ForumMessage } from "~/server/types/forum";
import { useTheme } from "~/client/theme";
import { MessageReplyForm } from "~/components/messageReplyForm";

export default function MessageThread() {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<ForumMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const { showLoadingBar, hideLoadingBar } = useTheme();

  useEffect(() => {
    async function load() {
      try {
        showLoadingBar("message-thread");
        setLoading(true);
        const res = await fetch(`/api/user/messages/${id}`);
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
    }

    if (id) void load();
  }, [id, hideLoadingBar, showLoadingBar]);

  if (loading) return <p>Loading thread...</p>;
  if (!message) return <p>Message not found</p>;

  return (
    <div>
      <h2>{message.title}</h2>
      <div className="card mb-3">
        <div className="card-body">
          <p dangerouslySetInnerHTML={{ __html: message.message }} />
          <div className="small text-muted">From: {message.sender?.username}</div>
        </div>
      </div>

      <h4>Replies</h4>
      {message.messageReplies.map((r) => (
        <div key={r.id} className="card mb-2">
          <div className="card-body">
            <div dangerouslySetInnerHTML={{ __html: r.message }} />
            <div className="small text-muted">From: {r.sender?.username}</div>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <h5>Reply</h5>
        <MessageReplyForm id={message.id} />
      </div>
    </div>
  );
}
