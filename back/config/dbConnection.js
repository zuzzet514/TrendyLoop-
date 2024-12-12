// This handles the connection to the DB
const mongoose = require('mongoose');

require('dotenv').config({ path:'../.env' });

// Connect to MongoDB
const connectToDB = () => {
  mongoose.connect(process.env.DB_URL)
      .then(() => {
        console.log('Successfully connected to MongoDB');
      }).catch(err => {
        console.error('Unable to connect to MongoDB:', err);
      });
};

module.exports = connectToDB;