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







exports.updateCaption = async (req, res) => {             // Update post caption
  try {
    const post = await Post.findById(req.params.id);      // Find post by id from request params

    if (!post) {                                          // If post not found
      return res.status(404).json({
        success: false,                                   // Send response for post not found
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {  // If post owner is not the user who is logged in
      return res.status(401).json({
        success: false,                                       // Send response for unauthorized
        message: "Unauthorized",
      });
    }

    post.caption = req.body.caption;                          // Update post caption
    await post.save();                                        // Save post
    res.status(200).json({                                    // Send response for successful post update
      success: true,
      message: "Post updated",
    });
  } catch (error) {                                           // If error send response for server error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





exports.commentOnPost = async (req, res) => {               // Comment on post
  try {
    const post = await Post.findById(req.params.id);        // Find post by id from request params

    if (!post) {                                           // If post not found return response for post not found         
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    let commentIndex = -1;                               //initializing comment index   

      // Checking if comment already exists

    post.comments.forEach((item, index) => {              // Loop through comments array
      if (item.user.toString() === req.user._id.toString()) {   // If comment already exists by the user means only one comment per user
        commentIndex = index;                                   // Set comment index to index of comment
      }
    });

    if (commentIndex !== -1) {                                  // If comment already exists by checking comment index
      post.comments[commentIndex].comment = req.body.comment;   // Update comment

      await post.save();                                        // Save post

      return res.status(200).json({                           // Send response for successful comment update
        success: true,
        message: "Comment Updated",
      });
    }

    else {                                  // If comment does not exist              
      post.comments.push({                        // Push comment to comments array
        user: req.user._id,                               
        comment: req.body.comment,
      });

      await post.save();                  // Save post
      return res.status(200).json({       // Send response for successful comment addition
        success: true,
        message: "Comment added",
      });
    }
  } catch (error) {                     // If error send response for server error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);        // Find post by id from request params

    if (!post) {                                            // If post not found return response for post not found
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Checking If owner wants to delete

    if (post.owner.toString() === req.user._id.toString()) {      //CASE 1: If post owner is the user who is logged in
      if (req.body.commentId === undefined) {                     // If comment id is not provided in request body
        return res.status(400).json({                             // Send response for bad request
          success: false,
          message: "Comment Id is required",
        });
      }

      post.comments.forEach((item, index) => {                        // Loop through comments array
        if (item._id.toString() === req.body.commentId.toString()) {  // If comment id matches with comment id in request body
          return post.comments.splice(index, 1);                        // Delete comment  
        }
      });

      await post.save();                                              // Save post to database

      return res.status(200).json({                                   // Send response for successful comment deletion
        success: true,
        message: "Selected Comment has deleted",
      });
    } else {                                                        //CASE 2: If user is not the owner of the post
      post.comments.forEach((item, index) => {                          // Loop through comments array
        if (item.user.toString() === req.user._id.toString()) {     // If comment is by the user who is logged in
          return post.comments.splice(index, 1);                    // Delete comment
        }
      });

      await post.save();                                            // Save post to database

      return res.status(200).json({                                   // Send response for successful comment deletion
        success: true,
        message: "Your Comment has deleted",                    
      });
    }
  } catch (error) {                                                   // If error send response for server error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};