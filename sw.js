const APP_NAME = 'ppluss-yearprogress'
const APP_VERSION = '0.0.2'
const SCOPE = '/'

const CACHE_NAME = APP_NAME + '-v' + APP_VERSION

var urlsToCache = [
  SCOPE,
  SCOPE + "style.css",
  SCOPE + "main.js",
  SCOPE + "moment.js",
  SCOPE + "manifest.json",
  SCOPE + "icon.png"
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
