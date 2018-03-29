var version = 'v2';

self.addEventListener("install", function(event) {  //this portion shouldn't delete anything from cache since it might be in use
    
    event.waitUntil(caches.open("necessaryFiles" + version).then(function(cache){return cache.addAll([
            '/',
            'index.css',
            'index.js',
            'index.html'
          ]);
        })
    );
  });

self.addEventListener("fetch", function(event) {

    if (event.request.method !== 'GET') {
      console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
      return;
    }
  
    event.respondWith(
      caches
        .match(event.request)
        .then(function(cached) {
          var networked = fetch(event.request)
            .then(fetchedFromNetwork, unableToResolve)
            .catch(unableToResolve);
          console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
          return cached || networked;
  
          function fetchedFromNetwork(response) {
            var cacheCopy = response.clone();
  
            console.log('WORKER: fetch response from network.', event.request.url);
  
            caches
              .open(version + 'pages')
              .then(function add(cache) {
                cache.put(event.request, cacheCopy);
              })
              .then(function() {
                console.log('WORKER: fetch response stored in cache.', event.request.url);
              });
            return response;
          }
          function unableToResolve () {
            console.log('WORKER: fetch request failed in both cache and network.');
            return new Response('<h1>Service Unavailable</h1>', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/html'
              })
            });
          }
        })
    );
  });

  self.addEventListener("activate", function(event) {
  
    event.waitUntil(caches.keys().then(function (keys) {
          return Promise.all(keys.filter(function (key) {
                return !key.endsWith(version);
              })
              .map(function (key) {
                return caches.delete(key);
              })
          );
        })
        );
  });