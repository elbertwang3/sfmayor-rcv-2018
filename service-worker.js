"use strict";var precacheConfig=[["/index.html","fa30e13f702b7f93fd67d5eefe8b65e3"],["/static/css/main.9375b7f1.css","49fb6a5e73207959cdd93135cf5ab1f6"],["/static/js/main.0522c5ac.js","b0c3df3a8dbc621bc1b3a33a3329d477"],["/static/media/crimson-text-v8-latin-regular.0f74922b.svg","0f74922b8dc6490b60ed1da489c99fd8"],["/static/media/crimson-text-v8-latin-regular.2728a412.woff","2728a4120e7021cfed536929ffb5ad92"],["/static/media/crimson-text-v8-latin-regular.6195353b.woff2","6195353b1df70e0b79679234acb4a4be"],["/static/media/crimson-text-v8-latin-regular.6392b390.ttf","6392b390bb96832f7e2a528f519a94a6"],["/static/media/crimson-text-v8-latin-regular.86401e52.eot","86401e522a9b1ab98bc83dd6367d3197"],["/static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/static/media/playfair-display-v13-latin-700.14f388c9.woff","14f388c9721a961fdda6501887d6ceff"],["/static/media/playfair-display-v13-latin-700.1ad0700e.eot","1ad0700ea052fac0bc80042c638d1e95"],["/static/media/playfair-display-v13-latin-700.1babbf16.svg","1babbf161b484449b90090b068ab8442"],["/static/media/playfair-display-v13-latin-700.4a0bd98c.ttf","4a0bd98c37a91205ecd2201136201cae"],["/static/media/playfair-display-v13-latin-700.c8c6ab6a.woff2","c8c6ab6af463c561473681a3b4621af3"],["/static/media/playfair-display-v13-latin-regular.02e026b5.svg","02e026b5ddf7001ae32e99b7a147d5c9"],["/static/media/playfair-display-v13-latin-regular.203179d1.woff2","203179d16cd511feb9d8691f27926c3b"],["/static/media/playfair-display-v13-latin-regular.275cdeb1.eot","275cdeb1f4820a4162cadddbc4b2e278"],["/static/media/playfair-display-v13-latin-regular.277557a1.woff","277557a1614d9ebf11d497c62d835f88"],["/static/media/playfair-display-v13-latin-regular.b9d5ca44.ttf","b9d5ca44583e9416ee1be00c590d02f1"],["/static/media/roboto-v18-latin-700.037d8304.woff2","037d830416495def72b7881024c14b7b"],["/static/media/roboto-v18-latin-700.376e0950.eot","376e0950b361fbd3b09508031f498de5"],["/static/media/roboto-v18-latin-700.57888be7.svg","57888be7f3e68a7050452ea3157cf4de"],["/static/media/roboto-v18-latin-700.cae5027f.ttf","cae5027f600d2a0d88ac309655618e31"],["/static/media/roboto-v18-latin-700.cf6613d1.woff","cf6613d1adf490972c557a8e318e0868"],["/static/media/roboto-v18-latin-regular.372d0cc3.ttf","372d0cc3288fe8e97df49742baefce90"],["/static/media/roboto-v18-latin-regular.5d4aeb4e.woff2","5d4aeb4e5f5ef754e307d7ffaef688bd"],["/static/media/roboto-v18-latin-regular.68889c24.eot","68889c246da2739681c1065d15a1ab0b"],["/static/media/roboto-v18-latin-regular.8681f434.svg","8681f434273fd6a267b1a16a035c5f79"],["/static/media/roboto-v18-latin-regular.bafb105b.woff","bafb105baeb22d965c70fe52ba6b49d9"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),r=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),e=urlsToCacheKeys.has(t));var r="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});