import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { summarizeText } from './llm.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main summarization endpoint
app.post('/api/summarize', async (req, res) => {
  const { text } = req.body;

  // Basic validation
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Please enter some text.' });
  }

  try {
    const response = await summarizeText(text.trim());
    res.json(response);
  } catch (error) {
    console.error('Error on summarize:', error.message);
    res.status(500).json({ 
      error: 'An error occurred while processing.',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

