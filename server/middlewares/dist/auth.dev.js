"use strict";

var User = require("../models/User"); // Import User model


var jwt = require("jsonwebtoken"); // Import jsonwebtoken          


exports.isAuthenticated = function _callee(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.cookies.token; // Get token from cookies

          if (token) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            // Send response for unauthorized and login first
            message: "Please login first"
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(jwt.verify(token, process.env.JWT_SECRET));

        case 6:
          decoded = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(User.findById(decoded._id));

        case 9:
          req.user = _context.sent;
          // Find user by id from decoded token
          next(); // Call next middleware

          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          // If error return response for server error
          res.status(500).json({
            message: _context.t0.message
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};