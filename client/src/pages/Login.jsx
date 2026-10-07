import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
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
      const data = await loginUser(form);

      if (!data.success) {
        throw new Error(
          data.message || "Login failed."
        );
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      const destination =
        location.state?.from || "/dashboard";

      navigate(destination, { replace: true });

    } catch (error) {
      setError(
        error.message ||
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">

      <section className="auth-brand-panel">

        <button
          className="auth-brand"
          onClick={() => navigate("/")}
        >
          <span className="brand-dot" />
          CampusOS
        </button>

        <div className="auth-brand-content">
          <p className="eyebrow">
            WELCOME BACK
          </p>

          <h1>
            Everything
            <br />
            starts here.
          </h1>

          <p>
            Access your campus resources,
            notices, events and student services
            from one place.
          </p>
        </div>

        <span className="auth-panel-footer">
          Your campus. One starting point.
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
              ACCOUNT
            </p>

            <h2>Sign in</h2>

            <p>
              Welcome back. Enter your details
              to continue.
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
                placeholder="Enter your password"
                required
              />
            </label>

            <button
              className="primary-btn full-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <span>→</span>}
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">
              Create one
            </Link>
          </p>

        </div>

      </section>

    </main>
  );
}

export default Login;