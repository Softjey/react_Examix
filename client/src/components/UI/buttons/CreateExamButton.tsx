import React from 'react';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { ButtonProps } from '@mui/material';
import authorExamStore from '../../../store/ExamStore/AuthorExamStore';
import Button from './Button';
import Routes from '../../../services/Router/Routes';
import { Test } from '../../../types/api/entities/test';

interface Props extends ButtonProps {
  testId: Test['id'];
}

const CreateExamButton: React.FC<Props> = observer(({ testId, ...rest }) => {
  const navigate = useNavigate();
  const createExam = async () => {
    await authorExamStore.createExam(testId);
    navigate(Routes.ONGOING_EXAM_PANEL);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      disabled={authorExamStore.status !== 'idle'}
      onClick={createExam}
      {...rest}
    >
      {authorExamStore.status !== 'idle'
        ? 'You have already started the exam'
        : 'Create Exam with this Test'}
    </Button>
  );
});

export default CreateExamButton;
