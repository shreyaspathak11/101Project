const User = require('../models/User');

//Register user
exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        user = await User.create({ name, email, password, avatar:{public_id : "sample_id", url :"sample_url"} });

        const token = await user.generateToken();                           // Generate token
        const options = { expires: new Date(Date.now()+30*24*60*60*1000),
            httpOnly: true }                                                        // Options for cookie
            
            
        res.status(200).cookie("token", token, options).json({       // Send token in cookie
             success: true,
              message: "User logged in successfully",
              data: user,
              token: token,
             });
             
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
} 

//Login user
exports.login = async (req, res) => {
    try {
       const { email, password } = req.body;        // Get email and password from request body
       
       const user = await User.findOne({ email }).select("+password");      // Find user with email

         if (!user) {       // If user not found
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isMatch = await user.matchPassword(password);    // Check if password matches

        if (!isMatch) {     // If password does not match
            return res.status(404).json({ success: false, message: "Invalid password" });
        } 
        const token = await user.generateToken();                           // Generate token
        const options = { expires: new Date(Date.now()+30*24*60*60*1000),
            httpOnly: true }                                                        // Options for cookie
            
            
        res.status(200).cookie("token", token, options).json({       // Send token in cookie
             success: true,
              message: "User logged in successfully",
              data: user,
              token: token,
             });

    } catch (error) {                       // If error
        res.status(500).json({ success: false, message: error.message });
    }
}



exports.logout = async (req, res) => {                                            // Logout user
  try {
    res 
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })   // Set token cookie to none and expire it immediately
      .json({                                                                     // Return success
        success: true,
        message: "Logged out",
      });
  } catch (error) {                                                               // If error   
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.followUser = async (req, res) => {                  // Follow user
    try {
      const userToFollow = await User.findById(req.params.id);   // Find user to follow by id
      const loggedInUser = await User.findById(req.user._id);   // Find logged in user by id
  
      if (!userToFollow) {                        // If user to follow not found
        return res.status(404).json({               // Return error
          success: false,
          message: "User not found",
        });
      }

                //UNFOLLOW user if already followed                                                                            
      if (loggedInUser.following.includes(userToFollow._id)) {                      // If user already followed by logged in user
        const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);    // Get index of user to follow from logged in user's following array
        const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);    // Get index of logged in user from user to follow's followers array
  
        loggedInUser.following.splice(indexfollowing, 1);       // Remove user to follow from logged in user's following array
        userToFollow.followers.splice(indexfollowers, 1);       // Remove logged in user from user to follow's followers array
  
        await loggedInUser.save();        // Save logged in user
        await userToFollow.save();       // Save user to follow
  
        res.status(200).json({          // Return success
          success: true,
          message: "User Unfollowed",
        });
      } else {
        loggedInUser.following.push(userToFollow._id);   // Add user to follow to logged in user's following array
        userToFollow.followers.push(loggedInUser._id);  // Add logged in user to user to follow's followers array
  
        await loggedInUser.save();          // Save logged in user
        await userToFollow.save();          // Save user to follow    
  
        res.status(200).json({              // Return success OF user followed
          success: true,
          message: "User followed",
        });
      }
    } catch (error) {                // If error                    
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };