import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter as createRouter } from 'react-router-dom';
import './index.css';

const router = createRouter([
  {
    path: '/',
    element: <div>Start page</div>,
  },
  {
    path: '/login',
    element: <div>Login Page</div>,
  },
  {
    path: '/join',
    element: <div>Join page</div>,
  },
  {
    path: '*',
    element: <div>Not found 404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
