"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "~/client/theme";
import type { ForumMessage } from "~/server/types/forum";
import { formatDate, getRelativeTime } from "~/utils/dateUtils";
import { replaceColor } from "~/utils/styleUtils";

export default function Messages() {
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { showLoadingBar, hideLoadingBar } = useTheme();

  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 50));
        showLoadingBar("messagesLoadingBar");
        setLoading(true);

        const [msgRes] = await Promise.all([fetch("/api/user/messages")]);
        if (!msgRes.ok) throw new Error(`User API Error ${msgRes.status}`);

        const messages = (await msgRes.json()) as ForumMessage[];

        if (!messages) throw new Error(`Unknown error fetching messages`);

        setMessages(messages);
        setLoading(false);
        hideLoadingBar("messagesLoadingBar");
      } catch (err) {
        console.error("Error fetching user", err);
        setLoading(false);
        hideLoadingBar("messagesLoadingBar");
      }
    }

    void fetchData();
  }, [hideLoadingBar, showLoadingBar]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {messages ? (
            <>
              <div className="action-bar">
                <div className="action-bar-pagination">
                  <ul className="pagination d-inline-flex">
                    <li className="page-item  disabled">
                      <a className="page-link" href="#">
                        «
                      </a>
                    </li>
                    <li className="page-item  active ">
                      <a className="page-link" href="/user/messaging/&amp;p=1">
                        1
                      </a>
                    </li>
                    <li className="page-item  disabled ">
                      <a className="page-link" href="#">
                        »
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="action-bar-buttons">
                  <Link
                    href="/profile/settings/messaging/new"
                    className="btn btn-primary btn-sm"
                  >
                    New Message
                  </Link>
                </div>
              </div>
              <div className="col-xl-12 col-lg-8">
                <div className="card">
                  {messages.length === 0 ? (
                    <>
                      <div className="card-body">
                        You do not have any messages.
                      </div>
                      <div className="card-footer">
                        <Link
                          href="/profile/settings/messaging/new"
                          className="btn btn-primary"
                        >
                          New Message
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="card-body">
                        <div className="list list-relaxed list-divided">
                          {messages.map((message) => (
                            <div className="list-item" key={message.id}>
                              <div className="list-content">
                                <a
                                  href={`/profile/settings/messaging/${message.id}`}
                                >
                                  {message.title}
                                </a>
                                <div className="list-meta">
                                  <div>
                                    Sender:{" "}
                                    <Link
                                      href={`/profile/${message.sender.id}/`}
                                      style={replaceColor({
                                        color: message.sender.group?.color,
                                        gradient:
                                          message.sender.group?.gradient,
                                        end: message.sender.group?.end,
                                        start: message.sender.group?.start,
                                        isBadge: false,
                                      })}
                                    >
                                      {message.sender.username}
                                    </Link>
                                    , Reciever:{" "}
                                    <Link
                                      href={`/profile/${message.receiver.id}/`}
                                      style={replaceColor({
                                        color: message.receiver.group?.color,
                                        gradient:
                                          message.receiver.group?.gradient,
                                        end: message.receiver.group?.end,
                                        start: message.receiver.group?.start,
                                        isBadge: false,
                                      })}
                                    >
                                      {message.receiver.username}
                                    </Link>
                                  </div>
                                  <div className="d-sm-none">
                                    Last Message:{" "}
                                    <Link
                                      href={`/profile/${message.receiver.id}/`}
                                    >
                                      {message.receiver.username}
                                    </Link>
                                    •
                                    <span title={formatDate(message.createdAt)}>
                                      {getRelativeTime(message.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="list-extra text-end align-self-center d-none d-sm-block">
                                <div className="user-item user-item-right">
                                  <div className="user-item-avatar">
                                    <Link
                                      href={`/profile/${message.sender?.id}/`}
                                    >
                                      <Image
                                        src={message.sender?.avatarUrl}
                                        alt={
                                          message.sender?.username ||
                                          "User Avatar"
                                        }
                                        width={30}
                                        height={30}
                                      />
                                    </Link>
                                  </div>
                                  <div className="user-item-content">
                                    <Link
                                      href={`/profile/${message.sender?.id}/`}
                                      style={replaceColor({
                                        color: message.sender.group?.color,
                                        gradient:
                                          message.sender.group?.gradient,
                                        end: message.sender.group?.end,
                                        start: message.sender.group?.start,
                                        isBadge: false,
                                      })}
                                    >
                                      {message.sender.username}
                                    </Link>
                                    <div className="user-item-meta">
                                      <span
                                        title={formatDate(
                                          message.createdAt,
                                          true,
                                        )}
                                      >
                                        {getRelativeTime(message.createdAt)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="action-bar">
                <div className="action-bar-pagination">
                  <ul className="pagination d-inline-flex">
                    <li className="page-item  disabled">
                      <Link className="page-link" href="#">
                        «
                      </Link>
                    </li>
                    <li className="page-item  active ">
                      <Link className="page-link" href={""}>
                        1
                      </Link>
                    </li>
                    <li className="page-item  disabled ">
                      <Link className="page-link" href="#">
                        »
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="action-bar-buttons">
                  <Link
                    href="/profile/settings/messaging/new"
                    className="btn btn-primary btn-sm"
                  >
                    New Message
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>Error..</>
          )}
        </>
      )}
    </>
  );
}
