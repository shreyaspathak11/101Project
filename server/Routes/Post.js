//Import express and express router
const express = require('express');
const router = express.Router();
//Import from controllers
const { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, commentOnPost } = require('../controllers/Post');
//Import from Auth hmiddleware
const { isAuthenticated } = require('../middlewares/auth');

//Routes
router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/post/:id")
.get(isAuthenticated, likeAndUnlikePost)
.delete(isAuthenticated, deletePost)
.put(isAuthenticated, updateCaption);

router.route("/posts").get(isAuthenticated, getPostOfFollowing);
router.route("/post/comment/:id").put(isAuthenticated, commentOnPost);

//Export router
module.exports = router;