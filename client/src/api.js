export async function sendMessage(message) {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching from backend:", error);
      return { reply: "Error: Could not connect to server." };
    }
  }
  