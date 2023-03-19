self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('kanban-cache').then((cache) => {
        return cache.addAll([
          '/chatgpt-kanban/kanban-chatgpt4/',
          '/chatgpt-kanban/kanban-chatgpt4/index.html',
          '/chatgpt-kanban/kanban-chatgpt4/styles.css',
          '/chatgpt-kanban/kanban-chatgpt4/scripts.js',
          '/chatgpt-kanban/kanban-chatgpt4/fish_tako.png',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
          'https://cdn.jsdelivr.net/gh/jquery/jquery/dist/jquery.min.js',
          'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js',
          'https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js',
          'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
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
  