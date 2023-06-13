"use strict";

//Import express and express router
var express = require('express');

var router = express.Router(); //Import from controllers

var _require = require('../controllers/Post'),
    createPost = _require.createPost,
    likeAndUnlikePost = _require.likeAndUnlikePost,
    deletePost = _require.deletePost,
    getPostOfFollowing = _require.getPostOfFollowing,
    updateCaption = _require.updateCaption,
    commentOnPost = _require.commentOnPost,
    deleteComment = _require.deleteComment; //Import from Auth hmiddleware


var _require2 = require('../middlewares/auth'),
    isAuthenticated = _require2.isAuthenticated; //Routes


router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost)["delete"](isAuthenticated, deletePost).put(isAuthenticated, updateCaption);
router.route("/posts").get(isAuthenticated, getPostOfFollowing);
router.route("/post/comment/:id").put(isAuthenticated, commentOnPost)["delete"](isAuthenticated, deleteComment); //Export router

module.exports = router;