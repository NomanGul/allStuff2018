const CACHE_NAME = 'myCache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/fb.jpg',
  '/544501.png',
  '/blue-hd-clipart-1080p-5.jpg',
  '/3D LOGO.jpg',
  '/hd-wallpapers-night-6.jpg',
  'Night_Sky_Stars_Tent_Camping_wallpaper.jpg',
  'web_developer_wallpaper__code__by_plusjack-d7bmt54.x72725.jpg',
  'cartoon 17(1) as Smart Object-1.jpg'
]

self.addEventListener('install', event => {
  console.log('[serviceWorker] installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('[serviceWorker] precaching app shell', cache);
      return cache.addAll(urlsToCache);
    })
    .catch(err => console.log('[serviceWorker] installing failed', err))
  )
});

self.addEventListener('activate', event => {
  console.log('[serviceWorker] activated', event);
  event.waitUntil(
    caches.keys()
    .then( keylist => {
      return new Promise.all(keylist.map(key => {
        if (key !== CACHE_NAME) {
          console.log('[serviceWorker] deleting old cache', key);
          return caches.delete(key);
        }
      }));
    })
  )
});

self.addEventListener('fetch', event => {
    console.log('[serviceWorker] fetching something', event);
    event.respondWith(
      event.waitUntil(
        caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
      )
    )
});
