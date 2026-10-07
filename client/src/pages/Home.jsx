import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const modules = [
    {
      number: "01",
      icon: "📚",
      title: "Resource Hub",
      description:
        "Previous semester questions, study materials and useful academic resources.",
    },
    {
      number: "02",
      icon: "📢",
      title: "Campus Notices",
      description:
        "Stay updated with class cancellations, bus issues and important announcements.",
    },
    {
      number: "03",
      icon: "🔎",
      title: "Lost & Found",
      description:
        "Report lost items or help someone find what they are looking for.",
    },
    {
      number: "04",
      icon: "🎉",
      title: "Campus Events",
      description:
        "Discover activities, events and things happening around campus.",
    },
  ];

  return (
    <main className="home-page">

      <section className="hero-section">

        <div className="hero-copy">

          <div className="brand-mark">
            <span className="brand-dot" />
            CampusOS
          </div>

          <p className="eyebrow">
            SINGLE STARTING POINT FOR CAMPUS LIFE
          </p>

          <h1>
            Your campus.
            <br />
            <span>One starting point.</span>
          </h1>

          <p className="hero-description">
            CampusOS brings academic resources, campus notices,
            events and student services together in one simple
            digital space.
          </p>

          <div className="hero-actions">
            <button
              className="primary-btn"
              onClick={() => navigate("/register")}
            >
              Get started
              <span>→</span>
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>

          <div className="hero-meta">
            <span>01 — Academic</span>
            <span>02 — Campus Life</span>
            <span>03 — Community</span>
          </div>

        </div>

        <div className="hero-visual">

          <div className="visual-card visual-card-main">

            <div className="visual-top">
              <span>CampusOS</span>
              <span className="status-dot" />
            </div>

            <div className="visual-heading">
              <small>YOUR CAMPUS DASHBOARD</small>
              <strong>Everything<br />in one place.</strong>
            </div>

            <div className="visual-mini-grid">
              <div>
                <span>📚</span>
                <small>Resources</small>
              </div>

              <div>
                <span>📢</span>
                <small>Notices</small>
              </div>

              <div>
                <span>🔎</span>
                <small>Lost & Found</small>
              </div>

              <div>
                <span>🎉</span>
                <small>Events</small>
              </div>
            </div>

          </div>

          <div className="floating-card floating-card-one">
            <span>📢</span>
            <div>
              <strong>Campus updates</strong>
              <small>Always stay informed.</small>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <span>📚</span>
            <div>
              <strong>Study smarter</strong>
              <small>Find what you need.</small>
            </div>
          </div>

        </div>

      </section>

      <section className="intro-section">

        <div>
          <p className="section-label">WHY CAMPUSOS</p>
          <h2>
            Less searching.
            <br />
            More doing.
          </h2>
        </div>

        <p>
          Students shouldn't have to search through scattered
          groups, messages and notices just to find something
          important. CampusOS gives everything a single home.
        </p>

      </section>

      <section className="modules-section">

        <div className="section-heading">
          <div>
            <p className="section-label">CORE SERVICES</p>
            <h2>Built around student life.</h2>
          </div>

          <span className="section-count">
            04 MODULES
          </span>
        </div>

        <div className="module-grid">

          {modules.map((module) => (
            <article
              className="module-card"
              key={module.number}
            >
              <div className="module-number">
                {module.number}
              </div>

              <div className="module-icon">
                {module.icon}
              </div>

              <h3>{module.title}</h3>

              <p>{module.description}</p>

              <span className="module-arrow">
                Explore →
              </span>
            </article>
          ))}

        </div>

      </section>

      <section className="cta-section">

        <div>
          <p className="section-label">READY?</p>

          <h2>
            Make campus life
            <br />
            a little easier.
          </h2>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/register")}
        >
          Create your account
          <span>→</span>
        </button>

      </section>

      <footer className="site-footer">
        <strong>CampusOS</strong>
        <span>Your campus. One starting point.</span>
        <span>© 2026</span>
      </footer>

    </main>
  );
}

export default Home;