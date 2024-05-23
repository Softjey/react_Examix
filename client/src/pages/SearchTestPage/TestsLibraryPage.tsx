import * as React from 'react';
import { CSSObject } from '@emotion/react';

import SearchCategory from './SearchCategory';
import AllQuizzes from './Quizzes/AllQuizzes';

const styles: Record<string, CSSObject> = {
  container: {
    display: 'flex',
    height: '100vh',
    boxSizing: 'border-box',
  },
};

const TestsLibraryPage: React.FC = () => (
  <div css={styles.container}>
    <SearchCategory />
    <AllQuizzes />
  </div>
);

export default TestsLibraryPage;
