import * as React from 'react';
import { Pagination } from '@mui/material';
import TestsList from '../../components/common/TestsList';
import TestsFilters from '../../components/common/TestsFilters';
import HomeLayout, { Props as HomeLayoutProps } from '../../components/layouts/HomeLayout';
import useTestsLibraryPage from './useTestsLibraryPage';

interface Props extends HomeLayoutProps {}

const TestsLibraryPage: React.FC<Props> = ({ ...rest }) => {
  const { filters, pagination, query } = useTestsLibraryPage();
  const { page, pagesAmount, handlePageChange } = pagination;
  const { search, subject, handleFiltersChange } = filters;
  const { tests, isLoading, error } = query;

  return (
    <HomeLayout
      centeredSx={{ display: 'flex', flexDirection: 'column', gap: 5 }}
      centered
      {...rest}
    >
      <TestsFilters onFiltersChange={handleFiltersChange} defaultValues={{ search, subject }} />

      <TestsList tests={tests} isLoading={isLoading} error={error?.message} />

      {pagesAmount !== undefined && pagesAmount > 1 && (
        <Pagination
          count={pagesAmount}
          page={page}
          shape="rounded"
          size="large"
          disabled={isLoading}
          onChange={handlePageChange}
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      )}
    </HomeLayout>
  );
};

export default TestsLibraryPage;
