const mongoose = require('mongoose');
require('dotenv').config(); 

const mongoURL = process.env.MONGO_URL; 
mongoose.connect(mongoURL)
.then(() => {
    console.log('Mongoose connected successfully');
})
.catch((error) => {
    console.log('Mongoose connection error:', error); 
});
