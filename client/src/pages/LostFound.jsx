import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getLostFound,
  createLostFound,
  updateLostFound,
  deleteLostFound,
} from "../services/api";

function LostFound() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "Lost",
    contact: "",
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

  function isOwner(item) {
    const currentUserId = getCurrentUserId();

    const ownerId =
      item.postedBy?._id ||
      item.postedBy?.id ||
      item.postedBy;

    return (
      currentUserId &&
      ownerId &&
      currentUserId.toString() === ownerId.toString()
    );
  }

  async function loadItems() {
    try {
      setLoading(true);
      setError("");

      const data = await getLostFound();

      if (data.success) {
        const list =
          data.lostFound ||
          data.items ||
          data.posts ||
          data.data ||
          [];

        setItems(list);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function resetForm() {
    setForm({
      title: "",
      description: "",
      location: "",
      type: "Lost",
      contact: "",
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

  function startEdit(item) {
    setEditingId(item._id);

    setForm({
      title: item.title || "",
      description: item.description || "",
      location: item.location || "",
      type: item.type || "Lost",
      contact: item.contact || "",
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
        data = await updateLostFound(
          editingId,
          form
        );
      } else {
        data = await createLostFound(form);
      }

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to save post."
        );
      }

      resetForm();
      await loadItems();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const data = await deleteLostFound(id);

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to delete post."
        );
      }

      await loadItems();
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
            04 · COMMUNITY
          </p>

          <h1>
            Lost &
            <br />
            <span>Found.</span>
          </h1>

          <p>
            Lost something? Found something?
            Help your campus community connect.
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
          {showForm ? "Close form" : "Create post"}
          <span>{showForm ? "×" : "+"}</span>
        </button>

      </section>

      {showForm && (
        <section className="form-card">

          <div className="form-card-heading">
            <p className="section-label">
              {editingId
                ? "EDIT POST"
                : "NEW POST"}
            </p>

            <h2>
              {editingId
                ? "Update your post."
                : "Help someone find their thing."}
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
                placeholder="e.g. Black wallet"
                required
              />
            </label>

            <label>
              Type
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="Lost">
                  Lost
                </option>

                <option value="Found">
                  Found
                </option>
              </select>
            </label>

            <label>
              Location
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Where was it lost/found?"
                required
              />
            </label>

            <label>
              Contact
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="How can someone contact you?"
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the item..."
                rows="5"
                required
              />
            </label>

            <div className="form-row">

              <button
                className="primary-btn"
                type="submit"
              >
                {editingId
                  ? "Save changes"
                  : "Publish post"}

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
              COMMUNITY BOARD
            </p>

            <h2>
              Recent posts.
            </h2>
          </div>

          <span className="section-count">
            {items.length} POSTS
          </span>

        </div>

        {loading ? (
          <div className="loading-box">
            Loading posts...
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            No Lost & Found posts yet.
          </div>
        ) : (
          <div className="lost-found-grid">

            {items.map((item) => (

              <article
                className="lost-found-card"
                key={item._id}
              >

                <div className="lost-found-top">

                  <span
                    className={
                      item.type === "Found"
                        ? "tag tag-found"
                        : "tag tag-lost"
                    }
                  >
                    {item.type}
                  </span>

                  <span>
                    📍 {item.location}
                  </span>

                </div>

                <h3>{item.title}</h3>

                <p>
                  {item.description}
                </p>

                <div className="lost-found-contact">
                  <span>Contact</span>
                  <strong>
                    {item.contact}
                  </strong>
                </div>

                <small>
                  Posted by{" "}
                  {item.postedBy?.name ||
                    "CampusOS"}
                </small>

                {isOwner(item) && (
                  <div className="card-actions">

                    <button
                      className="secondary-btn"
                      onClick={() =>
                        startEdit(item)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="danger-btn"
                      onClick={() =>
                        handleDelete(item._id)
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>
                )}

              </article>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default LostFound;