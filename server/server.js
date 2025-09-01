// 1. Import required packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const OpenAI = require("openai");

// 2. Load environment variables
dotenv.config();

// 3. Setup Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 4. Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // <-- API key stored in .env
});

// 5. Define an API endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // Or "gpt-4o"
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 6. Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
