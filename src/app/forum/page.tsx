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
      ) : (
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
                {category.forum_subcategories.length > 0 ? (
                  category.forum_subcategories.map((subcategory) => (
                    <div className="card-body" key={subcategory.id}>
                      <div className="forum-node">
                        <div className="forum-node-icon">
                          <i className="fas fa-comment"></i>
                        </div>
                        <div className="forum-node-info">
                          <div className="forum-node-title">
                            <a href={`/forum/subcategory/${subcategory.id}`}>
                              {subcategory.name}
                            </a>
                          </div>
                          <div className="forum-node-meta">
                            <div className="d-none d-xl-block mb-2 mb-xxl-0">
                              {subcategory.description}
                            </div>
                            <div className="d-xxl-none mt-1">
                              Topics: {subcategory.count || 0} • Posts:
                              {(subcategory.repliesCount || 0) +
                                (subcategory.count || 0)}
                            </div>
                            <div className="d-md-none">
                              Latest Post:
                              {subcategory.latestEntry ? (
                                <>
                                  <a
                                    href={`/forum/topic/${subcategory.latestEntry.slug}`}
                                  >
                                    {subcategory.latestEntry.title}
                                  </a>
                                  •
                                  <a
                                    href={`/profile/${subcategory.latestEntry.forum_user.id}/`}
                                    style={replaceColor({
                                      color:
                                        subcategory.latestEntry.forum_user
                                          .groups.color,
                                      gradient:
                                        subcategory.latestEntry.forum_user
                                          .groups.gradient,
                                      start:
                                        subcategory.latestEntry.forum_user
                                          .groups.start,
                                      end: subcategory.latestEntry.forum_user
                                        .groups.end,
                                      isBadge: false,
                                    })}
                                  >
                                    {
                                      subcategory.latestEntry.forum_user
                                        .username
                                    }
                                  </a>
                                  •
                                  <span
                                    title={formatDate(
                                      subcategory.latestEntry.createdAt,
                                      true,
                                    )}
                                  >
                                    {formatDate(
                                      subcategory.latestEntry.createdAt,
                                      false,
                                    )}
                                  </span>
                                </>
                              ) : (
                                <span className="text-muted">No posts</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="forum-node-stats">
                          <div className="forum-node-stats-item">
                            <div className="forum-node-stats-key">Topics</div>
                            <div className="forum-node-stats-value">
                              {subcategory.count}
                            </div>
                          </div>
                          <div className="forum-node-stats-item">
                            <div className="forum-node-stats-key">Posts</div>
                            <div className="forum-node-stats-value">
                              {subcategory.repliesCount + subcategory.count}
                            </div>
                          </div>
                        </div>
                        <div className="forum-node-latest">
                          {subcategory.latestEntry ? (
                            <>
                              <div className="forum-node-latest-icon">
                                <a
                                  href={`/profile/${subcategory.latestEntry?.forum_user.id}/`}
                                >
                                  <img
                                    src={
                                      subcategory.latestEntry?.forum_user
                                        .avatar_url
                                    }
                                    alt={
                                      subcategory.latestEntry?.forum_user
                                        .username
                                    }
                                  />
                                </a>
                              </div>
                              <div className="forum-node-latest-info">
                                <div className="forum-node-latest-title">
                                  <a
                                    href={`/forum/topic/${subcategory.latestEntry.slug}`}
                                  >
                                    {subcategory.latestEntry.title}
                                  </a>
                                </div>
                                <div className="forum-node-latest-meta">
                                  <a
                                    href={`/profile/${subcategory.latestEntry.forum_user.id}/`}
                                  >
                                    <span
                                      style={replaceColor({
                                        color:
                                          subcategory.latestEntry.forum_user
                                            .groups.color,
                                        gradient:
                                          subcategory.latestEntry.forum_user
                                            .groups.gradient,
                                        start:
                                          subcategory.latestEntry.forum_user
                                            .groups.start,
                                        end: subcategory.latestEntry.forum_user
                                          .groups.end,
                                        isBadge: false,
                                      })}
                                    >
                                      {
                                        subcategory.latestEntry.forum_user
                                          .username
                                      }
                                    </span>
                                  </a>
                                  •
                                  <span
                                    title={formatDate(
                                      subcategory.latestEntry.createdAt,
                                      true,
                                    )}
                                  >
                                    {formatDate(
                                      subcategory.latestEntry.createdAt,
                                      false,
                                    )}
                                  </span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>No posts.</>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="m-3">
                    Diese Kategorie hat noch keine Subkategorien!
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
