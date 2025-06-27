"use client";

import { type ForumCategory } from "~/server/types/forum";
import { ForumSubcategoryItem } from "./ForumSubcategoryItem";

type ForumCategoryItemProps = {
  category: ForumCategory;
};

export const ForumCategoryItem = ({ category }: ForumCategoryItemProps) => {
  return (
    <div className="card card-forum">
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
            <ForumSubcategoryItem 
              key={subcategory.id} 
              subcategory={subcategory} 
            />
          ))
        ) : (
          <p className="m-3">
            Diese Kategorie hat noch keine Subkategorien!
          </p>
        )}
      </div>
    </div>
  );
};