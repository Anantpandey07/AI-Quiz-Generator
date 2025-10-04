import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API_END_POINT = "http://localhost:5000";


export default function Loading() {
    const navigate = useNavigate();
    useEffect (() => {
        const topic = localStorage.getItem("quizTopic");
        console.log(topic);
        const fetchQuiz = async () => {
            try {
                const response = await axios.post(`${API_END_POINT}/generateQuiz`, {topic});
                console.log(response.data);
                localStorage.setItem("quizData", JSON.stringify(response.data.questions));
                navigate("/quiz");
            } catch (error) {
                console.log(error);
                alert("Failed to fetch, Please retry");
                navigate("/");
            }
        }

        fetchQuiz();
    }, []);
  return (
     <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black"></div>
    </div>
  )
}
