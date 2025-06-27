"use client";

import { ForumCategoryItem } from "~/components/forum";
import { useForum } from "~/hooks/useForum";

export default function Forum() {
  const { loading, forum, error } = useForum();

  if (loading) {
    return (
      <>
        <h2>Forum</h2>
        <div className="forum-loading">
          <p>Loading forum data...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h2>Forum</h2>
        <div className="alert alert-danger">
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Forum</h2>
      <div className="forum-container">
        {forum.map((category) => (
          <ForumCategoryItem key={category.id} category={category} />
        ))}
      </div>
    </>
  );
}