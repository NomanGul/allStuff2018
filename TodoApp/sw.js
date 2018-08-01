const CACHE_NAME = 'myApp-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/index.js',
    '/app.js',
    '/abstract-star-pattern-152-202344.png',

];

self.addEventListener('install', event => {
    console.log('[serviceWorker] installing');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[serviceWorker] precaching app shell');
                return cache.addAll(urlsToCache);
            }).catch(error => {
                console.log('[serviceWorker] precaching app shell failed', error);
            })
    )
    // self.clients.claim();
})


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                return response || fetch(event.request).then(response => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});