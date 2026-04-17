import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { OpenRouter } from "@openrouter/sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

// memoria de chats
let chats = {};

app.post("/chat", async (req, res) => {

  const { message, chatId } = req.body;

  if (!chats[chatId]) {
    chats[chatId] = [
      {
        role: "system",
        content: "Eres un asistente útil y claro."
      }
    ];
  }

  chats[chatId].push({
    role: "user",
    content: message
  });

  try {

    const stream = await openrouter.chat.send({
      chatRequest: {
        model: "openrouter/free",
        messages: chats[chatId],
        stream: true
      }
    });

    res.setHeader("Content-Type", "text/plain");

    let aiResponse = "";

    for await (const chunk of stream) {

      const content = chunk.choices?.[0]?.delta?.content;

      if (content) {
        aiResponse += content;
        res.write(content);
      }

    }

    chats[chatId].push({
      role: "assistant",
      content: aiResponse
    });

    res.end();

  } catch (error) {

    console.error(error);
    res.status(500).send("Error con OpenRouter");

  }

});



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// carpeta build de Vite
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});