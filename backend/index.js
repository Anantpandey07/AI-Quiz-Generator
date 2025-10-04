import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.PORT || 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


app.post("/generateQuiz", async (req, res) => {
    const { topic } = req.body;
    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate 5 unique quiz questions with 4 multiple choice answers on ${topic} topic. Also provide answer separately. The response should be in the following json format: 
    {"questions": [
        {
        "id": 0,
        "question": "",
        "options": [],
        "answer": ""
        },
        ...
        ]
    }
        Example format:
      {
        "questions": [
          {
            "id": 0,
            "question": "What is the powerhouse of the cell?",
            "options": ["Nucleus", "Ribosome", "Mitochondrion", "Golgi apparatus"],
            "answer": "Mitochondrion"
          },
            ]
          }
        Do not include any text, introductory phrases, or markdown formatting like \`\`\`json before or after the JSON object.`

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Error handling and parsing
        const parsedJson = JSON.parse(text);
        res.json(parsedJson);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to generate quiz after multiple attempts.' });
    }
    
})
app.post('/generateFeedback', async (req, res) => {
    const { score } = req.body;

    if (score === undefined) {
        return res.status(400).json({ error: 'Score are required.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `A user just completed a quiz. They scored ${score} out of 5. 
    Write a short, encouraging, and personalized feedback message for the user based on their score. 
    If the score is low, be encouraging. If the score is high, be congratulatory.
    The response must be only in the following JSON format, with no extra text or markdown:
    {
        "feedback": "Your generated feedback message here."
    }
    Do not include any text, introductory phrases, or markdown formatting like \`\`\`json before or after the JSON object.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // console.log(text);
        const parsedJson = JSON.parse(text);
        res.json(parsedJson);
    } catch (error) {
        console.error('Error during feedback generation:', error);
        res.status(500).json({ error: 'Failed to generate feedback.' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is runing at port ${PORT}`);
})