'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "fe23dbe0937b20f47f611e4cd1e86443",
"assets/AssetManifest.bin.json": "81828e82a8cfa7d20da9dc580b41c2d4",
"assets/AssetManifest.json": "badf24f5de38dd1a70b1950e5b75cfb9",
"assets/assets/fonts/Inter-Bold.ttf": "f77ce9588dccbc52fdbf0b79f0d63714",
"assets/assets/fonts/Inter-Medium.ttf": "8540f35bf8acd509b9ce356f1111e983",
"assets/assets/fonts/Inter-Regular.ttf": "37dcabff629c3690303739be2e0b3524",
"assets/assets/fonts/Inter-SemiBold.ttf": "e5532d993e2de30fa92422df0a8849dd",
"assets/assets/images/launcher_icon.png": "6133188b47c6452717ea78721ae39256",
"assets/assets/images/logo-plurifin.svg": "a553094f7611c533a82c244fcfbbe390",
"assets/assets/images/pluriFin-anim.json": "a19a3c42af7733f52562954707ef5742",
"assets/assets/legal/de/disclaimer_financial.md": "f033d8d4009ee716ffbe18d2e24b9ada",
"assets/assets/legal/de/privacy_policy.md": "a60127feb9c01eef7929bfa7b2db29dd",
"assets/assets/legal/de/terms_of_service.md": "ec543a126ee95d83e9b892515478bc74",
"assets/assets/legal/en/disclaimer_financial.md": "656be3b6d1902afd4a6f8d9c8008e246",
"assets/assets/legal/en/privacy_policy.md": "c815e64f568d3d5320676db318188bec",
"assets/assets/legal/en/terms_of_service.md": "f28d6638039e9c7bd00f164eb1b2aba2",
"assets/assets/legal/es/disclaimer_financial.md": "cda51203a10d5fc93f4c555e6cd533bb",
"assets/assets/legal/es/privacy_policy.md": "554ac88c833eaa4c77cead66331e3b45",
"assets/assets/legal/es/terms_of_service.md": "bec9a66a5a25e9cf687094bce5f11250",
"assets/assets/legal/fr/disclaimer_financial.md": "c0b5314099d5ce9bd778e6be217ac38e",
"assets/assets/legal/fr/privacy_policy.md": "6a9a3cd7eb9b93e7401073e299e5e57c",
"assets/assets/legal/fr/terms_of_service.md": "5c9dad5a9dde0025d7aa9eccadae724b",
"assets/assets/legal/it/disclaimer_financial.md": "801dbb0e1c4b9df98708822b61b34053",
"assets/assets/legal/it/privacy_policy.md": "e8b1e16ac08158b6348af50c3e1331f5",
"assets/assets/legal/it/terms_of_service.md": "e873d010b6caa1c10b6cc559ca5c76d9",
"assets/assets/legal/pt/disclaimer_financial.md": "92b7c99d54469073428d50763b16131c",
"assets/assets/legal/pt/privacy_policy.md": "3080c695f694104083ff324dc83a92b1",
"assets/assets/legal/pt/terms_of_service.md": "70f8aa421a68baa99e39cad9344aff31",
"assets/assets/translations/de.json": "66017db3dbed6a16dc7f414768af321d",
"assets/assets/translations/en.json": "78a98af301ea0a68d909b616b3c58f2a",
"assets/assets/translations/es.json": "11a0b2754cbb1c2968c25c5d8f4062f3",
"assets/assets/translations/fr.json": "fc2a8c56b1c7cf46be81da2a6acbd575",
"assets/assets/translations/it.json": "71d40ed7c30d18d6f04f1cb17f1c4d11",
"assets/assets/translations/pt.json": "2c0110afa90f5feb3da6641a0b77970c",
"assets/FontManifest.json": "29fc9d88476f2959ecaa0e083a38bc99",
"assets/fonts/MaterialIcons-Regular.otf": "762fdc791e1277fa9008c4ad7f19f111",
"assets/NOTICES": "4fc286a3a7354a7025e282877f8527ac",
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
"favicon.png": "0d3e2076473fc5aa48070aab851bf5cd",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "192dcd5f2409c46cabce6076d552572f",
"icons/Icon-192.png": "fe4809432eb00a13705ef482c3cd0717",
"icons/Icon-512.png": "077230eee3cf9b1a61f24a22ddb59f33",
"icons/Icon-maskable-192.png": "fe4809432eb00a13705ef482c3cd0717",
"icons/Icon-maskable-512.png": "077230eee3cf9b1a61f24a22ddb59f33",
"index.html": "6c98f7057a740c5118ddc0e9f1583409",
"/": "6c98f7057a740c5118ddc0e9f1583409",
"main.dart.js": "be4727aa8aed80ba2141cebd33717e92",
"manifest.json": "d4a363990e5445c71a27edf07d9504ce",
"version.json": "43b3c72f225d788759e0a21ab1cc7eb8"};
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
