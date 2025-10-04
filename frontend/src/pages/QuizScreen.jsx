// screens/QuizScreen.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizScreen() {
  const navigate = useNavigate();
  const quizData = JSON.parse(localStorage.getItem("quizData") || "[]");

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));

  const handleOption = (option) => {
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    localStorage.setItem("userAnswers", JSON.stringify(answers));
    navigate("/result");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Question {current + 1} of {quizData.length}
      </h2>
      <p className="mb-4">{quizData[current].question}</p>
      <div className="flex flex-col gap-2">
        {quizData[current].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleOption(opt)}
            className={`border px-4 py-2 rounded ${
              answers[current] === opt ? "bg-blue-200" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        {current === quizData.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrent(current + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        )}
      </div>

      <div className="w-full bg-gray-200 h-2 mt-6 rounded">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{ width: `${((current + 1) / quizData.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
