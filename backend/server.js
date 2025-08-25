const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {OpenAI} = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

app.post("/chat", async (req, res) => {
    try {
        const {message} = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", 
            messages: [{ role: "user", content: message }],
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (e) {
        console.log(e);
        res.status(500).json({error: "Something went wrong!"});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
