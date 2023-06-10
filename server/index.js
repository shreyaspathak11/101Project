const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const app = express();

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

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    }
);
