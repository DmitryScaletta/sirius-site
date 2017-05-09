"use strict";var MoveTo=function(){function e(e,t,n,o){return e/=o,e--,-n*(e*e*e*e-1)+t}function t(e){for(var t=0,n=0;e;)t+=e.offsetTop,n+=e.offsetLeft,e=e.offsetParent;return{top:t,left:n}}function n(e,t){var n={};return Object.keys(e).forEach(function(t){n[t]=e[t]}),Object.keys(t).forEach(function(e){n[e]=t[e]}),n}function o(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})}function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.options=n(i,t),this.easeFunctions=n({easeOutQuart:e},o)}function a(e,t){var n={};return Object.keys(t).forEach(function(t){var r=e.getAttribute("data-mt-"+o(t));r&&(n[t]=isNaN(r)?r:parseInt(r,10))}),n}var i={tolerance:0,duration:800,easing:"easeOutQuart",callback:function(){}};return r.prototype.registerTrigger=function(e,t){var o=this;if(e){var r=e.getAttribute("href")||e.getAttribute("data-target"),i=r&&"#"!==r?document.getElementById(r.substring(1)):0,s=n(this.options,a(e,this.options));"function"==typeof t&&(s.callback=t);var c=function(e){e.preventDefault(),o.move(i,s)};return e.addEventListener("click",c,!1),function(){return e.removeEventListener("click",c,!1)}}},r.prototype.move=function(e){var o=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(0===e||e){r=n(this.options,r);var a="number"==typeof e?e:t(e).top,i=window.pageYOffset;a-=r.tolerance;var s=a-i,c=null,u=void 0,d=function t(n){var d=window.pageYOffset;c||(c=n-1);var f=n-c;if(u&&(s>0&&u>d||s<0&&u<d))return r.callback(e);u=d;var l=o.easeFunctions[r.easing](f,i,s,r.duration);window.scroll(0,l),f<r.duration?window.requestAnimationFrame(t):(window.scroll(0,a),r.callback(e))};window.requestAnimationFrame(d)}},r.prototype.addEaseFunction=function(e,t){this.easeFunctions[e]=t},r}();"undefined"!=typeof module?module.exports=MoveTo:window.MoveTo=MoveTo,document.getElementById("navbar-toggler").addEventListener("click",function(){document.getElementById("nav").classList.toggle("header__nav--expanded"),document.getElementById("header-address").classList.toggle("header__address--expanded"),document.getElementById("header-contacts").classList.toggle("header__contacts--expanded"),document.getElementById("header-buttons").classList.toggle("header__buttons--expanded")});var moveTo=new MoveTo;moveTo.registerTrigger(document.getElementById("button-up"));