const mongoose = require('mongoose');   // Import mongoose

const userSchema = new mongoose.Schema({    // Create a new schema
    

});

module.exports = mongoose.model('User', userSchema); // Export the model