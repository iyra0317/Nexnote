import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

console.log('NEXNOTE: Starting application...');

const root = document.getElementById('root');

if (!root) {
  console.error('Root element not found!');
  alert('ERROR: Root element not found!');
} else {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <AuthProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </AuthProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log('NEXNOTE: Application rendered successfully!');
  } catch (error) {
    console.error('NEXNOTE: Error rendering app:', error);
    root.innerHTML = `
      <div style="color: white; padding: 2rem; background: #020617; min-height: 100vh; font-family: monospace;">
        <h1 style="color: #ef4444;">Error Loading Application</h1>
        <pre style="background: #1e1b4b; padding: 1rem; border-radius: 0.5rem;">${error.message}\n\n${error.stack}</pre>
      </div>
    `;
  }
}
