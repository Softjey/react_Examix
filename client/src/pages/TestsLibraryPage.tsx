import * as React from 'react';
import useTests from '../hooks/queries/useTests';
import TestsList from '../components/common/TestsList';
import SearchAndSelect from '../components/common/SearchAndSelect';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';

interface Props extends HomeLayoutProps {}
const TestsLibraryPage: React.FC<Props> = ({ ...rest }) => {
  const { tests, isLoading, error } = useTests({ limit: 10 });

  return (
    <HomeLayout centered {...rest}>
      <SearchAndSelect />
      <TestsList tests={tests} isLoading={isLoading} error={error?.message} sx={{ mt: 5 }} />
    </HomeLayout>
  );
};

export default TestsLibraryPage;
