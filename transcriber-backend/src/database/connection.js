const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🍃 MongoDB server connected.');
  } catch (err) {
    console.error('❌ MongoDB connection error: ', err);
    process.exit(1);
  }
};

module.exports = connectDB;