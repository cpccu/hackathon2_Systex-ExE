const API_URL = "http://localhost:5001/api";

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

export async function checkServer() {
  return request("/health");
}

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

export async function getResources() {
  return request("/resources");
}

export async function createResource(payload) {
  return request("/resources", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getNotices() {
  return request("/notices");
}

export async function createNotice(payload) {
  return request("/notices", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getEvents() {
  return request("/events");
}

export async function createEvent(payload) {
  return request("/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getLostFound() {
  return request("/lost-found");
}

export async function createLostFound(payload) {
  return request("/lost-found", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export { API_URL };