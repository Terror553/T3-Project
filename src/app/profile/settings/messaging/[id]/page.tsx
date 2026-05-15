"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "~/client/theme";
import { useUser } from "~/client/user";
import { MessageReplyForm } from "~/components/messageReplyForm";
import type { ForumMessage } from "~/server/types/forum";
import { formatDate, getRelativeTime } from "~/utils/dateUtils";
import { replaceColor } from "~/utils/styleUtils";

export default function Message() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const [message, setMessage] = useState<ForumMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const { showLoadingBar, hideLoadingBar } = useTheme();

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 50));
          showLoadingBar("messagesLoadingBar");
          setLoading(true);

          const [msgRes] = await Promise.all([
            fetch(`/api/user/messages/${id}`),
          ]);
          if (!msgRes.ok)
            throw new Error(
              `User API Error ${msgRes.status} ${msgRes.statusText}`,
            );

          const msg = (await msgRes.json()) as ForumMessage;

          if (!msg) throw new Error(`Unknown error fetching messages`);

          setMessage(msg);
          setLoading(false);
          hideLoadingBar("messagesLoadingBar");
        } catch (err) {
          console.error("Error fetching user", err);
          setLoading(false);
          hideLoadingBar("messagesLoadingBar");
        }
      }
    }

    void fetchData();
  }, [hideLoadingBar, showLoadingBar, id, user]);

  if (!user) {
    return <p>You need to be signed in to view this page.</p>;
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="action-bar">
            <div className="action-bar-pagination">
              <ul className="pagination d-inline-flex">
                <li className="page-item  disabled">
                  <a className="page-link" href="#">
                    «
                  </a>
                </li>
                <li className="page-item  active ">
                  <a
                    className="page-link"
                    href="/user/messaging/?action=view&amp;message=1&amp;&amp;p=1"
                  >
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
                href="/profile/settings/messaging"
                className="btn btn-primary btn-sm"
              >
                Back
              </Link>
              <a
                href="#modal-conversationLeave"
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
              >
                Leave Conversation
              </a>
            </div>
          </div>

          {message && (
            <>
              <div className="card card-post">
                <div className="card-body">
                  <div className="forum-post">
                    <div className="row">
                      <div className="col-xxl-3 col-lg-3">
                        <div className="forum-post-sidebar">
                          <div className="forum-post-user-avatar">
                            <Image
                              src={message.sender.avatarUrl}
                              alt={message.sender.username}
                              width={128}
                              height={128}
                            />
                          </div>
                          <div className="forum-post-user-info">
                            <div className="forum-post-user-name">
                              <Link
                                href={`/profile/${message.sender.id}/`}
                                style={replaceColor({
                                  color: message.sender.group?.color,
                                  gradient: message.sender.group?.gradient,
                                  end: message.sender.group?.end,
                                  start: message.sender.group?.start,
                                  isBadge: false,
                                })}
                              >
                                {message.sender.username}
                              </Link>
                            </div>
                            <div className="forum-post-user-badges">
                              <span
                                className="badge"
                                style={replaceColor({
                                  color: message.sender.group?.color,
                                  gradient: message.sender.group?.gradient,
                                  end: message.sender.group?.end,
                                  start: message.sender.group?.start,
                                  isBadge: true,
                                })}
                              >
                                {message.sender.group?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl-9 col-lg-8">
                        <div className="forum-post-main">
                          <div className="forum-post-attributes">
                            <div className="forum-post-meta">
                              <Link href={`/profile/${message.sender.id}/`}>
                                {message.sender.username}
                              </Link>
                              •
                              <span title={formatDate(message.createdAt)}>
                                {getRelativeTime(message.createdAt)}
                              </span>
                            </div>
                          </div>
                          <div className="forum-post-content">
                            <div className="post">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: message.message,
                                }}
                              ></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {message?.messageReplies ? (
                message.messageReplies.length > 0 ? (
                  message.messageReplies.map((reply) => (
                    <div className="card card-post" key={reply.id}>
                      <div className="card-body">
                        <div className="forum-post">
                          <div className="row">
                            <div className="col-xxl-3 col-lg-3">
                              <div className="forum-post-sidebar">
                                <div className="forum-post-user-avatar">
                                  <Image
                                    src={reply.sender.avatarUrl}
                                    alt={reply.sender.username}
                                    width={128}
                                    height={128}
                                  />
                                </div>
                                <div className="forum-post-user-info">
                                  <div className="forum-post-user-name">
                                    <Link
                                      href={`/profile/${reply.sender.id}/`}
                                      style={replaceColor({
                                        color: reply.sender.group?.color,
                                        gradient: reply.sender.group?.gradient,
                                        end: reply.sender.group?.end,
                                        start: reply.sender.group?.start,
                                        isBadge: false,
                                      })}
                                    >
                                      {reply.sender.username}
                                    </Link>
                                  </div>
                                  <div className="forum-post-user-badges">
                                    <span
                                      className="badge"
                                      style={replaceColor({
                                        color: reply.sender.group?.color,
                                        gradient: reply.sender.group?.gradient,
                                        end: reply.sender.group?.end,
                                        start: reply.sender.group?.start,
                                        isBadge: true,
                                      })}
                                    >
                                      {reply.sender.group?.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xxl-9 col-lg-8">
                              <div className="forum-post-main">
                                <div className="forum-post-attributes">
                                  <div className="forum-post-meta">
                                    <Link href={`/profile/${reply.sender.id}/`}>
                                      {reply.sender.username}
                                    </Link>
                                    •
                                    <span title={formatDate(reply.createdAt)}>
                                      {getRelativeTime(reply.createdAt)}
                                    </span>
                                  </div>
                                </div>
                                <div className="forum-post-content">
                                  <div className="post">
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: reply.message,
                                      }}
                                    ></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>no replies</>
                )
              ) : (
                <>no replies</>
              )}

              <div className="card card-post">
                <div className="card-body">
                  <div className="forum-post">
                    <div className="row">
                      <div className="col-xxl-3 col-lg-3">
                        <div className="forum-post-sidebar">
                          <div className="forum-post-user-avatar">
                            <Image
                              width={128}
                              height={128}
                              src={user.avatarUrl}
                              alt={user.username}
                            />
                          </div>
                          <div className="forum-post-user-info">
                            <div className="forum-post-user-name">
                              <Link href={`/profile/${user.id}/`}>
                                {user.username}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl-9 col-lg-8">
                        <div className="forum-post-main">
                          <MessageReplyForm id={message.id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="action-bar">
            <div className="action-bar-pagination">
              <ul className="pagination d-inline-flex">
                <li className="page-item  disabled">
                  <a className="page-link" href="#">
                    «
                  </a>
                </li>
                <li className="page-item  active ">
                  <a
                    className="page-link"
                    href="/user/messaging/?action=view&amp;message=1&amp;&amp;p=1"
                  >
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
              <a href="/user/messaging/" className="btn btn-primary btn-sm">
                Back
              </a>
              <a
                href="#modal-conversationLeave"
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
              >
                Leave Conversation
              </a>
            </div>
          </div>

          <div className="modal fade" id="modal-conversationLeave">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-title">Leave Conversation</div>
                  <a href="#" className="close" data-bs-dismiss="modal">
                    <i className="fas fa-times"></i>
                  </a>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to leave this conversation?</p>
                </div>
                <div className="modal-footer">
                  <form
                    action="/user/messaging/?action=leave&amp;message=1"
                    method="post"
                  >
                    <button
                      className="btn btn-secondary btn-sm"
                      data-bs-dismiss="modal"
                    >
                      No
                    </button>
                    <button type="submit" className="btn btn-primary btn-sm">
                      Yes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
