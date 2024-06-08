import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import './index.css';
import router from './services/Router/router';
import queryClient from './services/Query/queryClient';
import ThemeProvider from './components/providers/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  </QueryClientProvider>,
);
