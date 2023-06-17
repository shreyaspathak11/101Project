"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// importing axios to make API requests
var loginUser = function loginUser(email, password) {
  return function _callee(dispatch) {
    var _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              // dispatching an action (REDUX)
              type: "LoginRequest" // action type                                  

            }); //API REQUEST To SERVER

            _context.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].post('api/v1/login', {
              email: email,
              password: password
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            }));

          case 4:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              // dispatching an action to Reducer (REDUX)
              type: "LoginSuccess",
              payload: data.user
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            // dispatching error)      
            dispatch({
              type: "LoginFailure",
              payload: _context.t0
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