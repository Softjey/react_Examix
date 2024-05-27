import { createHashRouter as createRouter } from 'react-router-dom';
import Routes from './Routes';
import StartPage from '../../pages/StartPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import Authenticated from '../../components/hocs/Authenticated';
import DebugPage from '../../components/dev/DebugPage';
import QuizPage from '../../components/dev/QuizPage';
import HomePage from '../../pages/HomePage';
import TestsLibraryPage from '../../pages/TestsLibraryPage';
import OnlyPublic from '../../components/hocs/OnlyPublic';
import HomeLayout from '../../components/layouts/HomeLayout';
import ExamsHistoryPage from '../../pages/ExamsHistoryPage/ExamsHistoryPage';
import TestPage from '../../pages/TestPage';

const router = createRouter([
  {
    path: Routes.START,
    element: (
      <OnlyPublic>
        <StartPage />
      </OnlyPublic>
    ),
  },
  {
    path: Routes.LOGIN,
    element: (
      <OnlyPublic>
        <LoginPage role="teacher" />
      </OnlyPublic>
    ),
  },
  {
    path: Routes.JOIN,
    element: (
      <OnlyPublic>
        <LoginPage role="student" />
      </OnlyPublic>
    ),
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: Routes.HOME,
    element: (
      <Authenticated>
        <HomePage />
      </Authenticated>
    ),
  },
  {
    path: 'debug',
    element: (
      <Authenticated>
        <DebugPage />
      </Authenticated>
    ),
  },
  {
    path: 'quiz',
    element: (
      <Authenticated>
        <QuizPage />
      </Authenticated>
    ),
  },
  {
    path: Routes.EXAMS_HISTORY,
    element: (
      <Authenticated>
        <ExamsHistoryPage />
      </Authenticated>
    ),
  },
  {
    path: Routes.CREATE_TEST,
    element: (
      <Authenticated>
        <HomeLayout>Create test page</HomeLayout>
      </Authenticated>
    ),
  },
  {
    path: Routes.TESTS_LIBRARY,
    element: (
      <Authenticated>
        <TestsLibraryPage />
      </Authenticated>
    ),
  },
  {
    path: Routes.SETTINGS,
    element: (
      <Authenticated>
        <HomeLayout>Settings page</HomeLayout>
      </Authenticated>
    ),
  },
  {
    path: `${Routes.TEST}/:id`,
    element: (
      <Authenticated>
        <TestPage />
      </Authenticated>
    ),
  },
]);

export default router;
