import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

document.title = 'Rouvana Modas - Moda Feminina';
try {
  if (window.top && window.top !== window) {
    window.top.document.title = 'Rouvana Modas - Moda Feminina';
  }
} catch (e) {}

createRoot(document.getElementById('root')!).render(<App />);
