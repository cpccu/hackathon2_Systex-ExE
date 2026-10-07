import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getEvents,
  createEvent,
} from "../services/api";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizer: "CampusOS",
  });

  async function loadEvents() {
    try {
      setLoading(true);

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
      const data = await createEvent(form);

      if (!data.success) {
        throw new Error(
          data.message || "Unable to create event."
        );
      }

      setForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        organizer: "CampusOS",
      });

      setShowForm(false);
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
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close form" : "Add event"}
          <span>{showForm ? "×" : "+"}</span>
        </button>

      </section>

      {showForm && (
        <section className="form-card">

          <div className="form-card-heading">
            <p className="section-label">
              NEW EVENT
            </p>

            <h2>
              Put something on the calendar.
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

            <button
              className="primary-btn"
              type="submit"
            >
              Publish event
              <span>→</span>
            </button>

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

                  <h3>{event.title}</h3>

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