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

exports.logout = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Logout user
          try {
            res.status(200).cookie("token", null, {
              expires: new Date(Date.now()),
              httpOnly: true
            }) // Set token cookie to none and expire it immediately
            .json({
              // Return success
              success: true,
              message: "Logged out"
            });
          } catch (error) {
            // If error   
            res.status(500).json({
              success: false,
              message: error.message
            });
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.followUser = function _callee4(req, res) {
  var userToFollow, loggedInUser, indexfollowing, indexfollowers;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 3:
          userToFollow = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 6:
          loggedInUser = _context4.sent;

          if (userToFollow) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            // Return error
            success: false,
            message: "User not found"
          }));

        case 9:
          if (!loggedInUser.following.includes(userToFollow._id)) {
            _context4.next = 21;
            break;
          }

          // If user already followed by logged in user
          indexfollowing = loggedInUser.following.indexOf(userToFollow._id); // Get index of user to follow from logged in user's following array

          indexfollowers = userToFollow.followers.indexOf(loggedInUser._id); // Get index of logged in user from user to follow's followers array

          loggedInUser.following.splice(indexfollowing, 1); // Remove user to follow from logged in user's following array

          userToFollow.followers.splice(indexfollowers, 1); // Remove logged in user from user to follow's followers array

          _context4.next = 16;
          return regeneratorRuntime.awrap(loggedInUser.save());

        case 16:
          _context4.next = 18;
          return regeneratorRuntime.awrap(userToFollow.save());

        case 18:
          // Save user to follow
          res.status(200).json({
            // Return success
            success: true,
            message: "User Unfollowed"
          });
          _context4.next = 28;
          break;

        case 21:
          loggedInUser.following.push(userToFollow._id); // Add user to follow to logged in user's following array

          userToFollow.followers.push(loggedInUser._id); // Add logged in user to user to follow's followers array

          _context4.next = 25;
          return regeneratorRuntime.awrap(loggedInUser.save());

        case 25:
          _context4.next = 27;
          return regeneratorRuntime.awrap(userToFollow.save());

        case 27:
          // Save user to follow    
          res.status(200).json({
            // Return success OF user followed
            success: true,
            message: "User followed"
          });

        case 28:
          _context4.next = 33;
          break;

        case 30:
          _context4.prev = 30;
          _context4.t0 = _context4["catch"](0);
          // If error                    
          res.status(500).json({
            success: false,
            message: _context4.t0.message
          });

        case 33:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 30]]);
};