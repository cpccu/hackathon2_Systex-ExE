import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getNotices,
  createNotice,
} from "../services/api";

function Notices() {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    date: "",
  });

  async function loadNotices() {
    try {
      setLoading(true);

      const data = await getNotices();

      if (data.success) {
        setNotices(data.notices || []);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotices();
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
      const data = await createNotice(form);

      if (!data.success) {
        throw new Error(
          data.message || "Unable to publish notice."
        );
      }

      setForm({
        title: "",
        description: "",
        category: "General",
        date: "",
      });

      setShowForm(false);
      await loadNotices();

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
            02 · CAMPUS UPDATES
          </p>

          <h1>
            Campus
            <br />
            <span>Notices.</span>
          </h1>

          <p>
            Class cancellations, bus issues and
            important announcements from campus.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close form" : "Post notice"}
          <span>{showForm ? "×" : "+"}</span>
        </button>

      </section>

      {showForm && (
        <section className="form-card">

          <div className="form-card-heading">
            <p className="section-label">
              NEW NOTICE
            </p>
            <h2>Share an update.</h2>
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
                placeholder="Notice title"
                required
              />
            </label>

            <label>
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="General">
                  General
                </option>

                <option value="Class Cancellation">
                  Class Cancellation
                </option>

                <option value="Bus Issue">
                  Bus Issue
                </option>
              </select>
            </label>

            <label>
              Date
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="e.g. 08/10/2026"
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write the notice..."
                rows="5"
                required
              />
            </label>

            <button
              className="primary-btn"
              type="submit"
            >
              Publish notice
              <span>→</span>
            </button>

          </form>

        </section>
      )}

      <section className="module-content">

        <div className="section-heading">

          <div>
            <p className="section-label">
              LIVE FEED
            </p>

            <h2>
              What's happening?
            </h2>
          </div>

          <span className="section-count">
            {notices.length} NOTICES
          </span>

        </div>

        {loading ? (
          <div className="loading-box">
            Loading notices...
          </div>
        ) : notices.length === 0 ? (
          <div className="empty-state">
            No notices available.
          </div>
        ) : (
          <div className="notice-list">

            {notices.map((notice) => (
              <article
                className="notice-card"
                key={notice._id}
              >

                <div className="notice-number">
                  {String(
                    notices.indexOf(notice) + 1
                  ).padStart(2, "0")}
                </div>

                <div className="notice-main">

                  <div className="content-card-top">

                    <span className="tag">
                      {notice.category}
                    </span>

                    {notice.date && (
                      <span>
                        {notice.date}
                      </span>
                    )}

                  </div>

                  <h3>{notice.title}</h3>

                  <p>
                    {notice.description}
                  </p>

                  <small>
                    Posted by{" "}
                    {notice.postedBy?.name ||
                      "CampusOS"}
                  </small>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Notices;