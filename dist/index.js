"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module2) {
    "use strict";
    module2.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module2) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    var kindOf = function(cache) {
      return function(thing) {
        var str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
      };
    }(/* @__PURE__ */ Object.create(null));
    function kindOfTest(type) {
      type = type.toLowerCase();
      return function isKindOf(thing) {
        return kindOf(thing) === type;
      };
    }
    function isArray(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    var isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (kindOf(val) !== "object") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    var isDate = kindOfTest("Date");
    var isFile = kindOfTest("File");
    var isBlob = kindOfTest("Blob");
    var isFileList = kindOfTest("FileList");
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isFormData(thing) {
      var pattern = "[object FormData]";
      return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
    }
    var isURLSearchParams = kindOfTest("URLSearchParams");
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    function inherits(constructor, superConstructor, props, descriptors) {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      props && Object.assign(constructor.prototype, props);
    }
    function toFlatObject(sourceObj, destObj, filter) {
      var props;
      var i;
      var prop;
      var merged = {};
      destObj = destObj || {};
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop = props[i];
          if (!merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = Object.getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    }
    function endsWith(str, searchString, position) {
      str = String(str);
      if (position === void 0 || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      var lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
    function toArray(thing) {
      if (!thing)
        return null;
      var i = thing.length;
      if (isUndefined(i))
        return null;
      var arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    }
    var isTypedArray = function(TypedArray) {
      return function(thing) {
        return TypedArray && thing instanceof TypedArray;
      };
    }(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
    module2.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      isTypedArray,
      isFileList
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module2.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module2.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/AxiosError.js
var require_AxiosError = __commonJS({
  "node_modules/axios/lib/core/AxiosError.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function AxiosError(message, code, config, request, response) {
      Error.call(this);
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype = AxiosError.prototype;
    var descriptors = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED"
    ].forEach(function(code) {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype, "isAxiosError", { value: true });
    AxiosError.from = function(error, code, config, request, response, customProps) {
      var axiosError = Object.create(prototype);
      utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      });
      AxiosError.call(axiosError, error.message, code, config, request, response);
      axiosError.name = error.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    module2.exports = AxiosError;
  }
});

// node_modules/axios/lib/defaults/transitional.js
var require_transitional = __commonJS({
  "node_modules/axios/lib/defaults/transitional.js"(exports, module2) {
    "use strict";
    module2.exports = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
  }
});

// node_modules/axios/lib/helpers/toFormData.js
var require_toFormData = __commonJS({
  "node_modules/axios/lib/helpers/toFormData.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function toFormData(obj, formData) {
      formData = formData || new FormData();
      var stack = [];
      function convertValue(value) {
        if (value === null)
          return "";
        if (utils.isDate(value)) {
          return value.toISOString();
        }
        if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
          return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
        }
        return value;
      }
      function build(data, parentKey) {
        if (utils.isPlainObject(data) || utils.isArray(data)) {
          if (stack.indexOf(data) !== -1) {
            throw Error("Circular reference detected in " + parentKey);
          }
          stack.push(data);
          utils.forEach(data, function each(value, key) {
            if (utils.isUndefined(value))
              return;
            var fullKey = parentKey ? parentKey + "." + key : key;
            var arr;
            if (value && !parentKey && typeof value === "object") {
              if (utils.endsWith(key, "{}")) {
                value = JSON.stringify(value);
              } else if (utils.endsWith(key, "[]") && (arr = utils.toArray(value))) {
                arr.forEach(function(el) {
                  !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
                });
                return;
              }
            }
            build(value, fullKey);
          });
          stack.pop();
        } else {
          formData.append(parentKey, convertValue(data));
        }
      }
      build(obj);
      return formData;
    }
    module2.exports = toFormData;
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module2) {
    "use strict";
    var AxiosError = require_AxiosError();
    module2.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError("Request failed with status code " + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module2) {
    "use strict";
    module2.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module2) {
    "use strict";
    module2.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module2) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module2.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module2.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/cancel/CanceledError.js
var require_CanceledError = __commonJS({
  "node_modules/axios/lib/cancel/CanceledError.js"(exports, module2) {
    "use strict";
    var AxiosError = require_AxiosError();
    var utils = require_utils();
    function CanceledError(message) {
      AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED);
      this.name = "CanceledError";
    }
    utils.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    module2.exports = CanceledError;
  }
});

// node_modules/axios/lib/helpers/parseProtocol.js
var require_parseProtocol = __commonJS({
  "node_modules/axios/lib/helpers/parseProtocol.js"(exports, module2) {
    "use strict";
    module2.exports = function parseProtocol(url) {
      var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || "";
    };
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var transitionalDefaults = require_transitional();
    var AxiosError = require_AxiosError();
    var CanceledError = require_CanceledError();
    var parseProtocol = require_parseProtocol();
    module2.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        var protocol = parseProtocol(fullPath);
        if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
          reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
          return;
        }
        request.send(requestData);
      });
    };
  }
});

// ../../../node_modules/ms/index.js
var require_ms = __commonJS({
  "../../../node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// ../../../node_modules/debug/src/common.js
var require_common = __commonJS({
  "../../../node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// ../../../node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "../../../node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// ../../../node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "../../../node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var argv = process.argv;
    var terminator = argv.indexOf("--");
    var hasFlag = function(flag) {
      flag = "--" + flag;
      var pos = argv.indexOf(flag);
      return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
    };
    module2.exports = function() {
      if ("FORCE_COLOR" in process.env) {
        return true;
      }
      if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
        return false;
      }
      if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
        return true;
      }
      if (process.stdout && !process.stdout.isTTY) {
        return false;
      }
      if (process.platform === "win32") {
        return true;
      }
      if ("COLORTERM" in process.env) {
        return true;
      }
      if (process.env.TERM === "dumb") {
        return false;
      }
      if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
        return true;
      }
      return false;
    }();
  }
});

// ../../../node_modules/debug/src/node.js
var require_node = __commonJS({
  "../../../node_modules/debug/src/node.js"(exports, module2) {
    var tty = require("tty");
    var util = require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(() => {
    }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// ../../../node_modules/debug/src/index.js
var require_src = __commonJS({
  "../../../node_modules/debug/src/index.js"(exports, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/follow-redirects/debug.js"(exports, module2) {
    var debug;
    module2.exports = function() {
      if (!debug) {
        try {
          debug = require_src()("follow-redirects");
        } catch (error) {
        }
        if (typeof debug !== "function") {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/follow-redirects/index.js"(exports, module2) {
    var url = require("url");
    var URL = url.URL;
    var http = require("http");
    var https = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug = require_debug();
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = /* @__PURE__ */ Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed");
    var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
    var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
    var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self = this;
      this._onNativeResponse = function(response) {
        self._processResponse(response);
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      abortRequest(this._currentRequest);
      this.emit("abort");
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (typeof data === "function") {
        callback = data;
        data = encoding = null;
      } else if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self._timeout) {
          clearTimeout(self._timeout);
        }
        self._timeout = setTimeout(function() {
          self.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self._timeout) {
          clearTimeout(self._timeout);
          self._timeout = null;
        }
        self.removeListener("abort", clearTimer);
        self.removeListener("error", clearTimer);
        self.removeListener("response", clearTimer);
        if (callback) {
          self.removeListener("timeout", callback);
        }
        if (!self.socket) {
          self._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (callback) {
        this.on("timeout", callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }
      if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      request._redirectable = this;
      for (var event of events) {
        request.on(event, eventHandlers[event]);
      }
      this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : this._currentUrl = this._options.path;
      if (this._isRedirect) {
        var i = 0;
        var self = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          if (request === self._currentRequest) {
            if (error) {
              self.emit("error", error);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
        return;
      }
      abortRequest(this._currentRequest);
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new TooManyRedirectsError());
        return;
      }
      var requestHeaders;
      var beforeRedirect = this._options.beforeRedirect;
      if (beforeRedirect) {
        requestHeaders = Object.assign({
          Host: response.req.getHeader("host")
        }, this._options.headers);
      }
      var method = this._options.method;
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
      var currentUrlParts = url.parse(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost }));
      var redirectUrl;
      try {
        redirectUrl = url.resolve(currentUrl, location);
      } catch (cause) {
        this.emit("error", new RedirectionError(cause));
        return;
      }
      debug("redirecting to", redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);
      if (redirectUrlParts.protocol !== currentUrlParts.protocol && redirectUrlParts.protocol !== "https:" || redirectUrlParts.host !== currentHost && !isSubdomain(redirectUrlParts.host, currentHost)) {
        removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
      }
      if (typeof beforeRedirect === "function") {
        var responseDetails = {
          headers: response.headers,
          statusCode
        };
        var requestDetails = {
          url: currentUrl,
          method,
          headers: requestHeaders
        };
        try {
          beforeRedirect(this._options, responseDetails, requestDetails);
        } catch (err) {
          this.emit("error", err);
          return;
        }
        this._sanitizeOptions(this._options);
      }
      try {
        this._performRequest();
      } catch (cause) {
        this.emit("error", new RedirectionError(cause));
      }
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (typeof input === "string") {
            var urlStr = input;
            try {
              input = urlToOptions(new URL(urlStr));
            } catch (err) {
              input = url.parse(urlStr);
            }
          } else if (URL && input instanceof URL) {
            input = urlToOptions(input);
          } else {
            callback = options;
            options = input;
            input = { protocol };
          }
          if (typeof options === "function") {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports2;
    }
    function noop() {
    }
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href
      };
      if (urlObject.port !== "") {
        options.port = Number(urlObject.port);
      }
      return options;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, defaultMessage) {
      function CustomError(cause) {
        Error.captureStackTrace(this, this.constructor);
        if (!cause) {
          this.message = defaultMessage;
        } else {
          this.message = defaultMessage + ": " + cause.message;
          this.cause = cause;
        }
      }
      CustomError.prototype = new Error();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      CustomError.prototype.code = code;
      return CustomError;
    }
    function abortRequest(request) {
      for (var event of events) {
        request.removeListener(event, eventHandlers[event]);
      }
      request.on("error", noop);
      request.abort();
    }
    function isSubdomain(subdomain, domain) {
      const dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    module2.exports = wrap({ http, https });
    module2.exports.wrap = wrap;
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module2) {
    module2.exports = {
      "version": "0.27.2"
    };
  }
});

// node_modules/axios/lib/adapters/http.js
var require_http = __commonJS({
  "node_modules/axios/lib/adapters/http.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var buildFullPath = require_buildFullPath();
    var buildURL = require_buildURL();
    var http = require("http");
    var https = require("https");
    var httpFollow = require_follow_redirects().http;
    var httpsFollow = require_follow_redirects().https;
    var url = require("url");
    var zlib = require("zlib");
    var VERSION = require_data().version;
    var transitionalDefaults = require_transitional();
    var AxiosError = require_AxiosError();
    var CanceledError = require_CanceledError();
    var isHttps = /https:?/;
    var supportedProtocols = ["http:", "https:", "file:"];
    function setProxy(options, proxy, location) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.port = proxy.port;
      options.path = location;
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
      }
      options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }
    module2.exports = function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        var resolve = function resolve2(value) {
          done();
          resolvePromise(value);
        };
        var rejected = false;
        var reject = function reject2(value) {
          done();
          rejected = true;
          rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        var headerNames = {};
        Object.keys(headers).forEach(function storeLowerName(name) {
          headerNames[name.toLowerCase()] = name;
        });
        if ("user-agent" in headerNames) {
          if (!headers[headerNames["user-agent"]]) {
            delete headers[headerNames["user-agent"]];
          }
        } else {
          headers["User-Agent"] = "axios/" + VERSION;
        }
        if (utils.isFormData(data) && utils.isFunction(data.getHeaders)) {
          Object.assign(headers, data.getHeaders());
        } else if (data && !utils.isStream(data)) {
          if (Buffer.isBuffer(data)) {
          } else if (utils.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = Buffer.from(data, "utf-8");
          } else {
            return reject(new AxiosError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", AxiosError.ERR_BAD_REQUEST, config));
          }
          if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
            return reject(new AxiosError("Request body larger than maxBodyLength limit", AxiosError.ERR_BAD_REQUEST, config));
          }
          if (!headerNames["content-length"]) {
            headers["Content-Length"] = data.length;
          }
        }
        var auth = void 0;
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password || "";
          auth = username + ":" + password;
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || supportedProtocols[0];
        if (supportedProtocols.indexOf(protocol) === -1) {
          return reject(new AxiosError("Unsupported protocol " + protocol, AxiosError.ERR_BAD_REQUEST, config));
        }
        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(":");
          var urlUsername = urlAuth[0] || "";
          var urlPassword = urlAuth[1] || "";
          auth = urlUsername + ":" + urlPassword;
        }
        if (auth && headerNames.authorization) {
          delete headers[headerNames.authorization];
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        try {
          buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, "");
        } catch (err) {
          var customErr = new Error(err.message);
          customErr.config = config;
          customErr.url = config.url;
          customErr.exists = true;
          reject(customErr);
        }
        var options = {
          path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
          method: config.method.toUpperCase(),
          headers,
          agent,
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth
        };
        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + "_proxy";
          var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url.parse(proxyUrl);
            var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
            var shouldProxy = true;
            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(",").map(function trim(s) {
                return s.trim();
              });
              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === "*") {
                  return true;
                }
                if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }
                return parsed.hostname === proxyElement;
              });
            }
            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };
              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }
        if (proxy) {
          options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
          setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsProxy ? https : http;
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          if (config.beforeRedirect) {
            options.beforeRedirect = config.beforeRedirect;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        }
        if (config.insecureHTTPParser) {
          options.insecureHTTPParser = config.insecureHTTPParser;
        }
        var req = transport.request(options, function handleResponse(res) {
          if (req.aborted)
            return;
          var stream = res;
          var lastRequest = res.req || req;
          if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
            switch (res.headers["content-encoding"]) {
              case "gzip":
              case "compress":
              case "deflate":
                stream = stream.pipe(zlib.createUnzip());
                delete res.headers["content-encoding"];
                break;
            }
          }
          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config,
            request: lastRequest
          };
          if (config.responseType === "stream") {
            response.data = stream;
            settle(resolve, reject, response);
          } else {
            var responseBuffer = [];
            var totalResponseBytes = 0;
            stream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;
              if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                rejected = true;
                stream.destroy();
                reject(new AxiosError("maxContentLength size of " + config.maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
              }
            });
            stream.on("aborted", function handlerStreamAborted() {
              if (rejected) {
                return;
              }
              stream.destroy();
              reject(new AxiosError("maxContentLength size of " + config.maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
            });
            stream.on("error", function handleStreamError(err) {
              if (req.aborted)
                return;
              reject(AxiosError.from(err, null, config, lastRequest));
            });
            stream.on("end", function handleStreamEnd() {
              try {
                var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
                if (config.responseType !== "arraybuffer") {
                  responseData = responseData.toString(config.responseEncoding);
                  if (!config.responseEncoding || config.responseEncoding === "utf8") {
                    responseData = utils.stripBOM(responseData);
                  }
                }
                response.data = responseData;
              } catch (err) {
                reject(AxiosError.from(err, null, config, response.request, response));
              }
              settle(resolve, reject, response);
            });
          }
        });
        req.on("error", function handleRequestError(err) {
          reject(AxiosError.from(err, null, config, req));
        });
        req.on("socket", function handleRequestSocket(socket) {
          socket.setKeepAlive(true, 1e3 * 60);
        });
        if (config.timeout) {
          var timeout = parseInt(config.timeout, 10);
          if (isNaN(timeout)) {
            reject(new AxiosError("error trying to parse `config.timeout` to int", AxiosError.ERR_BAD_OPTION_VALUE, config, req));
            return;
          }
          req.setTimeout(timeout, function handleRequestTimeout() {
            req.abort();
            var transitional = config.transitional || transitionalDefaults;
            reject(new AxiosError("timeout of " + timeout + "ms exceeded", transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, req));
          });
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (req.aborted)
              return;
            req.abort();
            reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (utils.isStream(data)) {
          data.on("error", function handleStreamError(err) {
            reject(AxiosError.from(err, config, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };
  }
});

// node_modules/delayed-stream/lib/delayed_stream.js
var require_delayed_stream = __commonJS({
  "node_modules/delayed-stream/lib/delayed_stream.js"(exports, module2) {
    var Stream = require("stream").Stream;
    var util = require("util");
    module2.exports = DelayedStream;
    function DelayedStream() {
      this.source = null;
      this.dataSize = 0;
      this.maxDataSize = 1024 * 1024;
      this.pauseStream = true;
      this._maxDataSizeExceeded = false;
      this._released = false;
      this._bufferedEvents = [];
    }
    util.inherits(DelayedStream, Stream);
    DelayedStream.create = function(source, options) {
      var delayedStream = new this();
      options = options || {};
      for (var option in options) {
        delayedStream[option] = options[option];
      }
      delayedStream.source = source;
      var realEmit = source.emit;
      source.emit = function() {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
      };
      source.on("error", function() {
      });
      if (delayedStream.pauseStream) {
        source.pause();
      }
      return delayedStream;
    };
    Object.defineProperty(DelayedStream.prototype, "readable", {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.source.readable;
      }
    });
    DelayedStream.prototype.setEncoding = function() {
      return this.source.setEncoding.apply(this.source, arguments);
    };
    DelayedStream.prototype.resume = function() {
      if (!this._released) {
        this.release();
      }
      this.source.resume();
    };
    DelayedStream.prototype.pause = function() {
      this.source.pause();
    };
    DelayedStream.prototype.release = function() {
      this._released = true;
      this._bufferedEvents.forEach(function(args) {
        this.emit.apply(this, args);
      }.bind(this));
      this._bufferedEvents = [];
    };
    DelayedStream.prototype.pipe = function() {
      var r = Stream.prototype.pipe.apply(this, arguments);
      this.resume();
      return r;
    };
    DelayedStream.prototype._handleEmit = function(args) {
      if (this._released) {
        this.emit.apply(this, args);
        return;
      }
      if (args[0] === "data") {
        this.dataSize += args[1].length;
        this._checkIfMaxDataSizeExceeded();
      }
      this._bufferedEvents.push(args);
    };
    DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
      if (this._maxDataSizeExceeded) {
        return;
      }
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      this._maxDataSizeExceeded = true;
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this.emit("error", new Error(message));
    };
  }
});

// node_modules/combined-stream/lib/combined_stream.js
var require_combined_stream = __commonJS({
  "node_modules/combined-stream/lib/combined_stream.js"(exports, module2) {
    var util = require("util");
    var Stream = require("stream").Stream;
    var DelayedStream = require_delayed_stream();
    module2.exports = CombinedStream;
    function CombinedStream() {
      this.writable = false;
      this.readable = true;
      this.dataSize = 0;
      this.maxDataSize = 2 * 1024 * 1024;
      this.pauseStreams = true;
      this._released = false;
      this._streams = [];
      this._currentStream = null;
      this._insideLoop = false;
      this._pendingNext = false;
    }
    util.inherits(CombinedStream, Stream);
    CombinedStream.create = function(options) {
      var combinedStream = new this();
      options = options || {};
      for (var option in options) {
        combinedStream[option] = options[option];
      }
      return combinedStream;
    };
    CombinedStream.isStreamLike = function(stream) {
      return typeof stream !== "function" && typeof stream !== "string" && typeof stream !== "boolean" && typeof stream !== "number" && !Buffer.isBuffer(stream);
    };
    CombinedStream.prototype.append = function(stream) {
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        if (!(stream instanceof DelayedStream)) {
          var newStream = DelayedStream.create(stream, {
            maxDataSize: Infinity,
            pauseStream: this.pauseStreams
          });
          stream.on("data", this._checkDataSize.bind(this));
          stream = newStream;
        }
        this._handleErrors(stream);
        if (this.pauseStreams) {
          stream.pause();
        }
      }
      this._streams.push(stream);
      return this;
    };
    CombinedStream.prototype.pipe = function(dest, options) {
      Stream.prototype.pipe.call(this, dest, options);
      this.resume();
      return dest;
    };
    CombinedStream.prototype._getNext = function() {
      this._currentStream = null;
      if (this._insideLoop) {
        this._pendingNext = true;
        return;
      }
      this._insideLoop = true;
      try {
        do {
          this._pendingNext = false;
          this._realGetNext();
        } while (this._pendingNext);
      } finally {
        this._insideLoop = false;
      }
    };
    CombinedStream.prototype._realGetNext = function() {
      var stream = this._streams.shift();
      if (typeof stream == "undefined") {
        this.end();
        return;
      }
      if (typeof stream !== "function") {
        this._pipeNext(stream);
        return;
      }
      var getStream = stream;
      getStream(function(stream2) {
        var isStreamLike = CombinedStream.isStreamLike(stream2);
        if (isStreamLike) {
          stream2.on("data", this._checkDataSize.bind(this));
          this._handleErrors(stream2);
        }
        this._pipeNext(stream2);
      }.bind(this));
    };
    CombinedStream.prototype._pipeNext = function(stream) {
      this._currentStream = stream;
      var isStreamLike = CombinedStream.isStreamLike(stream);
      if (isStreamLike) {
        stream.on("end", this._getNext.bind(this));
        stream.pipe(this, { end: false });
        return;
      }
      var value = stream;
      this.write(value);
      this._getNext();
    };
    CombinedStream.prototype._handleErrors = function(stream) {
      var self = this;
      stream.on("error", function(err) {
        self._emitError(err);
      });
    };
    CombinedStream.prototype.write = function(data) {
      this.emit("data", data);
    };
    CombinedStream.prototype.pause = function() {
      if (!this.pauseStreams) {
        return;
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function")
        this._currentStream.pause();
      this.emit("pause");
    };
    CombinedStream.prototype.resume = function() {
      if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function")
        this._currentStream.resume();
      this.emit("resume");
    };
    CombinedStream.prototype.end = function() {
      this._reset();
      this.emit("end");
    };
    CombinedStream.prototype.destroy = function() {
      this._reset();
      this.emit("close");
    };
    CombinedStream.prototype._reset = function() {
      this.writable = false;
      this._streams = [];
      this._currentStream = null;
    };
    CombinedStream.prototype._checkDataSize = function() {
      this._updateDataSize();
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this._emitError(new Error(message));
    };
    CombinedStream.prototype._updateDataSize = function() {
      this.dataSize = 0;
      var self = this;
      this._streams.forEach(function(stream) {
        if (!stream.dataSize) {
          return;
        }
        self.dataSize += stream.dataSize;
      });
      if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
      }
    };
    CombinedStream.prototype._emitError = function(err) {
      this._reset();
      this.emit("error", err);
    };
  }
});

// node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/mime-db/db.json"(exports, module2) {
    module2.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/mime-db/index.js"(exports, module2) {
    module2.exports = require_db();
  }
});

// node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/mime-types/index.js"(exports) {
    "use strict";
    var db = require_mime_db();
    var extname = require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports.charset = charset;
    exports.charsets = { lookup: charset };
    exports.contentType = contentType;
    exports.extension = extension;
    exports.extensions = /* @__PURE__ */ Object.create(null);
    exports.lookup = lookup;
    exports.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports.extensions, exports.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports.charset(mime);
        if (charset2)
          mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path) {
      if (!path || typeof path !== "string") {
        return false;
      }
      var extension2 = extname("x." + path).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to2 = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to2 || from === to2 && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  }
});

// node_modules/asynckit/lib/defer.js
var require_defer = __commonJS({
  "node_modules/asynckit/lib/defer.js"(exports, module2) {
    module2.exports = defer;
    function defer(fn) {
      var nextTick = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
      if (nextTick) {
        nextTick(fn);
      } else {
        setTimeout(fn, 0);
      }
    }
  }
});

// node_modules/asynckit/lib/async.js
var require_async = __commonJS({
  "node_modules/asynckit/lib/async.js"(exports, module2) {
    var defer = require_defer();
    module2.exports = async;
    function async(callback) {
      var isAsync = false;
      defer(function() {
        isAsync = true;
      });
      return function async_callback(err, result) {
        if (isAsync) {
          callback(err, result);
        } else {
          defer(function nextTick_callback() {
            callback(err, result);
          });
        }
      };
    }
  }
});

// node_modules/asynckit/lib/abort.js
var require_abort = __commonJS({
  "node_modules/asynckit/lib/abort.js"(exports, module2) {
    module2.exports = abort;
    function abort(state) {
      Object.keys(state.jobs).forEach(clean.bind(state));
      state.jobs = {};
    }
    function clean(key) {
      if (typeof this.jobs[key] == "function") {
        this.jobs[key]();
      }
    }
  }
});

// node_modules/asynckit/lib/iterate.js
var require_iterate = __commonJS({
  "node_modules/asynckit/lib/iterate.js"(exports, module2) {
    var async = require_async();
    var abort = require_abort();
    module2.exports = iterate;
    function iterate(list, iterator, state, callback) {
      var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
      state.jobs[key] = runJob(iterator, key, list[key], function(error, output) {
        if (!(key in state.jobs)) {
          return;
        }
        delete state.jobs[key];
        if (error) {
          abort(state);
        } else {
          state.results[key] = output;
        }
        callback(error, state.results);
      });
    }
    function runJob(iterator, key, item, callback) {
      var aborter;
      if (iterator.length == 2) {
        aborter = iterator(item, async(callback));
      } else {
        aborter = iterator(item, key, async(callback));
      }
      return aborter;
    }
  }
});

// node_modules/asynckit/lib/state.js
var require_state = __commonJS({
  "node_modules/asynckit/lib/state.js"(exports, module2) {
    module2.exports = state;
    function state(list, sortMethod) {
      var isNamedList = !Array.isArray(list), initState = {
        index: 0,
        keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
        jobs: {},
        results: isNamedList ? {} : [],
        size: isNamedList ? Object.keys(list).length : list.length
      };
      if (sortMethod) {
        initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
          return sortMethod(list[a], list[b]);
        });
      }
      return initState;
    }
  }
});

// node_modules/asynckit/lib/terminator.js
var require_terminator = __commonJS({
  "node_modules/asynckit/lib/terminator.js"(exports, module2) {
    var abort = require_abort();
    var async = require_async();
    module2.exports = terminator;
    function terminator(callback) {
      if (!Object.keys(this.jobs).length) {
        return;
      }
      this.index = this.size;
      abort(this);
      async(callback)(null, this.results);
    }
  }
});

// node_modules/asynckit/parallel.js
var require_parallel = __commonJS({
  "node_modules/asynckit/parallel.js"(exports, module2) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = parallel;
    function parallel(list, iterator, callback) {
      var state = initState(list);
      while (state.index < (state["keyedList"] || list).length) {
        iterate(list, iterator, state, function(error, result) {
          if (error) {
            callback(error, result);
            return;
          }
          if (Object.keys(state.jobs).length === 0) {
            callback(null, state.results);
            return;
          }
        });
        state.index++;
      }
      return terminator.bind(state, callback);
    }
  }
});

// node_modules/asynckit/serialOrdered.js
var require_serialOrdered = __commonJS({
  "node_modules/asynckit/serialOrdered.js"(exports, module2) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = serialOrdered;
    module2.exports.ascending = ascending;
    module2.exports.descending = descending;
    function serialOrdered(list, iterator, sortMethod, callback) {
      var state = initState(list, sortMethod);
      iterate(list, iterator, state, function iteratorHandler(error, result) {
        if (error) {
          callback(error, result);
          return;
        }
        state.index++;
        if (state.index < (state["keyedList"] || list).length) {
          iterate(list, iterator, state, iteratorHandler);
          return;
        }
        callback(null, state.results);
      });
      return terminator.bind(state, callback);
    }
    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    function descending(a, b) {
      return -1 * ascending(a, b);
    }
  }
});

// node_modules/asynckit/serial.js
var require_serial = __commonJS({
  "node_modules/asynckit/serial.js"(exports, module2) {
    var serialOrdered = require_serialOrdered();
    module2.exports = serial;
    function serial(list, iterator, callback) {
      return serialOrdered(list, iterator, null, callback);
    }
  }
});

// node_modules/asynckit/index.js
var require_asynckit = __commonJS({
  "node_modules/asynckit/index.js"(exports, module2) {
    module2.exports = {
      parallel: require_parallel(),
      serial: require_serial(),
      serialOrdered: require_serialOrdered()
    };
  }
});

// node_modules/form-data/lib/populate.js
var require_populate = __commonJS({
  "node_modules/form-data/lib/populate.js"(exports, module2) {
    module2.exports = function(dst, src) {
      Object.keys(src).forEach(function(prop) {
        dst[prop] = dst[prop] || src[prop];
      });
      return dst;
    };
  }
});

// node_modules/form-data/lib/form_data.js
var require_form_data = __commonJS({
  "node_modules/form-data/lib/form_data.js"(exports, module2) {
    var CombinedStream = require_combined_stream();
    var util = require("util");
    var path = require("path");
    var http = require("http");
    var https = require("https");
    var parseUrl = require("url").parse;
    var fs = require("fs");
    var Stream = require("stream").Stream;
    var mime = require_mime_types();
    var asynckit = require_asynckit();
    var populate = require_populate();
    module2.exports = FormData2;
    util.inherits(FormData2, CombinedStream);
    function FormData2(options) {
      if (!(this instanceof FormData2)) {
        return new FormData2(options);
      }
      this._overheadLength = 0;
      this._valueLength = 0;
      this._valuesToMeasure = [];
      CombinedStream.call(this);
      options = options || {};
      for (var option in options) {
        this[option] = options[option];
      }
    }
    FormData2.LINE_BREAK = "\r\n";
    FormData2.DEFAULT_CONTENT_TYPE = "application/octet-stream";
    FormData2.prototype.append = function(field, value, options) {
      options = options || {};
      if (typeof options == "string") {
        options = { filename: options };
      }
      var append = CombinedStream.prototype.append.bind(this);
      if (typeof value == "number") {
        value = "" + value;
      }
      if (util.isArray(value)) {
        this._error(new Error("Arrays are not supported."));
        return;
      }
      var header = this._multiPartHeader(field, value, options);
      var footer = this._multiPartFooter();
      append(header);
      append(value);
      append(footer);
      this._trackLength(header, value, options);
    };
    FormData2.prototype._trackLength = function(header, value, options) {
      var valueLength = 0;
      if (options.knownLength != null) {
        valueLength += +options.knownLength;
      } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
      } else if (typeof value === "string") {
        valueLength = Buffer.byteLength(value);
      }
      this._valueLength += valueLength;
      this._overheadLength += Buffer.byteLength(header) + FormData2.LINE_BREAK.length;
      if (!value || !value.path && !(value.readable && value.hasOwnProperty("httpVersion")) && !(value instanceof Stream)) {
        return;
      }
      if (!options.knownLength) {
        this._valuesToMeasure.push(value);
      }
    };
    FormData2.prototype._lengthRetriever = function(value, callback) {
      if (value.hasOwnProperty("fd")) {
        if (value.end != void 0 && value.end != Infinity && value.start != void 0) {
          callback(null, value.end + 1 - (value.start ? value.start : 0));
        } else {
          fs.stat(value.path, function(err, stat) {
            var fileSize;
            if (err) {
              callback(err);
              return;
            }
            fileSize = stat.size - (value.start ? value.start : 0);
            callback(null, fileSize);
          });
        }
      } else if (value.hasOwnProperty("httpVersion")) {
        callback(null, +value.headers["content-length"]);
      } else if (value.hasOwnProperty("httpModule")) {
        value.on("response", function(response) {
          value.pause();
          callback(null, +response.headers["content-length"]);
        });
        value.resume();
      } else {
        callback("Unknown stream");
      }
    };
    FormData2.prototype._multiPartHeader = function(field, value, options) {
      if (typeof options.header == "string") {
        return options.header;
      }
      var contentDisposition = this._getContentDisposition(value, options);
      var contentType = this._getContentType(value, options);
      var contents = "";
      var headers = {
        "Content-Disposition": ["form-data", 'name="' + field + '"'].concat(contentDisposition || []),
        "Content-Type": [].concat(contentType || [])
      };
      if (typeof options.header == "object") {
        populate(headers, options.header);
      }
      var header;
      for (var prop in headers) {
        if (!headers.hasOwnProperty(prop))
          continue;
        header = headers[prop];
        if (header == null) {
          continue;
        }
        if (!Array.isArray(header)) {
          header = [header];
        }
        if (header.length) {
          contents += prop + ": " + header.join("; ") + FormData2.LINE_BREAK;
        }
      }
      return "--" + this.getBoundary() + FormData2.LINE_BREAK + contents + FormData2.LINE_BREAK;
    };
    FormData2.prototype._getContentDisposition = function(value, options) {
      var filename, contentDisposition;
      if (typeof options.filepath === "string") {
        filename = path.normalize(options.filepath).replace(/\\/g, "/");
      } else if (options.filename || value.name || value.path) {
        filename = path.basename(options.filename || value.name || value.path);
      } else if (value.readable && value.hasOwnProperty("httpVersion")) {
        filename = path.basename(value.client._httpMessage.path || "");
      }
      if (filename) {
        contentDisposition = 'filename="' + filename + '"';
      }
      return contentDisposition;
    };
    FormData2.prototype._getContentType = function(value, options) {
      var contentType = options.contentType;
      if (!contentType && value.name) {
        contentType = mime.lookup(value.name);
      }
      if (!contentType && value.path) {
        contentType = mime.lookup(value.path);
      }
      if (!contentType && value.readable && value.hasOwnProperty("httpVersion")) {
        contentType = value.headers["content-type"];
      }
      if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
      }
      if (!contentType && typeof value == "object") {
        contentType = FormData2.DEFAULT_CONTENT_TYPE;
      }
      return contentType;
    };
    FormData2.prototype._multiPartFooter = function() {
      return function(next) {
        var footer = FormData2.LINE_BREAK;
        var lastPart = this._streams.length === 0;
        if (lastPart) {
          footer += this._lastBoundary();
        }
        next(footer);
      }.bind(this);
    };
    FormData2.prototype._lastBoundary = function() {
      return "--" + this.getBoundary() + "--" + FormData2.LINE_BREAK;
    };
    FormData2.prototype.getHeaders = function(userHeaders) {
      var header;
      var formHeaders = {
        "content-type": "multipart/form-data; boundary=" + this.getBoundary()
      };
      for (header in userHeaders) {
        if (userHeaders.hasOwnProperty(header)) {
          formHeaders[header.toLowerCase()] = userHeaders[header];
        }
      }
      return formHeaders;
    };
    FormData2.prototype.setBoundary = function(boundary) {
      this._boundary = boundary;
    };
    FormData2.prototype.getBoundary = function() {
      if (!this._boundary) {
        this._generateBoundary();
      }
      return this._boundary;
    };
    FormData2.prototype.getBuffer = function() {
      var dataBuffer = new Buffer.alloc(0);
      var boundary = this.getBoundary();
      for (var i = 0, len = this._streams.length; i < len; i++) {
        if (typeof this._streams[i] !== "function") {
          if (Buffer.isBuffer(this._streams[i])) {
            dataBuffer = Buffer.concat([dataBuffer, this._streams[i]]);
          } else {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(this._streams[i])]);
          }
          if (typeof this._streams[i] !== "string" || this._streams[i].substring(2, boundary.length + 2) !== boundary) {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(FormData2.LINE_BREAK)]);
          }
        }
      }
      return Buffer.concat([dataBuffer, Buffer.from(this._lastBoundary())]);
    };
    FormData2.prototype._generateBoundary = function() {
      var boundary = "--------------------------";
      for (var i = 0; i < 24; i++) {
        boundary += Math.floor(Math.random() * 10).toString(16);
      }
      this._boundary = boundary;
    };
    FormData2.prototype.getLengthSync = function() {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this.hasKnownLength()) {
        this._error(new Error("Cannot calculate proper length in synchronous way."));
      }
      return knownLength;
    };
    FormData2.prototype.hasKnownLength = function() {
      var hasKnownLength = true;
      if (this._valuesToMeasure.length) {
        hasKnownLength = false;
      }
      return hasKnownLength;
    };
    FormData2.prototype.getLength = function(cb) {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
      }
      asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
        if (err) {
          cb(err);
          return;
        }
        values.forEach(function(length) {
          knownLength += length;
        });
        cb(null, knownLength);
      });
    };
    FormData2.prototype.submit = function(params, cb) {
      var request, options, defaults = { method: "post" };
      if (typeof params == "string") {
        params = parseUrl(params);
        options = populate({
          port: params.port,
          path: params.pathname,
          host: params.hostname,
          protocol: params.protocol
        }, defaults);
      } else {
        options = populate(params, defaults);
        if (!options.port) {
          options.port = options.protocol == "https:" ? 443 : 80;
        }
      }
      options.headers = this.getHeaders(params.headers);
      if (options.protocol == "https:") {
        request = https.request(options);
      } else {
        request = http.request(options);
      }
      this.getLength(function(err, length) {
        if (err && err !== "Unknown stream") {
          this._error(err);
          return;
        }
        if (length) {
          request.setHeader("Content-Length", length);
        }
        this.pipe(request);
        if (cb) {
          var onResponse;
          var callback = function(error, responce) {
            request.removeListener("error", callback);
            request.removeListener("response", onResponse);
            return cb.call(this, error, responce);
          };
          onResponse = callback.bind(this, null);
          request.on("error", callback);
          request.on("response", onResponse);
        }
      }.bind(this));
      return request;
    };
    FormData2.prototype._error = function(err) {
      if (!this.error) {
        this.error = err;
        this.pause();
        this.emit("error", err);
      }
    };
    FormData2.prototype.toString = function() {
      return "[object FormData]";
    };
  }
});

// node_modules/axios/lib/defaults/env/FormData.js
var require_FormData = __commonJS({
  "node_modules/axios/lib/defaults/env/FormData.js"(exports, module2) {
    module2.exports = require_form_data();
  }
});

// node_modules/axios/lib/defaults/index.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults/index.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var AxiosError = require_AxiosError();
    var transitionalDefaults = require_transitional();
    var toFormData = require_toFormData();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_http();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        var isObjectPayload = utils.isObject(data);
        var contentType = headers && headers["Content-Type"];
        var isFileList;
        if ((isFileList = utils.isFileList(data)) || isObjectPayload && contentType === "multipart/form-data") {
          var _FormData = this.env && this.env.FormData;
          return toFormData(isFileList ? { "files[]": data } : data, _FormData && new _FormData());
        } else if (isObjectPayload || contentType === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: require_FormData()
      },
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module2.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module2.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module2) {
    "use strict";
    module2.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var CanceledError = require_CanceledError();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new CanceledError();
      }
    }
    module2.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "beforeRedirect": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module2) {
    "use strict";
    var VERSION = require_data().version;
    var AxiosError = require_AxiosError();
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new AxiosError(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError.ERR_DEPRECATED);
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }
    module2.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var buildFullPath = require_buildFullPath();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      var fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            headers: isForm ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url,
            data
          }));
        };
      }
      Axios.prototype[method] = generateHTTPMethod();
      Axios.prototype[method + "Form"] = generateHTTPMethod(true);
    });
    module2.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module2) {
    "use strict";
    var CanceledError = require_CanceledError();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module2.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module2) {
    "use strict";
    module2.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios2 = createInstance(defaults);
    axios2.Axios = Axios;
    axios2.CanceledError = require_CanceledError();
    axios2.CancelToken = require_CancelToken();
    axios2.isCancel = require_isCancel();
    axios2.VERSION = require_data().version;
    axios2.toFormData = require_toFormData();
    axios2.AxiosError = require_AxiosError();
    axios2.Cancel = axios2.CanceledError;
    axios2.all = function all(promises) {
      return Promise.all(promises);
    };
    axios2.spread = require_spread();
    axios2.isAxiosError = require_isAxiosError();
    module2.exports = axios2;
    module2.exports.default = axios2;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module2) {
    module2.exports = require_axios();
  }
});

// node_modules/await-to-js/dist/await-to-js.umd.js
var require_await_to_js_umd = __commonJS({
  "node_modules/await-to-js/dist/await-to-js.umd.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global.awaitToJs = {});
    })(exports, function(exports2) {
      "use strict";
      function to2(promise, errorExt) {
        return promise.then(function(data) {
          return [null, data];
        }).catch(function(err) {
          if (errorExt) {
            Object.assign(err, errorExt);
          }
          return [err, void 0];
        });
      }
      exports2.to = to2;
      exports2["default"] = to2;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/nodemailer/lib/fetch/cookies.js
var require_cookies2 = __commonJS({
  "node_modules/nodemailer/lib/fetch/cookies.js"(exports, module2) {
    "use strict";
    var urllib = require("url");
    var SESSION_TIMEOUT = 1800;
    var Cookies = class {
      constructor(options) {
        this.options = options || {};
        this.cookies = [];
      }
      set(cookieStr, url) {
        let urlparts = urllib.parse(url || "");
        let cookie = this.parse(cookieStr);
        let domain;
        if (cookie.domain) {
          domain = cookie.domain.replace(/^\./, "");
          if (urlparts.hostname.length < domain.length || ("." + urlparts.hostname).substr(-domain.length + 1) !== "." + domain) {
            cookie.domain = urlparts.hostname;
          }
        } else {
          cookie.domain = urlparts.hostname;
        }
        if (!cookie.path) {
          cookie.path = this.getPath(urlparts.pathname);
        }
        if (!cookie.expires) {
          cookie.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || SESSION_TIMEOUT) || SESSION_TIMEOUT) * 1e3);
        }
        return this.add(cookie);
      }
      get(url) {
        return this.list(url).map((cookie) => cookie.name + "=" + cookie.value).join("; ");
      }
      list(url) {
        let result = [];
        let i;
        let cookie;
        for (i = this.cookies.length - 1; i >= 0; i--) {
          cookie = this.cookies[i];
          if (this.isExpired(cookie)) {
            this.cookies.splice(i, i);
            continue;
          }
          if (this.match(cookie, url)) {
            result.unshift(cookie);
          }
        }
        return result;
      }
      parse(cookieStr) {
        let cookie = {};
        (cookieStr || "").toString().split(";").forEach((cookiePart) => {
          let valueParts = cookiePart.split("=");
          let key = valueParts.shift().trim().toLowerCase();
          let value = valueParts.join("=").trim();
          let domain;
          if (!key) {
            return;
          }
          switch (key) {
            case "expires":
              value = new Date(value);
              if (value.toString() !== "Invalid Date") {
                cookie.expires = value;
              }
              break;
            case "path":
              cookie.path = value;
              break;
            case "domain":
              domain = value.toLowerCase();
              if (domain.length && domain.charAt(0) !== ".") {
                domain = "." + domain;
              }
              cookie.domain = domain;
              break;
            case "max-age":
              cookie.expires = new Date(Date.now() + (Number(value) || 0) * 1e3);
              break;
            case "secure":
              cookie.secure = true;
              break;
            case "httponly":
              cookie.httponly = true;
              break;
            default:
              if (!cookie.name) {
                cookie.name = key;
                cookie.value = value;
              }
          }
        });
        return cookie;
      }
      match(cookie, url) {
        let urlparts = urllib.parse(url || "");
        if (urlparts.hostname !== cookie.domain && (cookie.domain.charAt(0) !== "." || ("." + urlparts.hostname).substr(-cookie.domain.length) !== cookie.domain)) {
          return false;
        }
        let path = this.getPath(urlparts.pathname);
        if (path.substr(0, cookie.path.length) !== cookie.path) {
          return false;
        }
        if (cookie.secure && urlparts.protocol !== "https:") {
          return false;
        }
        return true;
      }
      add(cookie) {
        let i;
        let len;
        if (!cookie || !cookie.name) {
          return false;
        }
        for (i = 0, len = this.cookies.length; i < len; i++) {
          if (this.compare(this.cookies[i], cookie)) {
            if (this.isExpired(cookie)) {
              this.cookies.splice(i, 1);
              return false;
            }
            this.cookies[i] = cookie;
            return true;
          }
        }
        if (!this.isExpired(cookie)) {
          this.cookies.push(cookie);
        }
        return true;
      }
      compare(a, b) {
        return a.name === b.name && a.path === b.path && a.domain === b.domain && a.secure === b.secure && a.httponly === a.httponly;
      }
      isExpired(cookie) {
        return cookie.expires && cookie.expires < new Date() || !cookie.value;
      }
      getPath(pathname) {
        let path = (pathname || "/").split("/");
        path.pop();
        path = path.join("/").trim();
        if (path.charAt(0) !== "/") {
          path = "/" + path;
        }
        if (path.substr(-1) !== "/") {
          path += "/";
        }
        return path;
      }
    };
    module2.exports = Cookies;
  }
});

// node_modules/nodemailer/package.json
var require_package = __commonJS({
  "node_modules/nodemailer/package.json"(exports, module2) {
    module2.exports = {
      name: "nodemailer",
      version: "6.7.7",
      description: "Easy as cake e-mail sending from your Node.js applications",
      main: "lib/nodemailer.js",
      scripts: {
        test: "grunt --trace-warnings"
      },
      repository: {
        type: "git",
        url: "https://github.com/nodemailer/nodemailer.git"
      },
      keywords: [
        "Nodemailer"
      ],
      author: "Andris Reinman",
      license: "MIT",
      bugs: {
        url: "https://github.com/nodemailer/nodemailer/issues"
      },
      homepage: "https://nodemailer.com/",
      devDependencies: {
        "@aws-sdk/client-ses": "3.121.0",
        "aws-sdk": "2.1168.0",
        bunyan: "1.8.15",
        chai: "4.3.6",
        "eslint-config-nodemailer": "1.2.0",
        "eslint-config-prettier": "8.5.0",
        grunt: "1.5.3",
        "grunt-cli": "1.4.3",
        "grunt-eslint": "24.0.0",
        "grunt-mocha-test": "0.13.3",
        libbase64: "1.2.1",
        libmime: "5.1.0",
        libqp: "1.1.0",
        mocha: "10.0.0",
        "nodemailer-ntlm-auth": "1.0.1",
        proxy: "1.0.2",
        "proxy-test-server": "1.0.0",
        sinon: "14.0.0",
        "smtp-server": "3.11.0"
      },
      engines: {
        node: ">=6.0.0"
      }
    };
  }
});

// node_modules/nodemailer/lib/fetch/index.js
var require_fetch = __commonJS({
  "node_modules/nodemailer/lib/fetch/index.js"(exports, module2) {
    "use strict";
    var http = require("http");
    var https = require("https");
    var urllib = require("url");
    var zlib = require("zlib");
    var PassThrough = require("stream").PassThrough;
    var Cookies = require_cookies2();
    var packageData = require_package();
    var MAX_REDIRECTS = 5;
    module2.exports = function(url, options) {
      return nmfetch(url, options);
    };
    module2.exports.Cookies = Cookies;
    function nmfetch(url, options) {
      options = options || {};
      options.fetchRes = options.fetchRes || new PassThrough();
      options.cookies = options.cookies || new Cookies();
      options.redirects = options.redirects || 0;
      options.maxRedirects = isNaN(options.maxRedirects) ? MAX_REDIRECTS : options.maxRedirects;
      if (options.cookie) {
        [].concat(options.cookie || []).forEach((cookie) => {
          options.cookies.set(cookie, url);
        });
        options.cookie = false;
      }
      let fetchRes = options.fetchRes;
      let parsed = urllib.parse(url);
      let method = (options.method || "").toString().trim().toUpperCase() || "GET";
      let finished = false;
      let cookies;
      let body;
      let handler = parsed.protocol === "https:" ? https : http;
      let headers = {
        "accept-encoding": "gzip,deflate",
        "user-agent": "nodemailer/" + packageData.version
      };
      Object.keys(options.headers || {}).forEach((key) => {
        headers[key.toLowerCase().trim()] = options.headers[key];
      });
      if (options.userAgent) {
        headers["user-agent"] = options.userAgent;
      }
      if (parsed.auth) {
        headers.Authorization = "Basic " + Buffer.from(parsed.auth).toString("base64");
      }
      if (cookies = options.cookies.get(url)) {
        headers.cookie = cookies;
      }
      if (options.body) {
        if (options.contentType !== false) {
          headers["Content-Type"] = options.contentType || "application/x-www-form-urlencoded";
        }
        if (typeof options.body.pipe === "function") {
          headers["Transfer-Encoding"] = "chunked";
          body = options.body;
          body.on("error", (err) => {
            if (finished) {
              return;
            }
            finished = true;
            err.type = "FETCH";
            err.sourceUrl = url;
            fetchRes.emit("error", err);
          });
        } else {
          if (options.body instanceof Buffer) {
            body = options.body;
          } else if (typeof options.body === "object") {
            try {
              body = Buffer.from(Object.keys(options.body).map((key) => {
                let value = options.body[key].toString().trim();
                return encodeURIComponent(key) + "=" + encodeURIComponent(value);
              }).join("&"));
            } catch (E) {
              if (finished) {
                return;
              }
              finished = true;
              E.type = "FETCH";
              E.sourceUrl = url;
              fetchRes.emit("error", E);
              return;
            }
          } else {
            body = Buffer.from(options.body.toString().trim());
          }
          headers["Content-Type"] = options.contentType || "application/x-www-form-urlencoded";
          headers["Content-Length"] = body.length;
        }
        method = (options.method || "").toString().trim().toUpperCase() || "POST";
      }
      let req;
      let reqOptions = {
        method,
        host: parsed.hostname,
        path: parsed.path,
        port: parsed.port ? parsed.port : parsed.protocol === "https:" ? 443 : 80,
        headers,
        rejectUnauthorized: false,
        agent: false
      };
      if (options.tls) {
        Object.keys(options.tls).forEach((key) => {
          reqOptions[key] = options.tls[key];
        });
      }
      try {
        req = handler.request(reqOptions);
      } catch (E) {
        finished = true;
        setImmediate(() => {
          E.type = "FETCH";
          E.sourceUrl = url;
          fetchRes.emit("error", E);
        });
        return fetchRes;
      }
      if (options.timeout) {
        req.setTimeout(options.timeout, () => {
          if (finished) {
            return;
          }
          finished = true;
          req.abort();
          let err = new Error("Request Timeout");
          err.type = "FETCH";
          err.sourceUrl = url;
          fetchRes.emit("error", err);
        });
      }
      req.on("error", (err) => {
        if (finished) {
          return;
        }
        finished = true;
        err.type = "FETCH";
        err.sourceUrl = url;
        fetchRes.emit("error", err);
      });
      req.on("response", (res) => {
        let inflate;
        if (finished) {
          return;
        }
        switch (res.headers["content-encoding"]) {
          case "gzip":
          case "deflate":
            inflate = zlib.createUnzip();
            break;
        }
        if (res.headers["set-cookie"]) {
          [].concat(res.headers["set-cookie"] || []).forEach((cookie) => {
            options.cookies.set(cookie, url);
          });
        }
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          options.redirects++;
          if (options.redirects > options.maxRedirects) {
            finished = true;
            let err = new Error("Maximum redirect count exceeded");
            err.type = "FETCH";
            err.sourceUrl = url;
            fetchRes.emit("error", err);
            req.abort();
            return;
          }
          options.method = "GET";
          options.body = false;
          return nmfetch(urllib.resolve(url, res.headers.location), options);
        }
        fetchRes.statusCode = res.statusCode;
        fetchRes.headers = res.headers;
        if (res.statusCode >= 300 && !options.allowErrorResponse) {
          finished = true;
          let err = new Error("Invalid status code " + res.statusCode);
          err.type = "FETCH";
          err.sourceUrl = url;
          fetchRes.emit("error", err);
          req.abort();
          return;
        }
        res.on("error", (err) => {
          if (finished) {
            return;
          }
          finished = true;
          err.type = "FETCH";
          err.sourceUrl = url;
          fetchRes.emit("error", err);
          req.abort();
        });
        if (inflate) {
          res.pipe(inflate).pipe(fetchRes);
          inflate.on("error", (err) => {
            if (finished) {
              return;
            }
            finished = true;
            err.type = "FETCH";
            err.sourceUrl = url;
            fetchRes.emit("error", err);
            req.abort();
          });
        } else {
          res.pipe(fetchRes);
        }
      });
      setImmediate(() => {
        if (body) {
          try {
            if (typeof body.pipe === "function") {
              return body.pipe(req);
            } else {
              req.write(body);
            }
          } catch (err) {
            finished = true;
            err.type = "FETCH";
            err.sourceUrl = url;
            fetchRes.emit("error", err);
            return;
          }
        }
        req.end();
      });
      return fetchRes;
    }
  }
});

// node_modules/nodemailer/lib/shared/index.js
var require_shared = __commonJS({
  "node_modules/nodemailer/lib/shared/index.js"(exports, module2) {
    "use strict";
    var urllib = require("url");
    var util = require("util");
    var fs = require("fs");
    var nmfetch = require_fetch();
    var dns = require("dns");
    var net = require("net");
    var os = require("os");
    var DNS_TTL = 5 * 60 * 1e3;
    var networkInterfaces;
    try {
      networkInterfaces = os.networkInterfaces();
    } catch (err) {
    }
    module2.exports.networkInterfaces = networkInterfaces;
    var isFamilySupported = (family, allowInternal) => {
      let networkInterfaces2 = module2.exports.networkInterfaces;
      if (!networkInterfaces2) {
        return true;
      }
      const familySupported = Object.keys(networkInterfaces2).map((key) => networkInterfaces2[key]).reduce((acc, val) => acc.concat(val), []).filter((i) => !i.internal || allowInternal).filter((i) => i.family === "IPv" + family || i.family === family).length > 0;
      return familySupported;
    };
    var resolver = (family, hostname, options, callback) => {
      options = options || {};
      const familySupported = isFamilySupported(family, options.allowInternalNetworkInterfaces);
      if (!familySupported) {
        return callback(null, []);
      }
      dns["resolve" + family](hostname, (err, addresses) => {
        if (err) {
          switch (err.code) {
            case dns.NODATA:
            case dns.NOTFOUND:
            case dns.NOTIMP:
            case dns.SERVFAIL:
            case dns.CONNREFUSED:
            case "EAI_AGAIN":
              return callback(null, []);
          }
          return callback(err);
        }
        return callback(null, Array.isArray(addresses) ? addresses : [].concat(addresses || []));
      });
    };
    var dnsCache = module2.exports.dnsCache = /* @__PURE__ */ new Map();
    var formatDNSValue = (value, extra) => {
      if (!value) {
        return Object.assign({}, extra || {});
      }
      return Object.assign({
        servername: value.servername,
        host: !value.addresses || !value.addresses.length ? null : value.addresses.length === 1 ? value.addresses[0] : value.addresses[Math.floor(Math.random() * value.addresses.length)]
      }, extra || {});
    };
    module2.exports.resolveHostname = (options, callback) => {
      options = options || {};
      if (!options.host && options.servername) {
        options.host = options.servername;
      }
      if (!options.host || net.isIP(options.host)) {
        let value = {
          addresses: [options.host],
          servername: options.servername || false
        };
        return callback(null, formatDNSValue(value, {
          cached: false
        }));
      }
      let cached;
      if (dnsCache.has(options.host)) {
        cached = dnsCache.get(options.host);
        if (!cached.expires || cached.expires >= Date.now()) {
          return callback(null, formatDNSValue(cached.value, {
            cached: true
          }));
        }
      }
      resolver(4, options.host, options, (err, addresses) => {
        if (err) {
          if (cached) {
            return callback(null, formatDNSValue(cached.value, {
              cached: true,
              error: err
            }));
          }
          return callback(err);
        }
        if (addresses && addresses.length) {
          let value = {
            addresses,
            servername: options.servername || options.host
          };
          dnsCache.set(options.host, {
            value,
            expires: Date.now() + (options.dnsTtl || DNS_TTL)
          });
          return callback(null, formatDNSValue(value, {
            cached: false
          }));
        }
        resolver(6, options.host, options, (err2, addresses2) => {
          if (err2) {
            if (cached) {
              return callback(null, formatDNSValue(cached.value, {
                cached: true,
                error: err2
              }));
            }
            return callback(err2);
          }
          if (addresses2 && addresses2.length) {
            let value = {
              addresses: addresses2,
              servername: options.servername || options.host
            };
            dnsCache.set(options.host, {
              value,
              expires: Date.now() + (options.dnsTtl || DNS_TTL)
            });
            return callback(null, formatDNSValue(value, {
              cached: false
            }));
          }
          try {
            dns.lookup(options.host, { all: true }, (err3, addresses3) => {
              if (err3) {
                if (cached) {
                  return callback(null, formatDNSValue(cached.value, {
                    cached: true,
                    error: err3
                  }));
                }
                return callback(err3);
              }
              let address = addresses3 ? addresses3.filter((addr) => isFamilySupported(addr.family)).map((addr) => addr.address).shift() : false;
              if (addresses3 && addresses3.length && !address) {
                let err4 = new Error(`Can not use IPv${addresses3[0].family} addresses with current network`);
                return callback(err4);
              }
              if (!address && cached) {
                return callback(null, formatDNSValue(cached.value, {
                  cached: true
                }));
              }
              let value = {
                addresses: address ? [address] : [options.host],
                servername: options.servername || options.host
              };
              dnsCache.set(options.host, {
                value,
                expires: Date.now() + (options.dnsTtl || DNS_TTL)
              });
              return callback(null, formatDNSValue(value, {
                cached: false
              }));
            });
          } catch (err3) {
            if (cached) {
              return callback(null, formatDNSValue(cached.value, {
                cached: true,
                error: err3
              }));
            }
            return callback(err3);
          }
        });
      });
    };
    module2.exports.parseConnectionUrl = (str) => {
      str = str || "";
      let options = {};
      [urllib.parse(str, true)].forEach((url) => {
        let auth;
        switch (url.protocol) {
          case "smtp:":
            options.secure = false;
            break;
          case "smtps:":
            options.secure = true;
            break;
          case "direct:":
            options.direct = true;
            break;
        }
        if (!isNaN(url.port) && Number(url.port)) {
          options.port = Number(url.port);
        }
        if (url.hostname) {
          options.host = url.hostname;
        }
        if (url.auth) {
          auth = url.auth.split(":");
          if (!options.auth) {
            options.auth = {};
          }
          options.auth.user = auth.shift();
          options.auth.pass = auth.join(":");
        }
        Object.keys(url.query || {}).forEach((key) => {
          let obj = options;
          let lKey = key;
          let value = url.query[key];
          if (!isNaN(value)) {
            value = Number(value);
          }
          switch (value) {
            case "true":
              value = true;
              break;
            case "false":
              value = false;
              break;
          }
          if (key.indexOf("tls.") === 0) {
            lKey = key.substr(4);
            if (!options.tls) {
              options.tls = {};
            }
            obj = options.tls;
          } else if (key.indexOf(".") >= 0) {
            return;
          }
          if (!(lKey in obj)) {
            obj[lKey] = value;
          }
        });
      });
      return options;
    };
    module2.exports._logFunc = (logger, level, defaults, data, message, ...args) => {
      let entry = {};
      Object.keys(defaults || {}).forEach((key) => {
        if (key !== "level") {
          entry[key] = defaults[key];
        }
      });
      Object.keys(data || {}).forEach((key) => {
        if (key !== "level") {
          entry[key] = data[key];
        }
      });
      logger[level](entry, message, ...args);
    };
    module2.exports.getLogger = (options, defaults) => {
      options = options || {};
      let response = {};
      let levels = ["trace", "debug", "info", "warn", "error", "fatal"];
      if (!options.logger) {
        levels.forEach((level) => {
          response[level] = () => false;
        });
        return response;
      }
      let logger = options.logger;
      if (options.logger === true) {
        logger = createDefaultLogger(levels);
      }
      levels.forEach((level) => {
        response[level] = (data, message, ...args) => {
          module2.exports._logFunc(logger, level, defaults, data, message, ...args);
        };
      });
      return response;
    };
    module2.exports.callbackPromise = (resolve, reject) => function() {
      let args = Array.from(arguments);
      let err = args.shift();
      if (err) {
        reject(err);
      } else {
        resolve(...args);
      }
    };
    module2.exports.resolveContent = (data, key, callback) => {
      let promise;
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = module2.exports.callbackPromise(resolve, reject);
        });
      }
      let content = data && data[key] && data[key].content || data[key];
      let contentStream;
      let encoding = (typeof data[key] === "object" && data[key].encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
      if (!content) {
        return callback(null, content);
      }
      if (typeof content === "object") {
        if (typeof content.pipe === "function") {
          return resolveStream(content, (err, value) => {
            if (err) {
              return callback(err);
            }
            if (data[key].content) {
              data[key].content = value;
            } else {
              data[key] = value;
            }
            callback(null, value);
          });
        } else if (/^https?:\/\//i.test(content.path || content.href)) {
          contentStream = nmfetch(content.path || content.href);
          return resolveStream(contentStream, callback);
        } else if (/^data:/i.test(content.path || content.href)) {
          let parts = (content.path || content.href).match(/^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i);
          if (!parts) {
            return callback(null, Buffer.from(0));
          }
          return callback(null, /\bbase64$/i.test(parts[1]) ? Buffer.from(parts[2], "base64") : Buffer.from(decodeURIComponent(parts[2])));
        } else if (content.path) {
          return resolveStream(fs.createReadStream(content.path), callback);
        }
      }
      if (typeof data[key].content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
        content = Buffer.from(data[key].content, encoding);
      }
      setImmediate(() => callback(null, content));
      return promise;
    };
    module2.exports.assign = function() {
      let args = Array.from(arguments);
      let target = args.shift() || {};
      args.forEach((source) => {
        Object.keys(source || {}).forEach((key) => {
          if (["tls", "auth"].includes(key) && source[key] && typeof source[key] === "object") {
            if (!target[key]) {
              target[key] = {};
            }
            Object.keys(source[key]).forEach((subKey) => {
              target[key][subKey] = source[key][subKey];
            });
          } else {
            target[key] = source[key];
          }
        });
      });
      return target;
    };
    module2.exports.encodeXText = (str) => {
      if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(str)) {
        return str;
      }
      let buf = Buffer.from(str);
      let result = "";
      for (let i = 0, len = buf.length; i < len; i++) {
        let c = buf[i];
        if (c < 33 || c > 126 || c === 43 || c === 61) {
          result += "+" + (c < 16 ? "0" : "") + c.toString(16).toUpperCase();
        } else {
          result += String.fromCharCode(c);
        }
      }
      return result;
    };
    function resolveStream(stream, callback) {
      let responded = false;
      let chunks = [];
      let chunklen = 0;
      stream.on("error", (err) => {
        if (responded) {
          return;
        }
        responded = true;
        callback(err);
      });
      stream.on("readable", () => {
        let chunk;
        while ((chunk = stream.read()) !== null) {
          chunks.push(chunk);
          chunklen += chunk.length;
        }
      });
      stream.on("end", () => {
        if (responded) {
          return;
        }
        responded = true;
        let value;
        try {
          value = Buffer.concat(chunks, chunklen);
        } catch (E) {
          return callback(E);
        }
        callback(null, value);
      });
    }
    function createDefaultLogger(levels) {
      let levelMaxLen = 0;
      let levelNames = /* @__PURE__ */ new Map();
      levels.forEach((level) => {
        if (level.length > levelMaxLen) {
          levelMaxLen = level.length;
        }
      });
      levels.forEach((level) => {
        let levelName = level.toUpperCase();
        if (levelName.length < levelMaxLen) {
          levelName += " ".repeat(levelMaxLen - levelName.length);
        }
        levelNames.set(level, levelName);
      });
      let print = (level, entry, message, ...args) => {
        let prefix = "";
        if (entry) {
          if (entry.tnx === "server") {
            prefix = "S: ";
          } else if (entry.tnx === "client") {
            prefix = "C: ";
          }
          if (entry.sid) {
            prefix = "[" + entry.sid + "] " + prefix;
          }
          if (entry.cid) {
            prefix = "[#" + entry.cid + "] " + prefix;
          }
        }
        message = util.format(message, ...args);
        message.split(/\r?\n/).forEach((line) => {
          console.log("[%s] %s %s", new Date().toISOString().substr(0, 19).replace(/T/, " "), levelNames.get(level), prefix + line);
        });
      };
      let logger = {};
      levels.forEach((level) => {
        logger[level] = print.bind(null, level);
      });
      return logger;
    }
  }
});

// node_modules/nodemailer/lib/mime-funcs/mime-types.js
var require_mime_types2 = __commonJS({
  "node_modules/nodemailer/lib/mime-funcs/mime-types.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var defaultMimeType = "application/octet-stream";
    var defaultExtension = "bin";
    var mimeTypes = /* @__PURE__ */ new Map([
      ["application/acad", "dwg"],
      ["application/applixware", "aw"],
      ["application/arj", "arj"],
      ["application/atom+xml", "xml"],
      ["application/atomcat+xml", "atomcat"],
      ["application/atomsvc+xml", "atomsvc"],
      ["application/base64", ["mm", "mme"]],
      ["application/binhex", "hqx"],
      ["application/binhex4", "hqx"],
      ["application/book", ["book", "boo"]],
      ["application/ccxml+xml,", "ccxml"],
      ["application/cdf", "cdf"],
      ["application/cdmi-capability", "cdmia"],
      ["application/cdmi-container", "cdmic"],
      ["application/cdmi-domain", "cdmid"],
      ["application/cdmi-object", "cdmio"],
      ["application/cdmi-queue", "cdmiq"],
      ["application/clariscad", "ccad"],
      ["application/commonground", "dp"],
      ["application/cu-seeme", "cu"],
      ["application/davmount+xml", "davmount"],
      ["application/drafting", "drw"],
      ["application/dsptype", "tsp"],
      ["application/dssc+der", "dssc"],
      ["application/dssc+xml", "xdssc"],
      ["application/dxf", "dxf"],
      ["application/ecmascript", ["js", "es"]],
      ["application/emma+xml", "emma"],
      ["application/envoy", "evy"],
      ["application/epub+zip", "epub"],
      ["application/excel", ["xls", "xl", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
      ["application/exi", "exi"],
      ["application/font-tdpfr", "pfr"],
      ["application/fractals", "fif"],
      ["application/freeloader", "frl"],
      ["application/futuresplash", "spl"],
      ["application/gnutar", "tgz"],
      ["application/groupwise", "vew"],
      ["application/hlp", "hlp"],
      ["application/hta", "hta"],
      ["application/hyperstudio", "stk"],
      ["application/i-deas", "unv"],
      ["application/iges", ["iges", "igs"]],
      ["application/inf", "inf"],
      ["application/internet-property-stream", "acx"],
      ["application/ipfix", "ipfix"],
      ["application/java", "class"],
      ["application/java-archive", "jar"],
      ["application/java-byte-code", "class"],
      ["application/java-serialized-object", "ser"],
      ["application/java-vm", "class"],
      ["application/javascript", "js"],
      ["application/json", "json"],
      ["application/lha", "lha"],
      ["application/lzx", "lzx"],
      ["application/mac-binary", "bin"],
      ["application/mac-binhex", "hqx"],
      ["application/mac-binhex40", "hqx"],
      ["application/mac-compactpro", "cpt"],
      ["application/macbinary", "bin"],
      ["application/mads+xml", "mads"],
      ["application/marc", "mrc"],
      ["application/marcxml+xml", "mrcx"],
      ["application/mathematica", "ma"],
      ["application/mathml+xml", "mathml"],
      ["application/mbedlet", "mbd"],
      ["application/mbox", "mbox"],
      ["application/mcad", "mcd"],
      ["application/mediaservercontrol+xml", "mscml"],
      ["application/metalink4+xml", "meta4"],
      ["application/mets+xml", "mets"],
      ["application/mime", "aps"],
      ["application/mods+xml", "mods"],
      ["application/mp21", "m21"],
      ["application/mp4", "mp4"],
      ["application/mspowerpoint", ["ppt", "pot", "pps", "ppz"]],
      ["application/msword", ["doc", "dot", "w6w", "wiz", "word"]],
      ["application/mswrite", "wri"],
      ["application/mxf", "mxf"],
      ["application/netmc", "mcp"],
      ["application/octet-stream", ["*"]],
      ["application/oda", "oda"],
      ["application/oebps-package+xml", "opf"],
      ["application/ogg", "ogx"],
      ["application/olescript", "axs"],
      ["application/onenote", "onetoc"],
      ["application/patch-ops-error+xml", "xer"],
      ["application/pdf", "pdf"],
      ["application/pgp-encrypted", "asc"],
      ["application/pgp-signature", "pgp"],
      ["application/pics-rules", "prf"],
      ["application/pkcs-12", "p12"],
      ["application/pkcs-crl", "crl"],
      ["application/pkcs10", "p10"],
      ["application/pkcs7-mime", ["p7c", "p7m"]],
      ["application/pkcs7-signature", "p7s"],
      ["application/pkcs8", "p8"],
      ["application/pkix-attr-cert", "ac"],
      ["application/pkix-cert", ["cer", "crt"]],
      ["application/pkix-crl", "crl"],
      ["application/pkix-pkipath", "pkipath"],
      ["application/pkixcmp", "pki"],
      ["application/plain", "text"],
      ["application/pls+xml", "pls"],
      ["application/postscript", ["ps", "ai", "eps"]],
      ["application/powerpoint", "ppt"],
      ["application/pro_eng", ["part", "prt"]],
      ["application/prs.cww", "cww"],
      ["application/pskc+xml", "pskcxml"],
      ["application/rdf+xml", "rdf"],
      ["application/reginfo+xml", "rif"],
      ["application/relax-ng-compact-syntax", "rnc"],
      ["application/resource-lists+xml", "rl"],
      ["application/resource-lists-diff+xml", "rld"],
      ["application/ringing-tones", "rng"],
      ["application/rls-services+xml", "rs"],
      ["application/rsd+xml", "rsd"],
      ["application/rss+xml", "xml"],
      ["application/rtf", ["rtf", "rtx"]],
      ["application/sbml+xml", "sbml"],
      ["application/scvp-cv-request", "scq"],
      ["application/scvp-cv-response", "scs"],
      ["application/scvp-vp-request", "spq"],
      ["application/scvp-vp-response", "spp"],
      ["application/sdp", "sdp"],
      ["application/sea", "sea"],
      ["application/set", "set"],
      ["application/set-payment-initiation", "setpay"],
      ["application/set-registration-initiation", "setreg"],
      ["application/shf+xml", "shf"],
      ["application/sla", "stl"],
      ["application/smil", ["smi", "smil"]],
      ["application/smil+xml", "smi"],
      ["application/solids", "sol"],
      ["application/sounder", "sdr"],
      ["application/sparql-query", "rq"],
      ["application/sparql-results+xml", "srx"],
      ["application/srgs", "gram"],
      ["application/srgs+xml", "grxml"],
      ["application/sru+xml", "sru"],
      ["application/ssml+xml", "ssml"],
      ["application/step", ["step", "stp"]],
      ["application/streamingmedia", "ssm"],
      ["application/tei+xml", "tei"],
      ["application/thraud+xml", "tfi"],
      ["application/timestamped-data", "tsd"],
      ["application/toolbook", "tbk"],
      ["application/vda", "vda"],
      ["application/vnd.3gpp.pic-bw-large", "plb"],
      ["application/vnd.3gpp.pic-bw-small", "psb"],
      ["application/vnd.3gpp.pic-bw-var", "pvb"],
      ["application/vnd.3gpp2.tcap", "tcap"],
      ["application/vnd.3m.post-it-notes", "pwn"],
      ["application/vnd.accpac.simply.aso", "aso"],
      ["application/vnd.accpac.simply.imp", "imp"],
      ["application/vnd.acucobol", "acu"],
      ["application/vnd.acucorp", "atc"],
      ["application/vnd.adobe.air-application-installer-package+zip", "air"],
      ["application/vnd.adobe.fxp", "fxp"],
      ["application/vnd.adobe.xdp+xml", "xdp"],
      ["application/vnd.adobe.xfdf", "xfdf"],
      ["application/vnd.ahead.space", "ahead"],
      ["application/vnd.airzip.filesecure.azf", "azf"],
      ["application/vnd.airzip.filesecure.azs", "azs"],
      ["application/vnd.amazon.ebook", "azw"],
      ["application/vnd.americandynamics.acc", "acc"],
      ["application/vnd.amiga.ami", "ami"],
      ["application/vnd.android.package-archive", "apk"],
      ["application/vnd.anser-web-certificate-issue-initiation", "cii"],
      ["application/vnd.anser-web-funds-transfer-initiation", "fti"],
      ["application/vnd.antix.game-component", "atx"],
      ["application/vnd.apple.installer+xml", "mpkg"],
      ["application/vnd.apple.mpegurl", "m3u8"],
      ["application/vnd.aristanetworks.swi", "swi"],
      ["application/vnd.audiograph", "aep"],
      ["application/vnd.blueice.multipass", "mpm"],
      ["application/vnd.bmi", "bmi"],
      ["application/vnd.businessobjects", "rep"],
      ["application/vnd.chemdraw+xml", "cdxml"],
      ["application/vnd.chipnuts.karaoke-mmd", "mmd"],
      ["application/vnd.cinderella", "cdy"],
      ["application/vnd.claymore", "cla"],
      ["application/vnd.cloanto.rp9", "rp9"],
      ["application/vnd.clonk.c4group", "c4g"],
      ["application/vnd.cluetrust.cartomobile-config", "c11amc"],
      ["application/vnd.cluetrust.cartomobile-config-pkg", "c11amz"],
      ["application/vnd.commonspace", "csp"],
      ["application/vnd.contact.cmsg", "cdbcmsg"],
      ["application/vnd.cosmocaller", "cmc"],
      ["application/vnd.crick.clicker", "clkx"],
      ["application/vnd.crick.clicker.keyboard", "clkk"],
      ["application/vnd.crick.clicker.palette", "clkp"],
      ["application/vnd.crick.clicker.template", "clkt"],
      ["application/vnd.crick.clicker.wordbank", "clkw"],
      ["application/vnd.criticaltools.wbs+xml", "wbs"],
      ["application/vnd.ctc-posml", "pml"],
      ["application/vnd.cups-ppd", "ppd"],
      ["application/vnd.curl.car", "car"],
      ["application/vnd.curl.pcurl", "pcurl"],
      ["application/vnd.data-vision.rdz", "rdz"],
      ["application/vnd.denovo.fcselayout-link", "fe_launch"],
      ["application/vnd.dna", "dna"],
      ["application/vnd.dolby.mlp", "mlp"],
      ["application/vnd.dpgraph", "dpg"],
      ["application/vnd.dreamfactory", "dfac"],
      ["application/vnd.dvb.ait", "ait"],
      ["application/vnd.dvb.service", "svc"],
      ["application/vnd.dynageo", "geo"],
      ["application/vnd.ecowin.chart", "mag"],
      ["application/vnd.enliven", "nml"],
      ["application/vnd.epson.esf", "esf"],
      ["application/vnd.epson.msf", "msf"],
      ["application/vnd.epson.quickanime", "qam"],
      ["application/vnd.epson.salt", "slt"],
      ["application/vnd.epson.ssf", "ssf"],
      ["application/vnd.eszigno3+xml", "es3"],
      ["application/vnd.ezpix-album", "ez2"],
      ["application/vnd.ezpix-package", "ez3"],
      ["application/vnd.fdf", "fdf"],
      ["application/vnd.fdsn.seed", "seed"],
      ["application/vnd.flographit", "gph"],
      ["application/vnd.fluxtime.clip", "ftc"],
      ["application/vnd.framemaker", "fm"],
      ["application/vnd.frogans.fnc", "fnc"],
      ["application/vnd.frogans.ltf", "ltf"],
      ["application/vnd.fsc.weblaunch", "fsc"],
      ["application/vnd.fujitsu.oasys", "oas"],
      ["application/vnd.fujitsu.oasys2", "oa2"],
      ["application/vnd.fujitsu.oasys3", "oa3"],
      ["application/vnd.fujitsu.oasysgp", "fg5"],
      ["application/vnd.fujitsu.oasysprs", "bh2"],
      ["application/vnd.fujixerox.ddd", "ddd"],
      ["application/vnd.fujixerox.docuworks", "xdw"],
      ["application/vnd.fujixerox.docuworks.binder", "xbd"],
      ["application/vnd.fuzzysheet", "fzs"],
      ["application/vnd.genomatix.tuxedo", "txd"],
      ["application/vnd.geogebra.file", "ggb"],
      ["application/vnd.geogebra.tool", "ggt"],
      ["application/vnd.geometry-explorer", "gex"],
      ["application/vnd.geonext", "gxt"],
      ["application/vnd.geoplan", "g2w"],
      ["application/vnd.geospace", "g3w"],
      ["application/vnd.gmx", "gmx"],
      ["application/vnd.google-earth.kml+xml", "kml"],
      ["application/vnd.google-earth.kmz", "kmz"],
      ["application/vnd.grafeq", "gqf"],
      ["application/vnd.groove-account", "gac"],
      ["application/vnd.groove-help", "ghf"],
      ["application/vnd.groove-identity-message", "gim"],
      ["application/vnd.groove-injector", "grv"],
      ["application/vnd.groove-tool-message", "gtm"],
      ["application/vnd.groove-tool-template", "tpl"],
      ["application/vnd.groove-vcard", "vcg"],
      ["application/vnd.hal+xml", "hal"],
      ["application/vnd.handheld-entertainment+xml", "zmm"],
      ["application/vnd.hbci", "hbci"],
      ["application/vnd.hhe.lesson-player", "les"],
      ["application/vnd.hp-hpgl", ["hgl", "hpg", "hpgl"]],
      ["application/vnd.hp-hpid", "hpid"],
      ["application/vnd.hp-hps", "hps"],
      ["application/vnd.hp-jlyt", "jlt"],
      ["application/vnd.hp-pcl", "pcl"],
      ["application/vnd.hp-pclxl", "pclxl"],
      ["application/vnd.hydrostatix.sof-data", "sfd-hdstx"],
      ["application/vnd.hzn-3d-crossword", "x3d"],
      ["application/vnd.ibm.minipay", "mpy"],
      ["application/vnd.ibm.modcap", "afp"],
      ["application/vnd.ibm.rights-management", "irm"],
      ["application/vnd.ibm.secure-container", "sc"],
      ["application/vnd.iccprofile", "icc"],
      ["application/vnd.igloader", "igl"],
      ["application/vnd.immervision-ivp", "ivp"],
      ["application/vnd.immervision-ivu", "ivu"],
      ["application/vnd.insors.igm", "igm"],
      ["application/vnd.intercon.formnet", "xpw"],
      ["application/vnd.intergeo", "i2g"],
      ["application/vnd.intu.qbo", "qbo"],
      ["application/vnd.intu.qfx", "qfx"],
      ["application/vnd.ipunplugged.rcprofile", "rcprofile"],
      ["application/vnd.irepository.package+xml", "irp"],
      ["application/vnd.is-xpr", "xpr"],
      ["application/vnd.isac.fcs", "fcs"],
      ["application/vnd.jam", "jam"],
      ["application/vnd.jcp.javame.midlet-rms", "rms"],
      ["application/vnd.jisp", "jisp"],
      ["application/vnd.joost.joda-archive", "joda"],
      ["application/vnd.kahootz", "ktz"],
      ["application/vnd.kde.karbon", "karbon"],
      ["application/vnd.kde.kchart", "chrt"],
      ["application/vnd.kde.kformula", "kfo"],
      ["application/vnd.kde.kivio", "flw"],
      ["application/vnd.kde.kontour", "kon"],
      ["application/vnd.kde.kpresenter", "kpr"],
      ["application/vnd.kde.kspread", "ksp"],
      ["application/vnd.kde.kword", "kwd"],
      ["application/vnd.kenameaapp", "htke"],
      ["application/vnd.kidspiration", "kia"],
      ["application/vnd.kinar", "kne"],
      ["application/vnd.koan", "skp"],
      ["application/vnd.kodak-descriptor", "sse"],
      ["application/vnd.las.las+xml", "lasxml"],
      ["application/vnd.llamagraphics.life-balance.desktop", "lbd"],
      ["application/vnd.llamagraphics.life-balance.exchange+xml", "lbe"],
      ["application/vnd.lotus-1-2-3", "123"],
      ["application/vnd.lotus-approach", "apr"],
      ["application/vnd.lotus-freelance", "pre"],
      ["application/vnd.lotus-notes", "nsf"],
      ["application/vnd.lotus-organizer", "org"],
      ["application/vnd.lotus-screencam", "scm"],
      ["application/vnd.lotus-wordpro", "lwp"],
      ["application/vnd.macports.portpkg", "portpkg"],
      ["application/vnd.mcd", "mcd"],
      ["application/vnd.medcalcdata", "mc1"],
      ["application/vnd.mediastation.cdkey", "cdkey"],
      ["application/vnd.mfer", "mwf"],
      ["application/vnd.mfmp", "mfm"],
      ["application/vnd.micrografx.flo", "flo"],
      ["application/vnd.micrografx.igx", "igx"],
      ["application/vnd.mif", "mif"],
      ["application/vnd.mobius.daf", "daf"],
      ["application/vnd.mobius.dis", "dis"],
      ["application/vnd.mobius.mbk", "mbk"],
      ["application/vnd.mobius.mqy", "mqy"],
      ["application/vnd.mobius.msl", "msl"],
      ["application/vnd.mobius.plc", "plc"],
      ["application/vnd.mobius.txf", "txf"],
      ["application/vnd.mophun.application", "mpn"],
      ["application/vnd.mophun.certificate", "mpc"],
      ["application/vnd.mozilla.xul+xml", "xul"],
      ["application/vnd.ms-artgalry", "cil"],
      ["application/vnd.ms-cab-compressed", "cab"],
      ["application/vnd.ms-excel", ["xls", "xla", "xlc", "xlm", "xlt", "xlw", "xlb", "xll"]],
      ["application/vnd.ms-excel.addin.macroenabled.12", "xlam"],
      ["application/vnd.ms-excel.sheet.binary.macroenabled.12", "xlsb"],
      ["application/vnd.ms-excel.sheet.macroenabled.12", "xlsm"],
      ["application/vnd.ms-excel.template.macroenabled.12", "xltm"],
      ["application/vnd.ms-fontobject", "eot"],
      ["application/vnd.ms-htmlhelp", "chm"],
      ["application/vnd.ms-ims", "ims"],
      ["application/vnd.ms-lrm", "lrm"],
      ["application/vnd.ms-officetheme", "thmx"],
      ["application/vnd.ms-outlook", "msg"],
      ["application/vnd.ms-pki.certstore", "sst"],
      ["application/vnd.ms-pki.pko", "pko"],
      ["application/vnd.ms-pki.seccat", "cat"],
      ["application/vnd.ms-pki.stl", "stl"],
      ["application/vnd.ms-pkicertstore", "sst"],
      ["application/vnd.ms-pkiseccat", "cat"],
      ["application/vnd.ms-pkistl", "stl"],
      ["application/vnd.ms-powerpoint", ["ppt", "pot", "pps", "ppa", "pwz"]],
      ["application/vnd.ms-powerpoint.addin.macroenabled.12", "ppam"],
      ["application/vnd.ms-powerpoint.presentation.macroenabled.12", "pptm"],
      ["application/vnd.ms-powerpoint.slide.macroenabled.12", "sldm"],
      ["application/vnd.ms-powerpoint.slideshow.macroenabled.12", "ppsm"],
      ["application/vnd.ms-powerpoint.template.macroenabled.12", "potm"],
      ["application/vnd.ms-project", "mpp"],
      ["application/vnd.ms-word.document.macroenabled.12", "docm"],
      ["application/vnd.ms-word.template.macroenabled.12", "dotm"],
      ["application/vnd.ms-works", ["wks", "wcm", "wdb", "wps"]],
      ["application/vnd.ms-wpl", "wpl"],
      ["application/vnd.ms-xpsdocument", "xps"],
      ["application/vnd.mseq", "mseq"],
      ["application/vnd.musician", "mus"],
      ["application/vnd.muvee.style", "msty"],
      ["application/vnd.neurolanguage.nlu", "nlu"],
      ["application/vnd.noblenet-directory", "nnd"],
      ["application/vnd.noblenet-sealer", "nns"],
      ["application/vnd.noblenet-web", "nnw"],
      ["application/vnd.nokia.configuration-message", "ncm"],
      ["application/vnd.nokia.n-gage.data", "ngdat"],
      ["application/vnd.nokia.n-gage.symbian.install", "n-gage"],
      ["application/vnd.nokia.radio-preset", "rpst"],
      ["application/vnd.nokia.radio-presets", "rpss"],
      ["application/vnd.nokia.ringing-tone", "rng"],
      ["application/vnd.novadigm.edm", "edm"],
      ["application/vnd.novadigm.edx", "edx"],
      ["application/vnd.novadigm.ext", "ext"],
      ["application/vnd.oasis.opendocument.chart", "odc"],
      ["application/vnd.oasis.opendocument.chart-template", "otc"],
      ["application/vnd.oasis.opendocument.database", "odb"],
      ["application/vnd.oasis.opendocument.formula", "odf"],
      ["application/vnd.oasis.opendocument.formula-template", "odft"],
      ["application/vnd.oasis.opendocument.graphics", "odg"],
      ["application/vnd.oasis.opendocument.graphics-template", "otg"],
      ["application/vnd.oasis.opendocument.image", "odi"],
      ["application/vnd.oasis.opendocument.image-template", "oti"],
      ["application/vnd.oasis.opendocument.presentation", "odp"],
      ["application/vnd.oasis.opendocument.presentation-template", "otp"],
      ["application/vnd.oasis.opendocument.spreadsheet", "ods"],
      ["application/vnd.oasis.opendocument.spreadsheet-template", "ots"],
      ["application/vnd.oasis.opendocument.text", "odt"],
      ["application/vnd.oasis.opendocument.text-master", "odm"],
      ["application/vnd.oasis.opendocument.text-template", "ott"],
      ["application/vnd.oasis.opendocument.text-web", "oth"],
      ["application/vnd.olpc-sugar", "xo"],
      ["application/vnd.oma.dd2+xml", "dd2"],
      ["application/vnd.openofficeorg.extension", "oxt"],
      ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "pptx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.slide", "sldx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.slideshow", "ppsx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.template", "potx"],
      ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx"],
      ["application/vnd.openxmlformats-officedocument.spreadsheetml.template", "xltx"],
      ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
      ["application/vnd.openxmlformats-officedocument.wordprocessingml.template", "dotx"],
      ["application/vnd.osgeo.mapguide.package", "mgp"],
      ["application/vnd.osgi.dp", "dp"],
      ["application/vnd.palm", "pdb"],
      ["application/vnd.pawaafile", "paw"],
      ["application/vnd.pg.format", "str"],
      ["application/vnd.pg.osasli", "ei6"],
      ["application/vnd.picsel", "efif"],
      ["application/vnd.pmi.widget", "wg"],
      ["application/vnd.pocketlearn", "plf"],
      ["application/vnd.powerbuilder6", "pbd"],
      ["application/vnd.previewsystems.box", "box"],
      ["application/vnd.proteus.magazine", "mgz"],
      ["application/vnd.publishare-delta-tree", "qps"],
      ["application/vnd.pvi.ptid1", "ptid"],
      ["application/vnd.quark.quarkxpress", "qxd"],
      ["application/vnd.realvnc.bed", "bed"],
      ["application/vnd.recordare.musicxml", "mxl"],
      ["application/vnd.recordare.musicxml+xml", "musicxml"],
      ["application/vnd.rig.cryptonote", "cryptonote"],
      ["application/vnd.rim.cod", "cod"],
      ["application/vnd.rn-realmedia", "rm"],
      ["application/vnd.rn-realplayer", "rnx"],
      ["application/vnd.route66.link66+xml", "link66"],
      ["application/vnd.sailingtracker.track", "st"],
      ["application/vnd.seemail", "see"],
      ["application/vnd.sema", "sema"],
      ["application/vnd.semd", "semd"],
      ["application/vnd.semf", "semf"],
      ["application/vnd.shana.informed.formdata", "ifm"],
      ["application/vnd.shana.informed.formtemplate", "itp"],
      ["application/vnd.shana.informed.interchange", "iif"],
      ["application/vnd.shana.informed.package", "ipk"],
      ["application/vnd.simtech-mindmapper", "twd"],
      ["application/vnd.smaf", "mmf"],
      ["application/vnd.smart.teacher", "teacher"],
      ["application/vnd.solent.sdkm+xml", "sdkm"],
      ["application/vnd.spotfire.dxp", "dxp"],
      ["application/vnd.spotfire.sfs", "sfs"],
      ["application/vnd.stardivision.calc", "sdc"],
      ["application/vnd.stardivision.draw", "sda"],
      ["application/vnd.stardivision.impress", "sdd"],
      ["application/vnd.stardivision.math", "smf"],
      ["application/vnd.stardivision.writer", "sdw"],
      ["application/vnd.stardivision.writer-global", "sgl"],
      ["application/vnd.stepmania.stepchart", "sm"],
      ["application/vnd.sun.xml.calc", "sxc"],
      ["application/vnd.sun.xml.calc.template", "stc"],
      ["application/vnd.sun.xml.draw", "sxd"],
      ["application/vnd.sun.xml.draw.template", "std"],
      ["application/vnd.sun.xml.impress", "sxi"],
      ["application/vnd.sun.xml.impress.template", "sti"],
      ["application/vnd.sun.xml.math", "sxm"],
      ["application/vnd.sun.xml.writer", "sxw"],
      ["application/vnd.sun.xml.writer.global", "sxg"],
      ["application/vnd.sun.xml.writer.template", "stw"],
      ["application/vnd.sus-calendar", "sus"],
      ["application/vnd.svd", "svd"],
      ["application/vnd.symbian.install", "sis"],
      ["application/vnd.syncml+xml", "xsm"],
      ["application/vnd.syncml.dm+wbxml", "bdm"],
      ["application/vnd.syncml.dm+xml", "xdm"],
      ["application/vnd.tao.intent-module-archive", "tao"],
      ["application/vnd.tmobile-livetv", "tmo"],
      ["application/vnd.trid.tpt", "tpt"],
      ["application/vnd.triscape.mxs", "mxs"],
      ["application/vnd.trueapp", "tra"],
      ["application/vnd.ufdl", "ufd"],
      ["application/vnd.uiq.theme", "utz"],
      ["application/vnd.umajin", "umj"],
      ["application/vnd.unity", "unityweb"],
      ["application/vnd.uoml+xml", "uoml"],
      ["application/vnd.vcx", "vcx"],
      ["application/vnd.visio", "vsd"],
      ["application/vnd.visionary", "vis"],
      ["application/vnd.vsf", "vsf"],
      ["application/vnd.wap.wbxml", "wbxml"],
      ["application/vnd.wap.wmlc", "wmlc"],
      ["application/vnd.wap.wmlscriptc", "wmlsc"],
      ["application/vnd.webturbo", "wtb"],
      ["application/vnd.wolfram.player", "nbp"],
      ["application/vnd.wordperfect", "wpd"],
      ["application/vnd.wqd", "wqd"],
      ["application/vnd.wt.stf", "stf"],
      ["application/vnd.xara", ["web", "xar"]],
      ["application/vnd.xfdl", "xfdl"],
      ["application/vnd.yamaha.hv-dic", "hvd"],
      ["application/vnd.yamaha.hv-script", "hvs"],
      ["application/vnd.yamaha.hv-voice", "hvp"],
      ["application/vnd.yamaha.openscoreformat", "osf"],
      ["application/vnd.yamaha.openscoreformat.osfpvg+xml", "osfpvg"],
      ["application/vnd.yamaha.smaf-audio", "saf"],
      ["application/vnd.yamaha.smaf-phrase", "spf"],
      ["application/vnd.yellowriver-custom-menu", "cmp"],
      ["application/vnd.zul", "zir"],
      ["application/vnd.zzazz.deck+xml", "zaz"],
      ["application/vocaltec-media-desc", "vmd"],
      ["application/vocaltec-media-file", "vmf"],
      ["application/voicexml+xml", "vxml"],
      ["application/widget", "wgt"],
      ["application/winhlp", "hlp"],
      ["application/wordperfect", ["wp", "wp5", "wp6", "wpd"]],
      ["application/wordperfect6.0", ["w60", "wp5"]],
      ["application/wordperfect6.1", "w61"],
      ["application/wsdl+xml", "wsdl"],
      ["application/wspolicy+xml", "wspolicy"],
      ["application/x-123", "wk1"],
      ["application/x-7z-compressed", "7z"],
      ["application/x-abiword", "abw"],
      ["application/x-ace-compressed", "ace"],
      ["application/x-aim", "aim"],
      ["application/x-authorware-bin", "aab"],
      ["application/x-authorware-map", "aam"],
      ["application/x-authorware-seg", "aas"],
      ["application/x-bcpio", "bcpio"],
      ["application/x-binary", "bin"],
      ["application/x-binhex40", "hqx"],
      ["application/x-bittorrent", "torrent"],
      ["application/x-bsh", ["bsh", "sh", "shar"]],
      ["application/x-bytecode.elisp", "elc"],
      ["application/x-bytecode.python", "pyc"],
      ["application/x-bzip", "bz"],
      ["application/x-bzip2", ["boz", "bz2"]],
      ["application/x-cdf", "cdf"],
      ["application/x-cdlink", "vcd"],
      ["application/x-chat", ["cha", "chat"]],
      ["application/x-chess-pgn", "pgn"],
      ["application/x-cmu-raster", "ras"],
      ["application/x-cocoa", "cco"],
      ["application/x-compactpro", "cpt"],
      ["application/x-compress", "z"],
      ["application/x-compressed", ["tgz", "gz", "z", "zip"]],
      ["application/x-conference", "nsc"],
      ["application/x-cpio", "cpio"],
      ["application/x-cpt", "cpt"],
      ["application/x-csh", "csh"],
      ["application/x-debian-package", "deb"],
      ["application/x-deepv", "deepv"],
      ["application/x-director", ["dir", "dcr", "dxr"]],
      ["application/x-doom", "wad"],
      ["application/x-dtbncx+xml", "ncx"],
      ["application/x-dtbook+xml", "dtb"],
      ["application/x-dtbresource+xml", "res"],
      ["application/x-dvi", "dvi"],
      ["application/x-elc", "elc"],
      ["application/x-envoy", ["env", "evy"]],
      ["application/x-esrehber", "es"],
      ["application/x-excel", ["xls", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
      ["application/x-font-bdf", "bdf"],
      ["application/x-font-ghostscript", "gsf"],
      ["application/x-font-linux-psf", "psf"],
      ["application/x-font-otf", "otf"],
      ["application/x-font-pcf", "pcf"],
      ["application/x-font-snf", "snf"],
      ["application/x-font-ttf", "ttf"],
      ["application/x-font-type1", "pfa"],
      ["application/x-font-woff", "woff"],
      ["application/x-frame", "mif"],
      ["application/x-freelance", "pre"],
      ["application/x-futuresplash", "spl"],
      ["application/x-gnumeric", "gnumeric"],
      ["application/x-gsp", "gsp"],
      ["application/x-gss", "gss"],
      ["application/x-gtar", "gtar"],
      ["application/x-gzip", ["gz", "gzip"]],
      ["application/x-hdf", "hdf"],
      ["application/x-helpfile", ["help", "hlp"]],
      ["application/x-httpd-imap", "imap"],
      ["application/x-ima", "ima"],
      ["application/x-internet-signup", ["ins", "isp"]],
      ["application/x-internett-signup", "ins"],
      ["application/x-inventor", "iv"],
      ["application/x-ip2", "ip"],
      ["application/x-iphone", "iii"],
      ["application/x-java-class", "class"],
      ["application/x-java-commerce", "jcm"],
      ["application/x-java-jnlp-file", "jnlp"],
      ["application/x-javascript", "js"],
      ["application/x-koan", ["skd", "skm", "skp", "skt"]],
      ["application/x-ksh", "ksh"],
      ["application/x-latex", ["latex", "ltx"]],
      ["application/x-lha", "lha"],
      ["application/x-lisp", "lsp"],
      ["application/x-livescreen", "ivy"],
      ["application/x-lotus", "wq1"],
      ["application/x-lotusscreencam", "scm"],
      ["application/x-lzh", "lzh"],
      ["application/x-lzx", "lzx"],
      ["application/x-mac-binhex40", "hqx"],
      ["application/x-macbinary", "bin"],
      ["application/x-magic-cap-package-1.0", "mc$"],
      ["application/x-mathcad", "mcd"],
      ["application/x-meme", "mm"],
      ["application/x-midi", ["mid", "midi"]],
      ["application/x-mif", "mif"],
      ["application/x-mix-transfer", "nix"],
      ["application/x-mobipocket-ebook", "prc"],
      ["application/x-mplayer2", "asx"],
      ["application/x-ms-application", "application"],
      ["application/x-ms-wmd", "wmd"],
      ["application/x-ms-wmz", "wmz"],
      ["application/x-ms-xbap", "xbap"],
      ["application/x-msaccess", "mdb"],
      ["application/x-msbinder", "obd"],
      ["application/x-mscardfile", "crd"],
      ["application/x-msclip", "clp"],
      ["application/x-msdownload", ["exe", "dll"]],
      ["application/x-msexcel", ["xls", "xla", "xlw"]],
      ["application/x-msmediaview", ["mvb", "m13", "m14"]],
      ["application/x-msmetafile", "wmf"],
      ["application/x-msmoney", "mny"],
      ["application/x-mspowerpoint", "ppt"],
      ["application/x-mspublisher", "pub"],
      ["application/x-msschedule", "scd"],
      ["application/x-msterminal", "trm"],
      ["application/x-mswrite", "wri"],
      ["application/x-navi-animation", "ani"],
      ["application/x-navidoc", "nvd"],
      ["application/x-navimap", "map"],
      ["application/x-navistyle", "stl"],
      ["application/x-netcdf", ["cdf", "nc"]],
      ["application/x-newton-compatible-pkg", "pkg"],
      ["application/x-nokia-9000-communicator-add-on-software", "aos"],
      ["application/x-omc", "omc"],
      ["application/x-omcdatamaker", "omcd"],
      ["application/x-omcregerator", "omcr"],
      ["application/x-pagemaker", ["pm4", "pm5"]],
      ["application/x-pcl", "pcl"],
      ["application/x-perfmon", ["pma", "pmc", "pml", "pmr", "pmw"]],
      ["application/x-pixclscript", "plx"],
      ["application/x-pkcs10", "p10"],
      ["application/x-pkcs12", ["p12", "pfx"]],
      ["application/x-pkcs7-certificates", ["p7b", "spc"]],
      ["application/x-pkcs7-certreqresp", "p7r"],
      ["application/x-pkcs7-mime", ["p7m", "p7c"]],
      ["application/x-pkcs7-signature", ["p7s", "p7a"]],
      ["application/x-pointplus", "css"],
      ["application/x-portable-anymap", "pnm"],
      ["application/x-project", ["mpc", "mpt", "mpv", "mpx"]],
      ["application/x-qpro", "wb1"],
      ["application/x-rar-compressed", "rar"],
      ["application/x-rtf", "rtf"],
      ["application/x-sdp", "sdp"],
      ["application/x-sea", "sea"],
      ["application/x-seelogo", "sl"],
      ["application/x-sh", "sh"],
      ["application/x-shar", ["shar", "sh"]],
      ["application/x-shockwave-flash", "swf"],
      ["application/x-silverlight-app", "xap"],
      ["application/x-sit", "sit"],
      ["application/x-sprite", ["spr", "sprite"]],
      ["application/x-stuffit", "sit"],
      ["application/x-stuffitx", "sitx"],
      ["application/x-sv4cpio", "sv4cpio"],
      ["application/x-sv4crc", "sv4crc"],
      ["application/x-tar", "tar"],
      ["application/x-tbook", ["sbk", "tbk"]],
      ["application/x-tcl", "tcl"],
      ["application/x-tex", "tex"],
      ["application/x-tex-tfm", "tfm"],
      ["application/x-texinfo", ["texi", "texinfo"]],
      ["application/x-troff", ["roff", "t", "tr"]],
      ["application/x-troff-man", "man"],
      ["application/x-troff-me", "me"],
      ["application/x-troff-ms", "ms"],
      ["application/x-troff-msvideo", "avi"],
      ["application/x-ustar", "ustar"],
      ["application/x-visio", ["vsd", "vst", "vsw"]],
      ["application/x-vnd.audioexplosion.mzz", "mzz"],
      ["application/x-vnd.ls-xpix", "xpix"],
      ["application/x-vrml", "vrml"],
      ["application/x-wais-source", ["src", "wsrc"]],
      ["application/x-winhelp", "hlp"],
      ["application/x-wintalk", "wtk"],
      ["application/x-world", ["wrl", "svr"]],
      ["application/x-wpwin", "wpd"],
      ["application/x-wri", "wri"],
      ["application/x-x509-ca-cert", ["cer", "crt", "der"]],
      ["application/x-x509-user-cert", "crt"],
      ["application/x-xfig", "fig"],
      ["application/x-xpinstall", "xpi"],
      ["application/x-zip-compressed", "zip"],
      ["application/xcap-diff+xml", "xdf"],
      ["application/xenc+xml", "xenc"],
      ["application/xhtml+xml", "xhtml"],
      ["application/xml", "xml"],
      ["application/xml-dtd", "dtd"],
      ["application/xop+xml", "xop"],
      ["application/xslt+xml", "xslt"],
      ["application/xspf+xml", "xspf"],
      ["application/xv+xml", "mxml"],
      ["application/yang", "yang"],
      ["application/yin+xml", "yin"],
      ["application/ynd.ms-pkipko", "pko"],
      ["application/zip", "zip"],
      ["audio/adpcm", "adp"],
      ["audio/aiff", ["aiff", "aif", "aifc"]],
      ["audio/basic", ["snd", "au"]],
      ["audio/it", "it"],
      ["audio/make", ["funk", "my", "pfunk"]],
      ["audio/make.my.funk", "pfunk"],
      ["audio/mid", ["mid", "rmi"]],
      ["audio/midi", ["midi", "kar", "mid"]],
      ["audio/mod", "mod"],
      ["audio/mp4", "mp4a"],
      ["audio/mpeg", ["mpga", "mp3", "m2a", "mp2", "mpa", "mpg"]],
      ["audio/mpeg3", "mp3"],
      ["audio/nspaudio", ["la", "lma"]],
      ["audio/ogg", "oga"],
      ["audio/s3m", "s3m"],
      ["audio/tsp-audio", "tsi"],
      ["audio/tsplayer", "tsp"],
      ["audio/vnd.dece.audio", "uva"],
      ["audio/vnd.digital-winds", "eol"],
      ["audio/vnd.dra", "dra"],
      ["audio/vnd.dts", "dts"],
      ["audio/vnd.dts.hd", "dtshd"],
      ["audio/vnd.lucent.voice", "lvp"],
      ["audio/vnd.ms-playready.media.pya", "pya"],
      ["audio/vnd.nuera.ecelp4800", "ecelp4800"],
      ["audio/vnd.nuera.ecelp7470", "ecelp7470"],
      ["audio/vnd.nuera.ecelp9600", "ecelp9600"],
      ["audio/vnd.qcelp", "qcp"],
      ["audio/vnd.rip", "rip"],
      ["audio/voc", "voc"],
      ["audio/voxware", "vox"],
      ["audio/wav", "wav"],
      ["audio/webm", "weba"],
      ["audio/x-aac", "aac"],
      ["audio/x-adpcm", "snd"],
      ["audio/x-aiff", ["aiff", "aif", "aifc"]],
      ["audio/x-au", "au"],
      ["audio/x-gsm", ["gsd", "gsm"]],
      ["audio/x-jam", "jam"],
      ["audio/x-liveaudio", "lam"],
      ["audio/x-mid", ["mid", "midi"]],
      ["audio/x-midi", ["midi", "mid"]],
      ["audio/x-mod", "mod"],
      ["audio/x-mpeg", "mp2"],
      ["audio/x-mpeg-3", "mp3"],
      ["audio/x-mpegurl", "m3u"],
      ["audio/x-mpequrl", "m3u"],
      ["audio/x-ms-wax", "wax"],
      ["audio/x-ms-wma", "wma"],
      ["audio/x-nspaudio", ["la", "lma"]],
      ["audio/x-pn-realaudio", ["ra", "ram", "rm", "rmm", "rmp"]],
      ["audio/x-pn-realaudio-plugin", ["ra", "rmp", "rpm"]],
      ["audio/x-psid", "sid"],
      ["audio/x-realaudio", "ra"],
      ["audio/x-twinvq", "vqf"],
      ["audio/x-twinvq-plugin", ["vqe", "vql"]],
      ["audio/x-vnd.audioexplosion.mjuicemediafile", "mjf"],
      ["audio/x-voc", "voc"],
      ["audio/x-wav", "wav"],
      ["audio/xm", "xm"],
      ["chemical/x-cdx", "cdx"],
      ["chemical/x-cif", "cif"],
      ["chemical/x-cmdf", "cmdf"],
      ["chemical/x-cml", "cml"],
      ["chemical/x-csml", "csml"],
      ["chemical/x-pdb", ["pdb", "xyz"]],
      ["chemical/x-xyz", "xyz"],
      ["drawing/x-dwf", "dwf"],
      ["i-world/i-vrml", "ivr"],
      ["image/bmp", ["bmp", "bm"]],
      ["image/cgm", "cgm"],
      ["image/cis-cod", "cod"],
      ["image/cmu-raster", ["ras", "rast"]],
      ["image/fif", "fif"],
      ["image/florian", ["flo", "turbot"]],
      ["image/g3fax", "g3"],
      ["image/gif", "gif"],
      ["image/ief", ["ief", "iefs"]],
      ["image/jpeg", ["jpeg", "jpe", "jpg", "jfif", "jfif-tbnl"]],
      ["image/jutvision", "jut"],
      ["image/ktx", "ktx"],
      ["image/naplps", ["nap", "naplps"]],
      ["image/pict", ["pic", "pict"]],
      ["image/pipeg", "jfif"],
      ["image/pjpeg", ["jfif", "jpe", "jpeg", "jpg"]],
      ["image/png", ["png", "x-png"]],
      ["image/prs.btif", "btif"],
      ["image/svg+xml", "svg"],
      ["image/tiff", ["tif", "tiff"]],
      ["image/vasa", "mcf"],
      ["image/vnd.adobe.photoshop", "psd"],
      ["image/vnd.dece.graphic", "uvi"],
      ["image/vnd.djvu", "djvu"],
      ["image/vnd.dvb.subtitle", "sub"],
      ["image/vnd.dwg", ["dwg", "dxf", "svf"]],
      ["image/vnd.dxf", "dxf"],
      ["image/vnd.fastbidsheet", "fbs"],
      ["image/vnd.fpx", "fpx"],
      ["image/vnd.fst", "fst"],
      ["image/vnd.fujixerox.edmics-mmr", "mmr"],
      ["image/vnd.fujixerox.edmics-rlc", "rlc"],
      ["image/vnd.ms-modi", "mdi"],
      ["image/vnd.net-fpx", ["fpx", "npx"]],
      ["image/vnd.rn-realflash", "rf"],
      ["image/vnd.rn-realpix", "rp"],
      ["image/vnd.wap.wbmp", "wbmp"],
      ["image/vnd.xiff", "xif"],
      ["image/webp", "webp"],
      ["image/x-cmu-raster", "ras"],
      ["image/x-cmx", "cmx"],
      ["image/x-dwg", ["dwg", "dxf", "svf"]],
      ["image/x-freehand", "fh"],
      ["image/x-icon", "ico"],
      ["image/x-jg", "art"],
      ["image/x-jps", "jps"],
      ["image/x-niff", ["niff", "nif"]],
      ["image/x-pcx", "pcx"],
      ["image/x-pict", ["pct", "pic"]],
      ["image/x-portable-anymap", "pnm"],
      ["image/x-portable-bitmap", "pbm"],
      ["image/x-portable-graymap", "pgm"],
      ["image/x-portable-greymap", "pgm"],
      ["image/x-portable-pixmap", "ppm"],
      ["image/x-quicktime", ["qif", "qti", "qtif"]],
      ["image/x-rgb", "rgb"],
      ["image/x-tiff", ["tif", "tiff"]],
      ["image/x-windows-bmp", "bmp"],
      ["image/x-xbitmap", "xbm"],
      ["image/x-xbm", "xbm"],
      ["image/x-xpixmap", ["xpm", "pm"]],
      ["image/x-xwd", "xwd"],
      ["image/x-xwindowdump", "xwd"],
      ["image/xbm", "xbm"],
      ["image/xpm", "xpm"],
      ["message/rfc822", ["eml", "mht", "mhtml", "nws", "mime"]],
      ["model/iges", ["iges", "igs"]],
      ["model/mesh", "msh"],
      ["model/vnd.collada+xml", "dae"],
      ["model/vnd.dwf", "dwf"],
      ["model/vnd.gdl", "gdl"],
      ["model/vnd.gtw", "gtw"],
      ["model/vnd.mts", "mts"],
      ["model/vnd.vtu", "vtu"],
      ["model/vrml", ["vrml", "wrl", "wrz"]],
      ["model/x-pov", "pov"],
      ["multipart/x-gzip", "gzip"],
      ["multipart/x-ustar", "ustar"],
      ["multipart/x-zip", "zip"],
      ["music/crescendo", ["mid", "midi"]],
      ["music/x-karaoke", "kar"],
      ["paleovu/x-pv", "pvu"],
      ["text/asp", "asp"],
      ["text/calendar", "ics"],
      ["text/css", "css"],
      ["text/csv", "csv"],
      ["text/ecmascript", "js"],
      ["text/h323", "323"],
      ["text/html", ["html", "htm", "stm", "acgi", "htmls", "htx", "shtml"]],
      ["text/iuls", "uls"],
      ["text/javascript", "js"],
      ["text/mcf", "mcf"],
      ["text/n3", "n3"],
      ["text/pascal", "pas"],
      [
        "text/plain",
        [
          "txt",
          "bas",
          "c",
          "h",
          "c++",
          "cc",
          "com",
          "conf",
          "cxx",
          "def",
          "f",
          "f90",
          "for",
          "g",
          "hh",
          "idc",
          "jav",
          "java",
          "list",
          "log",
          "lst",
          "m",
          "mar",
          "pl",
          "sdml",
          "text"
        ]
      ],
      ["text/plain-bas", "par"],
      ["text/prs.lines.tag", "dsc"],
      ["text/richtext", ["rtx", "rt", "rtf"]],
      ["text/scriplet", "wsc"],
      ["text/scriptlet", "sct"],
      ["text/sgml", ["sgm", "sgml"]],
      ["text/tab-separated-values", "tsv"],
      ["text/troff", "t"],
      ["text/turtle", "ttl"],
      ["text/uri-list", ["uni", "unis", "uri", "uris"]],
      ["text/vnd.abc", "abc"],
      ["text/vnd.curl", "curl"],
      ["text/vnd.curl.dcurl", "dcurl"],
      ["text/vnd.curl.mcurl", "mcurl"],
      ["text/vnd.curl.scurl", "scurl"],
      ["text/vnd.fly", "fly"],
      ["text/vnd.fmi.flexstor", "flx"],
      ["text/vnd.graphviz", "gv"],
      ["text/vnd.in3d.3dml", "3dml"],
      ["text/vnd.in3d.spot", "spot"],
      ["text/vnd.rn-realtext", "rt"],
      ["text/vnd.sun.j2me.app-descriptor", "jad"],
      ["text/vnd.wap.wml", "wml"],
      ["text/vnd.wap.wmlscript", "wmls"],
      ["text/webviewhtml", "htt"],
      ["text/x-asm", ["asm", "s"]],
      ["text/x-audiosoft-intra", "aip"],
      ["text/x-c", ["c", "cc", "cpp"]],
      ["text/x-component", "htc"],
      ["text/x-fortran", ["for", "f", "f77", "f90"]],
      ["text/x-h", ["h", "hh"]],
      ["text/x-java-source", ["java", "jav"]],
      ["text/x-java-source,java", "java"],
      ["text/x-la-asf", "lsx"],
      ["text/x-m", "m"],
      ["text/x-pascal", "p"],
      ["text/x-script", "hlb"],
      ["text/x-script.csh", "csh"],
      ["text/x-script.elisp", "el"],
      ["text/x-script.guile", "scm"],
      ["text/x-script.ksh", "ksh"],
      ["text/x-script.lisp", "lsp"],
      ["text/x-script.perl", "pl"],
      ["text/x-script.perl-module", "pm"],
      ["text/x-script.phyton", "py"],
      ["text/x-script.rexx", "rexx"],
      ["text/x-script.scheme", "scm"],
      ["text/x-script.sh", "sh"],
      ["text/x-script.tcl", "tcl"],
      ["text/x-script.tcsh", "tcsh"],
      ["text/x-script.zsh", "zsh"],
      ["text/x-server-parsed-html", ["shtml", "ssi"]],
      ["text/x-setext", "etx"],
      ["text/x-sgml", ["sgm", "sgml"]],
      ["text/x-speech", ["spc", "talk"]],
      ["text/x-uil", "uil"],
      ["text/x-uuencode", ["uu", "uue"]],
      ["text/x-vcalendar", "vcs"],
      ["text/x-vcard", "vcf"],
      ["text/xml", "xml"],
      ["video/3gpp", "3gp"],
      ["video/3gpp2", "3g2"],
      ["video/animaflex", "afl"],
      ["video/avi", "avi"],
      ["video/avs-video", "avs"],
      ["video/dl", "dl"],
      ["video/fli", "fli"],
      ["video/gl", "gl"],
      ["video/h261", "h261"],
      ["video/h263", "h263"],
      ["video/h264", "h264"],
      ["video/jpeg", "jpgv"],
      ["video/jpm", "jpm"],
      ["video/mj2", "mj2"],
      ["video/mp4", "mp4"],
      ["video/mpeg", ["mpeg", "mp2", "mpa", "mpe", "mpg", "mpv2", "m1v", "m2v", "mp3"]],
      ["video/msvideo", "avi"],
      ["video/ogg", "ogv"],
      ["video/quicktime", ["mov", "qt", "moov"]],
      ["video/vdo", "vdo"],
      ["video/vivo", ["viv", "vivo"]],
      ["video/vnd.dece.hd", "uvh"],
      ["video/vnd.dece.mobile", "uvm"],
      ["video/vnd.dece.pd", "uvp"],
      ["video/vnd.dece.sd", "uvs"],
      ["video/vnd.dece.video", "uvv"],
      ["video/vnd.fvt", "fvt"],
      ["video/vnd.mpegurl", "mxu"],
      ["video/vnd.ms-playready.media.pyv", "pyv"],
      ["video/vnd.rn-realvideo", "rv"],
      ["video/vnd.uvvu.mp4", "uvu"],
      ["video/vnd.vivo", ["viv", "vivo"]],
      ["video/vosaic", "vos"],
      ["video/webm", "webm"],
      ["video/x-amt-demorun", "xdr"],
      ["video/x-amt-showrun", "xsr"],
      ["video/x-atomic3d-feature", "fmf"],
      ["video/x-dl", "dl"],
      ["video/x-dv", ["dif", "dv"]],
      ["video/x-f4v", "f4v"],
      ["video/x-fli", "fli"],
      ["video/x-flv", "flv"],
      ["video/x-gl", "gl"],
      ["video/x-isvideo", "isu"],
      ["video/x-la-asf", ["lsf", "lsx"]],
      ["video/x-m4v", "m4v"],
      ["video/x-motion-jpeg", "mjpg"],
      ["video/x-mpeg", ["mp3", "mp2"]],
      ["video/x-mpeq2a", "mp2"],
      ["video/x-ms-asf", ["asf", "asr", "asx"]],
      ["video/x-ms-asf-plugin", "asx"],
      ["video/x-ms-wm", "wm"],
      ["video/x-ms-wmv", "wmv"],
      ["video/x-ms-wmx", "wmx"],
      ["video/x-ms-wvx", "wvx"],
      ["video/x-msvideo", "avi"],
      ["video/x-qtc", "qtc"],
      ["video/x-scm", "scm"],
      ["video/x-sgi-movie", ["movie", "mv"]],
      ["windows/metafile", "wmf"],
      ["www/mime", "mime"],
      ["x-conference/x-cooltalk", "ice"],
      ["x-music/x-midi", ["mid", "midi"]],
      ["x-world/x-3dmf", ["3dm", "3dmf", "qd3", "qd3d"]],
      ["x-world/x-svr", "svr"],
      ["x-world/x-vrml", ["flr", "vrml", "wrl", "wrz", "xaf", "xof"]],
      ["x-world/x-vrt", "vrt"],
      ["xgl/drawing", "xgz"],
      ["xgl/movie", "xmz"]
    ]);
    var extensions = /* @__PURE__ */ new Map([
      ["123", "application/vnd.lotus-1-2-3"],
      ["323", "text/h323"],
      ["*", "application/octet-stream"],
      ["3dm", "x-world/x-3dmf"],
      ["3dmf", "x-world/x-3dmf"],
      ["3dml", "text/vnd.in3d.3dml"],
      ["3g2", "video/3gpp2"],
      ["3gp", "video/3gpp"],
      ["7z", "application/x-7z-compressed"],
      ["a", "application/octet-stream"],
      ["aab", "application/x-authorware-bin"],
      ["aac", "audio/x-aac"],
      ["aam", "application/x-authorware-map"],
      ["aas", "application/x-authorware-seg"],
      ["abc", "text/vnd.abc"],
      ["abw", "application/x-abiword"],
      ["ac", "application/pkix-attr-cert"],
      ["acc", "application/vnd.americandynamics.acc"],
      ["ace", "application/x-ace-compressed"],
      ["acgi", "text/html"],
      ["acu", "application/vnd.acucobol"],
      ["acx", "application/internet-property-stream"],
      ["adp", "audio/adpcm"],
      ["aep", "application/vnd.audiograph"],
      ["afl", "video/animaflex"],
      ["afp", "application/vnd.ibm.modcap"],
      ["ahead", "application/vnd.ahead.space"],
      ["ai", "application/postscript"],
      ["aif", ["audio/aiff", "audio/x-aiff"]],
      ["aifc", ["audio/aiff", "audio/x-aiff"]],
      ["aiff", ["audio/aiff", "audio/x-aiff"]],
      ["aim", "application/x-aim"],
      ["aip", "text/x-audiosoft-intra"],
      ["air", "application/vnd.adobe.air-application-installer-package+zip"],
      ["ait", "application/vnd.dvb.ait"],
      ["ami", "application/vnd.amiga.ami"],
      ["ani", "application/x-navi-animation"],
      ["aos", "application/x-nokia-9000-communicator-add-on-software"],
      ["apk", "application/vnd.android.package-archive"],
      ["application", "application/x-ms-application"],
      ["apr", "application/vnd.lotus-approach"],
      ["aps", "application/mime"],
      ["arc", "application/octet-stream"],
      ["arj", ["application/arj", "application/octet-stream"]],
      ["art", "image/x-jg"],
      ["asf", "video/x-ms-asf"],
      ["asm", "text/x-asm"],
      ["aso", "application/vnd.accpac.simply.aso"],
      ["asp", "text/asp"],
      ["asr", "video/x-ms-asf"],
      ["asx", ["video/x-ms-asf", "application/x-mplayer2", "video/x-ms-asf-plugin"]],
      ["atc", "application/vnd.acucorp"],
      ["atomcat", "application/atomcat+xml"],
      ["atomsvc", "application/atomsvc+xml"],
      ["atx", "application/vnd.antix.game-component"],
      ["au", ["audio/basic", "audio/x-au"]],
      ["avi", ["video/avi", "video/msvideo", "application/x-troff-msvideo", "video/x-msvideo"]],
      ["avs", "video/avs-video"],
      ["aw", "application/applixware"],
      ["axs", "application/olescript"],
      ["azf", "application/vnd.airzip.filesecure.azf"],
      ["azs", "application/vnd.airzip.filesecure.azs"],
      ["azw", "application/vnd.amazon.ebook"],
      ["bas", "text/plain"],
      ["bcpio", "application/x-bcpio"],
      ["bdf", "application/x-font-bdf"],
      ["bdm", "application/vnd.syncml.dm+wbxml"],
      ["bed", "application/vnd.realvnc.bed"],
      ["bh2", "application/vnd.fujitsu.oasysprs"],
      ["bin", ["application/octet-stream", "application/mac-binary", "application/macbinary", "application/x-macbinary", "application/x-binary"]],
      ["bm", "image/bmp"],
      ["bmi", "application/vnd.bmi"],
      ["bmp", ["image/bmp", "image/x-windows-bmp"]],
      ["boo", "application/book"],
      ["book", "application/book"],
      ["box", "application/vnd.previewsystems.box"],
      ["boz", "application/x-bzip2"],
      ["bsh", "application/x-bsh"],
      ["btif", "image/prs.btif"],
      ["bz", "application/x-bzip"],
      ["bz2", "application/x-bzip2"],
      ["c", ["text/plain", "text/x-c"]],
      ["c++", "text/plain"],
      ["c11amc", "application/vnd.cluetrust.cartomobile-config"],
      ["c11amz", "application/vnd.cluetrust.cartomobile-config-pkg"],
      ["c4g", "application/vnd.clonk.c4group"],
      ["cab", "application/vnd.ms-cab-compressed"],
      ["car", "application/vnd.curl.car"],
      ["cat", ["application/vnd.ms-pkiseccat", "application/vnd.ms-pki.seccat"]],
      ["cc", ["text/plain", "text/x-c"]],
      ["ccad", "application/clariscad"],
      ["cco", "application/x-cocoa"],
      ["ccxml", "application/ccxml+xml,"],
      ["cdbcmsg", "application/vnd.contact.cmsg"],
      ["cdf", ["application/cdf", "application/x-cdf", "application/x-netcdf"]],
      ["cdkey", "application/vnd.mediastation.cdkey"],
      ["cdmia", "application/cdmi-capability"],
      ["cdmic", "application/cdmi-container"],
      ["cdmid", "application/cdmi-domain"],
      ["cdmio", "application/cdmi-object"],
      ["cdmiq", "application/cdmi-queue"],
      ["cdx", "chemical/x-cdx"],
      ["cdxml", "application/vnd.chemdraw+xml"],
      ["cdy", "application/vnd.cinderella"],
      ["cer", ["application/pkix-cert", "application/x-x509-ca-cert"]],
      ["cgm", "image/cgm"],
      ["cha", "application/x-chat"],
      ["chat", "application/x-chat"],
      ["chm", "application/vnd.ms-htmlhelp"],
      ["chrt", "application/vnd.kde.kchart"],
      ["cif", "chemical/x-cif"],
      ["cii", "application/vnd.anser-web-certificate-issue-initiation"],
      ["cil", "application/vnd.ms-artgalry"],
      ["cla", "application/vnd.claymore"],
      ["class", ["application/octet-stream", "application/java", "application/java-byte-code", "application/java-vm", "application/x-java-class"]],
      ["clkk", "application/vnd.crick.clicker.keyboard"],
      ["clkp", "application/vnd.crick.clicker.palette"],
      ["clkt", "application/vnd.crick.clicker.template"],
      ["clkw", "application/vnd.crick.clicker.wordbank"],
      ["clkx", "application/vnd.crick.clicker"],
      ["clp", "application/x-msclip"],
      ["cmc", "application/vnd.cosmocaller"],
      ["cmdf", "chemical/x-cmdf"],
      ["cml", "chemical/x-cml"],
      ["cmp", "application/vnd.yellowriver-custom-menu"],
      ["cmx", "image/x-cmx"],
      ["cod", ["image/cis-cod", "application/vnd.rim.cod"]],
      ["com", ["application/octet-stream", "text/plain"]],
      ["conf", "text/plain"],
      ["cpio", "application/x-cpio"],
      ["cpp", "text/x-c"],
      ["cpt", ["application/mac-compactpro", "application/x-compactpro", "application/x-cpt"]],
      ["crd", "application/x-mscardfile"],
      ["crl", ["application/pkix-crl", "application/pkcs-crl"]],
      ["crt", ["application/pkix-cert", "application/x-x509-user-cert", "application/x-x509-ca-cert"]],
      ["cryptonote", "application/vnd.rig.cryptonote"],
      ["csh", ["text/x-script.csh", "application/x-csh"]],
      ["csml", "chemical/x-csml"],
      ["csp", "application/vnd.commonspace"],
      ["css", ["text/css", "application/x-pointplus"]],
      ["csv", "text/csv"],
      ["cu", "application/cu-seeme"],
      ["curl", "text/vnd.curl"],
      ["cww", "application/prs.cww"],
      ["cxx", "text/plain"],
      ["dae", "model/vnd.collada+xml"],
      ["daf", "application/vnd.mobius.daf"],
      ["davmount", "application/davmount+xml"],
      ["dcr", "application/x-director"],
      ["dcurl", "text/vnd.curl.dcurl"],
      ["dd2", "application/vnd.oma.dd2+xml"],
      ["ddd", "application/vnd.fujixerox.ddd"],
      ["deb", "application/x-debian-package"],
      ["deepv", "application/x-deepv"],
      ["def", "text/plain"],
      ["der", "application/x-x509-ca-cert"],
      ["dfac", "application/vnd.dreamfactory"],
      ["dif", "video/x-dv"],
      ["dir", "application/x-director"],
      ["dis", "application/vnd.mobius.dis"],
      ["djvu", "image/vnd.djvu"],
      ["dl", ["video/dl", "video/x-dl"]],
      ["dll", "application/x-msdownload"],
      ["dms", "application/octet-stream"],
      ["dna", "application/vnd.dna"],
      ["doc", "application/msword"],
      ["docm", "application/vnd.ms-word.document.macroenabled.12"],
      ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      ["dot", "application/msword"],
      ["dotm", "application/vnd.ms-word.template.macroenabled.12"],
      ["dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"],
      ["dp", ["application/commonground", "application/vnd.osgi.dp"]],
      ["dpg", "application/vnd.dpgraph"],
      ["dra", "audio/vnd.dra"],
      ["drw", "application/drafting"],
      ["dsc", "text/prs.lines.tag"],
      ["dssc", "application/dssc+der"],
      ["dtb", "application/x-dtbook+xml"],
      ["dtd", "application/xml-dtd"],
      ["dts", "audio/vnd.dts"],
      ["dtshd", "audio/vnd.dts.hd"],
      ["dump", "application/octet-stream"],
      ["dv", "video/x-dv"],
      ["dvi", "application/x-dvi"],
      ["dwf", ["model/vnd.dwf", "drawing/x-dwf"]],
      ["dwg", ["application/acad", "image/vnd.dwg", "image/x-dwg"]],
      ["dxf", ["application/dxf", "image/vnd.dwg", "image/vnd.dxf", "image/x-dwg"]],
      ["dxp", "application/vnd.spotfire.dxp"],
      ["dxr", "application/x-director"],
      ["ecelp4800", "audio/vnd.nuera.ecelp4800"],
      ["ecelp7470", "audio/vnd.nuera.ecelp7470"],
      ["ecelp9600", "audio/vnd.nuera.ecelp9600"],
      ["edm", "application/vnd.novadigm.edm"],
      ["edx", "application/vnd.novadigm.edx"],
      ["efif", "application/vnd.picsel"],
      ["ei6", "application/vnd.pg.osasli"],
      ["el", "text/x-script.elisp"],
      ["elc", ["application/x-elc", "application/x-bytecode.elisp"]],
      ["eml", "message/rfc822"],
      ["emma", "application/emma+xml"],
      ["env", "application/x-envoy"],
      ["eol", "audio/vnd.digital-winds"],
      ["eot", "application/vnd.ms-fontobject"],
      ["eps", "application/postscript"],
      ["epub", "application/epub+zip"],
      ["es", ["application/ecmascript", "application/x-esrehber"]],
      ["es3", "application/vnd.eszigno3+xml"],
      ["esf", "application/vnd.epson.esf"],
      ["etx", "text/x-setext"],
      ["evy", ["application/envoy", "application/x-envoy"]],
      ["exe", ["application/octet-stream", "application/x-msdownload"]],
      ["exi", "application/exi"],
      ["ext", "application/vnd.novadigm.ext"],
      ["ez2", "application/vnd.ezpix-album"],
      ["ez3", "application/vnd.ezpix-package"],
      ["f", ["text/plain", "text/x-fortran"]],
      ["f4v", "video/x-f4v"],
      ["f77", "text/x-fortran"],
      ["f90", ["text/plain", "text/x-fortran"]],
      ["fbs", "image/vnd.fastbidsheet"],
      ["fcs", "application/vnd.isac.fcs"],
      ["fdf", "application/vnd.fdf"],
      ["fe_launch", "application/vnd.denovo.fcselayout-link"],
      ["fg5", "application/vnd.fujitsu.oasysgp"],
      ["fh", "image/x-freehand"],
      ["fif", ["application/fractals", "image/fif"]],
      ["fig", "application/x-xfig"],
      ["fli", ["video/fli", "video/x-fli"]],
      ["flo", ["image/florian", "application/vnd.micrografx.flo"]],
      ["flr", "x-world/x-vrml"],
      ["flv", "video/x-flv"],
      ["flw", "application/vnd.kde.kivio"],
      ["flx", "text/vnd.fmi.flexstor"],
      ["fly", "text/vnd.fly"],
      ["fm", "application/vnd.framemaker"],
      ["fmf", "video/x-atomic3d-feature"],
      ["fnc", "application/vnd.frogans.fnc"],
      ["for", ["text/plain", "text/x-fortran"]],
      ["fpx", ["image/vnd.fpx", "image/vnd.net-fpx"]],
      ["frl", "application/freeloader"],
      ["fsc", "application/vnd.fsc.weblaunch"],
      ["fst", "image/vnd.fst"],
      ["ftc", "application/vnd.fluxtime.clip"],
      ["fti", "application/vnd.anser-web-funds-transfer-initiation"],
      ["funk", "audio/make"],
      ["fvt", "video/vnd.fvt"],
      ["fxp", "application/vnd.adobe.fxp"],
      ["fzs", "application/vnd.fuzzysheet"],
      ["g", "text/plain"],
      ["g2w", "application/vnd.geoplan"],
      ["g3", "image/g3fax"],
      ["g3w", "application/vnd.geospace"],
      ["gac", "application/vnd.groove-account"],
      ["gdl", "model/vnd.gdl"],
      ["geo", "application/vnd.dynageo"],
      ["gex", "application/vnd.geometry-explorer"],
      ["ggb", "application/vnd.geogebra.file"],
      ["ggt", "application/vnd.geogebra.tool"],
      ["ghf", "application/vnd.groove-help"],
      ["gif", "image/gif"],
      ["gim", "application/vnd.groove-identity-message"],
      ["gl", ["video/gl", "video/x-gl"]],
      ["gmx", "application/vnd.gmx"],
      ["gnumeric", "application/x-gnumeric"],
      ["gph", "application/vnd.flographit"],
      ["gqf", "application/vnd.grafeq"],
      ["gram", "application/srgs"],
      ["grv", "application/vnd.groove-injector"],
      ["grxml", "application/srgs+xml"],
      ["gsd", "audio/x-gsm"],
      ["gsf", "application/x-font-ghostscript"],
      ["gsm", "audio/x-gsm"],
      ["gsp", "application/x-gsp"],
      ["gss", "application/x-gss"],
      ["gtar", "application/x-gtar"],
      ["gtm", "application/vnd.groove-tool-message"],
      ["gtw", "model/vnd.gtw"],
      ["gv", "text/vnd.graphviz"],
      ["gxt", "application/vnd.geonext"],
      ["gz", ["application/x-gzip", "application/x-compressed"]],
      ["gzip", ["multipart/x-gzip", "application/x-gzip"]],
      ["h", ["text/plain", "text/x-h"]],
      ["h261", "video/h261"],
      ["h263", "video/h263"],
      ["h264", "video/h264"],
      ["hal", "application/vnd.hal+xml"],
      ["hbci", "application/vnd.hbci"],
      ["hdf", "application/x-hdf"],
      ["help", "application/x-helpfile"],
      ["hgl", "application/vnd.hp-hpgl"],
      ["hh", ["text/plain", "text/x-h"]],
      ["hlb", "text/x-script"],
      ["hlp", ["application/winhlp", "application/hlp", "application/x-helpfile", "application/x-winhelp"]],
      ["hpg", "application/vnd.hp-hpgl"],
      ["hpgl", "application/vnd.hp-hpgl"],
      ["hpid", "application/vnd.hp-hpid"],
      ["hps", "application/vnd.hp-hps"],
      [
        "hqx",
        [
          "application/mac-binhex40",
          "application/binhex",
          "application/binhex4",
          "application/mac-binhex",
          "application/x-binhex40",
          "application/x-mac-binhex40"
        ]
      ],
      ["hta", "application/hta"],
      ["htc", "text/x-component"],
      ["htke", "application/vnd.kenameaapp"],
      ["htm", "text/html"],
      ["html", "text/html"],
      ["htmls", "text/html"],
      ["htt", "text/webviewhtml"],
      ["htx", "text/html"],
      ["hvd", "application/vnd.yamaha.hv-dic"],
      ["hvp", "application/vnd.yamaha.hv-voice"],
      ["hvs", "application/vnd.yamaha.hv-script"],
      ["i2g", "application/vnd.intergeo"],
      ["icc", "application/vnd.iccprofile"],
      ["ice", "x-conference/x-cooltalk"],
      ["ico", "image/x-icon"],
      ["ics", "text/calendar"],
      ["idc", "text/plain"],
      ["ief", "image/ief"],
      ["iefs", "image/ief"],
      ["ifm", "application/vnd.shana.informed.formdata"],
      ["iges", ["application/iges", "model/iges"]],
      ["igl", "application/vnd.igloader"],
      ["igm", "application/vnd.insors.igm"],
      ["igs", ["application/iges", "model/iges"]],
      ["igx", "application/vnd.micrografx.igx"],
      ["iif", "application/vnd.shana.informed.interchange"],
      ["iii", "application/x-iphone"],
      ["ima", "application/x-ima"],
      ["imap", "application/x-httpd-imap"],
      ["imp", "application/vnd.accpac.simply.imp"],
      ["ims", "application/vnd.ms-ims"],
      ["inf", "application/inf"],
      ["ins", ["application/x-internet-signup", "application/x-internett-signup"]],
      ["ip", "application/x-ip2"],
      ["ipfix", "application/ipfix"],
      ["ipk", "application/vnd.shana.informed.package"],
      ["irm", "application/vnd.ibm.rights-management"],
      ["irp", "application/vnd.irepository.package+xml"],
      ["isp", "application/x-internet-signup"],
      ["isu", "video/x-isvideo"],
      ["it", "audio/it"],
      ["itp", "application/vnd.shana.informed.formtemplate"],
      ["iv", "application/x-inventor"],
      ["ivp", "application/vnd.immervision-ivp"],
      ["ivr", "i-world/i-vrml"],
      ["ivu", "application/vnd.immervision-ivu"],
      ["ivy", "application/x-livescreen"],
      ["jad", "text/vnd.sun.j2me.app-descriptor"],
      ["jam", ["application/vnd.jam", "audio/x-jam"]],
      ["jar", "application/java-archive"],
      ["jav", ["text/plain", "text/x-java-source"]],
      ["java", ["text/plain", "text/x-java-source,java", "text/x-java-source"]],
      ["jcm", "application/x-java-commerce"],
      ["jfif", ["image/pipeg", "image/jpeg", "image/pjpeg"]],
      ["jfif-tbnl", "image/jpeg"],
      ["jisp", "application/vnd.jisp"],
      ["jlt", "application/vnd.hp-jlyt"],
      ["jnlp", "application/x-java-jnlp-file"],
      ["joda", "application/vnd.joost.joda-archive"],
      ["jpe", ["image/jpeg", "image/pjpeg"]],
      ["jpeg", ["image/jpeg", "image/pjpeg"]],
      ["jpg", ["image/jpeg", "image/pjpeg"]],
      ["jpgv", "video/jpeg"],
      ["jpm", "video/jpm"],
      ["jps", "image/x-jps"],
      ["js", ["application/javascript", "application/ecmascript", "text/javascript", "text/ecmascript", "application/x-javascript"]],
      ["json", "application/json"],
      ["jut", "image/jutvision"],
      ["kar", ["audio/midi", "music/x-karaoke"]],
      ["karbon", "application/vnd.kde.karbon"],
      ["kfo", "application/vnd.kde.kformula"],
      ["kia", "application/vnd.kidspiration"],
      ["kml", "application/vnd.google-earth.kml+xml"],
      ["kmz", "application/vnd.google-earth.kmz"],
      ["kne", "application/vnd.kinar"],
      ["kon", "application/vnd.kde.kontour"],
      ["kpr", "application/vnd.kde.kpresenter"],
      ["ksh", ["application/x-ksh", "text/x-script.ksh"]],
      ["ksp", "application/vnd.kde.kspread"],
      ["ktx", "image/ktx"],
      ["ktz", "application/vnd.kahootz"],
      ["kwd", "application/vnd.kde.kword"],
      ["la", ["audio/nspaudio", "audio/x-nspaudio"]],
      ["lam", "audio/x-liveaudio"],
      ["lasxml", "application/vnd.las.las+xml"],
      ["latex", "application/x-latex"],
      ["lbd", "application/vnd.llamagraphics.life-balance.desktop"],
      ["lbe", "application/vnd.llamagraphics.life-balance.exchange+xml"],
      ["les", "application/vnd.hhe.lesson-player"],
      ["lha", ["application/octet-stream", "application/lha", "application/x-lha"]],
      ["lhx", "application/octet-stream"],
      ["link66", "application/vnd.route66.link66+xml"],
      ["list", "text/plain"],
      ["lma", ["audio/nspaudio", "audio/x-nspaudio"]],
      ["log", "text/plain"],
      ["lrm", "application/vnd.ms-lrm"],
      ["lsf", "video/x-la-asf"],
      ["lsp", ["application/x-lisp", "text/x-script.lisp"]],
      ["lst", "text/plain"],
      ["lsx", ["video/x-la-asf", "text/x-la-asf"]],
      ["ltf", "application/vnd.frogans.ltf"],
      ["ltx", "application/x-latex"],
      ["lvp", "audio/vnd.lucent.voice"],
      ["lwp", "application/vnd.lotus-wordpro"],
      ["lzh", ["application/octet-stream", "application/x-lzh"]],
      ["lzx", ["application/lzx", "application/octet-stream", "application/x-lzx"]],
      ["m", ["text/plain", "text/x-m"]],
      ["m13", "application/x-msmediaview"],
      ["m14", "application/x-msmediaview"],
      ["m1v", "video/mpeg"],
      ["m21", "application/mp21"],
      ["m2a", "audio/mpeg"],
      ["m2v", "video/mpeg"],
      ["m3u", ["audio/x-mpegurl", "audio/x-mpequrl"]],
      ["m3u8", "application/vnd.apple.mpegurl"],
      ["m4v", "video/x-m4v"],
      ["ma", "application/mathematica"],
      ["mads", "application/mads+xml"],
      ["mag", "application/vnd.ecowin.chart"],
      ["man", "application/x-troff-man"],
      ["map", "application/x-navimap"],
      ["mar", "text/plain"],
      ["mathml", "application/mathml+xml"],
      ["mbd", "application/mbedlet"],
      ["mbk", "application/vnd.mobius.mbk"],
      ["mbox", "application/mbox"],
      ["mc$", "application/x-magic-cap-package-1.0"],
      ["mc1", "application/vnd.medcalcdata"],
      ["mcd", ["application/mcad", "application/vnd.mcd", "application/x-mathcad"]],
      ["mcf", ["image/vasa", "text/mcf"]],
      ["mcp", "application/netmc"],
      ["mcurl", "text/vnd.curl.mcurl"],
      ["mdb", "application/x-msaccess"],
      ["mdi", "image/vnd.ms-modi"],
      ["me", "application/x-troff-me"],
      ["meta4", "application/metalink4+xml"],
      ["mets", "application/mets+xml"],
      ["mfm", "application/vnd.mfmp"],
      ["mgp", "application/vnd.osgeo.mapguide.package"],
      ["mgz", "application/vnd.proteus.magazine"],
      ["mht", "message/rfc822"],
      ["mhtml", "message/rfc822"],
      ["mid", ["audio/mid", "audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
      ["midi", ["audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
      ["mif", ["application/vnd.mif", "application/x-mif", "application/x-frame"]],
      ["mime", ["message/rfc822", "www/mime"]],
      ["mj2", "video/mj2"],
      ["mjf", "audio/x-vnd.audioexplosion.mjuicemediafile"],
      ["mjpg", "video/x-motion-jpeg"],
      ["mlp", "application/vnd.dolby.mlp"],
      ["mm", ["application/base64", "application/x-meme"]],
      ["mmd", "application/vnd.chipnuts.karaoke-mmd"],
      ["mme", "application/base64"],
      ["mmf", "application/vnd.smaf"],
      ["mmr", "image/vnd.fujixerox.edmics-mmr"],
      ["mny", "application/x-msmoney"],
      ["mod", ["audio/mod", "audio/x-mod"]],
      ["mods", "application/mods+xml"],
      ["moov", "video/quicktime"],
      ["mov", "video/quicktime"],
      ["movie", "video/x-sgi-movie"],
      ["mp2", ["video/mpeg", "audio/mpeg", "video/x-mpeg", "audio/x-mpeg", "video/x-mpeq2a"]],
      ["mp3", ["audio/mpeg", "audio/mpeg3", "video/mpeg", "audio/x-mpeg-3", "video/x-mpeg"]],
      ["mp4", ["video/mp4", "application/mp4"]],
      ["mp4a", "audio/mp4"],
      ["mpa", ["video/mpeg", "audio/mpeg"]],
      ["mpc", ["application/vnd.mophun.certificate", "application/x-project"]],
      ["mpe", "video/mpeg"],
      ["mpeg", "video/mpeg"],
      ["mpg", ["video/mpeg", "audio/mpeg"]],
      ["mpga", "audio/mpeg"],
      ["mpkg", "application/vnd.apple.installer+xml"],
      ["mpm", "application/vnd.blueice.multipass"],
      ["mpn", "application/vnd.mophun.application"],
      ["mpp", "application/vnd.ms-project"],
      ["mpt", "application/x-project"],
      ["mpv", "application/x-project"],
      ["mpv2", "video/mpeg"],
      ["mpx", "application/x-project"],
      ["mpy", "application/vnd.ibm.minipay"],
      ["mqy", "application/vnd.mobius.mqy"],
      ["mrc", "application/marc"],
      ["mrcx", "application/marcxml+xml"],
      ["ms", "application/x-troff-ms"],
      ["mscml", "application/mediaservercontrol+xml"],
      ["mseq", "application/vnd.mseq"],
      ["msf", "application/vnd.epson.msf"],
      ["msg", "application/vnd.ms-outlook"],
      ["msh", "model/mesh"],
      ["msl", "application/vnd.mobius.msl"],
      ["msty", "application/vnd.muvee.style"],
      ["mts", "model/vnd.mts"],
      ["mus", "application/vnd.musician"],
      ["musicxml", "application/vnd.recordare.musicxml+xml"],
      ["mv", "video/x-sgi-movie"],
      ["mvb", "application/x-msmediaview"],
      ["mwf", "application/vnd.mfer"],
      ["mxf", "application/mxf"],
      ["mxl", "application/vnd.recordare.musicxml"],
      ["mxml", "application/xv+xml"],
      ["mxs", "application/vnd.triscape.mxs"],
      ["mxu", "video/vnd.mpegurl"],
      ["my", "audio/make"],
      ["mzz", "application/x-vnd.audioexplosion.mzz"],
      ["n-gage", "application/vnd.nokia.n-gage.symbian.install"],
      ["n3", "text/n3"],
      ["nap", "image/naplps"],
      ["naplps", "image/naplps"],
      ["nbp", "application/vnd.wolfram.player"],
      ["nc", "application/x-netcdf"],
      ["ncm", "application/vnd.nokia.configuration-message"],
      ["ncx", "application/x-dtbncx+xml"],
      ["ngdat", "application/vnd.nokia.n-gage.data"],
      ["nif", "image/x-niff"],
      ["niff", "image/x-niff"],
      ["nix", "application/x-mix-transfer"],
      ["nlu", "application/vnd.neurolanguage.nlu"],
      ["nml", "application/vnd.enliven"],
      ["nnd", "application/vnd.noblenet-directory"],
      ["nns", "application/vnd.noblenet-sealer"],
      ["nnw", "application/vnd.noblenet-web"],
      ["npx", "image/vnd.net-fpx"],
      ["nsc", "application/x-conference"],
      ["nsf", "application/vnd.lotus-notes"],
      ["nvd", "application/x-navidoc"],
      ["nws", "message/rfc822"],
      ["o", "application/octet-stream"],
      ["oa2", "application/vnd.fujitsu.oasys2"],
      ["oa3", "application/vnd.fujitsu.oasys3"],
      ["oas", "application/vnd.fujitsu.oasys"],
      ["obd", "application/x-msbinder"],
      ["oda", "application/oda"],
      ["odb", "application/vnd.oasis.opendocument.database"],
      ["odc", "application/vnd.oasis.opendocument.chart"],
      ["odf", "application/vnd.oasis.opendocument.formula"],
      ["odft", "application/vnd.oasis.opendocument.formula-template"],
      ["odg", "application/vnd.oasis.opendocument.graphics"],
      ["odi", "application/vnd.oasis.opendocument.image"],
      ["odm", "application/vnd.oasis.opendocument.text-master"],
      ["odp", "application/vnd.oasis.opendocument.presentation"],
      ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
      ["odt", "application/vnd.oasis.opendocument.text"],
      ["oga", "audio/ogg"],
      ["ogv", "video/ogg"],
      ["ogx", "application/ogg"],
      ["omc", "application/x-omc"],
      ["omcd", "application/x-omcdatamaker"],
      ["omcr", "application/x-omcregerator"],
      ["onetoc", "application/onenote"],
      ["opf", "application/oebps-package+xml"],
      ["org", "application/vnd.lotus-organizer"],
      ["osf", "application/vnd.yamaha.openscoreformat"],
      ["osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml"],
      ["otc", "application/vnd.oasis.opendocument.chart-template"],
      ["otf", "application/x-font-otf"],
      ["otg", "application/vnd.oasis.opendocument.graphics-template"],
      ["oth", "application/vnd.oasis.opendocument.text-web"],
      ["oti", "application/vnd.oasis.opendocument.image-template"],
      ["otp", "application/vnd.oasis.opendocument.presentation-template"],
      ["ots", "application/vnd.oasis.opendocument.spreadsheet-template"],
      ["ott", "application/vnd.oasis.opendocument.text-template"],
      ["oxt", "application/vnd.openofficeorg.extension"],
      ["p", "text/x-pascal"],
      ["p10", ["application/pkcs10", "application/x-pkcs10"]],
      ["p12", ["application/pkcs-12", "application/x-pkcs12"]],
      ["p7a", "application/x-pkcs7-signature"],
      ["p7b", "application/x-pkcs7-certificates"],
      ["p7c", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
      ["p7m", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
      ["p7r", "application/x-pkcs7-certreqresp"],
      ["p7s", ["application/pkcs7-signature", "application/x-pkcs7-signature"]],
      ["p8", "application/pkcs8"],
      ["par", "text/plain-bas"],
      ["part", "application/pro_eng"],
      ["pas", "text/pascal"],
      ["paw", "application/vnd.pawaafile"],
      ["pbd", "application/vnd.powerbuilder6"],
      ["pbm", "image/x-portable-bitmap"],
      ["pcf", "application/x-font-pcf"],
      ["pcl", ["application/vnd.hp-pcl", "application/x-pcl"]],
      ["pclxl", "application/vnd.hp-pclxl"],
      ["pct", "image/x-pict"],
      ["pcurl", "application/vnd.curl.pcurl"],
      ["pcx", "image/x-pcx"],
      ["pdb", ["application/vnd.palm", "chemical/x-pdb"]],
      ["pdf", "application/pdf"],
      ["pfa", "application/x-font-type1"],
      ["pfr", "application/font-tdpfr"],
      ["pfunk", ["audio/make", "audio/make.my.funk"]],
      ["pfx", "application/x-pkcs12"],
      ["pgm", ["image/x-portable-graymap", "image/x-portable-greymap"]],
      ["pgn", "application/x-chess-pgn"],
      ["pgp", "application/pgp-signature"],
      ["pic", ["image/pict", "image/x-pict"]],
      ["pict", "image/pict"],
      ["pkg", "application/x-newton-compatible-pkg"],
      ["pki", "application/pkixcmp"],
      ["pkipath", "application/pkix-pkipath"],
      ["pko", ["application/ynd.ms-pkipko", "application/vnd.ms-pki.pko"]],
      ["pl", ["text/plain", "text/x-script.perl"]],
      ["plb", "application/vnd.3gpp.pic-bw-large"],
      ["plc", "application/vnd.mobius.plc"],
      ["plf", "application/vnd.pocketlearn"],
      ["pls", "application/pls+xml"],
      ["plx", "application/x-pixclscript"],
      ["pm", ["text/x-script.perl-module", "image/x-xpixmap"]],
      ["pm4", "application/x-pagemaker"],
      ["pm5", "application/x-pagemaker"],
      ["pma", "application/x-perfmon"],
      ["pmc", "application/x-perfmon"],
      ["pml", ["application/vnd.ctc-posml", "application/x-perfmon"]],
      ["pmr", "application/x-perfmon"],
      ["pmw", "application/x-perfmon"],
      ["png", "image/png"],
      ["pnm", ["application/x-portable-anymap", "image/x-portable-anymap"]],
      ["portpkg", "application/vnd.macports.portpkg"],
      ["pot", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
      ["potm", "application/vnd.ms-powerpoint.template.macroenabled.12"],
      ["potx", "application/vnd.openxmlformats-officedocument.presentationml.template"],
      ["pov", "model/x-pov"],
      ["ppa", "application/vnd.ms-powerpoint"],
      ["ppam", "application/vnd.ms-powerpoint.addin.macroenabled.12"],
      ["ppd", "application/vnd.cups-ppd"],
      ["ppm", "image/x-portable-pixmap"],
      ["pps", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
      ["ppsm", "application/vnd.ms-powerpoint.slideshow.macroenabled.12"],
      ["ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"],
      ["ppt", ["application/vnd.ms-powerpoint", "application/mspowerpoint", "application/powerpoint", "application/x-mspowerpoint"]],
      ["pptm", "application/vnd.ms-powerpoint.presentation.macroenabled.12"],
      ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
      ["ppz", "application/mspowerpoint"],
      ["prc", "application/x-mobipocket-ebook"],
      ["pre", ["application/vnd.lotus-freelance", "application/x-freelance"]],
      ["prf", "application/pics-rules"],
      ["prt", "application/pro_eng"],
      ["ps", "application/postscript"],
      ["psb", "application/vnd.3gpp.pic-bw-small"],
      ["psd", ["application/octet-stream", "image/vnd.adobe.photoshop"]],
      ["psf", "application/x-font-linux-psf"],
      ["pskcxml", "application/pskc+xml"],
      ["ptid", "application/vnd.pvi.ptid1"],
      ["pub", "application/x-mspublisher"],
      ["pvb", "application/vnd.3gpp.pic-bw-var"],
      ["pvu", "paleovu/x-pv"],
      ["pwn", "application/vnd.3m.post-it-notes"],
      ["pwz", "application/vnd.ms-powerpoint"],
      ["py", "text/x-script.phyton"],
      ["pya", "audio/vnd.ms-playready.media.pya"],
      ["pyc", "application/x-bytecode.python"],
      ["pyv", "video/vnd.ms-playready.media.pyv"],
      ["qam", "application/vnd.epson.quickanime"],
      ["qbo", "application/vnd.intu.qbo"],
      ["qcp", "audio/vnd.qcelp"],
      ["qd3", "x-world/x-3dmf"],
      ["qd3d", "x-world/x-3dmf"],
      ["qfx", "application/vnd.intu.qfx"],
      ["qif", "image/x-quicktime"],
      ["qps", "application/vnd.publishare-delta-tree"],
      ["qt", "video/quicktime"],
      ["qtc", "video/x-qtc"],
      ["qti", "image/x-quicktime"],
      ["qtif", "image/x-quicktime"],
      ["qxd", "application/vnd.quark.quarkxpress"],
      ["ra", ["audio/x-realaudio", "audio/x-pn-realaudio", "audio/x-pn-realaudio-plugin"]],
      ["ram", "audio/x-pn-realaudio"],
      ["rar", "application/x-rar-compressed"],
      ["ras", ["image/cmu-raster", "application/x-cmu-raster", "image/x-cmu-raster"]],
      ["rast", "image/cmu-raster"],
      ["rcprofile", "application/vnd.ipunplugged.rcprofile"],
      ["rdf", "application/rdf+xml"],
      ["rdz", "application/vnd.data-vision.rdz"],
      ["rep", "application/vnd.businessobjects"],
      ["res", "application/x-dtbresource+xml"],
      ["rexx", "text/x-script.rexx"],
      ["rf", "image/vnd.rn-realflash"],
      ["rgb", "image/x-rgb"],
      ["rif", "application/reginfo+xml"],
      ["rip", "audio/vnd.rip"],
      ["rl", "application/resource-lists+xml"],
      ["rlc", "image/vnd.fujixerox.edmics-rlc"],
      ["rld", "application/resource-lists-diff+xml"],
      ["rm", ["application/vnd.rn-realmedia", "audio/x-pn-realaudio"]],
      ["rmi", "audio/mid"],
      ["rmm", "audio/x-pn-realaudio"],
      ["rmp", ["audio/x-pn-realaudio-plugin", "audio/x-pn-realaudio"]],
      ["rms", "application/vnd.jcp.javame.midlet-rms"],
      ["rnc", "application/relax-ng-compact-syntax"],
      ["rng", ["application/ringing-tones", "application/vnd.nokia.ringing-tone"]],
      ["rnx", "application/vnd.rn-realplayer"],
      ["roff", "application/x-troff"],
      ["rp", "image/vnd.rn-realpix"],
      ["rp9", "application/vnd.cloanto.rp9"],
      ["rpm", "audio/x-pn-realaudio-plugin"],
      ["rpss", "application/vnd.nokia.radio-presets"],
      ["rpst", "application/vnd.nokia.radio-preset"],
      ["rq", "application/sparql-query"],
      ["rs", "application/rls-services+xml"],
      ["rsd", "application/rsd+xml"],
      ["rt", ["text/richtext", "text/vnd.rn-realtext"]],
      ["rtf", ["application/rtf", "text/richtext", "application/x-rtf"]],
      ["rtx", ["text/richtext", "application/rtf"]],
      ["rv", "video/vnd.rn-realvideo"],
      ["s", "text/x-asm"],
      ["s3m", "audio/s3m"],
      ["saf", "application/vnd.yamaha.smaf-audio"],
      ["saveme", "application/octet-stream"],
      ["sbk", "application/x-tbook"],
      ["sbml", "application/sbml+xml"],
      ["sc", "application/vnd.ibm.secure-container"],
      ["scd", "application/x-msschedule"],
      ["scm", ["application/vnd.lotus-screencam", "video/x-scm", "text/x-script.guile", "application/x-lotusscreencam", "text/x-script.scheme"]],
      ["scq", "application/scvp-cv-request"],
      ["scs", "application/scvp-cv-response"],
      ["sct", "text/scriptlet"],
      ["scurl", "text/vnd.curl.scurl"],
      ["sda", "application/vnd.stardivision.draw"],
      ["sdc", "application/vnd.stardivision.calc"],
      ["sdd", "application/vnd.stardivision.impress"],
      ["sdkm", "application/vnd.solent.sdkm+xml"],
      ["sdml", "text/plain"],
      ["sdp", ["application/sdp", "application/x-sdp"]],
      ["sdr", "application/sounder"],
      ["sdw", "application/vnd.stardivision.writer"],
      ["sea", ["application/sea", "application/x-sea"]],
      ["see", "application/vnd.seemail"],
      ["seed", "application/vnd.fdsn.seed"],
      ["sema", "application/vnd.sema"],
      ["semd", "application/vnd.semd"],
      ["semf", "application/vnd.semf"],
      ["ser", "application/java-serialized-object"],
      ["set", "application/set"],
      ["setpay", "application/set-payment-initiation"],
      ["setreg", "application/set-registration-initiation"],
      ["sfd-hdstx", "application/vnd.hydrostatix.sof-data"],
      ["sfs", "application/vnd.spotfire.sfs"],
      ["sgl", "application/vnd.stardivision.writer-global"],
      ["sgm", ["text/sgml", "text/x-sgml"]],
      ["sgml", ["text/sgml", "text/x-sgml"]],
      ["sh", ["application/x-shar", "application/x-bsh", "application/x-sh", "text/x-script.sh"]],
      ["shar", ["application/x-bsh", "application/x-shar"]],
      ["shf", "application/shf+xml"],
      ["shtml", ["text/html", "text/x-server-parsed-html"]],
      ["sid", "audio/x-psid"],
      ["sis", "application/vnd.symbian.install"],
      ["sit", ["application/x-stuffit", "application/x-sit"]],
      ["sitx", "application/x-stuffitx"],
      ["skd", "application/x-koan"],
      ["skm", "application/x-koan"],
      ["skp", ["application/vnd.koan", "application/x-koan"]],
      ["skt", "application/x-koan"],
      ["sl", "application/x-seelogo"],
      ["sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12"],
      ["sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide"],
      ["slt", "application/vnd.epson.salt"],
      ["sm", "application/vnd.stepmania.stepchart"],
      ["smf", "application/vnd.stardivision.math"],
      ["smi", ["application/smil", "application/smil+xml"]],
      ["smil", "application/smil"],
      ["snd", ["audio/basic", "audio/x-adpcm"]],
      ["snf", "application/x-font-snf"],
      ["sol", "application/solids"],
      ["spc", ["text/x-speech", "application/x-pkcs7-certificates"]],
      ["spf", "application/vnd.yamaha.smaf-phrase"],
      ["spl", ["application/futuresplash", "application/x-futuresplash"]],
      ["spot", "text/vnd.in3d.spot"],
      ["spp", "application/scvp-vp-response"],
      ["spq", "application/scvp-vp-request"],
      ["spr", "application/x-sprite"],
      ["sprite", "application/x-sprite"],
      ["src", "application/x-wais-source"],
      ["sru", "application/sru+xml"],
      ["srx", "application/sparql-results+xml"],
      ["sse", "application/vnd.kodak-descriptor"],
      ["ssf", "application/vnd.epson.ssf"],
      ["ssi", "text/x-server-parsed-html"],
      ["ssm", "application/streamingmedia"],
      ["ssml", "application/ssml+xml"],
      ["sst", ["application/vnd.ms-pkicertstore", "application/vnd.ms-pki.certstore"]],
      ["st", "application/vnd.sailingtracker.track"],
      ["stc", "application/vnd.sun.xml.calc.template"],
      ["std", "application/vnd.sun.xml.draw.template"],
      ["step", "application/step"],
      ["stf", "application/vnd.wt.stf"],
      ["sti", "application/vnd.sun.xml.impress.template"],
      ["stk", "application/hyperstudio"],
      ["stl", ["application/vnd.ms-pkistl", "application/sla", "application/vnd.ms-pki.stl", "application/x-navistyle"]],
      ["stm", "text/html"],
      ["stp", "application/step"],
      ["str", "application/vnd.pg.format"],
      ["stw", "application/vnd.sun.xml.writer.template"],
      ["sub", "image/vnd.dvb.subtitle"],
      ["sus", "application/vnd.sus-calendar"],
      ["sv4cpio", "application/x-sv4cpio"],
      ["sv4crc", "application/x-sv4crc"],
      ["svc", "application/vnd.dvb.service"],
      ["svd", "application/vnd.svd"],
      ["svf", ["image/vnd.dwg", "image/x-dwg"]],
      ["svg", "image/svg+xml"],
      ["svr", ["x-world/x-svr", "application/x-world"]],
      ["swf", "application/x-shockwave-flash"],
      ["swi", "application/vnd.aristanetworks.swi"],
      ["sxc", "application/vnd.sun.xml.calc"],
      ["sxd", "application/vnd.sun.xml.draw"],
      ["sxg", "application/vnd.sun.xml.writer.global"],
      ["sxi", "application/vnd.sun.xml.impress"],
      ["sxm", "application/vnd.sun.xml.math"],
      ["sxw", "application/vnd.sun.xml.writer"],
      ["t", ["text/troff", "application/x-troff"]],
      ["talk", "text/x-speech"],
      ["tao", "application/vnd.tao.intent-module-archive"],
      ["tar", "application/x-tar"],
      ["tbk", ["application/toolbook", "application/x-tbook"]],
      ["tcap", "application/vnd.3gpp2.tcap"],
      ["tcl", ["text/x-script.tcl", "application/x-tcl"]],
      ["tcsh", "text/x-script.tcsh"],
      ["teacher", "application/vnd.smart.teacher"],
      ["tei", "application/tei+xml"],
      ["tex", "application/x-tex"],
      ["texi", "application/x-texinfo"],
      ["texinfo", "application/x-texinfo"],
      ["text", ["application/plain", "text/plain"]],
      ["tfi", "application/thraud+xml"],
      ["tfm", "application/x-tex-tfm"],
      ["tgz", ["application/gnutar", "application/x-compressed"]],
      ["thmx", "application/vnd.ms-officetheme"],
      ["tif", ["image/tiff", "image/x-tiff"]],
      ["tiff", ["image/tiff", "image/x-tiff"]],
      ["tmo", "application/vnd.tmobile-livetv"],
      ["torrent", "application/x-bittorrent"],
      ["tpl", "application/vnd.groove-tool-template"],
      ["tpt", "application/vnd.trid.tpt"],
      ["tr", "application/x-troff"],
      ["tra", "application/vnd.trueapp"],
      ["trm", "application/x-msterminal"],
      ["tsd", "application/timestamped-data"],
      ["tsi", "audio/tsp-audio"],
      ["tsp", ["application/dsptype", "audio/tsplayer"]],
      ["tsv", "text/tab-separated-values"],
      ["ttf", "application/x-font-ttf"],
      ["ttl", "text/turtle"],
      ["turbot", "image/florian"],
      ["twd", "application/vnd.simtech-mindmapper"],
      ["txd", "application/vnd.genomatix.tuxedo"],
      ["txf", "application/vnd.mobius.txf"],
      ["txt", "text/plain"],
      ["ufd", "application/vnd.ufdl"],
      ["uil", "text/x-uil"],
      ["uls", "text/iuls"],
      ["umj", "application/vnd.umajin"],
      ["uni", "text/uri-list"],
      ["unis", "text/uri-list"],
      ["unityweb", "application/vnd.unity"],
      ["unv", "application/i-deas"],
      ["uoml", "application/vnd.uoml+xml"],
      ["uri", "text/uri-list"],
      ["uris", "text/uri-list"],
      ["ustar", ["application/x-ustar", "multipart/x-ustar"]],
      ["utz", "application/vnd.uiq.theme"],
      ["uu", ["application/octet-stream", "text/x-uuencode"]],
      ["uue", "text/x-uuencode"],
      ["uva", "audio/vnd.dece.audio"],
      ["uvh", "video/vnd.dece.hd"],
      ["uvi", "image/vnd.dece.graphic"],
      ["uvm", "video/vnd.dece.mobile"],
      ["uvp", "video/vnd.dece.pd"],
      ["uvs", "video/vnd.dece.sd"],
      ["uvu", "video/vnd.uvvu.mp4"],
      ["uvv", "video/vnd.dece.video"],
      ["vcd", "application/x-cdlink"],
      ["vcf", "text/x-vcard"],
      ["vcg", "application/vnd.groove-vcard"],
      ["vcs", "text/x-vcalendar"],
      ["vcx", "application/vnd.vcx"],
      ["vda", "application/vda"],
      ["vdo", "video/vdo"],
      ["vew", "application/groupwise"],
      ["vis", "application/vnd.visionary"],
      ["viv", ["video/vivo", "video/vnd.vivo"]],
      ["vivo", ["video/vivo", "video/vnd.vivo"]],
      ["vmd", "application/vocaltec-media-desc"],
      ["vmf", "application/vocaltec-media-file"],
      ["voc", ["audio/voc", "audio/x-voc"]],
      ["vos", "video/vosaic"],
      ["vox", "audio/voxware"],
      ["vqe", "audio/x-twinvq-plugin"],
      ["vqf", "audio/x-twinvq"],
      ["vql", "audio/x-twinvq-plugin"],
      ["vrml", ["model/vrml", "x-world/x-vrml", "application/x-vrml"]],
      ["vrt", "x-world/x-vrt"],
      ["vsd", ["application/vnd.visio", "application/x-visio"]],
      ["vsf", "application/vnd.vsf"],
      ["vst", "application/x-visio"],
      ["vsw", "application/x-visio"],
      ["vtu", "model/vnd.vtu"],
      ["vxml", "application/voicexml+xml"],
      ["w60", "application/wordperfect6.0"],
      ["w61", "application/wordperfect6.1"],
      ["w6w", "application/msword"],
      ["wad", "application/x-doom"],
      ["wav", ["audio/wav", "audio/x-wav"]],
      ["wax", "audio/x-ms-wax"],
      ["wb1", "application/x-qpro"],
      ["wbmp", "image/vnd.wap.wbmp"],
      ["wbs", "application/vnd.criticaltools.wbs+xml"],
      ["wbxml", "application/vnd.wap.wbxml"],
      ["wcm", "application/vnd.ms-works"],
      ["wdb", "application/vnd.ms-works"],
      ["web", "application/vnd.xara"],
      ["weba", "audio/webm"],
      ["webm", "video/webm"],
      ["webp", "image/webp"],
      ["wg", "application/vnd.pmi.widget"],
      ["wgt", "application/widget"],
      ["wiz", "application/msword"],
      ["wk1", "application/x-123"],
      ["wks", "application/vnd.ms-works"],
      ["wm", "video/x-ms-wm"],
      ["wma", "audio/x-ms-wma"],
      ["wmd", "application/x-ms-wmd"],
      ["wmf", ["windows/metafile", "application/x-msmetafile"]],
      ["wml", "text/vnd.wap.wml"],
      ["wmlc", "application/vnd.wap.wmlc"],
      ["wmls", "text/vnd.wap.wmlscript"],
      ["wmlsc", "application/vnd.wap.wmlscriptc"],
      ["wmv", "video/x-ms-wmv"],
      ["wmx", "video/x-ms-wmx"],
      ["wmz", "application/x-ms-wmz"],
      ["woff", "application/x-font-woff"],
      ["word", "application/msword"],
      ["wp", "application/wordperfect"],
      ["wp5", ["application/wordperfect", "application/wordperfect6.0"]],
      ["wp6", "application/wordperfect"],
      ["wpd", ["application/wordperfect", "application/vnd.wordperfect", "application/x-wpwin"]],
      ["wpl", "application/vnd.ms-wpl"],
      ["wps", "application/vnd.ms-works"],
      ["wq1", "application/x-lotus"],
      ["wqd", "application/vnd.wqd"],
      ["wri", ["application/mswrite", "application/x-wri", "application/x-mswrite"]],
      ["wrl", ["model/vrml", "x-world/x-vrml", "application/x-world"]],
      ["wrz", ["model/vrml", "x-world/x-vrml"]],
      ["wsc", "text/scriplet"],
      ["wsdl", "application/wsdl+xml"],
      ["wspolicy", "application/wspolicy+xml"],
      ["wsrc", "application/x-wais-source"],
      ["wtb", "application/vnd.webturbo"],
      ["wtk", "application/x-wintalk"],
      ["wvx", "video/x-ms-wvx"],
      ["x-png", "image/png"],
      ["x3d", "application/vnd.hzn-3d-crossword"],
      ["xaf", "x-world/x-vrml"],
      ["xap", "application/x-silverlight-app"],
      ["xar", "application/vnd.xara"],
      ["xbap", "application/x-ms-xbap"],
      ["xbd", "application/vnd.fujixerox.docuworks.binder"],
      ["xbm", ["image/xbm", "image/x-xbm", "image/x-xbitmap"]],
      ["xdf", "application/xcap-diff+xml"],
      ["xdm", "application/vnd.syncml.dm+xml"],
      ["xdp", "application/vnd.adobe.xdp+xml"],
      ["xdr", "video/x-amt-demorun"],
      ["xdssc", "application/dssc+xml"],
      ["xdw", "application/vnd.fujixerox.docuworks"],
      ["xenc", "application/xenc+xml"],
      ["xer", "application/patch-ops-error+xml"],
      ["xfdf", "application/vnd.adobe.xfdf"],
      ["xfdl", "application/vnd.xfdl"],
      ["xgz", "xgl/drawing"],
      ["xhtml", "application/xhtml+xml"],
      ["xif", "image/vnd.xiff"],
      ["xl", "application/excel"],
      ["xla", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xlam", "application/vnd.ms-excel.addin.macroenabled.12"],
      ["xlb", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
      ["xlc", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xld", ["application/excel", "application/x-excel"]],
      ["xlk", ["application/excel", "application/x-excel"]],
      ["xll", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
      ["xlm", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xls", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xlsb", "application/vnd.ms-excel.sheet.binary.macroenabled.12"],
      ["xlsm", "application/vnd.ms-excel.sheet.macroenabled.12"],
      ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
      ["xlt", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xltm", "application/vnd.ms-excel.template.macroenabled.12"],
      ["xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"],
      ["xlv", ["application/excel", "application/x-excel"]],
      ["xlw", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xm", "audio/xm"],
      ["xml", ["application/xml", "text/xml", "application/atom+xml", "application/rss+xml"]],
      ["xmz", "xgl/movie"],
      ["xo", "application/vnd.olpc-sugar"],
      ["xof", "x-world/x-vrml"],
      ["xop", "application/xop+xml"],
      ["xpi", "application/x-xpinstall"],
      ["xpix", "application/x-vnd.ls-xpix"],
      ["xpm", ["image/xpm", "image/x-xpixmap"]],
      ["xpr", "application/vnd.is-xpr"],
      ["xps", "application/vnd.ms-xpsdocument"],
      ["xpw", "application/vnd.intercon.formnet"],
      ["xslt", "application/xslt+xml"],
      ["xsm", "application/vnd.syncml+xml"],
      ["xspf", "application/xspf+xml"],
      ["xsr", "video/x-amt-showrun"],
      ["xul", "application/vnd.mozilla.xul+xml"],
      ["xwd", ["image/x-xwd", "image/x-xwindowdump"]],
      ["xyz", ["chemical/x-xyz", "chemical/x-pdb"]],
      ["yang", "application/yang"],
      ["yin", "application/yin+xml"],
      ["z", ["application/x-compressed", "application/x-compress"]],
      ["zaz", "application/vnd.zzazz.deck+xml"],
      ["zip", ["application/zip", "multipart/x-zip", "application/x-zip-compressed", "application/x-compressed"]],
      ["zir", "application/vnd.zul"],
      ["zmm", "application/vnd.handheld-entertainment+xml"],
      ["zoo", "application/octet-stream"],
      ["zsh", "text/x-script.zsh"]
    ]);
    module2.exports = {
      detectMimeType(filename) {
        if (!filename) {
          return defaultMimeType;
        }
        let parsed = path.parse(filename);
        let extension = (parsed.ext.substr(1) || parsed.name || "").split("?").shift().trim().toLowerCase();
        let value = defaultMimeType;
        if (extensions.has(extension)) {
          value = extensions.get(extension);
        }
        if (Array.isArray(value)) {
          return value[0];
        }
        return value;
      },
      detectExtension(mimeType) {
        if (!mimeType) {
          return defaultExtension;
        }
        let parts = (mimeType || "").toLowerCase().trim().split("/");
        let rootType = parts.shift().trim();
        let subType = parts.join("/").trim();
        if (mimeTypes.has(rootType + "/" + subType)) {
          let value = mimeTypes.get(rootType + "/" + subType);
          if (Array.isArray(value)) {
            return value[0];
          }
          return value;
        }
        switch (rootType) {
          case "text":
            return "txt";
          default:
            return "bin";
        }
      }
    };
  }
});

// node_modules/nodemailer/lib/base64/index.js
var require_base64 = __commonJS({
  "node_modules/nodemailer/lib/base64/index.js"(exports, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    function encode(buffer) {
      if (typeof buffer === "string") {
        buffer = Buffer.from(buffer, "utf-8");
      }
      return buffer.toString("base64");
    }
    function wrap(str, lineLength) {
      str = (str || "").toString();
      lineLength = lineLength || 76;
      if (str.length <= lineLength) {
        return str;
      }
      let result = [];
      let pos = 0;
      let chunkLength = lineLength * 1024;
      while (pos < str.length) {
        let wrappedLines = str.substr(pos, chunkLength).replace(new RegExp(".{" + lineLength + "}", "g"), "$&\r\n").trim();
        result.push(wrappedLines);
        pos += chunkLength;
      }
      return result.join("\r\n").trim();
    }
    var Encoder = class extends Transform {
      constructor(options) {
        super();
        this.options = options || {};
        if (this.options.lineLength !== false) {
          this.options.lineLength = this.options.lineLength || 76;
        }
        this._curLine = "";
        this._remainingBytes = false;
        this.inputBytes = 0;
        this.outputBytes = 0;
      }
      _transform(chunk, encoding, done) {
        if (encoding !== "buffer") {
          chunk = Buffer.from(chunk, encoding);
        }
        if (!chunk || !chunk.length) {
          return setImmediate(done);
        }
        this.inputBytes += chunk.length;
        if (this._remainingBytes && this._remainingBytes.length) {
          chunk = Buffer.concat([this._remainingBytes, chunk], this._remainingBytes.length + chunk.length);
          this._remainingBytes = false;
        }
        if (chunk.length % 3) {
          this._remainingBytes = chunk.slice(chunk.length - chunk.length % 3);
          chunk = chunk.slice(0, chunk.length - chunk.length % 3);
        } else {
          this._remainingBytes = false;
        }
        let b64 = this._curLine + encode(chunk);
        if (this.options.lineLength) {
          b64 = wrap(b64, this.options.lineLength);
          let lastLF = b64.lastIndexOf("\n");
          if (lastLF < 0) {
            this._curLine = b64;
            b64 = "";
          } else if (lastLF === b64.length - 1) {
            this._curLine = "";
          } else {
            this._curLine = b64.substr(lastLF + 1);
            b64 = b64.substr(0, lastLF + 1);
          }
        }
        if (b64) {
          this.outputBytes += b64.length;
          this.push(Buffer.from(b64, "ascii"));
        }
        setImmediate(done);
      }
      _flush(done) {
        if (this._remainingBytes && this._remainingBytes.length) {
          this._curLine += encode(this._remainingBytes);
        }
        if (this._curLine) {
          this._curLine = wrap(this._curLine, this.options.lineLength);
          this.outputBytes += this._curLine.length;
          this.push(this._curLine, "ascii");
          this._curLine = "";
        }
        done();
      }
    };
    module2.exports = {
      encode,
      wrap,
      Encoder
    };
  }
});

// node_modules/nodemailer/lib/qp/index.js
var require_qp = __commonJS({
  "node_modules/nodemailer/lib/qp/index.js"(exports, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    function encode(buffer) {
      if (typeof buffer === "string") {
        buffer = Buffer.from(buffer, "utf-8");
      }
      let ranges = [
        [9],
        [10],
        [13],
        [32, 60],
        [62, 126]
      ];
      let result = "";
      let ord;
      for (let i = 0, len = buffer.length; i < len; i++) {
        ord = buffer[i];
        if (checkRanges(ord, ranges) && !((ord === 32 || ord === 9) && (i === len - 1 || buffer[i + 1] === 10 || buffer[i + 1] === 13))) {
          result += String.fromCharCode(ord);
          continue;
        }
        result += "=" + (ord < 16 ? "0" : "") + ord.toString(16).toUpperCase();
      }
      return result;
    }
    function wrap(str, lineLength) {
      str = (str || "").toString();
      lineLength = lineLength || 76;
      if (str.length <= lineLength) {
        return str;
      }
      let pos = 0;
      let len = str.length;
      let match, code, line;
      let lineMargin = Math.floor(lineLength / 3);
      let result = "";
      while (pos < len) {
        line = str.substr(pos, lineLength);
        if (match = line.match(/\r\n/)) {
          line = line.substr(0, match.index + match[0].length);
          result += line;
          pos += line.length;
          continue;
        }
        if (line.substr(-1) === "\n") {
          result += line;
          pos += line.length;
          continue;
        } else if (match = line.substr(-lineMargin).match(/\n.*?$/)) {
          line = line.substr(0, line.length - (match[0].length - 1));
          result += line;
          pos += line.length;
          continue;
        } else if (line.length > lineLength - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
          line = line.substr(0, line.length - (match[0].length - 1));
        } else if (line.match(/[=][\da-f]{0,2}$/i)) {
          if (match = line.match(/[=][\da-f]{0,1}$/i)) {
            line = line.substr(0, line.length - match[0].length);
          }
          while (line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/[=][\da-f]{2}$/gi))) {
            code = parseInt(match[0].substr(1, 2), 16);
            if (code < 128) {
              break;
            }
            line = line.substr(0, line.length - 3);
            if (code >= 192) {
              break;
            }
          }
        }
        if (pos + line.length < len && line.substr(-1) !== "\n") {
          if (line.length === lineLength && line.match(/[=][\da-f]{2}$/i)) {
            line = line.substr(0, line.length - 3);
          } else if (line.length === lineLength) {
            line = line.substr(0, line.length - 1);
          }
          pos += line.length;
          line += "=\r\n";
        } else {
          pos += line.length;
        }
        result += line;
      }
      return result;
    }
    function checkRanges(nr, ranges) {
      for (let i = ranges.length - 1; i >= 0; i--) {
        if (!ranges[i].length) {
          continue;
        }
        if (ranges[i].length === 1 && nr === ranges[i][0]) {
          return true;
        }
        if (ranges[i].length === 2 && nr >= ranges[i][0] && nr <= ranges[i][1]) {
          return true;
        }
      }
      return false;
    }
    var Encoder = class extends Transform {
      constructor(options) {
        super();
        this.options = options || {};
        if (this.options.lineLength !== false) {
          this.options.lineLength = this.options.lineLength || 76;
        }
        this._curLine = "";
        this.inputBytes = 0;
        this.outputBytes = 0;
      }
      _transform(chunk, encoding, done) {
        let qp;
        if (encoding !== "buffer") {
          chunk = Buffer.from(chunk, encoding);
        }
        if (!chunk || !chunk.length) {
          return done();
        }
        this.inputBytes += chunk.length;
        if (this.options.lineLength) {
          qp = this._curLine + encode(chunk);
          qp = wrap(qp, this.options.lineLength);
          qp = qp.replace(/(^|\n)([^\n]*)$/, (match, lineBreak, lastLine) => {
            this._curLine = lastLine;
            return lineBreak;
          });
          if (qp) {
            this.outputBytes += qp.length;
            this.push(qp);
          }
        } else {
          qp = encode(chunk);
          this.outputBytes += qp.length;
          this.push(qp, "ascii");
        }
        done();
      }
      _flush(done) {
        if (this._curLine) {
          this.outputBytes += this._curLine.length;
          this.push(this._curLine, "ascii");
        }
        done();
      }
    };
    module2.exports = {
      encode,
      wrap,
      Encoder
    };
  }
});

// node_modules/nodemailer/lib/mime-funcs/index.js
var require_mime_funcs = __commonJS({
  "node_modules/nodemailer/lib/mime-funcs/index.js"(exports, module2) {
    "use strict";
    var base64 = require_base64();
    var qp = require_qp();
    var mimeTypes = require_mime_types2();
    module2.exports = {
      isPlainText(value, isParam) {
        const re = isParam ? /[\x00-\x08\x0b\x0c\x0e-\x1f"\u0080-\uFFFF]/ : /[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/;
        if (typeof value !== "string" || re.test(value)) {
          return false;
        } else {
          return true;
        }
      },
      hasLongerLines(str, lineLength) {
        if (str.length > 128 * 1024) {
          return true;
        }
        return new RegExp("^.{" + (lineLength + 1) + ",}", "m").test(str);
      },
      encodeWord(data, mimeWordEncoding, maxLength) {
        mimeWordEncoding = (mimeWordEncoding || "Q").toString().toUpperCase().trim().charAt(0);
        maxLength = maxLength || 0;
        let encodedStr;
        let toCharset = "UTF-8";
        if (maxLength && maxLength > 7 + toCharset.length) {
          maxLength -= 7 + toCharset.length;
        }
        if (mimeWordEncoding === "Q") {
          encodedStr = qp.encode(data).replace(/[^a-z0-9!*+\-/=]/gi, (chr) => {
            let ord = chr.charCodeAt(0).toString(16).toUpperCase();
            if (chr === " ") {
              return "_";
            } else {
              return "=" + (ord.length === 1 ? "0" + ord : ord);
            }
          });
        } else if (mimeWordEncoding === "B") {
          encodedStr = typeof data === "string" ? data : base64.encode(data);
          maxLength = maxLength ? Math.max(3, (maxLength - maxLength % 4) / 4 * 3) : 0;
        }
        if (maxLength && (mimeWordEncoding !== "B" ? encodedStr : base64.encode(data)).length > maxLength) {
          if (mimeWordEncoding === "Q") {
            encodedStr = this.splitMimeEncodedString(encodedStr, maxLength).join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
          } else {
            let parts = [];
            let lpart = "";
            for (let i = 0, len = encodedStr.length; i < len; i++) {
              let chr = encodedStr.charAt(i);
              if (Buffer.byteLength(lpart + chr) <= maxLength || i === 0) {
                lpart += chr;
              } else {
                parts.push(base64.encode(lpart));
                lpart = chr;
              }
            }
            if (lpart) {
              parts.push(base64.encode(lpart));
            }
            if (parts.length > 1) {
              encodedStr = parts.join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
            } else {
              encodedStr = parts.join("");
            }
          }
        } else if (mimeWordEncoding === "B") {
          encodedStr = base64.encode(data);
        }
        return "=?" + toCharset + "?" + mimeWordEncoding + "?" + encodedStr + (encodedStr.substr(-2) === "?=" ? "" : "?=");
      },
      encodeWords(value, mimeWordEncoding, maxLength, encodeAll) {
        maxLength = maxLength || 0;
        let encodedValue;
        let firstMatch = value.match(/(?:^|\s)([^\s]*["\u0080-\uFFFF])/);
        if (!firstMatch) {
          return value;
        }
        if (encodeAll) {
          return this.encodeWord(value, mimeWordEncoding, maxLength);
        }
        let lastMatch = value.match(/(["\u0080-\uFFFF][^\s]*)[^"\u0080-\uFFFF]*$/);
        if (!lastMatch) {
          return value;
        }
        let startIndex = firstMatch.index + (firstMatch[0].match(/[^\s]/) || {
          index: 0
        }).index;
        let endIndex = lastMatch.index + (lastMatch[1] || "").length;
        encodedValue = (startIndex ? value.substr(0, startIndex) : "") + this.encodeWord(value.substring(startIndex, endIndex), mimeWordEncoding || "Q", maxLength) + (endIndex < value.length ? value.substr(endIndex) : "");
        return encodedValue;
      },
      buildHeaderValue(structured) {
        let paramsArray = [];
        Object.keys(structured.params || {}).forEach((param) => {
          let value = structured.params[param];
          if (!this.isPlainText(value, true) || value.length >= 75) {
            this.buildHeaderParam(param, value, 50).forEach((encodedParam) => {
              if (!/[\s"\\;:/=(),<>@[\]?]|^[-']|'$/.test(encodedParam.value) || encodedParam.key.substr(-1) === "*") {
                paramsArray.push(encodedParam.key + "=" + encodedParam.value);
              } else {
                paramsArray.push(encodedParam.key + "=" + JSON.stringify(encodedParam.value));
              }
            });
          } else if (/[\s'"\\;:/=(),<>@[\]?]|^-/.test(value)) {
            paramsArray.push(param + "=" + JSON.stringify(value));
          } else {
            paramsArray.push(param + "=" + value);
          }
        });
        return structured.value + (paramsArray.length ? "; " + paramsArray.join("; ") : "");
      },
      buildHeaderParam(key, data, maxLength) {
        let list = [];
        let encodedStr = typeof data === "string" ? data : (data || "").toString();
        let encodedStrArr;
        let chr, ord;
        let line;
        let startPos = 0;
        let i, len;
        maxLength = maxLength || 50;
        if (this.isPlainText(data, true)) {
          if (encodedStr.length <= maxLength) {
            return [
              {
                key,
                value: encodedStr
              }
            ];
          }
          encodedStr = encodedStr.replace(new RegExp(".{" + maxLength + "}", "g"), (str) => {
            list.push({
              line: str
            });
            return "";
          });
          if (encodedStr) {
            list.push({
              line: encodedStr
            });
          }
        } else {
          if (/[\uD800-\uDBFF]/.test(encodedStr)) {
            encodedStrArr = [];
            for (i = 0, len = encodedStr.length; i < len; i++) {
              chr = encodedStr.charAt(i);
              ord = chr.charCodeAt(0);
              if (ord >= 55296 && ord <= 56319 && i < len - 1) {
                chr += encodedStr.charAt(i + 1);
                encodedStrArr.push(chr);
                i++;
              } else {
                encodedStrArr.push(chr);
              }
            }
            encodedStr = encodedStrArr;
          }
          line = "utf-8''";
          let encoded = true;
          startPos = 0;
          for (i = 0, len = encodedStr.length; i < len; i++) {
            chr = encodedStr[i];
            if (encoded) {
              chr = this.safeEncodeURIComponent(chr);
            } else {
              chr = chr === " " ? chr : this.safeEncodeURIComponent(chr);
              if (chr !== encodedStr[i]) {
                if ((this.safeEncodeURIComponent(line) + chr).length >= maxLength) {
                  list.push({
                    line,
                    encoded
                  });
                  line = "";
                  startPos = i - 1;
                } else {
                  encoded = true;
                  i = startPos;
                  line = "";
                  continue;
                }
              }
            }
            if ((line + chr).length >= maxLength) {
              list.push({
                line,
                encoded
              });
              line = chr = encodedStr[i] === " " ? " " : this.safeEncodeURIComponent(encodedStr[i]);
              if (chr === encodedStr[i]) {
                encoded = false;
                startPos = i - 1;
              } else {
                encoded = true;
              }
            } else {
              line += chr;
            }
          }
          if (line) {
            list.push({
              line,
              encoded
            });
          }
        }
        return list.map((item, i2) => ({
          key: key + "*" + i2 + (item.encoded ? "*" : ""),
          value: item.line
        }));
      },
      parseHeaderValue(str) {
        let response = {
          value: false,
          params: {}
        };
        let key = false;
        let value = "";
        let type = "value";
        let quote = false;
        let escaped = false;
        let chr;
        for (let i = 0, len = str.length; i < len; i++) {
          chr = str.charAt(i);
          if (type === "key") {
            if (chr === "=") {
              key = value.trim().toLowerCase();
              type = "value";
              value = "";
              continue;
            }
            value += chr;
          } else {
            if (escaped) {
              value += chr;
            } else if (chr === "\\") {
              escaped = true;
              continue;
            } else if (quote && chr === quote) {
              quote = false;
            } else if (!quote && chr === '"') {
              quote = chr;
            } else if (!quote && chr === ";") {
              if (key === false) {
                response.value = value.trim();
              } else {
                response.params[key] = value.trim();
              }
              type = "key";
              value = "";
            } else {
              value += chr;
            }
            escaped = false;
          }
        }
        if (type === "value") {
          if (key === false) {
            response.value = value.trim();
          } else {
            response.params[key] = value.trim();
          }
        } else if (value.trim()) {
          response.params[value.trim().toLowerCase()] = "";
        }
        Object.keys(response.params).forEach((key2) => {
          let actualKey, nr, match, value2;
          if (match = key2.match(/(\*(\d+)|\*(\d+)\*|\*)$/)) {
            actualKey = key2.substr(0, match.index);
            nr = Number(match[2] || match[3]) || 0;
            if (!response.params[actualKey] || typeof response.params[actualKey] !== "object") {
              response.params[actualKey] = {
                charset: false,
                values: []
              };
            }
            value2 = response.params[key2];
            if (nr === 0 && match[0].substr(-1) === "*" && (match = value2.match(/^([^']*)'[^']*'(.*)$/))) {
              response.params[actualKey].charset = match[1] || "iso-8859-1";
              value2 = match[2];
            }
            response.params[actualKey].values[nr] = value2;
            delete response.params[key2];
          }
        });
        Object.keys(response.params).forEach((key2) => {
          let value2;
          if (response.params[key2] && Array.isArray(response.params[key2].values)) {
            value2 = response.params[key2].values.map((val) => val || "").join("");
            if (response.params[key2].charset) {
              response.params[key2] = "=?" + response.params[key2].charset + "?Q?" + value2.replace(/[=?_\s]/g, (s) => {
                let c = s.charCodeAt(0).toString(16);
                if (s === " ") {
                  return "_";
                } else {
                  return "%" + (c.length < 2 ? "0" : "") + c;
                }
              }).replace(/%/g, "=") + "?=";
            } else {
              response.params[key2] = value2;
            }
          }
        });
        return response;
      },
      detectExtension: (mimeType) => mimeTypes.detectExtension(mimeType),
      detectMimeType: (extension) => mimeTypes.detectMimeType(extension),
      foldLines(str, lineLength, afterSpace) {
        str = (str || "").toString();
        lineLength = lineLength || 76;
        let pos = 0, len = str.length, result = "", line, match;
        while (pos < len) {
          line = str.substr(pos, lineLength);
          if (line.length < lineLength) {
            result += line;
            break;
          }
          if (match = line.match(/^[^\n\r]*(\r?\n|\r)/)) {
            line = match[0];
            result += line;
            pos += line.length;
            continue;
          } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || "").length : 0) < line.length) {
            line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || "").length : 0)));
          } else if (match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/)) {
            line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || "").length : 0));
          }
          result += line;
          pos += line.length;
          if (pos < len) {
            result += "\r\n";
          }
        }
        return result;
      },
      splitMimeEncodedString: (str, maxlen) => {
        let curLine, match, chr, done, lines = [];
        maxlen = Math.max(maxlen || 0, 12);
        while (str.length) {
          curLine = str.substr(0, maxlen);
          if (match = curLine.match(/[=][0-9A-F]?$/i)) {
            curLine = curLine.substr(0, match.index);
          }
          done = false;
          while (!done) {
            done = true;
            if (match = str.substr(curLine.length).match(/^[=]([0-9A-F]{2})/i)) {
              chr = parseInt(match[1], 16);
              if (chr < 194 && chr > 127) {
                curLine = curLine.substr(0, curLine.length - 3);
                done = false;
              }
            }
          }
          if (curLine.length) {
            lines.push(curLine);
          }
          str = str.substr(curLine.length);
        }
        return lines;
      },
      encodeURICharComponent: (chr) => {
        let res = "";
        let ord = chr.charCodeAt(0).toString(16).toUpperCase();
        if (ord.length % 2) {
          ord = "0" + ord;
        }
        if (ord.length > 2) {
          for (let i = 0, len = ord.length / 2; i < len; i++) {
            res += "%" + ord.substr(i, 2);
          }
        } else {
          res += "%" + ord;
        }
        return res;
      },
      safeEncodeURIComponent(str) {
        str = (str || "").toString();
        try {
          str = encodeURIComponent(str);
        } catch (E) {
          return str.replace(/[^\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]+/g, "");
        }
        return str.replace(/[\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]/g, (chr) => this.encodeURICharComponent(chr));
      }
    };
  }
});

// node_modules/nodemailer/lib/addressparser/index.js
var require_addressparser = __commonJS({
  "node_modules/nodemailer/lib/addressparser/index.js"(exports, module2) {
    "use strict";
    function _handleAddress(tokens) {
      let token;
      let isGroup = false;
      let state = "text";
      let address;
      let addresses = [];
      let data = {
        address: [],
        comment: [],
        group: [],
        text: []
      };
      let i;
      let len;
      for (i = 0, len = tokens.length; i < len; i++) {
        token = tokens[i];
        if (token.type === "operator") {
          switch (token.value) {
            case "<":
              state = "address";
              break;
            case "(":
              state = "comment";
              break;
            case ":":
              state = "group";
              isGroup = true;
              break;
            default:
              state = "text";
          }
        } else if (token.value) {
          if (state === "address") {
            token.value = token.value.replace(/^[^<]*<\s*/, "");
          }
          data[state].push(token.value);
        }
      }
      if (!data.text.length && data.comment.length) {
        data.text = data.comment;
        data.comment = [];
      }
      if (isGroup) {
        data.text = data.text.join(" ");
        addresses.push({
          name: data.text || address && address.name,
          group: data.group.length ? addressparser(data.group.join(",")) : []
        });
      } else {
        if (!data.address.length && data.text.length) {
          for (i = data.text.length - 1; i >= 0; i--) {
            if (data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
              data.address = data.text.splice(i, 1);
              break;
            }
          }
          let _regexHandler = function(address2) {
            if (!data.address.length) {
              data.address = [address2.trim()];
              return " ";
            } else {
              return address2;
            }
          };
          if (!data.address.length) {
            for (i = data.text.length - 1; i >= 0; i--) {
              data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, _regexHandler).trim();
              if (data.address.length) {
                break;
              }
            }
          }
        }
        if (!data.text.length && data.comment.length) {
          data.text = data.comment;
          data.comment = [];
        }
        if (data.address.length > 1) {
          data.text = data.text.concat(data.address.splice(1));
        }
        data.text = data.text.join(" ");
        data.address = data.address.join(" ");
        if (!data.address && isGroup) {
          return [];
        } else {
          address = {
            address: data.address || data.text || "",
            name: data.text || data.address || ""
          };
          if (address.address === address.name) {
            if ((address.address || "").match(/@/)) {
              address.name = "";
            } else {
              address.address = "";
            }
          }
          addresses.push(address);
        }
      }
      return addresses;
    }
    var Tokenizer = class {
      constructor(str) {
        this.str = (str || "").toString();
        this.operatorCurrent = "";
        this.operatorExpecting = "";
        this.node = null;
        this.escaped = false;
        this.list = [];
        this.operators = {
          '"': '"',
          "(": ")",
          "<": ">",
          ",": "",
          ":": ";",
          ";": ""
        };
      }
      tokenize() {
        let chr, list = [];
        for (let i = 0, len = this.str.length; i < len; i++) {
          chr = this.str.charAt(i);
          this.checkChar(chr);
        }
        this.list.forEach((node) => {
          node.value = (node.value || "").toString().trim();
          if (node.value) {
            list.push(node);
          }
        });
        return list;
      }
      checkChar(chr) {
        if (this.escaped) {
        } else if (chr === this.operatorExpecting) {
          this.node = {
            type: "operator",
            value: chr
          };
          this.list.push(this.node);
          this.node = null;
          this.operatorExpecting = "";
          this.escaped = false;
          return;
        } else if (!this.operatorExpecting && chr in this.operators) {
          this.node = {
            type: "operator",
            value: chr
          };
          this.list.push(this.node);
          this.node = null;
          this.operatorExpecting = this.operators[chr];
          this.escaped = false;
          return;
        } else if (['"', "'"].includes(this.operatorExpecting) && chr === "\\") {
          this.escaped = true;
          return;
        }
        if (!this.node) {
          this.node = {
            type: "text",
            value: ""
          };
          this.list.push(this.node);
        }
        if (chr === "\n") {
          chr = " ";
        }
        if (chr.charCodeAt(0) >= 33 || [" ", "	"].includes(chr)) {
          this.node.value += chr;
        }
        this.escaped = false;
      }
    };
    function addressparser(str, options) {
      options = options || {};
      let tokenizer = new Tokenizer(str);
      let tokens = tokenizer.tokenize();
      let addresses = [];
      let address = [];
      let parsedAddresses = [];
      tokens.forEach((token) => {
        if (token.type === "operator" && (token.value === "," || token.value === ";")) {
          if (address.length) {
            addresses.push(address);
          }
          address = [];
        } else {
          address.push(token);
        }
      });
      if (address.length) {
        addresses.push(address);
      }
      addresses.forEach((address2) => {
        address2 = _handleAddress(address2);
        if (address2.length) {
          parsedAddresses = parsedAddresses.concat(address2);
        }
      });
      if (options.flatten) {
        let addresses2 = [];
        let walkAddressList = (list) => {
          list.forEach((address2) => {
            if (address2.group) {
              return walkAddressList(address2.group);
            } else {
              addresses2.push(address2);
            }
          });
        };
        walkAddressList(parsedAddresses);
        return addresses2;
      }
      return parsedAddresses;
    }
    module2.exports = addressparser;
  }
});

// node_modules/nodemailer/lib/mime-node/last-newline.js
var require_last_newline = __commonJS({
  "node_modules/nodemailer/lib/mime-node/last-newline.js"(exports, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    var LastNewline = class extends Transform {
      constructor() {
        super();
        this.lastByte = false;
      }
      _transform(chunk, encoding, done) {
        if (chunk.length) {
          this.lastByte = chunk[chunk.length - 1];
        }
        this.push(chunk);
        done();
      }
      _flush(done) {
        if (this.lastByte === 10) {
          return done();
        }
        if (this.lastByte === 13) {
          this.push(Buffer.from("\n"));
          return done();
        }
        this.push(Buffer.from("\r\n"));
        return done();
      }
    };
    module2.exports = LastNewline;
  }
});

// node_modules/nodemailer/lib/mime-node/le-windows.js
var require_le_windows = __commonJS({
  "node_modules/nodemailer/lib/mime-node/le-windows.js"(exports, module2) {
    "use strict";
    var stream = require("stream");
    var Transform = stream.Transform;
    var LeWindows = class extends Transform {
      constructor(options) {
        super(options);
        this.options = options || {};
        this.lastByte = false;
      }
      _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for (let i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 10) {
            if (i && chunk[i - 1] !== 13 || !i && this.lastByte !== 13) {
              if (i > lastPos) {
                buf = chunk.slice(lastPos, i);
                this.push(buf);
              }
              this.push(Buffer.from("\r\n"));
              lastPos = i + 1;
            }
          }
        }
        if (lastPos && lastPos < chunk.length) {
          buf = chunk.slice(lastPos);
          this.push(buf);
        } else if (!lastPos) {
          this.push(chunk);
        }
        this.lastByte = chunk[chunk.length - 1];
        done();
      }
    };
    module2.exports = LeWindows;
  }
});

// node_modules/nodemailer/lib/mime-node/le-unix.js
var require_le_unix = __commonJS({
  "node_modules/nodemailer/lib/mime-node/le-unix.js"(exports, module2) {
    "use strict";
    var stream = require("stream");
    var Transform = stream.Transform;
    var LeWindows = class extends Transform {
      constructor(options) {
        super(options);
        this.options = options || {};
      }
      _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for (let i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 13) {
            buf = chunk.slice(lastPos, i);
            lastPos = i + 1;
            this.push(buf);
          }
        }
        if (lastPos && lastPos < chunk.length) {
          buf = chunk.slice(lastPos);
          this.push(buf);
        } else if (!lastPos) {
          this.push(chunk);
        }
        done();
      }
    };
    module2.exports = LeWindows;
  }
});

// node_modules/nodemailer/lib/mime-node/index.js
var require_mime_node = __commonJS({
  "node_modules/nodemailer/lib/mime-node/index.js"(exports, module2) {
    "use strict";
    var crypto = require("crypto");
    var fs = require("fs");
    var punycode = require("punycode");
    var PassThrough = require("stream").PassThrough;
    var shared = require_shared();
    var mimeFuncs = require_mime_funcs();
    var qp = require_qp();
    var base64 = require_base64();
    var addressparser = require_addressparser();
    var nmfetch = require_fetch();
    var LastNewline = require_last_newline();
    var LeWindows = require_le_windows();
    var LeUnix = require_le_unix();
    var MimeNode = class {
      constructor(contentType, options) {
        this.nodeCounter = 0;
        options = options || {};
        this.baseBoundary = options.baseBoundary || crypto.randomBytes(8).toString("hex");
        this.boundaryPrefix = options.boundaryPrefix || "--_NmP";
        this.disableFileAccess = !!options.disableFileAccess;
        this.disableUrlAccess = !!options.disableUrlAccess;
        this.normalizeHeaderKey = options.normalizeHeaderKey;
        this.date = new Date();
        this.rootNode = options.rootNode || this;
        this.keepBcc = !!options.keepBcc;
        if (options.filename) {
          this.filename = options.filename;
          if (!contentType) {
            contentType = mimeFuncs.detectMimeType(this.filename.split(".").pop());
          }
        }
        this.textEncoding = (options.textEncoding || "").toString().trim().charAt(0).toUpperCase();
        this.parentNode = options.parentNode;
        this.hostname = options.hostname;
        this.newline = options.newline;
        this.childNodes = [];
        this._nodeId = ++this.rootNode.nodeCounter;
        this._headers = [];
        this._isPlainText = false;
        this._hasLongLines = false;
        this._envelope = false;
        this._raw = false;
        this._transforms = [];
        this._processFuncs = [];
        if (contentType) {
          this.setHeader("Content-Type", contentType);
        }
      }
      createChild(contentType, options) {
        if (!options && typeof contentType === "object") {
          options = contentType;
          contentType = void 0;
        }
        let node = new MimeNode(contentType, options);
        this.appendChild(node);
        return node;
      }
      appendChild(childNode) {
        if (childNode.rootNode !== this.rootNode) {
          childNode.rootNode = this.rootNode;
          childNode._nodeId = ++this.rootNode.nodeCounter;
        }
        childNode.parentNode = this;
        this.childNodes.push(childNode);
        return childNode;
      }
      replace(node) {
        if (node === this) {
          return this;
        }
        this.parentNode.childNodes.forEach((childNode, i) => {
          if (childNode === this) {
            node.rootNode = this.rootNode;
            node.parentNode = this.parentNode;
            node._nodeId = this._nodeId;
            this.rootNode = this;
            this.parentNode = void 0;
            node.parentNode.childNodes[i] = node;
          }
        });
        return node;
      }
      remove() {
        if (!this.parentNode) {
          return this;
        }
        for (let i = this.parentNode.childNodes.length - 1; i >= 0; i--) {
          if (this.parentNode.childNodes[i] === this) {
            this.parentNode.childNodes.splice(i, 1);
            this.parentNode = void 0;
            this.rootNode = this;
            return this;
          }
        }
      }
      setHeader(key, value) {
        let added = false, headerValue;
        if (!value && key && typeof key === "object") {
          if (key.key && "value" in key) {
            this.setHeader(key.key, key.value);
          } else if (Array.isArray(key)) {
            key.forEach((i) => {
              this.setHeader(i.key, i.value);
            });
          } else {
            Object.keys(key).forEach((i) => {
              this.setHeader(i, key[i]);
            });
          }
          return this;
        }
        key = this._normalizeHeaderKey(key);
        headerValue = {
          key,
          value
        };
        for (let i = 0, len = this._headers.length; i < len; i++) {
          if (this._headers[i].key === key) {
            if (!added) {
              this._headers[i] = headerValue;
              added = true;
            } else {
              this._headers.splice(i, 1);
              i--;
              len--;
            }
          }
        }
        if (!added) {
          this._headers.push(headerValue);
        }
        return this;
      }
      addHeader(key, value) {
        if (!value && key && typeof key === "object") {
          if (key.key && key.value) {
            this.addHeader(key.key, key.value);
          } else if (Array.isArray(key)) {
            key.forEach((i) => {
              this.addHeader(i.key, i.value);
            });
          } else {
            Object.keys(key).forEach((i) => {
              this.addHeader(i, key[i]);
            });
          }
          return this;
        } else if (Array.isArray(value)) {
          value.forEach((val) => {
            this.addHeader(key, val);
          });
          return this;
        }
        this._headers.push({
          key: this._normalizeHeaderKey(key),
          value
        });
        return this;
      }
      getHeader(key) {
        key = this._normalizeHeaderKey(key);
        for (let i = 0, len = this._headers.length; i < len; i++) {
          if (this._headers[i].key === key) {
            return this._headers[i].value;
          }
        }
      }
      setContent(content) {
        this.content = content;
        if (typeof this.content.pipe === "function") {
          this._contentErrorHandler = (err) => {
            this.content.removeListener("error", this._contentErrorHandler);
            this.content = err;
          };
          this.content.once("error", this._contentErrorHandler);
        } else if (typeof this.content === "string") {
          this._isPlainText = mimeFuncs.isPlainText(this.content);
          if (this._isPlainText && mimeFuncs.hasLongerLines(this.content, 76)) {
            this._hasLongLines = true;
          }
        }
        return this;
      }
      build(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        let stream = this.createReadStream();
        let buf = [];
        let buflen = 0;
        let returned = false;
        stream.on("readable", () => {
          let chunk;
          while ((chunk = stream.read()) !== null) {
            buf.push(chunk);
            buflen += chunk.length;
          }
        });
        stream.once("error", (err) => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(err);
        });
        stream.once("end", (chunk) => {
          if (returned) {
            return;
          }
          returned = true;
          if (chunk && chunk.length) {
            buf.push(chunk);
            buflen += chunk.length;
          }
          return callback(null, Buffer.concat(buf, buflen));
        });
        return promise;
      }
      getTransferEncoding() {
        let transferEncoding = false;
        let contentType = (this.getHeader("Content-Type") || "").toString().toLowerCase().trim();
        if (this.content) {
          transferEncoding = (this.getHeader("Content-Transfer-Encoding") || "").toString().toLowerCase().trim();
          if (!transferEncoding || !["base64", "quoted-printable"].includes(transferEncoding)) {
            if (/^text\//i.test(contentType)) {
              if (this._isPlainText && !this._hasLongLines) {
                transferEncoding = "7bit";
              } else if (typeof this.content === "string" || this.content instanceof Buffer) {
                transferEncoding = this._getTextEncoding(this.content) === "Q" ? "quoted-printable" : "base64";
              } else {
                transferEncoding = this.textEncoding === "B" ? "base64" : "quoted-printable";
              }
            } else if (!/^(multipart|message)\//i.test(contentType)) {
              transferEncoding = transferEncoding || "base64";
            }
          }
        }
        return transferEncoding;
      }
      buildHeaders() {
        let transferEncoding = this.getTransferEncoding();
        let headers = [];
        if (transferEncoding) {
          this.setHeader("Content-Transfer-Encoding", transferEncoding);
        }
        if (this.filename && !this.getHeader("Content-Disposition")) {
          this.setHeader("Content-Disposition", "attachment");
        }
        if (this.rootNode === this) {
          if (!this.getHeader("Date")) {
            this.setHeader("Date", this.date.toUTCString().replace(/GMT/, "+0000"));
          }
          this.messageId();
          if (!this.getHeader("MIME-Version")) {
            this.setHeader("MIME-Version", "1.0");
          }
        }
        this._headers.forEach((header) => {
          let key = header.key;
          let value = header.value;
          let structured;
          let param;
          let options = {};
          let formattedHeaders = ["From", "Sender", "To", "Cc", "Bcc", "Reply-To", "Date", "References"];
          if (value && typeof value === "object" && !formattedHeaders.includes(key)) {
            Object.keys(value).forEach((key2) => {
              if (key2 !== "value") {
                options[key2] = value[key2];
              }
            });
            value = (value.value || "").toString();
            if (!value.trim()) {
              return;
            }
          }
          if (options.prepared) {
            if (options.foldLines) {
              headers.push(mimeFuncs.foldLines(key + ": " + value));
            } else {
              headers.push(key + ": " + value);
            }
            return;
          }
          switch (header.key) {
            case "Content-Disposition":
              structured = mimeFuncs.parseHeaderValue(value);
              if (this.filename) {
                structured.params.filename = this.filename;
              }
              value = mimeFuncs.buildHeaderValue(structured);
              break;
            case "Content-Type":
              structured = mimeFuncs.parseHeaderValue(value);
              this._handleContentType(structured);
              if (structured.value.match(/^text\/plain\b/) && typeof this.content === "string" && /[\u0080-\uFFFF]/.test(this.content)) {
                structured.params.charset = "utf-8";
              }
              value = mimeFuncs.buildHeaderValue(structured);
              if (this.filename) {
                param = this._encodeWords(this.filename);
                if (param !== this.filename || /[\s'"\\;:/=(),<>@[\]?]|^-/.test(param)) {
                  param = '"' + param + '"';
                }
                value += "; name=" + param;
              }
              break;
            case "Bcc":
              if (!this.keepBcc) {
                return;
              }
              break;
          }
          value = this._encodeHeaderValue(key, value);
          if (!(value || "").toString().trim()) {
            return;
          }
          if (typeof this.normalizeHeaderKey === "function") {
            let normalized = this.normalizeHeaderKey(key, value);
            if (normalized && typeof normalized === "string" && normalized.length) {
              key = normalized;
            }
          }
          headers.push(mimeFuncs.foldLines(key + ": " + value, 76));
        });
        return headers.join("\r\n");
      }
      createReadStream(options) {
        options = options || {};
        let stream = new PassThrough(options);
        let outputStream = stream;
        let transform;
        this.stream(stream, options, (err) => {
          if (err) {
            outputStream.emit("error", err);
            return;
          }
          stream.end();
        });
        for (let i = 0, len = this._transforms.length; i < len; i++) {
          transform = typeof this._transforms[i] === "function" ? this._transforms[i]() : this._transforms[i];
          outputStream.once("error", (err) => {
            transform.emit("error", err);
          });
          outputStream = outputStream.pipe(transform);
        }
        transform = new LastNewline();
        outputStream.once("error", (err) => {
          transform.emit("error", err);
        });
        outputStream = outputStream.pipe(transform);
        for (let i = 0, len = this._processFuncs.length; i < len; i++) {
          transform = this._processFuncs[i];
          outputStream = transform(outputStream);
        }
        if (this.newline) {
          const winbreak = ["win", "windows", "dos", "\r\n"].includes(this.newline.toString().toLowerCase());
          const newlineTransform = winbreak ? new LeWindows() : new LeUnix();
          const stream2 = outputStream.pipe(newlineTransform);
          outputStream.on("error", (err) => stream2.emit("error", err));
          return stream2;
        }
        return outputStream;
      }
      transform(transform) {
        this._transforms.push(transform);
      }
      processFunc(processFunc) {
        this._processFuncs.push(processFunc);
      }
      stream(outputStream, options, done) {
        let transferEncoding = this.getTransferEncoding();
        let contentStream;
        let localStream;
        let returned = false;
        let callback = (err) => {
          if (returned) {
            return;
          }
          returned = true;
          done(err);
        };
        let finalize = () => {
          let childId = 0;
          let processChildNode = () => {
            if (childId >= this.childNodes.length) {
              outputStream.write("\r\n--" + this.boundary + "--\r\n");
              return callback();
            }
            let child = this.childNodes[childId++];
            outputStream.write((childId > 1 ? "\r\n" : "") + "--" + this.boundary + "\r\n");
            child.stream(outputStream, options, (err) => {
              if (err) {
                return callback(err);
              }
              setImmediate(processChildNode);
            });
          };
          if (this.multipart) {
            setImmediate(processChildNode);
          } else {
            return callback();
          }
        };
        let sendContent = () => {
          if (this.content) {
            if (Object.prototype.toString.call(this.content) === "[object Error]") {
              return callback(this.content);
            }
            if (typeof this.content.pipe === "function") {
              this.content.removeListener("error", this._contentErrorHandler);
              this._contentErrorHandler = (err) => callback(err);
              this.content.once("error", this._contentErrorHandler);
            }
            let createStream = () => {
              if (["quoted-printable", "base64"].includes(transferEncoding)) {
                contentStream = new (transferEncoding === "base64" ? base64 : qp).Encoder(options);
                contentStream.pipe(outputStream, {
                  end: false
                });
                contentStream.once("end", finalize);
                contentStream.once("error", (err) => callback(err));
                localStream = this._getStream(this.content);
                localStream.pipe(contentStream);
              } else {
                localStream = this._getStream(this.content);
                localStream.pipe(outputStream, {
                  end: false
                });
                localStream.once("end", finalize);
              }
              localStream.once("error", (err) => callback(err));
            };
            if (this.content._resolve) {
              let chunks = [];
              let chunklen = 0;
              let returned2 = false;
              let sourceStream = this._getStream(this.content);
              sourceStream.on("error", (err) => {
                if (returned2) {
                  return;
                }
                returned2 = true;
                callback(err);
              });
              sourceStream.on("readable", () => {
                let chunk;
                while ((chunk = sourceStream.read()) !== null) {
                  chunks.push(chunk);
                  chunklen += chunk.length;
                }
              });
              sourceStream.on("end", () => {
                if (returned2) {
                  return;
                }
                returned2 = true;
                this.content._resolve = false;
                this.content._resolvedValue = Buffer.concat(chunks, chunklen);
                setImmediate(createStream);
              });
            } else {
              setImmediate(createStream);
            }
            return;
          } else {
            return setImmediate(finalize);
          }
        };
        if (this._raw) {
          setImmediate(() => {
            if (Object.prototype.toString.call(this._raw) === "[object Error]") {
              return callback(this._raw);
            }
            if (typeof this._raw.pipe === "function") {
              this._raw.removeListener("error", this._contentErrorHandler);
            }
            let raw = this._getStream(this._raw);
            raw.pipe(outputStream, {
              end: false
            });
            raw.on("error", (err) => outputStream.emit("error", err));
            raw.on("end", finalize);
          });
        } else {
          outputStream.write(this.buildHeaders() + "\r\n\r\n");
          setImmediate(sendContent);
        }
      }
      setEnvelope(envelope) {
        let list;
        this._envelope = {
          from: false,
          to: []
        };
        if (envelope.from) {
          list = [];
          this._convertAddresses(this._parseAddresses(envelope.from), list);
          list = list.filter((address) => address && address.address);
          if (list.length && list[0]) {
            this._envelope.from = list[0].address;
          }
        }
        ["to", "cc", "bcc"].forEach((key) => {
          if (envelope[key]) {
            this._convertAddresses(this._parseAddresses(envelope[key]), this._envelope.to);
          }
        });
        this._envelope.to = this._envelope.to.map((to2) => to2.address).filter((address) => address);
        let standardFields = ["to", "cc", "bcc", "from"];
        Object.keys(envelope).forEach((key) => {
          if (!standardFields.includes(key)) {
            this._envelope[key] = envelope[key];
          }
        });
        return this;
      }
      getAddresses() {
        let addresses = {};
        this._headers.forEach((header) => {
          let key = header.key.toLowerCase();
          if (["from", "sender", "reply-to", "to", "cc", "bcc"].includes(key)) {
            if (!Array.isArray(addresses[key])) {
              addresses[key] = [];
            }
            this._convertAddresses(this._parseAddresses(header.value), addresses[key]);
          }
        });
        return addresses;
      }
      getEnvelope() {
        if (this._envelope) {
          return this._envelope;
        }
        let envelope = {
          from: false,
          to: []
        };
        this._headers.forEach((header) => {
          let list = [];
          if (header.key === "From" || !envelope.from && ["Reply-To", "Sender"].includes(header.key)) {
            this._convertAddresses(this._parseAddresses(header.value), list);
            if (list.length && list[0]) {
              envelope.from = list[0].address;
            }
          } else if (["To", "Cc", "Bcc"].includes(header.key)) {
            this._convertAddresses(this._parseAddresses(header.value), envelope.to);
          }
        });
        envelope.to = envelope.to.map((to2) => to2.address);
        return envelope;
      }
      messageId() {
        let messageId = this.getHeader("Message-ID");
        if (!messageId) {
          messageId = this._generateMessageId();
          this.setHeader("Message-ID", messageId);
        }
        return messageId;
      }
      setRaw(raw) {
        this._raw = raw;
        if (this._raw && typeof this._raw.pipe === "function") {
          this._contentErrorHandler = (err) => {
            this._raw.removeListener("error", this._contentErrorHandler);
            this._raw = err;
          };
          this._raw.once("error", this._contentErrorHandler);
        }
        return this;
      }
      _getStream(content) {
        let contentStream;
        if (content._resolvedValue) {
          contentStream = new PassThrough();
          setImmediate(() => contentStream.end(content._resolvedValue));
          return contentStream;
        } else if (typeof content.pipe === "function") {
          return content;
        } else if (content && typeof content.path === "string" && !content.href) {
          if (this.disableFileAccess) {
            contentStream = new PassThrough();
            setImmediate(() => contentStream.emit("error", new Error("File access rejected for " + content.path)));
            return contentStream;
          }
          return fs.createReadStream(content.path);
        } else if (content && typeof content.href === "string") {
          if (this.disableUrlAccess) {
            contentStream = new PassThrough();
            setImmediate(() => contentStream.emit("error", new Error("Url access rejected for " + content.href)));
            return contentStream;
          }
          return nmfetch(content.href, { headers: content.httpHeaders });
        } else {
          contentStream = new PassThrough();
          setImmediate(() => contentStream.end(content || ""));
          return contentStream;
        }
      }
      _parseAddresses(addresses) {
        return [].concat.apply([], [].concat(addresses).map((address) => {
          if (address && address.address) {
            address.address = this._normalizeAddress(address.address);
            address.name = address.name || "";
            return [address];
          }
          return addressparser(address);
        }));
      }
      _normalizeHeaderKey(key) {
        key = (key || "").toString().replace(/\r?\n|\r/g, " ").trim().toLowerCase().replace(/^X-SMTPAPI$|^(MIME|DKIM|ARC|BIMI)\b|^[a-z]|-(SPF|FBL|ID|MD5)$|-[a-z]/gi, (c) => c.toUpperCase()).replace(/^Content-Features$/i, "Content-features");
        return key;
      }
      _handleContentType(structured) {
        this.contentType = structured.value.trim().toLowerCase();
        this.multipart = /^multipart\//i.test(this.contentType) ? this.contentType.substr(this.contentType.indexOf("/") + 1) : false;
        if (this.multipart) {
          this.boundary = structured.params.boundary = structured.params.boundary || this.boundary || this._generateBoundary();
        } else {
          this.boundary = false;
        }
      }
      _generateBoundary() {
        return this.rootNode.boundaryPrefix + "-" + this.rootNode.baseBoundary + "-Part_" + this._nodeId;
      }
      _encodeHeaderValue(key, value) {
        key = this._normalizeHeaderKey(key);
        switch (key) {
          case "From":
          case "Sender":
          case "To":
          case "Cc":
          case "Bcc":
          case "Reply-To":
            return this._convertAddresses(this._parseAddresses(value));
          case "Message-ID":
          case "In-Reply-To":
          case "Content-Id":
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            if (value.charAt(0) !== "<") {
              value = "<" + value;
            }
            if (value.charAt(value.length - 1) !== ">") {
              value = value + ">";
            }
            return value;
          case "References":
            value = [].concat.apply([], [].concat(value || "").map((elm) => {
              elm = (elm || "").toString().replace(/\r?\n|\r/g, " ").trim();
              return elm.replace(/<[^>]*>/g, (str) => str.replace(/\s/g, "")).split(/\s+/);
            })).map((elm) => {
              if (elm.charAt(0) !== "<") {
                elm = "<" + elm;
              }
              if (elm.charAt(elm.length - 1) !== ">") {
                elm = elm + ">";
              }
              return elm;
            });
            return value.join(" ").trim();
          case "Date":
            if (Object.prototype.toString.call(value) === "[object Date]") {
              return value.toUTCString().replace(/GMT/, "+0000");
            }
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            return this._encodeWords(value);
          case "Content-Type":
          case "Content-Disposition":
            return (value || "").toString().replace(/\r?\n|\r/g, " ");
          default:
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            return this._encodeWords(value);
        }
      }
      _convertAddresses(addresses, uniqueList) {
        let values = [];
        uniqueList = uniqueList || [];
        [].concat(addresses || []).forEach((address) => {
          if (address.address) {
            address.address = this._normalizeAddress(address.address);
            if (!address.name) {
              values.push(address.address.indexOf(" ") >= 0 ? `<${address.address}>` : `${address.address}`);
            } else if (address.name) {
              values.push(`${this._encodeAddressName(address.name)} <${address.address}>`);
            }
            if (address.address) {
              if (!uniqueList.filter((a) => a.address === address.address).length) {
                uniqueList.push(address);
              }
            }
          } else if (address.group) {
            let groupListAddresses = (address.group.length ? this._convertAddresses(address.group, uniqueList) : "").trim();
            values.push(`${this._encodeAddressName(address.name)}:${groupListAddresses};`);
          }
        });
        return values.join(", ");
      }
      _normalizeAddress(address) {
        address = (address || "").toString().replace(/[\x00-\x1F<>]+/g, " ").trim();
        let lastAt = address.lastIndexOf("@");
        if (lastAt < 0) {
          return address;
        }
        let user = address.substr(0, lastAt);
        let domain = address.substr(lastAt + 1);
        let encodedDomain;
        try {
          encodedDomain = punycode.toASCII(domain.toLowerCase());
        } catch (err) {
        }
        if (user.indexOf(" ") >= 0) {
          if (user.charAt(0) !== '"') {
            user = '"' + user;
          }
          if (user.substr(-1) !== '"') {
            user = user + '"';
          }
        }
        return `${user}@${encodedDomain}`;
      }
      _encodeAddressName(name) {
        if (!/^[\w ']*$/.test(name)) {
          if (/^[\x20-\x7e]*$/.test(name)) {
            return '"' + name.replace(/([\\"])/g, "\\$1") + '"';
          } else {
            return mimeFuncs.encodeWord(name, this._getTextEncoding(name), 52);
          }
        }
        return name;
      }
      _encodeWords(value) {
        return mimeFuncs.encodeWords(value, this._getTextEncoding(value), 52, true);
      }
      _getTextEncoding(value) {
        value = (value || "").toString();
        let encoding = this.textEncoding;
        let latinLen;
        let nonLatinLen;
        if (!encoding) {
          nonLatinLen = (value.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\u0080-\uFFFF]/g) || []).length;
          latinLen = (value.match(/[a-z]/gi) || []).length;
          encoding = nonLatinLen < latinLen ? "Q" : "B";
        }
        return encoding;
      }
      _generateMessageId() {
        return "<" + [2, 2, 2, 6].reduce((prev, len) => prev + "-" + crypto.randomBytes(len).toString("hex"), crypto.randomBytes(4).toString("hex")) + "@" + (this.getEnvelope().from || this.hostname || "localhost").split("@").pop() + ">";
      }
    };
    module2.exports = MimeNode;
  }
});

// node_modules/nodemailer/lib/mail-composer/index.js
var require_mail_composer = __commonJS({
  "node_modules/nodemailer/lib/mail-composer/index.js"(exports, module2) {
    "use strict";
    var MimeNode = require_mime_node();
    var mimeFuncs = require_mime_funcs();
    var MailComposer = class {
      constructor(mail) {
        this.mail = mail || {};
        this.message = false;
      }
      compile() {
        this._alternatives = this.getAlternatives();
        this._htmlNode = this._alternatives.filter((alternative) => /^text\/html\b/i.test(alternative.contentType)).pop();
        this._attachments = this.getAttachments(!!this._htmlNode);
        this._useRelated = !!(this._htmlNode && this._attachments.related.length);
        this._useAlternative = this._alternatives.length > 1;
        this._useMixed = this._attachments.attached.length > 1 || this._alternatives.length && this._attachments.attached.length === 1;
        if (this.mail.raw) {
          this.message = new MimeNode("message/rfc822", { newline: this.mail.newline }).setRaw(this.mail.raw);
        } else if (this._useMixed) {
          this.message = this._createMixed();
        } else if (this._useAlternative) {
          this.message = this._createAlternative();
        } else if (this._useRelated) {
          this.message = this._createRelated();
        } else {
          this.message = this._createContentNode(false, [].concat(this._alternatives || []).concat(this._attachments.attached || []).shift() || {
            contentType: "text/plain",
            content: ""
          });
        }
        if (this.mail.headers) {
          this.message.addHeader(this.mail.headers);
        }
        ["from", "sender", "to", "cc", "bcc", "reply-to", "in-reply-to", "references", "subject", "message-id", "date"].forEach((header) => {
          let key = header.replace(/-(\w)/g, (o, c) => c.toUpperCase());
          if (this.mail[key]) {
            this.message.setHeader(header, this.mail[key]);
          }
        });
        if (this.mail.envelope) {
          this.message.setEnvelope(this.mail.envelope);
        }
        this.message.messageId();
        return this.message;
      }
      getAttachments(findRelated) {
        let icalEvent, eventObject;
        let attachments = [].concat(this.mail.attachments || []).map((attachment, i) => {
          let data;
          let isMessageNode = /^message\//i.test(attachment.contentType);
          if (/^data:/i.test(attachment.path || attachment.href)) {
            attachment = this._processDataUrl(attachment);
          }
          data = {
            contentType: attachment.contentType || mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || "bin"),
            contentDisposition: attachment.contentDisposition || (isMessageNode ? "inline" : "attachment"),
            contentTransferEncoding: "contentTransferEncoding" in attachment ? attachment.contentTransferEncoding : "base64"
          };
          if (attachment.filename) {
            data.filename = attachment.filename;
          } else if (!isMessageNode && attachment.filename !== false) {
            data.filename = (attachment.path || attachment.href || "").split("/").pop().split("?").shift() || "attachment-" + (i + 1);
            if (data.filename.indexOf(".") < 0) {
              data.filename += "." + mimeFuncs.detectExtension(data.contentType);
            }
          }
          if (/^https?:\/\//i.test(attachment.path)) {
            attachment.href = attachment.path;
            attachment.path = void 0;
          }
          if (attachment.cid) {
            data.cid = attachment.cid;
          }
          if (attachment.raw) {
            data.raw = attachment.raw;
          } else if (attachment.path) {
            data.content = {
              path: attachment.path
            };
          } else if (attachment.href) {
            data.content = {
              href: attachment.href,
              httpHeaders: attachment.httpHeaders
            };
          } else {
            data.content = attachment.content || "";
          }
          if (attachment.encoding) {
            data.encoding = attachment.encoding;
          }
          if (attachment.headers) {
            data.headers = attachment.headers;
          }
          return data;
        });
        if (this.mail.icalEvent) {
          if (typeof this.mail.icalEvent === "object" && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
            icalEvent = this.mail.icalEvent;
          } else {
            icalEvent = {
              content: this.mail.icalEvent
            };
          }
          eventObject = {};
          Object.keys(icalEvent).forEach((key) => {
            eventObject[key] = icalEvent[key];
          });
          eventObject.contentType = "application/ics";
          if (!eventObject.headers) {
            eventObject.headers = {};
          }
          eventObject.filename = eventObject.filename || "invite.ics";
          eventObject.headers["Content-Disposition"] = "attachment";
          eventObject.headers["Content-Transfer-Encoding"] = "base64";
        }
        if (!findRelated) {
          return {
            attached: attachments.concat(eventObject || []),
            related: []
          };
        } else {
          return {
            attached: attachments.filter((attachment) => !attachment.cid).concat(eventObject || []),
            related: attachments.filter((attachment) => !!attachment.cid)
          };
        }
      }
      getAlternatives() {
        let alternatives = [], text, html, watchHtml, amp, icalEvent, eventObject;
        if (this.mail.text) {
          if (typeof this.mail.text === "object" && (this.mail.text.content || this.mail.text.path || this.mail.text.href || this.mail.text.raw)) {
            text = this.mail.text;
          } else {
            text = {
              content: this.mail.text
            };
          }
          text.contentType = "text/plain; charset=utf-8";
        }
        if (this.mail.watchHtml) {
          if (typeof this.mail.watchHtml === "object" && (this.mail.watchHtml.content || this.mail.watchHtml.path || this.mail.watchHtml.href || this.mail.watchHtml.raw)) {
            watchHtml = this.mail.watchHtml;
          } else {
            watchHtml = {
              content: this.mail.watchHtml
            };
          }
          watchHtml.contentType = "text/watch-html; charset=utf-8";
        }
        if (this.mail.amp) {
          if (typeof this.mail.amp === "object" && (this.mail.amp.content || this.mail.amp.path || this.mail.amp.href || this.mail.amp.raw)) {
            amp = this.mail.amp;
          } else {
            amp = {
              content: this.mail.amp
            };
          }
          amp.contentType = "text/x-amp-html; charset=utf-8";
        }
        if (this.mail.icalEvent) {
          if (typeof this.mail.icalEvent === "object" && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
            icalEvent = this.mail.icalEvent;
          } else {
            icalEvent = {
              content: this.mail.icalEvent
            };
          }
          eventObject = {};
          Object.keys(icalEvent).forEach((key) => {
            eventObject[key] = icalEvent[key];
          });
          if (eventObject.content && typeof eventObject.content === "object") {
            eventObject.content._resolve = true;
          }
          eventObject.filename = false;
          eventObject.contentType = "text/calendar; charset=utf-8; method=" + (eventObject.method || "PUBLISH").toString().trim().toUpperCase();
          if (!eventObject.headers) {
            eventObject.headers = {};
          }
        }
        if (this.mail.html) {
          if (typeof this.mail.html === "object" && (this.mail.html.content || this.mail.html.path || this.mail.html.href || this.mail.html.raw)) {
            html = this.mail.html;
          } else {
            html = {
              content: this.mail.html
            };
          }
          html.contentType = "text/html; charset=utf-8";
        }
        [].concat(text || []).concat(watchHtml || []).concat(amp || []).concat(html || []).concat(eventObject || []).concat(this.mail.alternatives || []).forEach((alternative) => {
          let data;
          if (/^data:/i.test(alternative.path || alternative.href)) {
            alternative = this._processDataUrl(alternative);
          }
          data = {
            contentType: alternative.contentType || mimeFuncs.detectMimeType(alternative.filename || alternative.path || alternative.href || "txt"),
            contentTransferEncoding: alternative.contentTransferEncoding
          };
          if (alternative.filename) {
            data.filename = alternative.filename;
          }
          if (/^https?:\/\//i.test(alternative.path)) {
            alternative.href = alternative.path;
            alternative.path = void 0;
          }
          if (alternative.raw) {
            data.raw = alternative.raw;
          } else if (alternative.path) {
            data.content = {
              path: alternative.path
            };
          } else if (alternative.href) {
            data.content = {
              href: alternative.href
            };
          } else {
            data.content = alternative.content || "";
          }
          if (alternative.encoding) {
            data.encoding = alternative.encoding;
          }
          if (alternative.headers) {
            data.headers = alternative.headers;
          }
          alternatives.push(data);
        });
        return alternatives;
      }
      _createMixed(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode("multipart/mixed", {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild("multipart/mixed", {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        if (this._useAlternative) {
          this._createAlternative(node);
        } else if (this._useRelated) {
          this._createRelated(node);
        }
        [].concat(!this._useAlternative && this._alternatives || []).concat(this._attachments.attached || []).forEach((element) => {
          if (!this._useRelated || element !== this._htmlNode) {
            this._createContentNode(node, element);
          }
        });
        return node;
      }
      _createAlternative(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode("multipart/alternative", {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild("multipart/alternative", {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        this._alternatives.forEach((alternative) => {
          if (this._useRelated && this._htmlNode === alternative) {
            this._createRelated(node);
          } else {
            this._createContentNode(node, alternative);
          }
        });
        return node;
      }
      _createRelated(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode('multipart/related; type="text/html"', {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild('multipart/related; type="text/html"', {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        this._createContentNode(node, this._htmlNode);
        this._attachments.related.forEach((alternative) => this._createContentNode(node, alternative));
        return node;
      }
      _createContentNode(parentNode, element) {
        element = element || {};
        element.content = element.content || "";
        let node;
        let encoding = (element.encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
        if (!parentNode) {
          node = new MimeNode(element.contentType, {
            filename: element.filename,
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild(element.contentType, {
            filename: element.filename,
            textEncoding: this.mail.textEncoding,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        if (element.headers) {
          node.addHeader(element.headers);
        }
        if (element.cid) {
          node.setHeader("Content-Id", "<" + element.cid.replace(/[<>]/g, "") + ">");
        }
        if (element.contentTransferEncoding) {
          node.setHeader("Content-Transfer-Encoding", element.contentTransferEncoding);
        } else if (this.mail.encoding && /^text\//i.test(element.contentType)) {
          node.setHeader("Content-Transfer-Encoding", this.mail.encoding);
        }
        if (!/^text\//i.test(element.contentType) || element.contentDisposition) {
          node.setHeader("Content-Disposition", element.contentDisposition || (element.cid ? "inline" : "attachment"));
        }
        if (typeof element.content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
          element.content = Buffer.from(element.content, encoding);
        }
        if (element.raw) {
          node.setRaw(element.raw);
        } else {
          node.setContent(element.content);
        }
        return node;
      }
      _processDataUrl(element) {
        let parts = (element.path || element.href).match(/^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i);
        if (!parts) {
          return element;
        }
        element.content = /\bbase64$/i.test(parts[1]) ? Buffer.from(parts[2], "base64") : Buffer.from(decodeURIComponent(parts[2]));
        if ("path" in element) {
          element.path = false;
        }
        if ("href" in element) {
          element.href = false;
        }
        parts[1].split(";").forEach((item) => {
          if (/^\w+\/[^/]+$/i.test(item)) {
            element.contentType = element.contentType || item.toLowerCase();
          }
        });
        return element;
      }
    };
    module2.exports = MailComposer;
  }
});

// node_modules/nodemailer/lib/dkim/message-parser.js
var require_message_parser = __commonJS({
  "node_modules/nodemailer/lib/dkim/message-parser.js"(exports, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    var MessageParser = class extends Transform {
      constructor(options) {
        super(options);
        this.lastBytes = Buffer.alloc(4);
        this.headersParsed = false;
        this.headerBytes = 0;
        this.headerChunks = [];
        this.rawHeaders = false;
        this.bodySize = 0;
      }
      updateLastBytes(data) {
        let lblen = this.lastBytes.length;
        let nblen = Math.min(data.length, lblen);
        for (let i = 0, len = lblen - nblen; i < len; i++) {
          this.lastBytes[i] = this.lastBytes[i + nblen];
        }
        for (let i = 1; i <= nblen; i++) {
          this.lastBytes[lblen - i] = data[data.length - i];
        }
      }
      checkHeaders(data) {
        if (this.headersParsed) {
          return true;
        }
        let lblen = this.lastBytes.length;
        let headerPos = 0;
        this.curLinePos = 0;
        for (let i = 0, len = this.lastBytes.length + data.length; i < len; i++) {
          let chr;
          if (i < lblen) {
            chr = this.lastBytes[i];
          } else {
            chr = data[i - lblen];
          }
          if (chr === 10 && i) {
            let pr1 = i - 1 < lblen ? this.lastBytes[i - 1] : data[i - 1 - lblen];
            let pr2 = i > 1 ? i - 2 < lblen ? this.lastBytes[i - 2] : data[i - 2 - lblen] : false;
            if (pr1 === 10) {
              this.headersParsed = true;
              headerPos = i - lblen + 1;
              this.headerBytes += headerPos;
              break;
            } else if (pr1 === 13 && pr2 === 10) {
              this.headersParsed = true;
              headerPos = i - lblen + 1;
              this.headerBytes += headerPos;
              break;
            }
          }
        }
        if (this.headersParsed) {
          this.headerChunks.push(data.slice(0, headerPos));
          this.rawHeaders = Buffer.concat(this.headerChunks, this.headerBytes);
          this.headerChunks = null;
          this.emit("headers", this.parseHeaders());
          if (data.length - 1 > headerPos) {
            let chunk = data.slice(headerPos);
            this.bodySize += chunk.length;
            setImmediate(() => this.push(chunk));
          }
          return false;
        } else {
          this.headerBytes += data.length;
          this.headerChunks.push(data);
        }
        this.updateLastBytes(data);
        return false;
      }
      _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
          return callback();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk, encoding);
        }
        let headersFound;
        try {
          headersFound = this.checkHeaders(chunk);
        } catch (E) {
          return callback(E);
        }
        if (headersFound) {
          this.bodySize += chunk.length;
          this.push(chunk);
        }
        setImmediate(callback);
      }
      _flush(callback) {
        if (this.headerChunks) {
          let chunk = Buffer.concat(this.headerChunks, this.headerBytes);
          this.bodySize += chunk.length;
          this.push(chunk);
          this.headerChunks = null;
        }
        callback();
      }
      parseHeaders() {
        let lines = (this.rawHeaders || "").toString().split(/\r?\n/);
        for (let i = lines.length - 1; i > 0; i--) {
          if (/^\s/.test(lines[i])) {
            lines[i - 1] += "\n" + lines[i];
            lines.splice(i, 1);
          }
        }
        return lines.filter((line) => line.trim()).map((line) => ({
          key: line.substr(0, line.indexOf(":")).trim().toLowerCase(),
          line
        }));
      }
    };
    module2.exports = MessageParser;
  }
});

// node_modules/nodemailer/lib/dkim/relaxed-body.js
var require_relaxed_body = __commonJS({
  "node_modules/nodemailer/lib/dkim/relaxed-body.js"(exports, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    var crypto = require("crypto");
    var RelaxedBody = class extends Transform {
      constructor(options) {
        super();
        options = options || {};
        this.chunkBuffer = [];
        this.chunkBufferLen = 0;
        this.bodyHash = crypto.createHash(options.hashAlgo || "sha1");
        this.remainder = "";
        this.byteLength = 0;
        this.debug = options.debug;
        this._debugBody = options.debug ? [] : false;
      }
      updateHash(chunk) {
        let bodyStr;
        let nextRemainder = "";
        let state = "file";
        for (let i = chunk.length - 1; i >= 0; i--) {
          let c = chunk[i];
          if (state === "file" && (c === 10 || c === 13)) {
          } else if (state === "file" && (c === 9 || c === 32)) {
            state = "line";
          } else if (state === "line" && (c === 9 || c === 32)) {
          } else if (state === "file" || state === "line") {
            state = "body";
            if (i === chunk.length - 1) {
              break;
            }
          }
          if (i === 0) {
            if (state === "file" && (!this.remainder || /[\r\n]$/.test(this.remainder)) || state === "line" && (!this.remainder || /[ \t]$/.test(this.remainder))) {
              this.remainder += chunk.toString("binary");
              return;
            } else if (state === "line" || state === "file") {
              nextRemainder = chunk.toString("binary");
              chunk = false;
              break;
            }
          }
          if (state !== "body") {
            continue;
          }
          nextRemainder = chunk.slice(i + 1).toString("binary");
          chunk = chunk.slice(0, i + 1);
          break;
        }
        let needsFixing = !!this.remainder;
        if (chunk && !needsFixing) {
          for (let i = 0, len = chunk.length; i < len; i++) {
            if (i && chunk[i] === 10 && chunk[i - 1] !== 13) {
              needsFixing = true;
              break;
            } else if (i && chunk[i] === 13 && chunk[i - 1] === 32) {
              needsFixing = true;
              break;
            } else if (i && chunk[i] === 32 && chunk[i - 1] === 32) {
              needsFixing = true;
              break;
            } else if (chunk[i] === 9) {
              needsFixing = true;
              break;
            }
          }
        }
        if (needsFixing) {
          bodyStr = this.remainder + (chunk ? chunk.toString("binary") : "");
          this.remainder = nextRemainder;
          bodyStr = bodyStr.replace(/\r?\n/g, "\n").replace(/[ \t]*$/gm, "").replace(/[ \t]+/gm, " ").replace(/\n/g, "\r\n");
          chunk = Buffer.from(bodyStr, "binary");
        } else if (nextRemainder) {
          this.remainder = nextRemainder;
        }
        if (this.debug) {
          this._debugBody.push(chunk);
        }
        this.bodyHash.update(chunk);
      }
      _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
          return callback();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk, encoding);
        }
        this.updateHash(chunk);
        this.byteLength += chunk.length;
        this.push(chunk);
        callback();
      }
      _flush(callback) {
        if (/[\r\n]$/.test(this.remainder) && this.byteLength > 2) {
          this.bodyHash.update(Buffer.from("\r\n"));
        }
        if (!this.byteLength) {
          this.push(Buffer.from("\r\n"));
        }
        this.emit("hash", this.bodyHash.digest("base64"), this.debug ? Buffer.concat(this._debugBody) : false);
        callback();
      }
    };
    module2.exports = RelaxedBody;
  }
});

// node_modules/nodemailer/lib/dkim/sign.js
var require_sign = __commonJS({
  "node_modules/nodemailer/lib/dkim/sign.js"(exports, module2) {
    "use strict";
    var punycode = require("punycode");
    var mimeFuncs = require_mime_funcs();
    var crypto = require("crypto");
    module2.exports = (headers, hashAlgo, bodyHash, options) => {
      options = options || {};
      let defaultFieldNames = "From:Sender:Reply-To:Subject:Date:Message-ID:To:Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:Content-Description:Resent-Date:Resent-From:Resent-Sender:Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:List-Owner:List-Archive";
      let fieldNames = options.headerFieldNames || defaultFieldNames;
      let canonicalizedHeaderData = relaxedHeaders(headers, fieldNames, options.skipFields);
      let dkimHeader = generateDKIMHeader(options.domainName, options.keySelector, canonicalizedHeaderData.fieldNames, hashAlgo, bodyHash);
      let signer, signature;
      canonicalizedHeaderData.headers += "dkim-signature:" + relaxedHeaderLine(dkimHeader);
      signer = crypto.createSign(("rsa-" + hashAlgo).toUpperCase());
      signer.update(canonicalizedHeaderData.headers);
      try {
        signature = signer.sign(options.privateKey, "base64");
      } catch (E) {
        return false;
      }
      return dkimHeader + signature.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, "$&\r\n ").trim();
    };
    module2.exports.relaxedHeaders = relaxedHeaders;
    function generateDKIMHeader(domainName, keySelector, fieldNames, hashAlgo, bodyHash) {
      let dkim = [
        "v=1",
        "a=rsa-" + hashAlgo,
        "c=relaxed/relaxed",
        "d=" + punycode.toASCII(domainName),
        "q=dns/txt",
        "s=" + keySelector,
        "bh=" + bodyHash,
        "h=" + fieldNames
      ].join("; ");
      return mimeFuncs.foldLines("DKIM-Signature: " + dkim, 76) + ";\r\n b=";
    }
    function relaxedHeaders(headers, fieldNames, skipFields) {
      let includedFields = /* @__PURE__ */ new Set();
      let skip = /* @__PURE__ */ new Set();
      let headerFields = /* @__PURE__ */ new Map();
      (skipFields || "").toLowerCase().split(":").forEach((field) => {
        skip.add(field.trim());
      });
      (fieldNames || "").toLowerCase().split(":").filter((field) => !skip.has(field.trim())).forEach((field) => {
        includedFields.add(field.trim());
      });
      for (let i = headers.length - 1; i >= 0; i--) {
        let line = headers[i];
        if (includedFields.has(line.key) && !headerFields.has(line.key)) {
          headerFields.set(line.key, relaxedHeaderLine(line.line));
        }
      }
      let headersList = [];
      let fields = [];
      includedFields.forEach((field) => {
        if (headerFields.has(field)) {
          fields.push(field);
          headersList.push(field + ":" + headerFields.get(field));
        }
      });
      return {
        headers: headersList.join("\r\n") + "\r\n",
        fieldNames: fields.join(":")
      };
    }
    function relaxedHeaderLine(line) {
      return line.substr(line.indexOf(":") + 1).replace(/\r?\n/g, "").replace(/\s+/g, " ").trim();
    }
  }
});

// node_modules/nodemailer/lib/dkim/index.js
var require_dkim = __commonJS({
  "node_modules/nodemailer/lib/dkim/index.js"(exports, module2) {
    "use strict";
    var MessageParser = require_message_parser();
    var RelaxedBody = require_relaxed_body();
    var sign = require_sign();
    var PassThrough = require("stream").PassThrough;
    var fs = require("fs");
    var path = require("path");
    var crypto = require("crypto");
    var DKIM_ALGO = "sha256";
    var MAX_MESSAGE_SIZE = 128 * 1024;
    var DKIMSigner = class {
      constructor(options, keys, input, output) {
        this.options = options || {};
        this.keys = keys;
        this.cacheTreshold = Number(this.options.cacheTreshold) || MAX_MESSAGE_SIZE;
        this.hashAlgo = this.options.hashAlgo || DKIM_ALGO;
        this.cacheDir = this.options.cacheDir || false;
        this.chunks = [];
        this.chunklen = 0;
        this.readPos = 0;
        this.cachePath = this.cacheDir ? path.join(this.cacheDir, "message." + Date.now() + "-" + crypto.randomBytes(14).toString("hex")) : false;
        this.cache = false;
        this.headers = false;
        this.bodyHash = false;
        this.parser = false;
        this.relaxedBody = false;
        this.input = input;
        this.output = output;
        this.output.usingCache = false;
        this.hasErrored = false;
        this.input.on("error", (err) => {
          this.hasErrored = true;
          this.cleanup();
          output.emit("error", err);
        });
      }
      cleanup() {
        if (!this.cache || !this.cachePath) {
          return;
        }
        fs.unlink(this.cachePath, () => false);
      }
      createReadCache() {
        this.cache = fs.createReadStream(this.cachePath);
        this.cache.once("error", (err) => {
          this.cleanup();
          this.output.emit("error", err);
        });
        this.cache.once("close", () => {
          this.cleanup();
        });
        this.cache.pipe(this.output);
      }
      sendNextChunk() {
        if (this.hasErrored) {
          return;
        }
        if (this.readPos >= this.chunks.length) {
          if (!this.cache) {
            return this.output.end();
          }
          return this.createReadCache();
        }
        let chunk = this.chunks[this.readPos++];
        if (this.output.write(chunk) === false) {
          return this.output.once("drain", () => {
            this.sendNextChunk();
          });
        }
        setImmediate(() => this.sendNextChunk());
      }
      sendSignedOutput() {
        let keyPos = 0;
        let signNextKey = () => {
          if (keyPos >= this.keys.length) {
            this.output.write(this.parser.rawHeaders);
            return setImmediate(() => this.sendNextChunk());
          }
          let key = this.keys[keyPos++];
          let dkimField = sign(this.headers, this.hashAlgo, this.bodyHash, {
            domainName: key.domainName,
            keySelector: key.keySelector,
            privateKey: key.privateKey,
            headerFieldNames: this.options.headerFieldNames,
            skipFields: this.options.skipFields
          });
          if (dkimField) {
            this.output.write(Buffer.from(dkimField + "\r\n"));
          }
          return setImmediate(signNextKey);
        };
        if (this.bodyHash && this.headers) {
          return signNextKey();
        }
        this.output.write(this.parser.rawHeaders);
        this.sendNextChunk();
      }
      createWriteCache() {
        this.output.usingCache = true;
        this.cache = fs.createWriteStream(this.cachePath);
        this.cache.once("error", (err) => {
          this.cleanup();
          this.relaxedBody.unpipe(this.cache);
          this.relaxedBody.on("readable", () => {
            while (this.relaxedBody.read() !== null) {
            }
          });
          this.hasErrored = true;
          this.output.emit("error", err);
        });
        this.cache.once("close", () => {
          this.sendSignedOutput();
        });
        this.relaxedBody.removeAllListeners("readable");
        this.relaxedBody.pipe(this.cache);
      }
      signStream() {
        this.parser = new MessageParser();
        this.relaxedBody = new RelaxedBody({
          hashAlgo: this.hashAlgo
        });
        this.parser.on("headers", (value) => {
          this.headers = value;
        });
        this.relaxedBody.on("hash", (value) => {
          this.bodyHash = value;
        });
        this.relaxedBody.on("readable", () => {
          let chunk;
          if (this.cache) {
            return;
          }
          while ((chunk = this.relaxedBody.read()) !== null) {
            this.chunks.push(chunk);
            this.chunklen += chunk.length;
            if (this.chunklen >= this.cacheTreshold && this.cachePath) {
              return this.createWriteCache();
            }
          }
        });
        this.relaxedBody.on("end", () => {
          if (this.cache) {
            return;
          }
          this.sendSignedOutput();
        });
        this.parser.pipe(this.relaxedBody);
        setImmediate(() => this.input.pipe(this.parser));
      }
    };
    var DKIM = class {
      constructor(options) {
        this.options = options || {};
        this.keys = [].concat(this.options.keys || {
          domainName: options.domainName,
          keySelector: options.keySelector,
          privateKey: options.privateKey
        });
      }
      sign(input, extraOptions) {
        let output = new PassThrough();
        let inputStream = input;
        let writeValue = false;
        if (Buffer.isBuffer(input)) {
          writeValue = input;
          inputStream = new PassThrough();
        } else if (typeof input === "string") {
          writeValue = Buffer.from(input);
          inputStream = new PassThrough();
        }
        let options = this.options;
        if (extraOptions && Object.keys(extraOptions).length) {
          options = {};
          Object.keys(this.options || {}).forEach((key) => {
            options[key] = this.options[key];
          });
          Object.keys(extraOptions || {}).forEach((key) => {
            if (!(key in options)) {
              options[key] = extraOptions[key];
            }
          });
        }
        let signer = new DKIMSigner(options, this.keys, inputStream, output);
        setImmediate(() => {
          signer.signStream();
          if (writeValue) {
            setImmediate(() => {
              inputStream.end(writeValue);
            });
          }
        });
        return output;
      }
    };
    module2.exports = DKIM;
  }
});

// node_modules/nodemailer/lib/smtp-connection/http-proxy-client.js
var require_http_proxy_client = __commonJS({
  "node_modules/nodemailer/lib/smtp-connection/http-proxy-client.js"(exports, module2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var urllib = require("url");
    function httpProxyClient(proxyUrl, destinationPort, destinationHost, callback) {
      let proxy = urllib.parse(proxyUrl);
      let options;
      let connect;
      let socket;
      options = {
        host: proxy.hostname,
        port: Number(proxy.port) ? Number(proxy.port) : proxy.protocol === "https:" ? 443 : 80
      };
      if (proxy.protocol === "https:") {
        options.rejectUnauthorized = false;
        connect = tls.connect.bind(tls);
      } else {
        connect = net.connect.bind(net);
      }
      let finished = false;
      let tempSocketErr = (err) => {
        if (finished) {
          return;
        }
        finished = true;
        try {
          socket.destroy();
        } catch (E) {
        }
        callback(err);
      };
      let timeoutErr = () => {
        let err = new Error("Proxy socket timed out");
        err.code = "ETIMEDOUT";
        tempSocketErr(err);
      };
      socket = connect(options, () => {
        if (finished) {
          return;
        }
        let reqHeaders = {
          Host: destinationHost + ":" + destinationPort,
          Connection: "close"
        };
        if (proxy.auth) {
          reqHeaders["Proxy-Authorization"] = "Basic " + Buffer.from(proxy.auth).toString("base64");
        }
        socket.write("CONNECT " + destinationHost + ":" + destinationPort + " HTTP/1.1\r\n" + Object.keys(reqHeaders).map((key) => key + ": " + reqHeaders[key]).join("\r\n") + "\r\n\r\n");
        let headers = "";
        let onSocketData = (chunk) => {
          let match;
          let remainder;
          if (finished) {
            return;
          }
          headers += chunk.toString("binary");
          if (match = headers.match(/\r\n\r\n/)) {
            socket.removeListener("data", onSocketData);
            remainder = headers.substr(match.index + match[0].length);
            headers = headers.substr(0, match.index);
            if (remainder) {
              socket.unshift(Buffer.from(remainder, "binary"));
            }
            finished = true;
            match = headers.match(/^HTTP\/\d+\.\d+ (\d+)/i);
            if (!match || (match[1] || "").charAt(0) !== "2") {
              try {
                socket.destroy();
              } catch (E) {
              }
              return callback(new Error("Invalid response from proxy" + (match && ": " + match[1] || "")));
            }
            socket.removeListener("error", tempSocketErr);
            socket.removeListener("timeout", timeoutErr);
            socket.setTimeout(0);
            return callback(null, socket);
          }
        };
        socket.on("data", onSocketData);
      });
      socket.setTimeout(httpProxyClient.timeout || 30 * 1e3);
      socket.on("timeout", timeoutErr);
      socket.once("error", tempSocketErr);
    }
    module2.exports = httpProxyClient;
  }
});

// node_modules/nodemailer/lib/mailer/mail-message.js
var require_mail_message = __commonJS({
  "node_modules/nodemailer/lib/mailer/mail-message.js"(exports, module2) {
    "use strict";
    var shared = require_shared();
    var MimeNode = require_mime_node();
    var mimeFuncs = require_mime_funcs();
    var MailMessage = class {
      constructor(mailer, data) {
        this.mailer = mailer;
        this.data = {};
        this.message = null;
        data = data || {};
        let options = mailer.options || {};
        let defaults = mailer._defaults || {};
        Object.keys(data).forEach((key) => {
          this.data[key] = data[key];
        });
        this.data.headers = this.data.headers || {};
        Object.keys(defaults).forEach((key) => {
          if (!(key in this.data)) {
            this.data[key] = defaults[key];
          } else if (key === "headers") {
            Object.keys(defaults.headers).forEach((key2) => {
              if (!(key2 in this.data.headers)) {
                this.data.headers[key2] = defaults.headers[key2];
              }
            });
          }
        });
        ["disableFileAccess", "disableUrlAccess", "normalizeHeaderKey"].forEach((key) => {
          if (key in options) {
            this.data[key] = options[key];
          }
        });
      }
      resolveContent(...args) {
        return shared.resolveContent(...args);
      }
      resolveAll(callback) {
        let keys = [
          [this.data, "html"],
          [this.data, "text"],
          [this.data, "watchHtml"],
          [this.data, "amp"],
          [this.data, "icalEvent"]
        ];
        if (this.data.alternatives && this.data.alternatives.length) {
          this.data.alternatives.forEach((alternative, i) => {
            keys.push([this.data.alternatives, i]);
          });
        }
        if (this.data.attachments && this.data.attachments.length) {
          this.data.attachments.forEach((attachment, i) => {
            if (!attachment.filename) {
              attachment.filename = (attachment.path || attachment.href || "").split("/").pop().split("?").shift() || "attachment-" + (i + 1);
              if (attachment.filename.indexOf(".") < 0) {
                attachment.filename += "." + mimeFuncs.detectExtension(attachment.contentType);
              }
            }
            if (!attachment.contentType) {
              attachment.contentType = mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || "bin");
            }
            keys.push([this.data.attachments, i]);
          });
        }
        let mimeNode = new MimeNode();
        let addressKeys = ["from", "to", "cc", "bcc", "sender", "replyTo"];
        addressKeys.forEach((address) => {
          let value;
          if (this.message) {
            value = [].concat(mimeNode._parseAddresses(this.message.getHeader(address === "replyTo" ? "reply-to" : address)) || []);
          } else if (this.data[address]) {
            value = [].concat(mimeNode._parseAddresses(this.data[address]) || []);
          }
          if (value && value.length) {
            this.data[address] = value;
          } else if (address in this.data) {
            this.data[address] = null;
          }
        });
        let singleKeys = ["from", "sender", "replyTo"];
        singleKeys.forEach((address) => {
          if (this.data[address]) {
            this.data[address] = this.data[address].shift();
          }
        });
        let pos = 0;
        let resolveNext = () => {
          if (pos >= keys.length) {
            return callback(null, this.data);
          }
          let args = keys[pos++];
          if (!args[0] || !args[0][args[1]]) {
            return resolveNext();
          }
          shared.resolveContent(...args, (err, value) => {
            if (err) {
              return callback(err);
            }
            let node = {
              content: value
            };
            if (args[0][args[1]] && typeof args[0][args[1]] === "object" && !Buffer.isBuffer(args[0][args[1]])) {
              Object.keys(args[0][args[1]]).forEach((key) => {
                if (!(key in node) && !["content", "path", "href", "raw"].includes(key)) {
                  node[key] = args[0][args[1]][key];
                }
              });
            }
            args[0][args[1]] = node;
            resolveNext();
          });
        };
        setImmediate(() => resolveNext());
      }
      normalize(callback) {
        let envelope = this.data.envelope || this.message.getEnvelope();
        let messageId = this.message.messageId();
        this.resolveAll((err, data) => {
          if (err) {
            return callback(err);
          }
          data.envelope = envelope;
          data.messageId = messageId;
          ["html", "text", "watchHtml", "amp"].forEach((key) => {
            if (data[key] && data[key].content) {
              if (typeof data[key].content === "string") {
                data[key] = data[key].content;
              } else if (Buffer.isBuffer(data[key].content)) {
                data[key] = data[key].content.toString();
              }
            }
          });
          if (data.icalEvent && Buffer.isBuffer(data.icalEvent.content)) {
            data.icalEvent.content = data.icalEvent.content.toString("base64");
            data.icalEvent.encoding = "base64";
          }
          if (data.alternatives && data.alternatives.length) {
            data.alternatives.forEach((alternative) => {
              if (alternative && alternative.content && Buffer.isBuffer(alternative.content)) {
                alternative.content = alternative.content.toString("base64");
                alternative.encoding = "base64";
              }
            });
          }
          if (data.attachments && data.attachments.length) {
            data.attachments.forEach((attachment) => {
              if (attachment && attachment.content && Buffer.isBuffer(attachment.content)) {
                attachment.content = attachment.content.toString("base64");
                attachment.encoding = "base64";
              }
            });
          }
          data.normalizedHeaders = {};
          Object.keys(data.headers || {}).forEach((key) => {
            let value = [].concat(data.headers[key] || []).shift();
            value = value && value.value || value;
            if (value) {
              if (["references", "in-reply-to", "message-id", "content-id"].includes(key)) {
                value = this.message._encodeHeaderValue(key, value);
              }
              data.normalizedHeaders[key] = value;
            }
          });
          if (data.list && typeof data.list === "object") {
            let listHeaders = this._getListHeaders(data.list);
            listHeaders.forEach((entry) => {
              data.normalizedHeaders[entry.key] = entry.value.map((val) => val && val.value || val).join(", ");
            });
          }
          if (data.references) {
            data.normalizedHeaders.references = this.message._encodeHeaderValue("references", data.references);
          }
          if (data.inReplyTo) {
            data.normalizedHeaders["in-reply-to"] = this.message._encodeHeaderValue("in-reply-to", data.inReplyTo);
          }
          return callback(null, data);
        });
      }
      setMailerHeader() {
        if (!this.message || !this.data.xMailer) {
          return;
        }
        this.message.setHeader("X-Mailer", this.data.xMailer);
      }
      setPriorityHeaders() {
        if (!this.message || !this.data.priority) {
          return;
        }
        switch ((this.data.priority || "").toString().toLowerCase()) {
          case "high":
            this.message.setHeader("X-Priority", "1 (Highest)");
            this.message.setHeader("X-MSMail-Priority", "High");
            this.message.setHeader("Importance", "High");
            break;
          case "low":
            this.message.setHeader("X-Priority", "5 (Lowest)");
            this.message.setHeader("X-MSMail-Priority", "Low");
            this.message.setHeader("Importance", "Low");
            break;
          default:
        }
      }
      setListHeaders() {
        if (!this.message || !this.data.list || typeof this.data.list !== "object") {
          return;
        }
        if (this.data.list && typeof this.data.list === "object") {
          this._getListHeaders(this.data.list).forEach((listHeader) => {
            listHeader.value.forEach((value) => {
              this.message.addHeader(listHeader.key, value);
            });
          });
        }
      }
      _getListHeaders(listData) {
        return Object.keys(listData).map((key) => ({
          key: "list-" + key.toLowerCase().trim(),
          value: [].concat(listData[key] || []).map((value) => ({
            prepared: true,
            foldLines: true,
            value: [].concat(value || []).map((value2) => {
              if (typeof value2 === "string") {
                value2 = {
                  url: value2
                };
              }
              if (value2 && value2.url) {
                if (key.toLowerCase().trim() === "id") {
                  let comment2 = value2.comment || "";
                  if (mimeFuncs.isPlainText(comment2)) {
                    comment2 = '"' + comment2 + '"';
                  } else {
                    comment2 = mimeFuncs.encodeWord(comment2);
                  }
                  return (value2.comment ? comment2 + " " : "") + this._formatListUrl(value2.url).replace(/^<[^:]+\/{,2}/, "");
                }
                let comment = value2.comment || "";
                if (!mimeFuncs.isPlainText(comment)) {
                  comment = mimeFuncs.encodeWord(comment);
                }
                return this._formatListUrl(value2.url) + (value2.comment ? " (" + comment + ")" : "");
              }
              return "";
            }).filter((value2) => value2).join(", ")
          }))
        }));
      }
      _formatListUrl(url) {
        url = url.replace(/[\s<]+|[\s>]+/g, "");
        if (/^(https?|mailto|ftp):/.test(url)) {
          return "<" + url + ">";
        }
        if (/^[^@]+@[^@]+$/.test(url)) {
          return "<mailto:" + url + ">";
        }
        return "<http://" + url + ">";
      }
    };
    module2.exports = MailMessage;
  }
});

// node_modules/nodemailer/lib/mailer/index.js
var require_mailer = __commonJS({
  "node_modules/nodemailer/lib/mailer/index.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var shared = require_shared();
    var mimeTypes = require_mime_types2();
    var MailComposer = require_mail_composer();
    var DKIM = require_dkim();
    var httpProxyClient = require_http_proxy_client();
    var util = require("util");
    var urllib = require("url");
    var packageData = require_package();
    var MailMessage = require_mail_message();
    var net = require("net");
    var dns = require("dns");
    var crypto = require("crypto");
    var Mail = class extends EventEmitter {
      constructor(transporter, options, defaults) {
        super();
        this.options = options || {};
        this._defaults = defaults || {};
        this._defaultPlugins = {
          compile: [(...args) => this._convertDataImages(...args)],
          stream: []
        };
        this._userPlugins = {
          compile: [],
          stream: []
        };
        this.meta = /* @__PURE__ */ new Map();
        this.dkim = this.options.dkim ? new DKIM(this.options.dkim) : false;
        this.transporter = transporter;
        this.transporter.mailer = this;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "mail"
        });
        this.logger.debug({
          tnx: "create"
        }, "Creating transport: %s", this.getVersionString());
        if (typeof this.transporter.on === "function") {
          this.transporter.on("log", (log) => {
            this.logger.debug({
              tnx: "transport"
            }, "%s: %s", log.type, log.message);
          });
          this.transporter.on("error", (err) => {
            this.logger.error({
              err,
              tnx: "transport"
            }, "Transport Error: %s", err.message);
            this.emit("error", err);
          });
          this.transporter.on("idle", (...args) => {
            this.emit("idle", ...args);
          });
        }
        ["close", "isIdle", "verify"].forEach((method) => {
          this[method] = (...args) => {
            if (typeof this.transporter[method] === "function") {
              if (method === "verify" && typeof this.getSocket === "function") {
                this.transporter.getSocket = this.getSocket;
                this.getSocket = false;
              }
              return this.transporter[method](...args);
            } else {
              this.logger.warn({
                tnx: "transport",
                methodName: method
              }, "Non existing method %s called for transport", method);
              return false;
            }
          };
        });
        if (this.options.proxy && typeof this.options.proxy === "string") {
          this.setupProxy(this.options.proxy);
        }
      }
      use(step, plugin) {
        step = (step || "").toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
          this._userPlugins[step] = [plugin];
        } else {
          this._userPlugins[step].push(plugin);
        }
        return this;
      }
      sendMail(data, callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        if (typeof this.getSocket === "function") {
          this.transporter.getSocket = this.getSocket;
          this.getSocket = false;
        }
        let mail = new MailMessage(this, data);
        this.logger.debug({
          tnx: "transport",
          name: this.transporter.name,
          version: this.transporter.version,
          action: "send"
        }, "Sending mail using %s/%s", this.transporter.name, this.transporter.version);
        this._processPlugins("compile", mail, (err) => {
          if (err) {
            this.logger.error({
              err,
              tnx: "plugin",
              action: "compile"
            }, "PluginCompile Error: %s", err.message);
            return callback(err);
          }
          mail.message = new MailComposer(mail.data).compile();
          mail.setMailerHeader();
          mail.setPriorityHeaders();
          mail.setListHeaders();
          this._processPlugins("stream", mail, (err2) => {
            if (err2) {
              this.logger.error({
                err: err2,
                tnx: "plugin",
                action: "stream"
              }, "PluginStream Error: %s", err2.message);
              return callback(err2);
            }
            if (mail.data.dkim || this.dkim) {
              mail.message.processFunc((input) => {
                let dkim = mail.data.dkim ? new DKIM(mail.data.dkim) : this.dkim;
                this.logger.debug({
                  tnx: "DKIM",
                  messageId: mail.message.messageId(),
                  dkimDomains: dkim.keys.map((key) => key.keySelector + "." + key.domainName).join(", ")
                }, "Signing outgoing message with %s keys", dkim.keys.length);
                return dkim.sign(input, mail.data._dkim);
              });
            }
            this.transporter.send(mail, (...args) => {
              if (args[0]) {
                this.logger.error({
                  err: args[0],
                  tnx: "transport",
                  action: "send"
                }, "Send Error: %s", args[0].message);
              }
              callback(...args);
            });
          });
        });
        return promise;
      }
      getVersionString() {
        return util.format("%s (%s; +%s; %s/%s)", packageData.name, packageData.version, packageData.homepage, this.transporter.name, this.transporter.version);
      }
      _processPlugins(step, mail, callback) {
        step = (step || "").toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
          return callback();
        }
        let userPlugins = this._userPlugins[step] || [];
        let defaultPlugins = this._defaultPlugins[step] || [];
        if (userPlugins.length) {
          this.logger.debug({
            tnx: "transaction",
            pluginCount: userPlugins.length,
            step
          }, "Using %s plugins for %s", userPlugins.length, step);
        }
        if (userPlugins.length + defaultPlugins.length === 0) {
          return callback();
        }
        let pos = 0;
        let block = "default";
        let processPlugins = () => {
          let curplugins = block === "default" ? defaultPlugins : userPlugins;
          if (pos >= curplugins.length) {
            if (block === "default" && userPlugins.length) {
              block = "user";
              pos = 0;
              curplugins = userPlugins;
            } else {
              return callback();
            }
          }
          let plugin = curplugins[pos++];
          plugin(mail, (err) => {
            if (err) {
              return callback(err);
            }
            processPlugins();
          });
        };
        processPlugins();
      }
      setupProxy(proxyUrl) {
        let proxy = urllib.parse(proxyUrl);
        this.getSocket = (options, callback) => {
          let protocol = proxy.protocol.replace(/:$/, "").toLowerCase();
          if (this.meta.has("proxy_handler_" + protocol)) {
            return this.meta.get("proxy_handler_" + protocol)(proxy, options, callback);
          }
          switch (protocol) {
            case "http":
            case "https":
              httpProxyClient(proxy.href, options.port, options.host, (err, socket) => {
                if (err) {
                  return callback(err);
                }
                return callback(null, {
                  connection: socket
                });
              });
              return;
            case "socks":
            case "socks5":
            case "socks4":
            case "socks4a": {
              if (!this.meta.has("proxy_socks_module")) {
                return callback(new Error("Socks module not loaded"));
              }
              let connect = (ipaddress) => {
                let proxyV2 = !!this.meta.get("proxy_socks_module").SocksClient;
                let socksClient = proxyV2 ? this.meta.get("proxy_socks_module").SocksClient : this.meta.get("proxy_socks_module");
                let proxyType = Number(proxy.protocol.replace(/\D/g, "")) || 5;
                let connectionOpts = {
                  proxy: {
                    ipaddress,
                    port: Number(proxy.port),
                    type: proxyType
                  },
                  [proxyV2 ? "destination" : "target"]: {
                    host: options.host,
                    port: options.port
                  },
                  command: "connect"
                };
                if (proxy.auth) {
                  let username = decodeURIComponent(proxy.auth.split(":").shift());
                  let password = decodeURIComponent(proxy.auth.split(":").pop());
                  if (proxyV2) {
                    connectionOpts.proxy.userId = username;
                    connectionOpts.proxy.password = password;
                  } else if (proxyType === 4) {
                    connectionOpts.userid = username;
                  } else {
                    connectionOpts.authentication = {
                      username,
                      password
                    };
                  }
                }
                socksClient.createConnection(connectionOpts, (err, info) => {
                  if (err) {
                    return callback(err);
                  }
                  return callback(null, {
                    connection: info.socket || info
                  });
                });
              };
              if (net.isIP(proxy.hostname)) {
                return connect(proxy.hostname);
              }
              return dns.resolve(proxy.hostname, (err, address) => {
                if (err) {
                  return callback(err);
                }
                connect(Array.isArray(address) ? address[0] : address);
              });
            }
          }
          callback(new Error("Unknown proxy configuration"));
        };
      }
      _convertDataImages(mail, callback) {
        if (!this.options.attachDataUrls && !mail.data.attachDataUrls || !mail.data.html) {
          return callback();
        }
        mail.resolveContent(mail.data, "html", (err, html) => {
          if (err) {
            return callback(err);
          }
          let cidCounter = 0;
          html = (html || "").toString().replace(/(<img\b[^>]* src\s*=[\s"']*)(data:([^;]+);[^"'>\s]+)/gi, (match, prefix, dataUri, mimeType) => {
            let cid = crypto.randomBytes(10).toString("hex") + "@localhost";
            if (!mail.data.attachments) {
              mail.data.attachments = [];
            }
            if (!Array.isArray(mail.data.attachments)) {
              mail.data.attachments = [].concat(mail.data.attachments || []);
            }
            mail.data.attachments.push({
              path: dataUri,
              cid,
              filename: "image-" + ++cidCounter + "." + mimeTypes.detectExtension(mimeType)
            });
            return prefix + "cid:" + cid;
          });
          mail.data.html = html;
          callback();
        });
      }
      set(key, value) {
        return this.meta.set(key, value);
      }
      get(key) {
        return this.meta.get(key);
      }
    };
    module2.exports = Mail;
  }
});

// node_modules/nodemailer/lib/smtp-connection/data-stream.js
var require_data_stream = __commonJS({
  "node_modules/nodemailer/lib/smtp-connection/data-stream.js"(exports, module2) {
    "use strict";
    var stream = require("stream");
    var Transform = stream.Transform;
    var DataStream = class extends Transform {
      constructor(options) {
        super(options);
        this.options = options || {};
        this._curLine = "";
        this.inByteCount = 0;
        this.outByteCount = 0;
        this.lastByte = false;
      }
      _transform(chunk, encoding, done) {
        let chunks = [];
        let chunklen = 0;
        let i, len, lastPos = 0;
        let buf;
        if (!chunk || !chunk.length) {
          return done();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk);
        }
        this.inByteCount += chunk.length;
        for (i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 46) {
            if (i && chunk[i - 1] === 10 || !i && (!this.lastByte || this.lastByte === 10)) {
              buf = chunk.slice(lastPos, i + 1);
              chunks.push(buf);
              chunks.push(Buffer.from("."));
              chunklen += buf.length + 1;
              lastPos = i + 1;
            }
          } else if (chunk[i] === 10) {
            if (i && chunk[i - 1] !== 13 || !i && this.lastByte !== 13) {
              if (i > lastPos) {
                buf = chunk.slice(lastPos, i);
                chunks.push(buf);
                chunklen += buf.length + 2;
              } else {
                chunklen += 2;
              }
              chunks.push(Buffer.from("\r\n"));
              lastPos = i + 1;
            }
          }
        }
        if (chunklen) {
          if (lastPos < chunk.length) {
            buf = chunk.slice(lastPos);
            chunks.push(buf);
            chunklen += buf.length;
          }
          this.outByteCount += chunklen;
          this.push(Buffer.concat(chunks, chunklen));
        } else {
          this.outByteCount += chunk.length;
          this.push(chunk);
        }
        this.lastByte = chunk[chunk.length - 1];
        done();
      }
      _flush(done) {
        let buf;
        if (this.lastByte === 10) {
          buf = Buffer.from(".\r\n");
        } else if (this.lastByte === 13) {
          buf = Buffer.from("\n.\r\n");
        } else {
          buf = Buffer.from("\r\n.\r\n");
        }
        this.outByteCount += buf.length;
        this.push(buf);
        done();
      }
    };
    module2.exports = DataStream;
  }
});

// node_modules/nodemailer/lib/smtp-connection/index.js
var require_smtp_connection = __commonJS({
  "node_modules/nodemailer/lib/smtp-connection/index.js"(exports, module2) {
    "use strict";
    var packageInfo = require_package();
    var EventEmitter = require("events").EventEmitter;
    var net = require("net");
    var tls = require("tls");
    var os = require("os");
    var crypto = require("crypto");
    var DataStream = require_data_stream();
    var PassThrough = require("stream").PassThrough;
    var shared = require_shared();
    var CONNECTION_TIMEOUT = 2 * 60 * 1e3;
    var SOCKET_TIMEOUT = 10 * 60 * 1e3;
    var GREETING_TIMEOUT = 30 * 1e3;
    var SMTPConnection = class extends EventEmitter {
      constructor(options) {
        super(options);
        this.id = crypto.randomBytes(8).toString("base64").replace(/\W/g, "");
        this.stage = "init";
        this.options = options || {};
        this.secureConnection = !!this.options.secure;
        this.alreadySecured = !!this.options.secured;
        this.port = Number(this.options.port) || (this.secureConnection ? 465 : 587);
        this.host = this.options.host || "localhost";
        this.allowInternalNetworkInterfaces = this.options.allowInternalNetworkInterfaces || false;
        if (typeof this.options.secure === "undefined" && this.port === 465) {
          this.secureConnection = true;
        }
        this.name = this.options.name || this._getHostname();
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-connection",
          sid: this.id
        });
        this.customAuth = /* @__PURE__ */ new Map();
        Object.keys(this.options.customAuth || {}).forEach((key) => {
          let mapKey = (key || "").toString().trim().toUpperCase();
          if (!mapKey) {
            return;
          }
          this.customAuth.set(mapKey, this.options.customAuth[key]);
        });
        this.version = packageInfo.version;
        this.authenticated = false;
        this.destroyed = false;
        this.secure = !!this.secureConnection;
        this._remainder = "";
        this._responseQueue = [];
        this.lastServerResponse = false;
        this._socket = false;
        this._supportedAuth = [];
        this.allowsAuth = false;
        this._envelope = false;
        this._supportedExtensions = [];
        this._maxAllowedSize = 0;
        this._responseActions = [];
        this._recipientQueue = [];
        this._greetingTimeout = false;
        this._connectionTimeout = false;
        this._destroyed = false;
        this._closing = false;
        this._onSocketData = (chunk) => this._onData(chunk);
        this._onSocketError = (error) => this._onError(error, "ESOCKET", false, "CONN");
        this._onSocketClose = () => this._onClose();
        this._onSocketEnd = () => this._onEnd();
        this._onSocketTimeout = () => this._onTimeout();
      }
      connect(connectCallback) {
        if (typeof connectCallback === "function") {
          this.once("connect", () => {
            this.logger.debug({
              tnx: "smtp"
            }, "SMTP handshake finished");
            connectCallback();
          });
          const isDestroyedMessage = this._isDestroyedMessage("connect");
          if (isDestroyedMessage) {
            return connectCallback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "CONN"));
          }
        }
        let opts = {
          port: this.port,
          host: this.host,
          allowInternalNetworkInterfaces: this.allowInternalNetworkInterfaces
        };
        if (this.options.localAddress) {
          opts.localAddress = this.options.localAddress;
        }
        let setupConnectionHandlers = () => {
          this._connectionTimeout = setTimeout(() => {
            this._onError("Connection timeout", "ETIMEDOUT", false, "CONN");
          }, this.options.connectionTimeout || CONNECTION_TIMEOUT);
          this._socket.on("error", this._onSocketError);
        };
        if (this.options.connection) {
          this._socket = this.options.connection;
          if (this.secureConnection && !this.alreadySecured) {
            setImmediate(() => this._upgradeConnection((err) => {
              if (err) {
                this._onError(new Error("Error initiating TLS - " + (err.message || err)), "ETLS", false, "CONN");
                return;
              }
              this._onConnect();
            }));
          } else {
            setImmediate(() => this._onConnect());
          }
          return;
        } else if (this.options.socket) {
          this._socket = this.options.socket;
          return shared.resolveHostname(opts, (err, resolved) => {
            if (err) {
              return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
            }
            this.logger.debug({
              tnx: "dns",
              source: opts.host,
              resolved: resolved.host,
              cached: !!resolved.cached
            }, "Resolved %s as %s [cache %s]", opts.host, resolved.host, resolved.cached ? "hit" : "miss");
            Object.keys(resolved).forEach((key) => {
              if (key.charAt(0) !== "_" && resolved[key]) {
                opts[key] = resolved[key];
              }
            });
            try {
              this._socket.connect(this.port, this.host, () => {
                this._socket.setKeepAlive(true);
                this._onConnect();
              });
              setupConnectionHandlers();
            } catch (E) {
              return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
            }
          });
        } else if (this.secureConnection) {
          if (this.options.tls) {
            Object.keys(this.options.tls).forEach((key) => {
              opts[key] = this.options.tls[key];
            });
          }
          return shared.resolveHostname(opts, (err, resolved) => {
            if (err) {
              return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
            }
            this.logger.debug({
              tnx: "dns",
              source: opts.host,
              resolved: resolved.host,
              cached: !!resolved.cached
            }, "Resolved %s as %s [cache %s]", opts.host, resolved.host, resolved.cached ? "hit" : "miss");
            Object.keys(resolved).forEach((key) => {
              if (key.charAt(0) !== "_" && resolved[key]) {
                opts[key] = resolved[key];
              }
            });
            try {
              this._socket = tls.connect(opts, () => {
                this._socket.setKeepAlive(true);
                this._onConnect();
              });
              setupConnectionHandlers();
            } catch (E) {
              return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
            }
          });
        } else {
          return shared.resolveHostname(opts, (err, resolved) => {
            if (err) {
              return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
            }
            this.logger.debug({
              tnx: "dns",
              source: opts.host,
              resolved: resolved.host,
              cached: !!resolved.cached
            }, "Resolved %s as %s [cache %s]", opts.host, resolved.host, resolved.cached ? "hit" : "miss");
            Object.keys(resolved).forEach((key) => {
              if (key.charAt(0) !== "_" && resolved[key]) {
                opts[key] = resolved[key];
              }
            });
            try {
              this._socket = net.connect(opts, () => {
                this._socket.setKeepAlive(true);
                this._onConnect();
              });
              setupConnectionHandlers();
            } catch (E) {
              return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
            }
          });
        }
      }
      quit() {
        this._sendCommand("QUIT");
        this._responseActions.push(this.close);
      }
      close() {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);
        this._responseActions = [];
        if (this._closing) {
          return;
        }
        this._closing = true;
        let closeMethod = "end";
        if (this.stage === "init") {
          closeMethod = "destroy";
        }
        this.logger.debug({
          tnx: "smtp"
        }, 'Closing connection to the server using "%s"', closeMethod);
        let socket = this._socket && this._socket.socket || this._socket;
        if (socket && !socket.destroyed) {
          try {
            this._socket[closeMethod]();
          } catch (E) {
          }
        }
        this._destroy();
      }
      login(authData, callback) {
        const isDestroyedMessage = this._isDestroyedMessage("login");
        if (isDestroyedMessage) {
          return callback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
        }
        this._auth = authData || {};
        this._authMethod = (this._auth.method || "").toString().trim().toUpperCase() || false;
        if (!this._authMethod && this._auth.oauth2 && !this._auth.credentials) {
          this._authMethod = "XOAUTH2";
        } else if (!this._authMethod || this._authMethod === "XOAUTH2" && !this._auth.oauth2) {
          this._authMethod = (this._supportedAuth[0] || "PLAIN").toUpperCase().trim();
        }
        if (this._authMethod !== "XOAUTH2" && (!this._auth.credentials || !this._auth.credentials.user || !this._auth.credentials.pass)) {
          if (this._auth.user && this._auth.pass) {
            this._auth.credentials = {
              user: this._auth.user,
              pass: this._auth.pass,
              options: this._auth.options
            };
          } else {
            return callback(this._formatError('Missing credentials for "' + this._authMethod + '"', "EAUTH", false, "API"));
          }
        }
        if (this.customAuth.has(this._authMethod)) {
          let handler = this.customAuth.get(this._authMethod);
          let lastResponse;
          let returned = false;
          let resolve = () => {
            if (returned) {
              return;
            }
            returned = true;
            this.logger.info({
              tnx: "smtp",
              username: this._auth.user,
              action: "authenticated",
              method: this._authMethod
            }, "User %s authenticated", JSON.stringify(this._auth.user));
            this.authenticated = true;
            callback(null, true);
          };
          let reject = (err) => {
            if (returned) {
              return;
            }
            returned = true;
            callback(this._formatError(err, "EAUTH", lastResponse, "AUTH " + this._authMethod));
          };
          let handlerResponse = handler({
            auth: this._auth,
            method: this._authMethod,
            extensions: [].concat(this._supportedExtensions),
            authMethods: [].concat(this._supportedAuth),
            maxAllowedSize: this._maxAllowedSize || false,
            sendCommand: (cmd, done) => {
              let promise;
              if (!done) {
                promise = new Promise((resolve2, reject2) => {
                  done = shared.callbackPromise(resolve2, reject2);
                });
              }
              this._responseActions.push((str) => {
                lastResponse = str;
                let codes = str.match(/^(\d+)(?:\s(\d+\.\d+\.\d+))?\s/);
                let data = {
                  command: cmd,
                  response: str
                };
                if (codes) {
                  data.status = Number(codes[1]) || 0;
                  if (codes[2]) {
                    data.code = codes[2];
                  }
                  data.text = str.substr(codes[0].length);
                } else {
                  data.text = str;
                  data.status = 0;
                }
                done(null, data);
              });
              setImmediate(() => this._sendCommand(cmd));
              return promise;
            },
            resolve,
            reject
          });
          if (handlerResponse && typeof handlerResponse.catch === "function") {
            handlerResponse.then(resolve).catch(reject);
          }
          return;
        }
        switch (this._authMethod) {
          case "XOAUTH2":
            this._handleXOauth2Token(false, callback);
            return;
          case "LOGIN":
            this._responseActions.push((str) => {
              this._actionAUTH_LOGIN_USER(str, callback);
            });
            this._sendCommand("AUTH LOGIN");
            return;
          case "PLAIN":
            this._responseActions.push((str) => {
              this._actionAUTHComplete(str, callback);
            });
            this._sendCommand("AUTH PLAIN " + Buffer.from("\0" + this._auth.credentials.user + "\0" + this._auth.credentials.pass, "utf-8").toString("base64"), "AUTH PLAIN " + Buffer.from("\0" + this._auth.credentials.user + "\0/* secret */", "utf-8").toString("base64"));
            return;
          case "CRAM-MD5":
            this._responseActions.push((str) => {
              this._actionAUTH_CRAM_MD5(str, callback);
            });
            this._sendCommand("AUTH CRAM-MD5");
            return;
        }
        return callback(this._formatError('Unknown authentication method "' + this._authMethod + '"', "EAUTH", false, "API"));
      }
      send(envelope, message, done) {
        if (!message) {
          return done(this._formatError("Empty message", "EMESSAGE", false, "API"));
        }
        const isDestroyedMessage = this._isDestroyedMessage("send message");
        if (isDestroyedMessage) {
          return done(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
        }
        if (this._maxAllowedSize && envelope.size > this._maxAllowedSize) {
          return setImmediate(() => {
            done(this._formatError("Message size larger than allowed " + this._maxAllowedSize, "EMESSAGE", false, "MAIL FROM"));
          });
        }
        let returned = false;
        let callback = function() {
          if (returned) {
            return;
          }
          returned = true;
          done(...arguments);
        };
        if (typeof message.on === "function") {
          message.on("error", (err) => callback(this._formatError(err, "ESTREAM", false, "API")));
        }
        let startTime = Date.now();
        this._setEnvelope(envelope, (err, info) => {
          if (err) {
            return callback(err);
          }
          let envelopeTime = Date.now();
          let stream = this._createSendStream((err2, str) => {
            if (err2) {
              return callback(err2);
            }
            info.envelopeTime = envelopeTime - startTime;
            info.messageTime = Date.now() - envelopeTime;
            info.messageSize = stream.outByteCount;
            info.response = str;
            return callback(null, info);
          });
          if (typeof message.pipe === "function") {
            message.pipe(stream);
          } else {
            stream.write(message);
            stream.end();
          }
        });
      }
      reset(callback) {
        this._sendCommand("RSET");
        this._responseActions.push((str) => {
          if (str.charAt(0) !== "2") {
            return callback(this._formatError("Could not reset session state. response=" + str, "EPROTOCOL", str, "RSET"));
          }
          this._envelope = false;
          return callback(null, true);
        });
      }
      _onConnect() {
        clearTimeout(this._connectionTimeout);
        this.logger.info({
          tnx: "network",
          localAddress: this._socket.localAddress,
          localPort: this._socket.localPort,
          remoteAddress: this._socket.remoteAddress,
          remotePort: this._socket.remotePort
        }, "%s established to %s:%s", this.secure ? "Secure connection" : "Connection", this._socket.remoteAddress, this._socket.remotePort);
        if (this._destroyed) {
          this.close();
          return;
        }
        this.stage = "connected";
        this._socket.removeListener("data", this._onSocketData);
        this._socket.removeListener("timeout", this._onSocketTimeout);
        this._socket.removeListener("close", this._onSocketClose);
        this._socket.removeListener("end", this._onSocketEnd);
        this._socket.on("data", this._onSocketData);
        this._socket.once("close", this._onSocketClose);
        this._socket.once("end", this._onSocketEnd);
        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
        this._socket.on("timeout", this._onSocketTimeout);
        this._greetingTimeout = setTimeout(() => {
          if (this._socket && !this._destroyed && this._responseActions[0] === this._actionGreeting) {
            this._onError("Greeting never received", "ETIMEDOUT", false, "CONN");
          }
        }, this.options.greetingTimeout || GREETING_TIMEOUT);
        this._responseActions.push(this._actionGreeting);
        this._socket.resume();
      }
      _onData(chunk) {
        if (this._destroyed || !chunk || !chunk.length) {
          return;
        }
        let data = (chunk || "").toString("binary");
        let lines = (this._remainder + data).split(/\r?\n/);
        let lastline;
        this._remainder = lines.pop();
        for (let i = 0, len = lines.length; i < len; i++) {
          if (this._responseQueue.length) {
            lastline = this._responseQueue[this._responseQueue.length - 1];
            if (/^\d+-/.test(lastline.split("\n").pop())) {
              this._responseQueue[this._responseQueue.length - 1] += "\n" + lines[i];
              continue;
            }
          }
          this._responseQueue.push(lines[i]);
        }
        if (this._responseQueue.length) {
          lastline = this._responseQueue[this._responseQueue.length - 1];
          if (/^\d+-/.test(lastline.split("\n").pop())) {
            return;
          }
        }
        this._processResponse();
      }
      _onError(err, type, data, command) {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);
        if (this._destroyed) {
          return;
        }
        err = this._formatError(err, type, data, command);
        this.logger.error(data, err.message);
        this.emit("error", err);
        this.close();
      }
      _formatError(message, type, response, command) {
        let err;
        if (/Error\]$/i.test(Object.prototype.toString.call(message))) {
          err = message;
        } else {
          err = new Error(message);
        }
        if (type && type !== "Error") {
          err.code = type;
        }
        if (response) {
          err.response = response;
          err.message += ": " + response;
        }
        let responseCode = typeof response === "string" && Number((response.match(/^\d+/) || [])[0]) || false;
        if (responseCode) {
          err.responseCode = responseCode;
        }
        if (command) {
          err.command = command;
        }
        return err;
      }
      _onClose() {
        this.logger.info({
          tnx: "network"
        }, "Connection closed");
        if (this.upgrading && !this._destroyed) {
          return this._onError(new Error("Connection closed unexpectedly"), "ETLS", false, "CONN");
        } else if (![this._actionGreeting, this.close].includes(this._responseActions[0]) && !this._destroyed) {
          return this._onError(new Error("Connection closed unexpectedly"), "ECONNECTION", false, "CONN");
        }
        this._destroy();
      }
      _onEnd() {
        if (this._socket && !this._socket.destroyed) {
          this._socket.destroy();
        }
      }
      _onTimeout() {
        return this._onError(new Error("Timeout"), "ETIMEDOUT", false, "CONN");
      }
      _destroy() {
        if (this._destroyed) {
          return;
        }
        this._destroyed = true;
        this.emit("end");
      }
      _upgradeConnection(callback) {
        this._socket.removeListener("data", this._onSocketData);
        this._socket.removeListener("timeout", this._onSocketTimeout);
        let socketPlain = this._socket;
        let opts = {
          socket: this._socket,
          host: this.host
        };
        Object.keys(this.options.tls || {}).forEach((key) => {
          opts[key] = this.options.tls[key];
        });
        this.upgrading = true;
        try {
          this._socket = tls.connect(opts, () => {
            this.secure = true;
            this.upgrading = false;
            this._socket.on("data", this._onSocketData);
            socketPlain.removeListener("close", this._onSocketClose);
            socketPlain.removeListener("end", this._onSocketEnd);
            return callback(null, true);
          });
        } catch (err) {
          return callback(err);
        }
        this._socket.on("error", this._onSocketError);
        this._socket.once("close", this._onSocketClose);
        this._socket.once("end", this._onSocketEnd);
        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
        this._socket.on("timeout", this._onSocketTimeout);
        socketPlain.resume();
      }
      _processResponse() {
        if (!this._responseQueue.length) {
          return false;
        }
        let str = this.lastServerResponse = (this._responseQueue.shift() || "").toString();
        if (/^\d+-/.test(str.split("\n").pop())) {
          return;
        }
        if (this.options.debug || this.options.transactionLog) {
          this.logger.debug({
            tnx: "server"
          }, str.replace(/\r?\n$/, ""));
        }
        if (!str.trim()) {
          setImmediate(() => this._processResponse(true));
        }
        let action = this._responseActions.shift();
        if (typeof action === "function") {
          action.call(this, str);
          setImmediate(() => this._processResponse(true));
        } else {
          return this._onError(new Error("Unexpected Response"), "EPROTOCOL", str, "CONN");
        }
      }
      _sendCommand(str, logStr) {
        if (this._destroyed) {
          return;
        }
        if (this._socket.destroyed) {
          return this.close();
        }
        if (this.options.debug || this.options.transactionLog) {
          this.logger.debug({
            tnx: "client"
          }, (logStr || str || "").toString().replace(/\r?\n$/, ""));
        }
        this._socket.write(Buffer.from(str + "\r\n", "utf-8"));
      }
      _setEnvelope(envelope, callback) {
        let args = [];
        let useSmtpUtf8 = false;
        this._envelope = envelope || {};
        this._envelope.from = (this._envelope.from && this._envelope.from.address || this._envelope.from || "").toString().trim();
        this._envelope.to = [].concat(this._envelope.to || []).map((to2) => (to2 && to2.address || to2 || "").toString().trim());
        if (!this._envelope.to.length) {
          return callback(this._formatError("No recipients defined", "EENVELOPE", false, "API"));
        }
        if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from)) {
          return callback(this._formatError("Invalid sender " + JSON.stringify(this._envelope.from), "EENVELOPE", false, "API"));
        }
        if (/[\x80-\uFFFF]/.test(this._envelope.from)) {
          useSmtpUtf8 = true;
        }
        for (let i = 0, len = this._envelope.to.length; i < len; i++) {
          if (!this._envelope.to[i] || /[\r\n<>]/.test(this._envelope.to[i])) {
            return callback(this._formatError("Invalid recipient " + JSON.stringify(this._envelope.to[i]), "EENVELOPE", false, "API"));
          }
          if (/[\x80-\uFFFF]/.test(this._envelope.to[i])) {
            useSmtpUtf8 = true;
          }
        }
        this._envelope.rcptQueue = JSON.parse(JSON.stringify(this._envelope.to || []));
        this._envelope.rejected = [];
        this._envelope.rejectedErrors = [];
        this._envelope.accepted = [];
        if (this._envelope.dsn) {
          try {
            this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
          } catch (err) {
            return callback(this._formatError("Invalid DSN " + err.message, "EENVELOPE", false, "API"));
          }
        }
        this._responseActions.push((str) => {
          this._actionMAIL(str, callback);
        });
        if (useSmtpUtf8 && this._supportedExtensions.includes("SMTPUTF8")) {
          args.push("SMTPUTF8");
          this._usingSmtpUtf8 = true;
        }
        if (this._envelope.use8BitMime && this._supportedExtensions.includes("8BITMIME")) {
          args.push("BODY=8BITMIME");
          this._using8BitMime = true;
        }
        if (this._envelope.size && this._supportedExtensions.includes("SIZE")) {
          args.push("SIZE=" + this._envelope.size);
        }
        if (this._envelope.dsn && this._supportedExtensions.includes("DSN")) {
          if (this._envelope.dsn.ret) {
            args.push("RET=" + shared.encodeXText(this._envelope.dsn.ret));
          }
          if (this._envelope.dsn.envid) {
            args.push("ENVID=" + shared.encodeXText(this._envelope.dsn.envid));
          }
        }
        this._sendCommand("MAIL FROM:<" + this._envelope.from + ">" + (args.length ? " " + args.join(" ") : ""));
      }
      _setDsnEnvelope(params) {
        let ret = (params.ret || params.return || "").toString().toUpperCase() || null;
        if (ret) {
          switch (ret) {
            case "HDRS":
            case "HEADERS":
              ret = "HDRS";
              break;
            case "FULL":
            case "BODY":
              ret = "FULL";
              break;
          }
        }
        if (ret && !["FULL", "HDRS"].includes(ret)) {
          throw new Error("ret: " + JSON.stringify(ret));
        }
        let envid = (params.envid || params.id || "").toString() || null;
        let notify = params.notify || null;
        if (notify) {
          if (typeof notify === "string") {
            notify = notify.split(",");
          }
          notify = notify.map((n) => n.trim().toUpperCase());
          let validNotify = ["NEVER", "SUCCESS", "FAILURE", "DELAY"];
          let invaliNotify = notify.filter((n) => !validNotify.includes(n));
          if (invaliNotify.length || notify.length > 1 && notify.includes("NEVER")) {
            throw new Error("notify: " + JSON.stringify(notify.join(",")));
          }
          notify = notify.join(",");
        }
        let orcpt = (params.recipient || params.orcpt || "").toString() || null;
        if (orcpt && orcpt.indexOf(";") < 0) {
          orcpt = "rfc822;" + orcpt;
        }
        return {
          ret,
          envid,
          notify,
          orcpt
        };
      }
      _getDsnRcptToArgs() {
        let args = [];
        if (this._envelope.dsn && this._supportedExtensions.includes("DSN")) {
          if (this._envelope.dsn.notify) {
            args.push("NOTIFY=" + shared.encodeXText(this._envelope.dsn.notify));
          }
          if (this._envelope.dsn.orcpt) {
            args.push("ORCPT=" + shared.encodeXText(this._envelope.dsn.orcpt));
          }
        }
        return args.length ? " " + args.join(" ") : "";
      }
      _createSendStream(callback) {
        let dataStream = new DataStream();
        let logStream;
        if (this.options.lmtp) {
          this._envelope.accepted.forEach((recipient, i) => {
            let final = i === this._envelope.accepted.length - 1;
            this._responseActions.push((str) => {
              this._actionLMTPStream(recipient, final, str, callback);
            });
          });
        } else {
          this._responseActions.push((str) => {
            this._actionSMTPStream(str, callback);
          });
        }
        dataStream.pipe(this._socket, {
          end: false
        });
        if (this.options.debug) {
          logStream = new PassThrough();
          logStream.on("readable", () => {
            let chunk;
            while (chunk = logStream.read()) {
              this.logger.debug({
                tnx: "message"
              }, chunk.toString("binary").replace(/\r?\n$/, ""));
            }
          });
          dataStream.pipe(logStream);
        }
        dataStream.once("end", () => {
          this.logger.info({
            tnx: "message",
            inByteCount: dataStream.inByteCount,
            outByteCount: dataStream.outByteCount
          }, "<%s bytes encoded mime message (source size %s bytes)>", dataStream.outByteCount, dataStream.inByteCount);
        });
        return dataStream;
      }
      _actionGreeting(str) {
        clearTimeout(this._greetingTimeout);
        if (str.substr(0, 3) !== "220") {
          this._onError(new Error("Invalid greeting. response=" + str), "EPROTOCOL", str, "CONN");
          return;
        }
        if (this.options.lmtp) {
          this._responseActions.push(this._actionLHLO);
          this._sendCommand("LHLO " + this.name);
        } else {
          this._responseActions.push(this._actionEHLO);
          this._sendCommand("EHLO " + this.name);
        }
      }
      _actionLHLO(str) {
        if (str.charAt(0) !== "2") {
          this._onError(new Error("Invalid LHLO. response=" + str), "EPROTOCOL", str, "LHLO");
          return;
        }
        this._actionEHLO(str);
      }
      _actionEHLO(str) {
        let match;
        if (str.substr(0, 3) === "421") {
          this._onError(new Error("Server terminates connection. response=" + str), "ECONNECTION", str, "EHLO");
          return;
        }
        if (str.charAt(0) !== "2") {
          if (this.options.requireTLS) {
            this._onError(new Error("EHLO failed but HELO does not support required STARTTLS. response=" + str), "ECONNECTION", str, "EHLO");
            return;
          }
          this._responseActions.push(this._actionHELO);
          this._sendCommand("HELO " + this.name);
          return;
        }
        if (!this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(str) || this.options.requireTLS)) {
          this._sendCommand("STARTTLS");
          this._responseActions.push(this._actionSTARTTLS);
          return;
        }
        if (/[ -]SMTPUTF8\b/im.test(str)) {
          this._supportedExtensions.push("SMTPUTF8");
        }
        if (/[ -]DSN\b/im.test(str)) {
          this._supportedExtensions.push("DSN");
        }
        if (/[ -]8BITMIME\b/im.test(str)) {
          this._supportedExtensions.push("8BITMIME");
        }
        if (/[ -]PIPELINING\b/im.test(str)) {
          this._supportedExtensions.push("PIPELINING");
        }
        if (/[ -]AUTH\b/i.test(str)) {
          this.allowsAuth = true;
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i.test(str)) {
          this._supportedAuth.push("PLAIN");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i.test(str)) {
          this._supportedAuth.push("LOGIN");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i.test(str)) {
          this._supportedAuth.push("CRAM-MD5");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i.test(str)) {
          this._supportedAuth.push("XOAUTH2");
        }
        if (match = str.match(/[ -]SIZE(?:[ \t]+(\d+))?/im)) {
          this._supportedExtensions.push("SIZE");
          this._maxAllowedSize = Number(match[1]) || 0;
        }
        this.emit("connect");
      }
      _actionHELO(str) {
        if (str.charAt(0) !== "2") {
          this._onError(new Error("Invalid HELO. response=" + str), "EPROTOCOL", str, "HELO");
          return;
        }
        this.allowsAuth = true;
        this.emit("connect");
      }
      _actionSTARTTLS(str) {
        if (str.charAt(0) !== "2") {
          if (this.options.opportunisticTLS) {
            this.logger.info({
              tnx: "smtp"
            }, "Failed STARTTLS upgrade, continuing unencrypted");
            return this.emit("connect");
          }
          this._onError(new Error("Error upgrading connection with STARTTLS"), "ETLS", str, "STARTTLS");
          return;
        }
        this._upgradeConnection((err, secured) => {
          if (err) {
            this._onError(new Error("Error initiating TLS - " + (err.message || err)), "ETLS", false, "STARTTLS");
            return;
          }
          this.logger.info({
            tnx: "smtp"
          }, "Connection upgraded with STARTTLS");
          if (secured) {
            if (this.options.lmtp) {
              this._responseActions.push(this._actionLHLO);
              this._sendCommand("LHLO " + this.name);
            } else {
              this._responseActions.push(this._actionEHLO);
              this._sendCommand("EHLO " + this.name);
            }
          } else {
            this.emit("connect");
          }
        });
      }
      _actionAUTH_LOGIN_USER(str, callback) {
        if (!/^334[ -]/.test(str)) {
          callback(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', "EAUTH", str, "AUTH LOGIN"));
          return;
        }
        this._responseActions.push((str2) => {
          this._actionAUTH_LOGIN_PASS(str2, callback);
        });
        this._sendCommand(Buffer.from(this._auth.credentials.user + "", "utf-8").toString("base64"));
      }
      _actionAUTH_CRAM_MD5(str, callback) {
        let challengeMatch = str.match(/^334\s+(.+)$/);
        let challengeString = "";
        if (!challengeMatch) {
          return callback(this._formatError("Invalid login sequence while waiting for server challenge string", "EAUTH", str, "AUTH CRAM-MD5"));
        } else {
          challengeString = challengeMatch[1];
        }
        let base64decoded = Buffer.from(challengeString, "base64").toString("ascii"), hmacMD5 = crypto.createHmac("md5", this._auth.credentials.pass);
        hmacMD5.update(base64decoded);
        let prepended = this._auth.credentials.user + " " + hmacMD5.digest("hex");
        this._responseActions.push((str2) => {
          this._actionAUTH_CRAM_MD5_PASS(str2, callback);
        });
        this._sendCommand(Buffer.from(prepended).toString("base64"), Buffer.from(this._auth.credentials.user + " /* secret */").toString("base64"));
      }
      _actionAUTH_CRAM_MD5_PASS(str, callback) {
        if (!str.match(/^235\s+/)) {
          return callback(this._formatError('Invalid login sequence while waiting for "235"', "EAUTH", str, "AUTH CRAM-MD5"));
        }
        this.logger.info({
          tnx: "smtp",
          username: this._auth.user,
          action: "authenticated",
          method: this._authMethod
        }, "User %s authenticated", JSON.stringify(this._auth.user));
        this.authenticated = true;
        callback(null, true);
      }
      _actionAUTH_LOGIN_PASS(str, callback) {
        if (!/^334[ -]/.test(str)) {
          return callback(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', "EAUTH", str, "AUTH LOGIN"));
        }
        this._responseActions.push((str2) => {
          this._actionAUTHComplete(str2, callback);
        });
        this._sendCommand(Buffer.from((this._auth.credentials.pass || "").toString(), "utf-8").toString("base64"), Buffer.from("/* secret */", "utf-8").toString("base64"));
      }
      _actionAUTHComplete(str, isRetry, callback) {
        if (!callback && typeof isRetry === "function") {
          callback = isRetry;
          isRetry = false;
        }
        if (str.substr(0, 3) === "334") {
          this._responseActions.push((str2) => {
            if (isRetry || this._authMethod !== "XOAUTH2") {
              this._actionAUTHComplete(str2, true, callback);
            } else {
              setImmediate(() => this._handleXOauth2Token(true, callback));
            }
          });
          this._sendCommand("");
          return;
        }
        if (str.charAt(0) !== "2") {
          this.logger.info({
            tnx: "smtp",
            username: this._auth.user,
            action: "authfail",
            method: this._authMethod
          }, "User %s failed to authenticate", JSON.stringify(this._auth.user));
          return callback(this._formatError("Invalid login", "EAUTH", str, "AUTH " + this._authMethod));
        }
        this.logger.info({
          tnx: "smtp",
          username: this._auth.user,
          action: "authenticated",
          method: this._authMethod
        }, "User %s authenticated", JSON.stringify(this._auth.user));
        this.authenticated = true;
        callback(null, true);
      }
      _actionMAIL(str, callback) {
        let message, curRecipient;
        if (Number(str.charAt(0)) !== 2) {
          if (this._usingSmtpUtf8 && /^550 /.test(str) && /[\x80-\uFFFF]/.test(this._envelope.from)) {
            message = "Internationalized mailbox name not allowed";
          } else {
            message = "Mail command failed";
          }
          return callback(this._formatError(message, "EENVELOPE", str, "MAIL FROM"));
        }
        if (!this._envelope.rcptQueue.length) {
          return callback(this._formatError("Can't send mail - no recipients defined", "EENVELOPE", false, "API"));
        } else {
          this._recipientQueue = [];
          if (this._supportedExtensions.includes("PIPELINING")) {
            while (this._envelope.rcptQueue.length) {
              curRecipient = this._envelope.rcptQueue.shift();
              this._recipientQueue.push(curRecipient);
              this._responseActions.push((str2) => {
                this._actionRCPT(str2, callback);
              });
              this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
            }
          } else {
            curRecipient = this._envelope.rcptQueue.shift();
            this._recipientQueue.push(curRecipient);
            this._responseActions.push((str2) => {
              this._actionRCPT(str2, callback);
            });
            this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
          }
        }
      }
      _actionRCPT(str, callback) {
        let message, err, curRecipient = this._recipientQueue.shift();
        if (Number(str.charAt(0)) !== 2) {
          if (this._usingSmtpUtf8 && /^553 /.test(str) && /[\x80-\uFFFF]/.test(curRecipient)) {
            message = "Internationalized mailbox name not allowed";
          } else {
            message = "Recipient command failed";
          }
          this._envelope.rejected.push(curRecipient);
          err = this._formatError(message, "EENVELOPE", str, "RCPT TO");
          err.recipient = curRecipient;
          this._envelope.rejectedErrors.push(err);
        } else {
          this._envelope.accepted.push(curRecipient);
        }
        if (!this._envelope.rcptQueue.length && !this._recipientQueue.length) {
          if (this._envelope.rejected.length < this._envelope.to.length) {
            this._responseActions.push((str2) => {
              this._actionDATA(str2, callback);
            });
            this._sendCommand("DATA");
          } else {
            err = this._formatError("Can't send mail - all recipients were rejected", "EENVELOPE", str, "RCPT TO");
            err.rejected = this._envelope.rejected;
            err.rejectedErrors = this._envelope.rejectedErrors;
            return callback(err);
          }
        } else if (this._envelope.rcptQueue.length) {
          curRecipient = this._envelope.rcptQueue.shift();
          this._recipientQueue.push(curRecipient);
          this._responseActions.push((str2) => {
            this._actionRCPT(str2, callback);
          });
          this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
        }
      }
      _actionDATA(str, callback) {
        if (!/^[23]/.test(str)) {
          return callback(this._formatError("Data command failed", "EENVELOPE", str, "DATA"));
        }
        let response = {
          accepted: this._envelope.accepted,
          rejected: this._envelope.rejected
        };
        if (this._envelope.rejectedErrors.length) {
          response.rejectedErrors = this._envelope.rejectedErrors;
        }
        callback(null, response);
      }
      _actionSMTPStream(str, callback) {
        if (Number(str.charAt(0)) !== 2) {
          return callback(this._formatError("Message failed", "EMESSAGE", str, "DATA"));
        } else {
          return callback(null, str);
        }
      }
      _actionLMTPStream(recipient, final, str, callback) {
        let err;
        if (Number(str.charAt(0)) !== 2) {
          err = this._formatError("Message failed for recipient " + recipient, "EMESSAGE", str, "DATA");
          err.recipient = recipient;
          this._envelope.rejected.push(recipient);
          this._envelope.rejectedErrors.push(err);
          for (let i = 0, len = this._envelope.accepted.length; i < len; i++) {
            if (this._envelope.accepted[i] === recipient) {
              this._envelope.accepted.splice(i, 1);
            }
          }
        }
        if (final) {
          return callback(null, str);
        }
      }
      _handleXOauth2Token(isRetry, callback) {
        this._auth.oauth2.getToken(isRetry, (err, accessToken) => {
          if (err) {
            this.logger.info({
              tnx: "smtp",
              username: this._auth.user,
              action: "authfail",
              method: this._authMethod
            }, "User %s failed to authenticate", JSON.stringify(this._auth.user));
            return callback(this._formatError(err, "EAUTH", false, "AUTH XOAUTH2"));
          }
          this._responseActions.push((str) => {
            this._actionAUTHComplete(str, isRetry, callback);
          });
          this._sendCommand("AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token(accessToken), "AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token("/* secret */"));
        });
      }
      _isDestroyedMessage(command) {
        if (this._destroyed) {
          return "Cannot " + command + " - smtp connection is already destroyed.";
        }
        if (this._socket) {
          if (this._socket.destroyed) {
            return "Cannot " + command + " - smtp connection socket is already destroyed.";
          }
          if (!this._socket.writable) {
            return "Cannot " + command + " - smtp connection socket is already half-closed.";
          }
        }
      }
      _getHostname() {
        let defaultHostname;
        try {
          defaultHostname = os.hostname() || "";
        } catch (err) {
          defaultHostname = "localhost";
        }
        if (!defaultHostname || defaultHostname.indexOf(".") < 0) {
          defaultHostname = "[127.0.0.1]";
        }
        if (defaultHostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
          defaultHostname = "[" + defaultHostname + "]";
        }
        return defaultHostname;
      }
    };
    module2.exports = SMTPConnection;
  }
});

// node_modules/nodemailer/lib/xoauth2/index.js
var require_xoauth2 = __commonJS({
  "node_modules/nodemailer/lib/xoauth2/index.js"(exports, module2) {
    "use strict";
    var Stream = require("stream").Stream;
    var nmfetch = require_fetch();
    var crypto = require("crypto");
    var shared = require_shared();
    var XOAuth2 = class extends Stream {
      constructor(options, logger) {
        super();
        this.options = options || {};
        if (options && options.serviceClient) {
          if (!options.privateKey || !options.user) {
            setImmediate(() => this.emit("error", new Error('Options "privateKey" and "user" are required for service account!')));
            return;
          }
          let serviceRequestTimeout = Math.min(Math.max(Number(this.options.serviceRequestTimeout) || 0, 0), 3600);
          this.options.serviceRequestTimeout = serviceRequestTimeout || 5 * 60;
        }
        this.logger = shared.getLogger({
          logger
        }, {
          component: this.options.component || "OAuth2"
        });
        this.provisionCallback = typeof this.options.provisionCallback === "function" ? this.options.provisionCallback : false;
        this.options.accessUrl = this.options.accessUrl || "https://accounts.google.com/o/oauth2/token";
        this.options.customHeaders = this.options.customHeaders || {};
        this.options.customParams = this.options.customParams || {};
        this.accessToken = this.options.accessToken || false;
        if (this.options.expires && Number(this.options.expires)) {
          this.expires = this.options.expires;
        } else {
          let timeout = Math.max(Number(this.options.timeout) || 0, 0);
          this.expires = timeout && Date.now() + timeout * 1e3 || 0;
        }
      }
      getToken(renew, callback) {
        if (!renew && this.accessToken && (!this.expires || this.expires > Date.now())) {
          return callback(null, this.accessToken);
        }
        let generateCallback = (...args) => {
          if (args[0]) {
            this.logger.error({
              err: args[0],
              tnx: "OAUTH2",
              user: this.options.user,
              action: "renew"
            }, "Failed generating new Access Token for %s", this.options.user);
          } else {
            this.logger.info({
              tnx: "OAUTH2",
              user: this.options.user,
              action: "renew"
            }, "Generated new Access Token for %s", this.options.user);
          }
          callback(...args);
        };
        if (this.provisionCallback) {
          this.provisionCallback(this.options.user, !!renew, (err, accessToken, expires) => {
            if (!err && accessToken) {
              this.accessToken = accessToken;
              this.expires = expires || 0;
            }
            generateCallback(err, accessToken);
          });
        } else {
          this.generateToken(generateCallback);
        }
      }
      updateToken(accessToken, timeout) {
        this.accessToken = accessToken;
        timeout = Math.max(Number(timeout) || 0, 0);
        this.expires = timeout && Date.now() + timeout * 1e3 || 0;
        this.emit("token", {
          user: this.options.user,
          accessToken: accessToken || "",
          expires: this.expires
        });
      }
      generateToken(callback) {
        let urlOptions;
        let loggedUrlOptions;
        if (this.options.serviceClient) {
          let iat = Math.floor(Date.now() / 1e3);
          let tokenData = {
            iss: this.options.serviceClient,
            scope: this.options.scope || "https://mail.google.com/",
            sub: this.options.user,
            aud: this.options.accessUrl,
            iat,
            exp: iat + this.options.serviceRequestTimeout
          };
          let token;
          try {
            token = this.jwtSignRS256(tokenData);
          } catch (err) {
            return callback(new Error("Can't generate token. Check your auth options"));
          }
          urlOptions = {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: token
          };
          loggedUrlOptions = {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: tokenData
          };
        } else {
          if (!this.options.refreshToken) {
            return callback(new Error("Can't create new access token for user"));
          }
          urlOptions = {
            client_id: this.options.clientId || "",
            client_secret: this.options.clientSecret || "",
            refresh_token: this.options.refreshToken,
            grant_type: "refresh_token"
          };
          loggedUrlOptions = {
            client_id: this.options.clientId || "",
            client_secret: (this.options.clientSecret || "").substr(0, 6) + "...",
            refresh_token: (this.options.refreshToken || "").substr(0, 6) + "...",
            grant_type: "refresh_token"
          };
        }
        Object.keys(this.options.customParams).forEach((key) => {
          urlOptions[key] = this.options.customParams[key];
          loggedUrlOptions[key] = this.options.customParams[key];
        });
        this.logger.debug({
          tnx: "OAUTH2",
          user: this.options.user,
          action: "generate"
        }, "Requesting token using: %s", JSON.stringify(loggedUrlOptions));
        this.postRequest(this.options.accessUrl, urlOptions, this.options, (error, body) => {
          let data;
          if (error) {
            return callback(error);
          }
          try {
            data = JSON.parse(body.toString());
          } catch (E) {
            return callback(E);
          }
          if (!data || typeof data !== "object") {
            this.logger.debug({
              tnx: "OAUTH2",
              user: this.options.user,
              action: "post"
            }, "Response: %s", (body || "").toString());
            return callback(new Error("Invalid authentication response"));
          }
          let logData = {};
          Object.keys(data).forEach((key) => {
            if (key !== "access_token") {
              logData[key] = data[key];
            } else {
              logData[key] = (data[key] || "").toString().substr(0, 6) + "...";
            }
          });
          this.logger.debug({
            tnx: "OAUTH2",
            user: this.options.user,
            action: "post"
          }, "Response: %s", JSON.stringify(logData));
          if (data.error) {
            let errorMessage = data.error;
            if (data.error_description) {
              errorMessage += ": " + data.error_description;
            }
            if (data.error_uri) {
              errorMessage += " (" + data.error_uri + ")";
            }
            return callback(new Error(errorMessage));
          }
          if (data.access_token) {
            this.updateToken(data.access_token, data.expires_in);
            return callback(null, this.accessToken);
          }
          return callback(new Error("No access token"));
        });
      }
      buildXOAuth2Token(accessToken) {
        let authData = ["user=" + (this.options.user || ""), "auth=Bearer " + (accessToken || this.accessToken), "", ""];
        return Buffer.from(authData.join(""), "utf-8").toString("base64");
      }
      postRequest(url, payload, params, callback) {
        let returned = false;
        let chunks = [];
        let chunklen = 0;
        let req = nmfetch(url, {
          method: "post",
          headers: params.customHeaders,
          body: payload,
          allowErrorResponse: true
        });
        req.on("readable", () => {
          let chunk;
          while ((chunk = req.read()) !== null) {
            chunks.push(chunk);
            chunklen += chunk.length;
          }
        });
        req.once("error", (err) => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(err);
        });
        req.once("end", () => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(null, Buffer.concat(chunks, chunklen));
        });
      }
      toBase64URL(data) {
        if (typeof data === "string") {
          data = Buffer.from(data);
        }
        return data.toString("base64").replace(/[=]+/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      jwtSignRS256(payload) {
        payload = ['{"alg":"RS256","typ":"JWT"}', JSON.stringify(payload)].map((val) => this.toBase64URL(val)).join(".");
        let signature = crypto.createSign("RSA-SHA256").update(payload).sign(this.options.privateKey);
        return payload + "." + this.toBase64URL(signature);
      }
    };
    module2.exports = XOAuth2;
  }
});

// node_modules/nodemailer/lib/smtp-pool/pool-resource.js
var require_pool_resource = __commonJS({
  "node_modules/nodemailer/lib/smtp-pool/pool-resource.js"(exports, module2) {
    "use strict";
    var SMTPConnection = require_smtp_connection();
    var assign = require_shared().assign;
    var XOAuth2 = require_xoauth2();
    var EventEmitter = require("events");
    var PoolResource = class extends EventEmitter {
      constructor(pool) {
        super();
        this.pool = pool;
        this.options = pool.options;
        this.logger = this.pool.logger;
        if (this.options.auth) {
          switch ((this.options.auth.type || "").toString().toUpperCase()) {
            case "OAUTH2": {
              let oauth2 = new XOAuth2(this.options.auth, this.logger);
              oauth2.provisionCallback = this.pool.mailer && this.pool.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
              this.auth = {
                type: "OAUTH2",
                user: this.options.auth.user,
                oauth2,
                method: "XOAUTH2"
              };
              oauth2.on("token", (token) => this.pool.mailer.emit("token", token));
              oauth2.on("error", (err) => this.emit("error", err));
              break;
            }
            default:
              if (!this.options.auth.user && !this.options.auth.pass) {
                break;
              }
              this.auth = {
                type: (this.options.auth.type || "").toString().toUpperCase() || "LOGIN",
                user: this.options.auth.user,
                credentials: {
                  user: this.options.auth.user || "",
                  pass: this.options.auth.pass,
                  options: this.options.auth.options
                },
                method: (this.options.auth.method || "").trim().toUpperCase() || this.options.authMethod || false
              };
          }
        }
        this._connection = false;
        this._connected = false;
        this.messages = 0;
        this.available = true;
      }
      connect(callback) {
        this.pool.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let returned = false;
          let options = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info({
              tnx: "proxy",
              remoteAddress: socketOptions.connection.remoteAddress,
              remotePort: socketOptions.connection.remotePort,
              destHost: options.host || "",
              destPort: options.port || "",
              action: "connected"
            }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
            options = assign(false, options);
            Object.keys(socketOptions).forEach((key) => {
              options[key] = socketOptions[key];
            });
          }
          this.connection = new SMTPConnection(options);
          this.connection.once("error", (err2) => {
            this.emit("error", err2);
            if (returned) {
              return;
            }
            returned = true;
            return callback(err2);
          });
          this.connection.once("end", () => {
            this.close();
            if (returned) {
              return;
            }
            returned = true;
            let timer = setTimeout(() => {
              if (returned) {
                return;
              }
              let err2 = new Error("Unexpected socket close");
              if (this.connection && this.connection._socket && this.connection._socket.upgrading) {
                err2.code = "ETLS";
              }
              callback(err2);
            }, 1e3);
            try {
              timer.unref();
            } catch (E) {
            }
          });
          this.connection.connect(() => {
            if (returned) {
              return;
            }
            if (this.auth && (this.connection.allowsAuth || options.forceAuth)) {
              this.connection.login(this.auth, (err2) => {
                if (returned) {
                  return;
                }
                returned = true;
                if (err2) {
                  this.connection.close();
                  this.emit("error", err2);
                  return callback(err2);
                }
                this._connected = true;
                callback(null, true);
              });
            } else {
              returned = true;
              this._connected = true;
              return callback(null, true);
            }
          });
        });
      }
      send(mail, callback) {
        if (!this._connected) {
          return this.connect((err) => {
            if (err) {
              return callback(err);
            }
            return this.send(mail, callback);
          });
        }
        let envelope = mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info({
          tnx: "send",
          messageId,
          cid: this.id
        }, "Sending message %s using #%s to <%s>", messageId, this.id, recipients.join(", "));
        if (mail.data.dsn) {
          envelope.dsn = mail.data.dsn;
        }
        this.connection.send(envelope, mail.message.createReadStream(), (err, info) => {
          this.messages++;
          if (err) {
            this.connection.close();
            this.emit("error", err);
            return callback(err);
          }
          info.envelope = {
            from: envelope.from,
            to: envelope.to
          };
          info.messageId = messageId;
          setImmediate(() => {
            let err2;
            if (this.messages >= this.options.maxMessages) {
              err2 = new Error("Resource exhausted");
              err2.code = "EMAXLIMIT";
              this.connection.close();
              this.emit("error", err2);
            } else {
              this.pool._checkRateLimit(() => {
                this.available = true;
                this.emit("available");
              });
            }
          });
          callback(null, info);
        });
      }
      close() {
        this._connected = false;
        if (this.auth && this.auth.oauth2) {
          this.auth.oauth2.removeAllListeners();
        }
        if (this.connection) {
          this.connection.close();
        }
        this.emit("close");
      }
    };
    module2.exports = PoolResource;
  }
});

// node_modules/nodemailer/lib/well-known/services.json
var require_services = __commonJS({
  "node_modules/nodemailer/lib/well-known/services.json"(exports, module2) {
    module2.exports = {
      "1und1": {
        host: "smtp.1und1.de",
        port: 465,
        secure: true,
        authMethod: "LOGIN"
      },
      AOL: {
        domains: ["aol.com"],
        host: "smtp.aol.com",
        port: 587
      },
      Bluewin: {
        host: "smtpauths.bluewin.ch",
        domains: ["bluewin.ch"],
        port: 465
      },
      DebugMail: {
        host: "debugmail.io",
        port: 25
      },
      DynectEmail: {
        aliases: ["Dynect"],
        host: "smtp.dynect.net",
        port: 25
      },
      Ethereal: {
        aliases: ["ethereal.email"],
        host: "smtp.ethereal.email",
        port: 587
      },
      FastMail: {
        domains: ["fastmail.fm"],
        host: "smtp.fastmail.com",
        port: 465,
        secure: true
      },
      GandiMail: {
        aliases: ["Gandi", "Gandi Mail"],
        host: "mail.gandi.net",
        port: 587
      },
      Gmail: {
        aliases: ["Google Mail"],
        domains: ["gmail.com", "googlemail.com"],
        host: "smtp.gmail.com",
        port: 465,
        secure: true
      },
      Godaddy: {
        host: "smtpout.secureserver.net",
        port: 25
      },
      GodaddyAsia: {
        host: "smtp.asia.secureserver.net",
        port: 25
      },
      GodaddyEurope: {
        host: "smtp.europe.secureserver.net",
        port: 25
      },
      "hot.ee": {
        host: "mail.hot.ee"
      },
      Hotmail: {
        aliases: ["Outlook", "Outlook.com", "Hotmail.com"],
        domains: ["hotmail.com", "outlook.com"],
        host: "smtp-mail.outlook.com",
        port: 587
      },
      iCloud: {
        aliases: ["Me", "Mac"],
        domains: ["me.com", "mac.com"],
        host: "smtp.mail.me.com",
        port: 587
      },
      Infomaniak: {
        host: "mail.infomaniak.com",
        domains: ["ik.me", "ikmail.com", "etik.com"],
        port: 587
      },
      "mail.ee": {
        host: "smtp.mail.ee"
      },
      "Mail.ru": {
        host: "smtp.mail.ru",
        port: 465,
        secure: true
      },
      Maildev: {
        port: 1025,
        ignoreTLS: true
      },
      Mailgun: {
        host: "smtp.mailgun.org",
        port: 465,
        secure: true
      },
      Mailjet: {
        host: "in.mailjet.com",
        port: 587
      },
      Mailosaur: {
        host: "mailosaur.io",
        port: 25
      },
      Mailtrap: {
        host: "smtp.mailtrap.io",
        port: 2525
      },
      Mandrill: {
        host: "smtp.mandrillapp.com",
        port: 587
      },
      Naver: {
        host: "smtp.naver.com",
        port: 587
      },
      One: {
        host: "send.one.com",
        port: 465,
        secure: true
      },
      OpenMailBox: {
        aliases: ["OMB", "openmailbox.org"],
        host: "smtp.openmailbox.org",
        port: 465,
        secure: true
      },
      Outlook365: {
        host: "smtp.office365.com",
        port: 587,
        secure: false
      },
      OhMySMTP: {
        host: "smtp.ohmysmtp.com",
        port: 587,
        secure: false
      },
      Postmark: {
        aliases: ["PostmarkApp"],
        host: "smtp.postmarkapp.com",
        port: 2525
      },
      "qiye.aliyun": {
        host: "smtp.mxhichina.com",
        port: "465",
        secure: true
      },
      QQ: {
        domains: ["qq.com"],
        host: "smtp.qq.com",
        port: 465,
        secure: true
      },
      QQex: {
        aliases: ["QQ Enterprise"],
        domains: ["exmail.qq.com"],
        host: "smtp.exmail.qq.com",
        port: 465,
        secure: true
      },
      SendCloud: {
        host: "smtp.sendcloud.net",
        port: 2525
      },
      SendGrid: {
        host: "smtp.sendgrid.net",
        port: 587
      },
      SendinBlue: {
        host: "smtp-relay.sendinblue.com",
        port: 587
      },
      SendPulse: {
        host: "smtp-pulse.com",
        port: 465,
        secure: true
      },
      SES: {
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-EAST-1": {
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-WEST-2": {
        host: "email-smtp.us-west-2.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-EU-WEST-1": {
        host: "email-smtp.eu-west-1.amazonaws.com",
        port: 465,
        secure: true
      },
      Sparkpost: {
        aliases: ["SparkPost", "SparkPost Mail"],
        domains: ["sparkpost.com"],
        host: "smtp.sparkpostmail.com",
        port: 587,
        secure: false
      },
      Tipimail: {
        host: "smtp.tipimail.com",
        port: 587
      },
      Yahoo: {
        domains: ["yahoo.com"],
        host: "smtp.mail.yahoo.com",
        port: 465,
        secure: true
      },
      Yandex: {
        domains: ["yandex.ru"],
        host: "smtp.yandex.ru",
        port: 465,
        secure: true
      },
      Zoho: {
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        authMethod: "LOGIN"
      },
      "126": {
        host: "smtp.126.com",
        port: 465,
        secure: true
      },
      "163": {
        host: "smtp.163.com",
        port: 465,
        secure: true
      }
    };
  }
});

// node_modules/nodemailer/lib/well-known/index.js
var require_well_known = __commonJS({
  "node_modules/nodemailer/lib/well-known/index.js"(exports, module2) {
    "use strict";
    var services2 = require_services();
    var normalized = {};
    Object.keys(services2).forEach((key) => {
      let service = services2[key];
      normalized[normalizeKey(key)] = normalizeService(service);
      [].concat(service.aliases || []).forEach((alias) => {
        normalized[normalizeKey(alias)] = normalizeService(service);
      });
      [].concat(service.domains || []).forEach((domain) => {
        normalized[normalizeKey(domain)] = normalizeService(service);
      });
    });
    function normalizeKey(key) {
      return key.replace(/[^a-zA-Z0-9.-]/g, "").toLowerCase();
    }
    function normalizeService(service) {
      let filter = ["domains", "aliases"];
      let response = {};
      Object.keys(service).forEach((key) => {
        if (filter.indexOf(key) < 0) {
          response[key] = service[key];
        }
      });
      return response;
    }
    module2.exports = function(key) {
      key = normalizeKey(key.split("@").pop());
      return normalized[key] || false;
    };
  }
});

// node_modules/nodemailer/lib/smtp-pool/index.js
var require_smtp_pool = __commonJS({
  "node_modules/nodemailer/lib/smtp-pool/index.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var PoolResource = require_pool_resource();
    var SMTPConnection = require_smtp_connection();
    var wellKnown = require_well_known();
    var shared = require_shared();
    var packageData = require_package();
    var SMTPPool = class extends EventEmitter {
      constructor(options) {
        super();
        options = options || {};
        if (typeof options === "string") {
          options = {
            url: options
          };
        }
        let urlData;
        let service = options.service;
        if (typeof options.getSocket === "function") {
          this.getSocket = options.getSocket;
        }
        if (options.url) {
          urlData = shared.parseConnectionUrl(options.url);
          service = service || urlData.service;
        }
        this.options = shared.assign(false, options, urlData, service && wellKnown(service));
        this.options.maxConnections = this.options.maxConnections || 5;
        this.options.maxMessages = this.options.maxMessages || 100;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-pool"
        });
        let connection = new SMTPConnection(this.options);
        this.name = "SMTP (pool)";
        this.version = packageData.version + "[client:" + connection.version + "]";
        this._rateLimit = {
          counter: 0,
          timeout: null,
          waiting: [],
          checkpoint: false,
          delta: Number(this.options.rateDelta) || 1e3,
          limit: Number(this.options.rateLimit) || 0
        };
        this._closed = false;
        this._queue = [];
        this._connections = [];
        this._connectionCounter = 0;
        this.idling = true;
        setImmediate(() => {
          if (this.idling) {
            this.emit("idle");
          }
        });
      }
      getSocket(options, callback) {
        return setImmediate(() => callback(null, false));
      }
      send(mail, callback) {
        if (this._closed) {
          return false;
        }
        this._queue.push({
          mail,
          requeueAttempts: 0,
          callback
        });
        if (this.idling && this._queue.length >= this.options.maxConnections) {
          this.idling = false;
        }
        setImmediate(() => this._processMessages());
        return true;
      }
      close() {
        let connection;
        let len = this._connections.length;
        this._closed = true;
        clearTimeout(this._rateLimit.timeout);
        if (!len && !this._queue.length) {
          return;
        }
        for (let i = len - 1; i >= 0; i--) {
          if (this._connections[i] && this._connections[i].available) {
            connection = this._connections[i];
            connection.close();
            this.logger.info({
              tnx: "connection",
              cid: connection.id,
              action: "removed"
            }, "Connection #%s removed", connection.id);
          }
        }
        if (len && !this._connections.length) {
          this.logger.debug({
            tnx: "connection"
          }, "All connections removed");
        }
        if (!this._queue.length) {
          return;
        }
        let invokeCallbacks = () => {
          if (!this._queue.length) {
            this.logger.debug({
              tnx: "connection"
            }, "Pending queue entries cleared");
            return;
          }
          let entry = this._queue.shift();
          if (entry && typeof entry.callback === "function") {
            try {
              entry.callback(new Error("Connection pool was closed"));
            } catch (E) {
              this.logger.error({
                err: E,
                tnx: "callback",
                cid: connection.id
              }, "Callback error for #%s: %s", connection.id, E.message);
            }
          }
          setImmediate(invokeCallbacks);
        };
        setImmediate(invokeCallbacks);
      }
      _processMessages() {
        let connection;
        let i, len;
        if (this._closed) {
          return;
        }
        if (!this._queue.length) {
          if (!this.idling) {
            this.idling = true;
            this.emit("idle");
          }
          return;
        }
        for (i = 0, len = this._connections.length; i < len; i++) {
          if (this._connections[i].available) {
            connection = this._connections[i];
            break;
          }
        }
        if (!connection && this._connections.length < this.options.maxConnections) {
          connection = this._createConnection();
        }
        if (!connection) {
          this.idling = false;
          return;
        }
        if (!this.idling && this._queue.length < this.options.maxConnections) {
          this.idling = true;
          this.emit("idle");
        }
        let entry = connection.queueEntry = this._queue.shift();
        entry.messageId = (connection.queueEntry.mail.message.getHeader("message-id") || "").replace(/[<>\s]/g, "");
        connection.available = false;
        this.logger.debug({
          tnx: "pool",
          cid: connection.id,
          messageId: entry.messageId,
          action: "assign"
        }, "Assigned message <%s> to #%s (%s)", entry.messageId, connection.id, connection.messages + 1);
        if (this._rateLimit.limit) {
          this._rateLimit.counter++;
          if (!this._rateLimit.checkpoint) {
            this._rateLimit.checkpoint = Date.now();
          }
        }
        connection.send(entry.mail, (err, info) => {
          if (entry === connection.queueEntry) {
            try {
              entry.callback(err, info);
            } catch (E) {
              this.logger.error({
                err: E,
                tnx: "callback",
                cid: connection.id
              }, "Callback error for #%s: %s", connection.id, E.message);
            }
            connection.queueEntry = false;
          }
        });
      }
      _createConnection() {
        let connection = new PoolResource(this);
        connection.id = ++this._connectionCounter;
        this.logger.info({
          tnx: "pool",
          cid: connection.id,
          action: "conection"
        }, "Created new pool resource #%s", connection.id);
        connection.on("available", () => {
          this.logger.debug({
            tnx: "connection",
            cid: connection.id,
            action: "available"
          }, "Connection #%s became available", connection.id);
          if (this._closed) {
            this.close();
          } else {
            this._processMessages();
          }
        });
        connection.once("error", (err) => {
          if (err.code !== "EMAXLIMIT") {
            this.logger.error({
              err,
              tnx: "pool",
              cid: connection.id
            }, "Pool Error for #%s: %s", connection.id, err.message);
          } else {
            this.logger.debug({
              tnx: "pool",
              cid: connection.id,
              action: "maxlimit"
            }, "Max messages limit exchausted for #%s", connection.id);
          }
          if (connection.queueEntry) {
            try {
              connection.queueEntry.callback(err);
            } catch (E) {
              this.logger.error({
                err: E,
                tnx: "callback",
                cid: connection.id
              }, "Callback error for #%s: %s", connection.id, E.message);
            }
            connection.queueEntry = false;
          }
          this._removeConnection(connection);
          this._continueProcessing();
        });
        connection.once("close", () => {
          this.logger.info({
            tnx: "connection",
            cid: connection.id,
            action: "closed"
          }, "Connection #%s was closed", connection.id);
          this._removeConnection(connection);
          if (connection.queueEntry) {
            setTimeout(() => {
              if (connection.queueEntry) {
                if (this._shouldRequeuOnConnectionClose(connection.queueEntry)) {
                  this._requeueEntryOnConnectionClose(connection);
                } else {
                  this._failDeliveryOnConnectionClose(connection);
                }
              }
              this._continueProcessing();
            }, 50);
          } else {
            this._continueProcessing();
          }
        });
        this._connections.push(connection);
        return connection;
      }
      _shouldRequeuOnConnectionClose(queueEntry) {
        if (this.options.maxRequeues === void 0 || this.options.maxRequeues < 0) {
          return true;
        }
        return queueEntry.requeueAttempts < this.options.maxRequeues;
      }
      _failDeliveryOnConnectionClose(connection) {
        if (connection.queueEntry && connection.queueEntry.callback) {
          try {
            connection.queueEntry.callback(new Error("Reached maximum number of retries after connection was closed"));
          } catch (E) {
            this.logger.error({
              err: E,
              tnx: "callback",
              messageId: connection.queueEntry.messageId,
              cid: connection.id
            }, "Callback error for #%s: %s", connection.id, E.message);
          }
          connection.queueEntry = false;
        }
      }
      _requeueEntryOnConnectionClose(connection) {
        connection.queueEntry.requeueAttempts = connection.queueEntry.requeueAttempts + 1;
        this.logger.debug({
          tnx: "pool",
          cid: connection.id,
          messageId: connection.queueEntry.messageId,
          action: "requeue"
        }, "Re-queued message <%s> for #%s. Attempt: #%s", connection.queueEntry.messageId, connection.id, connection.queueEntry.requeueAttempts);
        this._queue.unshift(connection.queueEntry);
        connection.queueEntry = false;
      }
      _continueProcessing() {
        if (this._closed) {
          this.close();
        } else {
          setTimeout(() => this._processMessages(), 100);
        }
      }
      _removeConnection(connection) {
        let index = this._connections.indexOf(connection);
        if (index !== -1) {
          this._connections.splice(index, 1);
        }
      }
      _checkRateLimit(callback) {
        if (!this._rateLimit.limit) {
          return callback();
        }
        let now = Date.now();
        if (this._rateLimit.counter < this._rateLimit.limit) {
          return callback();
        }
        this._rateLimit.waiting.push(callback);
        if (this._rateLimit.checkpoint <= now - this._rateLimit.delta) {
          return this._clearRateLimit();
        } else if (!this._rateLimit.timeout) {
          this._rateLimit.timeout = setTimeout(() => this._clearRateLimit(), this._rateLimit.delta - (now - this._rateLimit.checkpoint));
          this._rateLimit.checkpoint = now;
        }
      }
      _clearRateLimit() {
        clearTimeout(this._rateLimit.timeout);
        this._rateLimit.timeout = null;
        this._rateLimit.counter = 0;
        this._rateLimit.checkpoint = false;
        while (this._rateLimit.waiting.length) {
          let cb = this._rateLimit.waiting.shift();
          setImmediate(cb);
        }
      }
      isIdle() {
        return this.idling;
      }
      verify(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        let auth = new PoolResource(this).auth;
        this.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let options = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info({
              tnx: "proxy",
              remoteAddress: socketOptions.connection.remoteAddress,
              remotePort: socketOptions.connection.remotePort,
              destHost: options.host || "",
              destPort: options.port || "",
              action: "connected"
            }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
            options = shared.assign(false, options);
            Object.keys(socketOptions).forEach((key) => {
              options[key] = socketOptions[key];
            });
          }
          let connection = new SMTPConnection(options);
          let returned = false;
          connection.once("error", (err2) => {
            if (returned) {
              return;
            }
            returned = true;
            connection.close();
            return callback(err2);
          });
          connection.once("end", () => {
            if (returned) {
              return;
            }
            returned = true;
            return callback(new Error("Connection closed"));
          });
          let finalize = () => {
            if (returned) {
              return;
            }
            returned = true;
            connection.quit();
            return callback(null, true);
          };
          connection.connect(() => {
            if (returned) {
              return;
            }
            if (auth && (connection.allowsAuth || options.forceAuth)) {
              connection.login(auth, (err2) => {
                if (returned) {
                  return;
                }
                if (err2) {
                  returned = true;
                  connection.close();
                  return callback(err2);
                }
                finalize();
              });
            } else if (!auth && connection.allowsAuth && options.forceAuth) {
              let err2 = new Error("Authentication info was not provided");
              err2.code = "NoAuth";
              returned = true;
              connection.close();
              return callback(err2);
            } else {
              finalize();
            }
          });
        });
        return promise;
      }
    };
    module2.exports = SMTPPool;
  }
});

// node_modules/nodemailer/lib/smtp-transport/index.js
var require_smtp_transport = __commonJS({
  "node_modules/nodemailer/lib/smtp-transport/index.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var SMTPConnection = require_smtp_connection();
    var wellKnown = require_well_known();
    var shared = require_shared();
    var XOAuth2 = require_xoauth2();
    var packageData = require_package();
    var SMTPTransport = class extends EventEmitter {
      constructor(options) {
        super();
        options = options || {};
        if (typeof options === "string") {
          options = {
            url: options
          };
        }
        let urlData;
        let service = options.service;
        if (typeof options.getSocket === "function") {
          this.getSocket = options.getSocket;
        }
        if (options.url) {
          urlData = shared.parseConnectionUrl(options.url);
          service = service || urlData.service;
        }
        this.options = shared.assign(false, options, urlData, service && wellKnown(service));
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-transport"
        });
        let connection = new SMTPConnection(this.options);
        this.name = "SMTP";
        this.version = packageData.version + "[client:" + connection.version + "]";
        if (this.options.auth) {
          this.auth = this.getAuth({});
        }
      }
      getSocket(options, callback) {
        return setImmediate(() => callback(null, false));
      }
      getAuth(authOpts) {
        if (!authOpts) {
          return this.auth;
        }
        let hasAuth = false;
        let authData = {};
        if (this.options.auth && typeof this.options.auth === "object") {
          Object.keys(this.options.auth).forEach((key) => {
            hasAuth = true;
            authData[key] = this.options.auth[key];
          });
        }
        if (authOpts && typeof authOpts === "object") {
          Object.keys(authOpts).forEach((key) => {
            hasAuth = true;
            authData[key] = authOpts[key];
          });
        }
        if (!hasAuth) {
          return false;
        }
        switch ((authData.type || "").toString().toUpperCase()) {
          case "OAUTH2": {
            if (!authData.service && !authData.user) {
              return false;
            }
            let oauth2 = new XOAuth2(authData, this.logger);
            oauth2.provisionCallback = this.mailer && this.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
            oauth2.on("token", (token) => this.mailer.emit("token", token));
            oauth2.on("error", (err) => this.emit("error", err));
            return {
              type: "OAUTH2",
              user: authData.user,
              oauth2,
              method: "XOAUTH2"
            };
          }
          default:
            return {
              type: (authData.type || "").toString().toUpperCase() || "LOGIN",
              user: authData.user,
              credentials: {
                user: authData.user || "",
                pass: authData.pass,
                options: authData.options
              },
              method: (authData.method || "").trim().toUpperCase() || this.options.authMethod || false
            };
        }
      }
      send(mail, callback) {
        this.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let returned = false;
          let options = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info({
              tnx: "proxy",
              remoteAddress: socketOptions.connection.remoteAddress,
              remotePort: socketOptions.connection.remotePort,
              destHost: options.host || "",
              destPort: options.port || "",
              action: "connected"
            }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
            options = shared.assign(false, options);
            Object.keys(socketOptions).forEach((key) => {
              options[key] = socketOptions[key];
            });
          }
          let connection = new SMTPConnection(options);
          connection.once("error", (err2) => {
            if (returned) {
              return;
            }
            returned = true;
            connection.close();
            return callback(err2);
          });
          connection.once("end", () => {
            if (returned) {
              return;
            }
            let timer = setTimeout(() => {
              if (returned) {
                return;
              }
              returned = true;
              let err2 = new Error("Unexpected socket close");
              if (connection && connection._socket && connection._socket.upgrading) {
                err2.code = "ETLS";
              }
              callback(err2);
            }, 1e3);
            try {
              timer.unref();
            } catch (E) {
            }
          });
          let sendMessage = () => {
            let envelope = mail.message.getEnvelope();
            let messageId = mail.message.messageId();
            let recipients = [].concat(envelope.to || []);
            if (recipients.length > 3) {
              recipients.push("...and " + recipients.splice(2).length + " more");
            }
            if (mail.data.dsn) {
              envelope.dsn = mail.data.dsn;
            }
            this.logger.info({
              tnx: "send",
              messageId
            }, "Sending message %s to <%s>", messageId, recipients.join(", "));
            connection.send(envelope, mail.message.createReadStream(), (err2, info) => {
              returned = true;
              connection.close();
              if (err2) {
                this.logger.error({
                  err: err2,
                  tnx: "send"
                }, "Send error for %s: %s", messageId, err2.message);
                return callback(err2);
              }
              info.envelope = {
                from: envelope.from,
                to: envelope.to
              };
              info.messageId = messageId;
              try {
                return callback(null, info);
              } catch (E) {
                this.logger.error({
                  err: E,
                  tnx: "callback"
                }, "Callback error for %s: %s", messageId, E.message);
              }
            });
          };
          connection.connect(() => {
            if (returned) {
              return;
            }
            let auth = this.getAuth(mail.data.auth);
            if (auth && (connection.allowsAuth || options.forceAuth)) {
              connection.login(auth, (err2) => {
                if (auth && auth !== this.auth && auth.oauth2) {
                  auth.oauth2.removeAllListeners();
                }
                if (returned) {
                  return;
                }
                if (err2) {
                  returned = true;
                  connection.close();
                  return callback(err2);
                }
                sendMessage();
              });
            } else {
              sendMessage();
            }
          });
        });
      }
      verify(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        this.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let options = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info({
              tnx: "proxy",
              remoteAddress: socketOptions.connection.remoteAddress,
              remotePort: socketOptions.connection.remotePort,
              destHost: options.host || "",
              destPort: options.port || "",
              action: "connected"
            }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
            options = shared.assign(false, options);
            Object.keys(socketOptions).forEach((key) => {
              options[key] = socketOptions[key];
            });
          }
          let connection = new SMTPConnection(options);
          let returned = false;
          connection.once("error", (err2) => {
            if (returned) {
              return;
            }
            returned = true;
            connection.close();
            return callback(err2);
          });
          connection.once("end", () => {
            if (returned) {
              return;
            }
            returned = true;
            return callback(new Error("Connection closed"));
          });
          let finalize = () => {
            if (returned) {
              return;
            }
            returned = true;
            connection.quit();
            return callback(null, true);
          };
          connection.connect(() => {
            if (returned) {
              return;
            }
            let authData = this.getAuth({});
            if (authData && (connection.allowsAuth || options.forceAuth)) {
              connection.login(authData, (err2) => {
                if (returned) {
                  return;
                }
                if (err2) {
                  returned = true;
                  connection.close();
                  return callback(err2);
                }
                finalize();
              });
            } else if (!authData && connection.allowsAuth && options.forceAuth) {
              let err2 = new Error("Authentication info was not provided");
              err2.code = "NoAuth";
              returned = true;
              connection.close();
              return callback(err2);
            } else {
              finalize();
            }
          });
        });
        return promise;
      }
      close() {
        if (this.auth && this.auth.oauth2) {
          this.auth.oauth2.removeAllListeners();
        }
        this.emit("close");
      }
    };
    module2.exports = SMTPTransport;
  }
});

// node_modules/nodemailer/lib/sendmail-transport/index.js
var require_sendmail_transport = __commonJS({
  "node_modules/nodemailer/lib/sendmail-transport/index.js"(exports, module2) {
    "use strict";
    var spawn = require("child_process").spawn;
    var packageData = require_package();
    var shared = require_shared();
    var SendmailTransport = class {
      constructor(options) {
        options = options || {};
        this._spawn = spawn;
        this.options = options || {};
        this.name = "Sendmail";
        this.version = packageData.version;
        this.path = "sendmail";
        this.args = false;
        this.winbreak = false;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "sendmail"
        });
        if (options) {
          if (typeof options === "string") {
            this.path = options;
          } else if (typeof options === "object") {
            if (options.path) {
              this.path = options.path;
            }
            if (Array.isArray(options.args)) {
              this.args = options.args;
            }
            this.winbreak = ["win", "windows", "dos", "\r\n"].includes((options.newline || "").toString().toLowerCase());
          }
        }
      }
      send(mail, done) {
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let args;
        let sendmail;
        let returned;
        const hasInvalidAddresses = [].concat(envelope.from || []).concat(envelope.to || []).some((addr) => /^-/.test(addr));
        if (hasInvalidAddresses) {
          return done(new Error("Can not send mail. Invalid envelope addresses."));
        }
        if (this.args) {
          args = ["-i"].concat(this.args).concat(envelope.to);
        } else {
          args = ["-i"].concat(envelope.from ? ["-f", envelope.from] : []).concat(envelope.to);
        }
        let callback = (err) => {
          if (returned) {
            return;
          }
          returned = true;
          if (typeof done === "function") {
            if (err) {
              return done(err);
            } else {
              return done(null, {
                envelope: mail.data.envelope || mail.message.getEnvelope(),
                messageId,
                response: "Messages queued for delivery"
              });
            }
          }
        };
        try {
          sendmail = this._spawn(this.path, args);
        } catch (E) {
          this.logger.error({
            err: E,
            tnx: "spawn",
            messageId
          }, "Error occurred while spawning sendmail. %s", E.message);
          return callback(E);
        }
        if (sendmail) {
          sendmail.on("error", (err) => {
            this.logger.error({
              err,
              tnx: "spawn",
              messageId
            }, "Error occurred when sending message %s. %s", messageId, err.message);
            callback(err);
          });
          sendmail.once("exit", (code) => {
            if (!code) {
              return callback();
            }
            let err;
            if (code === 127) {
              err = new Error("Sendmail command not found, process exited with code " + code);
            } else {
              err = new Error("Sendmail exited with code " + code);
            }
            this.logger.error({
              err,
              tnx: "stdin",
              messageId
            }, "Error sending message %s to sendmail. %s", messageId, err.message);
            callback(err);
          });
          sendmail.once("close", callback);
          sendmail.stdin.on("error", (err) => {
            this.logger.error({
              err,
              tnx: "stdin",
              messageId
            }, "Error occurred when piping message %s to sendmail. %s", messageId, err.message);
            callback(err);
          });
          let recipients = [].concat(envelope.to || []);
          if (recipients.length > 3) {
            recipients.push("...and " + recipients.splice(2).length + " more");
          }
          this.logger.info({
            tnx: "send",
            messageId
          }, "Sending message %s to <%s>", messageId, recipients.join(", "));
          let sourceStream = mail.message.createReadStream();
          sourceStream.once("error", (err) => {
            this.logger.error({
              err,
              tnx: "stdin",
              messageId
            }, "Error occurred when generating message %s. %s", messageId, err.message);
            sendmail.kill("SIGINT");
            callback(err);
          });
          sourceStream.pipe(sendmail.stdin);
        } else {
          return callback(new Error("sendmail was not found"));
        }
      }
    };
    module2.exports = SendmailTransport;
  }
});

// node_modules/nodemailer/lib/stream-transport/index.js
var require_stream_transport = __commonJS({
  "node_modules/nodemailer/lib/stream-transport/index.js"(exports, module2) {
    "use strict";
    var packageData = require_package();
    var shared = require_shared();
    var StreamTransport = class {
      constructor(options) {
        options = options || {};
        this.options = options || {};
        this.name = "StreamTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "stream-transport"
        });
        this.winbreak = ["win", "windows", "dos", "\r\n"].includes((options.newline || "").toString().toLowerCase());
      }
      send(mail, done) {
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info({
          tnx: "send",
          messageId
        }, "Sending message %s to <%s> using %s line breaks", messageId, recipients.join(", "), this.winbreak ? "<CR><LF>" : "<LF>");
        setImmediate(() => {
          let stream;
          try {
            stream = mail.message.createReadStream();
          } catch (E) {
            this.logger.error({
              err: E,
              tnx: "send",
              messageId
            }, "Creating send stream failed for %s. %s", messageId, E.message);
            return done(E);
          }
          if (!this.options.buffer) {
            stream.once("error", (err) => {
              this.logger.error({
                err,
                tnx: "send",
                messageId
              }, "Failed creating message for %s. %s", messageId, err.message);
            });
            return done(null, {
              envelope: mail.data.envelope || mail.message.getEnvelope(),
              messageId,
              message: stream
            });
          }
          let chunks = [];
          let chunklen = 0;
          stream.on("readable", () => {
            let chunk;
            while ((chunk = stream.read()) !== null) {
              chunks.push(chunk);
              chunklen += chunk.length;
            }
          });
          stream.once("error", (err) => {
            this.logger.error({
              err,
              tnx: "send",
              messageId
            }, "Failed creating message for %s. %s", messageId, err.message);
            return done(err);
          });
          stream.on("end", () => done(null, {
            envelope: mail.data.envelope || mail.message.getEnvelope(),
            messageId,
            message: Buffer.concat(chunks, chunklen)
          }));
        });
      }
    };
    module2.exports = StreamTransport;
  }
});

// node_modules/nodemailer/lib/json-transport/index.js
var require_json_transport = __commonJS({
  "node_modules/nodemailer/lib/json-transport/index.js"(exports, module2) {
    "use strict";
    var packageData = require_package();
    var shared = require_shared();
    var JSONTransport = class {
      constructor(options) {
        options = options || {};
        this.options = options || {};
        this.name = "JSONTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "json-transport"
        });
      }
      send(mail, done) {
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info({
          tnx: "send",
          messageId
        }, "Composing JSON structure of %s to <%s>", messageId, recipients.join(", "));
        setImmediate(() => {
          mail.normalize((err, data) => {
            if (err) {
              this.logger.error({
                err,
                tnx: "send",
                messageId
              }, "Failed building JSON structure for %s. %s", messageId, err.message);
              return done(err);
            }
            delete data.envelope;
            delete data.normalizedHeaders;
            return done(null, {
              envelope,
              messageId,
              message: this.options.skipEncoding ? data : JSON.stringify(data)
            });
          });
        });
      }
    };
    module2.exports = JSONTransport;
  }
});

// node_modules/nodemailer/lib/ses-transport/index.js
var require_ses_transport = __commonJS({
  "node_modules/nodemailer/lib/ses-transport/index.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var packageData = require_package();
    var shared = require_shared();
    var LeWindows = require_le_windows();
    var SESTransport = class extends EventEmitter {
      constructor(options) {
        super();
        options = options || {};
        this.options = options || {};
        this.ses = this.options.SES;
        this.name = "SESTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "ses-transport"
        });
        this.maxConnections = Number(this.options.maxConnections) || Infinity;
        this.connections = 0;
        this.sendingRate = Number(this.options.sendingRate) || Infinity;
        this.sendingRateTTL = null;
        this.rateInterval = 1e3;
        this.rateMessages = [];
        this.pending = [];
        this.idling = true;
        setImmediate(() => {
          if (this.idling) {
            this.emit("idle");
          }
        });
      }
      send(mail, callback) {
        if (this.connections >= this.maxConnections) {
          this.idling = false;
          return this.pending.push({
            mail,
            callback
          });
        }
        if (!this._checkSendingRate()) {
          this.idling = false;
          return this.pending.push({
            mail,
            callback
          });
        }
        this._send(mail, (...args) => {
          setImmediate(() => callback(...args));
          this._sent();
        });
      }
      _checkRatedQueue() {
        if (this.connections >= this.maxConnections || !this._checkSendingRate()) {
          return;
        }
        if (!this.pending.length) {
          if (!this.idling) {
            this.idling = true;
            this.emit("idle");
          }
          return;
        }
        let next = this.pending.shift();
        this._send(next.mail, (...args) => {
          setImmediate(() => next.callback(...args));
          this._sent();
        });
      }
      _checkSendingRate() {
        clearTimeout(this.sendingRateTTL);
        let now = Date.now();
        let oldest = false;
        for (let i = this.rateMessages.length - 1; i >= 0; i--) {
          if (this.rateMessages[i].ts >= now - this.rateInterval && (!oldest || this.rateMessages[i].ts < oldest)) {
            oldest = this.rateMessages[i].ts;
          }
          if (this.rateMessages[i].ts < now - this.rateInterval && !this.rateMessages[i].pending) {
            this.rateMessages.splice(i, 1);
          }
        }
        if (this.rateMessages.length < this.sendingRate) {
          return true;
        }
        let delay = Math.max(oldest + 1001, now + 20);
        this.sendingRateTTL = setTimeout(() => this._checkRatedQueue(), now - delay);
        try {
          this.sendingRateTTL.unref();
        } catch (E) {
        }
        return false;
      }
      _sent() {
        this.connections--;
        this._checkRatedQueue();
      }
      isIdle() {
        return this.idling;
      }
      _send(mail, callback) {
        let statObject = {
          ts: Date.now(),
          pending: true
        };
        this.connections++;
        this.rateMessages.push(statObject);
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info({
          tnx: "send",
          messageId
        }, "Sending message %s to <%s>", messageId, recipients.join(", "));
        let getRawMessage = (next) => {
          if (!mail.data._dkim) {
            mail.data._dkim = {};
          }
          if (mail.data._dkim.skipFields && typeof mail.data._dkim.skipFields === "string") {
            mail.data._dkim.skipFields += ":date:message-id";
          } else {
            mail.data._dkim.skipFields = "date:message-id";
          }
          let sourceStream = mail.message.createReadStream();
          let stream = sourceStream.pipe(new LeWindows());
          let chunks = [];
          let chunklen = 0;
          stream.on("readable", () => {
            let chunk;
            while ((chunk = stream.read()) !== null) {
              chunks.push(chunk);
              chunklen += chunk.length;
            }
          });
          sourceStream.once("error", (err) => stream.emit("error", err));
          stream.once("error", (err) => {
            next(err);
          });
          stream.once("end", () => next(null, Buffer.concat(chunks, chunklen)));
        };
        setImmediate(() => getRawMessage((err, raw) => {
          if (err) {
            this.logger.error({
              err,
              tnx: "send",
              messageId
            }, "Failed creating message for %s. %s", messageId, err.message);
            statObject.pending = false;
            return callback(err);
          }
          let sesMessage = {
            RawMessage: {
              Data: raw
            },
            Source: envelope.from,
            Destinations: envelope.to
          };
          Object.keys(mail.data.ses || {}).forEach((key) => {
            sesMessage[key] = mail.data.ses[key];
          });
          let ses = (this.ses.aws ? this.ses.ses : this.ses) || {};
          let aws = this.ses.aws || {};
          let getRegion = (cb) => {
            if (ses.config && typeof ses.config.region === "function") {
              return ses.config.region().then((region) => cb(null, region)).catch((err2) => cb(err2));
            }
            return cb(null, ses.config && ses.config.region || "us-east-1");
          };
          getRegion((err2, region) => {
            if (err2 || !region) {
              region = "us-east-1";
            }
            let sendPromise;
            if (typeof ses.send === "function" && aws.SendRawEmailCommand) {
              sendPromise = ses.send(new aws.SendRawEmailCommand(sesMessage));
            } else {
              sendPromise = ses.sendRawEmail(sesMessage).promise();
            }
            sendPromise.then((data) => {
              if (region === "us-east-1") {
                region = "email";
              }
              statObject.pending = false;
              callback(null, {
                envelope: {
                  from: envelope.from,
                  to: envelope.to
                },
                messageId: "<" + data.MessageId + (!/@/.test(data.MessageId) ? "@" + region + ".amazonses.com" : "") + ">",
                response: data.MessageId,
                raw
              });
            }).catch((err3) => {
              this.logger.error({
                err: err3,
                tnx: "send"
              }, "Send error for %s: %s", messageId, err3.message);
              statObject.pending = false;
              callback(err3);
            });
          });
        }));
      }
      verify(callback) {
        let promise;
        let ses = (this.ses.aws ? this.ses.ses : this.ses) || {};
        let aws = this.ses.aws || {};
        const sesMessage = {
          RawMessage: {
            Data: "From: invalid@invalid\r\nTo: invalid@invalid\r\n Subject: Invalid\r\n\r\nInvalid"
          },
          Source: "invalid@invalid",
          Destinations: ["invalid@invalid"]
        };
        if (!callback) {
          promise = new Promise((resolve, reject) => {
            callback = shared.callbackPromise(resolve, reject);
          });
        }
        const cb = (err) => {
          if (err && (err.code || err.Code) !== "InvalidParameterValue") {
            return callback(err);
          }
          return callback(null, true);
        };
        if (typeof ses.send === "function" && aws.SendRawEmailCommand) {
          sesMessage.RawMessage.Data = Buffer.from(sesMessage.RawMessage.Data);
          ses.send(new aws.SendRawEmailCommand(sesMessage), cb);
        } else {
          ses.sendRawEmail(sesMessage, cb);
        }
        return promise;
      }
    };
    module2.exports = SESTransport;
  }
});

// node_modules/nodemailer/lib/nodemailer.js
var require_nodemailer = __commonJS({
  "node_modules/nodemailer/lib/nodemailer.js"(exports, module2) {
    "use strict";
    var Mailer = require_mailer();
    var shared = require_shared();
    var SMTPPool = require_smtp_pool();
    var SMTPTransport = require_smtp_transport();
    var SendmailTransport = require_sendmail_transport();
    var StreamTransport = require_stream_transport();
    var JSONTransport = require_json_transport();
    var SESTransport = require_ses_transport();
    var nmfetch = require_fetch();
    var packageData = require_package();
    var ETHEREAL_API = (process.env.ETHEREAL_API || "https://api.nodemailer.com").replace(/\/+$/, "");
    var ETHEREAL_WEB = (process.env.ETHEREAL_WEB || "https://ethereal.email").replace(/\/+$/, "");
    var ETHEREAL_CACHE = ["true", "yes", "y", "1"].includes((process.env.ETHEREAL_CACHE || "yes").toString().trim().toLowerCase());
    var testAccount = false;
    module2.exports.createTransport = function(transporter, defaults) {
      let urlConfig;
      let options;
      let mailer;
      if (typeof transporter === "object" && typeof transporter.send !== "function" || typeof transporter === "string" && /^(smtps?|direct):/i.test(transporter)) {
        if (urlConfig = typeof transporter === "string" ? transporter : transporter.url) {
          options = shared.parseConnectionUrl(urlConfig);
        } else {
          options = transporter;
        }
        if (options.pool) {
          transporter = new SMTPPool(options);
        } else if (options.sendmail) {
          transporter = new SendmailTransport(options);
        } else if (options.streamTransport) {
          transporter = new StreamTransport(options);
        } else if (options.jsonTransport) {
          transporter = new JSONTransport(options);
        } else if (options.SES) {
          transporter = new SESTransport(options);
        } else {
          transporter = new SMTPTransport(options);
        }
      }
      mailer = new Mailer(transporter, options, defaults);
      return mailer;
    };
    module2.exports.createTestAccount = function(apiUrl, callback) {
      let promise;
      if (!callback && typeof apiUrl === "function") {
        callback = apiUrl;
        apiUrl = false;
      }
      if (!callback) {
        promise = new Promise((resolve, reject) => {
          callback = shared.callbackPromise(resolve, reject);
        });
      }
      if (ETHEREAL_CACHE && testAccount) {
        setImmediate(() => callback(null, testAccount));
        return promise;
      }
      apiUrl = apiUrl || ETHEREAL_API;
      let chunks = [];
      let chunklen = 0;
      let req = nmfetch(apiUrl + "/user", {
        contentType: "application/json",
        method: "POST",
        body: Buffer.from(JSON.stringify({
          requestor: packageData.name,
          version: packageData.version
        }))
      });
      req.on("readable", () => {
        let chunk;
        while ((chunk = req.read()) !== null) {
          chunks.push(chunk);
          chunklen += chunk.length;
        }
      });
      req.once("error", (err) => callback(err));
      req.once("end", () => {
        let res = Buffer.concat(chunks, chunklen);
        let data;
        let err;
        try {
          data = JSON.parse(res.toString());
        } catch (E) {
          err = E;
        }
        if (err) {
          return callback(err);
        }
        if (data.status !== "success" || data.error) {
          return callback(new Error(data.error || "Request failed"));
        }
        delete data.status;
        testAccount = data;
        callback(null, testAccount);
      });
      return promise;
    };
    module2.exports.getTestMessageUrl = function(info) {
      if (!info || !info.response) {
        return false;
      }
      let infoProps = /* @__PURE__ */ new Map();
      info.response.replace(/\[([^\]]+)\]$/, (m, props) => {
        props.replace(/\b([A-Z0-9]+)=([^\s]+)/g, (m2, key, value) => {
          infoProps.set(key, value);
        });
      });
      if (infoProps.has("STATUS") && infoProps.has("MSGID")) {
        return (testAccount.web || ETHEREAL_WEB) + "/message/" + infoProps.get("MSGID");
      }
      return false;
    };
  }
});

// src/utils/system/xindongli.ts
var import_axios = __toESM(require_axios2());

// src/utils/system/login-service.ts
var SystemService = class {
  constructor() {
  }
  login(...data) {
    return __async(this, null, function* () {
    });
  }
};

// src/utils/system/xindongli.ts
var baseUrl = process.env.XINDONGLI_URL;
var Xindongli = class extends SystemService {
  login(email2, passwd) {
    return __async(this, null, function* () {
      if (!email2 || !passwd) {
        throw new Error('\u6CA1\u6709\u8BBE\u7F6E"XINDONGLI_USERNAME"\u6216"XINDONGLI_PASSWORD"\uFF0C\u8BF7\u8BBE\u7F6E\u540E\u91CD\u8BD5');
      }
      const url = `${baseUrl}/auth/login`;
      const response = yield import_axios.default.post(url, {
        email: email2,
        passwd,
        code: ""
      });
      const { data } = response;
      if (data.ret !== 1) {
        console.error(data.msg);
        throw new Error(`\u767B\u5F55\u5931\u8D25: ${data.msg || "-"}`);
      }
      return response;
    });
  }
  checkin(cookie) {
    return __async(this, null, function* () {
      const url = `${baseUrl}/user/checkin`;
      const config = {
        method: "POST",
        headers: {
          Cookie: cookie
        }
      };
      const { data } = yield import_axios.default.post(url, void 0, config);
      if (data.ret !== 1) {
        throw new Error(data.msg);
      }
      return data;
    });
  }
};

// src/index.ts
var import_await_to_js = __toESM(require_await_to_js_umd());

// src/utils/log/email.ts
var import_nodemailer = __toESM(require_nodemailer());

// src/config/index.ts
var email = {
  user: process.env.MAIL_SENDER,
  pass: process.env.SMTP_PASSWORD,
  host: process.env.MAIL_HOST_SENDER || "smtp.qq.com",
  port: process.env.MAIL_PORT_SENDER || "465",
  to: process.env.MAIL_RECIPIENT
};

// src/utils/log/log-service.ts
var LogService = class {
  constructor() {
    this.isValidate = false;
  }
  log(...data) {
    return __async(this, null, function* () {
    });
  }
  error(...data) {
    return __async(this, null, function* () {
    });
  }
  sendMessage(...data) {
    return __async(this, null, function* () {
    });
  }
};

// src/utils/log/email.ts
var EmailService = class extends LogService {
  constructor() {
    super();
    this.isValidate = !!(email.host && email.port && email.user && email.pass && email.to);
  }
  log(...data) {
    return __async(this, null, function* () {
      console.log("email log:", ...data);
    });
  }
  error(...data) {
    return __async(this, null, function* () {
      console.error("email error:", ...data);
    });
  }
  sendMessage(content) {
    return __async(this, null, function* () {
      if (!this.isValidate)
        return;
      const transporter = yield (0, import_nodemailer.createTransport)({
        host: email.host,
        port: Number(email.port),
        secure: Number(email.port) === 465,
        auth: {
          user: email.user,
          pass: email.pass
        }
      });
      yield transporter.sendMail({
        from: `schedule_jobs <${email.user}>`,
        to: email.to,
        subject: "schedule_job\u5B8C\u6210\u60C5\u51B5",
        html: this.assembledText(content)
      });
    });
  }
  assembledText(content) {
    if (Array.isArray(content)) {
      const html = [];
      content.forEach((text) => {
        html.push(`<p>${text}</p>`);
      });
      return `<div>${html.join("")}</div>`;
    } else if (typeof content === "string") {
      return content;
    }
  }
};
var email_default = new EmailService();

// src/utils/log/index.ts
var services = [email_default];
var log_default = services;

// src/index.ts
function main() {
  return __async(this, null, function* () {
    let res = [];
    const [err, res1] = yield (0, import_await_to_js.default)(xindongli());
    if (err)
      res.push(...err.message ? ["\u65B0\u52A8\u529B\u7B7E\u5230\u5931\u8D25", err.message] : []);
    else
      res.push(...(res1 == null ? void 0 : res1.msg) ? ["\u65B0\u52A8\u529B\u7B7E\u5230\u6210\u529F", res1.msg] : []);
    for (let logService of log_default) {
      const [logServiceError] = yield (0, import_await_to_js.default)(logService.sendMessage(res));
      if (logServiceError)
        yield logService.error(logServiceError);
    }
  });
}
function xindongli() {
  return __async(this, null, function* () {
    const xindongli2 = new Xindongli();
    const res = yield xindongli2.login(process.env.XINDONGLI_USERNAME, process.env.XINDONGLI_PASSWORD);
    const { headers } = res;
    const cookies = headers["set-cookie"];
    const formatCookies = cookies == null ? void 0 : cookies.map((cookie) => {
      return cookie.split(";")[0];
    }).join(";");
    if (formatCookies)
      return yield xindongli2.checkin(formatCookies);
  });
}
main();
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
