import { App } from '@/components/Bootstrap/App';
import { ThemeProvider } from '@/contexts/ThemeProvider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

// DO NOT REMOVE THIS IMPORT
import { Toaster } from '@/components/ui/toaster';
import './index.css';

// const REFETCH_INTERVAL = 4000; /** 4s */
const STALE_TIME = 1000 * 60 * 30; /** 30s Tempo de caching */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME,
      retry: false,
      // refetchInterval(data) {
      //   return data ? false : REFETCH_INTERVAL; /** Faz um Refetch em caso de data não existir. */
      // },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <App />
    </QueryClientProvider>
  </ThemeProvider>
);
