const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDatabase() {
  try {
    const URL = process.env.DATABASE_URI;
    const PASSWORD = process.env.DATABASE_PASSWORD;
    const DB = URL.replace('<password>', PASSWORD);

    const client = await mongoose.connect(DB, {
      useNewUrlParser: true,
    });
    if (client) console.log('Connected to Database');
    return client;
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDatabase;
