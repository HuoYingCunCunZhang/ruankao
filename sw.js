/* 绂荤嚎缂撳瓨锛氬畨瑁呭悗鍗充娇鏂綉涔熻兘鎵撳紑 */
const CACHE = "dsj-bkzs-v6";
const ASSETS = [
  "./",
  "./index.html",
  "./knowledge.html",
  "./content.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-180.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // 椤甸潰瀵艰埅锛氱綉缁滀紭鍏堬紝澶辫触鍥為€€缂撳瓨锛堜繚璇佸唴瀹规洿鏂板強鏃剁敓鏁堬級
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // 闈欐€佽祫婧愶細缂撳瓨浼樺厛 + 鍚庡彴鏇存柊锛坰tale-while-revalidate锛?
  e.respondWith(
    caches.match(req).then((hit) => {
      const refresh = fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || refresh;
    })
  );
});

