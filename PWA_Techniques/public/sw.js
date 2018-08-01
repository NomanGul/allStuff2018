const CACHE_NAME = 'SW-CB-v2.1';
const urlsToCache = [
    '/',
    '/index.html',
    '/swcb/swcb.html',
    '/manifest.json',
    '/manifest/manifest.html',
    '/src/app.js',
    '/swcb/swcb.js',
    '/manifest/manifest.js',
    '/src/app.css',
    '/images/icons/favicon.ico',
    '/images/subHeaderPhoto.jpg',
    '/images/LazyLoadImages.jpg',
    '/images/pwaTechniques/sw2.jpeg',
    '/images/pwaTechniques/manijson2.jpg',
    '/images/swcbImages/sw-support2.png',
    '/images/swcbImages/sw-lifecycle.png',
    '/images/swcbImages/sw-chrome-inspect2.png',
    '/images/manifestImg/sscreen2.jpg',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://code.jquery.com/jquery-3.2.1.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js'
]


self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    )
    self.skipWaiting();
})

self.addEventListener('activate', e => {
    e.waitUntil(
      caches.keys()
      .then(keylist => {
        return Promise.all(keylist.map(key => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
    );
    self.clients.claim();
});


self.addEventListener('fetch', event => {
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