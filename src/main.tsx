/* eslint-disable jsx-a11y/aria-role */
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter as createRouter } from 'react-router-dom';
import './index.css';
import StartPage from './pages/StartPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage/LoginPage';
import QuizPage from './pages/QuizPage';

const router = createRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/login',
    element: <LoginPage role="teacher" />,
  },
  {
    path: '/join',
    element: <LoginPage role="student" />,
  },
  {
    path: '/quiz',
    element: <QuizPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
