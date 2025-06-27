"use client";

import Link from "next/link";
import { type ForumSubcategory } from "~/server/types/forum";
import { LastTopicInfo } from "./LastTopicInfo";

type ForumSubcategoryItemProps = {
  subcategory: ForumSubcategory;
};

export const ForumSubcategoryItem = ({ subcategory }: ForumSubcategoryItemProps) => {
  const totalPosts = (subcategory.repliesCount || 0) + (subcategory.count || 0);
  
  return (
    <div className="card-body">
      <div className="forum-node">
        <div className="forum-node-icon">
          <i className="fas fa-comment"></i>
        </div>
        <div className="forum-node-info">
          <div className="forum-node-title">
            <Link href={`/forum/subcategory/${subcategory.id}`}>
              {subcategory.name}
            </Link>
          </div>
          <div className="forum-node-meta">
            <div className="d-none d-xl-block mb-2 mb-xxl-0">
              {subcategory.description}
            </div>
            <div className="d-xxl-none mt-1">
              Topics: {subcategory.count || 0} • Posts: {totalPosts}
            </div>
            <div className="d-md-none">
              Latest Post:
              {subcategory.latestEntry ? (
                <LastTopicInfo 
                  topic={subcategory.latestEntry} 
                  compact={true} 
                />
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
              {subcategory.count || 0}
            </div>
          </div>
          <div className="forum-node-stats-item">
            <div className="forum-node-stats-key">Posts</div>
            <div className="forum-node-stats-value">
              {totalPosts}
            </div>
          </div>
        </div>
        <div className="forum-node-latest">
          {subcategory.latestEntry ? (
            <LastTopicInfo topic={subcategory.latestEntry} />
          ) : (
            <>No posts.</>
          )}
        </div>
      </div>
    </div>
  );
};