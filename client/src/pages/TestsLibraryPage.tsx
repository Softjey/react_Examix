import * as React from 'react';
import useTests from '../hooks/queries/useTests';
import TestsList from '../components/common/TestsList';
import LoadingPage from './LoadingPage';
import { columnCenter } from '../styles/flex';
import SearchAndSelect from '../components/common/SearchAndSelect';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';

interface Props extends HomeLayoutProps {}
const TestsLibraryPage: React.FC<Props> = ({ contentSx, ...rest }) => {
  const { tests, isLoading, isError } = useTests({ limit: 2 });

  if (isLoading || !tests) {
    return <LoadingPage />;
  }
  if (isError || !tests) {
    return <h1>error</h1>;
  }
  return (
    <HomeLayout contentSx={{ ...columnCenter, ...contentSx }} {...rest}>
      <SearchAndSelect />
      <TestsList tests={tests} />
    </HomeLayout>
  );
};

export default TestsLibraryPage;
