
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initAnalytics } from './lib/analytics';

// Analítica sin cookies: no escribe nada en el dispositivo, por eso puede
// arrancar antes de pintar y sin banner de consentimiento (ver lib/analytics.ts).
initAnalytics();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
