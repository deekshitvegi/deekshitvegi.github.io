import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
  );
} else {
  console.error("Root element not found");
}