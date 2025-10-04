import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function TopicSelect() {
    const loading  = false;
    const [topic, setTopic] = useState("");
    const navigate = useNavigate();

    const changeSubmitHandler = (e) => {
        if (!topic) return alert("Enter a topic");
        localStorage.setItem("quizTopic", topic);
        navigate("/loading");
    }

  return (
    <div>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={changeSubmitHandler} className='h-70 w-1/2 border border-gray-500 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Select Topic to Generate Quiz</h1>
                    <div className='my-10'>
                        <Label>Topic Name</Label>
                        <Input
                            className='mt-5'
                            type='text'
                            placeholder='Enter a topic name to generate quiz'
                            value = {topic}
                            onChange = {(e) => setTopic(e.target.value)}
                        />
                        <Button type='submit' className='w-full my-8'>Generate Quiz</Button>
                    </div>
                </form>
        </div>
    </div>
  )
}
