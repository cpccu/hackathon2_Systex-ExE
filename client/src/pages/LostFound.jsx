import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getLostFound,
  createLostFound,
} from "../services/api";

function LostFound() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "Lost",
    contact: "",
  });

  async function loadItems() {
    try {
      setLoading(true);

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

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const data = await createLostFound(form);

      if (!data.success) {
        throw new Error(
          data.message ||
          "Unable to publish post."
        );
      }

      setForm({
        title: "",
        description: "",
        location: "",
        type: "Lost",
        contact: "",
      });

      setShowForm(false);
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
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close form" : "Create post"}
          <span>{showForm ? "×" : "+"}</span>
        </button>

      </section>

      {showForm && (
        <section className="form-card">

          <div className="form-card-heading">
            <p className="section-label">
              NEW POST
            </p>

            <h2>
              Help someone find their thing.
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

            <button
              className="primary-btn"
              type="submit"
            >
              Publish post
              <span>→</span>
            </button>

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
                  <strong>{item.contact}</strong>
                </div>

                <small>
                  Posted by{" "}
                  {item.postedBy?.name ||
                    "CampusOS"}
                </small>

              </article>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default LostFound;