"use client";

import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  subcategories: Array<{
    id: number;
    name: string;
    description: string;
    slug: string;
  }>;
};

export default function AdminCategoriesPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState<Record<number, { name: string; description: string }>>({});
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [categoryDraft, setCategoryDraft] = useState("");
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<number | null>(null);
  const [subcategoryDraft, setSubcategoryDraft] = useState<{ name: string; description: string }>({
    name: "",
    description: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const userRes = await fetch("/api/auth/user");
        if (!userRes.ok) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const user = await userRes.json();
        const canAccess = !!user && !!(user.group?.team || user.group?.highTeam);
        setIsAdmin(canAccess);

        if (!canAccess) {
          setLoading(false);
          return;
        }

        const res = await fetch("/api/admin/categories");
        if (!res.ok) throw new Error("Failed to load categories");
        const data = (await res.json()) as Category[];
        setCategories(data);
      } catch (error) {
        console.error("Failed to load admin categories", error);
        setMessage("Failed to load category list");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  async function refreshCategories() {
    const res = await fetch("/api/admin/categories");
    if (!res.ok) throw new Error("Failed to refresh categories");
    const data = (await res.json()) as Category[];
    setCategories(data);
  }

  async function handleCreateCategory(event: React.FormEvent) {
    event.preventDefault();
    if (!newCategory.trim()) return;

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory.trim() }),
    });

    if (!res.ok) {
      const body = await res.text();
      setMessage(`Failed to create category: ${body}`);
      return;
    }

    setNewCategory("");
    setMessage("Category created");
    void refreshCategories();
  }

  async function handleCreateSubcategory(categoryId: number) {
    const entry = newSubcategory[categoryId];
    if (!entry?.name?.trim()) {
      setMessage("Subcategory name is required");
      return;
    }

    const res = await fetch(`/api/admin/categories/${categoryId}/subcategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: entry.name.trim(),
        description: entry.description.trim(),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      setMessage(`Failed to create subcategory: ${body}`);
      return;
    }

    setNewSubcategory((prev) => ({
      ...prev,
      [categoryId]: { name: "", description: "" },
    }));
    setMessage("Subcategory created");
    void refreshCategories();
  }

  async function handleDeleteCategory(categoryId: number) {
    const confirmed = window.confirm("Delete this category? This requires it to be empty.");
    if (!confirmed) return;

    const res = await fetch("/api/admin/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: categoryId }),
    });

    if (!res.ok) {
      const body = await res.text();
      setMessage(`Failed to delete category: ${body}`);
      return;
    }

    setMessage("Category deleted");
    setEditingCategoryId(null);
    void refreshCategories();
  }

  async function handleUpdateCategory(categoryId: number) {
    const trimmed = categoryDraft.trim();
    if (!trimmed) {
      setMessage("Category name is required");
      return;
    }

    const res = await fetch("/api/admin/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: categoryId, name: trimmed }),
    });

    if (!res.ok) {
      const body = await res.text();
      setMessage(`Failed to update category: ${body}`);
      return;
    }

    setEditingCategoryId(null);
    setCategoryDraft("");
    setMessage("Category updated");
    void refreshCategories();
  }

  async function handleDeleteSubcategory(categoryId: number, subcategoryId: number) {
    const confirmed = window.confirm("Delete this subcategory? This requires it to be empty.");
    if (!confirmed) return;

    const res = await fetch(`/api/admin/categories/${categoryId}/subcategories`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: subcategoryId }),
    });

    if (!res.ok) {
      const body = await res.text();
      setMessage(`Failed to delete subcategory: ${body}`);
      return;
    }

    setEditingSubcategoryId(null);
    setSubcategoryDraft({ name: "", description: "" });
    setMessage("Subcategory deleted");
    void refreshCategories();
  }

  async function handleUpdateSubcategory(categoryId: number, subcategoryId: number) {
    const name = subcategoryDraft.name.trim();
    if (!name) {
      setMessage("Subcategory name is required");
      return;
    }

    const res = await fetch(`/api/admin/categories/${categoryId}/subcategories`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: subcategoryId,
        name,
        description: subcategoryDraft.description.trim(),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      setMessage(`Failed to update subcategory: ${body}`);
      return;
    }

    setEditingSubcategoryId(null);
    setSubcategoryDraft({ name: "", description: "" });
    setMessage("Subcategory updated");
    void refreshCategories();
  }

  if (loading) return <p>Loading admin category management...</p>;
  if (!isAdmin) return <p>Access denied</p>;

  return (
    <div className="container py-4">
      <h2>Forum category management</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form className="card p-3 mb-4" onSubmit={handleCreateCategory}>
        <h4>Create category</h4>
        <div className="row g-2 align-items-end">
          <div className="col-md-8">
            <label className="form-label">Category name</label>
            <input
              className="form-control"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100" type="submit">Create category</button>
          </div>
        </div>
      </form>

      <div className="row g-3">
        {categories.map((category) => (
          <div className="col-lg-6" key={category.id}>
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                {editingCategoryId === category.id ? (
                  <input
                    className="form-control"
                    value={categoryDraft}
                    onChange={(e) => setCategoryDraft(e.target.value)}
                  />
                ) : (
                  <strong>{category.name}</strong>
                )}
                <div className="btn-group btn-group-sm">
                  {editingCategoryId === category.id ? (
                    <>
                      <button className="btn btn-success" onClick={() => void handleUpdateCategory(category.id)}>
                        Save
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setEditingCategoryId(null);
                          setCategoryDraft("");
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setEditingCategoryId(category.id);
                          setCategoryDraft(category.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => void handleDeleteCategory(category.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="card-body">
                {category.subcategories.length === 0 ? (
                  <p className="text-muted mb-3">No subcategories yet.</p>
                ) : (
                  <ul className="list-group list-group-flush mb-3">
                    {category.subcategories.map((subcategory) => (
                      <li className="list-group-item" key={subcategory.id}>
                        {editingSubcategoryId === subcategory.id ? (
                          <div className="d-grid gap-2">
                            <input
                              className="form-control"
                              value={subcategoryDraft.name}
                              onChange={(e) => setSubcategoryDraft((prev) => ({ ...prev, name: e.target.value }))}
                            />
                            <textarea
                              className="form-control"
                              rows={2}
                              value={subcategoryDraft.description}
                              onChange={(e) =>
                                setSubcategoryDraft((prev) => ({ ...prev, description: e.target.value }))
                              }
                            />
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-success"
                                onClick={() => void handleUpdateSubcategory(category.id, subcategory.id)}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                  setEditingSubcategoryId(null);
                                  setSubcategoryDraft({ name: "", description: "" });
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <div>
                              <div className="fw-semibold">{subcategory.name}</div>
                              <small className="text-muted">{subcategory.description || "No description"}</small>
                            </div>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  setEditingSubcategoryId(subcategory.id);
                                  setSubcategoryDraft({
                                    name: subcategory.name,
                                    description: subcategory.description,
                                  });
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => void handleDeleteSubcategory(category.id, subcategory.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="border rounded p-3">
                  <h6>Create subcategory</h6>
                  <div className="mb-2">
                    <input
                      className="form-control"
                      placeholder="Subcategory name"
                      value={newSubcategory[category.id]?.name ?? ""}
                      onChange={(e) =>
                        setNewSubcategory((prev) => ({
                          ...prev,
                          [category.id]: {
                            name: e.target.value,
                            description: prev[category.id]?.description ?? "",
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="Description (optional)"
                      value={newSubcategory[category.id]?.description ?? ""}
                      onChange={(e) =>
                        setNewSubcategory((prev) => ({
                          ...prev,
                          [category.id]: {
                            name: prev[category.id]?.name ?? "",
                            description: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <button className="btn btn-outline-primary" onClick={() => handleCreateSubcategory(category.id)}>
                    Add subcategory
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
