import * as React from 'react';
import TestsList from '../../components/common/TestsList';
import TestsFilters from '../../components/common/TestsFilters';
import HomeLayout, { Props as HomeLayoutProps } from '../../components/layouts/HomeLayout';
import useTestsLibraryPage from './useTestsLibraryPage';

interface Props extends HomeLayoutProps {}

const TestsLibraryPage: React.FC<Props> = ({ ...rest }) => {
  const { tests, error, isLoading, search, handleFiltersChange, subject } = useTestsLibraryPage();

  return (
    <HomeLayout centered {...rest}>
      <TestsFilters onFiltersChange={handleFiltersChange} defaultValues={{ search, subject }} />
      <TestsList tests={tests} isLoading={isLoading} error={error?.message} sx={{ mt: 5 }} />
    </HomeLayout>
  );
};

export default TestsLibraryPage;
