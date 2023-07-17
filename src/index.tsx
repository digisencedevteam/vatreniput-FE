import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app/App';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(
      function (registration) {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );

        // Ensure refresh is only called once.
        // This works around a bug in "force update on reload".
        let refreshing: boolean;
        navigator.serviceWorker.addEventListener(
          'controllerchange',
          () => {
            if (refreshing) return;
            refreshing = true;
            window.location.reload();
          }
        );
      },
      function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // query options
      retry: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      // mutation options
      retry: 0,
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
