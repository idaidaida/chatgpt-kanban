self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('kanban-cache').then((cache) => {
        return cache.addAll([
          '/',
          'index.html',
          'styles.css',
          'scripts.js',
          'fish_tako.png',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
          'https://code.jquery.com/jquery-3.6.0.min.js',
          'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js',
          'https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  