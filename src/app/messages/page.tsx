"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ForumMessage } from "~/server/types/forum";
import { useTheme } from "~/client/theme";

export default function MessagesInbox() {
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { showLoadingBar, hideLoadingBar } = useTheme();

  useEffect(() => {
    async function load() {
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
    }

    void load();
  }, [hideLoadingBar, showLoadingBar]);

  if (loading) return <p>Loading messages...</p>;

  return (
    <div>
      <h2>Inbox</h2>
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
