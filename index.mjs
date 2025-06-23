// index.mjs
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

// Pour obtenir __dirname avec ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chargement du fichier .env
dotenv.config();
console.log('Clé API détectée :', process.env.OPENAI_API_KEY ? '✅ OK' : '❌ Manquante');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Sert les fichiers du dossier public (index.html, css, js)
app.use(express.static(path.join(__dirname, 'public')));

// Initialise OpenAI proprement
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Route principale API
app.use(express.json());

app.post('/api/ask', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ response: "Prompt manquant." });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    const response = completion.choices[0].message.content;
    res.json({ response });
  } catch (error) {
    console.error("Erreur OpenAI :", error);
    res.status(500).json({ response: "Erreur serveur OpenAI." });
  }
});


app.listen(PORT, () => {
  console.log('✅ Serveur en écoute sur http://localhost:3001');
});
