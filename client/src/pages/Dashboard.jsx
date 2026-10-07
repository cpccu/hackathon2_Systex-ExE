import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getNotices,
  getEvents,
  getResources,
  getLostFound,
} from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [lostFound, setLostFound] = useState([]);

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          noticeData,
          eventData,
          resourceData,
          lostFoundData,
        ] = await Promise.all([
          getNotices(),
          getEvents(),
          getResources(),
          getLostFound(),
        ]);

        if (noticeData.success) {
          setNotices(noticeData.notices || []);
        }

        if (eventData.success) {
          setEvents(eventData.events || []);
        }

        if (resourceData.success) {
          setResources(
            resourceData.resources ||
            resourceData.items ||
            []
          );
        }

        if (lostFoundData.success) {
          setLostFound(
            lostFoundData.lostFound ||
            lostFoundData.items ||
            lostFoundData.posts ||
            []
          );
        }

      } catch (error) {
        console.error(
          "Dashboard loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  const modules = [
    {
      icon: "📚",
      title: "Resource Hub",
      description:
        "Previous questions and study materials.",
      path: "/resources",
    },
    {
      icon: "🔎",
      title: "Lost & Found",
      description:
        "Report or find lost campus items.",
      path: "/lost-found",
    },
    {
      icon: "📢",
      title: "Campus Notices",
      description:
        "Important campus announcements.",
      path: "/notices",
    },
    {
      icon: "🎉",
      title: "Events",
      description:
        "Discover what's happening on campus.",
      path: "/events",
    },
  ];

  return (
    <main className="dashboard-page">

      <header className="dashboard-topbar">

        <button
          className="dashboard-brand"
          onClick={() => navigate("/dashboard")}
        >
          <span className="brand-dot" />
          CampusOS
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>

      <section className="dashboard-hero">

        <div>

          <p className="eyebrow">
            CAMPUSOS · YOUR DASHBOARD
          </p>

          <h1>
            Welcome back,
            <br />
            <span>{user?.name || "Student"}.</span>
          </h1>

          <p>
            Everything you need for your campus life,
            all in one place.
          </p>

        </div>

        <div className="dashboard-status">
          <span className="status-dot" />
          CampusOS is ready
        </div>

      </section>

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              QUICK ACCESS
            </p>

            <h2>What do you need?</h2>
          </div>

        </div>

        <div className="dashboard-grid">

          {modules.map((module) => (
            <button
              className="dashboard-card"
              key={module.title}
              onClick={() => navigate(module.path)}
            >
              <span className="card-icon">
                {module.icon}
              </span>

              <span className="card-content">
                <strong>{module.title}</strong>
                <small>{module.description}</small>
              </span>

              <span className="card-arrow">
                →
              </span>
            </button>
          ))}

        </div>

      </section>

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              CAMPUS UPDATES
            </p>

            <h2>Latest notices.</h2>
          </div>

          <button
            className="text-link"
            onClick={() => navigate("/notices")}
          >
            View all →
          </button>

        </div>

        {loading ? (
          <div className="loading-box">
            Loading campus updates...
          </div>
        ) : notices.length === 0 ? (
          <div className="empty-state">
            No notices available right now.
          </div>
        ) : (
          <div className="content-grid">

            {notices.slice(0, 3).map((notice) => (
              <article
                className="content-card"
                key={notice._id}
              >

                <div className="content-card-top">
                  <span className="tag">
                    {notice.category}
                  </span>

                  {notice.date && (
                    <span>
                      {notice.date}
                    </span>
                  )}
                </div>

                <h3>{notice.title}</h3>

                <p>
                  {notice.description}
                </p>

                <small>
                  Posted by{" "}
                  {notice.postedBy?.name || "CampusOS"}
                </small>

              </article>
            ))}

          </div>
        )}

      </section>

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              CAMPUS LIFE
            </p>

            <h2>Upcoming events.</h2>
          </div>

          <button
            className="text-link"
            onClick={() => navigate("/events")}
          >
            View all →
          </button>

        </div>

        {loading ? (
          <div className="loading-box">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            No upcoming events right now.
          </div>
        ) : (
          <div className="content-grid">

            {events.slice(0, 3).map((event) => (
              <article
                className="content-card event-card"
                key={event._id}
              >

                <div className="event-date-box">
                  <span>EVENT</span>
                  <strong>{event.date}</strong>
                </div>

                <h3>{event.title}</h3>

                <p>
                  {event.description}
                </p>

                <small>
                  📍 {event.location}
                  {" · "}
                  🕐 {event.time}
                </small>

              </article>
            ))}

          </div>
        )}

      </section>

      <section className="dashboard-stats">

        <div>
          <strong>{resources.length}</strong>
          <span>Resources</span>
        </div>

        <div>
          <strong>{notices.length}</strong>
          <span>Notices</span>
        </div>

        <div>
          <strong>{events.length}</strong>
          <span>Events</span>
        </div>

        <div>
          <strong>{lostFound.length}</strong>
          <span>Lost & Found</span>
        </div>

      </section>

      <section className="dashboard-overview">

        <div>
          <p className="section-label">
            THE CAMPUSOS IDEA
          </p>

          <h2>
            One campus.
            <br />
            One starting point.
          </h2>
        </div>

        <p>
          CampusOS connects the everyday things students
          need — from academic resources to campus updates
          and community services — without the scattered
          searching.
        </p>

      </section>

      <footer className="dashboard-footer">
        <strong>CampusOS</strong>
        <span>Your campus. One starting point.</span>
      </footer>

    </main>
  );
}

export default Dashboard;