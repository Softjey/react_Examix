import { createHashRouter as createRouter } from 'react-router-dom';
import Routes from './Routes';
import StartPage from '../../pages/StartPage';
import NotFoundPage from '../../pages/NotFoundPage';
import Authenticated from '../../components/hocs/Authenticated';
import DebugPage from '../../dev/DebugPage';
import QuizPage from '../../dev/QuizPage';
import WaitingPage from '../../dev/WaitingPage';
import HomePage from '../../pages/HomePage';
import TestsLibraryPage from '../../pages/TestsLibraryPage/TestsLibraryPage';
import OnlyPublic from '../../components/hocs/OnlyPublic';
import HomeLayout from '../../components/layouts/HomeLayout';
import ExamsHistoryPage from '../../pages/ExamsHistoryPage/ExamsHistoryPage';
import TestPage from '../../pages/TestPage';
import ExamPage from '../../pages/ExamPage';
import OngoingExamPage from '../../pages/OngoingExamPage';
import LoginPage from '../../pages/LoginPage';
import JoinPage from '../../pages/JoinPage';
import OngoingExamPanelPage from '../../pages/OngoingExamPanelPage';

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
        <LoginPage />
      </OnlyPublic>
    ),
  },
  {
    path: Routes.JOIN,
    element: (
      <OnlyPublic>
        <JoinPage />
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
    path: Routes.QUIZ,
    element: <QuizPage />,
  },
  {
    path: Routes.WAITING,
    element: <WaitingPage />,
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
  {
    path: `${Routes.EXAM}/:id`,
    element: (
      <Authenticated>
        <ExamPage />
      </Authenticated>
    ),
  },
  {
    path: Routes.ONGOING_EXAM_PANEL,
    element: (
      <Authenticated>
        <OngoingExamPanelPage />
      </Authenticated>
    ),
  },
  {
    path: Routes.ONGOING_EXAM,
    element: (
      <OnlyPublic>
        <OngoingExamPage />
      </OnlyPublic>
    ),
  },
]);

export default router;
