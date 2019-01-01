const CACHE_NAME = 'ppluss-yearprogress-cache-v1';
const base = "/yearprogress/";
var urlsToCache = [
  base,
  base + "style.css",
  base + "main.js",
  base + "moment.js",
  base + "manifest.json",
  base + "icon.png"
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
