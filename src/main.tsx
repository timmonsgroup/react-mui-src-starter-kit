import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const el = document.getElementById('root');
if (el === null) {
  throw new Error('Root container missing in index.html');
}

createRoot(el).render(<App />);
