!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.memoizerific=t()}}(function(){var t,e,i;return function t(e,i,s){function r(o,a){if(!i[o]){if(!e[o]){var l="function"==typeof require&&require;if(!a&&l)return l(o,!0);if(n)return n(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var f=i[o]={exports:{}};e[o][0].call(f.exports,function(t){var i=e[o][1][t];return r(i?i:t)},f,f.exports,t,e,i,s)}return i[o].exports}for(var n="function"==typeof require&&require,o=0;o<s.length;o++)r(s[o]);return r}({1:[function(t,e,i){e.exports=function(e){if("function"!=typeof Map||e){var i=t("./similar");return new i}return new Map}},{"./similar":2}],2:[function(t,e,i){function s(){return this.list=[],this.lastItem=void 0,this.size=0,this}s.prototype.get=function(t){var e;return this.lastItem&&this.isEqual(this.lastItem.key,t)?this.lastItem.val:(e=this.indexOf(t),e>=0?(this.lastItem=this.list[e],this.list[e].val):void 0)},s.prototype.set=function(t,e){var i;return this.lastItem&&this.isEqual(this.lastItem.key,t)?(this.lastItem.val=e,this):(i=this.indexOf(t),i>=0?(this.lastItem=this.list[i],this.list[i].val=e,this):(this.lastItem={key:t,val:e},this.list.push(this.lastItem),this.size++,this))},s.prototype.delete=function(t){var e;if(this.lastItem&&this.isEqual(this.lastItem.key,t)&&(this.lastItem=void 0),e=this.indexOf(t),e>=0)return this.size--,this.list.splice(e,1)[0]},s.prototype.has=function(t){var e;return!(!this.lastItem||!this.isEqual(this.lastItem.key,t))||(e=this.indexOf(t),e>=0&&(this.lastItem=this.list[e],!0))},s.prototype.forEach=function(t,e){var i;for(i=0;i<this.size;i++)t.call(e||this,this.list[i].val,this.list[i].key,this)},s.prototype.indexOf=function(t){var e;for(e=0;e<this.size;e++)if(this.isEqual(this.list[e].key,t))return e;return-1},s.prototype.isEqual=function(t,e){return t===e||t!==t&&e!==e},e.exports=s},{}],3:[function(t,e,i){function s(t,e){var i=t.length,s=e.length,r,o,a;for(o=0;o<i;o++){for(r=!0,a=0;a<s;a++)if(!n(t[o][a].arg,e[a].arg)){r=!1;break}if(r)break}t.push(t.splice(o,1)[0])}function r(t){var e=t.length,i=t[e-1],s,r;for(i.cacheItem.delete(i.arg),r=e-2;r>=0&&(i=t[r],s=i.cacheItem.get(i.arg),!s||!s.size);r--)i.cacheItem.delete(i.arg)}function n(t,e){return t===e||t!==t&&e!==e}var o=t("map-or-similar");e.exports=function(t){var e=new o(!1),i=[];return function(n){var a=function(){var l=e,u,f,h=arguments.length-1,c=Array(h+1),m=!0,p;if((a.numArgs||0===a.numArgs)&&a.numArgs!==h+1)throw new Error("Memoizerific functions should always be called with the same number of arguments");for(p=0;p<h;p++)c[p]={cacheItem:l,arg:arguments[p]},l.has(arguments[p])?l=l.get(arguments[p]):(m=!1,u=new o(!1),l.set(arguments[p],u),l=u);return m&&(l.has(arguments[h])?f=l.get(arguments[h]):m=!1),m||(f=n.apply(null,arguments),l.set(arguments[h],f)),t>0&&(c[h]={cacheItem:l,arg:arguments[h]},m?s(i,c):i.push(c),i.length>t&&r(i.shift())),a.wasMemoized=m,a.numArgs=h+1,f};return a.limit=t,a.wasMemoized=!1,a.cache=e,a.lru=i,a}}},{"map-or-similar":1}]},{},[3])(3)});
