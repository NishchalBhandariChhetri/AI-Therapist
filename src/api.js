// Use environment variable for backend URL; fallback to Render URL if not set
const API_BASE_URL = "https://ai-therapist-backend-msta.onrender.com";

console.log("Using API URL:", API_BASE_URL);

/**
 * Sends a message to the AI Therapist backend and returns the response.
 * @param {string} message - The message to send to the AI.
 * @returns {Promise<Object>} - The response data from the backend.
 */
export async function sendMessage(message) {
  try {
    // Absolute URL ensures the request goes to Render, not GitHub Pages
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    // If server responds with an error status
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} ${errorText}`);
    }

    // Parse and return JSON response
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API call failed:", err);
    return { error: err.message || "Something went wrong" };
  }
}
