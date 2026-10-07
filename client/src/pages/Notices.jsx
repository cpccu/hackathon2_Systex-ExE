import { useEffect, useState } from "react";

function Notices() {
  const [notices, setNotices] =
    useState([]);

  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    date: "",
  });

  const [message, setMessage] =
    useState("");

  async function loadNotices() {
    try {
      const response = await fetch(
        "http://localhost:5001/api/notices"
      );

      const data = await response.json();

      if (data.success) {
        setNotices(data.notices);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadNotices();
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
        "http://localhost:5001/api/notices",
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
        "Notice published successfully!"
      );

      setForm({
        title: "",
        description: "",
        category: "General",
        date: "",
      });

      setShowForm(false);

      loadNotices();
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
          CAMPUSOS · INFORMATION
        </p>

        <h1>
          Campus
          <br />
          <span>Notices.</span>
        </h1>

        <p>
          Class cancellations, bus issues
          and important campus announcements.
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
          : "+ Create Notice"}
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
            placeholder="Notice title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Notice details"
            value={form.description}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >

            <option>
              General
            </option>

            <option>
              Class Cancellation
            </option>

            <option>
              Bus Issue
            </option>

          </select>

          <input
            name="date"
            placeholder="Date"
            value={form.date}
            onChange={handleChange}
          />

          <button
            className="module-primary-btn"
            type="submit"
          >
            Publish Notice
          </button>

        </form>
      )}


      <section className="module-grid">

        {notices.map((notice) => (

          <article
            className="module-card"
            key={notice._id}
          >

            <span className="module-tag">
              {notice.category}
            </span>

            <h3>
              {notice.title}
            </h3>

            <p>
              {notice.description}
            </p>

            {notice.date && (
              <small>
                📅 {notice.date}
              </small>
            )}

          </article>

        ))}

        {notices.length === 0 && (
          <div className="empty-module">
            No notices yet.
          </div>
        )}

      </section>

    </main>
  );
}

export default Notices;