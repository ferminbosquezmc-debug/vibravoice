/* VibraVoice: funciona sin internet después de la primera visita */
const CACHE="vibravoice-v1";
const SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET")return;
  const url=new URL(r.url);
  // La página: primero internet (para recibir actualizaciones), si no hay, la copia guardada
  if(r.mode==="navigate"){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put("index.html",cp));return res})
      .catch(()=>caches.match("index.html")));
    return;
  }
  // Archivos propios, tipografías y librerías: copia guardada al instante y se actualiza en segundo plano
  const ok=url.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$|cdnjs\.cloudflare\.com$|cdn\.jsdelivr\.net$|unpkg\.com$/.test(url.hostname);
  if(!ok)return;
  e.respondWith(caches.open(CACHE).then(c=>c.match(r).then(hit=>{
    const net=fetch(r).then(res=>{if(res.ok||res.type==="opaque")c.put(r,res.clone());return res}).catch(()=>hit);
    return hit||net;
  })));
});
