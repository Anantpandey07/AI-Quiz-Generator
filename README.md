**AI Quiz Generator**

An interactive quiz application powered by Gemini AI.

Users can enter a topic, and the system generates 5 multiple-choice questions (MCQs) with navigation, scoring, and AI-powered feedback.

**Features** :-

-> Topic Selection → Enter any quiz topic.

-> AI-Powered Quiz Generation → Gemini API generates 5 MCQs in JSON format.

-> Loading Screen → Animated loader while fetching quiz.

-> Quiz Navigation → Next/Previous navigation, progress bar, and answer selection.

-> Result & Feedback → AI evaluates your score and gives motivational feedback.

**Tech Stack** :-

-> Frontend: React (Vite) + shadcn UI + TailwindCSS

-> Backend: Node.js + Express

-> AI Model: Google Gemini API (gemini-2.5-flash)

-> State Handling: LocalStorage (can be swapped with Redux Toolkit + redux-persist)

**Setup Instructions** :-
1️. Clone the repo

2. Install dependencies
   -> npm install
   
4. Run Backend
   -> npm run dev
   
6. Run Frontend
   -> npm run dev
   
8. App runs on http://localhost:5173


**API Usage** :-

Endpoint: /generateQuiz

Method: POST

Body: 
{
   "topic": "Technology Trends"
}

Response:
{
  "questions": [
    {
      "question": "Which technology is the foundation of blockchain?",
      "options": ["AI", "Distributed Ledger", "Quantum Computing", "IoT"],
      "answer": "Distributed Ledger"
    },
    {
      "question": "What does 5G primarily improve?",
      "options": ["Battery life", "Network speed", "Camera resolution", "Cloud storage"],
      "answer": "Network speed"
    },
    ...
  ]
}

Endpoint: /generateFeedback

Method: POST

Body:
{
   "score" : "3"
}

Response: 
{
    "feedback" : "Great job scoring 3 out of 5! That's a solid effort. Keep up the great work and you'll master it in no time!"
}

**Prompts** :-

Backend sends this prompt to generate quiz:

" Generate 5 unique quiz questions with 4 multiple choice answers on ${topic} topic. Also provide answer separately. The response should be in the following json format: 
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
Do not include any text, introductory phrases, or markdown formatting like \`\`\`json before or after the JSON object."

For Generating Feedback:-

"A user just completed a quiz. They scored ${score} out of 5. 
    Write a short, encouraging, and personalized feedback message for the user based on their score. 
    If the score is low, be encouraging. If the score is high, be congratulatory.
    The response must be only in the following JSON format, with no extra text or markdown:
    {
        "feedback": "Your generated feedback message here."
    }
  Do not include any text, introductory phrases, or markdown formatting like \`\`\`json before or after the JSON object."

**Screenshots**: 

<img width="1919" height="949" alt="image" src="https://github.com/user-attachments/assets/3ac1180d-1108-47dd-9cdd-85595008dda9" />
<img width="1584" height="682" alt="image" src="https://github.com/user-attachments/assets/eb932af1-7f94-4e7b-97b7-0135c5cb2ccb" />
<img width="1580" height="683" alt="image" src="https://github.com/user-attachments/assets/fe46a0b9-7d83-4264-83a3-3351dc94a6c6" />
<img width="1576" height="681" alt="image" src="https://github.com/user-attachments/assets/525dbe33-2ff4-4d9b-9db3-3e0fb1dd3201" />

**Future Improvements**

-> Add user login & quiz history

-> Leaderboard & analytics

-> Dark mode

-> Replace LocalStorage with Redux Toolkit

**Contributors**
  Anant Pandey

