const APP_NAME = 'ppluss-yearprogress'
const APP_VERSION = '0.0.3'
const APP_ROOT = '/'

const CACHE_NAME = APP_NAME + '-v' + APP_VERSION

const appFiles = [
    '',
    'style.css',
    'main.js',
    'moment.js',
    'manifest.json',
    'icon.png',
].map(file => APP_ROOT + file)

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        // clear all caches on reinstall
        const oldCaches = await caches.keys()
        for(const cacheName of oldCaches) {
            await caches.delete(cacheName)
        }
    
        const cache = await caches.open(CACHE_NAME)
        await cache.addAll(appFiles)
    })())
})

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME)
        const match = await cache.match(event.request)
        if(match) return match

        return await fetch(event.request)
    })())
})
