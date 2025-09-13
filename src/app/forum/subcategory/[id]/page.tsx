"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "~/client/theme";
import type { ForumSubcategory, ForumTopic } from "~/server/types/forum";
import { formatDate } from "~/server/utils/dateUtils";
import { replaceColor } from "~/utils/styleUtils";

export default function Subcategory() {
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState<ForumSubcategory>(); // Updated to ForumCategory[]
  const [latestEntry, setLatestEntry] = useState<ForumTopic>(); // Updated to ForumCategory[]
  const { showLoadingBar, hideLoadingBar } = useTheme();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    throw new Error("ID is undefined in Forum component");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));

        showLoadingBar("loadingBarName");
        setLoading(true);

        const [subCategoryRes] = await Promise.all([
          fetch(`/api/forum/subcategory/${id}`),
        ]);

        if (!subCategoryRes.ok) {
          throw new Error(
            `subCategoryRes ${subCategoryRes.status} ${subCategoryRes.type}  ${subCategoryRes.statusText}`,
          );
        }

        const subCategoryData =
          (await subCategoryRes.json()) as ForumSubcategory;

        const [latestEntryRes] = await Promise.all([
          fetch(`/api/forum/latest-topic/${subCategoryData.id}`),
        ]);

        if (!latestEntryRes.ok) {
          throw new Error(
            `LatestEntryRes ${latestEntryRes.status} ${latestEntryRes.statusText}`,
          );
        }

        const latestEntryData = (await latestEntryRes.json()) as ForumTopic;

        setLatestEntry(latestEntryData);
        setSubCategory(subCategoryData || undefined);

        setLoading(false);
        hideLoadingBar("loadingBarName");
      } catch (err) {
        setSubCategory(undefined);
        setLatestEntry(undefined);
        setLoading(false);
        hideLoadingBar("loadingBarName");
        throw new Error(err as string);
      }
    }

    void fetchData();
  }, [hideLoadingBar, showLoadingBar, id]);

  return (
    <>
      <h2>Forum</h2>
      <div className="action-bar">
        <div className="action-bar-pagination">
          <ul className="pagination d-inline-flex">
            <li className="page-item  disabled">
              <a className="page-link" href="&amp;p=1#">
                «
              </a>
            </li>
            <li className="page-item  active ">
              <a className="page-link" href="&amp;p=1">
                1
              </a>
            </li>
            <li className="page-item  disabled ">
              <a className="page-link" href="&amp;p=1#">
                »
              </a>
            </li>
          </ul>
        </div>
        <div className="action-bar-buttons">
          <Link href="/forum/topic/new" className="btn btn-primary btn-sm">
            New Topic
          </Link>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {subCategory !== undefined ? (
            <>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/forum/">Home</a>
                </li>
                <li className="breadcrumb-item active">{subCategory.name}</li>
              </ol>
              <h2>{subCategory.name}</h2>
              <div className="card card-threads pb-0">
                <div className="card-header">Themen</div>
                <div className="card-body">
                  {subCategory.forum_topics.map((topic) => (
                    <div className="forum-thread" key={topic.id}>
                      <div className="forum-thread-info">
                        <div className="forum-thread-title">
                          <span className="float-end">
                            {topic.pinned ? (
                              <span title="Gepinnt">
                                <i className="fas fa-thumbtack fa-fw"></i>
                              </span>
                            ) : (
                              <></>
                            )}
                            {topic.locked ? (
                              <span title="Gesperrt">
                                <i className="fas fa-lock fa-fw"></i>
                              </span>
                            ) : (
                              <></>
                            )}
                          </span>
                          <a href={`/forum/topic/${topic.slug}/`}>
                            {topic.title}
                          </a>
                        </div>
                        <div className="forum-thread-meta">
                          <div>
                            <a
                              href={`/profile/${topic.forum_user.id}/`}
                              style={replaceColor({
                                color: topic.forum_user.group?.color,
                                gradient: topic.forum_user.group?.gradient,
                                start: topic.forum_user.group?.start,
                                end: topic.forum_user.group?.end,
                                isBadge: false,
                              })}
                            >
                              {topic.forum_user.username}
                            </a>
                            •
                            <span title={formatDate(topic.createdAt, true)}>
                              {formatDate(topic.createdAt, false)}
                            </span>
                          </div>
                          <div className="d-lg-none mt-2">
                            Views: 0 • Posts:
                            {topic.forum_topic_replies.length + 1}
                          </div>
                          <div className="d-md-none">
                            Letze Antwort:
                            <a href={`/profile/${topic.forum_user.id}/`}>
                              {topic.forum_user.username}
                            </a>
                            •
                            <span title={formatDate(topic.createdAt, true)}>
                              {formatDate(topic.createdAt, false)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="forum-thread-stats">
                        <div className="forum-thread-stats-item">
                          <div className="forum-thread-stats-key">Views</div>
                          <div className="forum-thread-stats-value">0</div>
                        </div>
                        <div className="forum-thread-stats-item">
                          <div className="forum-thread-stats-key">Posts</div>
                          <div className="forum-thread-stats-value">
                            {topic.forum_topic_replies.length + 1}
                          </div>
                        </div>
                      </div>
                      <div className="forum-thread-latest">
                        <div className="forum-thread-latest-icon">
                          <a href={`/profile/${topic.forum_user.id}/`}>
                            <img
                              src={topic.forum_user.avatarUrl}
                              alt={topic.forum_user.username}
                            />
                          </a>
                        </div>
                        {topic.latestReply ? (
                          <div className="forum-thread-latest-info">
                            <div className="forum-thread-latest-title">
                              <a
                                href={`/profile/${topic.latestReply.forum_user.id}/`}
                                style={replaceColor({
                                  color: topic.forum_user.group?.color,
                                  gradient: topic.forum_user.group?.gradient,
                                  start: topic.forum_user.group?.start,
                                  end: topic.forum_user.group?.end,
                                  isBadge: false,
                                })}
                              >
                                {topic.forum_user.username}
                              </a>
                            </div>
                            <div className="forum-thread-latest-meta">
                              <span
                                title={formatDate(
                                  topic.latestReply.createdAt,
                                  true,
                                )}
                              >
                                {formatDate(topic.latestReply.createdAt, false)}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="forum-thread-latest-info">
                              <div className="forum-thread-latest-title">
                                <a
                                  href={`/profile/${topic.forum_user.id}/`}
                                  style={replaceColor({
                                    color: topic.forum_user.group?.color,
                                    gradient: topic.forum_user.group?.gradient,
                                    start: topic.forum_user.group?.start,
                                    end: topic.forum_user.group?.end,
                                    isBadge: false,
                                  })}
                                >
                                  {topic.forum_user.username}
                                </a>
                              </div>
                              <div className="forum-thread-latest-meta">
                                <span title={formatDate(topic.createdAt, true)}>
                                  {formatDate(topic.createdAt, false)}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p>No subcategory data available</p>
          )}
        </>
      )}
    </>
  );
}
