import { createHashRouter as createRouter } from 'react-router-dom';
import Routes from './Routes';
import StartPage from '../../pages/StartPage';
import NotFoundPage from '../../pages/NotFoundPage';
import Authenticated from '../../components/hocs/Authenticated';
import HomePage from '../../pages/HomePage';
import TestsLibraryPage from '../../pages/TestsLibraryPage/TestsLibraryPage';
import OnlyPublic from '../../components/hocs/OnlyPublic';
import ExamsHistoryPage from '../../pages/ExamsHistoryPage/ExamsHistoryPage';
import SettingsPage from '../../pages/SettingsPage';
import CreateTestPage from '../../pages/CreateTestPage/CreateTestPage';
import TestPage from '../../pages/TestPage';
import ExamPage from '../../pages/ExamPage';
import ChangePasswordPage from '../../pages/ChangePasswordPage';
import OngoingExamPage from '../../pages/OngoingExamPage/OngoingExamPage';
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
    path: Routes.RESET_PASSWORD,
    element: <ChangePasswordPage />,
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
        <CreateTestPage />
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
        <SettingsPage />
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
