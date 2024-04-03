import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter as createRouter } from 'react-router-dom';
import './index.css';
import StartPage from './pages/StartPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';
import QuizPage from './pages/QuizPage';
import Routes from './constants/Router/Routes';
import TestPage from './pages/TestPage';

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
    path: Routes.QUIZ_PAGE,
    element: <QuizPage />,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
  {
    path: Routes.NOT_FOUND_PAGE,
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
