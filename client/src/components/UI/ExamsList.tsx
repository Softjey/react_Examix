import { CircularProgress, List, ListProps } from '@mui/material';
import React from 'react';
import { Exam } from '../../types/api/exam';
import ExamItem from './ExamItem';

interface Props extends ListProps {
  exams: Exam[] | null | undefined;
  isLoading: boolean;
}

const ExamsList: React.FC<Props> = ({ exams, isLoading, ...rest }) => {
  if (isLoading || !exams) {
    return <CircularProgress />;
  }

  return (
    <List sx={{ display: 'flex', flexDirection: 'column' }} {...rest}>
      {exams.map((exam) => (
        <ExamItem exam={exam} key={exam.id} />
      ))}
    </List>
  );
};

export default ExamsList;
