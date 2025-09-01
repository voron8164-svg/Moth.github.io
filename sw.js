// Название кеша (можно менять при обновлениях)
const CACHE_NAME = 'vrlounge-v1';

// Файлы для кеширования (обязательные)
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  // Добавьте пути к другим вашим файлам:
  // '/script.js',
  // '/images/logo.png',
];

// Установка Service Worker
self.addEventListener('install', event => {
  console.log('🟢 Service Worker установлен');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Кешируем файлы');
        return cache.addAll(urlsToCache);
      })
  );
});

// Активация и очистка старых кешей
self.addEventListener('activate', event => {
  console.log('🔵 Service Worker активирован');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Удаляем старый кеш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Перехват запросов
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем кешированную версию или делаем запрос
        return response || fetch(event.request);
      })
  );
});