const mongoose = require('mongoose');   // Import mongoose
const bcrypt = require('bcrypt');     // Import bcryptjs
const jwt = require('jsonwebtoken');   // Import jsonwebtoken


const userSchema = new mongoose.Schema({    // Create a new schema
    name: {
        type: String,
        required: [true, 'Please enter your name'],        
    },
    
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },

    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password should be atleast 6 characters long'],
        select: false,
    },

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],

    followers: [    
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],

});

userSchema.pre('save', async function (next) {    // Encrypt password before saving user
    if (this.isModified('password')) {              // Check if password is modified
     this.password = await bcrypt.hash(this.password, 10);              // Encrypt password
    }

    next();             // if password is modified, then move to next middleware
});

userSchema.methods.matchPassword = async function (enteredPassword) {    // Compare entered password with hashed password
    return await bcrypt.compare(enteredPassword, this.password);         // Return true or false
};

userSchema.methods.generateToken = async function () {    // method to Generate token
    const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET, );    // Generate token
    return token;       // Return token
};

module.exports = mongoose.model('User', userSchema); // Export the model`