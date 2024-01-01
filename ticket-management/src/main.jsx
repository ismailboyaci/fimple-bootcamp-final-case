import React from 'react';
import ReactDOM from 'react-dom/client';
import '~/styles/index.scss';
import '~/shared/styles/index.scss';
import './i18n';
import { BrowserRouter as Router } from 'react-router-dom';
import  {AppRoutes}  from '~/routes/index';
import { AuthProvider, ToastrProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <ToastrProvider>
    <Router>
          <AppRoutes />
        </Router>
    </ToastrProvider>
    </AuthProvider>
  </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
