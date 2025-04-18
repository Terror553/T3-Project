"use client";
import { useEffect, useState } from "react";
import { useTheme } from "~/client/theme";
import type { ForumCategory } from "~/server/types/forum";
import { replaceColor } from "~/server/utils/colorUtils";
import { formatDate } from "~/server/utils/dateUtils";

export default function Forum() {
  const [loading, setLoading] = useState(true);
  const [forum, setForum] = useState<ForumCategory[]>([]); // Updated to ForumCategory[]
  const { showLoadingBar, hideLoadingBar } = useTheme();
  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        showLoadingBar("loadingBarName");
        setLoading(true);

        const [forumRes] = await Promise.all([fetch("/api/forum")]);
        if (!forumRes.ok) throw new Error(`User API Error ${forumRes.status}`);

        const forumData = (await forumRes.json()) as ForumCategory[]; // Updated to ForumCategory[]

        setForum(forumData);
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
      ) : forum.length > 0 ? (
        <div className="forum-container">
          {forum.map((category) => (
            <div key={category.id} className="card card-forum">
              <div className="card-header">
                <a
                  href={`#collapse-forum-${category.id}`}
                  className="float-end"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-label="Toggle discussion"
                >
                  <span className="collapse-icon">
                    <i className="fas fa-angle-up fa-fw"></i>
                  </span>
                </a>
                {category.name}
              </div>
              <div
                className="collapse show"
                id={`collapse-forum-${category.id}`}
              >
                {category.forum_subcategory.map((subcategory) => (
                  <div key={subcategory.id} className="card-body">
                    <div className="forum-node">
                      <div className="forum-node-icon">
                        <i className="fas fa-comment"></i>
                      </div>
                      <div className="forum-node-info">
                        <div className="forum-node-title">
                          <a href={`/forum/subcategories/${subcategory.slug}`}>
                            {subcategory.name}
                          </a>
                        </div>
                        <div className="forum-node-meta">
                          <div className="d-none d-xl-block mb-2 mb-xxl-0">
                            {subcategory.description}
                          </div>
                          <div className="d-xxl-none mt-1">
                            Topics: {subcategory.forum_topics.length} • Posts:{" "}
                            {subcategory.forum_topics.length}
                          </div>
                          <div className="d-md-none">
                            <a href="/forum/topic/{latestEntry.slug}">
                              {"latestEntry.title"}
                            </a>
                            •
                            <a
                              href={`/profile/${"latestEntry.author.id"}/`}
                              style={replaceColor({
                                color: "latestEntry.author.role.color",
                                gradient: false,
                                start: "latestEntry.author.role.start",
                                end: "latestEntry.author.role.end",
                                isBadge: false,
                              })}
                            >
                              {"latestEntry.author.username"}
                            </a>
                            •
                            <span title={formatDate(new Date(), false)}>
                              {formatDate(new Date(), true)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="forum-node-stats">
                        <div className="forum-node-stats-item">
                          <div className="forum-node-stats-key">Topics</div>
                          <div className="forum-node-stats-value">
                            {subcategory.forum_topics.length}
                          </div>
                        </div>
                        <div className="forum-node-stats-item">
                          <div className="forum-node-stats-key">Posts</div>
                          <div className="forum-node-stats-value">
                            {subcategory.forum_topics.length}
                          </div>
                        </div>
                      </div>
                      <div className="forum-node-latest">
                        {subcategory.forum_topics[0] ? (
                          <>
                            <div className="forum-node-latest-icon">
                              <a
                                href={`/profile/${subcategory.forum_topics[0].forum_user.id}/`}
                              >
                                <img
                                  src={
                                    subcategory.forum_topics[0].forum_user
                                      .avatar_url
                                  }
                                  alt={
                                    subcategory.forum_topics[0].forum_user
                                      .username
                                  }
                                />
                              </a>
                            </div>
                            <div className="forum-node-latest-info">
                              <div className="forum-node-latest-title">
                                <a
                                  href={`/forum/topic/${subcategory.forum_topics[0].slug}`}
                                >
                                  {subcategory.forum_topics[0].title}
                                </a>
                              </div>
                              <div className="forum-node-latest-meta">
                                <a
                                  href={`/profile/${subcategory.forum_topics[0].forum_user.id}/`}
                                >
                                  <span
                                    style={replaceColor({
                                      color: "&7",
                                      gradient: false,
                                      start: null,
                                      end: null,
                                      isBadge: false,
                                    })}
                                  >
                                    {"latestEntry.author.username"}
                                  </span>
                                </a>
                                •
                                <span
                                  title={formatDate(
                                    subcategory.forum_topics[0].createdAt,
                                    false,
                                  )}
                                >
                                  {formatDate(
                                    subcategory.forum_topics[0].createdAt,
                                    true,
                                  )}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <span>No Topics yet!</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No forum data available</p>
      )}

      <ol className="breadcrumb">
        <li className="breadcrumb-item active">Home</li>
      </ol>
      <div className="row">
        <div className="col-xl-9 col-lg-8">
          <div className="content">
            <div id="chatbox-top"></div>
            go through every category
            <div id="chatbox-bottom"></div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4">
          <div>
            <div className="widget">
              <div className="card card-secondary">
                <div className="card-header">Teammitglieder</div>
                <div className="card-body">
                  Es sind keine Teammitglieder online.
                </div>
              </div>
            </div>
            <div className="widget">
              <div className="card card-secondary">
                <div className="card-header">Benutzer</div>
                <div className="card-body">Es sind keine Benutzer online.</div>
              </div>
            </div>
            <div className="widget">
              <div className="card card-secondary">
                <div className="card-header">Statistik</div>
                <div className="card-body">
                  <div className="pairs">
                    <dl>
                      <dt>Themen</dt>
                      <dd>{"totalTopicsLength"}</dd>
                    </dl>
                    <dl>
                      <dt>Posts</dt>
                      <dd>{"totalRepliesLength"}</dd>
                    </dl>
                    <dl>
                      <dt>Benutzer Regestriert</dt>
                      <dd>{"usersLength"}</dd>
                    </dl>
                    <dl>
                      <dt>Neuster Benutzer</dt>
                      <dd>
                        <a href="/profile/{recentUser.id}">
                          {"recentUser.username"}
                        </a>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
