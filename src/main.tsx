import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter as createRouter } from 'react-router-dom';
import './index.css';
import StartPage from './pages/StartPage';
import NotFoundPage from './pages/NotFoundPage';
import TeacherLoginPage from './pages/TeacherLoginPage';

const router = createRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/login',
    element: <TeacherLoginPage />,
  },
  {
    path: '/join',
    element: <div>Join page</div>,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
