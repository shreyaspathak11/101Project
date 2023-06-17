"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFollowingPosts = exports.getFollowingsPosts = exports.loadUser = exports.loginUser = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginUser = function loginUser(email, password) {
  return function _callee(dispatch) {
    var _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              type: "LoginRequest"
            });
            _context.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].post("http://localhost:5000/api/v1/login", {
              email: email,
              password: password
            }, {
              headers: {
                "Content-Type": "application/json"
              }
            }));

          case 4:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: "LoginSuccess",
              payload: data.user
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: "LoginFailure",
              payload: _context.t0.response.data.message
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.loginUser = loginUser;

var loadUser = function loadUser() {
  return function _callee2(dispatch) {
    var _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch({
              type: "LoadUserRequest"
            });
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("api/v1/me"));

          case 4:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch({
              type: "LoadUserSuccess",
              payload: data.user
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              type: "LoadUserFailure",
              payload: _context2.t0.response.data.message
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.loadUser = loadUser;

var getFollowingsPosts = function getFollowingsPosts() {
  return function _callee3(dispatch) {
    var _ref3, data;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            dispatch({
              type: "postOfFollowingRequest"
            });
            _context3.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/v1/posts"));

          case 4:
            _ref3 = _context3.sent;
            data = _ref3.data;
            dispatch({
              type: "postOfFollowingSuccess",
              payload: data.posts
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            dispatch({
              type: "postOfFollowingFailure",
              payload: _context3.t0.response.data.message
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.getFollowingsPosts = getFollowingsPosts;

var getFollowingPosts = function getFollowingPosts() {
  return function _callee4(dispatch) {
    var _ref4, data;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            dispatch({
              type: "postOfFollowingRequest"
            });
            _context4.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/v1/posts"));

          case 4:
            _ref4 = _context4.sent;
            data = _ref4.data;
            dispatch({
              type: "postOfFollowingSuccess",
              payload: data.posts
            });
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            dispatch({
              type: "postOfFollowingFailure",
              payload: _context4.t0.response.data.message
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.getFollowingPosts = getFollowingPosts;