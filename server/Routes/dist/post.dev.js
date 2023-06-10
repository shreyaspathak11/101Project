"use strict";

var express = require('express');

var _require = require('../controllers/Post'),
    createPost = _require.createPost,
    likeAndUnlikePost = _require.likeAndUnlikePost,
    deletePost = _require.deletePost,
    getPostOfFollowing = _require.getPostOfFollowing,
    updateCaption = _require.updateCaption;

var _require2 = require('../middlewares/auth'),
    isAuthenticated = _require2.isAuthenticated;

var router = express.Router();
router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost)["delete"](isAuthenticated, deletePost).put(isAuthenticated, updateCaption);
router.route("/posts").get(isAuthenticated, getPostOfFollowing);
module.exports = router;