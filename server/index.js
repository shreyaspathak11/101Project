const express = require('express');
const connectDB = require('./config/database');
const app = express();

connectDB();

require('dotenv').config({ path: './config/.env' });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const post = require('./routes/post');

// Using Routes
app.use('/api/v1', post);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    }
);
