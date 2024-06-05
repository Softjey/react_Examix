import React from 'react';
import { Navigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import studentExamStore from '../../store/ExamStore/StudentExamStore';
import Routes from '../../services/Router/Routes';
import ExamWaitingPage from './ExamWaitingPage';
import ExamProcessPage from './ExamProcessPage';

interface Props {}

const OngoingExamPage: React.FC<Props> = observer(() => {
  const { status } = studentExamStore;

  switch (status) {
    case 'idle':
      return <Navigate to={Routes.JOIN} />;
    case 'created':
      return <ExamWaitingPage />;
    case 'started':
      return <ExamProcessPage />;
    default:
      throw new Error('Invalid status');
  }
});

export default OngoingExamPage;
