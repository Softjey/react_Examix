import React from 'react';
import { Alert, Box } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../../components/layouts/HomeLayout';
import { columnCenter } from '../../styles/flex';
import useExamsHistoryPage from './useExamsHistoryPage';
import ExamsList from '../../components/UI/ExamsList';
import ExamsFilters from '../../components/forms/ExamsFilters';

interface Props extends HomeLayoutProps {}

const ExamsHistoryPage: React.FC<Props> = ({ ...rest }) => {
  const { exams, handleFiltersUpdate, isPending, isError } = useExamsHistoryPage();

  return (
    <HomeLayout contentSx={{ ...columnCenter }} {...rest}>
      <Box width="clamp(400px, 70vw, 1000px)" display="flex" flexDirection="column" gap="20px">
        <ExamsFilters
          sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
          onFiltersUpdate={handleFiltersUpdate}
        />

        {isError && <Alert severity="error">An error occurred while loading exams</Alert>}
        {!isError && (
          <ExamsList loadingProps={{ sx: { pt: '60px' } }} exams={exams} isLoading={isPending} />
        )}
      </Box>
    </HomeLayout>
  );
};

export default ExamsHistoryPage;
