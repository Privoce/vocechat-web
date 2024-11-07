(()=>{"use strict";var e={134:()=>{try{self["workbox:core:7.2.0"]&&_()}catch(e){}},226:()=>{try{self["workbox:expiration:7.2.0"]&&_()}catch(e){}},974:()=>{try{self["workbox:precaching:7.2.0"]&&_()}catch(e){}},0:()=>{try{self["workbox:routing:7.2.0"]&&_()}catch(e){}},458:()=>{try{self["workbox:strategies:7.2.0"]&&_()}catch(e){}}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}s(134);const n=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class a extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}const r=new Set;const i={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},c=e=>[i.prefix,e,i.suffix].filter((e=>e&&e.length>0)).join("-"),o=e=>e||c(i.precache),h=e=>e||c(i.runtime);function l(e,t){const s=new URL(e);for(const n of t)s.searchParams.delete(n);return s.href}let u;function d(e){e.then((()=>{}))}class f{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const p=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");function g(e){return new Promise((t=>setTimeout(t,e)))}function w(e,t){const s=t();return e.waitUntil(s),s}async function m(e,t){let s=null;if(e.url){s=new URL(e.url).origin}if(s!==self.location.origin)throw new a("cross-origin-copy-response",{origin:s});const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=t?t(r):r,c=function(){if(void 0===u){const t=new Response("");if("body"in t)try{new Response(t.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,i)}const y=(e,t)=>t.some((t=>e instanceof t));let v,b;const R=new WeakMap,x=new WeakMap,C=new WeakMap,E=new WeakMap,L=new WeakMap;let q={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return x.get(e);if("objectStoreNames"===t)return e.objectStoreNames||C.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return T(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function D(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(b||(b=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(k(this),t),T(R.get(this))}:function(...t){return T(e.apply(k(this),t))}:function(t,...s){const n=e.call(k(this),t,...s);return C.set(n,t.sort?t.sort():[t]),T(n)}}function U(e){return"function"===typeof e?D(e):(e instanceof IDBTransaction&&function(e){if(x.has(e))return;const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",r),e.removeEventListener("abort",r)},a=()=>{t(),n()},r=()=>{s(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",a),e.addEventListener("error",r),e.addEventListener("abort",r)}));x.set(e,t)}(e),y(e,v||(v=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(e,q):e)}function T(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",r)},a=()=>{t(T(e.result)),n()},r=()=>{s(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",r)}));return t.then((t=>{t instanceof IDBCursor&&R.set(t,e)})).catch((()=>{})),L.set(t,e),t}(e);if(E.has(e))return E.get(e);const t=U(e);return t!==e&&(E.set(e,t),L.set(t,e)),t}const k=e=>L.get(e);const N=["get","getKey","getAll","getAllKeys","count"],I=["put","add","delete","clear"],K=new Map;function M(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(K.get(t))return K.get(t);const s=t.replace(/FromIndex$/,""),n=t!==s,a=I.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!a&&!N.includes(s))return;const r=async function(e,...t){const r=this.transaction(e,a?"readwrite":"readonly");let i=r.store;return n&&(i=i.index(t.shift())),(await Promise.all([i[s](...t),a&&r.done]))[0]};return K.set(t,r),r}q=(e=>({...e,get:(t,s,n)=>M(t,s)||e.get(t,s,n),has:(t,s)=>!!M(t,s)||e.has(t,s)}))(q);s(226);const P="cache-entries",S=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class O{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(P,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e,{blocked:t}={}){const s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",(e=>t(e.oldVersion,e))),T(s).then((()=>{}))}(this._cacheName)}async setTimestamp(e,t){const s={url:e=S(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},n=(await this.getDb()).transaction(P,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(e){const t=await this.getDb(),s=await t.get(P,this._getId(e));return null===s||void 0===s?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let n=await s.transaction(P).store.index("timestamp").openCursor(null,"prev");const a=[];let r=0;for(;n;){const s=n.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&r>=t?a.push(n.value):r++),n=await n.continue()}const i=[];for(const c of a)await s.delete(P,c.id),i.push(c.url);return i}_getId(e){return this._cacheName+"|"+S(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:s,upgrade:n,blocking:a,terminated:r}={}){const i=indexedDB.open(e,t),c=T(i);return n&&i.addEventListener("upgradeneeded",(e=>{n(T(i.result),e.oldVersion,e.newVersion,T(i.transaction),e)})),s&&i.addEventListener("blocked",(e=>s(e.oldVersion,e.newVersion,e))),c.then((e=>{r&&e.addEventListener("close",(()=>r())),a&&e.addEventListener("versionchange",(e=>a(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),c}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class W{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new O(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const n of t)await s.delete(n,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,d(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),s=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<s}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}s(974);function A(e){if(!e)throw new a("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new a("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),r=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:r.href}}class B{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class j{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null===t||void 0===t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}s(458);function F(e){return"string"===typeof e?new Request(e):e}class H{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new f,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=F(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){const e=await t.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(i){if(i instanceof Error)throw new a("plugin-error-request-will-fetch",{thrownErrorMessage:i.message})}const r=s.clone();try{let e;e=await fetch(s,"navigate"===s.mode?void 0:this._strategy.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))e=await s({event:t,request:r,response:e});return e}catch(c){throw n&&await this.runCallbacks("fetchDidFail",{error:c,event:t,originalRequest:n.clone(),request:r.clone()}),c}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=F(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:n});s=await caches.match(r,i);for(const c of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await c({cacheName:n,matchOptions:a,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,t){const s=F(e);await g(0);const n=await this.getCacheKey(s,"write");if(!t)throw new a("cache-put-with-no-response",{url:p(n.url)});const i=await this._ensureResponseSafeToCache(t);if(!i)return!1;const{cacheName:c,matchOptions:o}=this._strategy,h=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),d=u?await async function(e,t,s,n){const a=l(t.url,s);if(t.url===a)return e.match(t,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),i=await e.keys(t,r);for(const c of i)if(a===l(c.url,s))return e.match(c,n)}(h,n.clone(),["__WB_REVISION__"],o):null;try{await h.put(n,u?i.clone():i)}catch(f){if(f instanceof Error)throw"QuotaExceededError"===f.name&&await async function(){for(const e of r)await e()}(),f}for(const a of this.iterateCallbacks("cacheDidUpdate"))await a({cacheName:c,oldResponse:d,newResponse:i.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=F(await e({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"===typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a=Object.assign(Object.assign({},n),{state:s});return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class V{constructor(e={}){this.cacheName=h(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"===typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new H(this,{event:t,request:s,params:n}),r=this._getResponse(a,s,t);return[r,this._awaitComplete(r,a,s,t)]}async _getResponse(e,t,s){let n;await e.runCallbacks("handlerWillStart",{event:s,request:t});try{if(n=await this._handle(t,e),!n||"error"===n.type)throw new a("no-response",{url:t.url})}catch(r){if(r instanceof Error)for(const a of e.iterateCallbacks("handlerDidError"))if(n=await a({error:r,event:s,request:t}),n)break;if(!n)throw r}for(const a of e.iterateCallbacks("handlerWillRespond"))n=await a({event:s,request:t,response:n});return n}async _awaitComplete(e,t,s,n){let a,r;try{a=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(i){i instanceof Error&&(r=i)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:r}),t.destroy(),r)throw r}}class $ extends V{constructor(e={}){e.cacheName=o(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push($.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const n=t.params||{};if(!this._fallbackToNetwork)throw new a("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const a=n.integrity,r=e.integrity,i=!r||r===a;if(s=await t.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||a:void 0})),a&&i&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await t.cachePut(e,s.clone());0}}return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new a("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==$.copyRedirectedCacheableResponsesPlugin&&(n===$.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push($.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}$.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},$.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await m(e):e};class G{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new $({cacheName:o(e),plugins:[...t,new j({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){"string"===typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=A(s),r="string"!==typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new a("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!==typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new a("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return w(e,(async()=>{const t=new B;this.strategy.plugins.push(t);for(const[a,r]of this._urlsToCacheKeys){const t=this._cacheKeysToIntegrities.get(r),s=this._urlsToCacheModes.get(a),n=new Request(a,{integrity:t,cache:s,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:n,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return w(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new a("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let Q;const J=()=>(Q||(Q=new G),Q);s(0);const z=e=>e&&"object"===typeof e?e:{handle:e};class X{constructor(e,t,s="GET"){this.handler=z(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=z(e)}}class Y extends X{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class Z{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"===typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const n=s.origin===location.origin,{params:a,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return void 0;let o;try{o=i.handle({url:s,request:e,event:t,params:a})}catch(l){o=Promise.reject(l)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async n=>{if(h){0;try{return await h.handle({url:s,request:e,event:t,params:a})}catch(r){r instanceof Error&&(n=r)}}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const a=this._routes.get(s.method)||[];for(const r of a){let a;const i=r.match({url:e,sameOrigin:t,request:s,event:n});if(i)return a=i,(Array.isArray(a)&&0===a.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"===typeof i)&&(a=void 0),{route:r,params:a}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,z(e))}setCatchHandler(e){this._catchHandler=z(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new a("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new a("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let ee;const te=()=>(ee||(ee=new Z,ee.addFetchListener(),ee.addCacheListener()),ee);function se(e,t,s){let n;if("string"===typeof e){const a=new URL(e,location.href);0;n=new X((({url:e})=>e.href===a.href),t,s)}else if(e instanceof RegExp)n=new Y(e,t,s);else if("function"===typeof e)n=new X(e,t,s);else{if(!(e instanceof X))throw new a("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return te().registerRoute(n),n}class ne extends X{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const a of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(a);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}const ae={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};var re;self.addEventListener("activate",(()=>self.clients.claim())),function(e){J().precache(e)}([{'revision':'5462c40a1cd4c192d14b79e9dddd2610','url':'/index.html'},{'revision':null,'url':'/static/css/16.8a09720a.chunk.css'},{'revision':null,'url':'/static/css/473.cdf1fe26.chunk.css'},{'revision':null,'url':'/static/css/666.319a0232.chunk.css'},{'revision':null,'url':'/static/css/main.ec3bee06.css'},{'revision':null,'url':'/static/css/widget.8539420c.css'},{'revision':null,'url':'/static/js/103.9f081cdc.chunk.js'},{'revision':null,'url':'/static/js/114.fb53480f.chunk.js'},{'revision':null,'url':'/static/js/122.8465e9d3.chunk.js'},{'revision':null,'url':'/static/js/16.60e05de4.chunk.js'},{'revision':null,'url':'/static/js/173.83bc5bc5.chunk.js'},{'revision':null,'url':'/static/js/189.fc237fd2.chunk.js'},{'revision':null,'url':'/static/js/194.1a8be6e8.chunk.js'},{'revision':null,'url':'/static/js/201.2aa84f16.chunk.js'},{'revision':null,'url':'/static/js/216.f346c561.chunk.js'},{'revision':null,'url':'/static/js/237.0aa35d06.chunk.js'},{'revision':null,'url':'/static/js/245.fe8f46d1.chunk.js'},{'revision':null,'url':'/static/js/25.03d0d855.chunk.js'},{'revision':null,'url':'/static/js/253.fb7a4dd4.chunk.js'},{'revision':null,'url':'/static/js/295.aa73a311.chunk.js'},{'revision':null,'url':'/static/js/310.67521d40.chunk.js'},{'revision':null,'url':'/static/js/314.23563438.chunk.js'},{'revision':null,'url':'/static/js/358.a3907e9b.chunk.js'},{'revision':null,'url':'/static/js/391.da5afc9f.chunk.js'},{'revision':null,'url':'/static/js/395.d9f3f9ea.chunk.js'},{'revision':null,'url':'/static/js/421.5e5355b7.chunk.js'},{'revision':null,'url':'/static/js/473.09561f62.chunk.js'},{'revision':null,'url':'/static/js/5.365ea41c.chunk.js'},{'revision':null,'url':'/static/js/520.c34dbdb9.chunk.js'},{'revision':null,'url':'/static/js/578.f2a68b21.chunk.js'},{'revision':null,'url':'/static/js/6.268c11b6.chunk.js'},{'revision':null,'url':'/static/js/635.0c6d7b05.chunk.js'},{'revision':null,'url':'/static/js/666.51503328.chunk.js'},{'revision':null,'url':'/static/js/738.b270d2f9.chunk.js'},{'revision':null,'url':'/static/js/75.d2181128.chunk.js'},{'revision':null,'url':'/static/js/781.29d374ab.chunk.js'},{'revision':null,'url':'/static/js/822.e9b76d48.chunk.js'},{'revision':null,'url':'/static/js/833.e0be2346.chunk.js'},{'revision':null,'url':'/static/js/948.086e4a36.chunk.js'},{'revision':null,'url':'/static/js/969.d69a3ad1.chunk.js'},{'revision':null,'url':'/static/js/993.b23ed5aa.chunk.js'},{'revision':null,'url':'/static/js/main.a1204bde.js'},{'revision':null,'url':'/static/js/widget.acb7695f.js'},{'revision':null,'url':'/static/media/edit.18de09b48249f213cf85.svg'},{'revision':null,'url':'/static/media/getFetch.c4cca45e22bc1b2c7d0d.cjs'},{'revision':null,'url':'/static/media/index.294a0edb7af7d19b781b.cjs'},{'revision':null,'url':'/static/media/index.40b335a788697b39d89d.cjs'},{'revision':null,'url':'/static/media/index.4a92f16a45a8dc264e40.cjs'},{'revision':null,'url':'/static/media/index.675293235c1d3a61a78f.cjs'},{'revision':null,'url':'/static/media/index.c05687ef19f5bac24939.cjs'},{'revision':null,'url':'/static/media/join.32e45d691d059a55188a.wav'},{'revision':null,'url':'/static/media/metamask.f04d5fb63394197766d0.svg'},{'revision':null,'url':'/static/media/more.d35b0228affb89f48593.svg'},{'revision':null,'url':'/static/media/msg.sound.2c23efd582318e940e57.wav'},{'revision':null,'url':'/static/media/picture.57a395fb7f41e8e3c5d1.svg'},{'revision':null,'url':'/static/media/play.ada446bc1d007eef6447.svg'},{'revision':null,'url':'/static/media/reaction.dfc99cbb32dd13e55782.svg'},{'revision':null,'url':'/static/media/reply.c7c79a9d5cee92f51ec5.svg'},{'revision':null,'url':'/static/media/upload.image.9f8c7fc90042d2ff4eb7.svg'},{'revision':'1bc966bbf8a4f5fe205e7077ba2d2469','url':'/widget.html'}]),function(e){const t=J();se(new ne(t,e))}(re);const ie=new RegExp("/[^/?]+\\.[^/]+$");var ce;se((({request:e,url:t})=>{if("navigate"!==e.mode)return!1;const s=t.pathname;return!(s.startsWith("/_")||s.startsWith("/VERSION")||s.startsWith("/api")||s.startsWith("/locales/")||s.startsWith("/widget"))&&!s.match(ie)}),(ce="/index.html",J().createHandlerBoundToURL(ce))),se((({url:e})=>e.origin===self.location.origin&&e.pathname.endsWith(".png")),new class extends V{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(ae)}async _handle(e,t){const s=t.fetchAndCachePut(e).catch((()=>{}));t.waitUntil(s);let n,r=await t.cacheMatch(e);if(r)0;else{0;try{r=await s}catch(i){i instanceof Error&&(n=i)}}if(!r)throw new a("no-response",{url:e.url,error:n});return r}}({cacheName:"images",plugins:[new class{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),r=this._getCacheExpiration(s);d(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(c){0}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&function(e){r.add(e)}((()=>this.deleteCacheAndMetadata()))}_getCacheExpiration(e){if(e===h())throw new a("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new W(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:50})]})),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}))})();