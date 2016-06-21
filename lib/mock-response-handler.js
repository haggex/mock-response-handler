(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("es6-shim"));
	else if(typeof define === 'function' && define.amd)
		define("mock-response-handler", ["es6-shim"], factory);
	else if(typeof exports === 'object')
		exports["mock-response-handler"] = factory(require("es6-shim"));
	else
		root["mock-response-handler"] = factory(root["es6-shim"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _MockServerApiUtils = __webpack_require__(1);
	
	var _ResponseHandler = __webpack_require__(3);
	
	module.exports = {
	    MockServerApi: _MockServerApiUtils.MockServerApi,
	    ResponseHandler: _ResponseHandler.ResponseHandler
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MockApiRequest = exports.HttpProvider = exports.MockServerApi = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(2);
	
	var _ResponseHandler = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MockServerApi = exports.MockServerApi = function () {
	    function MockServerApi(http, serverUrl, adminPath, mockApiPath) {
	        _classCallCheck(this, MockServerApi);
	
	        this.http = http;
	        this.serverUrl = serverUrl;
	        this.adminPath = adminPath;
	        this.mockApiPath = mockApiPath;
	    }
	
	    _createClass(MockServerApi, [{
	        key: "mockApiRequest",
	        value: function mockApiRequest() {
	            return new MockApiRequest(this.http, this.serverUrl, this.adminPath, this.mockApiPath);
	        }
	    }, {
	        key: "getResponses",
	        value: function getResponses(path, method, status) {
	            return this.http.doPost(this.serverUrl + this.adminPath + "/list", {
	                path: path,
	                method: method,
	                status: status
	            });
	        }
	    }, {
	        key: "reset",
	        value: function reset() {
	            var _this = this;
	
	            return new Promise(function (resolve, reject) {
	                var url = _this.serverUrl + _this.adminPath + "/reset";
	                _this.http.doGet(url, {
	                    "Content-Type": "application/json"
	                }).then(function () {
	                    resolve();
	                }).catch(function (err) {
	                    reject(err);
	                });
	            });
	        }
	    }]);
	
	    return MockServerApi;
	}();
	
	var HttpProvider = exports.HttpProvider = function () {
	    function HttpProvider() {
	        _classCallCheck(this, HttpProvider);
	    }
	
	    _createClass(HttpProvider, [{
	        key: "doGet",
	        value: function doGet(url, headers) {}
	    }, {
	        key: "doPost",
	        value: function doPost(url, entity, headers) {}
	    }]);
	
	    return HttpProvider;
	}();
	
	var MockApiRequest = function () {
	    function MockApiRequest(http, serverUrl, adminPath, mockApiPath, pathResponse) {
	        _classCallCheck(this, MockApiRequest);
	
	        this.http = http;
	        this.serverUrl = serverUrl;
	        this.adminPath = adminPath;
	        this.mockApiPath = mockApiPath;
	        if (typeof pathResponse == "undefined") {
	            this.pathResponse = new _ResponseHandler.PathResponse();
	        } else {
	            this.pathResponse = pathResponse;
	        }
	    }
	
	    _createClass(MockApiRequest, [{
	        key: "_clone",
	        value: function _clone(pathResponse) {
	            return new MockApiRequest(this.http, this.serverUrl, this.adminPath, this.mockApiPath, pathResponse);
	        }
	    }, {
	        key: "path",
	        value: function path(_path) {
	            return this._clone(this.pathResponse.setPath(_path));
	        }
	    }, {
	        key: "method",
	        value: function method(_method) {
	            return this._clone(this.pathResponse.setMethod(_method));
	        }
	    }, {
	        key: "status",
	        value: function status(_status) {
	            return this._clone(this.pathResponse.setResponseHttpStatus(_status));
	        }
	    }, {
	        key: "body",
	        value: function body(_body) {
	            return this._clone(this.pathResponse.setResponseBody(_body));
	        }
	    }, {
	        key: "headers",
	        value: function headers(_headers) {
	            return this._clone(this.pathResponse.setResponseHeaders(_headers));
	        }
	    }, {
	        key: "execute",
	        value: function execute() {
	            var _this2 = this;
	
	            this._verify();
	            return new Promise(function (resolve, reject) {
	                var url = _this2.serverUrl + _this2.adminPath + "/add";
	                _this2.http.doPost(url, _this2.pathResponse, {
	                    "Content-Type": "application/json"
	                }).then(function (response) {
	                    resolve({ pathResponse: _this2.pathResponse, url: _this2.serverUrl + _this2.mockApiPath + _this2.pathResponse.path });
	                }).catch(function (err) {
	                    reject(err);
	                });
	            });
	        }
	    }, {
	        key: "_verify",
	        value: function _verify() {
	            if (!this.pathResponse.path) {
	                throw new Error("Path is required, use path()");
	            }
	            if (!this.pathResponse.method) {
	                throw new Error("Method is required, use method()");
	            }
	            if (!this.pathResponse.responseHttpStatus) {
	                throw new Error("Status is required, use status()");
	            }
	        }
	    }]);

	    return MockApiRequest;
	}();

	exports.MockApiRequest = MockApiRequest;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PathResponse = exports.PathResponse = function () {
	    function PathResponse(path, method, status, body, headers) {
	        _classCallCheck(this, PathResponse);
	
	        this.path = path;
	        this.method = method;
	        this.responseHttpStatus = status;
	        this.responseBody = body;
	        this.responseHeaders = headers;
	        this.requests = [];
	    }
	
	    _createClass(PathResponse, [{
	        key: "setPath",
	        value: function setPath(path) {
	            return new PathResponse(path, this.method, this.responseHttpStatus, this.responseBody, this.responseHeaders);
	        }
	    }, {
	        key: "setMethod",
	        value: function setMethod(method) {
	            return new PathResponse(this.path, method, this.responseHttpStatus, this.responseBody, this.responseHeaders);
	        }
	    }, {
	        key: "setResponseHttpStatus",
	        value: function setResponseHttpStatus(status) {
	            return new PathResponse(this.path, this.method, status, this.responseBody, this.responseHeaders);
	        }
	    }, {
	        key: "setResponseBody",
	        value: function setResponseBody(body) {
	            return new PathResponse(this.path, this.method, this.responseHttpStatus, body, this.responseHeaders);
	        }
	    }, {
	        key: "setResponseHeaders",
	        value: function setResponseHeaders(headers) {
	            return new PathResponse(this.path, this.method, this.responseHttpStatus, this.responseBody, headers);
	        }
	    }, {
	        key: "onRequest",
	        value: function onRequest(pathRequest) {
	            this.requests.push(pathRequest);
	        }
	    }]);
	
	    return PathResponse;
	}();
	
	var PathRequest = exports.PathRequest = function PathRequest(path, method, requestIndex, body, headers) {
	    _classCallCheck(this, PathRequest);
	
	    this.path = path;
	    this.method = method;
	    this.body = body;
	    this.headers = headers;
	    this.requestIndex = requestIndex;
	};
	
	var PathMapping = exports.PathMapping = function () {
	    function PathMapping(path, method) {
	        _classCallCheck(this, PathMapping);
	
	        this.path = path;
	        this.method = method;
	        this.responses = [];
	        this.currentResponse = 0;
	    }
	
	    _createClass(PathMapping, [{
	        key: "addResponse",
	        value: function addResponse(pathResponse) {
	            this.responses.push(pathResponse);
	        }
	    }, {
	        key: "getNrOfRequests",
	        value: function getNrOfRequests() {
	            return this.responses.reduce(function (prev, current) {
	                var prevLength = prev.requests.length;
	                return (prevLength ? prevLength : 0) + current.requests.length;
	            });
	        }
	    }, {
	        key: "getNextResponse",
	        value: function getNextResponse(pathRequest) {
	            var r = this.responses[this.currentResponse];
	            if (this.currentResponse + 1 < this.responses.length) {
	                this.currentResponse++;
	            }
	            r.onRequest(pathRequest);
	            return r;
	        }
	    }]);
	
	    return PathMapping;
	}();
	
	var ResponseHandler = exports.ResponseHandler = function () {
	    function ResponseHandler() {
	        _classCallCheck(this, ResponseHandler);
	
	        this.pathMappings = [];
	        this.currentRequest = 0;
	    }
	
	    _createClass(ResponseHandler, [{
	        key: "reset",
	        value: function reset() {
	            this.pathMappings = [];
	            this.currentRequest = 0;
	        }
	    }, {
	        key: "getMappedPaths",
	        value: function getMappedPaths() {
	            return this.pathMappings.map(function (pathMapping) {
	                return "[" + pathMapping.method + ":" + pathMapping.path + "]";
	            }).join(",");
	        }
	    }, {
	        key: "mapResponse",
	        value: function mapResponse(path, method, status, body, headers) {
	            var pathResponse = new PathResponse(path, method, status, body, headers);
	            var existing = this.pathMappings.find(function (pathMapping) {
	                return pathMapping.path == pathResponse.path && pathMapping.method == pathResponse.method;
	            });
	
	            if (!existing) {
	                existing = new PathMapping(pathResponse.path, pathResponse.method);
	                this.pathMappings.push(existing);
	            }
	            existing.addResponse(pathResponse);
	        }
	    }, {
	        key: "onRequest",
	        value: function onRequest(path, method, body, headers) {
	            var pathRequest = new PathRequest(path, method, this.currentRequest++, body, headers);
	            var mapping = this.findMapping(path, method);
	            if (mapping) {
	                return mapping.getNextResponse(pathRequest);
	            } else {
	                return null;
	            }
	        }
	    }, {
	        key: "findMapping",
	        value: function findMapping(path, method) {
	            var mapping = this.pathMappings.find(function (pathMapping) {
	                return pathMapping.path == path && pathMapping.method == method;
	            });
	            return mapping;
	        }
	    }, {
	        key: "findMappings",
	        value: function findMappings(path) {
	            var mappings = this.pathMappings.filter(function (pathMapping) {
	                return pathMapping.path == path;
	            });
	            return mappings;
	        }
	    }, {
	        key: "getOptionsForPath",
	        value: function getOptionsForPath(path) {
	            var mappings = this.findMappings(path, method);
	            return mappings.map(function (m) {
	                return m.method;
	            }).join(",");
	        }
	    }, {
	        key: "getResponses",
	        value: function getResponses(path, method, status) {
	            var requests = [];
	            var mappings = this.pathMappings.filter(function (pathMapping) {
	                if (path && method) {
	                    return pathMapping.path == path && pathMapping.method == method;
	                } else if (path) {
	                    return pathMapping.path == path;
	                } else {
	                    return true;
	                }
	            });
	            var responses = [];
	            mappings.forEach(function (pathMapping) {
	                responses = responses.concat(pathMapping.responses);
	            });
	            if (status) {
	                responses = responses.filter(function (response) {
	                    return response.responseHttpStatus == status;
	                });
	            }
	            return responses;
	        }
	    }]);

	    return ResponseHandler;
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mock-response-handler.js.map