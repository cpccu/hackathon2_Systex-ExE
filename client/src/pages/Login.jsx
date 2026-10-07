
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email.trim().toLowerCase(),
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Invalid email or password."
        );
        return;
      }

      if (!data.token || !data.user) {
        setMessage("Login response is incomplete.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        "Cannot connect to CampusOS server."
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
          Your campus.
          <br />
          One starting point.
        </p>
      </div>

      <section className="auth-card">
        <div className="auth-heading">
          <p className="eyebrow">
            WELCOME BACK
          </p>

          <h1>
            Sign in.
          </h1>

          <p>
            Access your CampusOS dashboard
            and everything your campus has to offer.
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
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In →"}
          </button>
        </form>

        <div className="auth-switch">
          <span>Don't have an account?</span>

          <Link to="/register">
            Create one
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

export default Login;

