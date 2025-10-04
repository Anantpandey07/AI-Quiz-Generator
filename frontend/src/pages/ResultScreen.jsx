// screens/ResultScreen.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const API_END_POINT = "http://localhost:5000"

export default function ResultScreen() {
    const navigate = useNavigate();
  const quizData = JSON.parse(localStorage.getItem("quizData") || "[]");
  const answers = JSON.parse(localStorage.getItem("userAnswers") || "[]");

  const [feedback, setFeedback] = useState("");
  const score = quizData.reduce(
    (acc, q, i) => (answers[i] === q.answer ? acc + 1 : acc),
    0
  );

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await axios.post(`${API_END_POINT}/generateFeedback`, {score});
        setFeedback(response.data.feedback || "Great job!");
      } catch {
        setFeedback("Well done! Keep practicing.");
      }
    }
    fetchFeedback();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Quiz Completed!</h1>
      <p>
        You scored <span className="font-bold">{score}</span> out of{" "}
        {5}
      </p>
      <p className="text-center italic">{feedback}</p>
      <Button onClick = {() => {navigate('/')}}>Generate Quiz Again</Button>
    </div>
  );
}
