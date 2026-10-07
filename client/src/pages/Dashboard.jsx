import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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
        "Previous questions, study materials and academic resources.",
      path: "/resources",
    },
    {
      icon: "🔎",
      title: "Lost & Found",
      description:
        "Report lost items or help others find what they lost.",
      path: "/lost-found",
    },
    {
      icon: "📢",
      title: "Campus Notices",
      description:
        "Class cancellations, bus issues and important announcements.",
      path: "/notices",
    },
    {
      icon: "🎉",
      title: "Events",
      description:
        "Discover upcoming campus events and activities.",
      path: "/events",
    },
  ];

  return (
    <main className="dashboard-page">

      {/* HEADER */}

      <section className="dashboard-header">

        <div>
          <p className="eyebrow">
            CAMPUSOS · SINGLE STARTING POINT
          </p>

          <h1>
            Welcome back,
            <br />
            <span>{user?.name || "Student"}</span> 👋
          </h1>

          <p className="dashboard-subtitle">
            Everything you need for your campus life,
            all in one place.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>

      </section>


      {/* QUICK ACCESS */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              QUICK ACCESS
            </p>

            <h2>
              What do you need?
            </h2>
          </div>

        </div>


        <div className="dashboard-grid">

          {modules.map((module) => (
            <div
              key={module.title}
              className="dashboard-card"
              onClick={() => navigate(module.path)}
            >

              <div className="card-icon">
                {module.icon}
              </div>

              <h3>
                {module.title}
              </h3>

              <p>
                {module.description}
              </p>

              <span className="card-arrow">
                Explore →
              </span>

            </div>
          ))}

        </div>

      </section>


      {/* CAMPUS OVERVIEW */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              CAMPUS OVERVIEW
            </p>

            <h2>
              Stay connected.
            </h2>
          </div>

        </div>


        <div className="overview-grid">

          <div className="overview-card">

            <span className="overview-number">
              01
            </span>

            <h3>
              Academic
            </h3>

            <p>
              Find previous questions and useful
              study resources.
            </p>

          </div>


          <div className="overview-card">

            <span className="overview-number">
              02
            </span>

            <h3>
              Campus Life
            </h3>

            <p>
              Keep track of events, notices and
              important campus updates.
            </p>

          </div>


          <div className="overview-card">

            <span className="overview-number">
              03
            </span>

            <h3>
              Community
            </h3>

            <p>
              Help your campus community through
              Lost & Found.
            </p>

          </div>

        </div>

      </section>


      {/* FOOTER MESSAGE */}

      <section className="dashboard-footer">

        <p>
          CampusOS
        </p>

        <span>
          Your campus. One starting point.
        </span>

      </section>

    </main>
  );
}

export default Dashboard;