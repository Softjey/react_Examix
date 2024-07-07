import { QueryClient } from '@tanstack/react-query';

export default new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      networkMode: 'always',
    },
    mutations: {
      retry: false,
      networkMode: 'always',
    },
  },
});
