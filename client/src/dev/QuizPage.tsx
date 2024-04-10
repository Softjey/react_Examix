import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress } from '@mui/material';
import StartLayout from '../components/StartLayout';
import QuizCard from './QuizCard';
import Timer from '../components/UI/Timer';
import questions, { Question } from './questions';

const QuizPage: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const currIndex = useRef(0);
  // server request emulation
  useEffect(() => {
    setTimeout(() => {
      setQuestion(questions[currIndex.current]);
    }, 2000);
  }, []);

  return (
    <StartLayout>
      {question !== null ? (
        <>
          <Timer
            question={question}
            onEnd={() => {
              setQuestion(questions[currIndex.current + 1]);
              currIndex.current += 1;
              /* console.log(question);
              console.log('done'); */
            }}
          />
          <QuizCard question={question} sendAnswer={() => {}} />
        </>
      ) : (
        <div css={{ width: '120px', height: '120px', display: 'flex' }}>
          <CircularProgress />
        </div>
      )}
    </StartLayout>
  );
};

export default QuizPage;
