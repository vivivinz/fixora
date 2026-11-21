import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// The service worker is generated and registered by vite-plugin-pwa (see vite.config.js).
// It is only active in production builds, so `npm run dev` always serves fresh code.
