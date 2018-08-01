const CACHE_NAME = 'v1';
const urlsToCache = [
	'/',
	'/index.html',
	'/css/fireworks.css',
	'/manifest.json',
	'/images/big-glow.png',
	'/images/fireworks-icon192x192.png',
	'/images/nightsky.png',
	'/images/small-glow.png',
	'/js/fireworks.js',
	'/js/requestanimframe.js'
];

self.addEventListener('install', el => {
	self.skipWaiting();
	el.waitUntil(
		caches.open(CACHE_NAME)
		.then(cache => {
			return cache.addAll(urlsToCache);
		})
	)
})

self.addEventListener('activate', el => {
	el.waitUntil(
		caches.keys()
      .then(keylist => {
        return Promise.all(keylist.map(key => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
	)
})

self.addEventListener('fetch', el => {
	el.respondWith(
		caches.open(CACHE_NAME).then(cache => {
        return cache.match(el.request).then(response => {
          return response || fetch(el.request).then(response => {
            cache.put(el.request, response.clone());
            return response;
          });
        });
      })
	);
})