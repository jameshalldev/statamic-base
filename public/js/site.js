/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/headroom.js/dist/headroom.js":
/*!***************************************************!*\
  !*** ./node_modules/headroom.js/dist/headroom.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * headroom.js v0.12.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2020 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, function () { 'use strict';

  function isBrowser() {
    return typeof window !== "undefined";
  }

  /**
   * Used to detect browser support for adding an event listener with options
   * Credit: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   */
  function passiveEventsSupported() {
    var supported = false;

    try {
      var options = {
        // eslint-disable-next-line getter-return
        get passive() {
          supported = true;
        }
      };
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (err) {
      supported = false;
    }

    return supported;
  }

  function isSupported() {
    return !!(
      isBrowser() &&
      function() {}.bind &&
      "classList" in document.documentElement &&
      Object.assign &&
      Object.keys &&
      requestAnimationFrame
    );
  }

  function isDocument(obj) {
    return obj.nodeType === 9; // Node.DOCUMENT_NODE === 9
  }

  function isWindow(obj) {
    // `obj === window` or `obj instanceof Window` is not sufficient,
    // as the obj may be the window of an iframe.
    return obj && obj.document && isDocument(obj.document);
  }

  function windowScroller(win) {
    var doc = win.document;
    var body = doc.body;
    var html = doc.documentElement;

    return {
      /**
       * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
       * @return {Number} the scroll height of the document in pixels
       */
      scrollHeight: function() {
        return Math.max(
          body.scrollHeight,
          html.scrollHeight,
          body.offsetHeight,
          html.offsetHeight,
          body.clientHeight,
          html.clientHeight
        );
      },

      /**
       * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
       * @return {Number} the height of the viewport in pixels
       */
      height: function() {
        return win.innerHeight || html.clientHeight || body.clientHeight;
      },

      /**
       * Gets the Y scroll position
       * @return {Number} pixels the page has scrolled along the Y-axis
       */
      scrollY: function() {
        if (win.pageYOffset !== undefined) {
          return win.pageYOffset;
        }

        return (html || body.parentNode || body).scrollTop;
      }
    };
  }

  function elementScroller(element) {
    return {
      /**
       * @return {Number} the scroll height of the element in pixels
       */
      scrollHeight: function() {
        return Math.max(
          element.scrollHeight,
          element.offsetHeight,
          element.clientHeight
        );
      },

      /**
       * @return {Number} the height of the element in pixels
       */
      height: function() {
        return Math.max(element.offsetHeight, element.clientHeight);
      },

      /**
       * Gets the Y scroll position
       * @return {Number} pixels the element has scrolled along the Y-axis
       */
      scrollY: function() {
        return element.scrollTop;
      }
    };
  }

  function createScroller(element) {
    return isWindow(element) ? windowScroller(element) : elementScroller(element);
  }

  /**
   * @param element EventTarget
   */
  function trackScroll(element, options, callback) {
    var isPassiveSupported = passiveEventsSupported();
    var rafId;
    var scrolled = false;
    var scroller = createScroller(element);
    var lastScrollY = scroller.scrollY();
    var details = {};

    function update() {
      var scrollY = Math.round(scroller.scrollY());
      var height = scroller.height();
      var scrollHeight = scroller.scrollHeight();

      // reuse object for less memory churn
      details.scrollY = scrollY;
      details.lastScrollY = lastScrollY;
      details.direction = scrollY > lastScrollY ? "down" : "up";
      details.distance = Math.abs(scrollY - lastScrollY);
      details.isOutOfBounds = scrollY < 0 || scrollY + height > scrollHeight;
      details.top = scrollY <= options.offset[details.direction];
      details.bottom = scrollY + height >= scrollHeight;
      details.toleranceExceeded =
        details.distance > options.tolerance[details.direction];

      callback(details);

      lastScrollY = scrollY;
      scrolled = false;
    }

    function handleScroll() {
      if (!scrolled) {
        scrolled = true;
        rafId = requestAnimationFrame(update);
      }
    }

    var eventOptions = isPassiveSupported
      ? { passive: true, capture: false }
      : false;

    element.addEventListener("scroll", handleScroll, eventOptions);
    update();

    return {
      destroy: function() {
        cancelAnimationFrame(rafId);
        element.removeEventListener("scroll", handleScroll, eventOptions);
      }
    };
  }

  function normalizeUpDown(t) {
    return t === Object(t) ? t : { down: t, up: t };
  }

  /**
   * UI enhancement for fixed headers.
   * Hides header when scrolling down
   * Shows header when scrolling up
   * @constructor
   * @param {DOMElement} elem the header element
   * @param {Object} options options for the widget
   */
  function Headroom(elem, options) {
    options = options || {};
    Object.assign(this, Headroom.options, options);
    this.classes = Object.assign({}, Headroom.options.classes, options.classes);

    this.elem = elem;
    this.tolerance = normalizeUpDown(this.tolerance);
    this.offset = normalizeUpDown(this.offset);
    this.initialised = false;
    this.frozen = false;
  }
  Headroom.prototype = {
    constructor: Headroom,

    /**
     * Start listening to scrolling
     * @public
     */
    init: function() {
      if (Headroom.cutsTheMustard && !this.initialised) {
        this.addClass("initial");
        this.initialised = true;

        // defer event registration to handle browser
        // potentially restoring previous scroll position
        setTimeout(
          function(self) {
            self.scrollTracker = trackScroll(
              self.scroller,
              { offset: self.offset, tolerance: self.tolerance },
              self.update.bind(self)
            );
          },
          100,
          this
        );
      }

      return this;
    },

    /**
     * Destroy the widget, clearing up after itself
     * @public
     */
    destroy: function() {
      this.initialised = false;
      Object.keys(this.classes).forEach(this.removeClass, this);
      this.scrollTracker.destroy();
    },

    /**
     * Unpin the element
     * @public
     */
    unpin: function() {
      if (this.hasClass("pinned") || !this.hasClass("unpinned")) {
        this.addClass("unpinned");
        this.removeClass("pinned");

        if (this.onUnpin) {
          this.onUnpin.call(this);
        }
      }
    },

    /**
     * Pin the element
     * @public
     */
    pin: function() {
      if (this.hasClass("unpinned")) {
        this.addClass("pinned");
        this.removeClass("unpinned");

        if (this.onPin) {
          this.onPin.call(this);
        }
      }
    },

    /**
     * Freezes the current state of the widget
     * @public
     */
    freeze: function() {
      this.frozen = true;
      this.addClass("frozen");
    },

    /**
     * Re-enables the default behaviour of the widget
     * @public
     */
    unfreeze: function() {
      this.frozen = false;
      this.removeClass("frozen");
    },

    top: function() {
      if (!this.hasClass("top")) {
        this.addClass("top");
        this.removeClass("notTop");

        if (this.onTop) {
          this.onTop.call(this);
        }
      }
    },

    notTop: function() {
      if (!this.hasClass("notTop")) {
        this.addClass("notTop");
        this.removeClass("top");

        if (this.onNotTop) {
          this.onNotTop.call(this);
        }
      }
    },

    bottom: function() {
      if (!this.hasClass("bottom")) {
        this.addClass("bottom");
        this.removeClass("notBottom");

        if (this.onBottom) {
          this.onBottom.call(this);
        }
      }
    },

    notBottom: function() {
      if (!this.hasClass("notBottom")) {
        this.addClass("notBottom");
        this.removeClass("bottom");

        if (this.onNotBottom) {
          this.onNotBottom.call(this);
        }
      }
    },

    shouldUnpin: function(details) {
      var scrollingDown = details.direction === "down";

      return scrollingDown && !details.top && details.toleranceExceeded;
    },

    shouldPin: function(details) {
      var scrollingUp = details.direction === "up";

      return (scrollingUp && details.toleranceExceeded) || details.top;
    },

    addClass: function(className) {
      this.elem.classList.add.apply(
        this.elem.classList,
        this.classes[className].split(" ")
      );
    },

    removeClass: function(className) {
      this.elem.classList.remove.apply(
        this.elem.classList,
        this.classes[className].split(" ")
      );
    },

    hasClass: function(className) {
      return this.classes[className].split(" ").every(function(cls) {
        return this.classList.contains(cls);
      }, this.elem);
    },

    update: function(details) {
      if (details.isOutOfBounds) {
        // Ignore bouncy scrolling in OSX
        return;
      }

      if (this.frozen === true) {
        return;
      }

      if (details.top) {
        this.top();
      } else {
        this.notTop();
      }

      if (details.bottom) {
        this.bottom();
      } else {
        this.notBottom();
      }

      if (this.shouldUnpin(details)) {
        this.unpin();
      } else if (this.shouldPin(details)) {
        this.pin();
      }
    }
  };

  /**
   * Default options
   * @type {Object}
   */
  Headroom.options = {
    tolerance: {
      up: 0,
      down: 0
    },
    offset: 0,
    scroller: isBrowser() ? window : null,
    classes: {
      frozen: "headroom--frozen",
      pinned: "headroom--pinned",
      unpinned: "headroom--unpinned",
      top: "headroom--top",
      notTop: "headroom--not-top",
      bottom: "headroom--bottom",
      notBottom: "headroom--not-bottom",
      initial: "headroom"
    }
  };

  Headroom.cutsTheMustard = isSupported();

  return Headroom;

}));


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./resources/css/tailwind.css":
/*!************************************!*\
  !*** ./resources/css/tailwind.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/js/components/contactForm.js":
/*!************************************************!*\
  !*** ./resources/js/components/contactForm.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ajaxContactForm = function ajaxContactForm() {
  var form = document.getElementById('contact-form');
  var submit = document.querySelector('[data-contact-submit]');
  var success = document.querySelector('[data-contact-success]');
  var reCaptchaMessage = document.querySelector('[data-contact-recaptcha-fail]');

  function isCaptchaChecked() {
    return grecaptcha && grecaptcha.getResponse().length !== 0;
  }

  if (form != null) {
    console.log('Contact form');
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var form = e.target;
      var data = new FormData(form);
      var request = new XMLHttpRequest();

      if (isCaptchaChecked()) {
        reCaptchaMessage.classList.add('hidden');

        request.onreadystatechange = function () {
          form.classList.add('hidden');
          success.classList.remove('hidden');
        };

        request.open(form.method, form.action);
        request.send(data);
      } else {
        reCaptchaMessage.classList.remove('hidden');
      }
    });
  }
};

ajaxContactForm();

/***/ }),

/***/ "./resources/js/components/headerHide.js":
/*!***********************************************!*\
  !*** ./resources/js/components/headerHide.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! headroom.js */ "./node_modules/headroom.js/dist/headroom.js");
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(headroom_js__WEBPACK_IMPORTED_MODULE_0__);
// Options
var options = {
  offset: {
    up: 10,
    down: 150
  },
  tolerance: {
    up: 10,
    down: 3
  }
};

var header = document.querySelector('[data-header]');
var headroom = new headroom_js__WEBPACK_IMPORTED_MODULE_0___default.a(header, options);
headroom.init();

/***/ }),

/***/ "./resources/js/components/headerScroll.js":
/*!*************************************************!*\
  !*** ./resources/js/components/headerScroll.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var header = document.querySelector('[data-header]');
var headerScrollValue = 15;
window.addEventListener('scroll', function () {
  if (window.pageYOffset > headerScrollValue) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
});

/***/ }),

/***/ "./resources/js/components/mobileNav.js":
/*!**********************************************!*\
  !*** ./resources/js/components/mobileNav.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var mobileNav = document.querySelector('[data-mobile-nav]');
var navToggle = document.querySelector('[data-nav-toggle]');
var navMenuIcon = document.querySelector('[data-nav-menu-icon]');
var navCloseIcon = document.querySelector('[data-nav-close-icon]');
var main = document.querySelector('.main');
var isNavOpen = true;

var toggleNav = function toggleNav() {
  if (isNavOpen == true) {
    mobileNav.classList.add('hidden');
    navCloseIcon.classList.add('hidden');
    navMenuIcon.classList.remove('hidden');
    navToggle.setAttribute("aria-expanded", "false");
    isNavOpen = false;
  } else {
    mobileNav.classList.remove('hidden');
    navCloseIcon.classList.remove('hidden');
    navMenuIcon.classList.add('hidden');
    navToggle.setAttribute("aria-expanded", "true");
    isNavOpen = true;
  }
};

navToggle.addEventListener('click', function () {
  toggleNav();
});
toggleNav();

/***/ }),

/***/ "./resources/js/site.js":
/*!******************************!*\
  !*** ./resources/js/site.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_contactForm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/contactForm.js */ "./resources/js/components/contactForm.js");
/* harmony import */ var _components_contactForm_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_contactForm_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_headerScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/headerScroll.js */ "./resources/js/components/headerScroll.js");
/* harmony import */ var _components_headerScroll_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_headerScroll_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_headerHide_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/headerHide.js */ "./resources/js/components/headerHide.js");
/* harmony import */ var _components_mobileNav_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/mobileNav.js */ "./resources/js/components/mobileNav.js");
/* harmony import */ var _components_mobileNav_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_mobileNav_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _vendor_prism_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vendor/prism.js */ "./resources/js/vendor/prism.js");
/* harmony import */ var _vendor_prism_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_vendor_prism_js__WEBPACK_IMPORTED_MODULE_4__);
// Components



 // Vendor



window.onload = function () {
  document.querySelector('body').classList.remove('preload');
};

/***/ }),

/***/ "./resources/js/vendor/prism.js":
/*!**************************************!*\
  !*** ./resources/js/vendor/prism.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* PrismJS 1.23.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+liquid */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function (u) {
  var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      e = {},
      M = {
    manual: u.Prism && u.Prism.manual,
    disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
    util: {
      encode: function e(n) {
        return n instanceof W ? new W(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      },
      type: function type(e) {
        return Object.prototype.toString.call(e).slice(8, -1);
      },
      objId: function objId(e) {
        return e.__id || Object.defineProperty(e, "__id", {
          value: ++n
        }), e.__id;
      },
      clone: function t(e, r) {
        var a, n;

        switch (r = r || {}, M.util.type(e)) {
          case "Object":
            if (n = M.util.objId(e), r[n]) return r[n];

            for (var i in a = {}, r[n] = a, e) {
              e.hasOwnProperty(i) && (a[i] = t(e[i], r));
            }

            return a;

          case "Array":
            return n = M.util.objId(e), r[n] ? r[n] : (a = [], r[n] = a, e.forEach(function (e, n) {
              a[n] = t(e, r);
            }), a);

          default:
            return e;
        }
      },
      getLanguage: function getLanguage(e) {
        for (; e && !c.test(e.className);) {
          e = e.parentElement;
        }

        return e ? (e.className.match(c) || [, "none"])[1].toLowerCase() : "none";
      },
      currentScript: function currentScript() {
        if ("undefined" == typeof document) return null;
        if ("currentScript" in document) return document.currentScript;

        try {
          throw new Error();
        } catch (e) {
          var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];

          if (n) {
            var t = document.getElementsByTagName("script");

            for (var r in t) {
              if (t[r].src == n) return t[r];
            }
          }

          return null;
        }
      },
      isActive: function isActive(e, n, t) {
        for (var r = "no-" + n; e;) {
          var a = e.classList;
          if (a.contains(n)) return !0;
          if (a.contains(r)) return !1;
          e = e.parentElement;
        }

        return !!t;
      }
    },
    languages: {
      plain: e,
      plaintext: e,
      text: e,
      txt: e,
      extend: function extend(e, n) {
        var t = M.util.clone(M.languages[e]);

        for (var r in n) {
          t[r] = n[r];
        }

        return t;
      },
      insertBefore: function insertBefore(t, e, n, r) {
        var a = (r = r || M.languages)[t],
            i = {};

        for (var l in a) {
          if (a.hasOwnProperty(l)) {
            if (l == e) for (var o in n) {
              n.hasOwnProperty(o) && (i[o] = n[o]);
            }
            n.hasOwnProperty(l) || (i[l] = a[l]);
          }
        }

        var s = r[t];
        return r[t] = i, M.languages.DFS(M.languages, function (e, n) {
          n === s && e != t && (this[e] = i);
        }), i;
      },
      DFS: function e(n, t, r, a) {
        a = a || {};
        var i = M.util.objId;

        for (var l in n) {
          if (n.hasOwnProperty(l)) {
            t.call(n, l, n[l], r || l);
            var o = n[l],
                s = M.util.type(o);
            "Object" !== s || a[i(o)] ? "Array" !== s || a[i(o)] || (a[i(o)] = !0, e(o, t, l, a)) : (a[i(o)] = !0, e(o, t, null, a));
          }
        }
      }
    },
    plugins: {},
    highlightAll: function highlightAll(e, n) {
      M.highlightAllUnder(document, e, n);
    },
    highlightAllUnder: function highlightAllUnder(e, n, t) {
      var r = {
        callback: t,
        container: e,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };
      M.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), M.hooks.run("before-all-elements-highlight", r);

      for (var a, i = 0; a = r.elements[i++];) {
        M.highlightElement(a, !0 === n, r.callback);
      }
    },
    highlightElement: function highlightElement(e, n, t) {
      var r = M.util.getLanguage(e),
          a = M.languages[r];
      e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
      var i = e.parentElement;
      i && "pre" === i.nodeName.toLowerCase() && (i.className = i.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r);
      var l = {
        element: e,
        language: r,
        grammar: a,
        code: e.textContent
      };

      function o(e) {
        l.highlightedCode = e, M.hooks.run("before-insert", l), l.element.innerHTML = l.highlightedCode, M.hooks.run("after-highlight", l), M.hooks.run("complete", l), t && t.call(l.element);
      }

      if (M.hooks.run("before-sanity-check", l), (i = l.element.parentElement) && "pre" === i.nodeName.toLowerCase() && !i.hasAttribute("tabindex") && i.setAttribute("tabindex", "0"), !l.code) return M.hooks.run("complete", l), void (t && t.call(l.element));
      if (M.hooks.run("before-highlight", l), l.grammar) {
        if (n && u.Worker) {
          var s = new Worker(M.filename);
          s.onmessage = function (e) {
            o(e.data);
          }, s.postMessage(JSON.stringify({
            language: l.language,
            code: l.code,
            immediateClose: !0
          }));
        } else o(M.highlight(l.code, l.grammar, l.language));
      } else o(M.util.encode(l.code));
    },
    highlight: function highlight(e, n, t) {
      var r = {
        code: e,
        grammar: n,
        language: t
      };
      return M.hooks.run("before-tokenize", r), r.tokens = M.tokenize(r.code, r.grammar), M.hooks.run("after-tokenize", r), W.stringify(M.util.encode(r.tokens), r.language);
    },
    tokenize: function tokenize(e, n) {
      var t = n.rest;

      if (t) {
        for (var r in t) {
          n[r] = t[r];
        }

        delete n.rest;
      }

      var a = new i();
      return I(a, a.head, e), function e(n, t, r, a, i, l) {
        for (var o in r) {
          if (r.hasOwnProperty(o) && r[o]) {
            var s = r[o];
            s = Array.isArray(s) ? s : [s];

            for (var u = 0; u < s.length; ++u) {
              if (l && l.cause == o + "," + u) return;
              var c = s[u],
                  g = c.inside,
                  f = !!c.lookbehind,
                  h = !!c.greedy,
                  d = c.alias;

              if (h && !c.pattern.global) {
                var p = c.pattern.toString().match(/[imsuy]*$/)[0];
                c.pattern = RegExp(c.pattern.source, p + "g");
              }

              for (var v = c.pattern || c, m = a.next, y = i; m !== t.tail && !(l && y >= l.reach); y += m.value.length, m = m.next) {
                var b = m.value;
                if (t.length > n.length) return;

                if (!(b instanceof W)) {
                  var k,
                      x = 1;

                  if (h) {
                    if (!(k = z(v, y, n, f))) break;
                    var w = k.index,
                        A = k.index + k[0].length,
                        P = y;

                    for (P += m.value.length; P <= w;) {
                      m = m.next, P += m.value.length;
                    }

                    if (P -= m.value.length, y = P, m.value instanceof W) continue;

                    for (var E = m; E !== t.tail && (P < A || "string" == typeof E.value); E = E.next) {
                      x++, P += E.value.length;
                    }

                    x--, b = n.slice(y, P), k.index -= y;
                  } else if (!(k = z(v, 0, b, f))) continue;

                  var w = k.index,
                      S = k[0],
                      O = b.slice(0, w),
                      L = b.slice(w + S.length),
                      N = y + b.length;
                  l && N > l.reach && (l.reach = N);
                  var j = m.prev;
                  O && (j = I(t, j, O), y += O.length), q(t, j, x);
                  var C = new W(o, g ? M.tokenize(S, g) : S, d, S);

                  if (m = I(t, j, C), L && I(t, m, L), 1 < x) {
                    var _ = {
                      cause: o + "," + u,
                      reach: N
                    };
                    e(n, t, r, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach);
                  }
                }
              }
            }
          }
        }
      }(e, a, n, a.head, 0), function (e) {
        var n = [],
            t = e.head.next;

        for (; t !== e.tail;) {
          n.push(t.value), t = t.next;
        }

        return n;
      }(a);
    },
    hooks: {
      all: {},
      add: function add(e, n) {
        var t = M.hooks.all;
        t[e] = t[e] || [], t[e].push(n);
      },
      run: function run(e, n) {
        var t = M.hooks.all[e];
        if (t && t.length) for (var r, a = 0; r = t[a++];) {
          r(n);
        }
      }
    },
    Token: W
  };

  function W(e, n, t, r) {
    this.type = e, this.content = n, this.alias = t, this.length = 0 | (r || "").length;
  }

  function z(e, n, t, r) {
    e.lastIndex = n;
    var a = e.exec(t);

    if (a && r && a[1]) {
      var i = a[1].length;
      a.index += i, a[0] = a[0].slice(i);
    }

    return a;
  }

  function i() {
    var e = {
      value: null,
      prev: null,
      next: null
    },
        n = {
      value: null,
      prev: e,
      next: null
    };
    e.next = n, this.head = e, this.tail = n, this.length = 0;
  }

  function I(e, n, t) {
    var r = n.next,
        a = {
      value: t,
      prev: n,
      next: r
    };
    return n.next = a, r.prev = a, e.length++, a;
  }

  function q(e, n, t) {
    for (var r = n.next, a = 0; a < t && r !== e.tail; a++) {
      r = r.next;
    }

    (n.next = r).prev = n, e.length -= a;
  }

  if (u.Prism = M, W.stringify = function n(e, t) {
    if ("string" == typeof e) return e;

    if (Array.isArray(e)) {
      var r = "";
      return e.forEach(function (e) {
        r += n(e, t);
      }), r;
    }

    var a = {
      type: e.type,
      content: n(e.content, t),
      tag: "span",
      classes: ["token", e.type],
      attributes: {},
      language: t
    },
        i = e.alias;
    i && (Array.isArray(i) ? Array.prototype.push.apply(a.classes, i) : a.classes.push(i)), M.hooks.run("wrap", a);
    var l = "";

    for (var o in a.attributes) {
      l += " " + o + '="' + (a.attributes[o] || "").replace(/"/g, "&quot;") + '"';
    }

    return "<" + a.tag + ' class="' + a.classes.join(" ") + '"' + l + ">" + a.content + "</" + a.tag + ">";
  }, !u.document) return u.addEventListener && (M.disableWorkerMessageHandler || u.addEventListener("message", function (e) {
    var n = JSON.parse(e.data),
        t = n.language,
        r = n.code,
        a = n.immediateClose;
    u.postMessage(M.highlight(r, M.languages[t], t)), a && u.close();
  }, !1)), M;
  var t = M.util.currentScript();

  function r() {
    M.manual || M.highlightAll();
  }

  if (t && (M.filename = t.src, t.hasAttribute("data-manual") && (M.manual = !0)), !M.manual) {
    var a = document.readyState;
    "loading" === a || "interactive" === a && t && t.defer ? document.addEventListener("DOMContentLoaded", r) : window.requestAnimationFrame ? window.requestAnimationFrame(r) : window.setTimeout(r, 16);
  }

  return M;
}(_self);

 true && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null
      },
      string: {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: !0
      },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/,
      name: /[^\s<>'"]+/
    }
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>\/:]+:/
        }
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [{
            pattern: /^=/,
            alias: "attr-equals"
          }, /"|'/]
        }
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          namespace: /^[^\s>\/:]+:/
        }
      }
    }
  },
  entity: [{
    pattern: /&[\da-z]{1,8};/i,
    alias: "named-entity"
  }, /&#x?[\da-f]{1,8};/i]
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function (a) {
  "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
  value: function value(a, e) {
    var s = {};
    s["language-" + e] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: !0,
      inside: Prism.languages[e]
    }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
    var t = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: s
      }
    };
    t["language-" + e] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[e]
    };
    var n = {};
    n[a] = {
      pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function () {
        return a;
      }), "i"),
      lookbehind: !0,
      greedy: !0,
      inside: t
    }, Prism.languages.insertBefore("markup", "cdata", n);
  }
}), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
  value: function value(a, e) {
    Prism.languages.markup.tag.inside["special-attr"].push({
      pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"),
      lookbehind: !0,
      inside: {
        "attr-name": /^[^\s=]+/,
        "attr-value": {
          pattern: /=[\s\S]+/,
          inside: {
            value: {
              pattern: /(=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: !0,
              alias: [e, "language-" + e],
              inside: Prism.languages[e]
            },
            punctuation: [{
              pattern: /^=/,
              alias: "attr-equals"
            }, /"|'/]
          }
        }
      }
    });
  }
}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
!function (s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: "selector"
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0
        }
      }
    },
    url: {
      pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"),
      greedy: !0,
      inside: {
        "function": /^url/i,
        punctuation: /^\(|\)$/,
        string: {
          pattern: RegExp("^" + e.source + "$"),
          alias: "url"
        }
      }
    },
    selector: RegExp("[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"),
    string: {
      pattern: e,
      greedy: !0
    },
    property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
    important: /!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/
  }, s.languages.css.atrule.inside.rest = s.languages.css;
  var t = s.languages.markup;
  t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
}(Prism);
Prism.languages.clike = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: !0,
    greedy: !0
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0,
    greedy: !0
  }],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  "class-name": {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: {
      punctuation: /[.\\]/
    }
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  "boolean": /\b(?:true|false)\b/,
  "function": /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [Prism.languages.clike["class-name"], {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
    lookbehind: !0
  }],
  keyword: [{
    pattern: /((?:^|})\s*)catch\b/,
    lookbehind: !0
  }, {
    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    lookbehind: !0
  }],
  "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
    lookbehind: !0,
    greedy: !0,
    inside: {
      "regex-source": {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: !0,
        alias: "language-regex",
        inside: Prism.languages.regex
      },
      "regex-flags": /[a-z]+$/,
      "regex-delimiter": /^\/|\/$/
    }
  },
  "function-variable": {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: "function"
  },
  parameter: [{
    pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
    inside: Prism.languages.javascript
  }, {
    pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }],
  constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore("javascript", "string", {
  "template-string": {
    pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
    greedy: !0,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      interpolation: {
        pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
        lookbehind: !0,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\${|}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      string: /[\s\S]+/
    }
  }
}), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism.languages.js = Prism.languages.javascript;
Prism.languages.liquid = {
  keyword: /\b(?:comment|endcomment|if|elsif|else|endif|unless|endunless|for|endfor|case|endcase|when|in|break|assign|continue|limit|offset|range|reversed|raw|endraw|capture|endcapture|tablerow|endtablerow)\b/,
  number: /\b0b[01]+\b|\b0x(?:\.[\da-fp-]+|[\da-f]+(?:\.[\da-fp-]+)?)\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
  operator: {
    pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
    lookbehind: !0
  },
  "function": {
    pattern: /(^|[\s;|&])(?:append|prepend|capitalize|cycle|cols|increment|decrement|abs|at_least|at_most|ceil|compact|concat|date|default|divided_by|downcase|escape|escape_once|first|floor|join|last|lstrip|map|minus|modulo|newline_to_br|plus|remove|remove_first|replace|replace_first|reverse|round|rstrip|size|slice|sort|sort_natural|split|strip|strip_html|strip_newlines|times|truncate|truncatewords|uniq|upcase|url_decode|url_encode|include|paginate)(?=$|[\s;|&])/,
    lookbehind: !0
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ 0:
/*!*****************************************************************!*\
  !*** multi ./resources/js/site.js ./resources/css/tailwind.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/james/Sites/statamic-base/resources/js/site.js */"./resources/js/site.js");
module.exports = __webpack_require__(/*! /Users/james/Sites/statamic-base/resources/css/tailwind.css */"./resources/css/tailwind.css");


/***/ })

/******/ });