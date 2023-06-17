"use strict";

var express = require('express');

var cookieParser = require('cookie-parser');

var connectDB = require('./config/database');

var path = require('path');

var app = express();

var cloudinary = require("cloudinary");

var PORT = process.env.PORT || 5000;
connectDB();

require('dotenv').config({
  path: './config/.env'
}); // Middleware


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser()); // Import routes

var post = require('./Routes/post');

var user = require('./Routes/user'); // Using Routes


app.use('/api/v1', post);
app.use('/api/v1', user); // Serve static assets if in production

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
app.listen(PORT, function () {
  console.log("Server listening on port ".concat(PORT));
});