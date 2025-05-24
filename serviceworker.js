const CACHE_NAME = 'my-cache-v1';
const FILES_TO_CACHE = [
  'caisse.html',
  'gaza-telecom.html',
  'home.html',
  'index.html',
  'logo.png',
  'mahfoud.html',
  'pay.html'
];

// تثبيت Service Worker وتخزين الملفات في الكاش
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// جلب الملفات من الكاش عند الطلب
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // إذا وُجد الملف في الكاش، يتم إرجاعه، وإلا يتم تحميله من الإنترنت
      return response || fetch(e.request);
    })
  );
});