import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, 'server', '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
  try {
    // List models might not be available in standard SDK easily but let's try a simple health check
    console.log("Checking API access...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // try older model name
    const result = await model.generateContent("Hi");
    const response = await result.response;
    console.log("SUCCESS with gemini-pro:", response.text());
  } catch (err) {
    console.error("DIAGNOSTIC ERROR (gemini-pro):", err.message);
    try {
        console.log("Trying gemini-1.5-flash-latest...");
        const model2 = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result2 = await model2.generateContent("Hi");
        const response2 = await result2.response;
        console.log("SUCCESS with gemini-1.5-flash-latest:", response2.text());
    } catch (err2) {
        console.error("DIAGNOSTIC ERROR (gemini-1.5-flash-latest):", err2.message);
    }
  }
}
test();
