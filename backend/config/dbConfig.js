const mongoose = require('mongoose');
require('dotenv').config(); 

const mongoURL = process.env.MONGO_URL; 
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    maxPoolSize: 10  // Limiting the pool size to 10 connections
})
.then(() => {
    console.log('Mongoose connected successfully');
})
.catch((error) => {
    console.log('Mongoose connection error:', error); 
});




