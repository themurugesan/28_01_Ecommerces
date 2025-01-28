const mongoose = require('mongoose');

const dbURL = 'mongodb://127.0.0.1:27017/amazon';

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(`MongoDB connection error: ${err}`));

module.exports = mongoose;
