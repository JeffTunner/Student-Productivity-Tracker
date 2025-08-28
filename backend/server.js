import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { act } from "react";

const app = express();
app.use(cors());
app.use(express.json());

const genai = new GoogleGenAI({});

app.get("/", (_req, res) => {
  res.send("Backend is running suiii 🚀");
});

app.post("/chat", async (req, res) => {
    console.log("Incoming message:", req.body);
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing message" });
    }

    const result = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: message }]}],

      config: { thinkingConfig: { thinkingBudget: 0 } }
    });

    let reply = result?.candidates?.[0]?.content?.parts?.[0]?.text || "I didn’t get a response.";
    let action = {type: "none", value: null};

    const lower = message.toLowerCase();

    if (lower.includes("mood")) {
      const moodMatch = message.match(/\d+/);
      if (moodMatch) {
        action = { type: "update_mood", value: parseInt(moodMatch[0], 10) };
      }
    } else if (lower.includes("journal")) {
      const journalMatch = message.split("journal")[1]?.trim();
      if (journalMatch) {
        action = { type: "update_journal", value: journalMatch };
      }
    } else if (lower.includes("task") || lower.includes("todo")) {
      const taskMatch = message.split("task")[1]?.trim() || message.split("todo")[1]?.trim();
      if (taskMatch) {
        action = { type: "update_tasks", value: taskMatch };
      }
    }

    console.log("Resolved action:", action);
    res.json({ reply, action });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
