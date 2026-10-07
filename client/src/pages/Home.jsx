
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            <span>●</span> BUILT FOR CAMPUS LIFE
          </div>

          <h1>
            Your campus.
            <br />
            <span>One starting point.</span>
          </h1>

          <p className="hero-description">
            CampusOS brings academic resources, campus
            notices, lost & found, and events together
            in one simple platform.
          </p>

          <div className="hero-actions">

            <Link
              to="/register"
              className="hero-primary"
            >
              Get Started →
            </Link>

            <Link
              to="/login"
              className="hero-secondary"
            >
              Sign In
            </Link>

          </div>

        </div>

        <div className="hero-visual">

          <div className="floating-card card-one">
            <span>📚</span>
            <div>
              <strong>Resource Hub</strong>
              <small>Study smarter</small>
            </div>
          </div>

          <div className="floating-card card-two">
            <span>📢</span>
            <div>
              <strong>Campus Notice</strong>
              <small>Stay updated</small>
            </div>
          </div>

          <div className="hero-orb">
            <div className="orb-inner">
              C
            </div>
          </div>

          <div className="floating-card card-three">
            <span>🎉</span>
            <div>
              <strong>Events</strong>
              <small>Never miss out</small>
            </div>
          </div>

        </div>

      </section>

      <section className="home-features">

        <div className="home-section-heading">
          <p className="eyebrow">
            EVERYTHING CONNECTED
          </p>

          <h2>
            Campus life,
            <br />
            <span>without the chaos.</span>
          </h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <span className="feature-number">01</span>
            <div className="feature-icon">📚</div>
            <h3>Resource Hub</h3>
            <p>
              Find previous questions and study
              materials shared by your campus
              community.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-number">02</span>
            <div className="feature-icon">🔎</div>
            <h3>Lost & Found</h3>
            <p>
              Lost something? Found something?
              Connect with the right person faster.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-number">03</span>
            <div className="feature-icon">📢</div>
            <h3>Campus Notices</h3>
            <p>
              Keep track of class cancellations,
              bus issues and important announcements.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-number">04</span>
            <div className="feature-icon">🎉</div>
            <h3>Campus Events</h3>
            <p>
              Discover events and activities
              happening around your campus.
            </p>
          </div>

        </div>

      </section>

      <section className="home-cta">

        <p className="eyebrow">
          START HERE
        </p>

        <h2>
          Everything your campus needs.
          <br />
          <span>In one place.</span>
        </h2>

        <Link
          to="/register"
          className="hero-primary"
        >
          Join CampusOS →
        </Link>

      </section>

      <footer className="home-footer">
        <strong>CampusOS.</strong>
        <span>Your campus. One starting point.</span>
      </footer>

    </main>
  );
}

export default Home;

