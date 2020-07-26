/*! @senthanal/largecluster@version2.3.0 */!function(r){var e={};function o(t){if(e[t])return e[t].exports;var n=e[t]={i:t,l:!1,exports:{}};return r[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=r,o.c=e,o.d=function(t,n,r){o.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(n,t){if(1&t&&(n=o(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var e in n)o.d(r,e,function(t){return n[t]}.bind(null,e));return r},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="",o(o.s=69)}([function(r,t,n){(function(t){function n(t){return t&&t.Math==Math&&t}r.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof t&&t)||Function("return this")()}).call(this,n(37))},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n){var r={}.hasOwnProperty;t.exports=function(t,n){return r.call(t,n)}},function(t,n,r){var e=r(1);t.exports=!e(function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,r){var e=r(3),o=r(17),i=r(12);t.exports=e?function(t,n,r){return o.f(t,n,i(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n,r){var e=r(13),o=r(7);t.exports=function(t){return e(o(t))}},function(t,n){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,n,r){var e=r(0),o=r(5);t.exports=function(n,r){try{o(e,n,r)}catch(t){e[n]=r}return r}},function(t,n,r){"use strict";var f=r(32);function e(t){return new o(t)}function o(t){this.options=i(Object.create(this.options),t),this.trees=new Array(this.options.maxZoom+1)}function p(t){return{type:"Feature",properties:a(t),geometry:{type:"Point",coordinates:[360*(t.x-.5),(n=t.y,r=(180-360*n)*Math.PI/180,360*Math.atan(Math.exp(r))/Math.PI-90)]}};var n,r}function a(t){var n=t.numPoints,r=1e4<=n?Math.round(n/1e3)+"k":1e3<=n?Math.round(n/100)/10+"k":n;return i(i({},t.properties),{cluster:!0,cluster_id:t.id,point_count:n,point_count_abbreviated:r})}function l(t){return t/360+.5}function h(t){var n=Math.sin(t*Math.PI/180),r=.5-.25*Math.log((1+n)/(1-n))/Math.PI;return r<0?0:1<r?1:r}function i(t,n){for(var r in n)t[r]=n[r];return t}function v(t){return t.x}function d(t){return t.y}t.exports=e,t.exports.default=e,o.prototype={options:{minZoom:0,maxZoom:16,radius:40,extent:512,nodeSize:64,log:!1,reduce:null,initial:function(){return{}},map:function(t){return t}},load:function(t){var n=this.options.log;n&&console.time("total time");var r="prepare "+t.length+" points";n&&console.time(r),this.points=t;for(var e,o,i,u=[],s=0;s<t.length;s++)t[s].geometry&&u.push((e=t[s],o=s,i=void 0,{x:l((i=e.geometry.coordinates)[0]),y:h(i[1]),zoom:1/0,id:o,parentId:-1}));this.trees[this.options.maxZoom+1]=f(u,v,d,this.options.nodeSize,Float32Array),n&&console.timeEnd(r);for(var a=this.options.maxZoom;a>=this.options.minZoom;a--){var c=+Date.now(),u=this._cluster(u,a);this.trees[a]=f(u,v,d,this.options.nodeSize,Float32Array),n&&console.log("z%d: %d clusters in %dms",a,u.length,Date.now()-c)}return n&&console.timeEnd("total time"),this},getClusters:function(t,n){if(t[0]>t[2]){var r=this.getClusters([t[0],t[1],180,t[3]],n),e=this.getClusters([-180,t[1],t[2],t[3]],n);return r.concat(e)}for(var o=this.trees[this._limitZoom(n)],i=o.range(l(t[0]),h(t[3]),l(t[2]),h(t[1])),u=[],s=0;s<i.length;s++){var a=o.points[i[s]];u.push(a.numPoints?p(a):this.points[a.id])}return u},getChildren:function(t){var n=t>>5,r=t%32,e="No cluster with the specified id.",o=this.trees[r];if(!o)throw new Error(e);var i=o.points[n];if(!i)throw new Error(e);for(var u=this.options.radius/(this.options.extent*Math.pow(2,r-1)),s=o.within(i.x,i.y,u),a=[],c=0;c<s.length;c++){var f=o.points[s[c]];f.parentId===t&&a.push(f.numPoints?p(f):this.points[f.id])}if(0===a.length)throw new Error(e);return a},getLeaves:function(t,n,r){n=n||10,r=r||0;var e=[];return this._appendLeaves(e,t,n,r,0),e},getTile:function(t,n,r){var e=this.trees[this._limitZoom(t)],o=Math.pow(2,t),i=this.options.extent,u=this.options.radius/i,s=(r-u)/o,a=(r+1+u)/o,c={features:[]};return this._addTileFeatures(e.range((n-u)/o,s,(n+1+u)/o,a),e.points,n,r,o,c),0===n&&this._addTileFeatures(e.range(1-u/o,s,1,a),e.points,o,r,o,c),n===o-1&&this._addTileFeatures(e.range(0,s,u/o,a),e.points,-1,r,o,c),c.features.length?c:null},getClusterExpansionZoom:function(t){for(var n=t%32-1;n<this.options.maxZoom;){var r=this.getChildren(t);if(n++,1!==r.length)break;t=r[0].properties.cluster_id}return n},_appendLeaves:function(t,n,r,e,o){for(var i=this.getChildren(n),u=0;u<i.length;u++){var s=i[u].properties;if(s&&s.cluster?o+s.point_count<=e?o+=s.point_count:o=this._appendLeaves(t,s.cluster_id,r,e,o):o<e?o++:t.push(i[u]),t.length===r)break}return o},_addTileFeatures:function(t,n,r,e,o,i){for(var u=0;u<t.length;u++){var s=n[t[u]];i.features.push({type:1,geometry:[[Math.round(this.options.extent*(s.x*o-r)),Math.round(this.options.extent*(s.y*o-e))]],tags:s.numPoints?a(s):this.points[s.id].properties})}},_limitZoom:function(t){return Math.max(this.options.minZoom,Math.min(t,this.options.maxZoom+1))},_cluster:function(t,n){for(var r=[],e=this.options.radius/(this.options.extent*Math.pow(2,n)),o=0;o<t.length;o++){var i=t[o];if(!(i.zoom<=n)){i.zoom=n;var u=this.trees[n+1],s=u.within(i.x,i.y,e),a=i.numPoints||1,c=i.x*a,f=i.y*a,p=null;this.options.reduce&&(p=this.options.initial(),this._accumulate(p,i));for(var l=(o<<5)+(n+1),h=0;h<s.length;h++){var v,d=u.points[s[h]];d.zoom<=n||(d.zoom=n,v=d.numPoints||1,c+=d.x*v,f+=d.y*v,a+=v,d.parentId=l,this.options.reduce&&this._accumulate(p,d))}1===a?r.push(i):(i.parentId=l,r.push({x:c/a,y:f/a,zoom:1/0,id:l,parentId:-1,numPoints:a,properties:p}))}}return r},_accumulate:function(t,n){var r=n.numPoints?n.properties:this.options.map(this.points[n.id].properties);this.options.reduce(t,r)}}},function(t,n,r){var f=r(0),p=r(11).f,l=r(5),h=r(40),v=r(8),d=r(45),y=r(54);t.exports=function(t,n){var r,e,o,i,u=t.target,s=t.global,a=t.stat,c=s?f:a?f[u]||v(u,{}):(f[u]||{}).prototype;if(c)for(r in n){if(o=n[r],e=t.noTargetGet?(i=p(c,r))&&i.value:c[r],!y(s?r:u+(a?".":"#")+r,t.forced)&&void 0!==e){if(typeof o==typeof e)continue;d(o,e)}(t.sham||e&&e.sham)&&l(o,"sham",!0),h(c,r,o,t)}}},function(t,n,r){var e=r(3),o=r(38),i=r(12),u=r(6),s=r(15),a=r(2),c=r(16),f=Object.getOwnPropertyDescriptor;n.f=e?f:function(t,n){if(t=u(t),n=s(n,!0),c)try{return f(t,n)}catch(t){}if(a(t,n))return i(!o.f.call(t,n),t[n])}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(1),o=r(14),i="".split;t.exports=e(function(){return!Object("z").propertyIsEnumerable(0)})?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var o=r(4);t.exports=function(t,n){if(!o(t))return t;var r,e;if(n&&"function"==typeof(r=t.toString)&&!o(e=r.call(t)))return e;if("function"==typeof(r=t.valueOf)&&!o(e=r.call(t)))return e;if(!n&&"function"==typeof(r=t.toString)&&!o(e=r.call(t)))return e;throw TypeError("Can't convert object to primitive value")}},function(t,n,r){var e=r(3),o=r(1),i=r(39);t.exports=!e&&!o(function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a})},function(t,n,r){var e=r(3),o=r(16),i=r(18),u=r(15),s=Object.defineProperty;n.f=e?s:function(t,n,r){if(i(t),n=u(n,!0),i(r),o)try{return s(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[n]=r.value),t}},function(t,n,r){var e=r(4);t.exports=function(t){if(!e(t))throw TypeError(String(t)+" is not an object");return t}},function(t,n,r){var e=r(20),o=Function.toString;"function"!=typeof e.inspectSource&&(e.inspectSource=function(t){return o.call(t)}),t.exports=e.inspectSource},function(t,n,r){var e=r(0),o=r(8),i="__core-js_shared__",u=e[i]||o(i,{});t.exports=u},function(t,n,r){var e=r(44),o=r(20);(t.exports=function(t,n){return o[t]||(o[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.6.5",mode:e?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++r+e).toString(36)}},function(t,n){t.exports={}},function(t,n,r){function e(t){return"function"==typeof t?t:void 0}var o=r(47),i=r(0);t.exports=function(t,n){return arguments.length<2?e(o[t])||e(i[t]):o[t]&&o[t][n]||i[t]&&i[t][n]}},function(t,n,r){var e=r(26),o=Math.min;t.exports=function(t){return 0<t?o(e(t),9007199254740991):0}},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(0<t?e:r)(t)}},function(t,n,r){var e=r(0),o=r(21),i=r(2),u=r(22),s=r(28),a=r(61),c=o("wks"),f=e.Symbol,p=a?f:f&&f.withoutSetter||u;t.exports=function(t){return i(c,t)||(s&&i(f,t)?c[t]=f[t]:c[t]=p("Symbol."+t)),c[t]}},function(t,n,r){var e=r(1);t.exports=!!Object.getOwnPropertySymbols&&!e(function(){return!String(Symbol())})},function(t,n){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},function(t,n){t.exports=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}},function(t,n){function e(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}t.exports=function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}},function(t,n,r){"use strict";var u=r(33),o=r(34),e=r(35);function i(t,n,r,e,o){n=n||s,r=r||a,o=o||Array,this.nodeSize=e||64,this.points=t,this.ids=new o(t.length),this.coords=new o(2*t.length);for(var i=0;i<t.length;i++)this.ids[i]=i,this.coords[2*i]=n(t[i]),this.coords[2*i+1]=r(t[i]);u(this.ids,this.coords,this.nodeSize,0,this.ids.length-1,0)}function s(t){return t[0]}function a(t){return t[1]}t.exports=function(t,n,r,e,o){return new i(t,n,r,e,o)},i.prototype={range:function(t,n,r,e){return o(this.ids,this.coords,t,n,r,e,this.nodeSize)},within:function(t,n,r){return e(this.ids,this.coords,t,n,r,this.nodeSize)}}},function(t,n,r){"use strict";function v(t,n,r,e,o,i){for(;e<o;){var u,s,a,c,f;600<o-e&&(u=o-e+1,s=r-e+1,a=Math.log(u),c=.5*Math.exp(2*a/3),f=.5*Math.sqrt(a*c*(u-c)/u)*(s-u/2<0?-1:1),v(t,n,r,Math.max(e,Math.floor(r-s*c/u+f)),Math.min(o,Math.floor(r+(u-s)*c/u+f)),i));var p=n[2*r+i],l=e,h=o;for(d(t,n,e,r),n[2*o+i]>p&&d(t,n,e,o);l<h;){for(d(t,n,l,h),l++,h--;n[2*l+i]<p;)l++;for(;n[2*h+i]>p;)h--}n[2*e+i]===p?d(t,n,e,h):d(t,n,++h,o),h<=r&&(e=h+1),r<=h&&(o=h-1)}}function d(t,n,r,e){o(t,r,e),o(n,2*r,2*e),o(n,2*r+1,2*e+1)}function o(t,n,r){var e=t[n];t[n]=t[r],t[r]=e}t.exports=function t(n,r,e,o,i,u){if(i-o<=e)return;var s=Math.floor((o+i)/2);v(n,r,s,o,i,u%2);t(n,r,e,o,s-1,u+1);t(n,r,e,s+1,i,u+1)}},function(t,n,r){"use strict";t.exports=function(t,n,r,e,o,i,u){var s,a,c=[0,t.length-1,0],f=[];for(;c.length;){var p=c.pop(),l=c.pop(),h=c.pop();if(l-h<=u)for(var v=h;v<=l;v++)s=n[2*v],a=n[2*v+1],r<=s&&s<=o&&e<=a&&a<=i&&f.push(t[v]);else{var d=Math.floor((h+l)/2);s=n[2*d],a=n[2*d+1],r<=s&&s<=o&&e<=a&&a<=i&&f.push(t[d]);var y=(p+1)%2;(0===p?r<=s:e<=a)&&(c.push(h),c.push(d-1),c.push(y)),(0===p?s<=o:a<=i)&&(c.push(d+1),c.push(l),c.push(y))}}return f}},function(t,n,r){"use strict";function g(t,n,r,e){var o=t-r,i=n-e;return o*o+i*i}t.exports=function(t,n,r,e,o,i){var u=[0,t.length-1,0],s=[],a=o*o;for(;u.length;){var c=u.pop(),f=u.pop(),p=u.pop();if(f-p<=i)for(var l=p;l<=f;l++)g(n[2*l],n[2*l+1],r,e)<=a&&s.push(t[l]);else{var h=Math.floor((p+f)/2),v=n[2*h],d=n[2*h+1];g(v,d,r,e)<=a&&s.push(t[h]);var y=(c+1)%2;(0===c?r-o<=v:e-o<=d)&&(u.push(p),u.push(h-1),u.push(y)),(0===c?v<=r+o:d<=e+o)&&(u.push(h+1),u.push(f),u.push(y))}}return s}},function(t,n,r){"use strict";var e=r(10),o=r(55).map,i=r(62),u=r(65),s=i("map"),a=u("map");e({target:"Array",proto:!0,forced:!s||!a},{map:function(t,n){return o(this,t,1<arguments.length?n:void 0)}})},function(t,n){var r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,n,r){"use strict";var e={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!e.call({1:2},1);n.f=i?function(t){var n=o(this,t);return!!n&&n.enumerable}:e},function(t,n,r){var e=r(0),o=r(4),i=e.document,u=o(i)&&o(i.createElement);t.exports=function(t){return u?i.createElement(t):{}}},function(t,n,r){var s=r(0),a=r(5),c=r(2),f=r(8),e=r(19),o=r(41),i=o.get,p=o.enforce,l=String(String).split("String");(t.exports=function(t,n,r,e){var o=!!e&&!!e.unsafe,i=!!e&&!!e.enumerable,u=!!e&&!!e.noTargetGet;"function"==typeof r&&("string"!=typeof n||c(r,"name")||a(r,"name",n),p(r).source=l.join("string"==typeof n?n:"")),t!==s?(o?!u&&t[n]&&(i=!0):delete t[n],i?t[n]=r:a(t,n,r)):i?t[n]=r:f(n,r)})(Function.prototype,"toString",function(){return"function"==typeof this&&i(this).source||e(this)})},function(t,n,r){var e,o,i,u,s,a,c,f,p=r(42),l=r(0),h=r(4),v=r(5),d=r(2),y=r(43),g=r(23),m=l.WeakMap;c=p?(e=new m,o=e.get,i=e.has,u=e.set,s=function(t,n){return u.call(e,t,n),n},a=function(t){return o.call(e,t)||{}},function(t){return i.call(e,t)}):(g[f=y("state")]=!0,s=function(t,n){return v(t,f,n),n},a=function(t){return d(t,f)?t[f]:{}},function(t){return d(t,f)}),t.exports={set:s,get:a,has:c,enforce:function(t){return c(t)?a(t):s(t,{})},getterFor:function(r){return function(t){var n;if(!h(t)||(n=a(t)).type!==r)throw TypeError("Incompatible receiver, "+r+" required");return n}}}},function(t,n,r){var e=r(0),o=r(19),i=e.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i))},function(t,n,r){var e=r(21),o=r(22),i=e("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,n){t.exports=!1},function(t,n,r){var s=r(2),a=r(46),c=r(11),f=r(17);t.exports=function(t,n){for(var r=a(n),e=f.f,o=c.f,i=0;i<r.length;i++){var u=r[i];s(t,u)||e(t,u,o(n,u))}}},function(t,n,r){var e=r(24),o=r(48),i=r(53),u=r(18);t.exports=e("Reflect","ownKeys")||function(t){var n=o.f(u(t)),r=i.f;return r?n.concat(r(t)):n}},function(t,n,r){var e=r(0);t.exports=e},function(t,n,r){var e=r(49),o=r(52).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return e(t,o)}},function(t,n,r){var u=r(2),s=r(6),a=r(50).indexOf,c=r(23);t.exports=function(t,n){var r,e=s(t),o=0,i=[];for(r in e)!u(c,r)&&u(e,r)&&i.push(r);for(;n.length>o;)u(e,r=n[o++])&&(~a(i,r)||i.push(r));return i}},function(t,n,r){function e(s){return function(t,n,r){var e,o=a(t),i=c(o.length),u=f(r,i);if(s&&n!=n){for(;u<i;)if((e=o[u++])!=e)return!0}else for(;u<i;u++)if((s||u in o)&&o[u]===n)return s||u||0;return!s&&-1}}var a=r(6),c=r(25),f=r(51);t.exports={includes:e(!0),indexOf:e(!1)}},function(t,n,r){var e=r(26),o=Math.max,i=Math.min;t.exports=function(t,n){var r=e(t);return r<0?o(r+n,0):i(r,n)}},function(t,n){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,n){n.f=Object.getOwnPropertySymbols},function(t,n,r){function e(t,n){var r=s[u(t)];return r==c||r!=a&&("function"==typeof n?o(n):!!n)}var o=r(1),i=/#|\.prototype\./,u=e.normalize=function(t){return String(t).replace(i,".").toLowerCase()},s=e.data={},a=e.NATIVE="N",c=e.POLYFILL="P";t.exports=e},function(t,n,r){function e(h){var v=1==h,d=2==h,y=3==h,g=4==h,m=6==h,x=5==h||m;return function(t,n,r,e){for(var o,i,u=S(t),s=w(u),a=b(n,r,3),c=M(s.length),f=0,p=e||O,l=v?p(t,c):d?p(t,0):void 0;f<c;f++)if((x||f in s)&&(i=a(o=s[f],f,u),h))if(v)l[f]=i;else if(i)switch(h){case 3:return!0;case 5:return o;case 6:return f;case 2:P.call(l,o)}else if(g)return!1;return m?-1:y||g?g:l}}var b=r(56),w=r(13),S=r(58),M=r(25),O=r(59),P=[].push;t.exports={forEach:e(0),map:e(1),filter:e(2),some:e(3),every:e(4),find:e(5),findIndex:e(6)}},function(t,n,r){var i=r(57);t.exports=function(e,o,t){if(i(e),void 0===o)return e;switch(t){case 0:return function(){return e.call(o)};case 1:return function(t){return e.call(o,t)};case 2:return function(t,n){return e.call(o,t,n)};case 3:return function(t,n,r){return e.call(o,t,n,r)}}return function(){return e.apply(o,arguments)}}},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,n,r){var e=r(7);t.exports=function(t){return Object(e(t))}},function(t,n,r){var e=r(4),o=r(60),i=r(27)("species");t.exports=function(t,n){var r;return o(t)&&("function"==typeof(r=t.constructor)&&(r===Array||o(r.prototype))||e(r)&&null===(r=r[i]))&&(r=void 0),new(void 0===r?Array:r)(0===n?0:n)}},function(t,n,r){var e=r(14);t.exports=Array.isArray||function(t){return"Array"==e(t)}},function(t,n,r){var e=r(28);t.exports=e&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},function(t,n,r){var e=r(1),o=r(27),i=r(63),u=o("species");t.exports=function(n){return 51<=i||!e(function(){var t=[];return(t.constructor={})[u]=function(){return{foo:1}},1!==t[n](Boolean).foo})}},function(t,n,r){var e,o,i=r(0),u=r(64),s=i.process,a=s&&s.versions,c=a&&a.v8;c?o=(e=c.split("."))[0]+e[1]:u&&(!(e=u.match(/Edge\/(\d+)/))||74<=e[1])&&(e=u.match(/Chrome\/(\d+)/))&&(o=e[1]),t.exports=o&&+o},function(t,n,r){var e=r(24);t.exports=e("navigator","userAgent")||""},function(t,n,r){function u(t){throw t}var s=r(3),a=r(1),c=r(2),f=Object.defineProperty,p={};t.exports=function(t,n){if(c(p,t))return p[t];var r=[][t],e=!!c(n=n||{},"ACCESSORS")&&n.ACCESSORS,o=c(n,0)?n[0]:u,i=c(n,1)?n[1]:void 0;return p[t]=!!r&&!a(function(){if(e&&!s)return!0;var t={length:-1};e?f(t,1,{enumerable:!0,get:u}):t[1]=1,r.call(t,o,i)})}},function(t,n,r){var e=r(10),o=r(67);e({global:!0,forced:parseFloat!=o},{parseFloat:o})},function(t,n,r){var e=r(0),o=r(68).trim,i=r(29),u=e.parseFloat,s=1/u(i+"-0")!=-1/0;t.exports=s?function(t){var n=o(String(t)),r=u(n);return 0===r&&"-"==n.charAt(0)?-0:r}:u},function(t,n,r){function e(r){return function(t){var n=String(o(t));return 1&r&&(n=n.replace(u,"")),2&r&&(n=n.replace(s,"")),n}}var o=r(7),i="["+r(29)+"]",u=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$");t.exports={start:e(1),end:e(2),trim:e(3)}},function(t,n,r){"use strict";r.r(n);var e=r(9),o=r.n(e),i=(r(36),r(66),r(30)),u=r.n(i),s=r(31),a=r.n(s),c=function(){function n(t){u()(this,n),this.clusterIndex=o()(t)}return a()(n,[{key:"loadPoints",value:function(t){this.clusterIndex.load(t)}},{key:"getClustersArray",value:function(t,n){return this.clusterIndex.getClusters(t,n)}}],[{key:"superclusterArrayToOlFeatures",value:function(t,n,r,e){for(var o=[],i=0;i<e.length;++i){var u=new t(new n(r.fromLonLat(e[i].geometry.coordinates.map(function(t){return parseFloat(t)}))));u.setProperties(e[i].properties),o.push(u)}return o}}]),n}(),f=null;self.addEventListener("message",function(t){var n;t.data&&t.data.isLoad&&(f=new c(t.data.options)).loadPoints(t.data.points),t.data&&t.data.isCluster&&(n=f.getClustersArray(t.data.bbox,t.data.zoom),self.postMessage({clusterArray:n}))})}]);