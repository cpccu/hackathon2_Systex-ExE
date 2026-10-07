import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getResources,
  createResource,
} from "../services/api";

function Resources() {
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    course: "",
    semester: "",
    type: "Previous Question",
    description: "",
    fileUrl: "",
  });

  async function loadResources() {
    try {
      setLoading(true);

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
      const data = await createResource(form);

      if (!data.success) {
        throw new Error(
          data.message || "Unable to add resource."
        );
      }

      setForm({
        title: "",
        course: "",
        semester: "",
        type: "Previous Question",
        description: "",
        fileUrl: "",
      });

      setShowForm(false);
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
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close form" : "Add resource"}
          <span>{showForm ? "×" : "+"}</span>
        </button>

      </section>

      {showForm && (
        <section className="form-card">

          <div className="form-card-heading">
            <p className="section-label">
              NEW RESOURCE
            </p>
            <h2>Add something useful.</h2>
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

            <button
              className="primary-btn"
              type="submit"
            >
              Publish resource
              <span>→</span>
            </button>

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

                  <h3>{resource.title}</h3>

                  <p>
                    {resource.description ||
                      "No description provided."}
                  </p>

                  <small>
                    {resource.course}
                  </small>

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