"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "~/client/theme";
import { type fullUser } from "~/server/auth/utils/currentUser";
import { replaceColor } from "~/server/utils/colorUtils";
import { formatDate } from "~/server/utils/dateUtils";

const ProfilePage = () => {
  const params = useParams();
  const [user, setUser] = useState<fullUser | null>(null);
  const [currentUser, setCurrentUser] = useState<fullUser | null>(null);
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
        const userData = (await userRes.json()) as fullUser;

        const [currentUserRes] = await Promise.all([fetch("/api/auth/user/")]);
        if (!currentUserRes.ok)
          throw new Error(`User API Error ${currentUserRes.status}`);
        const currentUserData = (await currentUserRes.json()) as fullUser;

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
                background: `url('${user.banner_url}') no-repeat center center / cover`,
              }}
            ></div>
            <div className="profile-header-info">
              <div className="profile-header-user-avatar">
                <img src={user.avatar_url} alt={user.username} />
              </div>
              <div className="profile-header-user-content">
                <div className="profile-header-user-name">
                  <span>{user.username}</span>
                </div>
                <div className="profile-header-user-groups">
                  <span
                    className="badge"
                    style={replaceColor({
                      color: user.groups?.color ?? "#ffffff", // Add nullish coalescing for safety
                      gradient: user.groups?.gradient ?? 0,
                      start: user.groups?.start,
                      end: user.groups?.end,
                      isBadge: true,
                    })}
                  >
                    {user.groups.name}
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
                    {currentUser?.groups.high_team ||
                    currentUser?.groups.team ? (
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
                    {currentUser && (
                      <>
                        <div className="card">
                          <div className="card-body">
                            <div className="message" id="post-">
                              <div className="message-icon">
                                <a href={`/profile/${currentUser.id}/`}>
                                  <img
                                    src={currentUser.avatar_url}
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
                    )}
                    <div className="alert alert-danger mt-4">
                      Es existieren noch keine Profil-Nachrichten.
                    </div>
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
                        <div className="message">
                          <div className="message-icon">
                            <a href="/profile/Terror">
                              <img src="/default.png" alt="Terror" />
                            </a>
                          </div>
                          <div className="message-content">
                            <div className="message-title">
                              <a href="/forum/topic/1-welcome-to-namelessmc%21/?pid=1">
                                Welcome to NamelessMC!
                              </a>
                            </div>
                            <div className="message-post">
                              <div className="post">Welcome!</div>
                            </div>
                            <div className="message-meta">
                              <span title="11 May 2025, 23:08">
                                Vor 28 Tagen
                              </span>
                            </div>
                          </div>
                        </div>
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
        </div>
      ) : (
        <div>User not found</div>
      )}
    </>
  );
};

export default ProfilePage;
