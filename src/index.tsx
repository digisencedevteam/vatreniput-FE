import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <Helmet>
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='black'
          />
          <meta
            name='apple-mobile-web-app-title'
            content='Vatreni Put'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='https://res.cloudinary.com/dzg5kxbau/image/upload/v1701169772/180_gpoe2r.png'
          />
        </Helmet>
        <App />
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
