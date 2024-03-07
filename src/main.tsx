import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter as createRouter } from 'react-router-dom';
import './index.css';
// import StartPage from './pages/StartPage';
// import NotFoundPage from './pages/NotFoundPage';
// import LoginPage from './pages/LoginPage';
// import JoinPage from './pages/JoinPage';

const router = createRouter([
  {
    path: '/',
    element: /* <StartPage /> */ <div>Start page</div>,
  },
  {
    path: '/login',
    element: /* <LoginPage /> */ <div>Login page</div>,
  },
  {
    path: '/join',
    element: /* <JoinPage /> */ <div>Join page</div>,
  },
  {
    path: '*',
    element: /* <NotFoundPage /> */ <div>Page not found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
