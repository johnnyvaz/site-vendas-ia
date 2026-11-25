import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// PWA Service Worker Registration
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', async () => {
//     try {
//       const registration = await navigator.serviceWorker.register('/sw.js', {
//         scope: '/'
//       });

//       console.log('SW registered successfully:', registration.scope);

//       // Handle service worker updates
//       registration.addEventListener('updatefound', () => {
//         const newWorker = registration.installing;
//         if (newWorker) {
//           newWorker.addEventListener('statechange', () => {
//             if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
//               // New content available, refresh required
//               if (window.confirm('Nova versão disponível! Atualizar agora?')) {
//                 window.location.reload();
//               }
//             }
//           });
//         }
//       });

//     } catch (error) {
//       console.log('SW registration failed:', error);
//     }
//   });
// }

// Páginas pré-renderizadas (scripts/prerender.mjs) são hidratadas: o HTML do
// build é reaproveitado, sem remontar a página nem repetir as animações de entrada.
// O shell vazio (só no `npm run dev`) monta do zero.
const raiz = document.getElementById("root")!;
if (raiz.firstElementChild) hydrateRoot(raiz, <App />);
else createRoot(raiz).render(<App />);
