import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { APIProvider } from '@vis.gl/react-google-maps';
import { TooltipProvider } from './components';
import { AuthProvider } from './components/common/useAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 3600000
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TooltipProvider>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <ToastContainer limit={1} />
                <App />
              </AuthProvider>
            </QueryClientProvider>
          </APIProvider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
