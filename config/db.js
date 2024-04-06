require('dotenv').config();
const mongoose = require('mongoose');

let db = process.env.DBadress ;

mongoose.connect(db)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('DB connection error:', error);
    });
