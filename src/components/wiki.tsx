"use client";
import { useState, useEffect } from "react";
import type { WikiCategoryFull } from "~/server/types/wiki";

export default function WikiPage({ wiki }: { wiki: WikiCategoryFull[] }) {
  // Helper to get the first tab key
  const getFirstTabKey = () => {
    if (!wiki || wiki.length === 0) return "";
    const firstCategory = wiki[0];
    if (
      firstCategory?.dropdown &&
      firstCategory?.wiki_sub_categories.length != 0
    ) {
      return `subCategory-${firstCategory.wiki_sub_categories?.[0]?.id ?? ""}`;
    }
    return `category-${firstCategory?.id ?? ""}`;
  };

  const [activeTab, setActiveTab] = useState<string>(getFirstTabKey());

  useEffect(() => {
    setActiveTab(getFirstTabKey());
  }, [wiki]);

  const handleTabClick = (tabKey: string, event: React.MouseEvent) => {
    event.preventDefault();
    setActiveTab(tabKey);
  };

  return (
    <div className="row">
      <div className="col-xl-9 col-lg-8">
        {wiki && wiki.length > 0 ? (
          <div className="card">
            <div className="card-body">
              <div className="tab-content">
                {wiki.map((category) =>
                  category.dropdown
                    ? category.wiki_sub_categories.map((subCategory) => {
                        const tabKey = `subCategory-${subCategory.id}`;
                        return (
                          <div
                            className={`tab-pane fade ${
                              activeTab === tabKey ? "show active" : ""
                            }`}
                            id={tabKey}
                            key={tabKey}
                          >
                            <span>
                              <strong>{subCategory.name}</strong>
                            </span>
                            <div className="post">{subCategory.content}</div>
                            <hr />
                            <div className="d-flex align-items-center">
                              <div className="me-auto">
                                <a
                                  href="#"
                                  className="btn btn-secondary btn-sm"
                                  title="Like"
                                >
                                  <i className="fas fa-thumbs-up"></i>
                                  <span className="ms-2"> Like </span>
                                </a>
                                <a
                                  href="?/edit"
                                  target="_blank"
                                  className="btn btn-sm btn-secondary"
                                >
                                  <i className="fas fa-pen"></i>
                                  <span className="ms-2">Edit</span>
                                </a>
                              </div>
                              <div className="ms-auto">
                                <a
                                  href="#modal-likes"
                                  className="btn btn-secondary btn-sm"
                                  data-bs-toggle="modal"
                                >
                                  <i className="fas fa-thumbs-up"></i>
                                  <span className="ms-2" id="count-wikiLikes">
                                    0
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : (() => {
                        const tabKey = `category-${category.id}`;
                        return (
                          <div
                            className={`tab-pane fade ${
                              activeTab === tabKey ? "show active" : ""
                            }`}
                            id={tabKey}
                            key={tabKey}
                          >
                            <span>
                              <strong>{category.name}</strong>
                            </span>
                            <div className="post">{category.content}</div>
                            <hr />
                            <div className="d-flex align-items-center">
                              <div className="me-auto">
                                <a
                                  href="#"
                                  className="btn btn-secondary btn-sm"
                                  title="Like"
                                >
                                  <i className="fas fa-thumbs-up"></i>
                                  <span className="ms-2"> Like </span>
                                </a>
                                <a
                                  href="?/edit"
                                  target="_blank"
                                  className="btn btn-sm btn-secondary"
                                >
                                  <i className="fas fa-pen"></i>
                                  <span className="ms-2">Edit</span>
                                </a>
                              </div>
                              <div className="ms-auto">
                                <a
                                  href="#modal-likes"
                                  className="btn btn-secondary btn-sm"
                                  data-bs-toggle="modal"
                                >
                                  <i className="fas fa-thumbs-up"></i>
                                  <span className="ms-2" id="count-wikiLikes">
                                    0
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })(),
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="col-xl-3 col-lg-4 identifiera">
        <div id="stickybar">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center flex-wrap mb-2">
                <div className="forum-search-bar">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control input-sm"
                      name="search"
                      id="searchbar"
                      placeholder="Search"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary btn-sq ignoreHoverAnimation"
                      disabled
                      aria-label="Search"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <ul className="nav nav-vertical" id="nav-wiki">
                {wiki.map((category) =>
                  category.dropdown ? (
                    <li className="nav-item" key={category.id}>
                      <a
                        href="#"
                        className="nav-link collapsed"
                        onClick={(e) => e.preventDefault()}
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-nav-${category.id}`}
                        aria-expanded="false"
                        aria-controls={`collapse-nav-${category.id}`}
                      >
                        <span className="collapse-icon float-end">
                          <i className="fas fa-angle-up fa-fw m-0"></i>
                        </span>
                        <span className="badge bg-secondary bg-sq float-end">
                          {category.wiki_sub_categories.length}
                        </span>
                        <i className={category.icon}></i>
                        {category.name}
                      </a>
                      <ul
                        className="collapse list-unstyled"
                        id={`collapse-nav-${category.id}`}
                      >
                        {category.wiki_sub_categories.map((subCategory) => (
                          <li className="nav-item nested" key={subCategory.id}>
                            <a
                              href="#"
                              className={`nav-link ${
                                activeTab === `subCategory-${subCategory.id}`
                                  ? "active"
                                  : ""
                              }`}
                              onClick={(event) =>
                                handleTabClick(
                                  `subCategory-${subCategory.id}`,
                                  event,
                                )
                              }
                            >
                              <i className={subCategory.icon}></i>
                              {subCategory.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item" key={category.id}>
                      <a
                        href="#"
                        className={`nav-link ${
                          activeTab === `category-${category.id}`
                            ? "active"
                            : ""
                        }`}
                        onClick={(event) =>
                          handleTabClick(`category-${category.id}`, event)
                        }
                      >
                        <i className={category.icon}></i>
                        {category.name}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
