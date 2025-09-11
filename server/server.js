import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage || userMessage.trim() === "") {
      return res.status(400).json({ reply: "Please enter a message." });
    }

    console.log("📩 Received message:", userMessage);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: userMessage }),
      }
    );

    if (!response.ok) {
      // Capture and log Hugging Face API errors
      const text = await response.text();
      console.error(`❌ HF API Error [${response.status}]:`, text);
      return res
        .status(response.status)
        .json({ reply: `API error (${response.status}): ${text}` });
    }

    const data = await response.json();
    console.log("✅ HF API Response:", data);

    // Hugging Face sometimes returns arrays, sometimes objects, depending on the model
    const botReply =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : data.generated_text || "Sorry, I could not generate a response.";

    res.json({ reply: botReply });
  } catch (error) {
    console.error("🔥 Server error:", error);
    res.status(500).json({
      reply: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
