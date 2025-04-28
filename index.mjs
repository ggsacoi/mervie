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
  apiKey: process.env.OPENAI_API_KEY});

// Route principale API
app.post('/api/ask', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: '❗ Aucun prompt fourni.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ response: completion.choices[0].message.content });

  } catch (err) {
    console.error('❌ Erreur OpenAI:', JSON.stringify(err, null, 2));
    if (err.response) {
      res.status(err.response.status).json({ error: err.response.data });
    } else {
      res.status(500).json({ error: 'Erreur interne serveur' });
    }
  }
});


app.listen(PORT, () => {
  console.log('✅ Serveur en écoute sur http://localhost:3001');
});
