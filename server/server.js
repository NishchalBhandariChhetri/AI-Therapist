const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env") });

console.log("OPENAI_API_KEY loaded:", process.env.OPENAI_API_KEY ? "Yes" : "No");


const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// 3. Setup Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// 5. Define an API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 6. Start server
const PORT = process.env.PORT || 5001; 

app.get("/", (req, res) => {
  res.send("✅ Backend is alive");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

