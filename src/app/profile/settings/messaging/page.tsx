"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "~/client/theme";
import { getUserMessages } from "~/server/auth/utils/getUserMessages";
import type { ForumMessage } from "~/server/types/forum";

export default function Settings() {
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { showLoadingBar, hideLoadingBar } = useTheme();

  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 50));
        showLoadingBar("messagesLoadingBar");
        setLoading(true);

        const messages = await getUserMessages();

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
          {messages.length > 0 ? (
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
                  <a
                    href="/user/messaging/?action=new"
                    className="btn btn-primary btn-sm"
                  >
                    New Message
                  </a>
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
                        <a
                          href="/user/messaging/?action=new"
                          className="btn btn-primary"
                        >
                          New Message
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <>
                        <div className="card-body">
                          <div className="list list-relaxed list-divided">
                            <div className="list-item">
                              <div className="list-content">
                                <a href="/user/messaging/?action=view&amp;message=1">
                                  test
                                </a>
                                <div className="list-meta">
                                  <div>
                                    Participants:{" "}
                                    <Link href="/profile/admin/">admin</Link>
                                  </div>
                                  <div className="d-sm-none">
                                    Last Message:{" "}
                                    <Link
                                      href="/profile/admin/"
                                      style={{ color: "#ff0000" }}
                                      data-poload="/queries/user/?id=1"
                                    >
                                      admin
                                    </Link>
                                    •
                                    <span title="12 May 2026, 23:53">
                                      less than a minute ago
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="list-extra text-end align-self-center d-none d-sm-block">
                                <div className="user-item user-item-right">
                                  <div className="user-item-avatar">
                                    <Link href="/profile/admin/">
                                      <Image
                                        src="http://10.8.0.4:3000/_next/image?url=%2Fdefault.png&w=128&q=75"
                                        alt="admin"
                                        width={30}
                                        height={30}
                                      />
                                    </Link>
                                  </div>
                                  <div className="user-item-content">
                                    <Link
                                      href="/profile/admin/"
                                      style={{ color: "#ff0000" }}
                                      data-poload="/queries/user/?id=1"
                                    >
                                      admin
                                    </Link>
                                    <div className="user-item-meta">
                                      <span title="12 May 2026, 23:53">
                                        less than a minute ago
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    </>
                  )}
                </div>
              </div>

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
                  <a
                    href="/user/messaging/?action=new"
                    className="btn btn-primary btn-sm"
                  >
                    New Message
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>No topic found</>
          )}
        </>
      )}
    </>
  );
}
