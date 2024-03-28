import { useState } from 'react';
import Layout from '../Layout';
import {
  Answer,
  newQuestions as questions,
} from '/Users/junk/Desktop/projects/frontend/react/react_Examix/src/temp/questions';
import QuizCard from '../components/QuizCard';
import Result from '../components/Result';

const QuizPage: React.FC = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  // state with saved answers to compare on server
  const [answers, setAnswers] = useState<Answer[]>([]);
  const progress = Math.round((questionIndex / questions.length) * 100);
  return (
    <Layout>
      {questionIndex < questions.length ? (
        <QuizCard
          nextQuestion={() => setQuestionIndex(questionIndex + 1)}
          setAnswers={setAnswers}
          question={questions[questionIndex]}
          progress={progress}
        />
      ) : (
        // this is the test fragment, it should be replaced with results page
        <Result answers={answers} />
      )}
    </Layout>
  );
};

export default QuizPage;
