//import dependencies
const mongoose = require("mongoose");         //import mongoose for creating schema  
const bcrypt = require("bcrypt");             //import bcrypt for hashing password
const jwt = require("jsonwebtoken");          //import jsonwebtoken for generating token
const crypto = require("crypto");             //import crypto for generating reset password token

const userSchema = new mongoose.Schema({          //create schema of USER
  name: {                                             //name of user
    type: String,
    required: [true, "Please enter a name"],
  },

  avatar: {                                          //avatar of user                       
    public_id: String,
    url: String,
  },

  email: {                                         //email of user                    
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },
  password: {                                         //password of user
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },

  posts: [                                    //posts of user 
    {
      type: mongoose.Schema.Types.ObjectId,       //type of post here object id mongoose.schema.type.objectid means id of post
      ref: "Post",                            //ref means reference to post
    },
  ],
  followers: [                              //followers of user                   
    {
      type: mongoose.Schema.Types.ObjectId,     //type of follower here object id mongoose.schema.type.objectid means id of follower
      ref: "User",                            //ref means reference to user
    },
  ],

  following: [                            //following of user               
    {
      type: mongoose.Schema.Types.ObjectId,         //type of following here object id mongoose.schema.type.objectid means id of following
      ref: "User",                                  //ref means reference to user
    },
  ],

  resetPasswordToken: String,           //reset password token of user
  resetPasswordExpire: Date,          //reset password expire of user             
});


// Function to hash password before saving
userSchema.pre("save", async function (next) {                //pre save function for hashing password  
  if (this.isModified("password")) {                        //check if password is modified   
    this.password = await bcrypt.hash(this.password, 10);     //hash password using bcrypt
  }

  next();                                                   //call next function
});


// Function to compare password
userSchema.methods.matchPassword = async function (password) {   //match password function
  return await bcrypt.compare(password, this.password);         //compare password using bcrypt
};


// Function to generate token
userSchema.methods.generateToken = function () {                //generate token function
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);     //generate token using jsonwebtoken
};


// Function to generate reset password token
userSchema.methods.getResetPasswordToken = function () {        //generate reset password token function
  const resetToken = crypto.randomBytes(20).toString("hex");    //generate reset password token using crypto

  // we can use "this" to access any user object (name, email, password, etc.)

  this.resetPasswordToken = crypto                      //reset password token by hashing using crypto           
    .createHash("sha256")                               //create hash using sha256 (an algorithm)
    .update(resetToken)                               //update reset token                    
    .digest("hex");                                 //digest reset token                
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;   //reset password expire time here 10 minutes

  return resetToken;                          //return reset token
};

module.exports = mongoose.model("User", userSchema);        //export user schema