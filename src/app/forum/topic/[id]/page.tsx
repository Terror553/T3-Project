"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "~/client/theme";
import type {
  ForumTopic,
  ForumTopicFollow,
  ForumUser,
} from "~/server/types/forum";
import { replaceColor } from "~/server/utils/colorUtils";
import { formatDate } from "~/server/utils/dateUtils";

export default function Topic() {
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const { showLoadingBar, hideLoadingBar } = useTheme();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<ForumUser | null>(null);

  if (!id) {
    throw new Error("ID is undefined in Forum component");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 50));
        showLoadingBar("loadingBarName");
        setLoading(true);

        const [userRes, topicRes] = await Promise.all([
          fetch("/api/auth/user"),
          fetch(`/api/forum/topic/${id}`),
        ]);

        if (!userRes.ok) throw new Error(`User API Error ${userRes.status}`);
        if (!topicRes.ok) throw new Error(`User API Error ${topicRes.status}`);

        const topicData = (await topicRes.json()) as ForumTopic;
        const userData = (await userRes.json()) as ForumUser;

        setUser(userData);
        setTopic(topicData);
        setLoading(false);
        hideLoadingBar("loadingBarName");
      } catch (err) {
        console.error("Error fetching user", err);
        setLoading(false);
        hideLoadingBar("loadingBarName");
      }
    }

    void fetchData();
  }, []);

  return (
    <>
      <h2>Forum</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {topic ? (
            <div>
              <h2>
                {topic.locked ? (
                  <span className="float-end" title="Geschlossen">
                    <i className="fas fa-lock"></i>
                  </span>
                ) : (
                  <></>
                )}

                {topic.pinned ? (
                  <span className="float-end" title="Gepinnt">
                    <i className="fas fa-thumbtack fa-fw"></i>
                    &nbsp;
                  </span>
                ) : (
                  <></>
                )}

                {topic.title}
                <div className="meta">
                  Gestartet von{"  "}
                  <Link
                    href={`/profile/${topic.forum_user.id}/`}
                    style={replaceColor({
                      color: topic.forum_user.groups.color,
                      gradient: topic.forum_user.groups.gradient,
                      start: topic.forum_user.groups.start,
                      end: topic.forum_user.groups.end,
                      isBadge: false,
                    })}
                  >
                    {topic.forum_user.username}
                  </Link>
                </div>
              </h2>
              <div className="row">
                <div className="col">
                  <div className="content">
                    <div id="chatbox-top"></div>
                    <div className="action-bar">
                      <div className="action-bar-pagination">
                        <ul className="pagination d-inline-flex">
                          <li className="page-item disabled">
                            <Link className="page-link" href="/">
                              «
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link
                              className="page-link"
                              href={`/forum/topic/${topic.id}/`}
                            >
                              1
                            </Link>
                          </li>
                          <li className="page-item disabled">
                            <Link className="page-link" href="/">
                              »
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="action-bar-buttons">
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="btn btn-secondary btn-sm dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            Teilen
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <a className="dropdown-header">Teilen</a>
                            </li>
                            <li>
                              <Link
                                href="https://youtube.com"
                                target="_blank"
                                className="dropdown-item"
                              >
                                Auf Twitter teilen
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {user &&
                          (user.groups.team || user.groups.high_team) && (
                            <div className="dropdown">
                              <Link
                                href={"#"}
                                className="btn btn-secondary btn-sm dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Moderation
                              </Link>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <Link className="dropdown-header" href={"#"}>
                                    Moderation
                                  </Link>
                                </li>
                                <li>
                                  <form
                                    action="?/lockTopic"
                                    method="post"
                                    className="d-block"
                                  >
                                    <input hidden id="topicId" name="topicId" />

                                    {topic.locked ? (
                                      <button
                                        type="submit"
                                        className="dropdown-item"
                                      >
                                        Thema Öffnen
                                      </button>
                                    ) : (
                                      <button
                                        type="submit"
                                        className="dropdown-item"
                                      >
                                        Thema Schließen
                                      </button>
                                    )}
                                  </form>
                                </li>
                                <li>
                                  <form
                                    action="?/stickTopic"
                                    method="post"
                                    className="d-block"
                                  >
                                    <input hidden id="topicId" name="topicId" />

                                    {topic.pinned ? (
                                      <button
                                        type="submit"
                                        className="dropdown-item"
                                      >
                                        Thema Abheften
                                      </button>
                                    ) : (
                                      <button
                                        type="submit"
                                        className="dropdown-item"
                                      >
                                        Thema Anheften
                                      </button>
                                    )}
                                  </form>
                                </li>
                                <li>
                                  <Link
                                    href={`/forum/topic/move/${topic.id}`}
                                    className="dropdown-item"
                                    data-request-modal="move"
                                  >
                                    Thema Verschieben
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={`/forum/topic/merge/${topic.id}`}
                                    className="dropdown-item"
                                    data-request-modal="merge"
                                  >
                                    Thema Zusammenfassen
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="#modal-forumTopicDelete"
                                    className="dropdown-item"
                                    data-bs-toggle="modal"
                                  >
                                    Thema Löschen
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          )}

                        <form action="?/followTopic" method="post">
                          <input
                            hidden
                            defaultValue={topic.id}
                            id="topicId"
                            name="topicId"
                          />

                          {/* Use optional chaining ?. */}
                          {user &&
                          topic.forum_topic_follow?.find(
                            (f: ForumTopicFollow) => f.userId === user.id, // Also corrected to use f.userId and strict equality ===
                          ) ? (
                            <button
                              type="submit"
                              className="btn btn-secondary btn-sm"
                            >
                              Entfolgen
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-primary btn-sm"
                            >
                              Folgen
                            </button>
                          )}
                        </form>
                        {!topic.locked && (
                          <Link
                            href="#post-reply"
                            className="btn btn-primary btn-sm"
                          >
                            Neue Antwort
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="card card-post" id={`post-${topic.id}`}>
                      <div className="card-body">
                        <div className="forum-post">
                          <div className="row">
                            <div className="col-lg-3 col-xl-2">
                              <div className="forum-post-sidebar">
                                <div className="forum-post-user-avatar">
                                  <img
                                    src={topic.forum_user.avatar_url}
                                    alt={topic.forum_user.username}
                                  />
                                </div>
                                <div className="forum-post-user-info">
                                  <div className="forum-post-user-name">
                                    <Link
                                      href={`/profile/${topic.forum_user.id}/?`}
                                      style={replaceColor({
                                        color: topic.forum_user.groups.color,
                                        gradient:
                                          topic.forum_user.groups.gradient,
                                        start: topic.forum_user.groups.start,
                                        end: topic.forum_user.groups.end,
                                        isBadge: false,
                                      })}
                                    >
                                      {topic.forum_user.username}
                                    </Link>
                                  </div>
                                  <div className="forum-post-user-badges">
                                    <span
                                      className="badge"
                                      style={replaceColor({
                                        color: topic.forum_user.groups.color,
                                        gradient:
                                          topic.forum_user.groups.gradient,
                                        start: topic.forum_user.groups.start,
                                        end: topic.forum_user.groups.end,
                                        isBadge: true,
                                      })}
                                    >
                                      {topic.forum_user.groups.name}
                                    </span>
                                  </div>
                                </div>
                                <div className="forum-post-user-stats">
                                  <div className="pairs">
                                    <dl>
                                      <dt>Beigetreten</dt>
                                      <dd>
                                        {formatDate(
                                          topic.forum_user.createdAt,
                                          true,
                                        )}
                                      </dd>
                                    </dl>
                                    <dl>
                                      <dt>Zuletzt Gesehen</dt>
                                      <dd>
                                        {formatDate(
                                          topic.forum_user.updatedAt,
                                          true,
                                        )}
                                      </dd>
                                    </dl>
                                    <hr />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-9 col-xl-10">
                              <div className="forum-post-main">
                                <div className="forum-post-attributes">
                                  <div className="forum-post-meta">
                                    <span
                                      data-toggle="tooltip"
                                      title={formatDate(topic.createdAt, true)}
                                    >
                                      Erstellt:{" "}
                                      {formatDate(topic.createdAt, false)}
                                    </span>{" "}
                                    •{" "}
                                    <span
                                      data-toggle="tooltip"
                                      title={formatDate(topic.updatedAt, true)}
                                    >
                                      Zuletzt Editiert:{" "}
                                      {formatDate(topic.updatedAt, false)}
                                    </span>
                                  </div>
                                  <ul className="forum-post-actions">
                                    <li>
                                      <Link
                                        href={`#modal-forumPostReport-${topic.id}`}
                                        data-bs-toggle="modal"
                                      >
                                        Report
                                      </Link>
                                    </li>
                                  </ul>
                                  <div
                                    className="modal fade"
                                    id={`modal-forumPostReport-${topic.id}`}
                                  >
                                    <div className="modal-dialog">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <div className="modal-title">
                                            REPORT
                                          </div>
                                          <Link
                                            href="/"
                                            className="close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                          >
                                            <i className="fa fa-times"></i>
                                          </Link>
                                        </div>
                                        <form
                                          action="?/reportPost"
                                          method="post"
                                        >
                                          <div className="modal-body">
                                            <div className="form-group">
                                              <label className="form-label">
                                                Was ist der grund für deinen
                                                Report?
                                              </label>
                                              <textarea
                                                className="form-control"
                                                id="reason"
                                                name="reason"
                                              ></textarea>
                                              <input
                                                id="postId"
                                                name="postId"
                                                type="hidden"
                                              />
                                            </div>
                                          </div>
                                          <div className="modal-footer">
                                            <button
                                              className="btn btn-secondary btn-sm"
                                              data-bs-dismiss="modal"
                                            >
                                              Abbrechen
                                            </button>
                                            <button
                                              type="submit"
                                              className="btn btn-primary btn-sm"
                                            >
                                              Senden
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="forum-post-content">
                                  <div className="post">{topic.content}</div>
                                </div>
                                <div className="forum-post-reactions">
                                  <Link
                                    href={`#modal-forumPostReactions-1`}
                                    className="forum-post-reactions-list"
                                    data-bs-toggle="modal"
                                  >
                                    <ul>
                                      <li key={topic.id}>
                                        <i
                                          className={`fa fa-question text-danger`}
                                        ></i>
                                        {1}x
                                      </li>
                                    </ul>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {topic.forum_user.signature != null &&
                          topic.forum_user.signature.length > 0 && (
                            <div className="forum-post-signature">
                              <div className="post">
                                <p>
                                  <span>{topic.forum_user.signature}</span>
                                </p>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                    {topic.forum_topic_replies != null &&
                      topic.forum_topic_replies.length > 0 && (
                        <>
                          {topic.forum_topic_replies.map((reply) => (
                            <div key={reply.id}>
                              <br />
                              <div
                                className="card card-post"
                                id={`post-${reply.id}`}
                              >
                                <div className="card-body">
                                  <div className="forum-post">
                                    <div className="row">
                                      <div className="col-lg-3 col-xl-2">
                                        <div className="forum-post-sidebar">
                                          <div className="forum-post-user-avatar">
                                            <img
                                              src={reply.forum_user.avatar_url}
                                              alt={reply.forum_user.username}
                                            />
                                          </div>
                                          <div className="forum-post-user-info">
                                            <div className="forum-post-user-name">
                                              <Link
                                                href={`/profile/${reply.forum_user.id}/`}
                                                style={replaceColor({
                                                  color:
                                                    reply.forum_user.groups
                                                      .color,
                                                  gradient:
                                                    reply.forum_user.groups
                                                      .gradient,
                                                  start:
                                                    reply.forum_user.groups
                                                      .start,
                                                  end: reply.forum_user.groups
                                                    .end,
                                                  isBadge: false,
                                                })}
                                              >
                                                {reply.forum_user.username}
                                              </Link>
                                            </div>
                                            <div className="forum-post-user-badges">
                                              <span
                                                className="badge"
                                                style={replaceColor({
                                                  color:
                                                    reply.forum_user.groups
                                                      .color,
                                                  gradient:
                                                    reply.forum_user.groups
                                                      .gradient,
                                                  start:
                                                    reply.forum_user.groups
                                                      .start,
                                                  end: reply.forum_user.groups
                                                    .end,
                                                  isBadge: true,
                                                })}
                                              >
                                                {reply.forum_user.groups.name}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="forum-post-user-stats">
                                            <div className="pairs">
                                              <dl>
                                                <dt>Beigetreten</dt>
                                                <dd>
                                                  {formatDate(
                                                    reply.forum_user.createdAt,
                                                    true,
                                                  )}
                                                </dd>
                                              </dl>
                                              <dl>
                                                <dt>Zuletzt gesehen</dt>
                                                <dd>
                                                  {formatDate(
                                                    reply.forum_user.updatedAt,
                                                    true,
                                                  )}
                                                </dd>
                                              </dl>
                                              <hr />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-9 col-xl-10">
                                        <div className="forum-post-main">
                                          <div className="forum-post-attributes">
                                            <div className="forum-post-meta">
                                              <span
                                                data-toggle="tooltip"
                                                title={formatDate(
                                                  reply.createdAt,
                                                  true,
                                                )}
                                              >
                                                Erstellt am
                                                {formatDate(
                                                  reply.createdAt,
                                                  true,
                                                )}
                                              </span>
                                              •
                                              <span
                                                data-toggle="tooltip"
                                                title={formatDate(
                                                  reply.updatedAt,
                                                  true,
                                                )}
                                              >
                                                Zuletzt Editiert am
                                                {formatDate(
                                                  reply.updatedAt,
                                                  true,
                                                )}
                                              </span>
                                            </div>
                                            <ul className="forum-post-actions">
                                              <li>
                                                <Link
                                                  key={reply.id}
                                                  href={`#modal-forumReplyReport-${reply.id}`}
                                                  data-bs-toggle="modal"
                                                >
                                                  Report
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                          <div className="forum-post-content">
                                            <div className="post">
                                              {reply.content}
                                            </div>
                                          </div>
                                          <div className="forum-post-reactions">
                                            <Link
                                              href="#modal-forumPostReactions-1"
                                              className="forum-post-reactions-list"
                                              data-bs-toggle="modal"
                                            >
                                              <ul>
                                                <li>
                                                  <div key={reply.id}>
                                                    <i className="fa fa-question text-danger"></i>
                                                    1x
                                                  </div>
                                                </li>
                                              </ul>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {reply.forum_user.signature != null &&
                                    reply.forum_user.signature.length > 0 && (
                                      <div className="forum-post-signature">
                                        <div className="post">
                                          <p>
                                            <span>
                                              {reply.forum_user.signature}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </div>
                              <div
                                className="modal fade"
                                id={`modal-forumReplyReport-${reply.id}`}
                              >
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <div className="modal-title">REPORT</div>
                                      <Link
                                        href="/"
                                        className="close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      >
                                        <i className="fa fa-times"></i>
                                      </Link>
                                    </div>
                                    <form action="?/reportPost" method="post">
                                      <div className="modal-body">
                                        <div className="form-group">
                                          <label className="form-label">
                                            Was ist der grund für deinen Report?
                                          </label>
                                          <textarea
                                            className="form-control"
                                            id="reason"
                                            name="reason"
                                          ></textarea>
                                          <input
                                            id="postId"
                                            name="postId"
                                            type="hidden"
                                          />
                                        </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          className="btn btn-secondary btn-sm"
                                          data-bs-dismiss="modal"
                                        >
                                          Abbrechen
                                        </button>
                                        <button
                                          type="submit"
                                          className="btn btn-primary btn-sm"
                                        >
                                          Senden
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}

                    <div className="action-bar">
                      <div className="action-bar-pagination">
                        <ul className="pagination d-inline-flex">
                          <li className="page-item disabled">
                            <Link
                              className="page-link"
                              href="/"
                              key={"pageBack"}
                            >
                              «
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link
                              key="page1"
                              className="page-link"
                              href="/forum/topic/1-welcome-to-namelessmc%21/&amp;p=1"
                            >
                              1
                            </Link>
                          </li>
                          <li className="page-item disabled">
                            <Link className="page-link" href="/" key="page2">
                              »
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="modal fade" id="modal-forumPostReactions-1">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="modal-title">Reaktionen</div>
                            <Link
                              href="/"
                              className="close"
                              data-bs-dismiss="modal"
                              aria-label="Schließen"
                            >
                              <i className="fas fa-times"></i>
                            </Link>
                          </div>
                          <div className="modal-body">
                            <div className="card card-reactions">
                              <div className="card-header">
                                <i className="fas fa-thumbs-down text-danger"></i>
                                Dislike (1)
                              </div>
                              <div className="card-body">
                                <div className="list list-reactions">
                                  <div className="list-item align-items-center">
                                    <div className="list-icon">
                                      <Link href="/profile/TerrorV2/">
                                        <img
                                          src="https://mc-heads.net/avatar/ccbe40c30430423cbcc13a4167b06a79/128"
                                          alt="TerrorV2"
                                        />
                                      </Link>
                                    </div>
                                    <div className="list-content">
                                      <Link href="/profile/TerrorV2/">
                                        TerrorV2
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal fade" id="modal-forumPostDelete-1">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="modal-title">
                              Löschen Bestätigen
                            </div>
                            <Link
                              href={"#"}
                              className="close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              <i className="fas fa-times"></i>
                            </Link>
                          </div>
                          <div className="modal-body">
                            <p>
                              Bist du dir sicher das du diesen Beitrag löschen
                              möchtest?
                            </p>
                          </div>
                          <div className="modal-footer">
                            <form action="?/deletePost" method="post">
                              <button
                                className="btn btn-secondary btn-sm"
                                data-bs-dismiss="modal"
                              >
                                Abbrechen
                              </button>
                              <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                              >
                                Löschen
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="modal-forumTopicDelete">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="modal-title">
                              Löschen Bestätigen
                            </div>
                            <Link
                              href={"#"}
                              className="close"
                              data-bs-dismiss="modal"
                              aria-label="Schließen"
                            >
                              <i className="fas fa-times"></i>
                            </Link>
                          </div>
                          <div className="modal-body">
                            <p>
                              Bist du dir sicher das du dieses Thema löschen
                              möchtest?
                            </p>
                          </div>
                          <div className="modal-footer">
                            <form action="?/deleteTopic" method="post">
                              <button
                                className="btn btn-secondary btn-sm"
                                data-bs-dismiss="modal"
                              >
                                Abbrechen
                              </button>
                              <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                              >
                                Thema Löschen
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="chatbox-bottom"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>No topic found</>
          )}
        </>
      )}
    </>
  );
}
