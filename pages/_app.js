import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Toaster />
    </QueryClientProvider>
  );
}
