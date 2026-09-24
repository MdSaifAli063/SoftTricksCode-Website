import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

// Suppress known upstream Three.js r169+ Clock deprecation warning emitted by @react-three/fiber
const origWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
    return;
  }
  origWarn(...args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0a0a1a',
              color: '#fff',
              border: '1px solid rgba(37,99,235,0.4)',
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
