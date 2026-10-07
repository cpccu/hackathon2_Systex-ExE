import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] =
    useState([]);

  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
  });

  const [message, setMessage] =
    useState("");

  async function loadEvents() {
    try {
      const response = await fetch(
        "http://localhost:5001/api/events"
      );

      const data = await response.json();

      if (data.success) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const token =
      localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/api/events",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setMessage(
        "Event created successfully!"
      );

      setForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        organizer: "",
      });

      setShowForm(false);

      loadEvents();
    } catch (error) {
      setMessage(
        "Something went wrong."
      );
    }
  }

  return (
    <main className="module-page">

      <section className="module-header">

        <p className="eyebrow">
          CAMPUSOS · CAMPUS LIFE
        </p>

        <h1>
          Campus
          <br />
          <span>Events.</span>
        </h1>

        <p>
          Discover upcoming events,
          activities and campus programs.
        </p>

      </section>


      <button
        className="module-primary-btn"
        onClick={() =>
          setShowForm(!showForm)
        }
      >
        {showForm
          ? "✕ Close"
          : "+ Create Event"}
      </button>


      {message && (
        <div className="module-message">
          {message}
        </div>
      )}


      {showForm && (
        <form
          className="module-form"
          onSubmit={handleSubmit}
        >

          <input
            name="title"
            placeholder="Event title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Event description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="date"
            placeholder="Date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            name="time"
            placeholder="Time"
            value={form.time}
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            name="organizer"
            placeholder="Organizer"
            value={form.organizer}
            onChange={handleChange}
          />

          <button
            className="module-primary-btn"
            type="submit"
          >
            Publish Event
          </button>

        </form>
      )}


      <section className="module-grid">

        {events.map((event) => (

          <article
            className="module-card"
            key={event._id}
          >

            <span className="module-tag">
              🎉 EVENT
            </span>

            <h3>
              {event.title}
            </h3>

            <p>
              {event.description}
            </p>

            <small>
              📅 {event.date}
            </small>

            <small>
              ⏰ {event.time}
            </small>

            <small>
              📍 {event.location}
            </small>

            <small>
              👤 {event.organizer}
            </small>

          </article>

        ))}

        {events.length === 0 && (
          <div className="empty-module">
            No events yet.
          </div>
        )}

      </section>

    </main>
  );
}

export default Events;