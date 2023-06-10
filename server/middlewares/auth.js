const User = require("../models/User");         // Import User model
const jwt = require("jsonwebtoken");          // Import jsonwebtoken          

exports.isAuthenticated = async (req, res, next) => {           // create middleware for authentication
  try {         
    const { token } = req.cookies;                        // Get token from cookies

    if (!token) {                                   // If token not found
      return res.status(401).json({                   // Send response for unauthorized and login first
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);      // Verify token using jwt.verify and decoded method

    req.user = await User.findById(decoded._id);      // Find user by id from decoded token

    next();                                   // Call next middleware
  } catch (error) {                     // If error return response for server error
    res.status(500).json({
      message: error.message,
    });
  }
};