"use strict";

var User = require('../models/User'); //Register user


exports.register = function _callee(req, res) {
  var _req$body, name, email, password, user, token, options;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context.sent;

          if (!user) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "User already exists"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            password: password,
            avatar: {
              public_id: "sample_id",
              url: "sample_url"
            }
          }));

        case 9:
          user = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(user.generateToken());

        case 12:
          token = _context.sent;
          // Generate token
          options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true
          }; // Options for cookie

          res.status(200).cookie("token", token, options).json({
            // Send token in cookie
            success: true,
            message: "User logged in successfully",
            data: user,
            token: token
          });
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
}; //Login user


exports.login = function _callee2(req, res) {
  var _req$body2, email, password, user, isMatch, token, options;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Get email and password from request body

          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select("+password"));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(user.matchPassword(password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: "Invalid password"
          }));

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(user.generateToken());

        case 14:
          token = _context2.sent;
          // Generate token
          options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true
          }; // Options for cookie

          res.status(200).cookie("token", token, options).json({
            // Send token in cookie
            success: true,
            message: "User logged in successfully",
            data: user,
            token: token
          });
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          // If error
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 19]]);
};