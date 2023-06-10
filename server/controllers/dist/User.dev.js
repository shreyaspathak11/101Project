"use strict";

var User = require('../models/User');

var Post = require('../models/Post'); //Register user


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

exports.updatePassword = function _callee5(req, res) {
  var user, _req$body3, oldPassword, newPassword, isMatch;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user._id).select("+password"));

        case 3:
          user = _context5.sent;
          // Find user by id and select password
          _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword; // Get old and new password from request body

          if (!(!oldPassword || !newPassword)) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            // Return error message
            success: false,
            message: "Please provide old and new password"
          }));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(user.matchPassword(oldPassword));

        case 9:
          isMatch = _context5.sent;

          if (isMatch) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            // Return error message
            success: false,
            message: "Incorrect Old password"
          }));

        case 12:
          user.password = newPassword; // Set new password

          _context5.next = 15;
          return regeneratorRuntime.awrap(user.save());

        case 15:
          // Save user     
          res.status(200).json({
            // Return success                     
            success: true,
            message: "Password Updated"
          });
          _context5.next = 21;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          // If error return error message
          res.status(500).json({
            success: false,
            message: _context5.t0.message
          });

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.updateProfile = function _callee6(req, res) {
  var user, _req$body4, name, email, avatar;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 3:
          user = _context6.sent;
          // Find user by id
          _req$body4 = req.body, name = _req$body4.name, email = _req$body4.email, avatar = _req$body4.avatar; // Get name, email and avatar from request body

          if (name) {
            // If name provided
            user.name = name; // Set name to new name
          }

          if (email) {
            user.email = email; // Set email to new email
          } // if (avatar) {
          //   await cloudinary.v2.uploader.destroy(user.avatar.public_id);
          //   const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          //     folder: "avatars",
          //   });
          //   user.avatar.public_id = myCloud.public_id;
          //   user.avatar.url = myCloud.secure_url;
          // }


          _context6.next = 9;
          return regeneratorRuntime.awrap(user.save());

        case 9:
          // Save user
          console.log(user);
          res.status(200).json({
            // Return success
            success: true,
            message: "Profile Updated"
          });
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          // If error return error message
          res.status(500).json({
            success: false,
            message: _context6.t0.message
          });

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.deleteMyProfile = function _callee7(req, res) {
  var user, posts, followers, following, userId, i, post, _i, follower, index, _i2, follows, _index, allPosts, _i3, _post, j, _i4, _post2, _j;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 3:
          user = _context7.sent;
          // Find user by id 
          posts = user.posts; // Get posts of user

          followers = user.followers; // Get followers of user     

          following = user.following; // Get following of user 

          userId = user._id; // Get user id for deleting user from followers and following 
          // Removing Avatar from cloudinary
          // await cloudinary.v2.uploader.destroy(user.avatar.public_id);

          _context7.next = 10;
          return regeneratorRuntime.awrap(user.deleteOne());

        case 10:
          // Delete user simply
          // Logout user after deleting profile
          res.cookie("token", null, {
            // Set token to null and expire it  
            expires: new Date(Date.now()),
            httpOnly: true
          }); // Delete all posts of the user

          i = 0;

        case 12:
          if (!(i < posts.length)) {
            _context7.next = 21;
            break;
          }

          _context7.next = 15;
          return regeneratorRuntime.awrap(Post.findById(posts[i]));

        case 15:
          post = _context7.sent;
          _context7.next = 18;
          return regeneratorRuntime.awrap(post.deleteOne());

        case 18:
          i++;
          _context7.next = 12;
          break;

        case 21:
          _i = 0;

        case 22:
          if (!(_i < followers.length)) {
            _context7.next = 33;
            break;
          }

          _context7.next = 25;
          return regeneratorRuntime.awrap(User.findById(followers[_i]));

        case 25:
          follower = _context7.sent;
          // Find follower by id
          index = follower.following.indexOf(userId); // Get index of user from follower's following array

          follower.following.splice(index, 1); // Remove user from follower's following array

          _context7.next = 30;
          return regeneratorRuntime.awrap(follower.save());

        case 30:
          _i++;
          _context7.next = 22;
          break;

        case 33:
          _i2 = 0;

        case 34:
          if (!(_i2 < following.length)) {
            _context7.next = 45;
            break;
          }

          _context7.next = 37;
          return regeneratorRuntime.awrap(User.findById(following[_i2]));

        case 37:
          follows = _context7.sent;
          // Find following by id
          _index = follows.followers.indexOf(userId); // Get index of user from following's followers array

          follows.followers.splice(_index, 1); // Remove user from following's followers array

          _context7.next = 42;
          return regeneratorRuntime.awrap(follows.save());

        case 42:
          _i2++;
          _context7.next = 34;
          break;

        case 45:
          _context7.next = 47;
          return regeneratorRuntime.awrap(Post.find());

        case 47:
          allPosts = _context7.sent;
          _i3 = 0;

        case 49:
          if (!(_i3 < allPosts.length)) {
            _context7.next = 59;
            break;
          }

          _context7.next = 52;
          return regeneratorRuntime.awrap(Post.findById(allPosts[_i3]._id));

        case 52:
          _post = _context7.sent;

          // Find post by id
          for (j = 0; j < _post.comments.length; j++) {
            // Loop through all comments of post 
            if (_post.comments[j].user === userId) {
              // If comment's user is user
              _post.comments.splice(j, 1); // Remove comment

            }
          }

          _context7.next = 56;
          return regeneratorRuntime.awrap(_post.save());

        case 56:
          _i3++;
          _context7.next = 49;
          break;

        case 59:
          _i4 = 0;

        case 60:
          if (!(_i4 < allPosts.length)) {
            _context7.next = 70;
            break;
          }

          _context7.next = 63;
          return regeneratorRuntime.awrap(Post.findById(allPosts[_i4]._id));

        case 63:
          _post2 = _context7.sent;

          // Find post by id
          for (_j = 0; _j < _post2.likes.length; _j++) {
            // Loop through all likes of post
            if (_post2.likes[_j] === userId) {
              // If like is user 
              _post2.likes.splice(_j, 1); // Remove like

            }
          }

          _context7.next = 67;
          return regeneratorRuntime.awrap(_post2.save());

        case 67:
          _i4++;
          _context7.next = 60;
          break;

        case 70:
          res.status(200).json({
            // Return success                        
            success: true,
            message: "Profile Deleted"
          });
          _context7.next = 76;
          break;

        case 73:
          _context7.prev = 73;
          _context7.t0 = _context7["catch"](0);
          // If error return error message
          res.status(500).json({
            success: false,
            message: _context7.t0.message
          });

        case 76:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 73]]);
};

exports.myProfile = function _callee8(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user._id).populate( // Find user by id and populate posts, followers and following
          "posts followers following"));

        case 3:
          user = _context8.sent;
          res.status(200).json({
            // Return success       
            success: true,
            user: user
          });
          _context8.next = 10;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          // If error return error message
          res.status(500).json({
            success: false,
            message: _context8.t0.message
          });

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
};