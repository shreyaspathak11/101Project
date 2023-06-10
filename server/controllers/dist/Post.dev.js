"use strict";

var Post = require('../models/Post');

var User = require('../models/User');

exports.createPost = function _callee(req, res) {
  var newPostData, post, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          newPostData = {
            // Create new post data
            caption: req.body.caption,
            image: {
              public_id: "req.body.public_id",
              url: "req.body.url"
            },
            owner: req.user._id // Get user id from request body managed by auth middleware

          };
          _context.next = 4;
          return regeneratorRuntime.awrap(Post.create(newPostData));

        case 4:
          post = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 7:
          user = _context.sent;
          // Find user by id
          user.posts.unshift(post._id); // Add post id to user posts array

          _context.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          // save the user
          res.status(201).json({
            // Send response for successful post creation
            success: true,
            post: post,
            message: "Post created successfully"
          });
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          // If error            
          console.log(_context.t0);
          res.status(500).json({
            message: "Server Error"
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.deletePost = function _callee2(req, res) {
  var post, user, index;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context2.sent;

          if (post) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            // Send response  for post not found
            success: false,
            message: "Post not found"
          }));

        case 6:
          if (!(post.owner.toString() !== req.user._id.toString())) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            // Send response for unauthorized
            success: false,
            message: "Unauthorized"
          }));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(post.deleteOne());

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 12:
          user = _context2.sent;
          // Find user by id from request params
          index = user.posts.indexOf(req.params.id); // Get index of post id in user posts array 

          user.posts.splice(index, 1); // Remove post id from user posts array

          _context2.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          // Save user to database          
          res.status(200).json({
            // if all goes well send response for successful post deletion
            success: true,
            message: "Post deleted"
          });
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          // If error send response for server error
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.likeAndUnlikePost = function _callee3(req, res) {
  var post, index;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Post.findById(req.params.id));

        case 3:
          post = _context3.sent;

          if (post) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Post not found"
          }));

        case 6:
          if (!post.likes.includes(req.user._id)) {
            _context3.next = 14;
            break;
          }

          // If post already liked
          index = post.likes.indexOf(req.user._id); // Get index of user id in likes array

          post.likes.splice(index, 1); // Remove user id from likes array

          _context3.next = 11;
          return regeneratorRuntime.awrap(post.save());

        case 11:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            message: "Post unliked"
          }));

        case 14:
          post.likes.push(req.user._id); // Add user id to likes array if post not liked

          _context3.next = 17;
          return regeneratorRuntime.awrap(post.save());

        case 17:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            message: "Post liked"
          }));

        case 18:
          _context3.next = 24;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          // If error
          console.log(_context3.t0);
          res.status(500).json({
            message: "Server Error"
          });

        case 24:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.getPostOfFollowing = function _callee4(req, res) {
  var user, posts;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 3:
          user = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Post.find({
            // Find posts of the user following    
            owner: {
              $in: user.following // Get user following array, $in is used to find posts of the user following(monogdb operator)  

            }
          }).populate("owner likes comments.user"));

        case 6:
          posts = _context4.sent;
          // Populate owner, likes and comments.user fields  
          res.status(200).json({
            // Send response for successful post retrieval
            success: true,
            posts: posts.reverse()
          });
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          // If error       
          res.status(500).json({
            // Send response for server error
            success: false,
            message: _context4.t0.message
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
};