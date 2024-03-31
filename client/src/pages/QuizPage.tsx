/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import Layout from '../Layout';
import { Answer, newQuestions as questions } from '../temp/questions';
import QuizCard from '../components/QuizCard';
import Result from '../components/Result';
import MainButton from '../components/UI/buttons/MainButton';

const QuizPage: React.FC = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  // state with saved answers to compare on server
  const [answers, setAnswers] = useState<Answer[]>([]);
  const quizProgress = Math.round((questionIndex / questions.length) * 100);
  const [isStarted, setIsStarted] = useState(false);

  return (
    <Layout>
      {!isStarted ? (
        <MainButton variant="contained" onClick={() => setIsStarted(true)}>
          Start
        </MainButton>
      ) : questionIndex < questions.length ? (
        <QuizCard
          nextQuestion={() => setQuestionIndex(questionIndex + 1)}
          setAnswers={setAnswers}
          question={questions[questionIndex]}
          quizProgress={quizProgress}
        />
      ) : (
        // this is the test fragment, it should be replaced with results page
        <Result answers={answers} />
      )}
    </Layout>
  );
};

export default QuizPage;
