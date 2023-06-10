const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const path = require('path');
const app = express();
const cloudinary = require("cloudinary");

connectDB();

require('dotenv').config({ path: './config/.env' });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Import routes
const post = require('./Routes/post');
const user = require('./Routes/user');

// Using Routes
app.use('/api/v1', post);
app.use('/api/v1', user);

// Serve static assets if in production
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    }
);
