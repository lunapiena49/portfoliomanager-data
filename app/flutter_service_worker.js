'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "6bc0267a3e6834073e49f271e0774de5",
"assets/AssetManifest.bin.json": "5ef9f59a945136b6dd139e591d466265",
"assets/AssetManifest.json": "8081c8f8287978f538cd474584ad608a",
"assets/assets/fonts/Inter-Bold.ttf": "f77ce9588dccbc52fdbf0b79f0d63714",
"assets/assets/fonts/Inter-Medium.ttf": "8540f35bf8acd509b9ce356f1111e983",
"assets/assets/fonts/Inter-Regular.ttf": "37dcabff629c3690303739be2e0b3524",
"assets/assets/fonts/Inter-SemiBold.ttf": "e5532d993e2de30fa92422df0a8849dd",
"assets/assets/images/launcher_icon.png": "c06086663116882d9cf59a0034a55387",
"assets/assets/images/launcher_icon.svg": "7ac8dcaaa17b704e410e8c774ea483db",
"assets/assets/images/logo-plurifin.svg": "e6f26718b5da583c1fb1f7b97eee2cff",
"assets/assets/images/pluriFin-anim.json": "63bc6e0ceef722324fc2c3eb0f783f83",
"assets/assets/legal/de/disclaimer_financial.md": "78a698703ac51776856801edf2e445ee",
"assets/assets/legal/de/privacy_policy.md": "a00429c6458ed839417661f1b5fdeee1",
"assets/assets/legal/de/terms_of_service.md": "01491eda1653a14288173bdabe72f7ee",
"assets/assets/legal/en/disclaimer_financial.md": "656be3b6d1902afd4a6f8d9c8008e246",
"assets/assets/legal/en/privacy_policy.md": "bc16558919a70becdfd4f3a68bcfbab6",
"assets/assets/legal/en/terms_of_service.md": "544d026d2e9ffcc88c1564f856811c08",
"assets/assets/legal/es/disclaimer_financial.md": "31e8096a6338b18032a284204fc6a616",
"assets/assets/legal/es/privacy_policy.md": "de08ba8c16da4a477bafad72aac83327",
"assets/assets/legal/es/terms_of_service.md": "a8787fb6cc92eacf04beed3f24fbb0d3",
"assets/assets/legal/fr/disclaimer_financial.md": "1a004bcfabed62c1f32a91a4ac67d8fb",
"assets/assets/legal/fr/privacy_policy.md": "2c52c992a60a1b5af712ff3477d9df2a",
"assets/assets/legal/fr/terms_of_service.md": "bc76e80d1c4b66ab561b335272c8deb3",
"assets/assets/legal/it/disclaimer_financial.md": "801dbb0e1c4b9df98708822b61b34053",
"assets/assets/legal/it/privacy_policy.md": "8a3a925e1c894a3cccc76f4c011069d0",
"assets/assets/legal/it/terms_of_service.md": "87a532df5e25fe86358a03eb9e1ecaff",
"assets/assets/legal/pt/disclaimer_financial.md": "f2d28ac14b8eb612527f742c37d5ed69",
"assets/assets/legal/pt/privacy_policy.md": "96ce0e8201b763bfbede961019458852",
"assets/assets/legal/pt/terms_of_service.md": "51b7a9c48239efcca753c9927aefa0b2",
"assets/assets/translations/de.json": "865e0dc2bc99fe37913547a5a16d1d48",
"assets/assets/translations/en.json": "717071f1e261bd4fec53b3f9f7ec77c1",
"assets/assets/translations/es.json": "20e70f03fba68122818c6d62265373b1",
"assets/assets/translations/fr.json": "c114b68806ae5ea6d816ee73710163d6",
"assets/assets/translations/it.json": "97d46f449204e9a421e15fbbeac32f14",
"assets/assets/translations/pt.json": "16325fae9b57a714f4d7ac6e81c68a59",
"assets/FontManifest.json": "29fc9d88476f2959ecaa0e083a38bc99",
"assets/fonts/MaterialIcons-Regular.otf": "68537e3cda217b7532dedb131a8866ed",
"assets/NOTICES": "934db2a9312b8d90d42a32895e74b678",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b",
"favicon.png": "880c9550c4ea3f6d9a9de79b2ce50c53",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "9b7c9c34ab8a212752bd7c910493140f",
"icons/Icon-192.png": "e0b043f55c8c88eaf234a96958f97d0f",
"icons/Icon-512.png": "0278179c364b93345c6a5aef1771ae8b",
"icons/Icon-maskable-192.png": "e0b043f55c8c88eaf234a96958f97d0f",
"icons/Icon-maskable-512.png": "0278179c364b93345c6a5aef1771ae8b",
"index.html": "b54d447d2a984dac57f63c5f4afe37bc",
"/": "b54d447d2a984dac57f63c5f4afe37bc",
"main.dart.js": "fb02e2257d00e3f381de0d18851330ea",
"manifest.json": "3601dfb48010425721859f0f20b385cf",
"version.json": "e01c9ccc268d474fc3c7919ecc454b29"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
