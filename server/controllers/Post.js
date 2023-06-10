const Post = require('../models/Post');
const User = require('../models/User');
 
exports.createPost = async (req, res) => {          // Create post

    try {                   
       
        const newPostData = {             // Create new post data
            caption: req.body.caption,
            image:{
                public_id: "req.body.public_id",
                url: "req.body.url",
            },  
            owner: req.user._id,          // Get user id from request body managed by auth middleware

        };

        const post = await Post.create(newPostData);    // Create post

        const user = await User.findById(req.user._id);   // Find user by id

        user.posts.unshift(post._id);       // Add post id to user posts array
        await user.save();          // save the user
 
        res.status(201).json({        // Send response for successful post creation
            success: true,
            post,
           message: "Post created successfully",
        });

    } catch (error) {        // If error            
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};



exports.deletePost = async (req, res) => {      // Delete post
    try {   
      const post = await Post.findById(req.params.id);      // Find post by id from request params
  
      if (!post) {    // If post not found      
        return res.status(404).json({           // Send response  for post not found
          success: false,
          message: "Post not found",
        });
      }
  
      if (post.owner.toString() !== req.user._id.toString()) {        // If post owner is not the user who is logged in
        return res.status(401).json({          // Send response for unauthorized
          success: false,
          message: "Unauthorized",
        });
      }
    
    await post.deleteOne();        // Remove post from database

    const user = await User.findById(req.user._id);     // Find user by id from request params

    const index = user.posts.indexOf(req.params.id);    // Get index of post id in user posts array 
    user.posts.splice(index, 1);                    // Remove post id from user posts array

    await user.save();      // Save user to database          

    res.status(200).json({    // if all goes well send response for successful post deletion
      success: true,
      message: "Post deleted",
    });
  } catch (error) {         // If error send response for server error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




exports.likeAndUnlikePost = async (req, res) => {                         // Like and unlike post
    try {
        
        const post = await Post.findById(req.params.id);        // Find post by id

        if (!post) return res.status(404).json({ message: "Post not found" });   // If post not found

        if (post.likes.includes(req.user._id)) {                // If post already liked
            const index = post.likes.indexOf(req.user._id);       // Get index of user id in likes array
            post.likes.splice(index, 1);                            // Remove user id from likes array
            await post.save();                                          // Save post
            return res.status(200).json({ success: true, message: "Post unliked" });  // Send response for successful UNLIKE   
        }
        else {
            post.likes.push(req.user._id);                        // Add user id to likes array if post not liked
            await post.save();                                        // Save post          
            return res.status(200).json({ success: true, message: "Post liked" });    // Send response for successful LIKE
        }
    } catch (error) {           // If error
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.getPostOfFollowing = async (req, res) => {        // Get post of the user following 
  try {
    const user = await User.findById(req.user._id);       // Find user by id

    const posts = await Post.find({                       // Find posts of the user following    
      owner: {
        $in: user.following,                              // Get user following array, $in is used to find posts of the user following(monogdb operator)  
      },
    }).populate("owner likes comments.user");             // Populate owner, likes and comments.user fields  

    res.status(200).json({                                // Send response for successful post retrieval
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {                                       // If error       
    res.status(500).json({                                // Send response for server error
      success: false,
      message: error.message,
    });
  }
};
