# Summarizer App — AI Intern Task

This is my project for the AI Developer Intern shortlisting task. It’s a full-stack tool that takes messy text and uses an AI model to turn it into a clean summary with key points and a sentiment label.

I used **React** for the frontend and **Node.js** for the backend to keep things organized.

## How to run the project

You'll need two terminals open for this (one for the backend and one for the frontend).

### 1. Simple Setup
- Open a terminal in the `/server` folder.
- Run `npm install`.
- Open another terminal in the `/client` folder.
- Run `npm install`.

### 2. Configure API Key
- In the `/server` folder, copy `.env.example` into a new file named `.env`.
- Paste your **Gemini API Key** into the `.env` file. (You can get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey)).

### 3. Start the project
- **In the server terminal**: Run `npm start`. (Server runs on port 5000).
- **In the client terminal**: Run `npm run dev`. (Frontend runs on port 5173/5174).
- Visit the Local URL shown in your client terminal to see the app!


---

## My Decisions & Trade-offs

### Why I chose the Gemini API
I went with the Google Gemini API (Gemini 1.5 Flash specifically) because the setup was much faster for me than setting up an OpenAI account. Plus, it has a really generous free tier which is perfect for an assignment like this.

### Prompt Strategy
I spent a good chunk of time on the prompt. My main goal was to make sure the AI only gave back JSON. I found that if I wasn't strict about it, the AI would sometimes add extra words or markdown blocks, which broke the `JSON.parse` in my code.

I explicitly told it things like:
- "Only return the JSON"
- "No markdown formatting"
- "Sentiment must be one of these three labels"

This helped make the output consistent every time I tested it.

### Design Choices
I decided to handle the API calls on the backend. Even though it would have been easier to just call it from the frontend, I know it's safer to keep API keys hidden on a server.

I also kept the UI very simple. Instead of a fancy landing page, I focused on making the input box easy to use and making the summary cards look clean with basic CSS.

---

## Example Output

I tested it with some text about the remote work debate. Here's what it looks like:

**Summary:** The debate over remote work continues as companies weigh productivity and work-life balance against concerns like company culture and proximity bias.
**Key Points:**
1. Employees value remote work for flexibility and productivity, while companies worry about office culture.
2. Statistics show that companies with flexible models have better employee retention.
3. Proximity bias is a potential downside where onsite workers might get ahead of remote peers.
**Sentiment:** Neutral (Balanced discussion of both views).

---

## What I'd add with more time
If I had another few hours, I'd probably:
1. Add a way to upload text files directly instead of just pasting text.
2. Use a library like `framer-motion` to make the results slide in nicely.
3. Add a "Copy to Clipboard" button for the summary.
4. Try out more advanced error messages for when the API limit is hit.
