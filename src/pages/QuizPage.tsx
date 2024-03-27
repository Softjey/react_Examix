import { useState } from 'react';
import Layout from '../Layout';
import { Answer, newQuestions as questions } from '../temp/questions';
import QuizCard from '../components/QuizCard';
import Result from '../components/Result';

const QuizPage: React.FC = () => {
  const [step, setStep] = useState(0);
  // state with saved answers to compare on server
  // eslint-disable-next-line operator-linebreak
  const [answers, setAnswers]: [Answer[], React.Dispatch<React.SetStateAction<Answer[]>>] =
    useState([{}]);
  // очень трудно обьяснить на английском, поэтому в кратце проблема такая:
  // у меня не получается типизировать стейт что бы передать его как пропсы в QuizCard
  // вернее у меня получилось вроде как,
  // но проблема в том что мне нужно передать начальное значение пустой обьект
  // и изза этого в списке ответов лишний пустой обьект в начале
  const progress = Math.round((step / questions.length) * 100);
  return (
    <Layout>
      {step < questions.length ? (
        <QuizCard
          nextQuestion={() => setStep(step + 1)}
          setAnswers={setAnswers}
          question={questions[step]}
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
