import React from 'react';
import { Alert, Box } from '@mui/material';
import HomeLayout, { Props as HomeLayoutProps } from '../../components/layouts/HomeLayout';
import ExamsFilters from '../../components/UI/ExamsFilters/ExamsFilters';
import { columnCenter } from '../../styles/flex';
import useExamsHistoryPage from './useExamsHistoryPage';
import ExamsList from '../../components/UI/ExamsList';

interface Props extends HomeLayoutProps {}

const ExamsHistoryPage: React.FC<Props> = ({ ...rest }) => {
  const { exams, isPending, isError, dateFormat } = useExamsHistoryPage();

  return (
    <HomeLayout contentSx={{ ...columnCenter }} {...rest}>
      <Box width="clamp(400px, 70vw, 1000px)" display="flex" flexDirection="column" gap="20px">
        <ExamsFilters
          sx={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
          dateFormat={dateFormat}
        />

        {isError && <Alert severity="error">An error occurred while loading exams</Alert>}
        {!isError && (
          <ExamsList loadingProps={{ sx: { pt: '60px' } }} exams={exams} isLoading={isPending} />
        )}

        {/* <Grid xs={6} sx={center}>
          <Pagination
            size="large"
            shape="rounded"
            page={parseInt(initialValue(Filter.PAGE), 10)}
            count={15}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                // to={}
                // to={`${Routes.EXAMS_HISTORY}${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
                />
              )}
              />
            </Grid> */}
      </Box>
    </HomeLayout>
  );
};

export default ExamsHistoryPage;
