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

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

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

/* =========================================
   HEALTH
========================================= */

export async function checkServer() {
  return request("/health");
}


/* =========================================
   AUTH
========================================= */

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


/* =========================================
   RESOURCES
========================================= */

export async function getResources() {
  return request("/resources");
}

export async function createResource(payload) {
  return request("/resources", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


/* =========================================
   NOTICES
========================================= */

export async function getNotices() {
  return request("/notices");
}

export async function createNotice(payload) {
  return request("/notices", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


/* =========================================
   EVENTS
========================================= */

export async function getEvents() {
  return request("/events");
}

export async function createEvent(payload) {
  return request("/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


/* =========================================
   LOST & FOUND
========================================= */

export async function getLostFound() {
  return request("/lost-found");
}

export async function createLostFound(payload) {
  return request("/lost-found", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


/* =========================================
   API URL
========================================= */

export { API_URL };