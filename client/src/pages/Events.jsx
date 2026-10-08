import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/api";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizer: "CampusOS",
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

  function isOwner(event) {
    const currentUserId = getCurrentUserId();

    const ownerId =
      event.createdBy?._id ||
      event.createdBy?.id ||
      event.createdBy;

    return (
      currentUserId &&
      ownerId &&
      currentUserId.toString() === ownerId.toString()
    );
  }

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");

      const data = await getEvents();

      if (data.success) {
        setEvents(data.events || []);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function resetForm() {
    setForm({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      organizer: "CampusOS",
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

  function startEdit(event) {
    setEditingId(event._id);

    setForm({
      title: event.title || "",
      description: event.description || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      organizer: event.organizer || "CampusOS",
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
        data = await updateEvent(
          editingId,
          form
        );
      } else {
        data = await createEvent(form);
      }

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to save event."
        );
      }

      resetForm();
      await loadEvents();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const data = await deleteEvent(id);

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to delete event."
        );
      }

      await loadEvents();
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
            03 · CAMPUS LIFE
          </p>

          <h1>
            Campus
            <br />
            <span>Events.</span>
          </h1>

          <p>
            Discover events, activities and things
            happening around your campus.
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
          {showForm ? "Close form" : "Add event"}
          <span>{showForm ? "×" : "+"}</span>
        </button>

      </section>

      {showForm && (
        <section className="form-card">

          <div className="form-card-heading">

            <p className="section-label">
              {editingId
                ? "EDIT EVENT"
                : "NEW EVENT"}
            </p>

            <h2>
              {editingId
                ? "Update your event."
                : "Put something on the calendar."}
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
              Event title
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Event name"
                required
              />
            </label>

            <div className="form-row">

              <label>
                Date
                <input
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="e.g. 20/10/2026"
                  required
                />
              </label>

              <label>
                Time
                <input
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  placeholder="e.g. 3:00 PM"
                  required
                />
              </label>

            </div>

            <label>
              Location
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Event location"
                required
              />
            </label>

            <label>
              Organizer
              <input
                name="organizer"
                value={form.organizer}
                onChange={handleChange}
                placeholder="Organizer"
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Tell students about the event..."
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
                  : "Publish event"}

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
              CAMPUS CALENDAR
            </p>

            <h2>
              What's coming up?
            </h2>
          </div>

          <span className="section-count">
            {events.length} EVENTS
          </span>

        </div>

        {loading ? (
          <div className="loading-box">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            No events available yet.
          </div>
        ) : (
          <div className="event-grid">

            {events.map((event) => (

              <article
                className="event-full-card"
                key={event._id}
              >

                <div className="event-date-box large">
                  <span>DATE</span>

                  <strong>
                    {event.date}
                  </strong>
                </div>

                <div className="event-card-body">

                  <div className="tag">
                    EVENT
                  </div>

                  <h3>
                    {event.title}
                  </h3>

                  <p>
                    {event.description}
                  </p>

                  <div className="event-details">

                    <span>
                      📍 {event.location}
                    </span>

                    <span>
                      🕐 {event.time}
                    </span>

                    <span>
                      👤 {event.organizer}
                    </span>

                  </div>

                  <small>
                    Created by{" "}
                    {event.createdBy?.name ||
                      "CampusOS"}
                  </small>

                  {isOwner(event) && (
                    <div className="card-actions">

                      <button
                        className="secondary-btn"
                        onClick={() =>
                          startEdit(event)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="danger-btn"
                        onClick={() =>
                          handleDelete(event._id)
                        }
                      >
                        🗑 Delete
                      </button>

                    </div>
                  )}

                </div>

              </article>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Events;