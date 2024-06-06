import { observer } from 'mobx-react-lite';
import React from 'react';
import studentExamStore from '../../store/ExamStore/StudentExamStore';
import QuizLayout from '../../components/layouts/QuizLayout';
import ExamQuestionCard from '../../components/items/ExamQuestionCard';
import LoadingPage from '../LoadingPage';

interface Props {}

const ExamProcessPage: React.FC<Props> = observer(() => {
  const { exam } = studentExamStore;

  if (!exam || !exam.currentQuestion) {
    return <LoadingPage layout="start" />;
  }

  const { currentQuestion, test } = exam;

  return (
    <QuizLayout>
      <ExamQuestionCard
        onAnswer={(answers) => studentExamStore.sendAnswer(answers)}
        question={currentQuestion}
        questionsAmount={test.questionsAmount}
      />
    </QuizLayout>
  );
});

export default ExamProcessPage;
