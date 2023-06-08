const Post = require('../models/Post');
const User = require('../models/User');
 
exports.createPost = async (req, res) => {

    try {
        const newPostData = {
            caption: req.body.caption,
            image:{
                public_id: req.body.public_id,
                url: req.body.url,
            },
            owner: req.user._id,
        };

        const newPost = await Post.create(newPostData);

        const user = await User.findById(req.user._id);

        user.posts.push(newPost._id);
        await user.save();          // save the user

        res.status(201).json({
            success: true,
            post: newPost,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};