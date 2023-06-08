const mongoose = require('mongoose');   // Import mongoose

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

module.exports = mongoose.model('User', userSchema); // Export the model`