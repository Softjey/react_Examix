import React from 'react';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { ButtonProps } from '@mui/material';
import authorExamStore from '../../../store/ExamStore/AuthorExamStore';
import Routes from '../../../services/Router/Routes';
import { Test } from '../../../types/api/entities/test';
import useCreateExam, { UseCreateExamOptions } from '../../../hooks/queries/useCreateExam';
import LoadingButton from './LoadingButton';

interface Props extends ButtonProps {
  testId: Test['id'];
  createExamOptions?: UseCreateExamOptions;
}

const CreateExamButton: React.FC<Props> = observer(
  ({ testId, createExamOptions = {}, ...rest }) => {
    const ongoingExamStarted = authorExamStore.status !== 'idle';
    const navigate = useNavigate();
    const { onSuccess, ...restOptions } = createExamOptions;
    const { createExam, isPending } = useCreateExam({
      onSuccess: (data, vars, context) => {
        navigate(Routes.ONGOING_EXAM_PANEL);

        onSuccess?.(data, vars, context);
      },
      ...restOptions,
    });

    return (
      <LoadingButton
        loading={isPending}
        variant="contained"
        color="secondary"
        disabled={ongoingExamStarted}
        onClick={() => createExam(testId)}
        {...rest}
      >
        {ongoingExamStarted && !isPending
          ? 'You have already started the exam'
          : 'Create Exam with this Test'}
      </LoadingButton>
    );
  },
);

export default CreateExamButton;
