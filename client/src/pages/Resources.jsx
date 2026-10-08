import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} from "../services/api";

function Resources() {
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    course: "",
    semester: "",
    type: "Previous Question",
    description: "",
    fileUrl: "",
  });

  function getCurrentUserId() {
    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      return user?.id || user?._id || null;
    } catch {
      return null;
    }
  }

  function isOwner(resource) {
    const currentUserId = getCurrentUserId();

    const ownerId =
      resource.uploadedBy?._id ||
      resource.uploadedBy?.id ||
      resource.uploadedBy;

    return (
      currentUserId &&
      ownerId &&
      currentUserId.toString() === ownerId.toString()
    );
  }

  async function loadResources() {
    try {
      setLoading(true);
      setError("");

      const data = await getResources();

      if (data.success) {
        setResources(
          data.resources ||
            data.items ||
            []
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadResources();
  }, []);

  function resetForm() {
    setForm({
      title: "",
      course: "",
      semester: "",
      type: "Previous Question",
      description: "",
      fileUrl: "",
    });

    setEditingId(null);
    setShowForm(false);
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function startEdit(resource) {
    setEditingId(resource._id);

    setForm({
      title: resource.title || "",
      course: resource.course || "",
      semester: resource.semester || "",
      type: resource.type || "Previous Question",
      description: resource.description || "",
      fileUrl: resource.fileUrl || "",
    });

    setError("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      let data;

      if (editingId) {
        data = await updateResource(
          editingId,
          form
        );
      } else {
        data = await createResource(form);
      }

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to save resource."
        );
      }

      resetForm();
      await loadResources();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const data = await deleteResource(id);

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to delete resource."
        );
      }

      await loadResources();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="module-page">

      <header className="module-topbar">

        <button
          className="dashboard-brand"
          onClick={() => navigate("/dashboard")}
        >
          <span className="brand-dot" />
          CampusOS
        </button>

        <button
          className="back-link"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>

      </header>

      <section className="module-hero">

        <div>
          <p className="eyebrow">
            01 · ACADEMIC
          </p>

          <h1>
            Resource
            <br />
            <span>Hub.</span>
          </h1>

          <p>
            Previous questions, study materials and
            useful academic resources — all in one place.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
              setError("");
            }
          }}
        >
          {showForm ? "Close form" : "Add resource"}
          <span>{showForm ? "×" : "+"}</span>
        </button>

      </section>

      {showForm && (
        <section className="form-card">

          <div className="form-card-heading">
            <p className="section-label">
              {editingId
                ? "EDIT RESOURCE"
                : "NEW RESOURCE"}
            </p>

            <h2>
              {editingId
                ? "Update your resource."
                : "Add something useful."}
            </h2>
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <form
            className="resource-form"
            onSubmit={handleSubmit}
          >

            <label>
              Title
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. CSE 2115 Final Question"
                required
              />
            </label>

            <div className="form-row">

              <label>
                Course
                <input
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  placeholder="e.g. CSE 2115"
                  required
                />
              </label>

              <label>
                Semester
                <input
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  placeholder="e.g. 4th Semester"
                  required
                />
              </label>

            </div>

            <label>
              Type
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="Previous Question">
                  Previous Question
                </option>

                <option value="Study Material">
                  Study Material
                </option>
              </select>
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Short description..."
                rows="4"
              />
            </label>

            <label>
              File URL
              <input
                name="fileUrl"
                value={form.fileUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </label>

            <div className="form-row">

              <button
                className="primary-btn"
                type="submit"
              >
                {editingId
                  ? "Save changes"
                  : "Publish resource"}

                <span>→</span>
              </button>

              {editingId && (
                <button
                  className="secondary-btn"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>
      )}

      <section className="module-content">

        <div className="section-heading">

          <div>
            <p className="section-label">
              LIBRARY
            </p>

            <h2>
              Available resources.
            </h2>
          </div>

          <span className="section-count">
            {resources.length} ITEMS
          </span>

        </div>

        {loading ? (
          <div className="loading-box">
            Loading resources...
          </div>
        ) : resources.length === 0 ? (
          <div className="empty-state">
            No resources available yet.
          </div>
        ) : (
          <div className="resource-list">

            {resources.map((resource) => (

              <article
                className="resource-card"
                key={resource._id}
              >

                <div className="resource-icon">
                  {resource.type ===
                  "Previous Question"
                    ? "Q"
                    : "M"}
                </div>

                <div className="resource-main">

                  <div className="content-card-top">

                    <span className="tag">
                      {resource.type}
                    </span>

                    <span>
                      {resource.semester}
                    </span>

                  </div>

                  <h3>
                    {resource.title}
                  </h3>

                  <p>
                    {resource.description ||
                      "No description provided."}
                  </p>

                  <small>
                    {resource.course}
                  </small>

                  {resource.uploadedBy && (
                    <small>
                      Uploaded by{" "}
                      {resource.uploadedBy.name ||
                        "CampusOS"}
                    </small>
                  )}

                  {isOwner(resource) && (
                    <div className="card-actions">

                      <button
                        className="secondary-btn"
                        onClick={() =>
                          startEdit(resource)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="danger-btn"
                        onClick={() =>
                          handleDelete(resource._id)
                        }
                      >
                        🗑 Delete
                      </button>

                    </div>
                  )}

                </div>

                {resource.fileUrl && (
                  <a
                    className="resource-link"
                    href={resource.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open →
                  </a>
                )}

              </article>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Resources;