const C="zal-v5";
const CORE=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=r.url;const ok=u.startsWith(self.location.origin)||/fonts\.(googleapis|gstatic)\.com/.test(u);if(!ok)return;
  e.respondWith(caches.open(C).then(c=>c.match(r,{ignoreSearch:true}).then(m=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque"))c.put(r,res.clone());return res}).catch(()=>m);return m||net})))});
