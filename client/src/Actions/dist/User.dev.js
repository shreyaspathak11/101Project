"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadUser = exports.loginUser = void 0;

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
            return regeneratorRuntime.awrap(_axios["default"].post("/api/v1/login", {
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
            return regeneratorRuntime.awrap(_axios["default"].get("/api/v1/me"));

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