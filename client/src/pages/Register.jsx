
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim().toLowerCase(),
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Registration failed."
        );
        return;
      }

      setMessage(
        "Account created successfully! Redirecting..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error("Register error:", error);

      setMessage(
        "Cannot connect to CampusOS server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">

      <div className="auth-decoration">
        <div className="auth-glow"></div>

        <div className="auth-brand">
          CampusOS<span>.</span>
        </div>

        <p>
          Join your campus.
          <br />
          Start from one place.
        </p>
      </div>

      <section className="auth-card">

        <div className="auth-heading">
          <p className="eyebrow">
            GET STARTED
          </p>

          <h1>
            Create account.
          </h1>

          <p>
            Create your CampusOS account and
            connect with your campus community.
          </p>
        </div>

        {message && (
          <div className="auth-message">
            {message}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-field">
            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account →"}
          </button>

        </form>

        <div className="auth-switch">
          Already have an account?
          <Link to="/login">
            Sign in
          </Link>
        </div>

        <Link
          to="/"
          className="auth-home"
        >
          ← Back to CampusOS
        </Link>

      </section>

    </main>
  );
}

export default Register;

