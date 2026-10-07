const API_URL = "http://localhost:5001/api";

export async function checkServer() {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Server request failed");
  }

  return response.json();
}