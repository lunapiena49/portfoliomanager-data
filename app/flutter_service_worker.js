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
"assets/assets/legal/de/disclaimer_financial.md": "29b53fe6425fdfab2ee2863038d008d0",
"assets/assets/legal/de/privacy_policy.md": "144f88e64e11eb8b1a6f52e075712975",
"assets/assets/legal/de/terms_of_service.md": "adca3f60ed7a35b33cb01273d78cd3d2",
"assets/assets/legal/en/disclaimer_financial.md": "50310383e96705cd9b184bad4344c7c6",
"assets/assets/legal/en/privacy_policy.md": "e5ac43c1eda81ea08cbe97032fe1304a",
"assets/assets/legal/en/terms_of_service.md": "87064f06866fb5ceafafd20e03fa8b69",
"assets/assets/legal/es/disclaimer_financial.md": "63906a041f68bd2298a332fc7d1c36a2",
"assets/assets/legal/es/privacy_policy.md": "01bfec921577fa1a2a776da96a852a70",
"assets/assets/legal/es/terms_of_service.md": "a634499ba8c27a35b0effc8146a47ec6",
"assets/assets/legal/fr/disclaimer_financial.md": "bdd90877837bc88ac00a069a7d977ca1",
"assets/assets/legal/fr/privacy_policy.md": "3a828efb087a78c071e6d01fed36eb86",
"assets/assets/legal/fr/terms_of_service.md": "3e60b7d0c9198d3089891e3faa9a6d95",
"assets/assets/legal/it/disclaimer_financial.md": "3897cf96558ff87f72ddb61ef9084a64",
"assets/assets/legal/it/privacy_policy.md": "6d893ce0fa86b9a65e1f5c83f9c2018a",
"assets/assets/legal/it/terms_of_service.md": "30858146e60744b294fe9448269e2df3",
"assets/assets/legal/pt/disclaimer_financial.md": "0ffb9dd07428cfd857c04045ea43dcd0",
"assets/assets/legal/pt/privacy_policy.md": "904652012f3ab9cb761fb26c674921a8",
"assets/assets/legal/pt/terms_of_service.md": "197c404500143646eabad0ef259ef37a",
"assets/assets/translations/de.json": "a34a4549dbe62ff87aca147c3a5d22f7",
"assets/assets/translations/en.json": "c041e8f6dd8a01d697081efcfe7dbc57",
"assets/assets/translations/es.json": "e7d53362079e2d32960d79eb8b6cd950",
"assets/assets/translations/fr.json": "ec7c55e2924194eebca03d62e55f24b8",
"assets/assets/translations/it.json": "71de3d39d025e466326e3c7b02d0354e",
"assets/assets/translations/pt.json": "5ff039373731bdd736a49861c03539bf",
"assets/FontManifest.json": "29fc9d88476f2959ecaa0e083a38bc99",
"assets/fonts/MaterialIcons-Regular.otf": "8197ef1367911065de12f795851d981f",
"assets/NOTICES": "52d145265964891d61cf7b95358706b1",
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
"flutter_bootstrap.js": "7081fad0495938538f8777dbc1fd7726",
"icons/Icon-192.png": "e0b043f55c8c88eaf234a96958f97d0f",
"icons/Icon-512.png": "0278179c364b93345c6a5aef1771ae8b",
"icons/Icon-maskable-192.png": "e0b043f55c8c88eaf234a96958f97d0f",
"icons/Icon-maskable-512.png": "0278179c364b93345c6a5aef1771ae8b",
"index.html": "b54d447d2a984dac57f63c5f4afe37bc",
"/": "b54d447d2a984dac57f63c5f4afe37bc",
"main.dart.js": "5352918f0c78bbf4fb255d86594b83fd",
"manifest.json": "3601dfb48010425721859f0f20b385cf",
"version.json": "8cf98b67ca5a19ff276cde52ed0d63ca"};
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
