"use client";

import { ForumCategoryItem } from "~/components/forum";
import { useForum } from "~/hooks/useForum";

export default function Forum() {
  const { loading, forum, error } = useForum();

  if (loading) {
    return (
      <main className="content" aria-busy="true">
        <div className="page-header mb-3"><h1 className="h3">Forum</h1></div>
        <p className="alert alert-info" role="status">Loading forum data...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="content">
        <div className="page-header mb-3"><h1 className="h3">Forum</h1></div>
        <div className="alert alert-danger" role="alert"><p className="mb-0">{error}</p></div>
      </main>
    );
  }

  return (
    <main className="content">
      <div className="page-header mb-3 d-flex justify-content-between align-items-center">
        <h1 className="h3 mb-0">Forum</h1>
        <form className="d-flex" method="get" action="/forum">
          <label className="visually-hidden" htmlFor="forum-search">Search forum</label>
          <input id="forum-search" name="q" className="form-control form-control-sm" placeholder="Search forum" />
        </form>
      </div>
      <div className="forum-container">
        {forum.map((category) => (
          <ForumCategoryItem key={category.id} category={category} />
        ))}
      </div>
    </main>
  );
}