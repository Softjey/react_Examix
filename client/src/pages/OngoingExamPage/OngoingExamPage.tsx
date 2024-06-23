import React from 'react';
import { Navigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import studentExamStore from '../../store/ExamStore/StudentExamStore';
import Routes from '../../services/Router/Routes';
import ExamWaitingPage from './ExamWaitingPage';
import ExamProcessPage from './ExamProcessPage';
import ExamFinishedPage from './ExamFinishedPage';
import ErrorPage from '../ErrorPage';
import ErrorMessage from '../../store/ExamStore/types/ErrorMessage';

interface Props {}

const OngoingExamPage: React.FC<Props> = observer(() => {
  const { status } = studentExamStore;
  const resetExam = () => studentExamStore.resetExam();

  switch (status) {
    case 'idle':
      return <Navigate to={Routes.JOIN} />;
    case 'created':
      return <ExamWaitingPage />;
    case 'started':
      return <ExamProcessPage />;
    case 'deleted':
      return (
        <ErrorPage
          errorDetails={{
            title: 'Exam was deleted',
            description: ErrorMessage.EXAM_WAS_DELETED,
          }}
          onGoHome={resetExam}
        />
      );
    case 'kicked':
      return (
        <ErrorPage
          errorDetails={{
            title: 'You were kicked from the exam',
            description: 'You were kicked from the exam by the author.',
          }}
          onGoHome={resetExam}
        />
      );
    case 'finished':
      return <ExamFinishedPage />;
    default:
      throw new Error('Invalid status');
  }
});

export default OngoingExamPage;
