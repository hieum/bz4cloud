define(["require","../persistenceUtils","../persistenceStoreManager","./defaultCacheHandler","./logger"],function(a,b,c,d,e){"use strict";function f(a,b,c){Object.defineProperty(this,"_eventListeners",{value:[],writable:!0}),Object.defineProperty(this,"_isOnline",{value:a}),Object.defineProperty(this,"_browserFetch",{value:b}),Object.defineProperty(this,"_cache",{value:c})}function g(a){var b=a;return l().then(function(a){return m(a)}).then(function(a){return b._readingSyncLog=null,a})}function h(a,b){var c=a,d=c._options.preflightOptionsRequest,f=c._options.preflightOptionsRequestTimeout;if(null!=b.url&&"disabled"!=d&&null!=b.url.match(d)){if(e.log("Offline Persistence Toolkit PersistenceSyncManager: Checking URL based on preflightOptionsRequest"),c._pingedURLs){if(c._pingedURLs.indexOf(b.url)>=0)return Promise.resolve(!0)}else c._pingedURLs=[];return c._preflightOptionsRequestId=(new Date).getTime(),new Promise(function(a){return function(d,e){c._repliedOptionsRequest=!1;var g=new Request(b.url,{method:"OPTIONS"}),h=6e4;null!=f&&(h=f),setTimeout(function(){c._repliedOptionsRequest||c._preflightOptionsRequestId!=a||e(!1)},h),c._browserFetch(g).then(function(a){c._repliedOptionsRequest=!0,c._pingedURLs||(c._pingedURLs=[]),c._pingedURLs.push(b.url),d(!0)},function(a){c._repliedOptionsRequest=!0,d(!0)})}}(c._preflightOptionsRequestId))}return Promise.resolve(!0)}function i(a){return a=a||{},"stop"===a.action}function j(a){if(a&&a.length>0){var b,c,d=[];for(b=0;b<a.length;b++)c=a[b].request,"GET"!=c.method&&"HEAD"!=c.method&&d.push(a[b]);for(b=0;b<a.length;b++)c=a[b].request,"GET"!=c.method&&"HEAD"!=c.method||d.push(a[b]);return d}return a}function k(a,b){return{requestId:a,request:b,undo:function(){return q(a)},redo:function(){return p(a)}}}function l(){return w().then(function(a){return a.find(o())})}function m(a){var c,d,e=[],f=function(a){return a&&0!=a.length?(c=a[0].metadata.created.toString(),d=a[0].value,b.requestFromJSON(d).then(function(b){return e.push(k(c,b)),a.shift(),f(a)})):Promise.resolve(e)};return f(a)}function n(a,b){return a.getSyncLog().then(function(a){var c,d=a.length;for(c=0;c<d;c++)if(a[c].requestId===b)return a[c].request})}function o(){var a={},b=[],c=[];c.push("metadata.created"),a.sort=c,b.push("metadata.created"),b.push("value"),a.fields=b;var d={},e={};return e.$exists=!0,d["metadata.created"]=e,a.selector=d,a}function p(a){return x().then(function(b){return b.findByKey(a)}).then(function(a){return null!=a&&r(a,!1).then(function(){return!0})})}function q(a){return x().then(function(b){return b.findByKey(a)}).then(function(a){return null!=a&&r(a,!0).then(function(){return!0})})}function r(a,b){var d,e,f,g,h,i=[];a instanceof Array||(a=[a]);var j=a.length,k=function(l){if(!(l<j))return Promise.resolve();if(f=a[l].storeName,e=a[l].operation,g=a[l].undoRedoData,"upsert"==e||"remove"==e&&b){for(i=[],h=g.length,d=0;d<h;d++)b?i.push({key:g[d].key,value:g[d].undo}):i.push({key:g[d].key,value:g[d].redo});return c.openStore(f).then(function(a){return 1==i.length&&null==i[0].value&&null!=i[0].key?a.removeByKey(i[0].key).then(function(){return k(++l)}):a.upsertAll(i).then(function(){return k(++l)})})}return"remove"==e?c.openStore(f).then(function(a){return a.removeByKey(g[0].key).then(function(){return k(++l)})}):void 0};return k(0)}function s(a,b,c,d){return u(c,a._eventListeners.filter(t(b,d)))}function t(a,b){return function(c){return a.toLowerCase()==c.type&&(null!=b&&b.match(c.scope)||null==b||null==c.scope)}}function u(a,b){return b.length>0?b[0].listener(a).then(function(a){return null!=a?Promise.resolve(a):b.length>1?u(b.slice(1)):void 0}):Promise.resolve(null)}function v(a){var b={index:["metadata.created"]};return c.openStore(a,b)}function w(){return v("syncLog")}function x(){return v("redoUndoLog")}return f.prototype.addEventListener=function(a,b,c){e.log("Offline Persistence Toolkit PersistenceSyncManager: addEventListener() for type: "+a+" and scope: "+c),this._eventListeners.push({type:a.toLowerCase(),listener:b,scope:c})},f.prototype.removeEventListener=function(a,b,c){e.log("Offline Persistence Toolkit PersistenceSyncManager: removeEventListener() for type: "+a+" and scope: "+c),this._eventListeners=this._eventListeners.filter(function(d){return a.toLowerCase()!=d.type||b!=d.listener||c!=d.scope})},f.prototype.getSyncLog=function(){return e.log("Offline Persistence Toolkit PersistenceSyncManager: getSyncLog()"),this._readingSyncLog||(this._readingSyncLog=g(this)),this._readingSyncLog},f.prototype.insertRequest=function(a,c){e.log("Offline Persistence Toolkit PersistenceSyncManager: insertRequest() for Request with url: "+a.url);var f={};return w().then(function(c){return f.store=c,b.requestToJSON(a,{_noClone:!0})}).then(function(b){return f.requestData=b,f.metadata=d.constructMetadata(a),f.requestId=f.metadata.created.toString(),f.store.upsert(f.requestId,f.metadata,f.requestData)}).then(function(){if(null!=c){var a=c.undoRedoDataArray;return null!=a?x().then(function(b){var c=function(d){return d<a.length&&null!=a[d]?b.upsert(f.requestId,f.metadata,a[d]).then(function(){return c(++d)}):Promise.resolve()};return c(0)}):Promise.resolve()}return Promise.resolve()})},f.prototype.removeRequest=function(a){e.log("Offline Persistence Toolkit PersistenceSyncManager: removeRequest() for Request with requestId: "+a);var b=this,c={};return w().then(function(d){return c.store=d,n(b,a)}).then(function(b){return c.request=b,c.store.removeByKey(a)}).then(function(){return x()}).then(function(b){return b.removeByKey(a)}).then(function(){return c.request})},f.prototype.updateRequest=function(a,c){return e.log("Offline Persistence Toolkit PersistenceSyncManager: updateRequest() for Request with requestId: "+a),Promise.all([w(),b.requestToJSON(c)]).then(function(b){var e=b[0],f=b[1],g=d.constructMetadata(c);return e.upsert(a,g,f)})},f.prototype.sync=function(a){e.log("Offline Persistence Toolkit PersistenceSyncManager: sync()"),this._options=a||{};var c=this;return this._syncing?Promise.reject("Cannot start sync while sync is in progress"):(this._syncing=!0,new Promise(function(a,d){c.getSyncLog().then(function(f){if(c._isOnline()){e.log("Offline Persistence Toolkit PersistenceSyncManager: Processing sync, is online");var g,k,l,m,n=function(f){0==f.length&&(e.log("Offline Persistence Toolkit PersistenceSyncManager: Sync finished, no requests in sync log"),a()),f.length>0&&(e.log("Offline Persistence Toolkit PersistenceSyncManager: Processing sync, # of request in sync log: "+f.length),g=f[0].requestId,k=f[0].request,l=k.clone(),e.log("Offline Persistence Toolkit PersistenceSyncManager: Dispatching beforeSyncRequest event"),s(c,"beforeSyncRequest",{requestId:g,request:l.clone()},k.url).then(function(j){if(i(j))return e.log("Offline Persistence Toolkit PersistenceSyncManager: Sync stopped by beforeSyncRequest event listener"),void a();j=j||{},"skip"!==j.action?("replay"===j.action&&(e.log("Offline Persistence Toolkit PersistenceSyncManager: Replay request from beforeSyncRequest event listener"),k=j.request),l=k.clone(),h(c,k).then(function(){e.log("Offline Persistence Toolkit PersistenceSyncManager: Replaying request with url: "+k.url),c._browserFetch(k).then(function(h){if((m=h.status)>=400)return void d({error:h.statusText,requestId:g,request:l.clone(),response:h.clone()});b._cloneResponse(h,{url:k.url}).then(function(h){e.log("Offline Persistence Toolkit PersistenceSyncManager: Dispatching syncRequest event"),s(c,"syncRequest",{requestId:g,request:l.clone(),response:h.clone()},k.url).then(function(j){i(j)?a():(e.log("Offline Persistence Toolkit PersistenceSyncManager: Removing replayed request"),c.removeRequest(g).then(function(){f.shift(),"GET"==k.method||"HEAD"==k.method?b._cloneResponse(h,{url:k.url}).then(function(a){c._cache().put(k,a).then(function(){e.log("Offline Persistence Toolkit PersistenceSyncManager: Replayed request/response is cached."),n(f)})}):n(f)},function(a){d({error:a,requestId:g,request:l.clone()})}))})})},function(a){d({error:a,requestId:g,request:l.clone()})})},function(a){if(!1===a){var b={status:504,statusText:"Preflight OPTIONS request timed out"};d({error:"Preflight OPTIONS request timed out",requestId:g,request:l.clone(),response:new Response(null,b)})}else d({error:a,requestId:g,request:l.clone()})})):(e.log("Offline Persistence Toolkit PersistenceSyncManager: Removing skipped request"),c.removeRequest(g).then(function(){f.shift(),n(f)},function(a){d({error:a,requestId:g,request:l.clone()})}))}))};f=j(f),n(f)}else a()})}).then(function(a){return c._syncing=!1,c._pingedURLs=null,a},function(a){return c._syncing=!1,c._pingedURLs=null,Promise.reject(a)}))},f});
//# sourceMappingURL=PersistenceSyncManager.js.map