import { Box, BoxProps, CircularProgress, List, ListProps } from '@mui/material';
import React from 'react';
import { Exam } from '../../types/api/exam';
import ExamItem from './ExamItem';
import { center } from '../../styles/flex';

interface Props extends ListProps {
  exams: Exam[] | null | undefined;
  loadingProps?: BoxProps;
  isLoading: boolean;
}

const ExamsList: React.FC<Props> = ({ exams, loadingProps = {}, isLoading, sx, ...rest }) => {
  if (isLoading || !exams) {
    const { sx: loadingSx, ...restLoadingProps } = loadingProps;

    return (
      <Box sx={{ ...center, ...loadingSx }} {...restLoadingProps}>
        <CircularProgress size={45} />
      </Box>
    );
  }

  if (exams.length === 0) {
    return <Box sx={{ ...center, ...sx }}>No exams found</Box>;
  }

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', ...sx }} {...rest}>
      {exams.map((exam) => (
        <ExamItem exam={exam} key={exam.id} />
      ))}
    </List>
  );
};

export default ExamsList;
