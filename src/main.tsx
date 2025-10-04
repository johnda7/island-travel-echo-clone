import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './cache-bust.ts'

// GitHub Pages SPA redirect - восстанавливаем путь из sessionStorage (как в phuketgo-react)
const redirect = sessionStorage.getItem('redirect');
if (redirect) {
  sessionStorage.removeItem('redirect');
  window.history.replaceState(null, '', redirect);
}

createRoot(document.getElementById("root")!).render(<App />);
