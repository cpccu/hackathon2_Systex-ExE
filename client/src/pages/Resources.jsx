import { useEffect, useState } from "react";

function Resources() {
  const [activeTab, setActiveTab] = useState("questions");

  const [resources, setResources] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showUploadForm, setShowUploadForm] =
    useState(false);

  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    course: "",
    semester: "",
    type: "Previous Question",
    description: "",
    fileUrl: "",
  });

  // =========================================
  // LOAD RESOURCES
  // =========================================

  async function loadResources() {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5001/api/resources"
      );

      const data = await response.json();

      if (data.success) {
        setResources(data.resources);
      }
    } catch (error) {
      console.error("Failed to load resources:", error);
      setMessage("Failed to load resources.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadResources();
  }, []);

  // =========================================
  // FORM INPUT
  // =========================================

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // =========================================
  // UPLOAD RESOURCE
  // =========================================

  async function handleSubmit(event) {
    event.preventDefault();

    setUploading(true);
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      setUploading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/api/resources",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Failed to upload resource."
        );

        setUploading(false);
        return;
      }

      setMessage("Resource uploaded successfully! 🎉");

      setFormData({
        title: "",
        course: "",
        semester: "",
        type: "Previous Question",
        description: "",
        fileUrl: "",
      });

      setShowUploadForm(false);

      await loadResources();
    } catch (error) {
      console.error("Upload error:", error);

      setMessage(
        "Something went wrong while uploading."
      );
    } finally {
      setUploading(false);
    }
  }

  // =========================================
  // FILTER RESOURCES
  // =========================================

  const filteredResources =
    activeTab === "questions"
      ? resources.filter(
          (resource) =>
            resource.type === "Previous Question"
        )
      : resources.filter(
          (resource) =>
            resource.type === "Study Material"
        );

  return (
    <main className="resource-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="resource-header">

        <p className="eyebrow">
          CAMPUSOS · RESOURCE HUB
        </p>

        <h1>
          Your academic
          <br />
          <span>resource library.</span>
        </h1>

        <p className="resource-subtitle">
          Find previous questions, study materials
          and useful academic resources in one place.
        </p>

      </section>


      {/* =====================================
          CONTROLS
      ===================================== */}

      <section className="resource-controls">

        <div className="resource-tabs">

          <button
            className={
              activeTab === "questions"
                ? "resource-tab active"
                : "resource-tab"
            }
            onClick={() => setActiveTab("questions")}
          >
            📄 Previous Questions
          </button>

          <button
            className={
              activeTab === "materials"
                ? "resource-tab active"
                : "resource-tab"
            }
            onClick={() => setActiveTab("materials")}
          >
            📚 Study Materials
          </button>

        </div>

        <button
          className="upload-btn"
          onClick={() =>
            setShowUploadForm(!showUploadForm)
          }
        >
          {showUploadForm
            ? "✕ Close"
            : "+ Upload Resource"}
        </button>

      </section>


      {/* =====================================
          MESSAGE
      ===================================== */}

      {message && (
        <div className="resource-message">
          {message}
        </div>
      )}


      {/* =====================================
          UPLOAD FORM
      ===================================== */}

      {showUploadForm && (
        <section className="upload-form-section">

          <div className="upload-form-header">

            <p className="section-label">
              ADD RESOURCE
            </p>

            <h2>
              Upload a campus resource
            </h2>

            <p>
              Add useful academic material for
              other students.
            </p>

          </div>


          <form
            className="resource-form"
            onSubmit={handleSubmit}
          >

            {/* TITLE */}

            <div className="form-group">

              <label>
                Resource Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="Example: CSE 2115 Midterm Question"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* COURSE */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Course
                </label>

                <input
                  type="text"
                  name="course"
                  placeholder="Example: CSE 2115"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* SEMESTER */}

              <div className="form-group">

                <label>
                  Semester
                </label>

                <input
                  type="text"
                  name="semester"
                  placeholder="Example: Spring 2026"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* TYPE */}

            <div className="form-group">

              <label>
                Resource Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >

                <option value="Previous Question">
                  Previous Question
                </option>

                <option value="Study Material">
                  Study Material
                </option>

              </select>

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Briefly describe this resource..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />

            </div>


            {/* FILE URL */}

            <div className="form-group">

              <label>
                File URL
              </label>

              <input
                type="url"
                name="fileUrl"
                placeholder="Optional: https://..."
                value={formData.fileUrl}
                onChange={handleChange}
              />

              <small>
                Actual file upload will be added later.
              </small>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="submit-resource-btn"
              disabled={uploading}
            >
              {uploading
                ? "Uploading..."
                : "Upload Resource →"}
            </button>

          </form>

        </section>
      )}


      {/* =====================================
          RESOURCE LIST
      ===================================== */}

      <section className="resource-list">

        {loading ? (
          <div className="resource-empty">
            <p>
              Loading resources...
            </p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="resource-empty">

            <div className="empty-icon">
              {activeTab === "questions"
                ? "📄"
                : "📚"}
            </div>

            <h3>
              No resources yet
            </h3>

            <p>
              Be the first student to upload
              something useful.
            </p>

          </div>
        ) : (
          filteredResources.map((resource) => (

            <div
              className="resource-card"
              key={resource._id}
            >

              <div className="resource-icon">
                {resource.type ===
                "Previous Question"
                  ? "📄"
                  : "📚"}
              </div>


              <div className="resource-info">

                <span className="resource-type">
                  {resource.type}
                </span>

                <h3>
                  {resource.title}
                </h3>

                <p>
                  {resource.course} ·{" "}
                  {resource.semester}
                </p>

                {resource.description && (
                  <p className="resource-description">
                    {resource.description}
                  </p>
                )}

                {resource.uploadedBy && (
                  <span className="resource-uploader">
                    Uploaded by{" "}
                    {resource.uploadedBy.name}
                  </span>
                )}

              </div>


              {resource.fileUrl ? (
                <a
                  href={resource.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="view-btn"
                >
                  View →
                </a>
              ) : (
                <span className="view-btn disabled">
                  No File
                </span>
              )}

            </div>

          ))
        )}

      </section>

    </main>
  );
}

export default Resources;