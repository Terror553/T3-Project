"use client";

import Link from "next/link";
import { type ForumTopic } from "~/server/types/forum";
import { replaceColor } from "~/server/utils/colorUtils";
import { formatDate } from "~/server/utils/dateUtils";

type LastTopicInfoProps = {
  topic: ForumTopic;
  compact?: boolean;
};

export const LastTopicInfo = ({ topic, compact = false }: LastTopicInfoProps) => {
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
        <Link href={`/forum/topic/${topic.slug}`}>
          {topic.title}
        </Link>
        •
        <Link
          href={`/profile/${topic.forum_user.id}/`}
          style={replaceColor({
            color: topic.forum_user.groups?.color,
            gradient: topic.forum_user.groups?.gradient,
            start: topic.forum_user.groups?.start,
            end: topic.forum_user.groups?.end,
            isBadge: false,
          })}
        >
          {topic.forum_user.username}
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
        <Link href={`/profile/${topic.forum_user.id}/`}>
          <img
            src={topic.forum_user.avatar_url}
            alt={topic.forum_user.username}
          />
        </Link>
      </div>
      <div className="forum-node-latest-info">
        <div className="forum-node-latest-title">
          <Link href={`/forum/topic/${topic.slug}`}>
            {topic.title}
          </Link>
        </div>
        <div className="forum-node-latest-meta">
          <Link href={`/profile/${topic.forum_user.id}/`}>
            <span
              style={replaceColor({
                color: topic.forum_user.groups?.color,
                gradient: topic.forum_user.groups?.gradient,
                start: topic.forum_user.groups?.start,
                end: topic.forum_user.groups?.end,
                isBadge: false,
              })}
            >
              {topic.forum_user.username}
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