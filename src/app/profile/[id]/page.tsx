"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "~/client/theme";
import type { ForumUser } from "~/server/types/forum";
import { formatDate } from "~/server/utils/dateUtils";
import { replaceColor } from "~/utils/styleUtils";

const ProfilePage = () => {
  const params = useParams();
  const [user, setUser] = useState<ForumUser | null>(null);
  const [currentUser, setCurrentUser] = useState<ForumUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { showLoadingBar, hideLoadingBar } = useTheme();
  const [selected, setSelected] = useState<number | null>(null);
  const id = params.id;

  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        showLoadingBar("loadingBarName");
        setLoading(true);

        const [userRes] = await Promise.all([fetch("/api/auth/user/" + id)]);
        if (!userRes.ok) throw new Error(`User API Error ${userRes.status}`);
        const userData = (await userRes.json()) as ForumUser;

        const [currentUserRes] = await Promise.all([fetch("/api/auth/user/")]);
        if (!currentUserRes.ok)
          throw new Error(`User API Error ${currentUserRes.status}`);
        const currentUserData = (await currentUserRes.json()) as ForumUser;
        console.log("Current User Data:", currentUserData);

        setUser(userData);
        setCurrentUser(currentUserData);
        setLoading(false);
        hideLoadingBar("loadingBarName");
      } catch (err) {
        console.error("Error fetching user", err);
        setLoading(false);
        setUser(null);
        hideLoadingBar("loadingBarName");
      }
    }

    void fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      ) : user ? (
        <div>
          <div className="profile-header">
            <div
              className="profile-header-banner"
              style={{
                background: `url('${user.bannerUrl}') no-repeat center center / cover`,
              }}
            ></div>
            <div className="profile-header-info">
              <div className="profile-header-user-avatar">
                <img src={user.avatarUrl} alt={user.username} />
              </div>
              <div className="profile-header-user-content">
                <div className="profile-header-user-name">
                  <span>{user.username}</span>
                </div>
                <div className="profile-header-user-groups">
                  <span
                    className="badge"
                    style={replaceColor({
                      color: user.group?.color ?? "#ffffff", // Add nullish coalescing for safety
                      gradient: user.group?.gradient ?? 0,
                      start: user.group?.start,
                      end: user.group?.end,
                      isBadge: true,
                    })}
                  >
                    {user.group?.name ?? "No Group"}
                  </span>
                </div>
              </div>
              <ul className="profile-header-actions">
                {user.id === currentUser?.id ? (
                  <>
                    <li>
                      <a
                        href="/user/settings/"
                        className="btn btn-primary btn-sm"
                      >
                        Account Settings
                      </a>
                    </li>
                    <li className="profile-header-actions-more">
                      <div className="dropdown">
                        <a
                          href="#"
                          className="btn btn-secondary btn-sm btn-sq dropdown-toggle no-caret"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <a
                              href="#modal-profileBanner"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                            >
                              Banner ändern
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <a
                        href={`/user/messaging/new/${user.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Message
                      </a>
                    </li>
                    {currentUser?.group?.highTeam ||
                    currentUser?.group?.team ? (
                      <>
                        <a
                          href="#"
                          className="btn btn-secondary btn-sm btn-sq dropdown-toggle no-caret"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fas fa-ellipsis-v"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <form
                              action="/profile/MelonenMC/?action=reset_banner"
                              method="POST"
                              className="d-block"
                            >
                              <a
                                href="#button-formSubmit"
                                className="dropdown-item"
                              >
                                Profilbanner zurücksetzen
                              </a>
                            </form>
                          </li>
                          <li>
                            <a
                              href="#modal-profileBlock"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                            >
                              Benutzer blockieren
                            </a>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="content">
                <div id="chatbox-top"></div>

                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      href="#tab-feed"
                      className="nav-link active"
                      data-bs-toggle="tab"
                    >
                      Pinnwand
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#tab-about"
                      className="nav-link"
                      data-bs-toggle="tab"
                    >
                      Über Mich
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#tab-forum"
                      className="nav-link"
                      data-bs-toggle="tab"
                    >
                      Forum
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tab-feed">
                    {currentUser ? (
                      <>
                        <div className="card">
                          <div className="card-body">
                            <div className="message" id="post-">
                              <div className="message-icon">
                                <a href={`/profile/${currentUser.id}/`}>
                                  <img
                                    src={currentUser.avatarUrl}
                                    alt={currentUser.username}
                                  />
                                </a>
                              </div>
                              <div className="message-content">
                                <div className="message-post">
                                  <form action="" method="post">
                                    <div className="form-group">
                                      <textarea
                                        className="form-control"
                                        name="post"
                                        placeholder={`Nachricht auf ${user.username}'s Profilseite posten`}
                                      ></textarea>
                                    </div>
                                    <div className="form-actions">
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                      >
                                        Senden
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>test</>
                    )}

                    <>
                      <div className="card">
                        <div className="card-body">
                          {user.profileWalls ? (
                            <>
                              {user.profileWalls.map((post) => {
                                <>
                                  <div className="message" id="profilePost-1">
                                    <div className="message-icon">
                                      <a href="/profile/Terror/">
                                        <img
                                          src="https://crafatar.com/renders/head/cac1b575710e4b5fbe537e3e612227c4?size=500&amp;overlay"
                                          alt="Terror"
                                        />
                                      </a>
                                    </div>
                                    <div className="message-content">
                                      <div className="message-title">
                                        <a
                                          href="/profile/Terror/"
                                          style={{ color: "#ff0000" }}
                                          data-poload="/queries/user/?id=1"
                                        >
                                          Terror
                                        </a>
                                      </div>
                                      <div className="message-post">
                                        Du himf
                                      </div>
                                      <div className="message-meta">
                                        <span title="09 Jun 2025, 14:41">
                                          Vor 23 Tagen
                                        </span>
                                        <ul className="message-actions">
                                          <li>
                                            <a>Like</a>
                                            <span>(0)</span>
                                          </li>
                                          <li>
                                            <a
                                              href="#collapse-profilePostReply-1"
                                              data-bs-toggle="collapse"
                                            >
                                              Antworten
                                            </a>
                                            <span>(0)</span>
                                          </li>
                                          <li>
                                            <a
                                              href="#modal-profilePostEdit-1"
                                              data-bs-toggle="modal"
                                            >
                                              Bearbeiten
                                            </a>
                                          </li>
                                          <li>
                                            <form action="" method="post">
                                              <button
                                                type="submit"
                                                className="btn btn-link"
                                              >
                                                Löschen
                                              </button>
                                              <input
                                                type="hidden"
                                                name="token"
                                                value="47e4b3e0ca7270c82c6d16dd6b78eb2d"
                                              />
                                              <input
                                                type="hidden"
                                                name="action"
                                                value="delete"
                                              />
                                              <input
                                                type="hidden"
                                                name="post_id"
                                                value="1"
                                              />
                                            </form>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="mesage-replies">
                                        <div
                                          className="collapse"
                                          id="collapse-profilePostReply-1"
                                        >
                                          <div className="message message-reply">
                                            <div className="message-icon">
                                              <a href="/profile/Terror/">
                                                <img
                                                  src="https://api.dicebear.com/5.x/initials/png?seed=Terror&amp;size=128"
                                                  alt="Terror"
                                                />
                                              </a>
                                            </div>
                                            <div className="message-content">
                                              <div className="message-post">
                                                <form action="" method="post">
                                                  <div className="form-group">
                                                    <div className="input-group">
                                                      <input
                                                        type="text"
                                                        className="form-control"
                                                        name="reply"
                                                        placeholder="Neue Antwort"
                                                      />
                                                      <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                      >
                                                        <i className="fas fa-share"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <input
                                                    type="hidden"
                                                    name="token"
                                                    value="47e4b3e0ca7270c82c6d16dd6b78eb2d"
                                                  />
                                                  <input
                                                    type="hidden"
                                                    name="action"
                                                    value="reply"
                                                  />
                                                  <input
                                                    type="hidden"
                                                    name="post"
                                                    value="1"
                                                  />
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="message" id="profilePost-1">
                                    <div className="message-icon">
                                      <a href="/profile/Terror/">
                                        <img
                                          src="https://crafatar.com/renders/head/cac1b575710e4b5fbe537e3e612227c4?size=500&amp;overlay"
                                          alt="Terror"
                                        />
                                      </a>
                                    </div>
                                    <div className="message-content">
                                      <div className="message-title">
                                        <a
                                          href="/profile/Terror/"
                                          style={{ color: "#ff0000" }}
                                          data-poload="/queries/user/?id=1"
                                        >
                                          Terror
                                        </a>
                                      </div>
                                      <div className="message-post">
                                        Du himf
                                      </div>
                                      <div className="message-meta">
                                        <span title="09 Jun 2025, 14:41">
                                          Vor 23 Tagen
                                        </span>
                                        <ul className="message-actions">
                                          <li>
                                            <a>Like</a>
                                            <span>(0)</span>
                                          </li>
                                          <li>
                                            <a
                                              href="#collapse-profilePostReply-2"
                                              data-bs-toggle="collapse"
                                            >
                                              Antworten
                                            </a>
                                            <span>(0)</span>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="mesage-replies">
                                        <div
                                          className="collapse"
                                          id="collapse-profilePostReply-2"
                                        >
                                          <div className="message message-reply">
                                            <div className="message-icon">
                                              <a href="/profile/Terror/">
                                                <img
                                                  src="https://api.dicebear.com/5.x/initials/png?seed=Terror&amp;size=128"
                                                  alt="Terror"
                                                />
                                              </a>
                                            </div>
                                            <div className="message-content">
                                              <div className="message-post">
                                                <form action="" method="post">
                                                  <div className="form-group">
                                                    <div className="input-group">
                                                      <input
                                                        type="text"
                                                        className="form-control"
                                                        name="reply"
                                                        placeholder="Neue Antwort"
                                                      />
                                                      <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                      >
                                                        <i className="fas fa-share"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>;
                              })}
                            </>
                          ) : (
                            <>No profile wall posts</>
                          )}
                        </div>
                      </div>
                    </>
                  </div>
                  <div className="tab-pane fade" id="tab-about">
                    <div className="card">
                      <div className="card-body">
                        <div className="pairs pairs-50">
                          <dl>
                            <dt>Mitglied seit:</dt>
                            <dd>
                              <span title={formatDate(user.createdAt, true)}>
                                {formatDate(user.createdAt, false)}
                              </span>
                            </dd>
                          </dl>
                          <dl>
                            <dt>Zuletzt gesehen:</dt>
                            <dd>
                              <span title={formatDate(user.updatedAt, true)}>
                                {formatDate(user.updatedAt, false)}
                              </span>
                            </dd>
                          </dl>
                          <dl>
                            <dt>Minecraft</dt>
                            <dd>{user.username}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tab-forum">
                    <div className="card">
                      <div className="card-body">
                        {user.topics ? (
                          <>
                            {user.topics.map((topic) => (
                              <>
                                <div className="message">
                                  <div className="message-icon">
                                    <a href={`/profile/${user.id}`}>
                                      <img
                                        src={user.avatarUrl}
                                        alt={user.username}
                                      />
                                    </a>
                                  </div>
                                  <div className="message-content">
                                    <div className="message-title">
                                      <a href={`/forum/topic/${topic.id}`}>
                                        {topic.title}
                                      </a>
                                    </div>
                                    <div className="message-post">
                                      <div className="post">
                                        {topic.content}
                                      </div>
                                    </div>
                                    <div className="message-meta">
                                      <span
                                        title={formatDate(
                                          topic.createdAt,
                                          true,
                                        )}
                                      >
                                        {formatDate(topic.createdAt, false)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                          </>
                        ) : (
                          <p>
                            Dieser Benutzer hat noch nichts auf dem Forum
                            geposted.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal fade" id="modal-profileBanner">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="modal-title">Banner ändern</div>
                        <a href="#" className="close" data-bs-dismiss="modal">
                          <i className="fas fa-times"></i>
                        </a>
                      </div>
                      <div className="modal-body">
                        <form action="" method="post" id="form-profileBanner">
                          <ul className="thumbnails image_picker_selector">
                            {[4, 3, 2, 1].map((value) => (
                              <li key={value}>
                                <div
                                  className={`thumbnail ${
                                    selected === value ? "selected" : ""
                                  }`}
                                  onClick={() => setSelected(value)}
                                >
                                  <img
                                    className="image_picker_image"
                                    src="/default.png"
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </form>
                        <div className="separator">Oder Banner hochladen</div>
                        <form method="post" encType="multipart/form-data">
                          <div className="form-group">
                            <div className="input-group">
                              <input
                                type="file"
                                className="form-control"
                                id="input-profileBannerUpload"
                                name="file"
                              />
                              <button type="submit" className="btn btn-success">
                                Hochladen
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          className="btn btn-secondary btn-sm"
                          data-bs-dismiss="modal"
                        >
                          Abbrechen
                        </button>
                        <button className="btn btn-primary btn-sm">
                          Senden
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="chatbox-bottom"></div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="modal-profilePostEdit-1"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-title">Bearbeiten</div>
                  <a href="#" className="close" data-bs-dismiss="modal">
                    <i className="fas fa-times"></i>
                  </a>
                </div>
                <div className="modal-body">
                  <div className="message">
                    <div className="message-icon">
                      <a href="/profile/Terror/">
                        <img
                          src="https://crafatar.com/renders/head/cac1b575710e4b5fbe537e3e612227c4?size=500&amp;overlay"
                          alt="Terror"
                        />
                      </a>
                    </div>
                    <div className="message-content">
                      <div className="message-post">
                        <div className="form-group">
                          <textarea name="content" className="form-control">
                            Du himf
                          </textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary btn-sm"
                    data-bs-dismiss="modal"
                  >
                    Abbrechen
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Senden
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>User not found</div>
      )}
    </>
  );
};

export default ProfilePage;
