"use strict";

var express = require('express');

var _require = require('../controllers/Post'),
    createPost = _require.createPost,
    likeAndUnlikePost = _require.likeAndUnlikePost,
    deletePost = _require.deletePost;

var _require2 = require('../middlewares/auth'),
    isAuthenticated = _require2.isAuthenticated;

var router = express.Router();
router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost)["delete"](isAuthenticated, deletePost);
module.exports = router;