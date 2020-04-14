const mongoose = require('mongoose');
const path = require('path');
const result = require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to the database: ${process.env.MONGODB_URL}`);
});