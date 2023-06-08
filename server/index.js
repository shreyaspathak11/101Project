const express = require('express');
const connectDB = require('./config/database');
const app = express();

connectDB();

require('dotenv').config({ path: './config/.env' });

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
    }
);
