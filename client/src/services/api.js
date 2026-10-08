const API_URL =
  "https://campusos-backend-gml9.onrender.com/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  let data;

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}

/* =========================
   SERVER
========================= */

export async function checkServer() {
  return request("/health");
}

/* =========================
   AUTH
========================= */

export async function registerUser(payload) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getCurrentUser() {
  return request("/auth/me");
}

/* =========================
   RESOURCES
========================= */

export async function getResources() {
  return request("/resources");
}

export async function createResource(payload) {
  return request("/resources", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateResource(id, payload) {
  return request(`/resources/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteResource(id) {
  return request(`/resources/${id}`, {
    method: "DELETE",
  });
}

/* =========================
   LOST & FOUND
========================= */

export async function getLostFound() {
  return request("/lost-found");
}

export async function createLostFound(payload) {
  return request("/lost-found", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateLostFound(id, payload) {
  return request(`/lost-found/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteLostFound(id) {
  return request(`/lost-found/${id}`, {
    method: "DELETE",
  });
}

/* =========================
   NOTICES
========================= */

export async function getNotices() {
  return request("/notices");
}

export async function createNotice(payload) {
  return request("/notices", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateNotice(id, payload) {
  return request(`/notices/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteNotice(id) {
  return request(`/notices/${id}`, {
    method: "DELETE",
  });
}

/* =========================
   EVENTS
========================= */

export async function getEvents() {
  return request("/events");
}

export async function createEvent(payload) {
  return request("/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateEvent(id, payload) {
  return request(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteEvent(id) {
  return request(`/events/${id}`, {
    method: "DELETE",
  });
}

/* =========================
   API URL
========================= */

export { API_URL };