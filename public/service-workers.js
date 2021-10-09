//set cache name using student activities as template. 

var CACHE_NAME = "my-cache";
const DATA_CACHE_NAME = "my-data-cache";

//declaring the urls to cache. 
var cashedRoutes = [
  "/",
  "/index.js",
  "/manifest.json",
  "/styles.css",
  "/icons/icon-512x512.png",
  "/icons/icon-192x192.png",
];

//installation of our caches. 
self.addEventListener("install", function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(cashedRoutes);
      })
    );
  
    self.skipWaiting();
});

//this function handles our API calls made. 
self.addEventListener("fetch", function(event) {
    if (event.request.url.includes("/api/")) {
      event.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
          return fetch(event.request)
            .then(response => {
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }
              return response;
            })
            .catch(err => {
            });
        }).catch(err => console.log(err))
      );
    return;
  }
//this function handles cached data, and should return it to the pages. 
event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        return response;
      });
    })
  );
});

//This code block is from unit19 and is being used as a guide to help create service-workers. 
/*
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});



*/