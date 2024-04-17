import { createHashRouter as createRouter } from 'react-router-dom';
import Routes from './Routes';
import StartPage from '../../pages/StartPage';
import NotFoundPage from '../../pages/NotFoundPage';
import Authenticated from '../../components/Authenticated';
import TestPage from '../../dev/TestPage';
import QuizPage from '../../dev/QuizPage';
import TeacherLoginPage from '../../pages/LoginPage/TeacherLoginPage';
import StudentJoinPage from '../../pages/LoginPage/StudentJoinPage';
import WaitingPage from '../../dev/WaitingPage';

const router = createRouter([
  {
    path: Routes.START_PAGE,
    element: <StartPage />,
  },
  {
    path: Routes.LOGIN_PAGE,
    element: <TeacherLoginPage />,
  },
  {
    path: Routes.JOIN_PAGE,
    element: <StudentJoinPage />,
  },
  {
    path: Routes.NOT_FOUND_PAGE,
    element: <NotFoundPage />,
  },
  {
    path: Routes.HOME_PAGE,
    element: <div>Home page</div>,
  },
  {
    path: 'test',
    element: (
      <Authenticated>
        <TestPage />
      </Authenticated>
    ),
  },
  {
    path: 'quiz',
    element: <QuizPage />,
  },
  {
    path: Routes.WAITING_PAGE,
    element: <WaitingPage />,
  },
]);

export default router;
