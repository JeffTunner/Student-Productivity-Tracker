import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const genai = new GoogleGenAI({});

app.get("/", (_req, res) => {
  res.send("Backend is running suiii 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing message" });
    }

    const result = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,

      config: { thinkingConfig: { thinkingBudget: 0 } }
    });

    const reply = result.text ?? "I didn’t get a response.";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
