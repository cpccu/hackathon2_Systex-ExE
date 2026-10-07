import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await registerUser(form);

      if (!data.success) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      navigate("/login");

    } catch (error) {
      setError(
        error.message ||
        "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">

      <section className="auth-brand-panel register-panel">

        <button
          className="auth-brand"
          onClick={() => navigate("/")}
        >
          <span className="brand-dot" />
          CampusOS
        </button>

        <div className="auth-brand-content">
          <p className="eyebrow">
            JOIN CAMPUSOS
          </p>

          <h1>
            Your campus
            <br />
            <span>starts here.</span>
          </h1>

          <p>
            Create your account and get a
            single starting point for your
            academic and campus life.
          </p>
        </div>

        <span className="auth-panel-footer">
          Built for students.
        </span>

      </section>

      <section className="auth-form-panel">

        <div className="auth-form-wrapper">

          <button
            className="back-link"
            onClick={() => navigate("/")}
          >
            ← Back to CampusOS
          </button>

          <div className="auth-heading">
            <p className="section-label">
              NEW ACCOUNT
            </p>

            <h2>Create account</h2>

            <p>
              It only takes a minute to get started.
            </p>
          </div>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            <label>
              Full name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </label>

            <button
              className="primary-btn full-btn"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create account"}
              {!loading && <span>→</span>}
            </button>

          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">
              Sign in
            </Link>
          </p>

        </div>

      </section>

    </main>
  );
}

export default Register;