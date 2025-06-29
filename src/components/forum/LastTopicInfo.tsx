"use client";

import Link from "next/link";
import { type ForumTopic } from "~/server/types/forum";
import { replaceColor } from "~/server/utils/colorUtils";
import { formatDate } from "~/server/utils/dateUtils";

type LastTopicInfoProps = {
  topic: ForumTopic;
  compact?: boolean;
};

export const LastTopicInfo = ({
  topic,
  compact = false,
}: LastTopicInfoProps) => {
  if (!topic) {
    return compact ? (
      <span className="text-muted">No posts</span>
    ) : (
      <>No posts.</>
    );
  }

  if (compact) {
    return (
      <>
        <Link href={`/forum/topic/${topic.slug}`}>{topic.title}</Link>•
        <Link
          href={`/profile/${topic.author?.id}/`}
          style={replaceColor({
            color: topic.author?.group?.color,
            gradient: topic.author?.group?.gradient,
            start: topic.author?.group?.start,
            end: topic.author?.group?.end,
            isBadge: false,
          })}
        >
          {topic.author?.username}
        </Link>
        •
        <span title={formatDate(topic.createdAt, true)}>
          {formatDate(topic.createdAt, false)}
        </span>
      </>
    );
  }

  return (
    <>
      <div className="forum-node-latest-icon">
        <Link href={`/profile/${topic.author?.id}/`}>
          <img
            src={topic.author?.avatarUrl}
            alt={topic.author?.username || ""}
          />
        </Link>
      </div>
      <div className="forum-node-latest-info">
        <div className="forum-node-latest-title">
          <Link href={`/forum/topic/${topic.slug}`}>{topic.title}</Link>
        </div>
        <div className="forum-node-latest-meta">
          <Link href={`/profile/${topic.author?.id}/`}>
            <span
              style={replaceColor({
                color: topic.author?.group?.color,
                gradient: topic.author?.group?.gradient,
                start: topic.author?.group?.start,
                end: topic.author?.group?.end,
                isBadge: false,
              })}
            >
              {topic.author?.username}
            </span>
          </Link>
          •
          <span title={formatDate(topic.createdAt, true)}>
            {formatDate(topic.createdAt, false)}
          </span>
        </div>
      </div>
    </>
  );
};
