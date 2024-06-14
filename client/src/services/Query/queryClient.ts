import { QueryClient } from '@tanstack/react-query';

export default new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      networkMode: 'always',
    },
    mutations: {
      retry: false,
      networkMode: 'always',
    },
  },
});
