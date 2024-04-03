import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter as createRouter } from 'react-router-dom';
import './index.css';
import StartPage from './pages/StartPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Routes from './constants/Router/Routes';
import TestPage from './dev/TestPage';
import QuizPage from './dev/QuizPage';

const router = createRouter([
  {
    path: Routes.START_PAGE,
    element: <StartPage />,
  },
  {
    path: Routes.LOGIN_PAGE,
    element: <LoginPage role="teacher" />,
  },
  {
    path: Routes.JOIN_PAGE,
    element: <LoginPage role="student" />,
  },
  {
    path: Routes.NOT_FOUND_PAGE,
    element: <NotFoundPage />,
  },
  {
    path: 'test',
    element: <TestPage />,
  },
  {
    path: 'quiz',
    element: <QuizPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
