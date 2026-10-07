import { useEffect, useState } from "react";

function LostFound() {
  const [items, setItems] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    type: "Lost",
    contact: "",
  });

  const [message, setMessage] = useState("");

  async function loadItems() {
    try {
      const response = await fetch(
        "http://localhost:5001/api/lost-found"
      );

      const data = await response.json();

      if (data.success) {
        setItems(data.items);
      }
    } catch (error) {
      console.error(error);
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

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/api/lost-found",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Failed to create post."
        );
        return;
      }

      setMessage("Post created successfully! 🎉");

      setForm({
        title: "",
        description: "",
        location: "",
        type: "Lost",
        contact: "",
      });

      setShowForm(false);

      loadItems();
    } catch (error) {
      console.error(error);

      setMessage(
        "Something went wrong."
      );
    }
  }

  return (
    <main className="module-page">

      <section className="module-header">

        <p className="eyebrow">
          CAMPUSOS · COMMUNITY
        </p>

        <h1>
          Lost
          <br />
          <span>& Found.</span>
        </h1>

        <p>
          Lost something on campus?
          Found something that belongs
          to someone else?
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
          : "+ Create Post"}
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
            placeholder="Item name"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
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

          <input
            name="contact"
            placeholder="Contact information"
            value={form.contact}
            onChange={handleChange}
            required
          />

          <button
            className="module-primary-btn"
            type="submit"
          >
            Publish Post
          </button>

        </form>
      )}

      <section className="module-grid">

        {items.map((item) => (

          <article
            className="module-card"
            key={item._id}
          >

            <span className="module-tag">
              {item.type}
            </span>

            <h3>
              {item.title}
            </h3>

            <p>
              {item.description}
            </p>

            <small>
              📍 {item.location}
            </small>

            <small>
              📞 {item.contact}
            </small>

            {item.postedBy && (
              <small>
                👤 {item.postedBy.name}
              </small>
            )}

          </article>

        ))}

        {items.length === 0 && (
          <div className="empty-module">
            No posts yet.
          </div>
        )}

      </section>

    </main>
  );
}

export default LostFound;