import React from 'react';
import { Alert, Pagination, Stack } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../../components/layouts/HomeLayout';
import useExamsHistoryPage from './useExamsHistoryPage';
import ExamsList from '../../components/UI/ExamsList';
import ExamsFilters from '../../components/forms/ExamsFilters';

interface Props extends HomeLayoutProps {}

const ExamsHistoryPage: React.FC<Props> = ({ ...rest }) => {
  const { exams, pagesAmount, isPending, isError, ...restParams } = useExamsHistoryPage();
  const { params, handleFiltersUpdate, handlePageChange } = restParams;

  return (
    <HomeLayout centered {...rest}>
      <ExamsFilters
        sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
        onFiltersUpdate={handleFiltersUpdate}
      />

      {isError && <Alert severity="error">An error occurred while loading exams</Alert>}
      {!isError && (
        <ExamsList loadingProps={{ sx: { pt: '60px' } }} exams={exams} isLoading={isPending} />
      )}

      {(pagesAmount ?? 0) > 1 && (
        <Stack direction="row" justifyContent="center">
          <Pagination
            shape="rounded"
            variant="outlined"
            page={params.page ?? 1}
            count={pagesAmount}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </HomeLayout>
  );
};

export default ExamsHistoryPage;
