import React from 'react';
import { Alert, Pagination, Stack } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../../components/layouts/HomeLayout';
import { columnCenter } from '../../styles/flex';
import useExamsHistoryPage from './useExamsHistoryPage';
import ExamsList from '../../components/UI/ExamsList';
import ExamsFilters from '../../components/forms/ExamsFilters';

interface Props extends HomeLayoutProps {}

const ExamsHistoryPage: React.FC<Props> = ({ contentSx, ...rest }) => {
  const { exams, pagesAmount, isPending, isError, ...restParams } = useExamsHistoryPage();
  const { params, handleFiltersUpdate, handlePageChange } = restParams;

  return (
    <HomeLayout contentSx={{ ...columnCenter, ...contentSx }} {...rest}>
      <Stack width="clamp(400px, 70vw, 1000px)" direction="column" gap="20px" pb="50px">
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
      </Stack>
    </HomeLayout>
  );
};

export default ExamsHistoryPage;
