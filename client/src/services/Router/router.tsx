import { createHashRouter as createRouter } from 'react-router-dom';
import Routes from './Routes';
import StartPage from '../../pages/StartPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import Authenticated from '../../components/Authenticated';
import TestPage from '../../dev/TestPage';
import QuizPage from '../../dev/QuizPage';

const router = createRouter([
  {
    path: Routes.START,
    element: <StartPage />,
  },
  {
    path: Routes.LOGIN,
    element: <LoginPage role="teacher" />,
  },
  {
    path: Routes.JOIN,
    element: <LoginPage role="student" />,
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: Routes.HOME,
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
    element: (
      <Authenticated>
        <QuizPage />
      </Authenticated>
    ),
  },
]);

export default router;
