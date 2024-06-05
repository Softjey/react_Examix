import { observer } from 'mobx-react-lite';
import React from 'react';
import studentExamStore from '../../store/ExamStore/StudentExamStore';
import QuizLayout from '../../components/layouts/QuizLayout';
import ExamQuestionCard from '../../components/items/ExamQuestionCard';
import LoadingPage from '../LoadingPage';

interface Props {}

const ExamProcessPage: React.FC<Props> = observer(() => {
  const { currentQuestion, test } = studentExamStore;

  if (!currentQuestion || !test) {
    return <LoadingPage layout="start" />;
  }

  return (
    <QuizLayout>
      <ExamQuestionCard onAnswer={() => {}} question={currentQuestion} questionsAmount={15} />
    </QuizLayout>
  );
});

export default ExamProcessPage;
