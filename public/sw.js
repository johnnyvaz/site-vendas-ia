// /**
//  * Service Worker for Vendas.IA
//  * Provides offline caching and performance optimization for Brazilian mobile networks
//  * Target: Reduce load times and improve reliability on 3G connections
//  */

// // Disable Service Worker in development mode
// if (self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1') {
//   console.log('[SW] Service Worker disabled in development mode');
//   self.addEventListener('install', () => self.skipWaiting());
//   self.addEventListener('activate', () => self.clients.claim());
//   self.addEventListener('fetch', event => {
//     // Pass through all requests in development
//     return;
//   });
//   // Stop execution here for development
//   throw new Error('SW disabled in development');
// }

// const CACHE_NAME = 'vendas-ia-v1.2';
// const CACHE_VERSION = '1.2';

// // Assets to cache immediately (critical for first paint)
// const CRITICAL_ASSETS = [
//   '/',
//   '/index.html',
//   '/manifest.json',
//   // Core CSS and JS will be added dynamically
// ];

// // Asset types that should be cached
// const CACHEABLE_EXTENSIONS = [
//   '.js',
//   '.css',
//   '.woff2',
//   '.woff',
//   '.ttf',
//   '.png',
//   '.jpg',
//   '.jpeg',
//   '.webp',
//   '.svg',
//   '.ico'
// ];

// // Routes that should always go to network first
// const NETWORK_FIRST_ROUTES = [
//   '/api/',
//   '/n8n/',
//   '/analytics'
// ];

// // Maximum cache age for different asset types (in milliseconds)
// const CACHE_STRATEGIES = {
//   images: 7 * 24 * 60 * 60 * 1000, // 7 days
//   fonts: 30 * 24 * 60 * 60 * 1000, // 30 days
//   scripts: 24 * 60 * 60 * 1000,    // 1 day
//   styles: 24 * 60 * 60 * 1000,     // 1 day
//   api: 5 * 60 * 1000,              // 5 minutes
//   default: 24 * 60 * 60 * 1000     // 1 day
// };

// /**
//  * Install event - Cache critical assets
//  */
// self.addEventListener('install', event => {
//   console.log(`[SW] Installing version ${CACHE_VERSION}`);

//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => {
//         console.log('[SW] Caching critical assets');
//         return cache.addAll(CRITICAL_ASSETS);
//       })
//       .then(() => {
//         console.log('[SW] Critical assets cached successfully');
//         return self.skipWaiting(); // Activate immediately
//       })
//       .catch(error => {
//         console.error('[SW] Failed to cache critical assets:', error);
//       })
//   );
// });

// /**
//  * Activate event - Clean up old caches
//  */
// self.addEventListener('activate', event => {
//   console.log(`[SW] Activating version ${CACHE_VERSION}`);

//   event.waitUntil(
//     caches.keys()
//       .then(cacheNames => {
//         return Promise.all(
//           cacheNames.map(cacheName => {
//             if (cacheName !== CACHE_NAME) {
//               console.log(`[SW] Deleting old cache: ${cacheName}`);
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//       .then(() => {
//         console.log('[SW] Old caches cleaned up');
//         return self.clients.claim(); // Take control immediately
//       })
//   );
// });

// /**
//  * Fetch event - Handle all network requests
//  */
// self.addEventListener('fetch', event => {
//   const request = event.request;
//   const url = new URL(request.url);

//   // Skip non-GET requests
//   if (request.method !== 'GET') {
//     return;
//   }

//   // Skip cross-origin requests (unless they're from our CDN)
//   if (url.origin !== self.location.origin && !isAllowedOrigin(url.origin)) {
//     return;
//   }

//   // Skip WebSocket connections (Vite HMR during development)
//   if (request.headers.get('upgrade') === 'websocket') {
//     return;
//   }

//   // Skip Vite HMR requests during development
//   if (url.pathname.includes('/@vite/') || url.searchParams.has('token')) {
//     return;
//   }

//   // Determine strategy based on request type
//   if (isNetworkFirstRoute(url.pathname)) {
//     event.respondWith(networkFirst(request));
//   } else if (isCacheableAsset(url.pathname)) {
//     event.respondWith(cacheFirst(request));
//   } else {
//     event.respondWith(staleWhileRevalidate(request));
//   }
// });

// /**
//  * Network-first strategy for API calls and dynamic content
//  */
// async function networkFirst(request) {
//   const cacheKey = getCacheKey(request);

//   try {
//     // Try network first
//     const response = await fetch(request);

//     if (response.ok) {
//       // Cache successful responses
//       const cache = await caches.open(CACHE_NAME);
//       cache.put(cacheKey, response.clone());

//       console.log(`[SW] Network response cached: ${request.url}`);
//     }

//     return response;
//   } catch (error) {
//     console.log(`[SW] Network failed, trying cache: ${request.url}`);

//     // Fallback to cache
//     const cachedResponse = await caches.match(cacheKey);

//     if (cachedResponse) {
//       console.log(`[SW] Serving from cache: ${request.url}`);
//       return cachedResponse;
//     }

//     // Return offline page for navigation requests
//     if (request.mode === 'navigate') {
//       return getOfflinePage();
//     }

//     throw error;
//   }
// }

// /**
//  * Cache-first strategy for static assets
//  */
// async function cacheFirst(request) {
//   const cacheKey = getCacheKey(request);
//   const cachedResponse = await caches.match(cacheKey);

//   if (cachedResponse && !isExpired(cachedResponse)) {
//     console.log(`[SW] Serving from cache: ${request.url}`);
//     return cachedResponse;
//   }

//   try {
//     console.log(`[SW] Fetching and caching: ${request.url}`);
//     const response = await fetch(request);

//     if (response.ok) {
//       const cache = await caches.open(CACHE_NAME);
//       cache.put(cacheKey, response.clone());
//     }

//     return response;
//   } catch (error) {
//     console.log(`[SW] Network failed for: ${request.url}`);

//     // Return cached version even if expired
//     if (cachedResponse) {
//       console.log(`[SW] Serving expired cache: ${request.url}`);
//       return cachedResponse;
//     }

//     throw error;
//   }
// }

// /**
//  * Stale-while-revalidate strategy for pages
//  */
// async function staleWhileRevalidate(request) {
//   const cacheKey = getCacheKey(request);
//   const cache = await caches.open(CACHE_NAME);
//   const cachedResponse = await cache.match(cacheKey);

//   // Fetch fresh version in background
//   const fetchPromise = fetch(request)
//     .then(response => {
//       if (response.ok) {
//         cache.put(cacheKey, response.clone());
//         console.log(`[SW] Background update cached: ${request.url}`);
//       }
//       return response;
//     })
//     .catch(error => {
//       console.log(`[SW] Background fetch failed: ${request.url}`, error);
//     });

//   // Return cached version immediately if available
//   if (cachedResponse) {
//     console.log(`[SW] Serving stale content: ${request.url}`);
//     return cachedResponse;
//   }

//   // Wait for network if no cache
//   console.log(`[SW] No cache, waiting for network: ${request.url}`);
//   return fetchPromise;
// }

// /**
//  * Generate cache key for request
//  */
// function getCacheKey(request) {
//   const url = new URL(request.url);

//   // Remove query parameters for static assets
//   if (isCacheableAsset(url.pathname)) {
//     return `${url.origin}${url.pathname}`;
//   }

//   return request.url;
// }

// /**
//  * Check if response is expired based on asset type
//  */
// function isExpired(response) {
//   const cachedDate = response.headers.get('date');
//   if (!cachedDate) return false;

//   const cacheAge = Date.now() - new Date(cachedDate).getTime();
//   const maxAge = getCacheMaxAge(response.url);

//   return cacheAge > maxAge;
// }

// /**
//  * Get cache max age for URL
//  */
// function getCacheMaxAge(url) {
//   const pathname = new URL(url).pathname.toLowerCase();

//   if (pathname.match(/\.(png|jpg|jpeg|webp|svg|ico)$/)) {
//     return CACHE_STRATEGIES.images;
//   }

//   if (pathname.match(/\.(woff2|woff|ttf)$/)) {
//     return CACHE_STRATEGIES.fonts;
//   }

//   if (pathname.match(/\.js$/)) {
//     return CACHE_STRATEGIES.scripts;
//   }

//   if (pathname.match(/\.css$/)) {
//     return CACHE_STRATEGIES.styles;
//   }

//   if (pathname.includes('/api/')) {
//     return CACHE_STRATEGIES.api;
//   }

//   return CACHE_STRATEGIES.default;
// }

// /**
//  * Check if URL should use network-first strategy
//  */
// function isNetworkFirstRoute(pathname) {
//   return NETWORK_FIRST_ROUTES.some(route => pathname.startsWith(route));
// }

// /**
//  * Check if asset is cacheable
//  */
// function isCacheableAsset(pathname) {
//   return CACHEABLE_EXTENSIONS.some(ext => pathname.toLowerCase().endsWith(ext));
// }

// /**
//  * Check if origin is allowed for caching
//  */
// function isAllowedOrigin(origin) {
//   const allowedOrigins = [
//     'https://fonts.googleapis.com',
//     'https://fonts.gstatic.com',
//     'https://cdnjs.cloudflare.com'
//   ];

//   return allowedOrigins.includes(origin);
// }

// /**
//  * Get offline page
//  */
// async function getOfflinePage() {
//   try {
//     const cache = await caches.open(CACHE_NAME);
//     const offlineResponse = await cache.match('/');

//     if (offlineResponse) {
//       return offlineResponse;
//     }
//   } catch (error) {
//     console.error('[SW] Failed to get offline page:', error);
//   }

//   // Fallback offline response
//   return new Response(`
//     <!DOCTYPE html>
//     <html lang="pt-BR">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Vendas.IA - Offline</title>
//       <style>
//         body {
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           min-height: 100vh;
//           margin: 0;
//           background: linear-gradient(135deg, #27305d, #209016);
//           color: white;
//           text-align: center;
//           padding: 20px;
//         }
//         .logo { font-size: 2rem; font-weight: bold; margin-bottom: 1rem; }
//         .message { font-size: 1.2rem; margin-bottom: 2rem; max-width: 500px; }
//         .retry-btn {
//           background: #ea9d1a;
//           color: #27305d;
//           border: none;
//           padding: 12px 24px;
//           border-radius: 8px;
//           font-size: 1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: transform 0.2s;
//         }
//         .retry-btn:hover { transform: translateY(-1px); }
//       </style>
//     </head>
//     <body>
//       <div class="logo">Vendas.IA</div>
//       <div class="message">
//         Você está offline. Verifique sua conexão com a internet e tente novamente.
//       </div>
//       <button class="retry-btn" onclick="window.location.reload()">
//         Tentar Novamente
//       </button>
//     </body>
//     </html>
//   `, {
//     headers: {
//       'Content-Type': 'text/html',
//       'Cache-Control': 'no-cache'
//     }
//   });
// }

// /**
//  * Message handler for communication with main thread
//  */
// self.addEventListener('message', event => {
//   const { type, payload } = event.data;

//   switch (type) {
//     case 'SKIP_WAITING':
//       self.skipWaiting();
//       break;

//     case 'GET_CACHE_STATUS':
//       getCacheStatus().then(status => {
//         event.ports[0].postMessage({ type: 'CACHE_STATUS', payload: status });
//       });
//       break;

//     case 'CLEAR_CACHE':
//       clearCache().then(() => {
//         event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
//       });
//       break;

//     case 'PREFETCH_URLS':
//       prefetchUrls(payload.urls).then(() => {
//         event.ports[0].postMessage({ type: 'PREFETCH_COMPLETE' });
//       });
//       break;
//   }
// });

// /**
//  * Get current cache status
//  */
// async function getCacheStatus() {
//   try {
//     const cache = await caches.open(CACHE_NAME);
//     const keys = await cache.keys();

//     return {
//       version: CACHE_VERSION,
//       size: keys.length,
//       urls: keys.map(request => request.url)
//     };
//   } catch (error) {
//     console.error('[SW] Failed to get cache status:', error);
//     return { version: CACHE_VERSION, size: 0, urls: [] };
//   }
// }

// /**
//  * Clear all caches
//  */
// async function clearCache() {
//   try {
//     const cacheNames = await caches.keys();
//     await Promise.all(cacheNames.map(name => caches.delete(name)));
//     console.log('[SW] All caches cleared');
//   } catch (error) {
//     console.error('[SW] Failed to clear caches:', error);
//   }
// }

// /**
//  * Prefetch URLs for better performance
//  */
// async function prefetchUrls(urls) {
//   try {
//     const cache = await caches.open(CACHE_NAME);
//     const fetchPromises = urls.map(url =>
//       fetch(url)
//         .then(response => {
//           if (response.ok) {
//             return cache.put(url, response);
//           }
//         })
//         .catch(error => {
//           console.log(`[SW] Failed to prefetch ${url}:`, error);
//         })
//     );

//     await Promise.all(fetchPromises);
//     console.log(`[SW] Prefetched ${urls.length} URLs`);
//   } catch (error) {
//     console.error('[SW] Failed to prefetch URLs:', error);
//   }
// }

// console.log(`[SW] Service Worker ${CACHE_VERSION} loaded`);