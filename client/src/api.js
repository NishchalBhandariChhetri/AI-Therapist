export async function sendMessage(message) {
  try {
    const response = await fetch("http://localhost:5001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API call failed:", err);
    return { error: err.message || "Something went wrong" };
  }
}
