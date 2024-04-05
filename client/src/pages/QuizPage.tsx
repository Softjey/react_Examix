/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import Layout from '../components/Layout';
import { Answer, newQuestions as questions } from '../temp/questions';
import QuizCard from '../components/QuizCard';
import Result from '../components/Result';
import MainButton from '../components/UI/buttons/MainButton';

const QuizPage: React.FC = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  // state with saved answers to compare on server
  const [answers, setAnswers] = useState<Answer[]>([]);
  /*
  ToDo:
    fix problem with quizProgress start value:
    when quiz starts and its first question, progress must be zero, but its 5
  */
  // console.log('quizProgress', quizProgress);
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
          questionIndex={questionIndex}
          questionsLength={questions.length}
        />
      ) : (
        // this is the test fragment, it should be replaced with results page
        <Result answers={answers} />
      )}
    </Layout>
  );
};

export default QuizPage;
