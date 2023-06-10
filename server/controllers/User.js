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

