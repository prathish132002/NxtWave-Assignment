import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarizeText = async (text) => {
  if (!process.env.GEMINI_API_KEY) {
    console.error('SERVER ERROR: GEMINI_API_KEY is missing from environment.');
    throw new Error('No API Key found in .env');
  }
  
  console.log('Using API key (prefix):', process.env.GEMINI_API_KEY.substring(0, 10) + '...');

  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  // Prompt that asks for a specific JSON format
  const prompt = `
    You are an AI assistant. Convert this text into a JSON object.
    Required format:
    {
      "summary": "exactly one sentence summarizing the text",
      "keyPoints": ["point 1", "point 2", "point 3"],
      "sentiment": "positive, neutral, or negative"
    }

    Rules:
    - 3 key points maximum.
    - No markdown formatting.
    - Only return the JSON.

    Text: ${text}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonStr = response.text();
    console.log('AI response received successfully.');
    
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error('FULL ERROR with Gemini API:', err);
    throw new Error('Could not get summary from AI: ' + err.message);
  }
};

